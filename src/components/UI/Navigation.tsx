import backendAjax from "../../service/backendAjax"
import { useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { useState, useRef, RefObject } from "react"

import { FullAnimeType } from "../../types/anime.types"

import { useAuthStore } from "../../store/authStore"
import { useOnClickOutside } from "../../hooks/useOnClickOutside"

import { ReactComponent as HamburgerMenu } from "../../assets/icons/bars-solid.svg"
import { ReactComponent as CloseMark } from "../../assets/icons/xmark-solid.svg"
import Button from "./Button"
import DarkModeToggle from "./DarkModeToggle"
import HeaderNavigationLink from "../Navigation/HeaderNavigationLink"

const Navigation = () => {
  const hamburgerMenuRef = useRef<HTMLElement>(null)

  const navigate = useNavigate()

  const [username, isLoggedIn, logoutUser] = useAuthStore((state) => [
    state.username,
    state.isLoggedIn,
    state.logoutUser,
  ])

  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState<boolean>(false)

  const handleClickOutside = () => {
    setIsHamburgerMenuOpen(false)
  }

  useOnClickOutside(hamburgerMenuRef, handleClickOutside)

  const handleLogOutButton = () => {
    logoutUser()
    navigate(`./login`)
  }

  const handleHamburgerMenu = () => {
    setIsHamburgerMenuOpen((prevState) => !prevState)
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
    <nav
      ref={hamburgerMenuRef}
      className="grid place-content-center "
    >
      <button
        onClick={handleHamburgerMenu}
        className={`sm:hidden`}
      >
        {isHamburgerMenuOpen ? (
          <CloseMark
            width={32}
            height={32}
            className="animate-shake"
          />
        ) : (
          <HamburgerMenu
            width={32}
            height={32}
            className="animate-shake"
          />
        )}
      </button>
      <ul
        className={`sm:flex gap-1 ${
          isHamburgerMenuOpen
            ? "flex flex-col sm:flex-row gap-2 sm:gap-1 absolute sm:static left-0 top-[50px] bg-sp-gray w-full sm:w-auto text-center sm:text-left pt-1 sm:pt-0 pb-3 sm:pb-0"
            : "hidden"
        }`}
      >
        <DarkModeToggle
          className={`${
            isHamburgerMenuOpen ? "mx-auto mb-1 sm:mb-0 sm:mx-2.5" : ""
          }`}
        />
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
