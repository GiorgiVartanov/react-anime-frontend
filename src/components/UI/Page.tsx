import { motion } from "framer-motion"

interface Props {
  className?: string
  children: React.ReactNode
}

const Page = ({ className, children }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, overflowY: "hidden" }}
      animate={{
        opacity: 1,
        overflowY: "auto",
      }}
      exit={{
        opacity: 0,
        overflowY: "hidden",
      }}
      transition={{ type: "tween", opacity: { duration: 0.25 } }}
      className={`${className}`}
    >
      {children}
    </motion.div>
  )
}
export default Page
