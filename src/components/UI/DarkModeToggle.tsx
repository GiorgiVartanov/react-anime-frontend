import { motion } from "framer-motion"

import { useSettingsStore } from "../../store/settingsStore"

import { ReactComponent as Sun } from "../../assets/icons/sun-solid.svg"
import { ReactComponent as Moon } from "../../assets/icons/moon-solid.svg"

interface Props {
  className?: string
}

const DarkModeToggle = ({ className }: Props) => {
  const [theme, toggleDarkMode] = useSettingsStore((state) => [
    state.theme,
    state.toggleDarkMode,
  ])

  return (
    <motion.button
      initial={{ opacity: 1 }}
      whileHover={{ opacity: 0.65 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleDarkMode}
      className={`w-16 p-1 rounded-full dark:bg-sp-white bg-sp-black ${className}`}
    >
      <motion.div animate={{ x: `${theme === "dark" ? "0" : "1.8rem"}` }}>
        {theme === "dark" ? (
          <Moon
            fill="rgb(18, 18, 18)"
            width="24"
            height="24"
            className="animate-shake"
          />
        ) : (
          <Sun
            fill="rgb(230, 234, 238)"
            width="24"
            height="24"
            className="animate-shake"
          />
        )}
      </motion.div>
    </motion.button>
  )
}
export default DarkModeToggle
