import { motion } from "framer-motion"

interface Props {
  onClick?: (event: React.MouseEvent<HTMLElement>) => void // button
  className?: string
  disabled?: boolean
  children: React.ReactNode
}

const Button = ({ onClick, className, disabled = false, children }: Props) => {
  return (
    <motion.button
      style={{ scale: 1 }}
      initial={{ opacity: disabled ? 0.5 : 1 }}
      whileHover={{ opacity: disabled ? 0.5 : 0.8 }}
      whileTap={{ scale: disabled ? 1 : 0.9 }}
      onClick={onClick}
      disabled={disabled}
      className={`block bg-sp-main px-1 py-1 ${className}`}
    >
      {children}
    </motion.button>
  )
}
export default Button
