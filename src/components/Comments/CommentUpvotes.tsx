import Button from "../UI/Button"
import { ReactComponent as Upvote } from "../../assets/icons/upvote.svg"

interface Props {
  handleLike: () => void
  handleDislike: () => void
  hasLiked: "upvote" | "downvote" | null
  amount: number
  canVote: boolean
  liked: boolean
}

// renders upvote/like downvote/dislike
const CommentUpvotes = ({
  handleLike,
  handleDislike,
  hasLiked,
  amount,
}: Props) => {
  return (
    <div className="flex flex-col">
      <Button
        onClick={handleLike}
        className={`bg-transparent ${hasLiked === "downvote" ? "" : ""}`}
      >
        <Upvote
          fill={`${hasLiked === "upvote" ? "#e91e63" : ""}`}
          width="32"
          height="32"
          className="text-sp-main"
        />
      </Button>
      <p className={`text-center text-sm text-sp-light font-bold`}>{amount}</p>
      <Button
        onClick={handleDislike}
        className={`bg-transparent ${hasLiked === "downvote" ? "" : ""}`}
      >
        <Upvote
          className="rotate-180"
          fill={`${hasLiked === "downvote" ? "#1e9fe9" : ""}`}
          width="32"
          height="32"
        />
      </Button>
    </div>
  )
}
export default CommentUpvotes
