import { useOutletContext, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../lib/util";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export default function Post() {
  let { method } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);

  const { postId } = useParams();

  let token = localStorage.getItem("token");
  let navigate = useNavigate();

  const {
    posts,
    message,
    setMessage,
    user,
    setFromUser,
    isLoadingPosts,
    setPosts,
  } = useOutletContext();

  const post = posts.find((p) => p._id === postId);
  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/posts/${postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          post: {
            title: title,
            description: description,
            price: price,
            willDeliver: willDeliver,
          },
        }),
      });
      const result = await response.json();
      console.log(result);
      if (result.success) {
        setPosts([...posts], {
          ...post,
          title,
          description,
          price,
          willDeliver,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deletePost = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      console.log(result);
      if (result.success === true) {
        // setDeleted(true);
        // setPosts(newPosts);
        setPosts([...posts]);
        navigate("/posts");
      }
      if (!result.success) {
        console.log(result.error.message);

        return;
      }
      // navigate("/posts");
    } catch (err) {
      console.error(err);
    }
  };

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
                    label="Your Message"
                    variant="outlined"
                    value={message}
                    onChange={(event) => {
                      setMessage(event.target.value);
                    }}
                  />
                  <br />

                  <Button
                    onChange={(e) => setMessage(e.target.value)}
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
              <div>
                <form>
                  <label>Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label>Description</label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <label>Price</label>
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <label>Will Deliver?</label>
                  <input
                    type="checkbox"
                    checked={willDeliver}
                    onChange={(e) => setWillDeliver(e.target.checked)}
                  />
                  <Button
                    onClick={handleUpdate}
                    size="large"
                    variant="outlined"
                    color="primary"
                    type="submit"
                    margin="large"
                  >
                    {method === "Edit" ? "Save" : "Edit Post"}
                  </Button>
                </form>
                <Button
                  onChange={(e) => setPosts(e.target.value)}
                  onClick={() => deletePost(post._id)}
                  variant="outlined"
                  color="primary"
                  type="submit"
                  margin="large"
                >
                  Delete Post
                </Button>
              </div>
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
