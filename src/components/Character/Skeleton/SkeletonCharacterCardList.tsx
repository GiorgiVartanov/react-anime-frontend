import SkeletonCharacterCard from "./SkeletonCharacterCard"

interface Props {
  amount: number
}

const SkeletonCharacterCardList = ({ amount }: Props) => {
  return (
    <div>
      <div className="bg-sp-white w-full h-[33px] mb-3 animate-pulse"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {Array(amount)
          .fill(null)
          .map((_, index) => (
            <SkeletonCharacterCard key={index} />
          ))}
      </div>
    </div>
  )
}
export default SkeletonCharacterCardList
