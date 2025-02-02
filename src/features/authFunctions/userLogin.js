import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { url } from "../api";
import { message } from "antd";
import axios from "axios";

export const userLogin = createAsyncThunk(
    "user/login",
    async ({ email, password }, thunkAPI) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.post(
                `${url}/auth/admin/login`,
                { email, password },
                config
            );
            const user = data;
            const { dispatch } = thunkAPI;

            // Store token in localStorage
            localStorage.setItem("userToken", data?.accessToken);

            // Fetch user after login and update state
            await dispatch(getUser());
            message.success("Login Successful");

            return user;
        } catch (err) {
            console.error("Login Error:", err);
            message.error("Invalid Credentials");
            return thunkAPI.rejectWithValue(err.response?.data);
        }
    }
);

export const getUser = createAsyncThunk(
    "user/fetchUser",
    async (_, thunkAPI) => {
      const access = localStorage.getItem("userToken");
      if (!access) {
        localStorage.removeItem("userToken");
        localStorage.removeItem("user");
        return thunkAPI.rejectWithValue("No token");
      }
  
      try {
        const res = await fetch(`${url}/auth/verify`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
          },
        });
        const data = await res.json();
  
        if (res.status === 200) {
          // Store user data in localStorage
          localStorage.setItem("user", JSON.stringify(data));
          return data;
        } else {
          localStorage.removeItem("userToken");
          localStorage.removeItem("user");
          return thunkAPI.rejectWithValue(data);
        }
      } catch (err) {
        localStorage.removeItem("userToken");
        localStorage.removeItem("user");
        return thunkAPI.rejectWithValue(err.message);
      }
    }
  );
  

export const Expand = createAsyncThunk(
    "expand",
    async (username, thunkAPI) => {
        try {
            // configure header's Content-Type as JSON
            return username;
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);