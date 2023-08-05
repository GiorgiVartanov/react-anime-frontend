import { useSettingsStore } from "../../store/settingsStore"

import { ReactComponent as Sun } from "../../assets/icons/sun-solid.svg"
import { ReactComponent as Moon } from "../../assets/icons/moon-solid.svg"

const DarkModeToggle = () => {
  const [theme, toggleDarkMode] = useSettingsStore((state) => [
    state.theme,
    state.toggleDarkMode,
  ])

  return (
    <button
      onClick={toggleDarkMode}
      className="mx-2.5 w-16 p-1 rounded-full bg-sp-white dark:bg-sp-black"
    >
      <div
        className={` transform-all ease-in-out duration-200 ${
          theme === "dark" ? "px-0" : "px-7"
        }`}
      >
        {theme === "dark" ? (
          <Moon
            fill="rgb(230, 234, 238)"
            width="24"
            height="24"
          />
        ) : (
          <Sun
            fill="rgb(18, 18, 18)"
            width="24"
            height="24"
          />
        )}
      </div>
    </button>
  )
}
export default DarkModeToggle
