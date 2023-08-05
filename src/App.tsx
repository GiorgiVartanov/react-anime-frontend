import { Routes, Route, Link } from "react-router-dom"
import { useEffect } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { useAuthStore } from "./store/authStore"
import { useSettingsStore } from "./store/settingsStore"

import Header from "./components/UI/Header"

import Home from "./pages/Home.page"
import Search from "./pages/Search.Page"
import Anime from "./pages/Anime.page"
import Login from "./pages/Login.page"
import Register from "./pages/Register.page"
import Profile from "./pages/Profile.page"
import Stuff from "./pages/Stuff.page"
import Character from "./pages/Character.page"
import PageNotFound from "./pages/PageNotFound.page"

function App() {
  const [hasSessionExpired] = useAuthStore((state) => [state.hasSessionExpired])
  const [theme, toggleDarkMode] = useSettingsStore((state) => [
    state.theme,
    state.toggleDarkMode,
  ])

  useEffect(() => {
    hasSessionExpired()
  }, [hasSessionExpired])

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  return (
    <div className="bg-white dark:bg-sp-black dark:text-sp-white text-sp-black min-h-screen flex flex-col">
      <Header pages={[]} />
      <div className="h-full flex-1 flex flex-col">
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/search"
            element={<Search />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
          <Route
            path="/profile/:username"
            element={<Profile />}
          />
          <Route
            path="/stuff/:id"
            element={<Stuff />}
          />
          <Route
            path="/character/:id"
            element={<Character />}
          />
          <Route
            path="/anime/:id"
            element={<Anime />}
          />
          <Route
            path="/*"
            element={<PageNotFound />}
          />
        </Routes>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
      />
    </div>
  )
}

export default App

function ToastLink() {
  return <Link to="login">your session has expired, please, log in again</Link>
}
