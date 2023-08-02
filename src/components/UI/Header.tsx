import { Link, NavLink, useNavigate } from "react-router-dom"

import { useAuthStore } from "../../store/authStore"

import NavigationLink from "../Navigation/NavigationLink"
import HeaderNavigationLink from "../Navigation/HeaderNavigationLink"
import Button from "./Button"

type Props = {
  pages: { name: string; href: string }[]
}

const Header = ({ pages }: Props) => {
  const navigate = useNavigate()

  const [username, isLoggedIn, logoutUser] = useAuthStore((state) => [
    state.username,
    state.isLoggedIn,
    state.logoutUser,
  ])

  const handleLogOutButton = () => {
    logoutUser()
    navigate(`./login`)
  }

  // renders single navigation link
  const renderNavigationLink = (name: string, to: string) => {
    return (
      <li className="list-none">
        <HeaderNavigationLink to={to}>{name}</HeaderNavigationLink>
      </li>
    )
  }

  const renderHeader = () => {
    return <HeaderNavigationLink to="/">header</HeaderNavigationLink>
  }

  const renderLogOutButton = () => {
    return <Button onClick={handleLogOutButton}>logout</Button>
  }

  const renderNavigation = () => {
    return (
      <nav className="grid place-content-center">
        <ul className="flex gap-1">
          {renderNavigationLink("search", "search")}
          {isLoggedIn ? (
            <>
              {renderNavigationLink("profile", `profile/${username}`)}
              {renderLogOutButton()}
            </>
          ) : (
            <>{renderNavigationLink("login", "login")}</>
          )}
        </ul>
      </nav>
    )
  }

  return (
    <header className="bg-sp-gray py-1 shadow-sm relative z-20">
      <div className="m-auto max-w-7xl px-2 py-1 flex justify-between">
        {renderHeader()}
        {renderNavigation()}
      </div>
    </header>
  )
}
export default Header
