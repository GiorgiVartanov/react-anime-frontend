import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

import { useOnClickOutside } from "../../hooks/useOnClickOutside"

import Button from "./Button"

const dropdownMenu = {
  hidden: { display: "none", opacity: 0, y: "-30%" },
  visible: {
    display: "block",
    opacity: 1,
    y: 0,
  },
}

interface Props {
  buttonName: string
  className?: string
  children: React.ReactNode
}

// dropdown menu, renders its children after button is pressed
const DropDownMenu = ({ buttonName, className, children }: Props) => {
  const ref = useRef<HTMLDivElement>(null)

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const handleOnClick = () => {
    setIsMenuOpen((prevState) => !prevState)
  }

  const handleClickOutside = () => {
    setIsMenuOpen(false)
  }

  useOnClickOutside(ref, handleClickOutside)

  return (
    <div
      ref={ref}
      className={`relative`}
    >
      <Button
        onClick={handleOnClick}
        className={`mx-auto md:mx-0 w-full sm:w-fit bg-transparent flex justify-center items-center ${className}`}
      >
        {buttonName}{" "}
        <motion.span
          animate={{ rotateZ: isMenuOpen ? "270deg" : "90deg" }}
          className="ml-2 text-2xl select-none"
        >
          {"<"}
        </motion.span>
      </Button>
      <AnimatePresence>
        <motion.ul
          variants={dropdownMenu}
          initial="hidden"
          animate={isMenuOpen ? "visible" : "hidden"}
          exit="hidden"
          className="static dark:bg-sp-gray shadow-none sm:shadow-lg bg-sp-white sm:absolute -left-2 w-full sm:w-24 p-2 text-center"
        >
          {children}
        </motion.ul>
      </AnimatePresence>
    </div>
  )
}
export default DropDownMenu
