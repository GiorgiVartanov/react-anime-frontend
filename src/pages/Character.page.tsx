import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import apiAjax from "../service/APIAjax"

const Character = () => {
  const { id } = useParams()

  return <div className="mx-auto max-w-7xl w-full p-2 h-full">{id}</div>
}
export default Character
