type Props = {
  onSubmit: (event: React.FormEvent) => void
  children: React.ReactNode
}

const Form = ({ onSubmit, children }: Props) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-1 max-w-[360px] min-w-full ms:min-w-[360px] "
    >
      {children}
    </form>
  )
}
export default Form
