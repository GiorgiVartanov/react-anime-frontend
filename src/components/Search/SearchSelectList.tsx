import { useSearchStore } from "../../store/searchStore"

import Select from "./Select"

// renders search sorting types
const SearchSelectList = () => {
  const [
    sort,
    sortOptions,
    changeSorting,
    types,
    typesOptions,
    orderBy,
    orderByOptions,
  ] = useSearchStore((state) => [
    state.sort,
    state.sortOptions,
    state.changeSorting,
    state.types,
    state.typesOptions,
    state.orderBy,
    state.orderByOptions,
  ])

  return (
    <div>
      <Select
        selected={sort}
        options={sortOptions}
        select={changeSorting}
      />
    </div>
  )
}
export default SearchSelectList
