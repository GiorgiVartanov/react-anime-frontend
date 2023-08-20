import { motion } from "framer-motion"

interface Props {
  name: string
  type: string
  placeholder: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  autoComplete?: string
  className?: string
  error?: string[]
}

const Input = ({
  name,
  type,
  placeholder,
  value,
  onChange,
  autoComplete = "on",
  className,
  error,
}: Props) => {
  return (
    <>
      <motion.input
        whileHover={{ boxShadow: "0 0 4px #e91e63" }}
        whileFocus={{ boxShadow: "0 0 4px #e91e63" }}
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        className={`outline-offset-0 shadow-sm transition-all ease-in-out duration-200 w-full ${
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
