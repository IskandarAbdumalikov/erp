import React, { memo } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaArrowAltCircleLeft, FaHandshake, FaStore, FaUserPlus, FaUsers } from "react-icons/fa";

import "./sidebar.scss";
import { LuStore } from "react-icons/lu";
import { GiBuyCard } from "react-icons/gi";

const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div className="sidebar">
      <h2 className="sidebar__logo">
        <Link to={"/"}>
          <FaArrowAltCircleLeft />
        </Link>
        <span>Market</span>
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
      </ul>

      {/* <button className="sidebar__logout" onClick={handleLogOut}>
        <IoIosLogOut />
        Log Out
      </button> */}
    </div>
  );
};

export default memo(Sidebar);
