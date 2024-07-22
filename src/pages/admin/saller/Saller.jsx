import React, { useEffect, useState } from "react";
import "../customer/customer.scss";
import {
  useGetCustomersQuery,
  usePinCustomerMutation,
} from "../../../context/customerApi";
import { Link } from "react-router-dom";
import { FaEllipsis } from "react-icons/fa6";
import { ImCancelCircle } from "react-icons/im";
import { TbListDetails } from "react-icons/tb";
import { MdMessage, MdPayments } from "react-icons/md";
import { BsPinAngle } from "react-icons/bs";
import { RiUnpinLine } from "react-icons/ri";
import Module from "../../../components/module/Module";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { IoCheckmarkDone } from "react-icons/io5";
import Stack from "@mui/material/Stack";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
} from "@mui/material";
import { useGetProfileQuery } from "../../../context/profileApi";
import { useGetSellersQuery } from "../../../context/sellerApi";
import { useCreateExpenseMutation } from "../../../context/expenseApi";

const initialState = {
  sellerId: "",
  amount: 0,
  comment: "",
};


const Saller = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState("");
  const [paidToday, setPaidToday] = useState("0");
  const [debt, setDebt] = useState("2");
  const [budget, setBudget] = useState("0");
  const [createdAt, setCreatedAt] = useState("-1");
  const [showMessageModule, setShowMessageModule] = useState(false);
  const [skip, setSkip] = useState(1);
  const [limit, setLimit] = useState(10);
  const [showSort, setShowSort] = useState(true);
  const { data, isLoading, isFetching } = useGetSellersQuery({
    limit,
    skip: skip - 1,
    paidToday,
    debt,
    createdAt,
    budget,
  });
  const [showParams, setShowParams] = useState("");
  const [pinCustomer] = usePinCustomerMutation();
  const [showPaymentModule, setShowPaymentModule] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const BOT_TOKEN = "7313879684:AAH0lhoKddXhkYP-YO5QnYueauqqT3J9hzE";
  const CHAT_ID = "-1002180292093";

  const [createPayment, { isSuccess }] = useCreateExpenseMutation();

  const handleChangePagination = (event, value) => {
    setSkip(value);
  };
  let { data: profileData } = useGetProfileQuery();
  let profileDay = profileData?.innerData?.date?.split("T")[0];
  console.log(profileDay);

  useEffect(() => {
    if (isSuccess) {
      setShowPaymentModule(false);
    }
  }, [isSuccess]);

  let handleSortByCreatedBy = (n) => {
    setBudget("0");
    setSkip(1);
    setCreatedAt(n);
  };
  let handleSortByBudget = (n) => {
    setBudget(n);
    setSkip(1);
    setCreatedAt("");
  };

  let handleFilterByDebt = (n) => {
    setSkip(1);
    setDebt(n);
  };
  let handleFilterByPaidToday = (n) => {
    setSkip(1);
    setPaidToday(n);
  };

  const handleCreatePaymentSubmit = (e) => {
    e.preventDefault();
    if (formData.sellerId) {
      createPayment(formData);
    } else {
      console.error("sellerId is required");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePinSeller = (customer) => {
    pinCustomer({ customer });
  };

  const handleShowPaymentModule = (sellerId) => {
    setFormData({
      ...formData,
      sellerId,
    });
    setShowPaymentModule(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let text = `Mijozga habarnoma %0A`;
    text += `Assalom ualeykum qadrli ${name} siz bizdan ${amount} so'm miqdorda qarzdor ekansiz %0A%0A`;
    text += `Iltimosimiz: ${message ? message : "shu"} %0A%0A`;
    text += `Miqdori: ${amount} so'm%0A%0A`;

    let url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${text}`;
    let api = new XMLHttpRequest();
    api.open("GET", url, true);
    api.send();
    setShowMessageModule(false);

    setMessage("");
    setAmount("");
    setName("");
  };

  const saveDatas = (name, amount) => {
    setName(name);
    setAmount(amount);
    setShowMessageModule(true);
  };

  const handleReset = () => {
    setPaidToday("0");
    setDebt("2");
    setBudget("0");
    setCreatedAt("");
  };

  return (
    <div className="customer">
      <h1>Order Lists</h1>
      <div className="customer__filters">
        <label htmlFor="paidToday">
          <p>To`l`ov qilganlarni saralash</p>
          <select
            onChange={(e) => handleFilterByPaidToday(e.target.value)}
            name=""
            id="paidToday"
            value={paidToday}
          >
            <option value="0">Barchasi </option>
            <option value="1">Tolov qilgan</option>
            <option value="-1">Tolov qilmagan</option>
          </select>
        </label>
        <label htmlFor="debt">
          <p>Qarzdorlarni saralash</p>
          <select
            onChange={(e) => handleFilterByDebt(e.target.value)}
            name=""
            id="debt"
            value={debt}
          >
            <option value="2">Barchasi </option>
            <option value="-1">Qarzdorlar</option>
            <option value="1">Haqdorlar</option>
            <option value="0">Raschyotlar</option>
          </select>
        </label>
        <label htmlFor="budget">
          <p>Pulga qarab chiqarish</p>
          <select
            onChange={(e) => handleSortByBudget(e.target.value)}
            name=""
            id="budget"
            value={budget}
          >
            <option value="">Barchasi </option>
            <option value="1">Kamayish bo`yicha</option>
            <option value="-1">o`sish bo`yicha</option>
          </select>
        </label>
        <label htmlFor="createdAt">
          <p>Yaratilganligiga qarab chiqarish</p>
          <select
            onChange={(e) => handleSortByCreatedBy(e.target.value)}
            name=""
            id="createdAt"
            value={createdAt}
          >
            <option value="">Barchasi </option>
            <option value="-1">Eng yangilar</option>
            <option value="1">Eng eskilar</option>
          </select>
        </label>
        <label htmlFor="">
          <p>Asliga qaytarish</p>
          <button onClick={() => handleReset()}>Asliga qaytarish</button>
        </label>
      </div>

      <div class="table-container">
        <table class="responsive-table">
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
                    onDoubleClick={() => handlePinSeller(el)}
                    variant="text"
                  >
                    {el.pin ? <RiUnpinLine /> : <BsPinAngle />}
                  </Button>
                  <h3>ID</h3>
                  <p>{el._id}</p>
                </td>
                <td>
                  <h3>ISM VA FAMILIYA</h3>
                  <p>
                    {el.fname} {el.lname}
                  </p>
                </td>
                <td>
                  <h3>MANZIL</h3>
                  <a
                    target="_blank"
                    href={`https://maps.google.com/maps?q=${el.address}`}
                  >
                    {el.address}
                  </a>
                </td>
                <td>
                  <h3>TELEFON NO`MER</h3>
                  <a href={`tel:${el.phone_primary}`}>{el.phone_primary}</a>
                </td>
                <td
                  className={`customer__budget ${
                    el.budget > 0
                      ? "incomer"
                      : el.budget === 0
                      ? "nothing"
                      : "outcomer"
                  }`}
                >
                  <h3>HISOB</h3>
                  <p> {el.budget}</p>
                </td>

                <td
                  className={`customer__budget__media ${
                    el.budget > 0
                      ? "incomer"
                      : el.budget === 0
                      ? "nothing"
                      : "outcomer"
                  }`}
                >
                  <h3>HISOB</h3>
                  <p> {el.budget}</p>
                </td>
                <td className="params">
                  <h3>PARAMETRLAR</h3>
                  {showParams === el._id ? (
                    <div
                      onClick={() => setShowParams("")}
                      className="overlay-transparent"
                    ></div>
                  ) : null}
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
                      <Link
                        onClick={() =>
                          saveDatas(`${el.fname} ${el.lname}`, el.budget)
                        }
                      >
                        <MdMessage /> Habar yuborish
                      </Link>
                      <Link onClick={() => handlePinSeller(el)}>
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
                  ) : null}
                  {showParams === el._id ? (
                    <button onClick={() => setShowParams("")}>
                      <ImCancelCircle />
                    </button>
                  ) : (
                    <button onClick={() => setShowParams(el._id)}>
                      <FaEllipsis />
                    </button>
                  )}
                  {el?.isPaidToday?.split("T")[0] === profileDay ? (
                    <p className="check" style={{ color: "green" }}>
                      <IoCheckmarkDone />
                    </p>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isLoading && isFetching ? (
          <div className="table__skaleton">
            <Skeleton height={70} animation="wave" />
            <Skeleton height={70} animation="wave" />
            <Skeleton height={70} animation="wave" />
            <Skeleton height={70} animation="wave" />
            <Skeleton height={70} animation="wave" />
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="pagination">
        <Stack spacing={2}>
          <Pagination
            count={data?.totalCount ? Math.ceil(data.totalCount / limit) : 1}
            page={skip}
            onChange={handleChangePagination}
          />
        </Stack>
        <FormControl style={{ maxWidth: 200 }} fullWidth>
          <InputLabel id="demo-simple-select-label">Limit</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={limit}
            label="Limit"
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
      {showMessageModule ? (
        <div
          onClick={() => setShowMessageModule(false)}
          className="overlay"
        ></div>
      ) : (
        <></>
      )}
      {showMessageModule ? (
        <Module>
          <form className="message__module" onSubmit={handleSubmit}>
            <textarea
              type="text"
              name="habar"
              placeholder="habar"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="message__module__btns">
              <button type="submit">Yuborish</button>
              <button
                className="cancel-btn"
                onClick={() => setShowMessageModule(false)}
                type="button"
              >
                Bekor qilish
              </button>
            </div>
          </form>
        </Module>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Saller;
