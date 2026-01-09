import { AppError } from "../utils/appError";
import { responseHandler, type Response } from "../utils/responseHandler";

const API_URL = import.meta.env.VITE_API_URL;

export type IUser = {
  username: string;
  password: string;
};

export const registerUser = async <T>(
  username: string,
  password: string
): Promise<Response<T>> => {
  return responseHandler(async () => {
    const usernameCheck = await fetch(`${API_URL}?username=${username}`);
    const existingUsername = await usernameCheck.json();

    if (existingUsername.length > 0) {
      throw new AppError("Username already exists");
    }
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new AppError("Registration failed. Please try again.");
    }

    const data: T = await response.json();
    return {
      data,
      statusCode: 200,
      message: "User Registered Scuessfully",
    };
  });
};

export const login = async <T>(
  username: string,
  password: string
): Promise<Response<T>> => {
  return responseHandler(async () => {
    const response = await fetch(
      `${API_URL}?username=${username}&password=${password}`
    );

    if (!response.ok) {
      throw new AppError("Login failed. Please try again later.");
    }

    const data = await response.json();
    if (data.length === 0) {
      throw new AppError("Invalid credentials");
    }

    return {
      data,
      statusCode: 200,
      message: "User Logged in Successfully.",
    };
  });
};

export const logout = () => {
  localStorage.removeItem("loggedInUser");
  return {
    success: true,
    message: "Logged out successfully",
  };
};
