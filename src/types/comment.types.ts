export type CommentType = {
  id: string
  hasLiked: "upvote" | "downvote" | null
  author: string
  text: string
  liked: number
  disliked: number
  posted: string
  wasUpdated: boolean
}
