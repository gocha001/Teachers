import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/user/userOperations.js";
import { selectError, selectIsLoading } from "../../redux/user/selectors.js";
import css from "./LoginForm.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FiEye } from "react-icons/fi";
import { LuEyeOff } from "react-icons/lu";

const schema = yup.object().shape({
  email: yup.string().email("Incorrect email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password required"),
});

const LoginForm = ({ onClose }) => {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const onSubmit = async (data) => {
    const resultAction = await dispatch(loginUser(data));

    if (loginUser.fulfilled.match(resultAction)) {
      onClose();
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className={css.loginTitleCont}>
        <h2 className={css.loginTitle}>Log In</h2>
        <p className={css.loginText}>
          Welcome back! Please enter your credentials to access your account and
          continue your search for an teacher.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={css.loginForm}
        noValidate
      >
        <div className={css.loginInputs}>
          <div>
            <input
              className={css.loginInput}
              type="email"
              placeholder="Email"
              {...register("email")}
            />
            {errors.email && (
              <p className={css.error}>{errors.email.message}</p>
            )}
          </div>
          <div>
            <div style={{ position: "relative" }}>
              <input
                className={css.loginInput}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className={css.passwordBtn}
              >
                {showPassword ? <FiEye /> : <LuEyeOff />}
              </button>
            </div>
            {errors.password && (
              <p className={css.error}>{errors.password.message}</p>
            )}
          </div>
        </div>

        <button type="submit" disabled={isLoading} className={css.loginBtn}>
          Log In
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </>
  );
};

export default LoginForm;
