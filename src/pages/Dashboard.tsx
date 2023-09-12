import { useQuery } from "@tanstack/react-query"
import backendAjax from "../service/backendAjax"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

import { FullUserResponse } from "../types/user.types"

import { useAuthStore } from "../store/authStore"

import Page from "../components/UI/Page"
import Loading from "../components/UI/Loading"
import UserList from "../components/Person/UserList"
import SearchBar from "../components/Search/SearchBar"

const Dashboard = () => {
  const navigate = useNavigate()

  const [token] = useAuthStore((state) => [state.token])

  const [searchText, setSearchText] = useState<string>("")

  const fetchUsers = async (): Promise<FullUserResponse | null> => {
    // const response = await backendAjax.get(`/user/all?q=${searchText}`, {
    //   headers: { Authorization: `Bearer ${token}` },
    // })
    const response = await backendAjax.get(`/user/all?q=`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    return response.data
  }

  const { data, isLoading, error } = useQuery({
    queryFn: fetchUsers,
    // queryKey: ["users for dashboard", searchText],
    queryKey: ["users for dashboard"],
    staleTime: 1000000,
  })

  const handleTextSearchChange = (newText: string) => {
    setSearchText(newText)
  }

  const renderDashboard = () => {
    if (isLoading) return <Loading />

    if (error || !data) {
      navigate("../error")
      return <></>
    }

    const pattern = new RegExp(searchText)

    return (
      <UserList
        data={data.data.filter((item) => pattern.test(item.username))}
        className="rounded-b-md rounded-t-none"
      />
    )
  }

  return (
    <Page className="h-full grid place-content-center mt-12 mx-auto max-w-7xl w-full p-2">
      <SearchBar
        value={searchText || ""}
        handleTextChange={handleTextSearchChange}
        className="mb-2 rounded-t-md"
        debounce={false}
      />
      {renderDashboard()}
    </Page>
  )
}
export default Dashboard
