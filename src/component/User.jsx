import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser, logout } from "../store/session";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function User() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.session);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  if (loading) return <h2>Loading user...</h2>;
  if (error) return <h2>Error: {error}</h2>;
  if (!user) return <h2>No user found.</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome, {user.name}</h1>

      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Date of Birth:</strong> {user.dob}
      </p>
      <p>
        <strong>Job:</strong> {user.job || "N/A"}
      </p>

      <hr />

      {/* ===== ACCOUNT INFO CARD ===== */}
      <h2>Account Info</h2>

      <Card sx={{ minWidth: 275, mb: 2 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Accounts Summary
          </Typography>

          <Typography variant="h5" component="div">
            Total Accounts: {user.accounts?.length || 0}
          </Typography>
        </CardContent>

        <CardActions>
          <Link to="/Accounts" size="small">View Accounts</Link>
        </CardActions>
      </Card>

      {/* ===== TRANSACTIONS CARD ===== */}
      <h2>Transactions</h2>
      <Card sx={{ minWidth: 275, mb: 2 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Transactions Summary
          </Typography>

          <Typography  variant="h5" component="div">
            Total Transactions: {user.transactions?.length || 0}
          </Typography>
        </CardContent>

        <CardActions>
          <Link to="/transaction" size="small">View Transactions</Link>
        </CardActions>
      </Card>

      {/* ===== LOGOUT BUTTON ===== */}
      <button
        onClick={() => dispatch(logout())}
        style={{ marginTop: "20px", padding: "10px 20px" }}
      >
        Logout
      </button>
    </div>
  );
}
