import backendAjax from "../../service/backendAjax"
import { useNavigate } from "react-router-dom"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

import { FullAnimeType } from "../../types/anime.types"

import { useAuthStore } from "../../store/authStore"
import { useOnClickOutside } from "../../hooks/useOnClickOutside"

import { ReactComponent as HamburgerMenu } from "../../assets/icons/bars-solid.svg"
import { ReactComponent as CloseMark } from "../../assets/icons/xmark-solid.svg"
import Button from "./Button"
import DarkModeToggle from "./DarkModeToggle"
import HeaderNavigationLink from "../Navigation/HeaderNavigationLink"
import DropDownMenu from "./DropDownMenu"

const dropdownMenu = {
  hidden: { opacity: 0, y: "-5%" },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.05,
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

// navigation menu for header
const Navigation = () => {
  const queryClient = useQueryClient()

  // reference to the hamburger menu, is used in useOnClickOutside hook to trigger a function when user clicks outside of it
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

  // function used to open hamburger menu when its open and vice versa
  const handleHamburgerMenu = () => {
    setIsHamburgerMenuOpen((prevState) => !prevState)
  }

  // function to fetch random anime id from the backend
  const fetchRandomAnime = async (): Promise<FullAnimeType> => {
    const result = await backendAjax.get(`anime/random`)

    return result.data.data
  }

  // fetches random anime id
  const {
    isLoading,
    data: mal_id,
    refetch,
  } = useQuery({
    queryKey: ["random-anime"],
    queryFn: fetchRandomAnime,
    staleTime: 1000,
  })

  // fetches random anime id from the backend ()
  const findRandomAnime = () => {
    queryClient.cancelQueries(["random-anime"])
    refetch()

    if (!mal_id || isLoading) return

    navigate(`./anime/${mal_id}`)
  }

  // renders navigation link for passed arguments
  const renderNavigationLink = (name: string, to: string) => {
    return (
      <motion.li
        variants={menuItem}
        className="list-none py-3 sm:py-1 my-auto"
      >
        <HeaderNavigationLink
          to={to}
          onClick={handleCloseMenu}
        >
          {name}
        </HeaderNavigationLink>
      </motion.li>
    )
  }

  // renders dropdown menu with 2 links, one for user search second for anime search
  const renderSearchButton = () => {
    return (
      <motion.div variants={menuItem}>
        <DropDownMenu
          buttonName="search"
          className="text-lg sm:text-md"
        >
          {renderNavigationLink("anime", "search/anime")}
          {renderNavigationLink("users", "search/users")}
        </DropDownMenu>
      </motion.div>
    )
  }

  const renderNavBar = () => {
    // rendering navbar in a AnimatePresence, so it will be possible to animate it after its removed from dom
    return (
      <AnimatePresence>
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
              className="bg-transparent sm:w-auto w-full dark:text-white sm:py-1 py-3 sm:text-base text-lg my-auto"
            >
              random
            </Button>
          </motion.li>
          {renderSearchButton()}
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
                  className="sm:w-auto w-full dark:text-white sm:py-1 mt-3 sm:mt-0 py-2 sm:text-base text-lg px-1 my-auto"
                >
                  logout
                </Button>
              </motion.li>
            </>
          ) : (
            <>{renderNavigationLink("sign up", "register")}</>
          )}
        </motion.ul>
      </AnimatePresence>
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
      {renderNavBar()}
    </nav>
  )
}
export default Navigation
