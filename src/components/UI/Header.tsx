import { Link, NavLink, useNavigate } from "react-router-dom"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"

import { useAuthStore } from "../../store/authStore"

import { FullAnimeData } from "../../types/anime.types"

import NavigationLink from "../Navigation/NavigationLink"
import HeaderNavigationLink from "../Navigation/HeaderNavigationLink"
import Button from "./Button"
import DarkModeToggle from "./DarkModeToggle"

type Props = {
  pages: { name: string; href: string }[]
}

const baseURL = import.meta.env.VITE_BACKEND_URL

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

  const fetchRandomAnime = async (): Promise<FullAnimeData> => {
    const result = await axios.get(`${baseURL}/anime/random`)

    return result.data.data
  }

  // fetches anime form API
  const {
    isLoading,
    error,
    data: mal_id,
    refetch,
  } = useQuery({
    queryKey: ["random-anime"],
    queryFn: fetchRandomAnime,
    staleTime: 0,
  })

  const findRandomAnime = () => {
    refetch()
    if (!mal_id || isLoading) return
    navigate(`./anime/${mal_id}`)
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

  // const renderLogOutButton = () => {
  //   return <Button onClick={handleLogOutButton}>logout</Button>
  // }

  const renderNavigation = () => {
    return (
      <nav className="grid place-content-center ">
        <ul className="flex gap-1">
          <DarkModeToggle />
          {isLoading ? "" : <Button onClick={findRandomAnime}>random</Button>}
          {renderNavigationLink("search", "search")}
          {isLoggedIn ? (
            <>
              {renderNavigationLink("profile", `profile/${username}`)}
              <Button onClick={handleLogOutButton}>logout</Button>
            </>
          ) : (
            <>{renderNavigationLink("login", "login")}</>
          )}
        </ul>
      </nav>
    )
  }

  return (
    <header className="bg-sp-gray py-1 shadow-sm relative z-20 text-white">
      <div className="m-auto max-w-7xl px-2 py-1 flex justify-between">
        {renderHeader()}
        {renderNavigation()}
      </div>
    </header>
  )
}
export default Header
