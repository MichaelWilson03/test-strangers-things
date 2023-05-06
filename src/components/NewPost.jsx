import { useState } from "react";
import Button from "@mui/material/Button";
import { BASE_URL } from "../lib/util";
import { useOutletContext, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);
  let { method } = useParams();
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
    // } finally {
    //   window.location.reload();
    // }
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
  if (isLoadingPosts) return <div>Loading</div>;
  return (
    <>
      <div>
        <h1 className="header">Create Post</h1>
        <div className="new_post_container">
          <form onSubmit={() => setPosts([...posts])}>
            <label>Title</label>
            <input
              className="m-2 block px-2"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label>Description</label>
            <input
              className="m-2 block px-2"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label>Price</label>
            <input
              className="m-2 block px-2"
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <label>Will Deliver?</label>
            <input
              className="m-2 block px-2"
              type="checkbox"
              checked={willDeliver}
              onChange={(e) => setWillDeliver(e.target.checked)}
            />
            <Button
              onClick={makePost}
              size="large"
              variant="outlined"
              color="primary"
              type="submit"
              margin="large"
            >
              {method === "Edit" ? "Save" : "Create"}
            </Button>
            <Button size="large" variant="outlined" color="primary">
              <Link to="/posts">Back To Posts</Link>
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
