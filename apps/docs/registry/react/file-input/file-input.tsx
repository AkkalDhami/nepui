"use client"

import type { ComponentProps, ReactNode, RefObject } from "react"
import {
  createContext,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import { cn } from "cn"

import { Button } from "@/registry/react/button"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./file-input.css"

type FileInputValueChangeReason =
  "picker" | "drop" | "paste" | "remove-press" | "reset" | "imperative"

type FileRejectionReason =
  | "file-type"
  | "file-too-large"
  | "file-too-small"
  | "too-many-files"
  | (string & {})

type FileRejection = {
  file: File
  /** Every reason the file failed. */
  reasons: FileRejectionReason[]
}

type FileInputChange = {
  reason: FileInputValueChangeReason
  added: File[]
  removed: File[]
  rejected: FileRejection[]
  value: File[]
}

type FileInputChangeDetails = {
  reason: FileInputValueChangeReason
  event: Event | undefined
  added: File[]
  removed: File[]
  rejected: FileRejection[]
  /** Call it inside `onValueChange` to keep the current value. */
  cancel: () => void
  readonly isCanceled: boolean
}

type FileInputRejectDetails = {
  reason: FileInputValueChangeReason
  event: Event | undefined
}

type FileInputChangeOptions = {
  reason?: FileInputValueChangeReason
  event?: Event
}

type FileInputState = {
  value: readonly File[]
  disabled: boolean
  required: boolean
  dragging: boolean
  invalid: boolean
}

type FileInputDropzoneState = {
  dragging: boolean
  dragAccept: boolean
  dragReject: boolean
  disabled: boolean
}

type FileInputItemState = {
  file: File
  index: number
  disabled: boolean
}

type FileInputController = {
  getValue: () => readonly File[]
  /** Replaces the files without checking them. */
  setValue: (
    files: readonly File[],
    options?: FileInputChangeOptions
  ) => boolean
  /** Runs files through the checks and adds the accepted ones. */
  addFiles: (
    files: readonly File[] | FileList,
    options?: FileInputChangeOptions
  ) => boolean
  removeFile: (file: File, options?: FileInputChangeOptions) => boolean
  clear: (options?: FileInputChangeOptions) => boolean
  /** Opens the file picker. Browsers only allow it during a user action. */
  open: () => boolean
  focus: () => void
  isDragging: () => boolean
}

const relativePaths = new WeakMap<File, string>()
const fileKeys = new WeakMap<File, string>()
let fileKeyCounter = 0

function getFileKey(file: File) {
  let key = fileKeys.get(file)
  if (!key) {
    key = `file-${++fileKeyCounter}`
    fileKeys.set(file, key)
  }
  return key
}

/** The path of a file inside a picked or dropped folder (or its name). */
function relativePath(file: File) {
  return relativePaths.get(file) ?? (file.webkitRelativePath || file.name)
}

/** "1.2 MB", "340 KB", "12 B". */
function formatFileSize(bytes: number) {
  if (!Number.isFinite(bytes) || bytes < 0) return ""
  if (bytes < 1024) return `${bytes} B`
  const units = ["KB", "MB", "GB", "TB"]
  let size = bytes / 1024
  let unit = 0
  while (size >= 1024 && unit < units.length - 1) {
    size /= 1024
    unit++
  }
  const text =
    size >= 10 || Number.isInteger(size)
      ? String(Math.round(size))
      : size.toFixed(1)
  return `${text} ${units[unit]}`
}

function parseAccept(accept: string | readonly string[] | undefined) {
  if (!accept) return []
  const list = typeof accept === "string" ? accept.split(",") : accept
  return list.map((item) => item.trim().toLowerCase()).filter(Boolean)
}

function mimeMatches(type: string, pattern: string) {
  return pattern.endsWith("/*")
    ? type.startsWith(pattern.slice(0, -1))
    : type === pattern
}

function fileMatchesAccept(file: File, patterns: string[]) {
  if (patterns.length === 0) return true
  const name = file.name.toLowerCase()
  const type = file.type.toLowerCase()
  return patterns.some((pattern) =>
    pattern.startsWith(".")
      ? name.endsWith(pattern)
      : mimeMatches(type, pattern)
  )
}

function createDetails(
  base: Omit<FileInputChangeDetails, "cancel" | "isCanceled">
): FileInputChangeDetails {
  let canceled = false
  return {
    ...base,
    cancel() {
      canceled = true
    },
    get isCanceled() {
      return canceled
    },
  }
}

function describeRejection(
  reason: FileRejectionReason,
  config: { maxSize?: number; minSize?: number; maxFiles?: number }
) {
  switch (reason) {
    case "file-type":
      return "is not an accepted file type"
    case "file-too-large":
      return config.maxSize !== undefined
        ? `is larger than ${formatFileSize(config.maxSize)}`
        : "is too large"
    case "file-too-small":
      return config.minSize !== undefined
        ? `is smaller than ${formatFileSize(config.minSize)}`
        : "is too small"
    case "too-many-files":
      return config.maxFiles !== undefined
        ? `was left out (up to ${config.maxFiles} files)`
        : "was left out (too many files)"
    default:
      return `was rejected (${reason})`
  }
}

function defaultAnnouncement({ added, removed, rejected }: FileInputChange) {
  const parts: string[] = []
  if (added.length) {
    parts.push(
      added.length === 1
        ? `Added ${added[0].name}.`
        : `Added ${added.length} files.`
    )
  } else if (removed.length) {
    parts.push(
      removed.length === 1
        ? `Removed ${removed[0].name}.`
        : `Removed ${removed.length} files.`
    )
  }
  if (rejected.length) {
    parts.push(
      rejected.length === 1
        ? `${rejected[0].file.name} was rejected.`
        : `${rejected.length} files were rejected.`
    )
  }
  return parts.length ? parts.join(" ") : null
}

const IGNORED_FILES = new Set([".DS_Store", "Thumbs.db", "desktop.ini"])
const MAX_FOLDER_FILES = 1000

function hasFiles(event: DragEvent) {
  return Array.from(event.dataTransfer?.types ?? []).includes("Files")
}

function isNativeFileInput(target: EventTarget | null) {
  return (
    target instanceof Element && target.closest('input[type="file"]') !== null
  )
}

let guardCount = 0
let internalDrag = false

function guardDrag(event: DragEvent) {
  if (hasFiles(event) && !isNativeFileInput(event.target))
    event.preventDefault()
}
function markInternalDrag() {
  internalDrag = true
}
function clearInternalDrag() {
  internalDrag = false
}

function useDropGuard() {
  useEffect(() => {
    if (guardCount++ === 0) {
      window.addEventListener("dragover", guardDrag)
      window.addEventListener("drop", guardDrag)
      window.addEventListener("dragstart", markInternalDrag)
      window.addEventListener("dragend", clearInternalDrag)
    }
    return () => {
      if (--guardCount === 0) {
        window.removeEventListener("dragover", guardDrag)
        window.removeEventListener("drop", guardDrag)
        window.removeEventListener("dragstart", markInternalDrag)
        window.removeEventListener("dragend", clearInternalDrag)
      }
    }
  }, [])
}

function readEntryFile(entry: FileSystemFileEntry) {
  return new Promise<File | null>((resolve) =>
    entry.file(
      (file) => resolve(file),
      () => resolve(null)
    )
  )
}

function readDirectoryEntries(reader: FileSystemDirectoryReader) {
  return new Promise<FileSystemEntry[]>((resolve) =>
    reader.readEntries(
      (entries) => resolve(entries),
      () => resolve([])
    )
  )
}

async function walkEntry(
  entry: FileSystemEntry,
  parent: string,
  output: File[]
): Promise<void> {
  if (output.length >= MAX_FOLDER_FILES) return
  if (entry.isFile) {
    if (IGNORED_FILES.has(entry.name) || entry.name.startsWith("._")) return
    const file = await readEntryFile(entry as FileSystemFileEntry)
    if (file) {
      relativePaths.set(file, `${parent}${entry.name}`)
      output.push(file)
    }
    return
  }
  if (entry.isDirectory) {
    const reader = (entry as FileSystemDirectoryEntry).createReader()
    for (;;) {
      const batch = await readDirectoryEntries(reader)
      if (batch.length === 0) break
      for (const child of batch) {
        await walkEntry(child, `${parent}${entry.name}/`, output)
      }
    }
  }
}

/** Reads dropped files. With `directory`, folders are read recursively. */
async function collectDroppedFiles(
  dataTransfer: DataTransfer,
  directory: boolean
): Promise<File[]> {
  const items = Array.from(dataTransfer.items ?? [])
  if (
    directory &&
    items.some((item) => typeof item.webkitGetAsEntry === "function")
  ) {
    // Entries must be read before the first await: items die after the event.
    const entries = items
      .map((item) => item.webkitGetAsEntry())
      .filter((entry): entry is FileSystemEntry => entry !== null)
    const output: File[] = []
    for (const entry of entries) await walkEntry(entry, "", output)
    return output
  }
  return Array.from(dataTransfer.files)
}

type ControllerImplementation = Omit<FileInputController, never>

const controllerAttachers = new WeakMap<
  FileInputController,
  (implementation: ControllerImplementation | null) => void
>()

/**
 * Creates a controller for actions outside the file input. Pass it as the
 * `controller` prop of `FileInput`.
 */
function createFileInputController(): FileInputController {
  let implementation: ControllerImplementation | null = null

  const controller: FileInputController = {
    getValue: () => implementation?.getValue() ?? [],
    setValue: (files, options) =>
      implementation?.setValue(files, options) ?? false,
    addFiles: (files, options) =>
      implementation?.addFiles(files, options) ?? false,
    removeFile: (file, options) =>
      implementation?.removeFile(file, options) ?? false,
    clear: (options) => implementation?.clear(options) ?? false,
    open: () => implementation?.open() ?? false,
    focus: () => implementation?.focus(),
    isDragging: () => implementation?.isDragging() ?? false,
  }

  controllerAttachers.set(controller, (next) => {
    implementation = next
  })

  return controller
}

function Icon({ children, ...props }: ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
}

function UploadIcon(props: ComponentProps<"svg">) {
  return (
    <Icon {...props}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="m17 8-5-5-5 5" />
      <path d="M12 3v12" />
    </Icon>
  )
}

function FileIcon(props: ComponentProps<"svg">) {
  return (
    <Icon {...props}>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </Icon>
  )
}

function XIcon(props: ComponentProps<"svg">) {
  return (
    <Icon {...props}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </Icon>
  )
}

type FileInputConfig = {
  patterns: string[]
  multiple: boolean
  directory: boolean
  capacity: number
}

type FileInputApi = {
  addFiles: (
    files: readonly File[],
    reason: FileInputValueChangeReason,
    event?: Event
  ) => boolean
  removeFile: (
    file: File,
    reason: FileInputValueChangeReason,
    event?: Event
  ) => boolean
  open: () => boolean
  focusTrigger: () => void
  getConfig: () => FileInputConfig
}

type FileInputContextValue = {
  state: FileInputState
  api: FileInputApi
  rejected: FileRejection[]
  limits: { maxSize?: number; minSize?: number; maxFiles?: number }
  setZoneDragging: (id: string, dragging: boolean) => void
  triggerRef: RefObject<HTMLElement | null>
}

const FileInputContext = createContext<FileInputContextValue | null>(null)

function useFileInputContext(part: string) {
  const context = useContext(FileInputContext)
  if (!context) throw new Error(`${part} must be used inside <FileInput>.`)
  return context
}

type ItemContextValue = { file: File; index: number }
const FileInputItemContext = createContext<ItemContextValue | null>(null)

type ListContextValue = {
  activeIndex: number
  setActiveIndex: (index: number) => void
  focusItem: (index: number) => void
}
const FileInputListContext = createContext<ListContextValue | null>(null)

function rootAttributes(state: FileInputState) {
  return {
    "data-disabled": state.disabled ? "" : undefined,
    "data-required": state.required ? "" : undefined,
    "data-dragging": state.dragging ? "" : undefined,
    "data-invalid": state.invalid ? "" : undefined,
  }
}

type FileInputProps = Omit<
  ComponentProps<"div">,
  "children" | "className" | "defaultValue"
> & {
  className?: string | ((state: FileInputState) => string | undefined)
  children?: ReactNode | ((state: FileInputState) => ReactNode)
  /** MIME types, wildcards and extensions: `"image/*"`, `".pdf"`. */
  accept?: string | readonly string[]
  /** The most files accepted in total. */
  maxFiles?: number
  /** The largest file size accepted, in bytes. */
  maxSize?: number
  /** The smallest file size accepted, in bytes. */
  minSize?: number
  /** A check of your own. Return a reason to reject the file. */
  validate?: (file: File) => string | null | undefined | void
  /** The files, for a controlled file input. */
  value?: File[]
  /** The files at first. A form reset returns to them. */
  defaultValue?: File[]
  /** Runs when files are added or removed. `details.cancel()` stops it. */
  onValueChange?: (value: File[], details: FileInputChangeDetails) => void
  /** Runs when files fail the checks, even when none were accepted. */
  onReject?: (
    rejected: FileRejection[],
    details: FileInputRejectDetails
  ) => void
  /** Hold more than one file. Without it, a new file replaces the current one. */
  multiple?: boolean
  /** Pick a whole folder. Turns on `multiple`. */
  directory?: boolean
  /** Open the camera on phones. */
  capture?: "environment" | "user" | boolean
  /** The name the files submit under. */
  name?: string
  /** The id of a form the file input belongs to. */
  form?: string
  /** Block form submission until a file is chosen. */
  required?: boolean
  /** Disable picks, drops and pastes. */
  disabled?: boolean
  /** Marks the file input invalid (`data-invalid`, `aria-invalid` on the trigger). */
  invalid?: boolean
  /** What screen readers hear after a change. Return `null` for nothing. */
  announcement?: (change: FileInputChange) => string | null | undefined
  /** Adds and removes files from anywhere. */
  controller?: FileInputController
}

/**
 * Root of the file input. Holds the files, runs the checks, renders the hidden
 * native input and the live region, and submits the files with a form.
 */
function FileInput({
  className,
  children,
  accept,
  maxFiles,
  maxSize,
  minSize,
  validate,
  value: valueProp,
  defaultValue,
  onValueChange,
  onReject,
  multiple: multipleProp = false,
  directory = false,
  capture,
  name,
  form,
  required = false,
  disabled = false,
  invalid = false,
  announcement,
  controller,
  ...props
}: FileInputProps) {
  const multiple = multipleProp || directory
  const inputRef = useRef<HTMLInputElement | null>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  const controlled = valueProp !== undefined
  const [valueState, setValueState] = useState<File[]>(defaultValue ?? [])
  const value = controlled ? valueProp : valueState

  const [announcementText, setAnnouncementText] = useState("")
  const [rejected, setRejected] = useState<FileRejection[]>([])
  const [zones, setZones] = useState<string[]>([])
  const dragging = zones.length > 0
  const zonesRef = useRef(zones)
  // eslint-disable-next-line react-hooks/refs
  zonesRef.current = zones

  const latest = useRef({
    value,
    controlled,
    defaultValue,
    accept,
    maxFiles,
    maxSize,
    minSize,
    validate,
    multiple,
    directory,
    disabled,
    announcement,
    onValueChange,
    onReject,
  })
  useLayoutEffect(() => {
    latest.current = {
      value,
      controlled,
      defaultValue,
      accept,
      maxFiles,
      maxSize,
      minSize,
      validate,
      multiple,
      directory,
      disabled,
      announcement,
      onValueChange,
      onReject,
    }
  })

  function syncNativeInput(files: readonly File[]) {
    const input = inputRef.current
    if (!input) return
    try {
      const transfer = new DataTransfer()
      files.forEach((file) => transfer.items.add(file))
      input.files = transfer.files
    } catch {
      // DataTransfer is not available: the native input just stays as it is.
    }
  }

  // Keep the native input in step, so a form submits (and validates) the files.
  useLayoutEffect(() => {
    syncNativeInput(value)
  }, [value])

  function commit(
    next: File[],
    change: Omit<FileInputChange, "value">,
    event?: Event
  ) {
    const current = latest.current
    const details = createDetails({ ...change, event })
    let applied = false

    if (change.added.length > 0 || change.removed.length > 0) {
      current.onValueChange?.(next, details)
      if (!details.isCanceled) {
        if (!current.controlled) {
          current.value = next
          setValueState(next)
        }
        applied = true
      }
    }

    if (change.rejected.length > 0) {
      current.onReject?.(change.rejected, { reason: change.reason, event })
    }
    setRejected(change.rejected)

    const summary: FileInputChange = {
      ...change,
      added: applied ? change.added : [],
      removed: applied ? change.removed : [],
      value: applied ? next : current.value,
    }
    const message = current.announcement
      ? current.announcement(summary)
      : defaultAnnouncement(summary)
    setAnnouncementText(message ?? "")
    return applied
  }

  function runChecks(files: readonly File[], currentValue: readonly File[]) {
    const current = latest.current
    const patterns = parseAccept(current.accept)
    const capacity = current.multiple
      ? current.maxFiles === undefined
        ? Infinity
        : Math.max(0, current.maxFiles - currentValue.length)
      : 1
    const accepted: File[] = []
    const rejectedFiles: FileRejection[] = []

    for (const file of files) {
      const reasons: FileRejectionReason[] = []
      if (!fileMatchesAccept(file, patterns)) reasons.push("file-type")
      if (current.maxSize !== undefined && file.size > current.maxSize) {
        reasons.push("file-too-large")
      }
      if (current.minSize !== undefined && file.size < current.minSize) {
        reasons.push("file-too-small")
      }
      if (reasons.length === 0 && current.validate) {
        const reason = current.validate(file)
        if (reason) reasons.push(reason)
      }
      if (reasons.length === 0 && accepted.length >= capacity) {
        reasons.push("too-many-files")
      }
      if (reasons.length > 0) rejectedFiles.push({ file, reasons })
      else accepted.push(file)
    }
    return { accepted, rejected: rejectedFiles }
  }

  function addFiles(
    files: readonly File[],
    reason: FileInputValueChangeReason,
    event?: Event
  ) {
    const current = latest.current
    if (current.disabled || files.length === 0) return false
    const { accepted, rejected: rejectedFiles } = runChecks(
      files,
      current.value
    )

    let next = current.value
    let removed: File[] = []
    if (accepted.length > 0) {
      if (current.multiple) {
        next = [...current.value, ...accepted]
      } else {
        next = [accepted[0]]
        removed = current.value.filter((file) => file !== accepted[0])
      }
    }
    return commit(
      next,
      { reason, added: accepted, removed, rejected: rejectedFiles },
      event
    )
  }

  function removeFile(
    file: File,
    reason: FileInputValueChangeReason,
    event?: Event
  ) {
    const current = latest.current
    if (current.disabled || !current.value.includes(file)) return false
    const next = current.value.filter((item) => item !== file)
    return commit(
      next,
      { reason, added: [], removed: [file], rejected: [] },
      event
    )
  }

  function open() {
    const input = inputRef.current
    if (!input || latest.current.disabled) return false
    input.click()
    return true
  }

  const requests = useRef({
    addFiles,
    removeFile,
    commit,
    open,
    syncNativeInput,
  })
  useLayoutEffect(() => {
    requests.current = { addFiles, removeFile, commit, open, syncNativeInput }
  })

  // A form reset returns to the default value.
  useEffect(() => {
    const formElement = inputRef.current?.form
    if (!formElement) return
    function onReset(event: Event) {
      const current = latest.current
      const initial = current.defaultValue ?? []
      const removed = current.value.filter((file) => !initial.includes(file))
      const added = initial.filter((file) => !current.value.includes(file))
      requests.current.commit(
        initial,
        { reason: "reset", added, removed, rejected: [] },
        event
      )
      // The browser clears the native input after this event; put the files back.
      setTimeout(
        () => requests.current.syncNativeInput(latest.current.value),
        0
      )
    }
    formElement.addEventListener("reset", onReset)
    return () => formElement.removeEventListener("reset", onReset)
  }, [form])

  // Attach the controller.
  useEffect(() => {
    if (!controller) return
    const attach = controllerAttachers.get(controller)
    attach?.({
      getValue: () => latest.current.value,
      setValue: (files, options) => {
        const current = latest.current.value
        const added = files.filter((file) => !current.includes(file))
        const removed = current.filter((file) => !files.includes(file))
        return requests.current.commit(
          [...files],
          {
            reason: options?.reason ?? "imperative",
            added,
            removed,
            rejected: [],
          },
          options?.event
        )
      },
      addFiles: (files, options) =>
        requests.current.addFiles(
          Array.from(files),
          options?.reason ?? "imperative",
          options?.event
        ),
      removeFile: (file, options) =>
        requests.current.removeFile(
          file,
          options?.reason ?? "imperative",
          options?.event
        ),
      clear: (options) => {
        const current = latest.current.value
        return requests.current.commit(
          [],
          {
            reason: options?.reason ?? "imperative",
            added: [],
            removed: [...current],
            rejected: [],
          },
          options?.event
        )
      },
      open: () => requests.current.open(),
      focus: () => triggerRef.current?.focus(),
      isDragging: () => zonesRef.current.length > 0,
    })
    return () => attach?.(null)
  }, [controller])

  const state: FileInputState = { value, disabled, required, dragging, invalid }

  const api: FileInputApi = {
    addFiles: (files, reason, event) =>
      requests.current.addFiles(files, reason, event),
    removeFile: (file, reason, event) =>
      requests.current.removeFile(file, reason, event),
    open: () => requests.current.open(),
    focusTrigger: () => triggerRef.current?.focus(),
    getConfig: () => {
      const current = latest.current
      return {
        patterns: parseAccept(current.accept),
        multiple: current.multiple,
        directory: current.directory,
        capacity: current.multiple
          ? current.maxFiles === undefined
            ? Infinity
            : Math.max(0, current.maxFiles - current.value.length)
          : 1,
      }
    },
  }

  const context: FileInputContextValue = {
    state,
    api,
    rejected,
    limits: { maxSize, minSize, maxFiles },
    triggerRef,
    setZoneDragging: (id, isDragging) =>
      setZones((current) => {
        const has = current.includes(id)
        if (isDragging && !has) return [...current, id]
        if (!isDragging && has) return current.filter((item) => item !== id)
        return current
      }),
  }

  return (
    <FileInputContext value={context}>
      <div
        data-slot="file-input"
        {...rootAttributes(state)}
        {...props}
        className={cn(
          "np-file-input",
          typeof className === "function" ? className(state) : className
        )}
      >
        {typeof children === "function" ? children(state) : children}
        <input
          ref={inputRef}
          type="file"
          className="np-file-input-native"
          tabIndex={-1}
          aria-hidden="true"
          name={name}
          form={form}
          accept={parseAccept(accept).join(",") || undefined}
          multiple={multiple}
          required={required}
          disabled={disabled}
          capture={capture === false ? undefined : capture}
          {...(directory ? ({ webkitdirectory: "" } as object) : {})}
          onChange={(event) => {
            const input = event.currentTarget
            const files = Array.from(input.files ?? [])
            addFiles(files, "picker", event.nativeEvent)
            // Whatever happened, the input must mirror the value again.
            syncNativeInput(latest.current.value)
          }}
        />
        <div
          className="np-file-input-live"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {announcementText}
        </div>
      </div>
    </FileInputContext>
  )
}

type FileInputTriggerProps = Omit<ComponentProps<typeof Button>, "children"> & {
  children?: ReactNode | ((state: FileInputState) => ReactNode)
  /** Connects a trigger outside the file input to it. */
  controller?: FileInputController
}

/**
 * Button that opens the system file picker. It renders the nepui Button, so
 * `variant` and `size` work here. Inside a `FileInput`, it reads the state.
 */
function FileInputTrigger({
  className,
  children,
  controller,
  disabled: disabledProp,
  onClick,
  ...props
}: FileInputTriggerProps) {
  const context = useContext(FileInputContext)
  if (!context && !controller) {
    throw new Error(
      "FileInputTrigger must be used inside <FileInput> or get a controller."
    )
  }
  const state: FileInputState = context?.state ?? {
    value: controller?.getValue() ?? [],
    disabled: false,
    required: false,
    dragging: controller?.isDragging() ?? false,
    invalid: false,
  }

  return (
    <Button
      ref={(node: HTMLElement | null) => {
        // eslint-disable-next-line react-hooks/immutability
        if (context) context.triggerRef.current = node
      }}
      data-slot="file-input-trigger"
      type="button"
      variant="outline"
      aria-invalid={state.invalid ? true : undefined}
      data-required={state.required ? "" : undefined}
      {...props}
      disabled={state.disabled || disabledProp}
      onClick={(event) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        if (context) context.api.open()
        else controller?.open()
      }}
      className={cn("np-file-input-trigger", className)}
    >
      {typeof children === "function" ? children(state) : children}
    </Button>
  )
}

type FileInputPasteTarget =
  "document" | string | Element | (() => Element | null | undefined)

type FileInputDropzoneProps = Omit<
  ComponentProps<"div">,
  "children" | "className"
> & {
  className?: string | ((state: FileInputDropzoneState) => string | undefined)
  children?: ReactNode | ((state: FileInputDropzoneState) => ReactNode)
  /**
   * Where it takes drops. `"document"` takes files dropped anywhere on the
   * page, so the zone can be a full-page overlay (`data-variant="overlay"`).
   * @default "self"
   */
  target?: "self" | "document"
  /** Somewhere else to take pasted files from: an element, a selector, a function, or `"document"`. */
  pasteTarget?: FileInputPasteTarget
}

const handledPastes = new WeakSet<Event>()

/**
 * Takes files that are dropped on it, or pasted while focus is inside it. Keep
 * a `FileInputTrigger` beside it for people using a keyboard.
 */
function FileInputDropzone({
  className,
  children,
  target = "self",
  pasteTarget,
  ...props
}: FileInputDropzoneProps) {
  const context = useFileInputContext("FileInputDropzone")
  const { api, setZoneDragging } = context
  const disabled = context.state.disabled
  const id = useId()
  const elementRef = useRef<HTMLDivElement | null>(null)
  const [dragging, setDragging] = useState(false)
  const [verdict, setVerdict] = useState<"accept" | "reject" | null>(null)

  const latest = useRef({ api, setZoneDragging })
  useLayoutEffect(() => {
    latest.current = { api, setZoneDragging }
  })

  useDropGuard()

  // Drag, drop and paste listeners.
  useEffect(() => {
    const element = elementRef.current
    const eventTarget: EventTarget | null =
      target === "document" ? document : element
    if (!eventTarget) return
    let depth = 0

    function reset() {
      depth = 0
      setDragging(false)
      setVerdict(null)
      latest.current.setZoneDragging(id, false)
    }

    function judge(event: DragEvent) {
      const config = latest.current.api.getConfig()
      const items = Array.from(event.dataTransfer?.items ?? []).filter(
        (item) => item.kind === "file"
      )
      if (items.length === 0) return "accept"
      const onlyMime =
        config.patterns.length > 0 &&
        !config.patterns.some((p) => p.startsWith("."))
      if (onlyMime) {
        for (const item of items) {
          const type = item.type.toLowerCase()
          if (
            type &&
            !config.patterns.some((pattern) => mimeMatches(type, pattern))
          ) {
            return "reject"
          }
        }
      }
      if (config.multiple && items.length > config.capacity) return "reject"
      return "accept"
    }

    function onDragEnter(raw: Event) {
      const event = raw as DragEvent
      if (disabled || internalDrag || !hasFiles(event)) return
      event.preventDefault()
      depth++
      if (depth === 1) {
        setDragging(true)
        setVerdict(judge(event))
        latest.current.setZoneDragging(id, true)
      }
    }
    function onDragOver(raw: Event) {
      const event = raw as DragEvent
      if (disabled || internalDrag || !hasFiles(event)) return
      event.preventDefault()
      if (event.dataTransfer) event.dataTransfer.dropEffect = "copy"
    }
    function onDragLeave(raw: Event) {
      const event = raw as DragEvent
      if (!hasFiles(event)) return
      depth = Math.max(0, depth - 1)
      if (depth === 0) reset()
    }
    function onDrop(raw: Event) {
      const event = raw as DragEvent
      if (disabled || internalDrag || !hasFiles(event) || !event.dataTransfer) {
        reset()
        return
      }
      event.preventDefault()
      // A drop on a zone never reaches a page-wide zone.
      event.stopPropagation()
      reset()
      const config = latest.current.api.getConfig()
      void collectDroppedFiles(event.dataTransfer, config.directory).then(
        (files) => {
          latest.current.api.addFiles(files, "drop", event)
        }
      )
    }
    function onPaste(raw: Event) {
      const event = raw as ClipboardEvent
      if (disabled || handledPastes.has(event)) return
      const files = Array.from(event.clipboardData?.files ?? [])
      if (files.length === 0) return // text pastes keep their normal behavior
      handledPastes.add(event)
      event.preventDefault()
      latest.current.api.addFiles(files, "paste", event)
    }

    eventTarget.addEventListener("dragenter", onDragEnter)
    eventTarget.addEventListener("dragover", onDragOver)
    eventTarget.addEventListener("dragleave", onDragLeave)
    eventTarget.addEventListener("drop", onDrop)

    // Pastes: inside the zone, and in the optional paste target.
    const pasteTargets: EventTarget[] = []
    if (element) pasteTargets.push(element)
    if (pasteTarget === "document") pasteTargets.push(document)
    else if (typeof pasteTarget === "string") {
      const found = document.querySelector(pasteTarget)
      if (found) pasteTargets.push(found)
    } else if (typeof pasteTarget === "function") {
      const found = pasteTarget()
      if (found) pasteTargets.push(found)
    } else if (pasteTarget) pasteTargets.push(pasteTarget)
    pasteTargets.forEach((item) => item.addEventListener("paste", onPaste))

    return () => {
      eventTarget.removeEventListener("dragenter", onDragEnter)
      eventTarget.removeEventListener("dragover", onDragOver)
      eventTarget.removeEventListener("dragleave", onDragLeave)
      eventTarget.removeEventListener("drop", onDrop)
      pasteTargets.forEach((item) => item.removeEventListener("paste", onPaste))
      reset()
    }
  }, [target, pasteTarget, disabled, id])

  const state: FileInputDropzoneState = {
    dragging,
    dragAccept: dragging && verdict === "accept",
    dragReject: dragging && verdict === "reject",
    disabled,
  }

  return (
    <div
      ref={elementRef}
      data-slot="file-input-dropzone"
      data-dragging={state.dragging ? "" : undefined}
      data-drag-accept={state.dragAccept ? "" : undefined}
      data-drag-reject={state.dragReject ? "" : undefined}
      data-disabled={state.disabled ? "" : undefined}
      data-invalid={context.state.invalid ? "" : undefined}
      {...props}
      className={cn(
        "np-file-input-dropzone",
        typeof className === "function" ? className(state) : className
      )}
    >
      {typeof children === "function" ? children(state) : children}
    </div>
  )
}

/** The round icon of a dropzone. Defaults to an upload arrow. */
function FileInputDropzoneIcon({
  className,
  children,
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      data-slot="file-input-dropzone-icon"
      className={cn("np-file-input-dropzone-icon", className)}
      {...props}
    >
      {children ?? <UploadIcon />}
    </span>
  )
}

/** The main line of a dropzone. */
function FileInputDropzoneTitle({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="file-input-dropzone-title"
      className={cn("np-file-input-dropzone-title", className)}
      {...props}
    />
  )
}

/** The hint under the title of a dropzone. */
function FileInputDropzoneDescription({
  className,
  ...props
}: ComponentProps<"p">) {
  return (
    <p
      data-slot="file-input-dropzone-description"
      className={cn("np-file-input-dropzone-description", className)}
      {...props}
    />
  )
}

type FileInputListProps = Omit<ComponentProps<"ul">, "children"> & {
  /** A single `FileInputItem`. The list renders it once for each file. */
  children?: ReactNode
}

/**
 * Renders its item once for each file. The list is one Tab stop: arrow keys,
 * Home and End move between files, and Delete or Backspace removes one.
 */
function FileInputList({ className, children, ...props }: FileInputListProps) {
  const context = useFileInputContext("FileInputList")
  const listRef = useRef<HTMLUListElement | null>(null)
  const [active, setActive] = useState(0)
  const files = context.state.value
  const activeIndex = Math.min(active, Math.max(0, files.length - 1))

  function focusItem(index: number) {
    const items = listRef.current?.querySelectorAll<HTMLElement>(
      '[data-slot="file-input-item"]'
    )
    const target = items?.[index]
    if (target) {
      target.focus()
      setActive(index)
    }
  }

  return (
    <FileInputListContext
      value={{ activeIndex, setActiveIndex: setActive, focusItem }}
    >
      <ul
        ref={listRef}
        role="list"
        data-slot="file-input-list"
        data-disabled={context.state.disabled ? "" : undefined}
        data-required={context.state.required ? "" : undefined}
        {...props}
        className={cn("np-file-input-list", className)}
      >
        {files.map((file, index) => (
          <FileInputItemContext key={getFileKey(file)} value={{ file, index }}>
            {children}
          </FileInputItemContext>
        ))}
      </ul>
    </FileInputListContext>
  )
}

type FileInputItemProps = Omit<
  ComponentProps<"li">,
  "children" | "className"
> & {
  className?: string | ((state: FileInputItemState) => string | undefined)
  children?: ReactNode | ((state: FileInputItemState) => ReactNode)
  /** The file this item shows. The list passes it for you. */
  file?: File
}

function useItemContext(part: string) {
  const item = useContext(FileInputItemContext)
  if (!item) throw new Error(`${part} must be used inside a <FileInputItem>.`)
  return item
}

/** One file in the list. Its children can be a function of `{ file, index }`. */
function FileInputItem({
  className,
  children,
  file: fileProp,
  onKeyDown,
  onFocus,
  ...props
}: FileInputItemProps) {
  const context = useFileInputContext("FileInputItem")
  const list = useContext(FileInputListContext)
  const item = useContext(FileInputItemContext)
  const file = fileProp ?? item?.file
  if (!file)
    throw new Error(
      "FileInputItem needs a file: use it inside a list, or pass `file`."
    )
  const index = item?.index ?? context.state.value.indexOf(file)
  const state: FileInputItemState = {
    file,
    index,
    disabled: context.state.disabled,
  }

  function remove(event: Event) {
    const count = context.state.value.length
    if (context.api.removeFile(file!, "remove-press", event)) {
      // Focus the next file, or the previous one, or the trigger.
      setTimeout(() => {
        if (count <= 1) context.api.focusTrigger()
        else list?.focusItem(Math.min(index, count - 2))
      }, 0)
    }
  }

  return (
    <li
      data-slot="file-input-item"
      data-disabled={state.disabled ? "" : undefined}
      tabIndex={list ? (index === list.activeIndex ? 0 : -1) : undefined}
      {...props}
      onFocus={(event) => {
        onFocus?.(event)
        if (event.target === event.currentTarget) list?.setActiveIndex(index)
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event)
        if (
          event.defaultPrevented ||
          event.target !== event.currentTarget ||
          !list
        )
          return
        const last = context.state.value.length - 1
        switch (event.key) {
          case "ArrowDown":
          case "ArrowRight":
            event.preventDefault()
            list.focusItem(Math.min(index + 1, last))
            break
          case "ArrowUp":
          case "ArrowLeft":
            event.preventDefault()
            list.focusItem(Math.max(index - 1, 0))
            break
          case "Home":
            event.preventDefault()
            list.focusItem(0)
            break
          case "End":
            event.preventDefault()
            list.focusItem(last)
            break
          case "Delete":
          case "Backspace":
            event.preventDefault()
            remove(event.nativeEvent)
            break
        }
      }}
      className={cn(
        "np-file-input-item",
        typeof className === "function" ? className(state) : className
      )}
    >
      {typeof children === "function" ? children(state) : children}
    </li>
  )
}

/** A thumbnail for images, or a file icon for everything else. */
function FileInputItemPreview({
  className,
  children,
  ...props
}: ComponentProps<"span">) {
  const { file } = useItemContext("FileInputItemPreview")
  const [url, setUrl] = useState<string>()
  const isImage = file.type.startsWith("image/")

  useEffect(() => {
    if (!isImage) return
    const next = URL.createObjectURL(file)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUrl(next)
    return () => URL.revokeObjectURL(next)
  }, [file, isImage])

  return (
    <span
      data-slot="file-input-item-preview"
      className={cn("np-file-input-item-preview", className)}
      {...props}
    >
      {children ?? (isImage && url ? <img src={url} alt="" /> : <FileIcon />)}
    </span>
  )
}

/** Wraps the name and the size, one above the other. */
function FileInputItemDetails({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="file-input-item-details"
      className={cn("np-file-input-item-details", className)}
      {...props}
    />
  )
}

/** The file name. Truncates with an ellipsis. */
function FileInputItemName({
  className,
  children,
  ...props
}: ComponentProps<"span">) {
  const { file } = useItemContext("FileInputItemName")
  return (
    <span
      data-slot="file-input-item-name"
      title={file.name}
      className={cn("np-file-input-item-name", className)}
      {...props}
    >
      {children ?? file.name}
    </span>
  )
}

/** The file size, such as "1.2 MB". */
function FileInputItemSize({
  className,
  children,
  ...props
}: ComponentProps<"span">) {
  const { file } = useItemContext("FileInputItemSize")
  return (
    <span
      data-slot="file-input-item-size"
      className={cn("np-file-input-item-size", className)}
      {...props}
    >
      {children ?? formatFileSize(file.size)}
    </span>
  )
}

type FileInputItemRemoveProps = ComponentProps<typeof Button>

/**
 * Removes its item's file. It is named for the file and stays out of the Tab
 * order. It renders the nepui Button.
 */
function FileInputItemRemove({
  className,
  children,
  onClick,
  disabled: disabledProp,
  ...props
}: FileInputItemRemoveProps) {
  const context = useFileInputContext("FileInputItemRemove")
  const { file } = useItemContext("FileInputItemRemove")

  return (
    <Button
      data-slot="file-input-item-remove"
      type="button"
      variant="ghost"
      size="icon-xs"
      tabIndex={-1}
      aria-label={`Remove ${file.name}`}
      {...props}
      disabled={context.state.disabled || disabledProp}
      onClick={(event) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        context.api.removeFile(file, "remove-press", event.nativeEvent)
      }}
      className={cn("np-file-input-item-remove", className)}
    >
      {children ?? <XIcon />}
    </Button>
  )
}

/* ───────────────────────── Rejections ───────────────────────── */

type FileInputRejectionsProps = Omit<ComponentProps<"ul">, "children"> & {
  /** Custom rows. Defaults to one line per rejected file. */
  children?: (rejected: FileRejection[]) => ReactNode
}

/**
 * Lists the files left out by the last drop, paste or pick, and why. It is
 * empty (and hidden) when nothing was rejected.
 */
function FileInputRejections({
  className,
  children,
  ...props
}: FileInputRejectionsProps) {
  const { rejected, limits } = useFileInputContext("FileInputRejections")

  return (
    <ul
      data-slot="file-input-rejections"
      role="alert"
      className={cn("np-file-input-rejections", className)}
      {...props}
    >
      {children
        ? children(rejected)
        : rejected.map(({ file, reasons }) => (
            <li key={getFileKey(file)}>
              <b>{file.name}</b> {describeRejection(reasons[0], limits)}
            </li>
          ))}
    </ul>
  )
}

export {
  FileInput,
  FileInputDropzone,
  FileInputDropzoneDescription,
  FileInputDropzoneIcon,
  FileInputDropzoneTitle,
  FileInputItem,
  FileInputItemDetails,
  FileInputItemName,
  FileInputItemPreview,
  FileInputItemRemove,
  FileInputItemSize,
  FileInputList,
  FileInputRejections,
  FileInputTrigger,
  createFileInputController,
  formatFileSize,
  relativePath,
}
export type {
  FileInputChange,
  FileInputChangeDetails,
  FileInputChangeOptions,
  FileInputController,
  FileInputDropzoneProps,
  FileInputDropzoneState,
  FileInputItemProps,
  FileInputItemState,
  FileInputListProps,
  FileInputProps,
  FileInputRejectDetails,
  FileInputState,
  FileInputTriggerProps,
  FileInputValueChangeReason,
  FileRejection,
  FileRejectionReason,
}
