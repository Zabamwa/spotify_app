import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("spotify_access_token", action.payload);
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("spotify_access_token");
    },
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
