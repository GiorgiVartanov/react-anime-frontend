import { Transition, motion } from "framer-motion"

import { useSettingsStore } from "../../store/settingsStore"

const containerVariants = {
  initial: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const dotVariants = {
  initial: {
    y: "0%",
  },
  animate: {
    y: "100%",
  },
}

const dotTransition = {
  duration: 0.5,
  repeat: Infinity,
  repeatType: "reverse",
  ease: "easeInOut",
}

const Loading = () => {
  const [theme] = useSettingsStore((state) => [state.theme])

  return (
    <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-center">
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="flex gap-4"
      >
        <motion.span
          variants={dotVariants}
          transition={dotTransition as Transition}
          className="w-4 h-4 rounded-full dark:bg-sp-white bg-sp-black"
        />
        <motion.span
          style={{
            backgroundColor: `${theme === "dark" ? "#e6eaee" : "#121212"}`,
          }}
          variants={dotVariants}
          transition={dotTransition as Transition}
          className="w-4 h-4 rounded-full"
        />
        <motion.span
          style={{
            backgroundColor: `${theme === "dark" ? "#e6eaee" : "#121212"}`,
          }}
          variants={dotVariants}
          transition={dotTransition as Transition}
          className="w-4 h-4 rounded-full"
        />
      </motion.div>
    </div>
  )
}

export default Loading
