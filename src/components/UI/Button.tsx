import { motion } from "framer-motion"

interface Props {
  onClick: (event: React.MouseEvent<HTMLElement>) => void
  className?: string
  children: React.ReactNode
}

const Button = ({ onClick, className, children }: Props) => {
  return (
    <motion.button
      initial={{ opacity: 1 }}
      whileHover={{ opacity: 0.65 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`block bg-sp-main px-1 py-1 ${className}`}
    >
      {children}
    </motion.button>
  )
}
export default Button
