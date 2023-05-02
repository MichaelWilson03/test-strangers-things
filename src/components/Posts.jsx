import { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";

export default function Posts() {
  const { posts, setPosts } = useOutletContext();
  const localToken = localStorage.getItem("token");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredPosts =
      searchTerm &&
      posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

    setPosts(filteredPosts || posts);
    if (filteredPosts === "") {
      setPosts(posts);
      setSearchTerm("");
    }
  }, [searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    if (setPosts === "") {
      setPosts(posts);
    }
  };

  return (
    <>
      <h1 className="header">POSTS</h1>

      {localToken && (
        <Link to={`/new-post`}>
          <h3 className="new_post_link"> Create New Post</h3>
        </Link>
      )}
      <h1>Search Posts</h1>
      <form>
        <input
          type="search"
          placeholder="Search Posts"
          onChange={handleSearch}
        />
      </form>
      <div className="posts">
        {posts.length > 0 &&
          posts.map((post) => (
            <div key={post._id}>
              <Link to={`/posts/${post._id}`}>
                <h2>{post.title}</h2>
              </Link>
              <h3>{post.description}</h3>
              <h4>{post.price}</h4>
              <h4>Post created by: {post.author.username}</h4>
            </div>
          ))}
      </div>
    </>
  );
}
