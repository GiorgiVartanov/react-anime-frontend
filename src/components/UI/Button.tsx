interface Props {
  onClick: (event: React.MouseEvent<HTMLElement>) => void
  className?: string
  children: React.ReactNode
}

const Button = ({ onClick, className, children }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`bg-sp-main px-1 py-1 will-change-transform ${className}`}
    >
      {children}
    </button>
  )
}
export default Button
