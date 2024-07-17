import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import "./admin.scss";
import AdminHeader from "./admin-header/AdminHeader";
import { useGetCustomersQuery } from "../../context/customerApi";

const Admin = () => {
  const [close, setClose] = useState(false);
  let { data } = useGetCustomersQuery();
  console.log(data);

  return (
    <div className={`admin ${close ? "close" : ""}`}>
      <Sidebar />
      <div className="admin__body">
        <AdminHeader setClose={setClose} />
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
