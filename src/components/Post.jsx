import { useOutletContext } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../lib/util";
export default function Post() {
  const { postId } = useParams();
  let token = localStorage.getItem("token");
  
  const {
    posts,
    message,
    setMessage,
    user,
    setFromUser,
    isLoadingPosts
  } = useOutletContext();

  const post = posts.find((p) => p._id === postId);
  // const postMessages = user?.messages?.filter(p => p.post._id === postId);

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
            content: message
          }
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

  if(isLoadingPosts)return (
    <div>
      Loading
    </div>
  )
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.description}</p>
      <h4>Price: {post.price}</h4>
      <h4>Post created by: {post.author.username}</h4>

      <div>
        {user._id !== post.author._id && (
          <form onSubmit={handleMessage}>
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
            <button type="submit">Send Message</button>
          </form>
        )}

        {user._id === post.author._id && (
          <form onSubmit={handleMessage}>
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
            <button type="submit">Edit</button>
          </form>
        )}
      </div>

      <div>
          {post.messages.length > 0 && 
          post.messages.map((msg) => (
            <div key={msg._id}>
              <h2>{msg.content}</h2>
              <h4>{msg.fromUser.username}</h4>
            </div>
          ))}
      </div>
    </div>
  );
}
