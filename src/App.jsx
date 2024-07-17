import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Auth from "./pages/auth/Auth";
import Admin from "./pages/admin/Admin";
import AdminStore from "./pages/admin/store/AdminStore";
import Saller from "./pages/admin/saller/Saller";
import Customer from "./pages/admin/customer/Customer";
import SinglePage from "./pages/singleCustomer/SinglePage";
import CreateCustomer from "./pages/createCustomer/CreateCustomer";
import EditCustomer from "./pages/singleCustomer/EditCustomer";

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
            <Route path="create-customers" element={<CreateCustomer />} />
            <Route path={`customers/:customerId`} element={<SinglePage />} />
            <Route
              path={`edit-customer/:customerId`}
              element={<EditCustomer />}
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
