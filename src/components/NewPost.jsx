import { useState } from "react";
import Button from "@mui/material/Button";
import { BASE_URL } from "../lib/util";
import { useOutletContext, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);
  const { postId } = useParams();
  const { posts, setPosts, setIsLoadingPosts, isLoadingPosts } =
    useOutletContext();
  const token = localStorage.getItem("token");
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
  async function makePost(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
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
      if (!result.success) {
        console.log(result.error.message);
      }
      if (result.success) {
        setTitle("");
        setDescription("");
        setPrice("");
        setWillDeliver(false);
        fetchPosts();
      }
      // navigate("/posts");
    } catch (err) {
      console.error(err);
    }
  }
  function handleBack(e) {
    e.preventDefault();
    navigate("/posts");
  }
  if (isLoadingPosts) return <div>Loading</div>;
  return (
    <>
      <div>
        <h1 className="header">Create Post</h1>
        <div className="new_post_container">
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
                      onClick={makePost}
                      variant="outlined"
                      color="primary"
                      type="submit"
                      margin="large"
                    >
                      <Link to="/posts">{"Create Post"}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </FormGroup>
          </Box>
        </div>
      </div>
    </>
  );
}
