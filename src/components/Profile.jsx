import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

export default function Profile() {
  const { user } = useOutletContext();

  const { posts } = useOutletContext();

  const msgsToMe = user?.messages?.filter(
    (message) => message.fromUser._id !== user._id
  );
  const msgFromMe = user?.messages?.filter(
    (message) => message.fromUser._id === user._id
  );

  return (
    <>
      {user._id && (
        <div className="container">
          <h1>Welcome {user.username}!</h1>
          <br /> <h2>Your Messages:</h2>
          <br />
          <ul key={user}>
            {user._id &&
              msgsToMe.map((message) => (
                <div key={message._id}>
                  <div>
                    <div className="message" key={posts._id}>
                      <span className="post_title">Regarding: </span>
                      <br />
                      {message.content}
                    </div>
                  </div>
                  <h3>From: {message.fromUser.username}</h3>
                </div>
              ))}
          </ul>
          <h2>Messages Sent:</h2>
          <br />
          <ul key={msgFromMe}>
            {user._id &&
              msgFromMe.map((message) => (
                // user.messages.map((message) => (
                <div key={posts._id}>
                  <div>
                    <div className="message">{message.content} </div>
                  </div>
                  <h3>From: {message.fromUser.username}</h3>
                </div>
              ))}
          </ul>
        </div>
      )}
      <div key={!user._id}>
        <br />
        {!user._id && (
          <>
            <h1>Welcome to Stranger's Things!</h1>
            <div className="new_user">
              <br />
              <Link
                to={"/login"}
                style={{ color: "blue", textDecoration: "none" }}
              >
                Login
              </Link>
              <Link
                to={"/register"}
                style={{ color: "blue", textDecoration: "none" }}
              >
                Register
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
