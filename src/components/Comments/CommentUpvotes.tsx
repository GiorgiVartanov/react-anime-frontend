import { useState } from "react"

import { ReactComponent as Upvote } from "../../assets/icons/upvote.svg"
import Button from "../UI/Button"

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
  const [isVoteDisabled, setIsVoteDisabled] = useState<boolean>(false)

  const handleOnUpvote = () => {
    if (isVoteDisabled) return

    setIsVoteDisabled(true)

    handleLike()

    setTimeout(() => {
      setIsVoteDisabled(false)
    }, 200)
  }

  const handleOnDownvote = () => {
    if (isVoteDisabled) return

    setIsVoteDisabled(true)

    handleDislike()

    setTimeout(() => {
      setIsVoteDisabled(false)
    }, 200)
  }

  return (
    <div className="flex flex-col">
      <Button
        onClick={handleOnUpvote}
        className={`bg-transparent ${hasLiked === "downvote" ? "" : ""}`}
        // disabled={isVoteDisabled}
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
        onClick={handleOnDownvote}
        className={`bg-transparent ${hasLiked === "downvote" ? "" : ""}`}
        // disabled={isVoteDisabled}
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
