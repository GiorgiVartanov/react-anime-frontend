import Friend from "./Friend"

interface Props {
  friends: string[]
}

const FriendList = ({ friends }: Props) => {
  if (!friends || friends.length <= 0) return <></>

  return (
    <div>
      {friends.length > 0 ? (
        <div className="flex gap-3 mt-2 mb-4">
          {friends.map((friend) => (
            <Friend
              key={friend}
              username={friend}
            />
          ))}
        </div>
      ) : (
        "you don't have any friends"
      )}
    </div>
  )
}
export default FriendList
