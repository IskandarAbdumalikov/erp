import React, { useEffect, useState } from "react";
import { useSignInMutation } from "../../context/adminSlice";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setToken } from "../../context/authSlice/authSlice";

const Login = () => {
  const [username, setUsername] = useState("iskandar2007");
  let dispatch = useDispatch();
  const [password, setPassword] = useState("iskandar2007");
  const [signIn, { data, isLoading, isSuccess, isError, error }] =
    useSignInMutation();
  let navigate = useNavigate();
  console.log(isSuccess);

  useEffect(() => {
    if (isSuccess) {
      navigate("/admin/customers");
      dispatch(setToken(data?.innerData?.token));
      toast.success(data?.msg);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.msg);
    }
  }, [isError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isSuccess);
    signIn({ username, password });
  };

  return (
    <div className="login-container">
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
        <Link style={{ color: "blue" }} to={"/register"}>
          You have not an account? Register
        </Link>
      </form>
    </div>
  );
};

export default Login;
