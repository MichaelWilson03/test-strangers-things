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
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const navigate = useNavigate;
  const localToken = localStorage.getItem("token");
  const { postId } = useParams();


  useEffect(() => {
    async function fetchPosts() {
      try {
        setIsLoadingPosts(true);
        const response = await fetch(`${BASE_URL}/posts`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localToken}`,
          }
        });
        const info = await response.json();
  
        setPosts(info.data.posts);
       
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoadingPosts(false);
      }
    }
    fetchPosts();
  }, [token]);

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
        } catch (err) {
          console.error(err);
        }
      }
    }
    myData(token, setToken, setUser, setMessage);
  }, [token, setToken, setUser, setMessage, postId]);

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
          isLoadingPosts
        }}
      />
    </div>
  );
}
