import { useSearchStore } from "../../store/searchStore"

import Genre from "./Genre"

interface Props {
  genres: { mal_id: number; name: string }[]
  className?: string
}

// renders list of genres
const GenreList = ({ genres, className }: Props) => {
  // gets data from store
  const [selectedGenres, selectGenre, unSelectGenre] = useSearchStore(
    (state) => [state.selectedGenres, state.selectGenre, state.unSelectGenre]
  )

  return (
    <div className={`flex flex-row flex-wrap ${className}`}>
      {genres.map((genre) => (
        <Genre
          key={genre.mal_id}
          genre={genre.name}
          onGenreSelect={() => {
            selectGenre(genre.mal_id)
          }}
          onGenreUnSelect={() => {
            unSelectGenre(genre.mal_id)
          }}
          isSelected={
            selectedGenres.filter(
              (selectedGenre: number) => selectedGenre === genre.mal_id
            ).length > 0
          }
        />
      ))}
    </div>
  )
}
export default GenreList
