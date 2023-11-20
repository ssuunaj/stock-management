import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3333/admin/";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios
        .post(`${API_URL}login`, { email, password })
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          if (err.response) {
            const { message } = err.response.data;
            throw message;
          }  
        });

      if (data.token) {
        localStorage.setItem("user", JSON.stringify(data));
      }

      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async ({ username, email, password }) => {
    await axios({
      method: "post",
      url: API_URL + "signup",
      data: {
        username,
        email,
        password,
      },
    }).then(function (response) {
      return response.data;
    });
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (rejectWithValue) => {
    try {
      await axios({
        method: "post",
        url: `${API_URL}logout`,
        headers: authHeader(),
      })
        .then((response) => {
          localStorage.removeItem("user");
          window.location.href = "/";
          return response;
        })
        .catch((error) => {
          alert(error.message);
        });
    } catch (err) {
      rejectWithValue("There was an error");
    }
  }
);
