import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Auth from "./pages/auth/Auth";
import Admin from "./pages/admin/Admin";
import AdminStore from "./pages/admin/store/AdminStore";
import Saller from "./pages/admin/saller/Saller";
import Customer from "./pages/admin/customer/Customer";
import SingleCustomer from "./pages/singleCustomer/SingleCustomer";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Auth />}>
          <Route path="admin" element={<Admin />}>
            <Route path="store" element={<AdminStore />} />
            <Route path="saller" element={<Saller />} />
            <Route path="customers" element={<Customer />} />
            <Route
              path={`customers/:customerId`}
              element={<SingleCustomer />}
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
