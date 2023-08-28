interface Props {
  height: number | string
  width: number | string
  className?: string
}

// skeleton component for anime card
const SkeletonCarouselCard = ({ className, height, width }: Props) => {
  return (
    <div
      style={{ width: width, height: height }}
      className={`${className}`}
    ></div>
  )
}
export default SkeletonCarouselCard
