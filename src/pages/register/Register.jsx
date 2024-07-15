import React, { useState } from "react";
import "./register.scss";
import { useRegisterAdminMutation } from "../../context/adminSlice";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  fname: "",
  lname: "",
  phones: "",
  role: "admin",
  username: "",
  password: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  let navigate = useNavigate();

  const [registerAdmin, { data, isLoading, isSuccess }] =
    useRegisterAdminMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      registerAdmin(formData);
      if (isSuccess) {
        navigate("/admin/customers");
        localStorage.setItem("x-auth-token", data.innerData.token);
      }
    } catch (err) {
      console.error("Failed to register:", err);
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            id="fname"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            id="lname"
            name="lname"
            value={formData.lname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phones">Phone</label>
          <input
            type="text"
            id="phones"
            name="phones"
            value={formData.phones}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </button>
        <Link style={{ color: "blue" }} to={"/"}>
          Do you have already an account? Log in
        </Link>
      </form>
    </div>
  );
};

export default Register;
