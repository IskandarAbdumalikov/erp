import React, { useEffect, useState } from "react";
import "../register/register.scss";
import { useNavigate } from "react-router-dom";
import { useRegisterCustomerMutation } from "../../context/customerApi";
import "./createCustomer.scss";
import { PatternFormat } from "react-number-format";

const initialState = {
  fname: "",
  lname: "",
  phone_primary: "",
  address: "",
  budget: 0,
};

const CreateCustomer = () => {
  const [formData, setFormData] = useState(initialState);
  let navigate = useNavigate();

  const [registerCustomer, { data, isLoading, isSuccess }] =
    useRegisterCustomerMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    if (isSuccess) {
      navigate("/admin/customers");
      localStorage.setItem("x-auth-token", data.innerData.token);
    }
  }, [isSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      registerCustomer(formData);
    } catch (err) {
      console.error("Failed to register:", err);
    }
  };

  return (
    <div className="create__customer">
      <h1>Yangi mijoz qo`shish</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fname">Ismi</label>
          <input
            autoFocus
            type="text"
            id="fname"
            name="fname"
            placeholder="Ismi"
            value={formData.fname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lname">Familiyasi</label>
          <input
            type="text"
            id="lname"
            name="lname"
            placeholder="Familyasi"
            value={formData.lname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phone_primary">Telefon no`meri</label>
          <PatternFormat
            format="+998 (##) ###-####"
            type="text"
            id="phone_primary"
            name="phone_primary"
            placeholder="+998 (12) 345-6789"
            value={""}
            onChange={handleChange}
            required
            valueIsNumericString={true}
          />
        </div>
        <div>
          <label htmlFor="address">Manzili</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Yashash manzili"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="budget">Hisobi</label>
          <input
            type="number"
            id="budget"
            name="budget"
            placeholder="Hisobi"
            value={formData.budget}
            onChange={handleChange}
            required
          />
        </div>{" "}
        <div>
          <label>Button</label>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Qo`shilayapti..." : "Qo`shish"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCustomer;
