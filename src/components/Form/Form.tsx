type Props = {
  onSubmit: (event: React.FormEvent) => void
  children: React.ReactNode
  className?: string
}

const Form = ({ onSubmit, children, className, ...rest }: Props) => {
  return (
    <form
      onSubmit={onSubmit}
      className={`flex flex-col gap-1 max-w-[360px] min-w-full ms:min-w-[360px] ${className}`}
      {...rest}
    >
      {children}
    </form>
  )
}
export default Form
