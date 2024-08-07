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
import CreateCustomer from "./pages/admin/createCustomer/CreateCustomer";
import SingleSeller from "./pages/singleSeller/SingleSeller";
import EditCustomer from "./pages/singleCustomer/EditCustomer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Settings from "./pages/settings/Settings";
import Products from "./pages/admin/products/Products";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Auth />}>
          <Route path="admin" element={<Admin />}>
            <Route path="store" element={<AdminStore />} />
            <Route path="seller" element={<Saller />} />
            <Route path="seller/:sellerId" element={<SingleSeller />} />
            <Route path="customers" element={<Customer />} />
            <Route path="create-customers" element={<CreateCustomer />} />
            <Route path="products" element={<Products />} />
            <Route path="settings" element={<Settings />} />
            <Route path={`customers/:customerId`} element={<SinglePage />} />
            <Route
              path={`edit-customer/:customerId`}
              element={<EditCustomer />}
            />
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
