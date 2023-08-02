interface Props {
  amount: number
  className?: string
}

const SkeletonText = ({ amount, className }: Props) => {
  const renderWord = ({ key }: { key: number }) => {
    const length = Math.round(Math.random() * 70) + 6

    return (
      <div
        key={key}
        style={{ width: length }}
        className={`h-2 bg-white animate-pulse`}
      ></div>
    )
  }

  return (
    <div className={`flex gap-2 flex-wrap ${className || ""}`}>
      {Array(amount)
        .fill(null)
        .map((_, index) => renderWord({ key: index }))}
    </div>
  )
}
export default SkeletonText
