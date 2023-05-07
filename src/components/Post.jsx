import { useOutletContext, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../lib/util";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";

export default function Post() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);

  const { postId } = useParams();

  let token = localStorage.getItem("token");

  const {
    posts,
    message,
    setMessage,
    user,
    setFromUser,
    isLoadingPosts,
    setPosts,
    setIsLoadingPosts,
  } = useOutletContext();

  let post = posts.find((p) => p._id === postId);
  useEffect(() => {
    post = posts.find((p) => p._id === postId);
  }, [posts]);

  async function fetchPosts() {
    try {
      setIsLoadingPosts(true);
      const response = await fetch(`${BASE_URL}/posts`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const info = await response.json();
      {
        setPosts(info.data.posts);
        setIsLoadingPosts(false);
      }
    } catch (err) {
      console.log(err);
    }
  }
  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      setIsLoadingPosts(true);
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
        fetchPosts();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingPosts(false);
    }
  };

  const deletePost = async () => {
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
      if (result.success) {
        // setDeleted(true);
        // setPosts(newPosts);
        setPosts([...posts]);
        fetchPosts();
      }
      if (!result.success) {
        console.log(result.error.message);

        return;
      }
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
        fetchPosts();
      }
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    post = posts.find((p) => p._id === postId);
  }, [posts]);

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
                  <div>
                    <TextField
                      required
                      label="Your Message"
                      variant="outlined"
                      value={message}
                      onChange={(event) => {
                        setMessage(event.target.value);
                      }}
                    />
                  </div>
                  <br />
                  <div>
                    <Button
                      onSubmit={handleMessage}
                      onChange={(e) => setMessage(e.target.value)}
                      variant="outlined"
                      color="primary"
                      type="submit"
                      margin="large"
                    >
                      Send Message
                    </Button>
                  </div>
                </form>
                <h2 className="messages">Messages You've Sent:</h2>
              </>
            )}

            {user._id === post.author._id && (
              <div>
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "25ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <FormGroup>
                    <div>
                      <TextField
                        required
                        id="outlined-required"
                        label="Title Required"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <br />
                      <TextField
                        required
                        id="outlined-required"
                        label="Description Required"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                      <br />
                      <TextField
                        required
                        id="outlined-required"
                        label=" Price $"
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                      <br />
                      <label className="check-box-text">Will Deliver?</label>
                      <input
                        className="checkbox"
                        type="checkbox"
                        checked={willDeliver}
                        onChange={(e) => setWillDeliver(e.target.checked)}
                      />
                      <br />
                      <div className="form-buttons">
                        <div className="edit-button">
                          <Button
                            onClick={handleUpdate}
                            variant="outlined"
                            color="primary"
                            type="submit"
                            margin="large"
                          >
                            {"Edit" ? "Save" : "Edit Post"}
                          </Button>
                        </div>
                        <div className="delete-button">
                          <Button
                            onChange={(e) => setPosts(e.target.value)}
                            onClick={() => deletePost(post._id)}
                            variant="outlined"
                            color="primary"
                            type="submit"
                            margin="large"
                          >
                            <Link to="/posts">
                              {"Edit" ? "Delete Post" : "Delete Post"}
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </FormGroup>
                </Box>
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
