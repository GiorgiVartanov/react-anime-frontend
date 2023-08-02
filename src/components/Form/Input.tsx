interface Props {
  name: string
  type: string
  placeholder: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  error?: string[]
}

const Input = ({
  name,
  type,
  placeholder,
  value,
  onChange,
  className,
  error,
}: Props) => {
  return (
    <>
      <input
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        className={`outline-offset-0 w-full ${
          error && error.length > 0 ? "border-l-2 border-l-red-400" : ""
        } ${
          value.length > 0 && error && error.length === 0
            ? "border-l-2  border-l-green-400"
            : ""
        } ${
          className || ""
        } w-full block p-1 outline-none text-slate-900 focus:placeholder:text-transparent`}
      />
      {/* renders list of errors */}
      {error && error.length > 0 ? (
        <ul className="list-disc ml-4 w-fit">
          {error.map((errorName: string) => (
            <li
              key={errorName}
              className="text-red-400 text-sm"
            >
              {errorName}
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}
    </>
  )
}
export default Input
