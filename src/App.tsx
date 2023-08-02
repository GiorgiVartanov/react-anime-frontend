import { Routes, Route, Link } from "react-router-dom"
import { useEffect } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { useAuthStore } from "./store/authStore"

import Header from "./components/UI/Header"

import Home from "./pages/Home.page"
import Search from "./pages/Search.Page"
import Anime from "./pages/Anime.page"
import Login from "./pages/Login.page"
import Register from "./pages/Register.page"
import Profile from "./pages/Profile.page"
import PageNotFound from "./pages/PageNotFound.page"

function App() {
  const [hasSessionExpired] = useAuthStore((state) => [state.hasSessionExpired])

  // hasSessionExpired()

  useEffect(() => {
    hasSessionExpired()
  }, [hasSessionExpired])

  return (
    <div className="bg-sp-black min-h-screen flex flex-col">
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
        theme="dark"
      />
    </div>
  )
}

export default App

function ToastLink() {
  return <Link to="login">your session has expired, please, log in again</Link>
}
