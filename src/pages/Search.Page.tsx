import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"
import { useEffect } from "react"

import { useSearchStore } from "../store/searchStore"
import { AnimeType } from "../types/anime.types"

import Page from "../components/UI/Page"
import AnimeCardList from "../components/Anime/AnimeCardList"
import SearchComponent from "../components/Search/Search"
import ScrollToTopButton from "../components/UI/ScrollToTopButton"
import Loading from "../components/UI/Loading"

const baseURL = import.meta.env.VITE_API_URL

// page where user can search for anime
const Search = () => {
  const [
    limit,
    // page,
    selectedGenres,
    sort,
    orderBy,
    status,
    rating,
    text,
  ] = useSearchStore((state) => [
    state.limit,
    // state.page,
    state.selectedGenres,
    state.sort,
    state.orderBy,
    state.status,
    state.rating,
    state.text,
  ])

  // function that fetches searched anime from API
  const fetchAnime = async ({ pageParam = 1 }) => {
    const url = new URL(`${baseURL}/anime`)

    url.searchParams.set("limit", limit.toString())
    url.searchParams.set("sfw", "true")
    url.searchParams.set("sort", sort)
    url.searchParams.set("order_by", orderBy)
    if (selectedGenres.length > 0) url.searchParams.set("genres", selectedGenres.join())
    if (rating && rating.toLocaleLowerCase() !== "all") url.searchParams.set("rating", rating)
    if (status && status.toLocaleLowerCase() !== "all") url.searchParams.set("status", status)
    if (text) url.searchParams.set("q", text)
    url.searchParams.set(
      "genres_exclude",
      "28,26,47,9,49,12,50,51,52,53,81,55,57,58,35,60,61,63,64,65,69,70,73,74,75,15"
    )
    url.searchParams.set("page", pageParam.toString())

    const response = await axios.get(url.href)

    const data = response.data

    return data
  }

  // fetches data from API
  const {
    isLoading,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    // isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [
      "anime",
      limit,
      // page,
      orderBy,
      rating,
      status,
      sort,
      selectedGenres.join(),
      text,
    ],
    queryFn: fetchAnime,
    getNextPageParam: (lastPage) => {
      if (lastPage?.pagination?.has_next_page) {
        return lastPage?.pagination?.current_page + 1
      } else {
        return undefined
      }
    },
    staleTime: 1000000,
  })

  // function that renders anime cards
  const renderCardList = () => {
    // if the data is still pending it will render skeleton component
    if (isLoading)
      return (
        <div className="mt-96">
          <Loading />
        </div>
      )

    // it will show error message if there is an error
    if (error || !data) return <div>something went wrong</div>

    // removes items with duplicate mal_id
    const seen = new Set()
    const allData = data.pages.map((page) =>
      page.data.filter((anime: AnimeType) => {
        if (seen.has(anime.mal_id)) return false
        seen.add(anime.mal_id)
        return true
      })
    )

    return <AnimeCardList data={allData} />
  }

  let isFetching = false // isFetching, isLoading and isFetchingNextPage from getNextPageParam were not changing their values, idk why
  // Function to handle scrolling and check if user reached the bottom
  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement
    const distanceFromBottom = scrollHeight - (scrollTop + clientHeight)

    if (distanceFromBottom <= 350 && hasNextPage !== false && !isFetchingNextPage && !isFetching) {
      isFetching = true
      fetchNextPage()
      setTimeout(() => {
        isFetching = false
      }, 350)
    }
  }

  // adds an event listener for scrolling when the component mounts
  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      // removes an event listener when the component unmounts
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <Page className="mx-auto max-w-7xl w-full p-2 h-full relative">
      <SearchComponent />
      {renderCardList()}
      {data?.pages && data.pages.length > 2 ? <ScrollToTopButton /> : ""}
      {/* {isFetchingNextPage ? <SkeletonAnimeCardList amount={20} /> : ""} */}
    </Page>
  )
}

export default Search
