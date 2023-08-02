import generateColor from "../../util/generateColor"
import generateNegativeColor from "../../util/generateNegativeColor"

interface Props {
  username: string
}

// renders icon with username's first character
const UserIcon = ({ username }: Props) => {
  const color = generateColor(username)
  const negativeColor = generateNegativeColor(color)

  return (
    <div
      style={{ backgroundColor: color, color: negativeColor }}
      className="bg-sp-main font-bold rounded-full text-center leading-8 h-8 w-8 no-underline"
    >
      <p>{username[0].toUpperCase()}</p>
    </div>
  )
}
export default UserIcon
