import React, { memo } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaArrowAltCircleLeft,
  FaHandshake,
  FaStore,
  FaUserPlus,
  FaUsers,
} from "react-icons/fa";

import "./sidebar.scss";
import { LuStore } from "react-icons/lu";
import { GiBuyCard } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { logout } from "../../context/authSlice/authSlice";
import { IoLogOut } from "react-icons/io5";
import { useGetProfileQuery } from "../../context/adminSlice";

const Sidebar = () => {
  const navigate = useNavigate();
  let dispatch = useDispatch();

  const handleLogOut = () => {
    navigate("/");
    dispatch(logout());
  };
  let { data } = useGetProfileQuery();
  let user = data?.innerData?.user;
  let avatar = user.fname.split("")[0];

  return (
    <div className="sidebar">
      <h2 className="sidebar__logo">
        <Link to={"/"}>
          <span className="sidebar__avatar">{avatar}</span>
        </Link>
        <span>{user.fname}</span>
      </h2>
      <ul className="sidebar__collection">
        <li className="sidebar__item">
          <NavLink className={"sidebar__link"} to={"create-customers"}>
            <FaUserPlus />
            <span>Mijoz yaratish</span>
          </NavLink>
        </li>
        <li className="sidebar__item">
          <NavLink className={"sidebar__link"} to={"customers"}>
            <FaUsers />
            <span>Mijozlar</span>
          </NavLink>
        </li>
        <li className="sidebar__item">
          <NavLink className={"sidebar__link"} to={"saller"}>
            <FaHandshake />
            Sotuvchilar
          </NavLink>
        </li>
        <li className="sidebar__item">
          <NavLink className={"sidebar__link"} to={"store"}>
            <FaStore />
            <span>Ombor</span>
          </NavLink>
        </li>
        <li className="sidebar__item">
          <Link onClick={handleLogOut} className={"sidebar__link"}>
            <IoLogOut />
            <span>Chiqish</span>
          </Link>
        </li>
      </ul>

      {/* <button className="sidebar__logout" onClick={handleLogOut}>
        <IoIosLogOut />
        Log Out
      </button> */}
    </div>
  );
};

export default memo(Sidebar);
