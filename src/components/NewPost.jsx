import { useState } from "react";
import Button from "@mui/material/Button";
import { BASE_URL } from "../lib/util";
import {
  useNavigate,
  useOutletContext,
  useParams,
  Link,
} from "react-router-dom";
import { useEffect } from "react";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);
  let { method } = useParams();
  const navigate = useNavigate();

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
      console.log(result);
      if (!result.success) {
        console.log(result.error.message);
        return;
      }
      navigate("/posts");
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {}), [];
  return (
    <>
      <div>
        <h1 className="header">Create Post</h1>
        <div className="new_post_container">
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
