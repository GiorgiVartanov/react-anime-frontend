import { Navigate } from "react-router-dom"

import { useAuthStore } from "../../store/authStore"

interface Props {
  level: "All" | "User" | "Guest" | "Admin"
  children: React.ReactNode
}

// component that wraps pages, and checks if the user's access level satisfies route's access level
const ProtectedRoute = ({ level, children }: Props) => {
  const [isLoggedIn, accountType] = useAuthStore((state) => [
    state.isLoggedIn,
    state.accountType,
  ])

  // if the page is accessible only for guest users (like sign in and sign up pages)
  if (level === "Guest" && isLoggedIn) return <Navigate to="/" />

  if (level === "User" && !isLoggedIn) return <Navigate to="/" />

  if (level === "Admin" && accountType !== "Admin") return <Navigate to="/" />

  return <>{children}</>
}
export default ProtectedRoute
