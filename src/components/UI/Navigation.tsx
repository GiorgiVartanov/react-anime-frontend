import backendAjax from "../../service/backendAjax"
import { useNavigate } from "react-router-dom"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"

import { FullAnimeType } from "../../types/anime.types"

import { useAuthStore } from "../../store/authStore"
import { useOnClickOutside } from "../../hooks/useOnClickOutside"

import { ReactComponent as HamburgerMenu } from "../../assets/icons/bars-solid.svg"
import { ReactComponent as CloseMark } from "../../assets/icons/xmark-solid.svg"
import Button from "./Button"
import DarkModeToggle from "./DarkModeToggle"
import HeaderNavigationLink from "../Navigation/HeaderNavigationLink"

const dropdownMenu = {
  hidden: { opacity: 0, y: "-10%" },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
}

const menuItem = {
  hidden: { y: 0, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
}

const Navigation = () => {
  const queryClient = useQueryClient()

  const hamburgerMenuRef = useRef<HTMLElement>(null)

  const navigate = useNavigate()

  const [username, isLoggedIn, logoutUser, accountType] = useAuthStore(
    (state) => [
      state.username,
      state.isLoggedIn,
      state.logoutUser,
      state.accountType,
    ]
  )

  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState<boolean>(false)
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth)

  const handleCloseMenu = () => {
    setIsHamburgerMenuOpen(false)
  }

  const handleClickOutside = () => {
    handleCloseMenu()
  }

  useOnClickOutside(hamburgerMenuRef, handleClickOutside)

  const handleLogout = () => {
    logoutUser()
    queryClient.clear()
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
      <motion.li
        variants={menuItem}
        className="list-none"
      >
        <HeaderNavigationLink
          to={to}
          onClick={handleCloseMenu}
          className="block py-3 sm:py-1"
        >
          {name}
        </HeaderNavigationLink>
      </motion.li>
    )
  }

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <nav
      ref={hamburgerMenuRef}
      className="grid place-content-center"
    >
      <Button
        onClick={handleHamburgerMenu}
        className={`sm:hidden bg-transparent`}
      >
        {isHamburgerMenuOpen ? (
          <CloseMark
            width={32}
            height={32}
            fill={"#e91e63"}
          />
        ) : (
          <HamburgerMenu
            width={32}
            height={32}
            fill={"#e91e63"}
          />
        )}
      </Button>
      <motion.ul
        initial="hidden"
        animate={
          isHamburgerMenuOpen || screenWidth > 640 ? "visible" : "hidden"
        }
        exit="hidden"
        variants={dropdownMenu}
        className={`sm:flex h-fit gap-4 ${
          isHamburgerMenuOpen
            ? "flex flex-col sm:flex-row gap-2 sm:gap-1 absolute sm:static left-0 top-[50px] dark:bg-sp-gray bg-sp-white w-full sm:w-auto text-center sm:text-left pt-1 -mt-1 sm:mt-0 sm:pt-0 pb-3 sm:pb-0 shadow-xl sm:shadow-none px-4"
            : "hidden"
        }`}
      >
        <motion.li
          variants={menuItem}
          className="flex flex-col justify-center"
        >
          <DarkModeToggle
            className={`${
              isHamburgerMenuOpen ? "mx-auto mb-1 sm:mb-0 sm:mx-2.5" : ""
            }`}
          />
        </motion.li>
        <motion.li
          variants={menuItem}
          className="flex flex-col justify-center"
        >
          <Button
            onClick={() => {
              handleCloseMenu()
              findRandomAnime()
            }}
            className="bg-transparent sm:w-auto w-full dark:text-white sm:py-1 py-3 sm:text-base text-lg"
          >
            random
          </Button>
        </motion.li>
        {renderNavigationLink("search", "search")}
        {isLoggedIn ? (
          <>
            {renderNavigationLink("profile", `profile/${username}`)}
            {accountType === "Admin"
              ? renderNavigationLink("dashboard", "dashboard")
              : ""}
            <motion.li
              variants={menuItem}
              className="flex flex-col justify-center"
            >
              <Button
                onClick={() => {
                  handleCloseMenu()
                  handleLogout()
                }}
                className="sm:w-auto w-full dark:text-white sm:py-1 mt-3 sm:mt-0 py-2 sm:text-base text-lg"
              >
                logout
              </Button>
            </motion.li>
          </>
        ) : (
          <>{renderNavigationLink("sign up", "register")}</>
        )}
      </motion.ul>
    </nav>
  )
}
export default Navigation
