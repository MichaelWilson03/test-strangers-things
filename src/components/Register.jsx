import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { BASE_URL } from "../lib/util";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setToken } = useOutletContext();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            username: username,
            password: password,
            confirmPassword: confirmPassword,
          },
        }),
      });
      const result = await response.json();
      // console.log(result);
      if (!result.success) {
        setError(result.error.message);
        return;
      }

      setToken(result.data.token);
      localStorage.setItem("token", result.data.token);
      navigate("/");
    } catch (error) {
      // console.log(error);
    }
  }

  return (
    <>
      <h1 className="header">REGISTER</h1>
      <div className="register_container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="">Enter New Username</label>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <br />
          <label htmlFor="">Enter New Password</label>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <br />
          <label htmlFor="">Re-Type Password</label>
          <input
            type="password"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <br />
          <button className="btn" type="submit">
            Register
          </button>
        </form>
        <p>{error}</p>
      </div>
    </>
  );
}
