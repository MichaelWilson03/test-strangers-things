import { Link } from "react-router-dom";
export default function Welcome() {
  const token = localStorage.getItem("token");

  return (
    <div className="home_page">
      <h1>Welcome To Stranger's Things!</h1>
      {!token && (
        <>
          <div className="new_user">
            <Link to="/login" style={{ color: "blue", textDecoration: "none" }}>
              Login
            </Link>
            <Link
              to="/register"
              style={{ color: "blue", textDecoration: "none" }}
            >
              Register
            </Link>
          </div>
        </>
      )}
      {token && (
        <>
          <div className="profile_page">
            <Link
              to="/profile"
              style={{ color: "blue", textDecoration: "none" }}
            >
              View Profile
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
