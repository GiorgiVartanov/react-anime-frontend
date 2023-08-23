import { Navigate } from "react-router-dom"

import { useAuthStore } from "../../store/authStore"

interface Props {
  level: "All" | "User" | "Guest" | "Admin"
  children: React.ReactNode
}

const ProtectedRoute = ({ level, children }: Props) => {
  const [isLoggedIn, accountType] = useAuthStore((state) => [
    state.isLoggedIn,
    state.accountType,
  ])

  if (level === "Guest" && isLoggedIn) return <Navigate to="/" />

  if (level === "User" && !isLoggedIn) return <Navigate to="/" />

  if (level === "Admin" && accountType !== "Admin") return <Navigate to="/" />

  return <>{children}</>
}
export default ProtectedRoute
