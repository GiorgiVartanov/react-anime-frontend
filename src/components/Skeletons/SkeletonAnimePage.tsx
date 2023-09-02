import SkeletonAnimeCardList from "../Anime/Skeleton/SkeletonAnimeCardList"
import SkeletonText from "./SkeletonText"

const SkeletonAnimePage = () => {
  const renderInformation = () => {
    return (
      <div className="bg-sp-black/80 flex flex-col gap-2 px-3 py-2 lg:py-12 lg:h-full max-w-lg mx-auto lg:mx-0">
        {/* {renderLine(16, 8)}
        {renderLine(24, 4)}
        {renderLine(8, 4)}
        {renderLine(12, 8)}
        {renderLine(8, 24)}
        {renderLine(16, 12)}
        {renderLine(8, 6)}
        {renderLine(12, 32)}
        {renderLine(12, 32)}
        {renderLine(12, 32)}
        {renderLine(11, 32)} */}
        <div className="flex gap-2">
          <div className={`bg-sp-white animate-pulse h-3 w-16`}></div>
          <div className={`bg-sp-white animate-pulse h-3 w-8`}></div>
        </div>
        <div className="flex gap-2">
          <div className={`bg-sp-white animate-pulse h-3 w-24`}></div>
          <div className={`bg-sp-white animate-pulse h-3 w-4`}></div>
        </div>
        <div className="flex gap-2">
          <div className={`bg-sp-white animate-pulse h-3 w-8`}></div>
          <div className={`bg-sp-white animate-pulse h-3 w-4`}></div>
        </div>
        <div className="flex gap-2">
          <div className={`bg-sp-white animate-pulse h-3 w-12`}></div>
          <div className={`bg-sp-white animate-pulse h-3 w-8`}></div>
        </div>
        <div className="flex gap-2">
          <div className={`bg-sp-white animate-pulse h-3 w-8`}></div>
          <div className={`bg-sp-white animate-pulse h-3 w-24`}></div>
        </div>
        <div className="flex gap-2">
          <div className={`bg-sp-white animate-pulse h-3 w-16`}></div>
          <div className={`bg-sp-white animate-pulse h-3 w-12`}></div>
        </div>
        <div className="flex gap-2">
          <div className={`bg-sp-white animate-pulse h-3 w-14`}></div>
          <div className={`bg-sp-white animate-pulse h-3 w-12`}></div>
        </div>
        <div className="flex gap-2">
          <div className={`bg-sp-white animate-pulse h-3 w-8`}></div>
          <div className={`bg-sp-white animate-pulse h-3 w-6`}></div>
        </div>
        <div className="flex gap-2">
          <div className={`bg-sp-white animate-pulse h-3 w-14`}></div>
          <div className={`bg-sp-white animate-pulse h-3 w-36`}></div>
          <div className={`bg-sp-white animate-pulse h-3 w-12`}></div>
          <div className={`bg-sp-white animate-pulse h-3 w-24`}></div>
        </div>
        <div className="flex gap-2">
          <div className={`bg-sp-white animate-pulse h-3 w-12`}></div>
          <div className={`bg-sp-white animate-pulse h-3 w-32`}></div>
          <div className={`bg-sp-white animate-pulse h-3 w-24`}></div>
        </div>
        <div className="flex gap-2">
          <div className={`bg-sp-white animate-pulse h-3 w-10`}></div>
          <div className={`bg-sp-white animate-pulse h-3 w-28`}></div>
        </div>
        <div className="flex gap-2">
          <div className={`bg-sp-white animate-pulse h-3 w-16`}></div>
          <div className={`bg-sp-white animate-pulse h-3 w-12`}></div>
          <div className={`bg-sp-white animate-pulse h-3 w-14`}></div>
          <div className={`bg-sp-white animate-pulse h-3 w-16`}></div>
        </div>
      </div>
    )
  }

  const renderDescription = () => {
    return (
      <div>
        <div className="font-bold text-lg mb-4 h-4 w-32 bg-sp-white animate-pulse mt-4"></div>
        <SkeletonText
          amount={120}
          className="w-[448px] h-[200px]"
        />
      </div>
    )
  }

  const renderImage = () => {
    return (
      <div className="h-[300px] w-[200px] bg-sp-white animate-pulse mx-auto"></div>
    )
  }

  const renderAnimeDetails = () => {
    return (
      <div className="h-[1000px] md:h-[724px] lg:h-[396px] flex lg:flex-row flex-col gap-4 sm:justify-between md:w-full">
        <div className="flex md:flex-row mx-auto lg:mx-0 flex-col relative z-20 gap-4 justify-between py-12">
          <div className="flex gap-4 flex-col md:flex-row">
            {renderImage()}
            {renderDescription()}
          </div>
        </div>
        {renderInformation()}
      </div>
    )
  }

  // const renderNavigation = () => {
  //   return (
  //     <div className="flex gap-2 justify-center md:justify-start mt-8 mb-2">
  //       <div className="bg-sp-white animate-pulse h-[31px] w-32"></div>
  //       <div className="bg-sp-white animate-pulse h-[31px] w-16"></div>
  //       <div className="bg-sp-white animate-pulse h-[31px] w-24"></div>
  //       <div className="bg-sp-white animate-pulse h-[31px] w-12"></div>
  //     </div>
  //   )
  // }

  return (
    <div>
      <div className="bg-gray-900/25">
        <div className="mx-auto max-w-7xl w-full px-2 h-full">
          {renderAnimeDetails()}
        </div>
      </div>
      <div className="mx-auto max-w-7xl w-full px-2 h-full">
        {/* {renderNavigation()} */}
      </div>
      <div className="mx-auto max-w-7xl w-full p-2 h-full">
        <SkeletonAnimeCardList amount={12} />
      </div>
    </div>
  )
}
export default SkeletonAnimePage
