import { motion } from "framer-motion"

const PageNotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex-1 flex justify-center items-center"
    >
      <h2 className="text-5xl text-red-300 block my-auto relative text-center">
        <span>404</span> Page Not Found
      </h2>
    </motion.div>
  )
}
export default PageNotFound
