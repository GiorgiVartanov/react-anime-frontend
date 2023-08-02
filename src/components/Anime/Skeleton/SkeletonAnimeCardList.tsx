import SkeletonAnimeCard from "./SkeletonAnimeCard"

interface Props {
  amount: number
}

// list of AnimeCard's skeletons
const SkeletonAnimeCardList = ({ amount }: Props) => {
  return (
    <div className="grid grid-cols-1 xss:grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 justify-around animate-pulse">
      {Array(amount)
        .fill(null)
        .map((_, index) => (
          <SkeletonAnimeCard key={index} />
        ))}
    </div>
  )
}
export default SkeletonAnimeCardList
