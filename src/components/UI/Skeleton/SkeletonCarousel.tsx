import { useEffect, useState } from "react"

import SkeletonCarouselCard from "./SkeletonCarouselCard"

interface Props {
  width?: number
  height?: number
}

const SkeletonCarousel = ({ width = 200, height = 300 }) => {
  return (
    <div className="relative overflow-hidden">
      <div className="flex  gap-2">
        {Array(8)
          .fill(null)
          .map((_, index) => (
            <SkeletonCarouselCard
              key={index}
              className="min-w-[200px]"
              height={height}
              width={width}
            />
          ))}
      </div>
    </div>
  )
}
export default SkeletonCarousel
