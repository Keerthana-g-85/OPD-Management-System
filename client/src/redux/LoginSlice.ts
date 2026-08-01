import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
const token = localStorage.getItem("token");

const initialState = {
  token: token,
  user: token ? jwtDecode(token) : null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    addToken: (state, action) => {
      return {
        ...state,
        token: action.payload,
      };
    },
  },
});

export const { addToken } = loginSlice.actions;

export default loginSlice.reducer;
