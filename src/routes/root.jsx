import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { BASE_URL } from "../lib/util";
import { useParams } from "react-router-dom";

export default function Root() {
  const [token, setToken] = useState("");
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState([]);
  const [message, setMessage] = useState("");
  const [fromUser, setFromUser] = useState("");
  const [isAuthor, setIsAuthor] = useState(false);
  const [content, setContent] = useState("");
  const navigate = useNavigate;
  const localToken = localStorage.getItem("token");
  const { postId } = useParams();

  async function fetchPosts() {
    try {
      const response = await fetch(`${BASE_URL}/posts`);

      const info = await response.json();

      setPosts(info.data.posts);
      setMessage(info.data.message);
      console.log(setMessage);
      console.log(setPosts);
      console.log(info.data);
      console.log(info);
      return info;
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    async function myData() {
      if (localToken) {
        setToken(localToken);
        try {
          const response = await fetch(`${BASE_URL}/users/me`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localToken}`,
            },
          });
          const result = await response.json();
          if (result.success) {
            setUser(result.data);
          }
          // console.log(result);
        } catch (err) {
          console.error(err);
        }
      }
    }
    myData(token, setToken, setUser, setMessage);
  }, [token, setToken, setUser, setMessage, postId]);
  useEffect(() => {
    async function postMessage() {
      try {
        const response = await fetch(`${BASE_URL}/posts/${postId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            content: content,
            fromUser: fromUser,
          }),
        });
        const result = await response.json();
        if (result.success) {
          setPosts([...posts, result.data]);
          setContent(content);
          setFromUser(fromUser);
        }
        // console.log(result);
      } catch (err) {
        console.error(err);
      }
    }
    postMessage();
  }, [token, setFromUser, setUser, posts, postId, content]);

  useEffect(() => {
    fetchPosts();
  }, [token]);
  return (
    <div>
      <Navbar user={user} setUser={setUser} setToken={setToken} />

      <Outlet
        context={{
          isAuthor,
          setIsAuthor,
          message,
          fromUser,
          setFromUser,
          setMessage,
          posts,
          setToken,
          setUser,
          token,
          user,
          setPosts,
        }}
      />
    </div>
  );
}
