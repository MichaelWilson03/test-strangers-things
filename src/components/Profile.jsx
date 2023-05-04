import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

export default function Profile() {
  const { user } = useOutletContext();
  const { userId } = useParams();
  const { postId } = useParams();

  const { posts } = useOutletContext();
  let token = localStorage.getItem("token");
  // const { message } = useOutletContext();

  const msgsToMe = user?.messages?.filter(
    (message) => message.fromUser._id !== user._id
  );
  const msgFromMe = user?.messages?.filter(
    (message) => message.fromUser._id === user._id
  );

  return (
    <>
      {token && (
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
                      <span className="post_title">Regarding: </span>
                      <br />
                      {message.content}
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
      )}
      <div>
        <h1 className="home_page">Welcome To Stranger's Things!</h1>
        <br />
        {!token && (
          <>
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
