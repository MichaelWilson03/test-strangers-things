import { useState } from "react";
import Button from "@mui/material/Button";
import { BASE_URL } from "../lib/util";
import { useOutletContext, useParams } from "react-router-dom";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);
  let { method } = useParams();

  const { posts, setPosts } = useOutletContext();

  async function makePost(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
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
      }
      // navigate("/posts");
    } catch (err) {
      console.error(err);
    }
  }

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
          </form>
        </div>
      </div>
    </>
  );
}
