import React, { useEffect, useState } from "react";
import "./settings.scss";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../context/profileApi";
import { FaPen } from "react-icons/fa";
import Module from "../../components/module/Module";
import { useNavigate } from "react-router-dom";
import { PatternFormat } from "react-number-format";

const initialState = {
  fname: "",
  lname: "",
  phone_primary: "",
  username: "",
  password: "",
};

const Settings = () => {
  const { data } = useGetProfileQuery();
  const [showEditModule, setShowEdit] = useState(false);
  const user = data?.innerData?.user;
  const [formData, setFormData] = useState(initialState);
  const [updateProfile] = useUpdateProfileMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setFormData({
        fname: data.innerData.fname,
        lname: data.innerData.lname,
        phone_primary: data.innerData.phone_primary,
        username: data.innerData.username,
        password: data.innerData.password,
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setShowEdit(false);
    navigate("/admin/settings");
  };

  const handleEditClick = () => {
    setFormData({
      fname: user?.fname || "",
      lname: user?.lname || "",
      phone_primary: user?.phone_primary || "",
      username: user?.username || "",
      password: user?.password || "",
    });
    setShowEdit(true);
  };

  return (
    <div className="settings">
      <button onClick={handleEditClick} className="edit-btn">
        <FaPen />
      </button>
      <div className="settings__header">
        <h1>Shaxsiy ma`lumotlar</h1>
      </div>
      <div className="settings__body">
        <ul>
          <img
            className="default-user"
            src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
            alt=""
          />
        </ul>
        <ul>
          <li>
            <label htmlFor="fname">Ism</label>
            <h3>{user?.fname}</h3>
          </li>
          <li>
            <label htmlFor="phone_primary">Telefon raqam</label>
            <h3>+{user?.phone_primary}</h3>
          </li>
          <li>
            <label htmlFor="lname">Familiya</label>
            <h3>{user?.lname}</h3>
          </li>
        </ul>
        <ul>
          <li>
            <label htmlFor="username">Tahallus</label>
            <h3>{user?.username}</h3>
          </li>
          <li>
            <label htmlFor="status">Status</label>
            <h3 className={user?.isActive ? "online" : "offline"}>
              {user?.isActive ? "Online" : "Offline"}
            </h3>
          </li>
          <li>
            <label htmlFor="lname">Familiya</label>
            <h3>{user?.lname}</h3>
          </li>
        </ul>
      </div>
      {showEditModule && (
        <Module>
          <form onSubmit={handleSubmit}>
            <input
              autoFocus
              type="text"
              name="fname"
              placeholder="Ismi"
              value={formData.fname}
              onChange={handleChange}
            />
            <input
              type="text"
              name="lname"
              placeholder="Familiyasi"
              value={formData.lname}
              onChange={handleChange}
            />

            <PatternFormat
              format="+998 (##) ###-####"
              id="phone_primary"
              name="phone_primary"
              placeholder="+998 (12) 345-6789"
              type="text"
              value={formData.phone_primary}
              onChange={handleChange}
              required
              valueIsNumericString={true}
            />
            <input
              type="text"
              name="username"
              placeholder="Tahallusi"
              value={formData.username}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Paroli"
              value={formData.password}
              onChange={handleChange}
            />
            <input
              type="text"
              name="isActive"
              placeholder="Activligi true/false"
              value={formData.isActive}
              onChange={handleChange}
            />
            <button type="submit">Yangilash</button>
          </form>
        </Module>
      )}
      {showEditModule && (
        <div onClick={() => setShowEdit(false)} className="overlay"></div>
      )}
    </div>
  );
};

export default Settings;
