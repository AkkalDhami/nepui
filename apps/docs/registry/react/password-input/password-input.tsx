/* eslint-disable react-hooks/refs */
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

import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from "@/registry/react/input-group"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./password-input.css"

type PasswordInputSize = "xs" | "sm" | "default" | "lg"

type PasswordInputValueChangeReason = "input-change" | "reset" | "imperative"

type PasswordInputVisibleChangeReason =
  "toggle-press" | "form-submit" | "reset" | "page-hide" | "imperative"

type PasswordInputChangeDetails<Reason extends string> = {
  /** Why the change happened. */
  reason: Reason
  /** The DOM event behind the change, if any. */
  event: Event | undefined
  /** Call it inside the change callback to reject the change. */
  cancel: () => void
  /** Whether `cancel()` was called. */
  readonly isCanceled: boolean
}

type PasswordInputChangeOptions<Reason extends string> = {
  reason?: Reason
  event?: Event
}

type PasswordInputState = {
  /** Whether the password is shown. */
  visible: boolean
  /** Whether Caps Lock is on while the control has focus. */
  capsLock: boolean
  /** Whether the control holds any text. */
  filled: boolean
  /** Whether the root was disabled with the `disabled` prop. */
  disabled: boolean
  /** Whether the control is read-only. */
  readOnly: boolean
  /** Whether a form will not submit while the control is empty. */
  required: boolean
}

type StateClassName =
  string | ((state: PasswordInputState) => string | undefined)

type StateChildren = ReactNode | ((state: PasswordInputState) => ReactNode)

type PasswordInputController = {
  /** The current value. */
  getValue: () => string
  /** Sets the value. Returns `false` when canceled or unchanged. */
  setValue: (
    value: string,
    options?: PasswordInputChangeOptions<PasswordInputValueChangeReason>
  ) => boolean
  /** Empties the control. Returns `false` when canceled or unchanged. */
  clear: (
    options?: PasswordInputChangeOptions<PasswordInputValueChangeReason>
  ) => boolean
  /** Whether the password is shown. */
  isVisible: () => boolean
  /** Shows or hides the password. Returns `false` when canceled. */
  setVisible: (
    visible: boolean,
    options?: PasswordInputChangeOptions<PasswordInputVisibleChangeReason>
  ) => boolean
  /** Flips visibility. Returns `false` when canceled. */
  toggleVisible: (
    options?: PasswordInputChangeOptions<PasswordInputVisibleChangeReason>
  ) => boolean
  /** Moves focus to the control. */
  focus: () => void
}

const sizeClasses: Record<PasswordInputSize, string> = {
  default: "",
  xs: "np-password-input-xs",
  sm: "np-password-input-sm",
  lg: "np-password-input-lg",
}

function resolveClassName(
  base: string,
  className: StateClassName | undefined,
  state: PasswordInputState
) {
  return cn(
    base,
    typeof className === "function" ? className(state) : className
  )
}

function stateAttributes(state: PasswordInputState) {
  return {
    "data-visible": state.visible ? "" : undefined,
    "data-filled": state.filled ? "" : undefined,
    "data-disabled": state.disabled ? "" : undefined,
    "data-readonly": state.readOnly ? "" : undefined,
    "data-required": state.required ? "" : undefined,
    "data-capslock": state.capsLock ? "" : undefined,
  }
}

function createDetails<Reason extends string>(
  reason: Reason,
  event: Event | undefined
): PasswordInputChangeDetails<Reason> {
  let canceled = false
  return {
    reason,
    event,
    cancel() {
      canceled = true
    },
    get isCanceled() {
      return canceled
    },
  }
}

type ControllerImplementation = {
  getValue: PasswordInputController["getValue"]
  setValue: PasswordInputController["setValue"]
  isVisible: PasswordInputController["isVisible"]
  setVisible: PasswordInputController["setVisible"]
  focus: PasswordInputController["focus"]
}

const controllerAttachers = new WeakMap<
  PasswordInputController,
  (implementation: ControllerImplementation | null) => void
>()

function createPasswordInputController(): PasswordInputController {
  let implementation: ControllerImplementation | null = null

  const controller: PasswordInputController = {
    getValue: () => implementation?.getValue() ?? "",
    setValue: (value, options) =>
      implementation?.setValue(value, options) ?? false,
    clear: (options) => implementation?.setValue("", options) ?? false,
    isVisible: () => implementation?.isVisible() ?? false,
    setVisible: (visible, options) =>
      implementation?.setVisible(visible, options) ?? false,
    toggleVisible: (options) =>
      implementation
        ? implementation.setVisible(!implementation.isVisible(), options)
        : false,
    focus: () => implementation?.focus(),
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

function EyeIcon(props: ComponentProps<"svg">) {
  return (
    <Icon {...props}>
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
    </Icon>
  )
}

function EyeOffIcon(props: ComponentProps<"svg">) {
  return (
    <Icon {...props}>
      <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
      <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
      <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
      <path d="m2 2 20 20" />
    </Icon>
  )
}

function LockIcon(props: ComponentProps<"svg">) {
  return (
    <Icon {...props}>
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </Icon>
  )
}

function CheckIcon(props: ComponentProps<"svg">) {
  return (
    <Icon {...props}>
      <path d="M20 6 9 17l-5-5" />
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

type PendingRestore = {
  focus: boolean
  start: number | null
  end: number | null
  direction: "forward" | "backward" | "none" | null
}

type PasswordInputContextValue = {
  id: string
  state: PasswordInputState
  invalid: boolean
  value: string
  name: string | undefined
  form: string | undefined
  autoComplete: string
  inputRef: RefObject<HTMLInputElement | null>
  pendingRestore: RefObject<PendingRestore | null>
  changeValue: (value: string, event: Event | undefined) => void
  toggleVisible: (event: Event | undefined) => boolean
  setCapsLock: (capsLock: boolean) => void
}

const PasswordInputContext = createContext<PasswordInputContextValue | null>(
  null
)

function usePasswordInputContext(part: string) {
  const context = useContext(PasswordInputContext)
  if (!context) {
    throw new Error(`${part} must be used inside <PasswordInput>.`)
  }
  return context
}

type PasswordInputProps = Omit<
  ComponentProps<"div">,
  "children" | "className" | "defaultValue" | "autoComplete" | "id"
> & {
  /** CSS class, or a function of the state. */
  className?: StateClassName
  /** Parts, or a function of the state (for example to read `capsLock`). */
  children?: StateChildren
  /**
   * Height of the control. Matches the Button / Input scale.
   * @default "default"
   */
  size?: PasswordInputSize
  /**
   * Marks the control invalid: sets `data-invalid` on the root and
   * `aria-invalid` on the control.
   * @default false
   */
  invalid?: boolean
  /** The id of the control. Use it with `<label htmlFor>`. Generated if omitted. */
  id?: string
  /** The value, for a controlled input. */
  value?: string
  /** The value it starts with. A form reset returns here. */
  defaultValue?: string
  /** Called when the value changes. Call `details.cancel()` to reject it. */
  onValueChange?: (
    value: string,
    details: PasswordInputChangeDetails<PasswordInputValueChangeReason>
  ) => void
  /** Whether the password is shown, for controlled visibility. */
  visible?: boolean
  /**
   * Whether the password is shown at first.
   * @default false
   */
  defaultVisible?: boolean
  /** Called when the password wants to be shown or hidden. */
  onVisibleChange?: (
    visible: boolean,
    details: PasswordInputChangeDetails<PasswordInputVisibleChangeReason>
  ) => void
  /**
   * What the browser and password managers fill in. Use `"new-password"` when
   * creating or changing a password.
   * @default "current-password"
   */
  autoComplete?: "current-password" | "new-password" | "off" | (string & {})
  /** The name the password submits under. */
  name?: string
  /** The id of the form the control belongs to, when it is outside it. */
  form?: string
  /** Whether a form will not submit while the control is empty. */
  required?: boolean
  /** Disables the control and the toggle. */
  disabled?: boolean
  /** Makes the control read-only. The toggle still works. */
  readOnly?: boolean
  /** Reads, writes, shows and hides the password from anywhere. */
  controller?: PasswordInputController
}

function PasswordInput({
  className,
  children,
  size = "default",
  invalid = false,
  id,
  value: valueProp,
  defaultValue = "",
  onValueChange,
  visible: visibleProp,
  defaultVisible = false,
  onVisibleChange,
  autoComplete = "current-password",
  name,
  form,
  required = false,
  disabled = false,
  readOnly = false,
  controller,
  ...props
}: PasswordInputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const inputRef = useRef<HTMLInputElement | null>(null)
  const pendingRestore = useRef<PendingRestore | null>(null)

  const valueControlled = valueProp !== undefined
  const [valueState, setValueState] = useState(defaultValue)
  const value = valueControlled ? valueProp : valueState

  const visibleControlled = visibleProp !== undefined
  const [visibleState, setVisibleState] = useState(defaultVisible)
  const visible = visibleControlled ? visibleProp : visibleState

  const [capsLock, setCapsLock] = useState(false)

  // Latest values for listeners that must not re-subscribe on every render.
  const latest = useRef({
    value,
    visible,
    valueControlled,
    visibleControlled,
    defaultValue,
    onValueChange,
    onVisibleChange,
  })
  useLayoutEffect(() => {
    latest.current = {
      value,
      visible,
      valueControlled,
      visibleControlled,
      defaultValue,
      onValueChange,
      onVisibleChange,
    }
  })

  function requestValue(
    next: string,
    reason: PasswordInputValueChangeReason,
    event?: Event
  ) {
    const current = latest.current
    if (next === current.value) return false
    const details = createDetails(reason, event)
    current.onValueChange?.(next, details)
    if (details.isCanceled) return false
    if (!current.valueControlled) {
      current.value = next
      setValueState(next)
    }
    return true
  }

  function requestVisible(
    next: boolean,
    reason: PasswordInputVisibleChangeReason,
    event?: Event
  ) {
    const current = latest.current
    if (next === current.visible) return false
    const details = createDetails(reason, event)
    current.onVisibleChange?.(next, details)
    if (details.isCanceled) return false
    if (!current.visibleControlled) {
      current.visible = next
      setVisibleState(next)
    }
    return true
  }

  const requests = useRef({ requestValue, requestVisible })
  useLayoutEffect(() => {
    requests.current = { requestValue, requestVisible }
  })

  useEffect(() => {
    const formElement = inputRef.current?.form

    function onSubmit(event: Event) {
      const input = inputRef.current
      if (!input) return
      input.type = "password"
      const changed = requests.current.requestVisible(
        false,
        "form-submit",
        event
      )
      if (!changed) {
        setTimeout(() => {
          const element = inputRef.current
          if (element)
            element.type = latest.current.visible ? "text" : "password"
        }, 0)
      }
    }

    function onReset(event: Event) {
      requests.current.requestValue(latest.current.defaultValue, "reset", event)
      requests.current.requestVisible(false, "reset", event)
    }

    function onPageHide(event: Event) {
      requests.current.requestVisible(false, "page-hide", event)
    }

    formElement?.addEventListener("submit", onSubmit)
    formElement?.addEventListener("reset", onReset)
    window.addEventListener("pagehide", onPageHide)
    return () => {
      formElement?.removeEventListener("submit", onSubmit)
      formElement?.removeEventListener("reset", onReset)
      window.removeEventListener("pagehide", onPageHide)
    }
  }, [form])

  useEffect(() => {
    if (!controller) return
    const attach = controllerAttachers.get(controller)
    attach?.({
      getValue: () => latest.current.value,
      setValue: (next, options) =>
        requests.current.requestValue(
          next,
          options?.reason ?? "imperative",
          options?.event
        ),
      isVisible: () => latest.current.visible,
      setVisible: (next, options) =>
        requests.current.requestVisible(
          next,
          options?.reason ?? "imperative",
          options?.event
        ),
      focus: () => inputRef.current?.focus(),
    })
    return () => attach?.(null)
  }, [controller])

  useLayoutEffect(() => {
    const pending = pendingRestore.current
    const input = inputRef.current
    if (!pending || !input) return
    pendingRestore.current = null
    if (pending.focus) input.focus({ preventScroll: true })
    if (pending.start !== null && pending.end !== null) {
      try {
        input.setSelectionRange(
          pending.start,
          pending.end,
          pending.direction ?? undefined
        )
      } catch {
        // Ignore errors.
      }
    }
  }, [visible])

  const state: PasswordInputState = {
    visible,
    capsLock,
    filled: value.length > 0,
    disabled,
    readOnly,
    required,
  }

  const context: PasswordInputContextValue = {
    id: inputId,
    state,
    invalid,
    value,
    name,
    form,
    autoComplete,
    inputRef,
    pendingRestore,
    changeValue: (next, event) => {
      requestValue(next, "input-change", event)
    },
    toggleVisible: (event) =>
      requestVisible(!latest.current.visible, "toggle-press", event),
    setCapsLock,
  }

  return (
    <PasswordInputContext value={context}>
      <InputGroup
        data-slot="password-input"
        data-size={size === "default" ? undefined : size}
        data-invalid={invalid ? "" : undefined}
        {...stateAttributes(state)}
        {...props}
        className={resolveClassName(
          cn("np-password-input", sizeClasses[size]),
          className,
          state
        )}
      >
        {typeof children === "function" ? children(state) : children}
      </InputGroup>
    </PasswordInputContext>
  )
}

type PasswordInputControlProps = Omit<
  ComponentProps<typeof InputGroupInput>,
  | "className"
  | "type"
  | "value"
  | "defaultValue"
  | "onValueChange"
  | "id"
  | "name"
  | "form"
  | "required"
  | "disabled"
  | "readOnly"
  | "autoComplete"
  | "size"
> & {
  className?: StateClassName
}

function PasswordInputControl({
  className,
  onKeyDown,
  onKeyUp,
  onMouseDown,
  onBlur,
  ...props
}: PasswordInputControlProps) {
  const context = usePasswordInputContext("PasswordInputControl")
  const { state } = context

  function syncCapsLock(event: {
    getModifierState: (key: "CapsLock") => boolean
  }) {
    context.setCapsLock(event.getModifierState("CapsLock"))
  }

  return (
    <InputGroupInput
      ref={context.inputRef}
      data-slot="password-input-control"
      id={context.id}
      type={state.visible ? "text" : "password"}
      value={context.value}
      onValueChange={(next, details) =>
        context.changeValue(next, details.event)
      }
      name={context.name}
      form={context.form}
      required={state.required}
      disabled={state.disabled}
      readOnly={state.readOnly}
      autoComplete={context.autoComplete}
      spellCheck={false}
      autoCorrect="off"
      autoCapitalize="off"
      aria-invalid={context.invalid ? true : undefined}
      {...stateAttributes(state)}
      {...props}
      onKeyDown={(event) => {
        onKeyDown?.(event)
        syncCapsLock(event)
      }}
      onKeyUp={(event) => {
        onKeyUp?.(event)
        syncCapsLock(event)
      }}
      onMouseDown={(event) => {
        onMouseDown?.(event)
        syncCapsLock(event)
      }}
      onBlur={(event) => {
        onBlur?.(event)
        context.setCapsLock(false)
      }}
      className={resolveClassName(
        "np-password-input-control",
        className,
        state
      )}
    />
  )
}

type PasswordInputToggleProps = Omit<
  ComponentProps<typeof InputGroupButton>,
  "className" | "children" | "size" | "variant" | "type"
> & {
  className?: StateClassName
  children?: StateChildren
}

function PasswordInputToggle({
  className,
  children,
  disabled: disabledProp,
  onClick,
  onMouseDown,
  ...props
}: PasswordInputToggleProps) {
  const context = usePasswordInputContext("PasswordInputToggle")
  const { state } = context

  return (
    <InputGroupButton
      data-slot="password-input-toggle"
      type="button"
      variant="ghost"
      size="icon-sm"
      aria-label="Show password"
      aria-pressed={state.visible}
      aria-controls={context.id}
      {...stateAttributes(state)}
      {...props}
      disabled={state.disabled || disabledProp}
      onMouseDown={(event) => {
        onMouseDown?.(event)
        event.preventDefault()
      }}
      onClick={(event) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        const input = context.inputRef.current
        const pointer = event.detail > 0
        const restore: PendingRestore = {
          focus: pointer,
          start: input?.selectionStart ?? null,
          end: input?.selectionEnd ?? null,
          direction: input?.selectionDirection ?? null,
        }
        if (context.toggleVisible(event.nativeEvent)) {
          // eslint-disable-next-line react-hooks/immutability
          context.pendingRestore.current = restore
        }
      }}
      className={resolveClassName("np-password-input-toggle", className, state)}
    >
      {typeof children === "function"
        ? children(state)
        : (children ?? (state.visible ? <EyeOffIcon /> : <EyeIcon />))}
    </InputGroupButton>
  )
}

type PasswordInputActionProps = Omit<
  ComponentProps<typeof InputGroupButton>,
  "className" | "size" | "variant" | "type"
> & {
  className?: StateClassName
}

function PasswordInputAction({
  className,
  disabled: disabledProp,
  onMouseDown,
  ...props
}: PasswordInputActionProps) {
  const context = usePasswordInputContext("PasswordInputAction")
  const { state } = context

  return (
    <InputGroupButton
      data-slot="password-input-action"
      type="button"
      variant="ghost"
      size="icon-sm"
      {...props}
      disabled={state.disabled || disabledProp}
      onMouseDown={(event) => {
        onMouseDown?.(event)
        event.preventDefault()
      }}
      className={resolveClassName("np-password-input-action", className, state)}
    />
  )
}

function PasswordInputAddon({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="password-input-addon"
      className={cn("np-password-input-addon", className)}
      {...props}
    />
  )
}

function PasswordInputCapsLock({
  className,
  children,
  ...props
}: ComponentProps<"span">) {
  const { state } = usePasswordInputContext("PasswordInputCapsLock")
  if (!state.capsLock) return null

  return (
    <span
      data-slot="password-input-caps-lock"
      role="status"
      aria-label={children ? undefined : "Caps Lock is on"}
      className={cn("np-password-input-caps-lock", className)}
      {...props}
    >
      <LockIcon />
      {children}
    </span>
  )
}

type PasswordInputStrengthProps = Omit<ComponentProps<"div">, "children"> & {
  score: number
  label?: ReactNode
}

function PasswordInputStrength({
  score,
  label,
  className,
  ...props
}: PasswordInputStrengthProps) {
  const level = Math.min(4, Math.max(0, Math.round(score)))

  return (
    <div
      data-slot="password-input-strength"
      role="meter"
      aria-label="Password strength"
      aria-valuemin={0}
      aria-valuemax={4}
      aria-valuenow={level}
      aria-valuetext={typeof label === "string" ? label : undefined}
      data-level={level}
      className={cn("np-password-input-strength", className)}
      {...props}
    >
      <div className="np-password-input-strength-bars" aria-hidden="true">
        <span className="np-password-input-strength-bar" />
        <span className="np-password-input-strength-bar" />
        <span className="np-password-input-strength-bar" />
        <span className="np-password-input-strength-bar" />
      </div>
      {label ? (
        <span className="np-password-input-strength-label">{label}</span>
      ) : null}
    </div>
  )
}

function PasswordInputRequirements({
  className,
  ...props
}: ComponentProps<"ul">) {
  return (
    <ul
      data-slot="password-input-requirements"
      aria-label="Password requirements"
      className={cn("np-password-input-requirements", className)}
      {...props}
    />
  )
}

type PasswordInputRequirementProps = ComponentProps<"li"> & {
  /**
   * Whether the rule is met.
   * @default false
   */
  met?: boolean
}

function PasswordInputRequirement({
  met = false,
  className,
  children,
  ...props
}: PasswordInputRequirementProps) {
  return (
    <li
      data-slot="password-input-requirement"
      data-met={met ? "" : undefined}
      className={cn("np-password-input-requirement", className)}
      {...props}
    >
      {met ? (
        <CheckIcon className="np-password-input-requirement-icon np-password-input-requirement-check" />
      ) : (
        <XIcon className="np-password-input-requirement-icon np-password-input-requirement-x" />
      )}
      <span className="np-password-input-requirement-status">
        {met ? "Done:" : "To do:"}
      </span>
      {children}
    </li>
  )
}

export {
  PasswordInput,
  PasswordInputAction,
  PasswordInputAddon,
  PasswordInputCapsLock,
  PasswordInputControl,
  PasswordInputRequirement,
  PasswordInputRequirements,
  PasswordInputStrength,
  PasswordInputToggle,
  createPasswordInputController,
}

export type {
  PasswordInputActionProps,
  PasswordInputChangeDetails,
  PasswordInputChangeOptions,
  PasswordInputController,
  PasswordInputControlProps,
  PasswordInputProps,
  PasswordInputRequirementProps,
  PasswordInputSize,
  PasswordInputState,
  PasswordInputStrengthProps,
  PasswordInputToggleProps,
  PasswordInputValueChangeReason,
  PasswordInputVisibleChangeReason,
}
