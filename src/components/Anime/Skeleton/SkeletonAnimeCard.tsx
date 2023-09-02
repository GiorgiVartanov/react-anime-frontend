interface Props {
  height?: number | string
  width?: number | string
  className?: string
}

// skeleton component for anime card
const SkeletonAnimeCard = ({ className, width = 200, height = 300 }: Props) => {
  return (
    <div
      style={{ width: width, height: height }}
      className={`${className}`}
    >
      <div className="aspect-w-2 aspect-h-3"></div>
      <div className="h-3 w-24 mt-2"></div>
    </div>
  )
}
export default SkeletonAnimeCard
