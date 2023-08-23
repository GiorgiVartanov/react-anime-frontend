import { useQuery } from "@tanstack/react-query"
import backendAjax from "../service/backendAjax"
import { useNavigate } from "react-router-dom"

import { FullUserResponse } from "../types/user.types"

import { useAuthStore } from "../store/authStore"

import Page from "../components/UI/Page"
import Loading from "../components/UI/Loading"
import UserList from "../components/Person/UserList"

const Dashboard = () => {
  const [token] = useAuthStore((state) => [state.token])

  const fetchUsers = async (): Promise<FullUserResponse | null> => {
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

  return (
    <Page className="h-full grid place-content-center m-auto max-w-7xl w-full p-2 ">
      <UserList data={data.data} />
    </Page>
  )
}
export default Dashboard
