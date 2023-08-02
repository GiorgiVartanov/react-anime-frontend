import Button from "./Button"

interface Props {
  onClick: (event: React.MouseEvent<HTMLElement>) => void
  className?: string
  children: React.ReactNode
}

const LogOutButton = ({ onClick, className, children }: Props) => {
  return (
    <Button
      onClick={onClick}
      className="bg-red-500 p-1"
    >
      LogOutButton
    </Button>
  )
}
export default LogOutButton
