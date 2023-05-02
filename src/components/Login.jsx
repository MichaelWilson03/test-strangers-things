import { useState } from "react";
import { BASE_URL } from "../lib/util";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const object = useOutletContext();
  const setToken = object.setToken;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            username: username,
            password: password,
          },
        }),
      });
      const result = await response.json();
      //   console.log(result);
      if (!result.success) {
        setError(result.error.message);
        return;
      }
      setToken(result.data.token);
      localStorage.setItem("token", result.data.token);
      navigate("/");
    } catch (error) {
      //   console.log(error);
    }
  }
  return (
    <>
      <h1 className="header">LOGIN</h1>
      <div className="login_container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="">Enter Username</label>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <br />
          <label htmlFor="">Enter Password</label>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button className="btn" type="submit">
            Login
          </button>
        </form>
        <p>{error}</p>
      </div>
    </>
  );
}
