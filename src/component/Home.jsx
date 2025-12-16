import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCurrentUser, logout, setUser } from "../store/session.jsx";

const API_URL = import.meta.env.VITE_API_URL;

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: email, // backend expects username
          password: password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Login failed");
        return;
      }

      // 1. Save token
      localStorage.setItem("access_token", data.access_token);

      // 2. Fetch user using Redux
      dispatch(setUser(data.user)); // works now
      navigate("/user");

      // 3. Redirect to /user page
      navigate("/user");
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <>
      <ul className="options-List">
        <li className="buisness">Buisness</li>
        <li className="credit">Credit Cards</li>
        <li className="checking">Checking</li>
        <li className="travel">Travel</li>
        <li className="saving">Savings</li>
        <li className="loans">Home Loans</li>
      </ul>
      <div className="image">
        <form className="sign-up">
          Welcome
          <TextField
            required
            id="email"
            label="Email"
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            required
            id="password"
            label="Password"
            type="password"
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            onClick={handleClick}
            style={{ marginTop: "20px", backgroundColor: "deeporange[700]" }}
            variant="contained"
          >
            Sign in
          </Button>
        </form>
      </div>
    </>
  );
}
