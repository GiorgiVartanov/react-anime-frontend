import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import backendAjax from "../service/backendAjax"

import Page from "../components/UI/Page"
import SearchBar from "../components/Search/SearchBar"
import UserIconList from "../components/Person/UserIconList"
import Loading from "../components/UI/Loading"

// page where user can search for other users
const UserSearch = () => {
  const [text, setText] = useState<string>("")

  const changeText = (newText: string) => {
    setText(newText)
  }

  const fetchUsers = async () => {
    const response = await backendAjax.get(`user/search?q=${text}`)

    return response.data.data
  }

  const { data, isLoading, error } = useQuery({
    queryFn: fetchUsers,
    queryKey: ["users", "q", text],
    staleTime: 1000000,
  })

  const renderUserList = () => {
    if (isLoading) return <Loading />

    if (error || !data) return <div>something went wrong</div>

    const usernames = data.map((user: { username: string }) => user.username)

    return (
      <UserIconList
        users={usernames}
        emptyMessage={"there are no users for this query"}
        className="justify-center"
      />
    )
  }

  return (
    <Page className="mx-auto max-w-7xl w-full p-2 h-full">
      <SearchBar
        value={text}
        handleTextChange={changeText}
        className="mt-5 mb-8"
      />
      {renderUserList()}
    </Page>
  )
}
export default UserSearch
