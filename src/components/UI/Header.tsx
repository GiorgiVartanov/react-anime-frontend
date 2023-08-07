import { Link, NavLink, useNavigate } from "react-router-dom"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"

import { useAuthStore } from "../../store/authStore"

import { FullAnimeType, FullAnimeResponse } from "../../types/anime.types"

import NavigationLink from "../Navigation/NavigationLink"
import HeaderNavigationLink from "../Navigation/HeaderNavigationLink"
import Button from "./Button"
import DarkModeToggle from "./DarkModeToggle"
import Navigation from "./Navigation"

type Props = {
  pages: { name: string; href: string }[]
}

const baseURL = import.meta.env.VITE_BACKEND_URL

const Header = ({ pages }: Props) => {
  return (
    <header className="bg-sp-gray py-1 shadow-sm relative z-20 text-white">
      <div className="m-auto max-w-7xl px-2 py-1 flex justify-between">
        <HeaderNavigationLink to="/">
          <h1 className="text-sp-main font-extrabold">
            AX<span className="text-white font-extrabold">P</span>
          </h1>
        </HeaderNavigationLink>
        <Navigation />
      </div>
    </header>
  )
}
export default Header
