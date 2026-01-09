import { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { ROUTES } from "../routes/routes";
import { registerUser, type IUser } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  type RegisterFormData,
} from "../validations/registerSchema";

import InputComponent from "../components/reusable/input";
import ButtonComponent from "../components/reusable/button";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setError("");

    const result = await registerUser<IUser>(data?.username, data.password);
    if (!result.status) {
      setError(result.message || "Unknown error");
      return;
    }

    toast.success("Registration successful");
    setTimeout(() => {
      navigate(ROUTES.LOGIN);
    }, 1000);
  };

  return (
    <div className="max-w-sm mx-auto mt-10 border border-gray-400 p-12 rounded-xl">
      <h1 className="text-xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className="flex flex-col gap-4">
          <InputComponent
            label="Username"
            placeholder="Username"
            {...register("username")}
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}

          <InputComponent
            type="password"
            label="Password"
            placeholder="Password"
            {...register("password")}
            autoComplete="new-password"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          <InputComponent
            type="password"
            label="Confirm Password"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}

          {error && <p className="text-red-600 mb-2">{error}</p>}

          <ButtonComponent
            disabled={isSubmitting}
            type="submit"
            text="Register"
          />

          <div>
            <span>Already have an account? </span>
            <Link to={ROUTES.LOGIN} className="text-blue-600">
              Login here
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
