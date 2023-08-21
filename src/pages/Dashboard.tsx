import { useQuery } from "@tanstack/react-query"
import backendAjax from "../service/backendAjax"
import { useNavigate } from "react-router-dom"

import { FullUserResponse } from "../types/user.types"

import { useAuthStore } from "../store/authStore"

import Page from "../components/UI/Page"
import Loading from "../components/UI/Loading"

const Dashboard = () => {
  const navigate = useNavigate()

  const [username, accountType, token] = useAuthStore((state) => [
    state.username,
    state.accountType,
    state.token,
  ])

  if (accountType !== "Admin") {
    navigate("/")
  }

  const fetchUsers = async (): Promise<FullUserResponse | null> => {
    if (accountType !== "Admin") return null

    const response = await backendAjax.get("/user/all", {
      headers: { Authorization: `Bearer ${token}` },
    })

    return response.data
  }

  const { data, isLoading, error } = useQuery({
    queryFn: fetchUsers,
    queryKey: ["users for dashboard"],
    staleTime: 1000000,
  })

  if (isLoading) return <Loading />

  if (error || !data) return <>something went wrong</>

  // console.log(data)

  return (
    <Page className="w-full p-2 h-full gap-6 flex flex-col max-w-7xl mx-auto">
      Dashboard
    </Page>
  )
}
export default Dashboard
