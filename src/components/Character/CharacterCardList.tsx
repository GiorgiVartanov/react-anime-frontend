import { useState } from "react"

import { CharacterDetails, VoiceActor } from "../../types/character.types"

import CharacterCard from "./CharacterCard"

interface Props {
  data: CharacterDetails[]
}

// list of CharacterCard components
const CharacterCardList = ({ data }: Props) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("Japanese")

  const languages = [
    ...new Set(
      data[0]?.voice_actors?.map(
        (voiceActor: VoiceActor) => voiceActor.language
      )
    ),
  ] // getting only unique languages from the first voice actor, for example, if show was dubbed more than 1 times on spanish it will only show first one

  const handleVALanguageSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value)
  }

  return (
    <div>
      <select
        name=""
        id=""
        className="w-full bold text-sp-black px-3 py-1 mb-3"
        defaultValue={selectedLanguage}
        onChange={handleVALanguageSelect}
      >
        {languages?.map((language) => (
          <option
            key={language}
            value={language}
          >
            {language}
          </option>
        ))}
      </select>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {data.map((item) => {
          const voiceActorToRender = item.voice_actors?.filter(
            (voiceActor) => voiceActor.language === selectedLanguage
          )[0]

          return (
            <CharacterCard
              key={item.character.mal_id}
              characterImageURL={
                item.character.images.webp?.image_url ||
                item.character.images.jpg?.image_url
              }
              characterName={item.character.name}
              characterRole={item.role}
              VAName={voiceActorToRender?.person.name}
              VAImageURL={
                voiceActorToRender?.person.images.webp?.image_url ||
                voiceActorToRender?.person.images.jpg?.image_url
              }
              VALanguage={voiceActorToRender?.language}
            />
          )
        })}
      </div>
    </div>
  )
}
export default CharacterCardList
