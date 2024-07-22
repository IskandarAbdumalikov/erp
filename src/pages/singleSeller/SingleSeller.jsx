import React, { useState } from "react";
import { useGetSingleCustomerQuery } from "../../context/customerApi";
import { useParams, useNavigate } from "react-router-dom";
import "../singleCustomer/singlePage.scss";
import {
  MdAccountBalanceWallet,
  MdDriveFileRenameOutline,
} from "react-icons/md";
import { FaPhoneAlt, FaUser } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { RiAdminFill } from "react-icons/ri";
import {
  useCreateExpenseMutation,
  useGetExpensesQuery,
} from "../../context/expenseApi";
import Module from "../../components/module/Module";
import { useGetSingleSellerQuery } from "../../context/sellerApi";

const initialState = {
  sellerId: "",
  amount: 0,
  comment: "",
};

const SingleSeller = () => {
  const { sellerId } = useParams();
  const { data } = useGetSingleSellerQuery(sellerId);
  const [showModule, setShowModule] = useState(false);
  const customer = data?.innerData;
  const { data: paymentData } = useGetExpensesQuery(sellerId);
  const [showPaymentModule, setShowPaymentModule] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialState);

  const [createPayment] = useCreateExpenseMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCreatePaymentSubmit = (e) => {
    e.preventDefault();
    if (formData.sellerId) {
      createPayment(formData);
      setShowPaymentModule(false);
    } else {
      console.error("sellerId is required");
    }
  };

  const handleShowPaymentModule = (sellerId) => {
    setFormData({
      ...formData,
      sellerId,
    });
    setShowPaymentModule(true);
  };

  let tartib = 1;

  return (
    <div className="single__page">
      <h2>
        <FaUser /> Ismi : {customer?.fname}
      </h2>
      <h2>
        <FaUser /> Familiyasi : {customer?.lname}
      </h2>
      <h2>
        <FaLocationDot /> Manzili : {customer?.address}
      </h2>
      <h2>
        <FaPhoneAlt /> Telefon no`meri : {customer?.phone_primary}
      </h2>
      <h2>
        <RiAdminFill /> Ma`sul hodim : {customer?.adminId.fname}{" "}
        {customer?.adminId.lname}
      </h2>
      <h2>
        <MdAccountBalanceWallet /> Hisobi : {customer?.budget} so`m
      </h2>
      <div className="single__btns">
        <button onClick={() => handleShowPaymentModule(customer?._id)}>
          Pul o`tqazish
        </button>
        <button onClick={() => navigate(`/admin/edit-customer/${sellerId}`)}>
          Tahrirlash
        </button>
        <button onClick={() => setShowModule(true)}>O`tqazmalar tarixi</button>
      </div>
      {showModule && (
        <>
          <div onClick={() => setShowModule(false)} className="overlay"></div>
          <Module>
            {paymentData?.innerData ? (
              <div className="single__customer__cards">
                {paymentData?.innerData?.map((el) => (
                  <div key={el._id} className="single__customer__cards__card">
                    <p>{tartib++}.</p>
                    <p>
                      Kimdan : {el.adminId.fname} {el.adminId.lname}
                    </p>
                    <p>Miqdori : {el.amount} so`m</p>
                    <p>Izohi : {el.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <h2>Hali to`lov qilinmagan</h2>
            )}
          </Module>
        </>
      )}
      {showPaymentModule && (
        <>
          <Module>
            <form onSubmit={handleCreatePaymentSubmit}>
              <input
                type="hidden"
                name="sellerId"
                value={formData.sellerId}
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
              <button type="submit">Yuborish</button>
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

export default SingleSeller;
