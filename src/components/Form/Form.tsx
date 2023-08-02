type Props = {
  onSubmit: (event: React.FormEvent) => void
  autoComplete?: "on" | "off"
  children: React.ReactNode
}

const Form = ({ onSubmit, autoComplete = "on", children }: Props) => {
  return (
    <form
      onSubmit={onSubmit}
      autoComplete={autoComplete}
      className="flex flex-col gap-1 max-w-[360px] min-w-full ms:min-w-[360px] "
    >
      {children}
    </form>
  )
}
export default Form
