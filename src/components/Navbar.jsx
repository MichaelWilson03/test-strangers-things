import { Link } from "react-router-dom";

export default function Navbar({ user, setUser, setToken }) {
  let username = user.username;
  if (user._id) console.log(user);
  console.log(username);
  function handleLogout() {
    // console.log("logging out");
    localStorage.removeItem("token");
    setToken("");
    setUser({});
  }
  return (
    <div className="navbar">
      <span id="logo">Stranger's Things!</span>
      <div id="pages">
        <Link to={"/"}>Home</Link>
        <Link to={"/posts"}>Posts</Link>
        <Link to={"/profile"}>Profile</Link>
        {user._id && (
          <>
            <Link onClick={handleLogout} to={"/"}>
              Logout
            </Link>
            <span id="welcome_user">Welcome {username}!</span>
          </>
        )}

        {!user._id && (
          <>
            <Link to={"/login"}>Login</Link>
            <Link to={"/register"}>Register</Link>
          </>
        )}
      </div>
    </div>
  );
}
