import { useState } from "react";
import { type IUser, login } from "../api/auth";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { ROUTES } from "../routes/routes";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validations/loginSchema";
import type { LoginFormData } from "../validations/loginSchema";

import InputComponent from "../components/reusable/input";
import ButtonComponent from "../components/reusable/button";

/**
 *
 */
export default function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (data: LoginFormData) => {
    setError("");

    const result = await login<IUser[]>(data.username, data.password);
    if (!result.status) {
      setError(result.message || "Unknown Error");
      return;
    }

    toast.success("Login successful.");
    localStorage.setItem("loggedInUser", result?.data?.[0].username ?? "");
    setTimeout(() => {
      navigate(ROUTES.HOME, { replace: true });
    }, 1000);
  };

  return (
    <div className="max-w-sm mx-auto mt-10 border border-gray-400 p-12 rounded-xl">
      <h1 className="text-xl font-bold mb-4">Login</h1>

      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className="flex flex-col gap-2">
          <InputComponent
            label="Username"
            {...register("username")}
            placeholder="Username"
            sx={{
              marginTop: 0,
              marginBottom: 0,
            }}
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}

          <InputComponent
            label="Password"
            {...register("password")}
            type="password"
            placeholder="Password"
            autoComplete="new-password"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          {error && <p className="text-red-600 mb-2">{error}</p>}
          <ButtonComponent disabled={isSubmitting} type="submit" text="Login" />

          <div>
            <span>Don't have an account yet? </span>
            <Link to={ROUTES.REGISTER} className="text-blue-600">
              Register here
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
