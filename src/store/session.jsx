// session.jsx
import { createSlice } from "@reduxjs/toolkit";
const API_URL = import.meta.env.VITE_API_URL;
// Slice handles user state
const sessionSlice = createSlice({
  name: "session",
  initialState: {
    user: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem("access_token");
    },
  },
});

// Export actions
export const { setUser, logout } = sessionSlice.actions;

// session.jsx
export const fetchCurrentUser = () => async (dispatch) => {
  const token = localStorage.getItem("access_token");
  if (!token) return;

  try {
    const res = await fetch(`${API_URL}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // ✅ ONLY THIS
      },
    });

    if (!res.ok) {
      console.error("JWT request failed:", res.status);
      return;
    }

    const data = await res.json();
    dispatch(setUser(data));
  } catch (err) {
    console.error("Error fetching user:", err);
  }
};


export default sessionSlice.reducer;
