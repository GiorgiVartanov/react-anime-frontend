import { useState } from "react"

export interface Props {
  characterName: string
  characterImageURL?: string
  characterRole: string
  VAName?: string
  VAImageURL?: string
  VALanguage?: string
}

// card that shows character and their voice actor
const CharacterCard = ({
  characterName,
  characterImageURL,
  characterRole,
  VAName,
  VAImageURL,
  VALanguage,
}: Props) => {
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false)

  const handleOnLoad = () => {
    setIsImageLoaded(true)
  }

  return (
    <div className="flex justify-between outline-lime-100 outline-1 text-sm gap-5 max-w-12 bg-sp-white dark:bg-sp-gray text-sp-black dark:text-white p-1 relative h-[80px] shadow-sm cursor-pointer active:opacity-80 hover:opacity-80 transition-all ease-in-out duration-200">
      <div className="flex gap-2 absolute left-2  bg-sp-white dark:bg-sp-gray pr-4">
        <img
          src={characterImageURL}
          alt={characterName}
          className="rounded-full object-cover shadow-sm h-[50px] w-[50px] m-auto mx-2 max-w-full max-h-full"
          loading="lazy"
        />
        <div className="flex flex-col justify-between py-4">
          <p className="overflow-none whitespace-nowrap overflow-hidden">
            {characterName}
          </p>
          <p className="opacity-40">{characterRole}</p>
        </div>
      </div>
      {VAName || VALanguage || VAImageURL ? (
        <div className="flex gap-2 absolute right-2 bg-sp-white dark:bg-sp-gray pl-4">
          <div className="flex flex-col justify-between py-4 text-right">
            <p className="overflow-none whitespace-nowrap overflow-hidden">
              {VAName}
            </p>
            <p className="opacity-40">{VALanguage}</p>
          </div>
          <img
            src={VAImageURL}
            alt={VAName}
            className="rounded-full object-cover shadow-sm h-[50px] w-[50px] m-auto mx-2 max-w-full max-h-full"
            loading="lazy"
            onLoad={handleOnLoad}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  )
}
export default CharacterCard
