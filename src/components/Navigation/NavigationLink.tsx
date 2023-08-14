import { NavLink } from "react-router-dom"

interface Props {
  to: string
  className?: string
  children: React.ReactNode
  [x: string]: any
}

// react-router's navlink but it also has props activeClassNames (classes that will be applied to it if it is active), inActiveClassNames (classes that will be applied to it if it is inactive)
const NavigationLink = ({
  to,
  className,
  activeClassNames,
  inActiveClassNames,
  children,
  ...rest
}: Props) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-1 py-1 transition-all ease-in-out duration-200 ${className} ${
          isActive ? activeClassNames : inActiveClassNames
        }`
      }
      {...rest}
    >
      {children}
    </NavLink>
  )
}
export default NavigationLink
