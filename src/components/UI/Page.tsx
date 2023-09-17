import { motion } from "framer-motion"

interface Props {
  className?: string
  children: React.ReactNode
}

// component wraps every page component, to give them transition animation
const Page = ({ className, children }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: "-5%", overflowY: "hidden" }}
      animate={{
        opacity: 1,
        y: "0",
        overflowY: "auto",
      }}
      exit={{
        opacity: 0,
        overflowY: "hidden",
      }}
      transition={{ duration: 0.25 }}
      className={`${className}`}
    >
      {children}
    </motion.div>
  )
}
export default Page
