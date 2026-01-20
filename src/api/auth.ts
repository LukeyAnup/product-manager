import type { CartItem } from "./cartApi";
import { AppError } from "../utils/appError";
import type { FavouriteItem } from "./favouritesApi";
import { responseHandler, type Response } from "../utils/responseHandler";

const API_URL = import.meta.env.VITE_API_URL;

export type IUser = {
  id: string;
  username: string;
  password: string;
  cart?: CartItem[];
  favourites?: FavouriteItem[];
};

export const registerUser = async <T>(
  username: string,
  password: string,
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
      body: JSON.stringify({
        username,
        password,
        cart: [],
        favourites: [],
        orders: [],
      }),
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
  password: string,
): Promise<Response<T>> => {
  return responseHandler(async () => {
    const response = await fetch(
      `${API_URL}?username=${encodeURIComponent(username)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new AppError("Login failed. Please try again later.");
    }

    const users = await response.json();

    if (!Array.isArray(users) || users.length === 0) {
      throw new AppError("Invalid credentials");
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = users.find((u: any) => u.password === password);
    localStorage.setItem("user", JSON.stringify(user));

    if (!user) {
      throw new AppError("Invalid credentials");
    }

    return {
      data: user as T,
      statusCode: 200,
      message: "User Logged in Successfully.",
    };
  });
};

export const logoutApi = () => {
  localStorage.removeItem("loggedInUser");
  localStorage.removeItem("user");
  return {
    success: true,
    message: "Logged out successfully",
  };
};
