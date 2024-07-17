import React, { useState } from "react";
import "./customer.scss";
import {
  useGetCustomersQuery,
  usePinCustomerMutation,
} from "../../../context/customerApi";
import { Link } from "react-router-dom";
import { FaEllipsis } from "react-icons/fa6";
import { ImCancelCircle } from "react-icons/im";
import { TbListDetails } from "react-icons/tb";
import { MdPayments } from "react-icons/md";
import { BsPinAngle } from "react-icons/bs";
import { RiUnpinLine } from "react-icons/ri";
import { useCreatePaymentMutation } from "../../../context/paymentApi";
import Module from "../../../components/module/Module";

const initialState = {
  customerId: "",
  amount: 0,
  comment: "",
};

const Customer = () => {
  const { data } = useGetCustomersQuery();
  const [showParams, setShowParams] = useState("");
  const [pinCustomer] = usePinCustomerMutation();
  const [showPaymentModule, setShowPaymentModule] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const [createPayment] = useCreatePaymentMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCreatePaymentSubmit = (e) => {
    e.preventDefault();
    if (formData.customerId) {
      createPayment(formData);
      setShowPaymentModule(false); // Close the module after submission
    } else {
      console.error("customerId is required");
    }
  };

  const handlePinCustomer = (customer) => {
    pinCustomer({ customer });
  };

  const handleShowPaymentModule = (customerId) => {
    setFormData({
      ...formData,
      customerId,
    });
    setShowPaymentModule(true);
  };

  return (
    <div className="customer">
      <h1>Order Lists</h1>
      <div></div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>ISM VA FAMILIYA</th>
            <th>MANZIL</th>
            <th>TELEFON NO`MER</th>
            <th>HISOB</th>
            <th>PRAMETRLAR</th>
          </tr>
        </thead>
        <tbody>
          {data?.innerData?.map((el) => (
            <tr key={el._id}>
              <td>{el._id}</td>
              <td>
                {el.lname} {el.fname}
              </td>
              <td>{el.address}</td>
              <td>{el.phone_primary}</td>
              <td
                className={`customer__budget ${
                  el.budget > 0
                    ? "incomer"
                    : el.budget === 0
                    ? "nothing"
                    : "outcomer"
                } `}
              >
                {el.budget}
              </td>
              <td className="params">
                {showParams === el._id ? (
                  <div
                    onClick={() => setShowParams("")}
                    className="params__module"
                  >
                    <Link style={{ color: "blue" }} to={`${el._id}`}>
                      <TbListDetails /> Batafsil
                    </Link>
                    <Link onClick={() => handleShowPaymentModule(el._id)}>
                      <MdPayments /> To`lov
                    </Link>
                    <Link onClick={() => handlePinCustomer(el)}>
                      {el.pin ? (
                        <>
                          <RiUnpinLine /> Unpin qilish
                        </>
                      ) : (
                        <>
                          <BsPinAngle /> Pin qilish
                        </>
                      )}
                    </Link>
                  </div>
                ) : (
                  <></>
                )}
                {showParams === el._id ? (
                  <button onClick={() => setShowParams("")}>
                    <ImCancelCircle />
                  </button>
                ) : (
                  <button onClick={() => setShowParams(el._id)}>
                    <FaEllipsis />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showPaymentModule && (
        <>
          <Module>
            <form onSubmit={handleCreatePaymentSubmit}>
              <input
                type="hidden"
                name="customerId"
                value={formData.customerId}
                readOnly
              />
              <input
                type="number"
                name="amount"
                required
                placeholder="Pul miqdori so`mda"
                value={formData.amount}
                onChange={handleChange}
              />
              <input
                type="text"
                name="comment"
                placeholder="Izoh"
                value={formData.comment}
                onChange={handleChange}
              />
              <button>Yuborish</button>
              <button
                className="cancel-btn"
                onClick={() => setShowPaymentModule(false)}
                type="button"
              >
                Bekor qilish
              </button>
            </form>
          </Module>
          <div
            onClick={() => setShowPaymentModule(false)}
            className="overlay"
          ></div>
        </>
      )}
    </div>
  );
};

export default Customer;
