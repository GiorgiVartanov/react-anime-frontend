import { useState } from "react"
import { Link } from "react-router-dom"

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
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false)

  const handleOnLoad = () => {
    setIsImageLoaded(true)
  }

  return (
    <div className="flex justify-between outline-lime-100 outline-1 text-sm gap-5 max-w-12 bg-sp-white dark:bg-sp-gray text-sp-black dark:text-white relative h-[80px] shadow-sm ">
      <Link
        to={`/character/${characterId}`}
        className="flex gap-2 absolute left-2 bg-sp-white dark:bg-sp-gray p-1 pr-5 active:opacity-80  transition-all ease-in-out duration-200 group"
      >
        <img
          src={characterImageURL}
          alt={characterName}
          className="rounded-full object-cover shadow-sm h-[50px] w-[50px] m-auto mx-2 max-w-full max-h-full transition-all ease-in-out duration-200 group-hover:scale-110"
          loading="lazy"
        />
        <div className="flex flex-col justify-between py-4">
          <p className="overflow-none whitespace-nowrap overflow-hidden font-semibold group-hover:font-bold">
            {characterName}
          </p>
          <p className="opacity-40 font-semibold group-hover:font-bold">
            {characterRole}
          </p>
        </div>
      </Link>
      {VAName || VALanguage || VAImageURL ? (
        <Link
          to={`/stuff/${VAID}`}
          className="flex gap-2 absolute right-2 bg-sp-white dark:bg-sp-gray p-1 pl-5  active:opacity-80 transition-all ease-in-out duration-200 group"
        >
          <div className="flex flex-col justify-between py-4 text-right">
            <p className="overflow-none whitespace-nowrap overflow-hidden font-semibold group-hover:font-bold">
              {VAName}
            </p>
            <p className="opacity-40 font-semibold group-hover:font-bold">
              {VALanguage}
            </p>
          </div>
          <img
            src={VAImageURL}
            alt={VAName}
            className="rounded-full object-cover shadow-sm h-[50px] w-[50px] m-auto mx-2 max-w-full max-h-full transition-all ease-in-out duration-200 group-hover:scale-110"
            loading="lazy"
            onLoad={handleOnLoad}
          />
        </Link>
      ) : (
        ""
      )}
    </div>
  )
}
export default CharacterCard
