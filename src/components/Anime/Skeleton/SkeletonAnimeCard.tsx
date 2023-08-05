interface Props {
  className?: string
}

// skeleton component for anime card
const SkeletonAnimeCard = ({ className }: Props) => {
  return (
    <div className={`${className}`}>
      <div className="aspect-w-2 aspect-h-3 bg-sp-white"></div>
      <div className="h-3 w-24 bg-sp-white mt-2"></div>
    </div>
  )
}
export default SkeletonAnimeCard
