import { motion } from "framer-motion"

interface Props {
  className?: string
  children: React.ReactNode
}

const Page = ({ className, children }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      className={`${className}`}
    >
      {children}
    </motion.div>
  )
}
export default Page
