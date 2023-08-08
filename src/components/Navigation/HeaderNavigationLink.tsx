import { useLocation } from "react-router-dom"

import NavigationLink from "./NavigationLink"

interface Props {
  to: string
  className?: string
  activeClassName?: string
  inActiveClassName?: string
  children: React.ReactNode
  [x: string]: any
}

// NavigationLink that will be rendered in header, it has animation
const HeaderNavigationLink = ({
  to,
  className,
  activeClassName,
  inActiveClassName,
  children,
  ...rest
}: Props) => {
  const location = useLocation() // function to get user's location (path)
  const isActive = to === (location.pathname.substring(1) || "/") // checks if the user is on the current page

  return (
    <NavigationLink
      to={to}
      className={`sm:text-base text-lg ${className}`}
      {...rest}
    >
      <div className="relative">
        {children}
        <div
          className={`h-0.5 bg-sp-main w-0 transition-all ease-in-out duration-200 absolute  ${
            isActive
              ? `opacity-1 w-full ${activeClassName}`
              : `opacity-0 ${inActiveClassName}`
          }`}
        ></div>
      </div>
    </NavigationLink>
  )
}
export default HeaderNavigationLink
