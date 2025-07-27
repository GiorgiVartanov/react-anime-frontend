import { motion } from "framer-motion"

interface Props {
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
  className?: string
  disabled?: boolean
  children: React.ReactNode
}

const Button = ({ onClick, className, disabled = false, children, ...rest }: Props) => {
  return (
    <motion.button
      // style={{ scale: 1 }}
      initial={{ opacity: disabled ? 0.6 : 1 }}
      whileHover={{ opacity: disabled ? 0.6 : 0.8 }}
      // whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`block bg-sp-main ${className}`}
      {...rest}
    >
      {children}
    </motion.button>
  )
}
export default Button
