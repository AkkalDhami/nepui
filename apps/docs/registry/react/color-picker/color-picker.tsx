"use client"

import * as React from "react"
import { cn } from "cn"

// NOTE: Update these paths if needed
import "../tokens.css"
import "./color-picker.css"
import {
  DEFAULT_AREA,
  DEFAULT_FORMAT,
  DEFAULT_SLIDER,
  LABELS,
  areaGradient,
  channelRange,
  clamp,
  clampToGamut,
  colorFromModel,
  colorName,
  formatColor,
  hasChannel,
  isOutOfGamut,
  modelFromColor,
  modelToValue,
  paintArea,
  parseColor,
  round,
  sliderGradient,
  toCss,
  withChannel,
  type ColorChannel,
  type ColorFormat,
  type ColorGamut,
  type ColorModel,
  type ColorSpace,
} from "./color"

type ColorPickerChangeReason =
  | "track-press"
  | "drag"
  | "step-key"
  | "input-commit"
  | "item-press"
  | "eye-dropper-pick"
  | "reset"
  | "imperative"

type ColorPickerChangeDetails = {
  reason: ColorPickerChangeReason
  event?: Event
  /** The new color as a CSS color string. */
  color: string
  readonly canceled: boolean
  cancel: () => void
}

type ColorPickerCommitDetails = {
  reason: ColorPickerChangeReason
  event?: Event
  color: string
}

type ColorPickerControllerMethods = {
  getValue: () => string
  setValue: (
    value: string,
    details?: { reason?: ColorPickerChangeReason; event?: Event }
  ) => boolean
  focus: () => void
}

const attach = Symbol("nepui.color-picker.attach")

type ColorPickerController = ColorPickerControllerMethods & {
  [attach]: (methods: ColorPickerControllerMethods | null) => void
}

function createColorPickerController(): ColorPickerController {
  let methods: ColorPickerControllerMethods | null = null
  return {
    [attach]: (next) => {
      methods = next
    },
    getValue: () => methods?.getValue() ?? "",
    setValue: (value, details) => methods?.setValue(value, details) ?? false,
    focus: () => methods?.focus(),
  }
}

type ColorPickerState = {
  /** The current value, written in the picker's format. */
  value: string
  /** The current color as a CSS color string. */
  color: string
  space: ColorSpace
  disabled: boolean
  readOnly: boolean
  required: boolean
  /** True while a drag is past the edge of the gamut. */
  outOfGamut: boolean
}

type ColorPickerSliderState = ColorPickerState & {
  channel: ColorChannel
  /** The channel value in human units. */
  channelValue: number
  orientation: "horizontal" | "vertical"
}

type ColorPickerSwatchItemState = ColorPickerState & {
  selected: boolean
}

type PartProps<S, T extends React.ElementType = "div"> = Omit<
  React.ComponentProps<T>,
  "className" | "children"
> & {
  className?: string | ((state: S) => string)
  children?: React.ReactNode | ((state: S) => React.ReactNode)
  /** Replaces the rendered element. */
  render?:
    | React.ReactElement
    | ((props: Record<string, unknown>, state: S) => React.ReactElement)
}

type PartLike<S> = {
  className?: string | ((state: S) => string)
  children?: React.ReactNode | ((state: S) => React.ReactNode)
  render?:
    | React.ReactElement
    | ((props: Record<string, unknown>, state: S) => React.ReactElement)
  style?: React.CSSProperties
  [key: string]: unknown
}

function renderPart<S>(
  tag: React.ElementType,
  slot: string,
  base: string,
  input: PartLike<S>,
  state: S,
  extra: Record<string, unknown>
) {
  const { className, children, render, style, ...rest } = input
  const props: Record<string, unknown> = {
    "data-slot": slot,
    ...rest,
    ...extra,
    style: { ...(extra.style as React.CSSProperties | undefined), ...style },
    className: cn(
      base,
      typeof className === "function" ? className(state) : className
    ),
    children: typeof children === "function" ? children(state) : children,
  }
  if (typeof render === "function") return render(props, state)
  if (React.isValidElement(render)) {
    const own = render.props as {
      className?: string
      style?: React.CSSProperties
    }
    return React.cloneElement(
      render as React.ReactElement<Record<string, unknown>>,
      {
        ...props,
        ...(render.props as Record<string, unknown>),
        className: cn(props.className as string, own.className),
        style: { ...(props.style as React.CSSProperties), ...own.style },
      }
    )
  }
  return React.createElement(tag, props)
}

function flag(on: boolean) {
  return on ? "" : undefined
}

function stateAttrs(state: ColorPickerState) {
  return {
    "data-disabled": flag(state.disabled),
    "data-readonly": flag(state.readOnly),
    "data-required": flag(state.required),
    "data-out-of-gamut": flag(state.outOfGamut),
  }
}

type Context = {
  space: ColorSpace
  format: ColorFormat
  gamut: ColorGamut | false
  model: ColorModel
  modelRef: React.RefObject<ColorModel>
  state: ColorPickerState
  update: (
    next: ColorModel,
    reason: ColorPickerChangeReason,
    event?: Event
  ) => boolean
  setText: (
    text: string,
    reason: ColorPickerChangeReason,
    event?: Event
  ) => boolean
  commit: (reason: ColorPickerChangeReason, event?: Event) => void
}

const ColorPickerContext = React.createContext<Context | null>(null)

function useColorPicker() {
  const ctx = React.useContext(ColorPickerContext)
  if (!ctx)
    throw new Error("ColorPicker parts must be used within <ColorPicker>")
  return ctx
}

type ColorPickerProps = Omit<
  PartProps<ColorPickerState>,
  "defaultValue" | "onChange"
> & {
  /** The controlled value. Any CSS color the picker can read. */
  value?: string
  /** The initial value when uncontrolled. Defaults to black. */
  defaultValue?: string
  onValueChange?: (value: string, details: ColorPickerChangeDetails) => void
  /** Fires once when an interaction ends. */
  onValueCommit?: (value: string, details: ColorPickerCommitDetails) => void
  /** The color model that drives the area, sliders and channel inputs. */
  space?: ColorSpace
  /** How the value is written. Defaults to the format of the space. */
  format?: ColorFormat
  /** The gamut the value is kept in, or `false` for none. */
  gamut?: ColorGamut | false
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  name?: string
  form?: string
  controller?: ColorPickerController
  /** Logs every change to the console. */
  debug?: boolean
}

function toModel(space: ColorSpace, value: string, previous?: ColorModel) {
  const color = parseColor(value) ?? parseColor("#000000")!
  return modelFromColor(space, color, previous)
}

function createDetails(
  reason: ColorPickerChangeReason,
  event: Event | undefined,
  color: string
): ColorPickerChangeDetails {
  let canceled = false
  return {
    reason,
    event,
    color,
    get canceled() {
      return canceled
    },
    cancel() {
      canceled = true
    },
  }
}

function ColorPicker({
  value: valueProp,
  defaultValue,
  onValueChange,
  onValueCommit,
  space: spaceProp,
  format: formatProp,
  gamut: gamutProp,
  disabled = false,
  readOnly = false,
  required = false,
  name,
  form,
  controller,
  debug = false,
  className,
  children,
  render,
  style,
  ...props
}: ColorPickerProps) {
  const space = spaceProp ?? "hsv"
  const format = formatProp ?? DEFAULT_FORMAT[space]
  const gamut = gamutProp === undefined ? "srgb" : gamutProp
  const initial = defaultValue ?? "#000000"

  const rootRef = React.useRef<HTMLElement | null>(null)
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const [uncontrolled, setUncontrolled] = React.useState(initial)
  const value = valueProp ?? uncontrolled
  const [model, setModel] = React.useState<ColorModel>(() =>
    toModel(space, value)
  )
  const [synced, setSynced] = React.useState({ value, space })

  if (synced.value !== value || synced.space !== space) {
    setSynced({ value, space })
    setModel(toModel(space, value, model))
  }

  const current = modelToValue(space, model, format, gamut)
  const modelRef = React.useRef(model)
  const valueRef = React.useRef(current)
  React.useLayoutEffect(() => {
    modelRef.current = model
    valueRef.current = current
  })

  const cssColor = toCss(clampToGamut(colorFromModel(space, model), gamut))
  const outOfGamut = isOutOfGamut(space, model, gamut)

  const update = (
    next: ColorModel,
    reason: ColorPickerChangeReason,
    event?: Event
  ) => {
    if (disabled || (readOnly && reason !== "imperative" && reason !== "reset"))
      return false
    const nextValue = modelToValue(space, next, format, gamut)
    if (nextValue !== valueRef.current) {
      const nextColor = toCss(clampToGamut(colorFromModel(space, next), gamut))
      const details = createDetails(reason, event, nextColor)
      onValueChange?.(nextValue, details)
      if (details.canceled) return false
      if (debug) console.log("[ColorPicker]", reason, nextValue)
      valueRef.current = nextValue
      setUncontrolled(nextValue)
      setSynced({ value: nextValue, space })
    }
    modelRef.current = next
    setModel(next)
    return true
  }

  const setText = (
    text: string,
    reason: ColorPickerChangeReason,
    event?: Event
  ) => {
    const color = parseColor(text)
    if (!color) return false
    return update(modelFromColor(space, color, modelRef.current), reason, event)
  }

  const commit = (reason: ColorPickerChangeReason, event?: Event) => {
    if (isOutOfGamut(space, modelRef.current, gamut)) {
      const snapped = modelFromColor(
        space,
        clampToGamut(colorFromModel(space, modelRef.current), gamut),
        modelRef.current
      )
      modelRef.current = snapped
      setModel(snapped)
    }
    onValueCommit?.(valueRef.current, {
      reason,
      event,
      color: toCss(
        clampToGamut(colorFromModel(space, modelRef.current), gamut)
      ),
    })
  }

  const latest = React.useRef({ setText, commit, initial })
  React.useLayoutEffect(() => {
    latest.current = { setText, commit, initial }
  })

  React.useEffect(() => {
    if (!controller) return
    controller[attach]({
      getValue: () => valueRef.current,
      setValue: (next, details) => {
        const reason = details?.reason ?? "imperative"
        const ok = latest.current.setText(next, reason, details?.event)
        if (ok) latest.current.commit(reason, details?.event)
        return ok
      },
      focus: () => {
        rootRef.current
          ?.querySelector<HTMLElement>(
            "[role='slider'], input, button, [role='option']"
          )
          ?.focus()
      },
    })
    return () => controller[attach](null)
  }, [controller])

  React.useEffect(() => {
    const formEl = inputRef.current?.form
    if (!formEl) return
    const onReset = (event: Event) => {
      latest.current.setText(latest.current.initial, "reset", event)
      latest.current.commit("reset", event)
    }
    formEl.addEventListener("reset", onReset)
    return () => formEl.removeEventListener("reset", onReset)
  }, [name, form])

  const state: ColorPickerState = {
    value: current,
    color: cssColor,
    space,
    disabled,
    readOnly,
    required,
    outOfGamut,
  }

  const context: Context = {
    space,
    format,
    gamut,
    model,
    modelRef,
    state,
    update,
    setText,
    commit,
  }

  const setRoot = (node: HTMLElement | null) => {
    rootRef.current = node
  }

  return (
    <ColorPickerContext.Provider value={context}>
      {renderPart(
        "div",
        "color-picker",
        "np-color-picker",
        {
          role: "group",
          "aria-label": "Color picker",
          ...props,
          className,
          render,
          style: {
            "--color-picker-color": cssColor,
            ...style,
          } as React.CSSProperties,
          children: (
            <>
              {typeof children === "function" ? children(state) : children}
              {name ? (
                <input
                  ref={inputRef}
                  type="text"
                  name={name}
                  form={form}
                  value={current}
                  disabled={disabled}
                  tabIndex={-1}
                  aria-hidden="true"
                  className="np-color-picker-hidden-input"
                  onChange={() => {}}
                />
              ) : null}
            </>
          ),
        } as PartLike<ColorPickerState>,
        state,
        // eslint-disable-next-line react-hooks/refs
        {
          ref: setRoot,
          ...stateAttrs(state),
          "data-space": space,
        }
      )}
    </ColorPickerContext.Provider>
  )
}

function fractionOf(
  model: ColorModel,
  space: ColorSpace,
  channel: ColorChannel
) {
  const range = channelRange(space, channel)
  if (!range) return 0
  return clamp(
    ((model[channel] ?? 0) - range.min) / (range.max - range.min),
    0,
    1
  )
}

function channelStep(space: ColorSpace, channel: ColorChannel) {
  return channelRange(space, channel)?.step ?? 1
}

function digitsOf(step: number) {
  return step < 1 ? 3 : 0
}

function nextByKey(
  event: React.KeyboardEvent,
  space: ColorSpace,
  channel: ColorChannel,
  current: number,
  keys: { inc: string[]; dec: string[]; page?: boolean; ends?: boolean }
) {
  const range = channelRange(space, channel)
  if (!range) return null
  const big = event.shiftKey ? 10 : 1
  const span = range.max - range.min
  if (keys.inc.includes(event.key)) return current + range.step * big
  if (keys.dec.includes(event.key)) return current - range.step * big
  if (keys.page && event.key === "PageUp") return current + span / 10
  if (keys.page && event.key === "PageDown") return current - span / 10
  if (keys.ends && event.key === "Home") return range.min
  if (keys.ends && event.key === "End") return range.max
  return null
}

function useDrag(
  move: (event: React.PointerEvent<HTMLElement>, first: boolean) => void,
  done: (event: React.PointerEvent<HTMLElement>, moved: boolean) => void,
  locked: boolean
) {
  const dragging = React.useRef(false)
  const moved = React.useRef(false)
  return {
    onPointerDown: (event: React.PointerEvent<HTMLElement>) => {
      if (locked || event.button !== 0) return
      event.preventDefault()
      event.currentTarget.setPointerCapture(event.pointerId)
      dragging.current = true
      moved.current = false
      move(event, true)
      event.currentTarget.querySelector<HTMLElement>("[role='slider']")?.focus()
    },
    onPointerMove: (event: React.PointerEvent<HTMLElement>) => {
      if (!dragging.current) return
      moved.current = true
      move(event, false)
    },
    onPointerUp: (event: React.PointerEvent<HTMLElement>) => {
      if (!dragging.current) return
      dragging.current = false
      done(event, moved.current)
    },
    onPointerCancel: (event: React.PointerEvent<HTMLElement>) => {
      if (!dragging.current) return
      dragging.current = false
      done(event, moved.current)
    },
  }
}

type AreaContext = { x: ColorChannel; y: ColorChannel }
const AreaCtx = React.createContext<AreaContext | null>(null)

type ColorPickerAreaProps = PartProps<ColorPickerState> & {
  /** The channel across. Defaults to the first area channel of the space. */
  x?: ColorChannel
  /** The channel up. Defaults to the second area channel of the space. */
  y?: ColorChannel
}

function ColorPickerArea({
  x: xProp,
  y: yProp,
  className,
  children,
  render,
  style,
  ...props
}: ColorPickerAreaProps) {
  const ctx = useColorPicker()
  const { space, model, state } = ctx
  const [dx, dy] = DEFAULT_AREA[space]
  const x = xProp ?? dx
  const y = yProp ?? dy
  const locked = state.disabled || state.readOnly

  const drag = useDrag(
    (event, first) => {
      const rect = event.currentTarget.getBoundingClientRect()
      const fx = clamp((event.clientX - rect.left) / rect.width, 0, 1)
      const fy = clamp(1 - (event.clientY - rect.top) / rect.height, 0, 1)
      const rx = channelRange(space, x)
      const ry = channelRange(space, y)
      if (!rx || !ry) return
      let next = withChannel(
        space,
        ctx.modelRef.current,
        x,
        rx.min + fx * (rx.max - rx.min)
      )
      next = withChannel(space, next, y, ry.min + fy * (ry.max - ry.min))
      ctx.update(next, first ? "track-press" : "drag", event.nativeEvent)
    },
    (event, moved) =>
      ctx.commit(moved ? "drag" : "track-press", event.nativeEvent),
    locked
  )

  const background = areaGradient(space, model, x, y, "to right")
  const areaStyle = {
    "--color-area-background": background || "none",
    "--area-x": `${fractionOf(model, space, x) * 100}%`,
    "--area-y": `${(1 - fractionOf(model, space, y)) * 100}%`,
    ...style,
  } as React.CSSProperties

  const { onPointerDown, onPointerMove, onPointerUp, onPointerCancel } = drag
  const user = props as Record<string, unknown>
  const chain =
    (name: string, ours: (event: React.PointerEvent<HTMLElement>) => void) =>
    (event: React.PointerEvent<HTMLElement>) => {
      const theirs = user[name] as
        ((e: React.PointerEvent<HTMLElement>) => void) | undefined
      theirs?.(event)
      if (!event.defaultPrevented) ours(event)
    }

  return (
    <AreaCtx.Provider value={{ x, y }}>
      {renderPart(
        "div",
        "color-picker-area",
        "np-color-picker-area",
        {
          ...props,
          className,
          render,
          style: areaStyle,
          children: children ?? (
            <>
              <ColorPickerAreaCanvas />
              <ColorPickerAreaThumb />
            </>
          ),
        } as PartLike<ColorPickerState>,
        state,
        {
          ...stateAttrs(state),
          onPointerDown: chain("onPointerDown", onPointerDown),
          onPointerMove: chain("onPointerMove", onPointerMove),
          onPointerUp: chain("onPointerUp", onPointerUp),
          onPointerCancel: chain("onPointerCancel", onPointerCancel),
        }
      )}
    </AreaCtx.Provider>
  )
}

function useArea() {
  const area = React.useContext(AreaCtx)
  if (!area)
    throw new Error(
      "ColorPickerArea parts must be used within <ColorPickerArea>"
    )
  return area
}

type ColorPickerAreaCanvasProps = Omit<
  React.ComponentProps<"canvas">,
  "className"
> & {
  className?: string
}

function ColorPickerAreaCanvas({
  className,
  ...props
}: ColorPickerAreaCanvasProps) {
  const { space, model, gamut } = useColorPicker()
  const { x, y } = useArea()
  const ref = React.useRef<HTMLCanvasElement | null>(null)
  const plain = areaGradient(space, model, x, y, "to right") !== ""
  const hue = model.hue
  const lightness = model.lightness
  const chroma = model.chroma
  const red = model.red
  const green = model.green
  const blue = model.blue
  const saturation = model.saturation
  const brightness = model.brightness

  React.useLayoutEffect(() => {
    const canvas = ref.current
    if (!canvas || plain) return
    paintArea(
      canvas,
      space,
      {
        hue,
        lightness,
        chroma,
        red,
        green,
        blue,
        saturation,
        brightness,
        alpha: 100,
      },
      x,
      y,
      gamut,
      false
    )
  }, [
    plain,
    space,
    x,
    y,
    gamut,
    hue,
    lightness,
    chroma,
    red,
    green,
    blue,
    saturation,
    brightness,
  ])

  if (plain) return null
  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      data-slot="color-picker-area-canvas"
      className={cn("np-color-picker-area-canvas", className)}
      {...props}
    />
  )
}

type ColorPickerAreaThumbProps = PartProps<ColorPickerState> & {
  "aria-label"?: string
}

function ColorPickerAreaThumb({
  className,
  children,
  render,
  style,
  onKeyDown,
  ...props
}: ColorPickerAreaThumbProps) {
  const ctx = useColorPicker()
  const { space, model, state } = ctx
  const { x, y } = useArea()
  const rx = channelRange(space, x)
  const ry = channelRange(space, y)
  if (!rx || !ry) return null
  const digits = (channel: ColorChannel) =>
    digitsOf(channelStep(space, channel))
  const read = (channel: ColorChannel) =>
    round(model[channel] ?? 0, digits(channel))
  const locked = state.disabled || state.readOnly

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    ;(
      onKeyDown as
        ((e: React.KeyboardEvent<HTMLDivElement>) => void) | undefined
    )?.(event)
    if (event.defaultPrevented || locked) return
    const cur = ctx.modelRef.current
    const nx = nextByKey(event, space, x, cur[x] ?? 0, {
      inc: ["ArrowRight"],
      dec: ["ArrowLeft"],
      ends: true,
    })
    const ny = nextByKey(event, space, y, cur[y] ?? 0, {
      inc: ["ArrowUp"],
      dec: ["ArrowDown"],
      page: true,
    })
    if (nx === null && ny === null) return
    event.preventDefault()
    let next = cur
    if (nx !== null) next = withChannel(space, next, x, nx)
    if (ny !== null) next = withChannel(space, next, y, ny)
    ctx.update(next, "step-key", event.nativeEvent)
    ctx.commit("step-key", event.nativeEvent)
  }

  return renderPart(
    "div",
    "color-picker-area-thumb",
    "np-color-picker-area-thumb",
    {
      "aria-label": `${LABELS[x]} and ${LABELS[y]}`,
      ...props,
      className,
      render,
      style,
      children,
    } as PartLike<ColorPickerState>,
    state,
    {
      ...stateAttrs(state),
      "data-area-thumb": "",
      role: "slider",
      "aria-roledescription": "2D slider",
      tabIndex: state.disabled ? -1 : 0,
      "aria-valuemin": rx.min,
      "aria-valuemax": rx.max,
      "aria-valuenow": read(x),
      "aria-valuetext": `${LABELS[x]} ${read(x)}, ${LABELS[y]} ${read(y)}`,
      "aria-disabled": state.disabled || undefined,
      "aria-readonly": state.readOnly || undefined,
      onKeyDown: handleKeyDown,
    }
  )
}

type SliderContext = {
  channel: ColorChannel
  orientation: "horizontal" | "vertical"
}
const SliderCtx = React.createContext<SliderContext | null>(null)

type ColorPickerSliderProps = PartProps<ColorPickerSliderState> & {
  /** The channel to edit. Defaults to the slider channel of the space. */
  channel?: ColorChannel
  orientation?: "horizontal" | "vertical"
}

function ColorPickerSlider({
  channel: channelProp,
  orientation = "horizontal",
  className,
  children,
  render,
  style,
  ...props
}: ColorPickerSliderProps) {
  const ctx = useColorPicker()
  const { space, model, gamut } = ctx
  const channel = channelProp ?? DEFAULT_SLIDER[space]
  const range = channelRange(space, channel)
  const locked = ctx.state.disabled || ctx.state.readOnly
  const vertical = orientation === "vertical"

  const drag = useDrag(
    (event, first) => {
      if (!range) return
      const rect = event.currentTarget.getBoundingClientRect()
      const f = vertical
        ? 1 - (event.clientY - rect.top) / rect.height
        : (event.clientX - rect.left) / rect.width
      const next = withChannel(
        space,
        ctx.modelRef.current,
        channel,
        range.min + clamp(f, 0, 1) * (range.max - range.min)
      )
      ctx.update(next, first ? "track-press" : "drag", event.nativeEvent)
    },
    (event, moved) =>
      ctx.commit(moved ? "drag" : "track-press", event.nativeEvent),
    locked
  )

  if (!range || !hasChannel(space, channel)) return null

  const channelValue = round(model[channel] ?? 0, digitsOf(range.step))
  const state: ColorPickerSliderState = {
    ...ctx.state,
    channel,
    channelValue,
    orientation,
  }
  const f = fractionOf(model, space, channel)
  const sliderStyle = {
    "--color-slider-background": sliderGradient(
      space,
      model,
      channel,
      gamut,
      vertical ? "to top" : "to right"
    ),
    "--color-slider-thumb-position": `${(vertical ? 1 - f : f) * 100}%`,
    ...style,
  } as React.CSSProperties

  const user = props as Record<string, unknown>
  const chain =
    (name: string, ours: (event: React.PointerEvent<HTMLElement>) => void) =>
    (event: React.PointerEvent<HTMLElement>) => {
      const theirs = user[name] as
        ((e: React.PointerEvent<HTMLElement>) => void) | undefined
      theirs?.(event)
      if (!event.defaultPrevented) ours(event)
    }

  return (
    <SliderCtx.Provider value={{ channel, orientation }}>
      {renderPart(
        "div",
        "color-picker-slider",
        "np-color-picker-slider",
        {
          ...props,
          className,
          render,
          style: sliderStyle,
          children: children ?? <ColorPickerSliderThumb />,
        } as PartLike<ColorPickerSliderState>,
        state,
        {
          ...stateAttrs(state),
          "data-orientation": orientation,
          "data-channel": channel,
          onPointerDown: chain("onPointerDown", drag.onPointerDown),
          onPointerMove: chain("onPointerMove", drag.onPointerMove),
          onPointerUp: chain("onPointerUp", drag.onPointerUp),
          onPointerCancel: chain("onPointerCancel", drag.onPointerCancel),
        }
      )}
    </SliderCtx.Provider>
  )
}

type ColorPickerSliderThumbProps = PartProps<ColorPickerSliderState> & {
  "aria-label"?: string
}

function ColorPickerSliderThumb({
  className,
  children,
  render,
  style,
  onKeyDown,
  ...props
}: ColorPickerSliderThumbProps) {
  const ctx = useColorPicker()
  const slider = React.useContext(SliderCtx)
  if (!slider)
    throw new Error(
      "ColorPickerSliderThumb must be used within <ColorPickerSlider>"
    )
  const { space, model } = ctx
  const { channel, orientation } = slider
  const range = channelRange(space, channel)
  if (!range) return null
  const channelValue = round(model[channel] ?? 0, digitsOf(range.step))
  const state: ColorPickerSliderState = {
    ...ctx.state,
    channel,
    channelValue,
    orientation,
  }
  const locked = state.disabled || state.readOnly

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    ;(
      onKeyDown as
        ((e: React.KeyboardEvent<HTMLDivElement>) => void) | undefined
    )?.(event)
    if (event.defaultPrevented || locked) return
    const cur = ctx.modelRef.current
    const next = nextByKey(event, space, channel, cur[channel] ?? 0, {
      inc: ["ArrowRight", "ArrowUp"],
      dec: ["ArrowLeft", "ArrowDown"],
      page: true,
      ends: true,
    })
    if (next === null) return
    event.preventDefault()
    ctx.update(
      withChannel(space, cur, channel, next),
      "step-key",
      event.nativeEvent
    )
    ctx.commit("step-key", event.nativeEvent)
  }

  return renderPart(
    "div",
    "color-picker-slider-thumb",
    "np-color-picker-slider-thumb",
    {
      "aria-label": LABELS[channel],
      ...props,
      className,
      render,
      style,
      children,
    } as PartLike<ColorPickerSliderState>,
    state,
    {
      ...stateAttrs(state),
      "data-orientation": orientation,
      "data-channel": channel,
      role: "slider",
      tabIndex: state.disabled ? -1 : 0,
      "aria-orientation": orientation,
      "aria-valuemin": range.min,
      "aria-valuemax": range.max,
      "aria-valuenow": channelValue,
      "aria-disabled": state.disabled || undefined,
      "aria-readonly": state.readOnly || undefined,
      onKeyDown: handleKeyDown,
    }
  )
}

type ColorPickerSwatchProps = PartProps<ColorPickerState>

function ColorPickerSwatch({
  className,
  children,
  render,
  style,
  ...props
}: ColorPickerSwatchProps) {
  const { state, space, model, gamut } = useColorPicker()
  const label = colorName(clampToGamut(colorFromModel(space, model), gamut))
  return renderPart(
    "div",
    "color-picker-swatch",
    "np-color-picker-swatch",
    {
      role: "img",
      "aria-label": label,
      ...props,
      className,
      render,
      style,
      children,
    } as PartLike<ColorPickerState>,
    state,
    stateAttrs(state)
  )
}

type ColorPickerInputProps = Omit<
  PartProps<ColorPickerState, "input">,
  "value" | "defaultValue" | "children" | "render"
> & {
  className?: string | ((state: ColorPickerState) => string)
  render?: PartProps<ColorPickerState, "input">["render"]
}

function ColorPickerInput({
  className,
  render,
  style,
  onBlur,
  onChange,
  onKeyDown,
  onFocus,
  ...props
}: ColorPickerInputProps) {
  const ctx = useColorPicker()
  const { state } = ctx
  const [draft, setDraft] = React.useState<string | null>(null)

  const commitDraft = (event: Event) => {
    if (draft === null) return
    const ok = ctx.setText(draft, "input-commit", event)
    if (ok) ctx.commit("input-commit", event)
    setDraft(null)
  }

  return renderPart(
    "input",
    "color-picker-input",
    "np-color-picker-input",
    {
      "aria-label": "Color value",
      ...props,
      className,
      render,
      style,
    } as PartLike<ColorPickerState>,
    state,
    {
      ...stateAttrs(state),
      type: "text",
      spellCheck: false,
      autoComplete: "off",
      disabled: state.disabled,
      readOnly: state.readOnly,
      value: draft ?? state.value,
      onFocus: (event: React.FocusEvent<HTMLInputElement>) => {
        ;(
          onFocus as
            ((e: React.FocusEvent<HTMLInputElement>) => void) | undefined
        )?.(event)
      },
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        ;(
          onChange as
            ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined
        )?.(event)
        if (!state.readOnly) setDraft(event.target.value)
      },
      onBlur: (event: React.FocusEvent<HTMLInputElement>) => {
        ;(
          onBlur as
            ((e: React.FocusEvent<HTMLInputElement>) => void) | undefined
        )?.(event)
        commitDraft(event.nativeEvent)
      },
      onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
        ;(
          onKeyDown as
            ((e: React.KeyboardEvent<HTMLInputElement>) => void) | undefined
        )?.(event)
        if (event.defaultPrevented) return
        if (event.key === "Enter") {
          event.preventDefault()
          commitDraft(event.nativeEvent)
        } else if (event.key === "Escape") {
          setDraft(null)
        }
      },
    }
  )
}

type ColorPickerChannelInputProps = Omit<
  PartProps<ColorPickerSliderState, "input">,
  "value" | "defaultValue" | "children" | "render"
> & {
  /** The channel to edit, in human units. */
  channel: ColorChannel
  className?: string | ((state: ColorPickerSliderState) => string)
  render?: PartProps<ColorPickerSliderState, "input">["render"]
}

function ColorPickerChannelInput({
  channel,
  className,
  render,
  style,
  onBlur,
  onChange,
  onKeyDown,
  ...props
}: ColorPickerChannelInputProps) {
  const ctx = useColorPicker()
  const { space, model } = ctx
  const range = channelRange(space, channel)
  const [draft, setDraft] = React.useState<string | null>(null)
  if (!range) return null
  const channelValue = round(model[channel] ?? 0, digitsOf(range.step))
  const state: ColorPickerSliderState = {
    ...ctx.state,
    channel,
    channelValue,
    orientation: "horizontal",
  }

  const commitDraft = (event: Event) => {
    if (draft === null) return
    const n = parseFloat(draft)
    if (!isNaN(n)) {
      const ok = ctx.update(
        withChannel(space, ctx.modelRef.current, channel, n),
        "input-commit",
        event
      )
      if (ok) ctx.commit("input-commit", event)
    }
    setDraft(null)
  }

  return renderPart(
    "input",
    "color-picker-channel-input",
    "np-color-picker-channel-input",
    {
      "aria-label": LABELS[channel],
      ...props,
      className,
      render,
      style,
    } as PartLike<ColorPickerSliderState>,
    state,
    {
      ...stateAttrs(state),
      "data-channel": channel,
      type: "text",
      inputMode: "decimal",
      spellCheck: false,
      autoComplete: "off",
      disabled: state.disabled,
      readOnly: state.readOnly,
      value: draft ?? String(channelValue),
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        ;(
          onChange as
            ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined
        )?.(event)
        if (!state.readOnly) setDraft(event.target.value)
      },
      onBlur: (event: React.FocusEvent<HTMLInputElement>) => {
        ;(
          onBlur as
            ((e: React.FocusEvent<HTMLInputElement>) => void) | undefined
        )?.(event)
        commitDraft(event.nativeEvent)
      },
      onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
        ;(
          onKeyDown as
            ((e: React.KeyboardEvent<HTMLInputElement>) => void) | undefined
        )?.(event)
        if (event.defaultPrevented) return
        if (event.key === "Enter") {
          event.preventDefault()
          commitDraft(event.nativeEvent)
        } else if (event.key === "Escape") {
          setDraft(null)
        } else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
          event.preventDefault()
          if (state.readOnly) return
          const delta =
            (event.key === "ArrowUp" ? 1 : -1) *
            range.step *
            (event.shiftKey ? 10 : 1)
          const ok = ctx.update(
            withChannel(
              space,
              ctx.modelRef.current,
              channel,
              (ctx.modelRef.current[channel] ?? 0) + delta
            ),
            "step-key",
            event.nativeEvent
          )
          if (ok) ctx.commit("step-key", event.nativeEvent)
          setDraft(null)
        }
      },
    }
  )
}

type EyeDropperLike = { open: () => Promise<{ sRGBHex: string }> }
type EyeDropperCtor = new () => EyeDropperLike

function getEyeDropper(): EyeDropperCtor | null {
  if (typeof window === "undefined") return null
  const ctor = (window as unknown as { EyeDropper?: EyeDropperCtor }).EyeDropper
  return ctor ?? null
}

const subscribeNothing = () => () => {}

type ColorPickerEyeDropperProps = Omit<
  PartProps<ColorPickerState, "button">,
  "render"
> & {
  render?: PartProps<ColorPickerState, "button">["render"]
}

function ColorPickerEyeDropper({
  className,
  children,
  render,
  style,
  onClick,
  ...props
}: ColorPickerEyeDropperProps) {
  const ctx = useColorPicker()
  const { state } = ctx
  const supported = React.useSyncExternalStore(
    subscribeNothing,
    () => getEyeDropper() !== null,
    () => true
  )
  const locked = state.disabled || state.readOnly || !supported

  return renderPart(
    "button",
    "color-picker-eye-dropper",
    "np-color-picker-eye-dropper",
    {
      "aria-label": "Pick a color from the screen",
      ...props,
      className,
      render,
      style,
      children: children ?? <EyeDropperIcon />,
    } as PartLike<ColorPickerState>,
    state,
    {
      ...stateAttrs(state),
      "data-unsupported": flag(!supported),
      type: "button",
      disabled: locked,
      onClick: async (event: React.MouseEvent<HTMLButtonElement>) => {
        ;(
          onClick as
            ((e: React.MouseEvent<HTMLButtonElement>) => void) | undefined
        )?.(event)
        if (event.defaultPrevented || locked) return
        const Ctor = getEyeDropper()
        if (!Ctor) return
        try {
          const result = await new Ctor().open()
          if (
            ctx.setText(result.sRGBHex, "eye-dropper-pick", event.nativeEvent)
          ) {
            ctx.commit("eye-dropper-pick", event.nativeEvent)
          }
        } catch {
          return
        }
      },
    }
  )
}

function EyeDropperIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m2 22 1-1h3l9-9" />
      <path d="M3 21v-3l9-9" />
      <path d="m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.4.4a2.1 2.1 0 1 1-3 3l-3.8-3.8a2.1 2.1 0 1 1 3-3l.4.4Z" />
    </svg>
  )
}

type ColorPickerSwatchesProps = PartProps<ColorPickerState>

function ColorPickerSwatches({
  className,
  children,
  render,
  style,
  onKeyDown,
  ...props
}: ColorPickerSwatchesProps) {
  const { state } = useColorPicker()
  const ref = React.useRef<HTMLElement | null>(null)
  const setRef = React.useCallback((node: HTMLElement | null) => {
    ref.current = node
  }, [])

  React.useLayoutEffect(() => {
    const items = Array.from(
      ref.current?.querySelectorAll<HTMLElement>("[role='option']") ?? []
    )
    const active =
      items.find((item) => item.getAttribute("aria-selected") === "true") ??
      items[0]
    items.forEach((item) =>
      item.setAttribute("tabindex", item === active ? "0" : "-1")
    )
  })

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    ;(
      onKeyDown as ((e: React.KeyboardEvent<HTMLElement>) => void) | undefined
    )?.(event)
    if (event.defaultPrevented) return
    const items = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(
        "[role='option']:not(:disabled)"
      )
    )
    const index = items.indexOf(document.activeElement as HTMLElement)
    if (index < 0) return
    let next = index
    if (event.key === "ArrowRight" || event.key === "ArrowDown")
      next = (index + 1) % items.length
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp")
      next = (index - 1 + items.length) % items.length
    else if (event.key === "Home") next = 0
    else if (event.key === "End") next = items.length - 1
    else return
    event.preventDefault()
    items.forEach((item, i) =>
      item.setAttribute("tabindex", i === next ? "0" : "-1")
    )
    items[next].focus()
  }

  return renderPart(
    "div",
    "color-picker-swatches",
    "np-color-picker-swatches",
    {
      "aria-label": "Preset colors",
      ...props,
      className,
      render,
      style,
      children,
    } as PartLike<ColorPickerState>,
    state,
    // eslint-disable-next-line react-hooks/refs
    {
      ...stateAttrs(state),
      ref: setRef,
      role: "listbox",
      "aria-disabled": state.disabled || undefined,
      onKeyDown: handleKeyDown,
    }
  )
}

type ColorPickerSwatchItemProps = Omit<
  PartProps<ColorPickerSwatchItemState, "button">,
  "value"
> & {
  /** The color this preset picks. */
  value: string
}

function ColorPickerSwatchItem({
  value,
  className,
  children,
  render,
  style,
  onClick,
  ...props
}: ColorPickerSwatchItemProps) {
  const ctx = useColorPicker()
  const color = parseColor(value)
  const key = (c: typeof color) => (c ? formatColor(c, "hex") : "")
  const selected =
    color !== null && key(color) === key(parseColor(ctx.state.value))
  const state: ColorPickerSwatchItemState = { ...ctx.state, selected }
  const locked = state.disabled || state.readOnly
  const label = color ? colorName(color) : value

  return renderPart(
    "button",
    "color-picker-swatch-item",
    "np-color-picker-swatch-item",
    {
      "aria-label": label,
      ...props,
      className,
      render,
      style: {
        "--color-picker-item-color": color ? toCss(color) : value,
        ...style,
      },
      children,
    } as PartLike<ColorPickerSwatchItemState>,
    state,
    {
      ...stateAttrs(state),
      "data-selected": flag(selected),
      type: "button",
      role: "option",
      "aria-selected": selected,
      disabled: state.disabled,
      onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
        ;(
          onClick as
            ((e: React.MouseEvent<HTMLButtonElement>) => void) | undefined
        )?.(event)
        if (event.defaultPrevented || locked) return
        if (ctx.setText(value, "item-press", event.nativeEvent)) {
          ctx.commit("item-press", event.nativeEvent)
        }
      },
    }
  )
}

export {
  ColorPicker,
  ColorPickerArea,
  ColorPickerAreaCanvas,
  ColorPickerAreaThumb,
  ColorPickerChannelInput,
  ColorPickerEyeDropper,
  ColorPickerInput,
  ColorPickerSlider,
  ColorPickerSliderThumb,
  ColorPickerSwatch,
  ColorPickerSwatchItem,
  ColorPickerSwatches,
  createColorPickerController,
}
export type {
  ColorPickerAreaProps,
  ColorPickerAreaThumbProps,
  ColorPickerChangeDetails,
  ColorPickerChangeReason,
  ColorPickerChannelInputProps,
  ColorPickerCommitDetails,
  ColorPickerController,
  ColorPickerEyeDropperProps,
  ColorPickerInputProps,
  ColorPickerProps,
  ColorPickerSliderProps,
  ColorPickerSliderState,
  ColorPickerSliderThumbProps,
  ColorPickerState,
  ColorPickerSwatchItemProps,
  ColorPickerSwatchItemState,
  ColorPickerSwatchProps,
  ColorPickerSwatchesProps,
}
