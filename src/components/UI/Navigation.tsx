import backendAjax from "../../service/backendAjax"
import { useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

import { FullAnimeType } from "../../types/anime.types"

import { useAuthStore } from "../../store/authStore"

import Button from "./Button"
import DarkModeToggle from "./DarkModeToggle"
import HeaderNavigationLink from "../Navigation/HeaderNavigationLink"

const Navigation = () => {
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

  const fetchRandomAnime = async (): Promise<FullAnimeType> => {
    const result = await backendAjax.get(`anime/random`)

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

  const renderNavigationLink = (name: string, to: string) => {
    return (
      <li className="list-none">
        <HeaderNavigationLink to={to}>{name}</HeaderNavigationLink>
      </li>
    )
  }

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
export default Navigation
