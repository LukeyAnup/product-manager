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
import { useAuth } from "../context/authContext";
import Loader from "../components/loader";
import { useTranslation } from "react-i18next";

/**
 *
 */
export default function LoginPage() {
  const { loading, login: loginContext } = useAuth();
  const { t } = useTranslation();
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

    const result = await login<IUser>(data.username, data.password);
    if (!result.status || !result.data) {
      setError(result.message || "Unknown Error");
      return;
    }
    loginContext(result.data);
    localStorage.setItem("loggedInUser", result?.data?.username ?? "");
    toast.success(t("login.success"));

    const redirectUrl = localStorage.getItem("redirectAfterLogin");

    setTimeout(() => {
      if (redirectUrl) {
        localStorage.removeItem("redirectAfterLogin");
        navigate(redirectUrl, { replace: true });
      } else {
        navigate(ROUTES.HOME, { replace: true });
      }
    }, 1000);
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-sm mx-auto mt-10 border border-gray-400 p-12 rounded-xl">
      <h1 className="text-xl font-bold mb-4">{t("login.title")}</h1>

      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className="flex flex-col gap-2">
          <InputComponent
            label={t("login.username")}
            {...register("username")}
            placeholder={t("login.username")}
            sx={{
              marginTop: 0,
              marginBottom: 0,
            }}
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}

          <InputComponent
            label={t("login.password")}
            {...register("password")}
            type="password"
            placeholder={t("login.password")}
            autoComplete="new-password"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          {error && <p className="text-red-600 mb-2">{error}</p>}
          <ButtonComponent disabled={isSubmitting} type="submit" text="Login" />

          <div>
            <span>{t("login.noAccount")} </span>
            <Link to={ROUTES.REGISTER} className="text-blue-600">
              {t("login.registerHere")}
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
