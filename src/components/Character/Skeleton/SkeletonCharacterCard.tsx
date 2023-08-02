const SkeletonCharacterCard = () => {
  return (
    <div className="flex justify-between outline-1 text-sm gap-5 max-w-12 bg-sp-black p-1 relative h-[80px] shadow-sm animate-pulse">
      <div className="flex gap-2 absolute left-2 pr-4">
        <div className="flex justify-between py-3">
          <div className="bg-sp-white h-[50px] w-[50px] rounded-full mx-2"></div>
          <div className="flex flex-col justify-between gap-1 py-4 pl-4">
            <div className="h-2 bg-sp-white w-20"></div>
            <div className="h-2 bg-sp-white w-16"></div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 absolute right-2 pl-4">
        <div className="flex justify-between py-3">
          <div className="flex flex-col justify-between gap-1 py-4 pr-4">
            <div className="h-2 bg-sp-white w-20"></div>
            <div className="h-2 bg-sp-white w-16 ml-auto"></div>
          </div>
          <div className="bg-sp-white h-[50px] w-[50px] rounded-full mx-2"></div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonCharacterCard
