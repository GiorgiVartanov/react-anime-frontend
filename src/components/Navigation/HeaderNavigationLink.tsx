import { useLocation } from "react-router-dom"
import { motion } from "framer-motion"

import { NavLink } from "react-router-dom"

interface Props {
  to: string
  className?: string
  children: React.ReactNode
  [x: string]: any
}

// NavigationLink that will be rendered in header, it has animation
const HeaderNavigationLink = ({ to, className, children, ...rest }: Props) => {
  const location = useLocation() // function to get user's location (path)
  const isActive = to === (location.pathname.substring(1) || "/") // checks if the user is on the current page

  return (
    <motion.div
      initial={{ opacity: 1 }}
      whileHover={{ opacity: 0.65 }}
      whileTap={{ scale: 0.9 }}
      className={`${className}`}
    >
      <NavLink
        to={to}
        className={`sm:text-base text-lg `}
        {...rest}
      >
        <div className="relative">
          {children}
          <div
            className={`h-0.5 bg-sp-main w-0 transition-all ease-in-out duration-200 absolute  ${
              isActive ? `opacity-1 w-full` : `opacity-0`
            }`}
          ></div>
        </div>
      </NavLink>
    </motion.div>
  )
}
export default HeaderNavigationLink
