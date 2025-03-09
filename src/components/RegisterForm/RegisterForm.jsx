import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/user/userOperations.js";
import { selectError, selectIsLoading } from "../../redux/user/selectors.js";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FiEye } from "react-icons/fi";
import { LuEyeOff } from "react-icons/lu";
import css from "./RegisterForm.module.css";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Incorrect email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password required"),
});

const RegisterForm = ({ onClose }) => {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const onSubmit = async (data) => {
    const resultAction = dispatch(registerUser(data));

    if (registerUser.fulfilled.match(resultAction)) {
      onClose();
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className={css.registerTitleCont}>
        <h2 className={css.registerTitle}>Registration</h2>
        <p className={css.registerText}>
          Thank you for your interest in our platform! In order to register, we
          need some information. Please provide us with the following
          information
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={css.registerForm}
        noValidate
      >
        <div className={css.registerInputs}>
          <div>
            <input
              className={css.registerInput}
              type="name"
              placeholder="Name"
              {...register("name")}
            />
            {errors.name && <p className={css.error}>{errors.name.message}</p>}
          </div>
          <div>
            <input
              className={css.registerInput}
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
                className={css.registerInput}
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
        <button type="submit" disabled={isLoading} className={css.registerBtn}>
          Sign Up
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </>
  );
};

export default RegisterForm;
