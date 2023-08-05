import { useSearchStore } from "../../store/searchStore"

import Select from "./Select"

// renders search sorting types
const SearchSelectList = () => {
  const [
    sort,
    sortOptions,
    changeSorting,
    changeOrdering,
    types,
    typesOptions,
    orderBy,
    orderByOptions,
    status,
    statusOptions,
    changeStatus,
    rating,
    ratingOptions,
    changeRating,
  ] = useSearchStore((state) => [
    state.sort,
    state.sortOptions,
    state.changeSorting,
    state.changeOrdering,
    state.types,
    state.typesOptions,
    state.orderBy,
    state.orderByOptions,
    state.status,
    state.statusOptions,
    state.changeStatus,
    state.rating,
    state.ratingOptions,
    state.changeRating,
  ])

  return (
    <div className="flex gap-2 mt-4">
      <Select
        selected={sort}
        options={sortOptions}
        select={changeSorting}
      />
      <Select
        selected={orderBy}
        options={orderByOptions}
        select={changeOrdering}
      />
      <Select
        selected={status}
        options={statusOptions}
        select={changeStatus}
      />
      <Select
        selected={rating}
        options={ratingOptions}
        select={changeRating}
      />
    </div>
  )
}
export default SearchSelectList
