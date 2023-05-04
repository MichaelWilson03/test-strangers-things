import { useOutletContext } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../lib/util";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import TextField from "@mui/material/TextField";
export default function Post() {
  const { postId } = useParams();
  let token = localStorage.getItem("token");

  const { posts, message, setMessage, user, setFromUser, isLoadingPosts } =
    useOutletContext();

  const post = posts.find((p) => p._id === postId);

  async function handleMessage(e) {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/posts/${postId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: {
            content: message,
          },
        }),
      });
      const result = await response.json();
      if (result.success) {
        setMessage("");
        setFromUser([...posts, result.data.message.fromUser]);
      }
    } catch (err) {
      console.error(err);
    }
  }

  if (isLoadingPosts) return <div>Loading</div>;

  return (
    <div className="single-post">
      <h2>{post.title}</h2>
      <p>{post.description}</p>
      <h4>Price: {post.price}</h4>
      <h4>Post created by: {post.author.username}</h4>
      <span>
        {user._id && (
          <div>
            {user._id !== post.author._id && (
              <>
                <form onSubmit={handleMessage}>
                  <TextField
                    required
                    fullWidth
                    label="Title"
                    variant="outlined"
                    value={message}
                    onChange={(event) => {
                      setMessage(event.target.value);
                    }}
                  />

                  <Button
                    onChange={(e) => setMessage(e.target.value)}
                    fullWidth
                    variant="outlined"
                    color="primary"
                    type="submit"
                    margin="large"
                  >
                    Send Message
                  </Button>
                </form>
                <h2 className="messages">Messages You've Sent:</h2>
              </>
            )}

            {user._id === post.author._id && (
              <form onSubmit={handleMessage}>
                <TextField
                  required
                  fullWidth
                  label="Title"
                  variant="outlined"
                  value={message}
                  onChange={(event) => {
                    setMessage(event.target.value);
                  }}
                />
                <ButtonGroup
                  onChange={(e) => setMessage(e.target.value)}
                  variant="outlined"
                  color="primary"
                  type="submit"
                  margin="large"
                >
                  <Button>Edit Your Post</Button>
                  <Button>Delete Your Post</Button>
                </ButtonGroup>
              </form>
            )}
            <div>
              {user._id === post.author._id ||
                (post.messages.length > 0 &&
                  post.messages.map((msg) => (
                    <div key={msg._id}>
                      <h2>Message: {msg.content}</h2>
                      <h3>From: {msg.fromUser.username}</h3>
                    </div>
                  )))}
            </div>
          </div>
        )}
      </span>
    </div>
  );
}
