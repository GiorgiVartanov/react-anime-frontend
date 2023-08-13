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
    <div className="flex gap-2 text-center items-center">
      <div
        style={{ backgroundColor: color, color: negativeColor }}
        className="bg-sp-main font-bold rounded-full text-center leading-8 h-8 w-8 no-underline"
      >
        <p className="font-extrabold">{username[0].toUpperCase()}</p>
      </div>
      <p className="font-semibold">{username}</p>
    </div>
  )
}
export default UserIcon
