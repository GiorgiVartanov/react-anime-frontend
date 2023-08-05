import { create } from "zustand"

interface settingsState {
  theme: "dark" | "light"
  showAnimeTitlesInJP: boolean
}

interface settingsActions {
  toggleDarkMode: () => void
  toggleShowAnimeTitlesInJP: () => void
}

export const useSettingsStore = create<settingsState & settingsActions>(
  (set, get) => ({
    theme:
      localStorage.getItem("theme") === "dark" ? "dark" : "light" || "dark",
    showAnimeTitlesInJP:
      localStorage.getItem("showAnimeTitlesInJP") === "true"
        ? true
        : false || false,
    toggleDarkMode: () => {
      const currentTheme = get().theme
      const toggledTheme = currentTheme === "dark" ? "light" : "dark"

      if (toggledTheme === "dark") {
        document.documentElement.classList.add("dark")
        localStorage.setItem("theme", "dark")
      } else {
        document.documentElement.classList.remove("dark")
        localStorage.setItem("theme", "light")
      }

      return set(() => ({
        theme: toggledTheme,
      }))
    },
    toggleShowAnimeTitlesInJP: () => {
      // const current = !get().showAnimeTitlesInJP
      // localStorage.setItem("showAnimeTitlesInJP", current.toString())
      // return set(() => ({
      //   isInDarkMode: current,
      // }))
    },
  })
)
