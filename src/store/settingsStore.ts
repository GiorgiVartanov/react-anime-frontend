import { create } from "zustand"

interface settingsState {
  isInDarkMode: boolean
  showAnimeTitlesInJP: boolean
}

interface settingsActions {
  toggleDarkMode: () => void
  toggleShowAnimeTitlesInJP: () => void
}

export const useSettingsStore = create<settingsState & settingsActions>(
  (set, get) => ({
    isInDarkMode: localStorage.getItem("theme") === "dark" ? true : false,
    showAnimeTitlesInJP:
      localStorage.getItem("showAnimeTitlesInJP") === "true"
        ? true
        : false || false,
    toggleDarkMode: () => {
      const current = !get().isInDarkMode

      localStorage.setItem("theme", current.toString() ? "dark" : "light")

      if (current === true) {
        document.documentElement.classList.add("dark")
        localStorage.setItem("theme", "dark")
      } else {
        document.documentElement.classList.remove("dark")
        localStorage.setItem("theme", "light")
      }

      return set(() => ({
        isInDarkMode: current,
      }))
    },
    toggleShowAnimeTitlesInJP: () => {
      const current = !get().showAnimeTitlesInJP

      localStorage.setItem("showAnimeTitlesInJP", current.toString())

      return set(() => ({
        isInDarkMode: current,
      }))
    },
  })
)
