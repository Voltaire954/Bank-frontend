import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  fetchCurrentUser,
  setUser,
  logout,
} from "../store/session";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const API_URL = import.meta.env.VITE_API_URL;

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // --------------------------------------------------------------
  // Helper – safe JSON fetch (avoids “Unexpected token '<'” errors)
  // --------------------------------------------------------------
  const safeJsonFetch = async (url: string, opts: RequestInit) => {
    const resp = await fetch(url, opts);
    const text = await resp.text();

    // If the server sent HTML (most likely a 500 page) we abort early
    if (text.trim().startsWith("<")) {
      const err = new Error("Server returned an HTML error page");
      // Attach the raw text for debugging
      (err as any).body = text;
      throw err;
    }

    // If the response isn’t ok, try to extract a JSON error object
    if (!resp.ok) {
      const errJson = JSON.parse(text);
      const errMsg = errJson.error || "Login failed";
      const errObj = new Error(errMsg) as any;
      errObj.status = resp.status;
      errObj.body = text;
      throw errObj;
    }

    // Otherwise we have a valid JSON payload
    return resp.json();
  };

  // --------------------------------------------------------------
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await safeJsonFetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: email, // backend expects the key `username`
          password,
        }),
      });

      // ---- SUCCESS ------------------------------------------------
      // 1️⃣ Save the access token
      localStorage.setItem("access_token", data.access_token);

      // 2️⃣ Store the user in Redux (or any global state you use)
      dispatch(setUser(data.user));

      // 3️⃣ Navigate to the protected area
      navigate("/user");
    } catch (err: any) {
      // ---- FAILURE ------------------------------------------------
      console.error("Login error:", err);
      const msg = err.body || err.message || "Login failed";
      alert(msg);
    }
  };

  // --------------------------------------------------------------
  return (
    <>
      {/* …your nav‑list etc… */}
      <div className="image">
        <form className="sign-up" onSubmit={handleLogin}>
          Welcome
          <TextField
            required
            id="email"
            label="Email"
            variant="standard"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            required
            id="password"
            label="Password"
            type="password"
            variant="standard"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 2, backgroundColor: "deeporange[700]" }}
          >
            Sign in
          </Button>
        </form>
      </div>
    </>
  );
}
