import { FontFamily } from "@/hooks/use-config"
import { CodeTheme } from "@/components/playground/code-editor"

type CodeThemeType = {
  label: string
  value: CodeTheme
  mode: "light" | "dark"
}

export const CODE_THEMES: CodeThemeType[] = [
  {
    label: "Ayu Light",
    value: "ayuLight",
    mode: "light",
  },
  {
    label: "Tomorrow",
    value: "tomorrow",
    mode: "light",
  },
  {
    label: "Clouds",
    value: "clouds",
    mode: "light",
  },
  {
    label: "Rose Pine Dawn",
    value: "rosePineDawn",
    mode: "light",
  },
  {
    label: "Solarized Light",
    value: "solarizedLight",
    mode: "light",
  },
  {
    label: "Smoothy",
    value: "smoothy",
    mode: "light",
  },
  {
    label: "Cobalt",
    value: "cobalt",
    mode: "dark",
  },
  {
    label: "Amy",
    value: "amy",
    mode: "dark",
  },
  {
    label: "Barf",
    value: "barf",
    mode: "dark",
  },
  {
    label: "Dracula",
    value: "dracula",
    mode: "dark",
  },
  {
    label: "Cool Glow",
    value: "coolGlow",
    mode: "dark",
  },
  {
    label: "Birds of Paradise",
    value: "birdsOfParadise",
    mode: "dark",
  },
]

export const LIGHT_THEMES = CODE_THEMES.filter(
  (theme) => theme.mode === "light"
)

export const DARK_THEMES = CODE_THEMES.filter((theme) => theme.mode === "dark")

export const FONT_SIZES = [
  "14px",
  "15px",
  "16px",
  "17px",
  "18px",
  "20px",
  "21px",
  "22px",
  "24px",
]

export const FONT_FAMILIES: {
  label: string
  value: FontFamily
}[] = [
  {
    label: "Fira Code",
    value: "fira-code",
  },
  {
    label: "Geist Mono",
    value: "geist-mono",
  },
  {
    label: "JetBrains Mono",
    value: "jetbrains-mono",
  },
]
