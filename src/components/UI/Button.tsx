interface Props {
  onClick: (event: React.MouseEvent<HTMLElement>) => void
  className?: string
  children: React.ReactNode
}

const Button = ({ onClick, className, children }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`bg-sp-main px-1 py-1 transition-all ease-in-out duration-200 hover:opacity-80 active:opacity-80 ${className}`}
    >
      {children}
    </button>
  )
}
export default Button
