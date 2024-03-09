import { motion } from "framer-motion"

const Cursor = () => {
  return (
    <motion.svg
      viewBox="8 4 8 16"
      xmlns="http://www.w3.org/2000/svg"
      className="cursor inline-block w-1"
      style={{ marginBottom: "4px" }}
      animate={{
        opacity: [0, 1, 0],
        transition: { duration: 0.5, repeat: Infinity },
      }}
    >
      <rect x="10" y="6" width="4" height="12" fill="#fff" />
    </motion.svg>
  )
}

export default Cursor
