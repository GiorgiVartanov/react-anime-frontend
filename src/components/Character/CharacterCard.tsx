import { Link } from "react-router-dom"

import { motion } from "framer-motion"

const item = {
  hidden: { y: 0, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
}

export interface Props {
  characterId?: number
  characterName?: string
  characterImageURL?: string
  characterRole?: string
  VAName?: string
  VAImageURL?: string
  VALanguage?: string
  VAID?: number
}

// card that shows character and their voice actor
const CharacterCard = ({
  characterId,
  characterName,
  characterImageURL,
  characterRole,
  VAName,
  VAImageURL,
  VALanguage,
  VAID,
}: Props) => {
  return (
    <motion.div
      variants={item}
      whileHover={{ opacity: 0.8 }}
      className={`grid grid-cols-2 justify-between text-sm gap-1 max-w-12 bg-sp-white dark:bg-sp-gray text-sp-black dark:text-white relative h-[80px] shadow-sm ${
        VAName || VALanguage || VAImageURL ? "" : ""
      }`}
    >
      <Link to={`/character/${characterId}`}>
        <motion.div
          whileHover={{ opacity: 0.8 }}
          whileTap={{ scale: 0.95 }}
          className={`flex gap-2 w-full justify-start overflow-x-hidden ${
            VAName || VALanguage || VAImageURL ? "" : "pr-1 w-full"
          }`}
        >
          <img
            src={characterImageURL}
            alt={characterName}
            className="object-cover shadow-sm h-[80px] w-[56px] max-w-full max-h-full transition-all ease-in-out duration-200"
            loading="lazy"
          />
          <div className="flex flex-col justify-between py-4">
            <p className="overflow-none whitespace-nowrap font-semibold truncate max-w-[11ch]">
              {characterName}
            </p>
            <p className="opacity-40 font-semibold overflow-hidden truncate max-w-[11ch]">
              {characterRole}
            </p>
          </div>
        </motion.div>
      </Link>
      {VAName || VALanguage || VAImageURL ? (
        <Link to={`/stuff/${VAID}`}>
          <motion.div
            initial={{ opacity: 0.6 }}
            whileHover={{ opacity: 0.9 }}
            whileTap={{ scale: 0.95 }}
            className={`flex justify-end gap-2 active:opacity-80 transition-all ease-in-out duration-200`}
          >
            <div className="flex flex-col justify-between py-4 text-right">
              <p className="overflow-none whitespace-nowrap font-semibold truncate max-w-[11ch]">
                {VAName}
              </p>
              <p className="opacity-40 font-semibold truncate max-w-[11ch]">
                {VALanguage}
              </p>
            </div>
            <img
              src={VAImageURL}
              alt={VAName}
              className="object-cover shadow-sm h-[80px] w-[56px] transition-all ease-in-out duration-200"
              loading="lazy"
            />
          </motion.div>
        </Link>
      ) : (
        ""
      )}
    </motion.div>
  )
}
export default CharacterCard
