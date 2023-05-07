import { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";

export default function Posts() {
  const { posts, setPosts } = useOutletContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedPosts, setSearchedPosts] = useState([]);

  useEffect(() => {
    const filteredPosts =
      (searchTerm &&
        posts.filter((post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase())
        )) ||
      [];

    if (filteredPosts.length === 0) {
      setSearchedPosts(posts);
    } else {
      setSearchedPosts(filteredPosts);
    }
  }, [searchTerm, posts]);

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <div>
        <div className="search-input">
          <h1 className="header">Search Posts</h1>

          <input
            className="search-bar"
            type="search"
            placeholder="Search Posts"
            onChange={handleSearch}
          />
        </div>

        <h1 className="header">POSTS</h1>
        <div className="posts">
          {searchedPosts.length > 0 &&
            searchedPosts.map((post) => (
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
      </div>
    </>
  );
}
