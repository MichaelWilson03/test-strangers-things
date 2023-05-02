import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

export default function Profile() {
  const { user } = useOutletContext();
  const { userId } = useParams();
  const { postId } = useParams();

  const { posts } = useOutletContext();
  const { message } = useOutletContext();

  const isAuthor = message?.fromUser?.id === user?.id;

  useEffect(() => {
    async function getMessages() {
      try {
        const msgToMe = await Promise.resolve(
          user?.messages?.filter((message) => message.fromUser._id !== user._id)
        );
        console.log("msgToMe:", msgToMe);
        const msgFromMe = await Promise.resolve(
          user?.messages?.filter((message) => message.fromUser._id === user._id)
        );
        console.log("msgFromMe:", msgFromMe);
      } catch (error) {
        console.log(error);
      }
    }
    getMessages();
  }, [user, userId, postId, posts]);

  return (
    <div className="container">
      <h1>Welcome {user.username}!</h1>
      <br />
      <span>Your messages:</span>
      <br />
      <ul>
        {user.messages &&
          user.messages.map((message) => (
            <>
              <div>
                <div key={posts._id}>{message.content} </div>
              </div>
              <h3>From: {message.fromUser.username}</h3>
            </>
          ))}
      </ul>
    </div>
  );
}
