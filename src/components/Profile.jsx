import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

export default function Profile() {
  const { user } = useOutletContext();
  const { userId } = useParams();
  const { postId } = useParams();

  const { posts } = useOutletContext();
  // const { message } = useOutletContext();

  const msgsToMe = user?.messages?.filter(
    (message) => message.fromUser._id !== user._id
  );
  const msgFromMe = user?.messages?.filter(
    (message) => message.fromUser._id === user._id
  );

  return (
    <div className="container">
      <h1>Welcome {user.username}!</h1>
      <br /> <h2>Your Messages:</h2>
      <br />
      <ul>
        {user._id &&
          msgsToMe.map((message) => (
            <>
              <div>
                <div className="message" key={posts._id}>
                  {message.content}{" "}
                </div>
              </div>
              <h3>From: {message.fromUser.username}</h3>
            </>
          ))}
      </ul>
      <h2>Messages Sent:</h2>
      <br />
      <ul>
        {user._id &&
          msgFromMe.map((message) => (
            // user.messages.map((message) => (
            <>
              <div>
                <div className="message" key={posts._id}>
                  {message.content}{" "}
                </div>
              </div>
              <h3>From: {message.fromUser.username}</h3>
            </>
          ))}
      </ul>
    </div>
  );
}
