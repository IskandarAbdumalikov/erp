import React, { useEffect, useState } from "react";
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
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const initialState = {
  customerId: "",
  amount: 0,
  comment: "",
};

const Customer = () => {
  const [skip, setSkip] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data } = useGetCustomersQuery({ limit, skip: skip - 1 });
  const [showParams, setShowParams] = useState("");
  const [pinCustomer] = usePinCustomerMutation();
  const [showPaymentModule, setShowPaymentModule] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const [createPayment, { isSuccess }] = useCreatePaymentMutation();

  const handleChangePagination = (event, value) => {
    setSkip(value);
  };
  console.log(skip);

  useEffect(() => {
    if (isSuccess) {
      setShowPaymentModule(false);
    }
  }, [isSuccess]);

  const handleCreatePaymentSubmit = (e) => {
    e.preventDefault();
    if (formData.customerId) {
      createPayment(formData);
    } else {
      console.error("customerId is required");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
            <th>PARAMETRLAR</th>
          </tr>
        </thead>
        <tbody>
          {data?.innerData?.map((el) => (
            <tr key={el._id}>
              <td className="td">
                <Button
                  className="pin-btn"
                  onDoubleClick={() => handlePinCustomer(el)}
                  variant="text"
                >
                  {el.pin ? (
                    <>
                      <RiUnpinLine />
                    </>
                  ) : (
                    <>
                      <BsPinAngle />
                    </>
                  )}
                </Button>
                {el._id}
              </td>
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
                    className="overlay-transparent"
                  ></div>
                ) : (
                  <></>
                )}
                {showParams === el._id ? (
                  <div
                    onClick={() => setShowParams("")}
                    className="params__module"
                  >
                    <Link to={`${el._id}`}>
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
      <div className="pagination">
        <Stack spacing={2}>
          <Pagination
            count={data?.totalCount ? Math.ceil(data.totalCount / limit) : 1}
            page={skip}
            onChange={handleChangePagination}
          />
        </Stack>
        <FormControl style={{ maxWidth: 200 }} fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={limit}
            label="Age"
            onChange={(e) => setLimit(e.target.value)}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </FormControl>
      </div>
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
