import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetSingleCustomerQuery,
  useUpdateCustomerMutation,
} from "../../context/customerApi";
import { PatternFormat } from "react-number-format";

const EditCustomer = () => {
  const { customerId } = useParams();
  const { data } = useGetSingleCustomerQuery(customerId);
  const [updateCustomer] = useUpdateCustomerMutation(customerId);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    phone_primary: "",
    address: "",
    budget: 0,
    pin: false,
  });

  useEffect(() => {
    if (data) {
      setFormData({
        fname: data.innerData.fname,
        lname: data.innerData.lname,
        phone_primary: data.innerData.phone_primary,
        address: data.innerData.address,
        budget: data.innerData.budget,
        pin: data.innerData.pin,
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

    updateCustomer({ id: customerId, ...formData });
    navigate(`/admin/customers/${customerId}`);
  };

  return (
    <div className="edit-customer">
      <h2>Customer Edit Page</h2>
      <form onSubmit={handleSubmit}>
        <input
          autoFocus
          type="text"
          name="fname"
          placeholder="Ismi"
          value={formData.fname}
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
          name="address"
          placeholder="Yashash manzili"
          value={formData.address}
          onChange={handleChange}
        />
        <input
          type="number"
          name="budget"
          placeholder="Hisobi"
          value={formData.budget}
          onChange={handleChange}
        />
        <label>
          <input
            type="checkbox"
            name="pin"
            checked={formData.pin}
            onChange={(e) =>
              setFormData({ ...formData, pin: e.target.checked })
            }
          />
          Pin qilish
        </label>
        <button type="submit">Yangilash</button>
      </form>
    </div>
  );
};

export default EditCustomer;
