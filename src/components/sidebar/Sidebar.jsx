import React, { memo } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaHandshake, FaStore, FaUserPlus, FaUsers } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";

import "./sidebar.scss";
import { useGetProfileQuery } from "../../context/adminSlice";
import { Avatar } from "@mui/material";

const Sidebar = () => {
  let { data } = useGetProfileQuery();
  let user = data?.innerData?.user;
  let avatar = user?.fname?.split("")[0];

  return (
    <div className="sidebar">
      <h2 className="sidebar__logo">
        <Link>
          <Avatar sx={{ bgcolor: "#4880ff" }}>{avatar}</Avatar>
        </Link>
        <span>{user?.fname}</span>
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
          <NavLink className={"sidebar__link"} to={"settings"}>
            <IoSettingsSharp />
            <span>Sozlamalar</span>
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
