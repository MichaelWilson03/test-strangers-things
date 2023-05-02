import { BASE_URL } from "../lib/util";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function postMessage({ post, token }) {
  //   const token = localStorage.getItem("token");
  const { postId } = useParams();
  const [content, setContent] = useState("");
  const { message, posts } = useOutletContext();

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setContent(e.target.message.value);
          setPosts([...posts]);
        }}
      >
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}
