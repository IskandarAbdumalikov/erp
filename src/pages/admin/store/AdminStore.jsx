import React from "react";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../../../context/productsApi";

const AdminStore = () => {
  let { data } = useGetProductsQuery();
  return (
    <div className="customer">
      <h1>Order Lists</h1>
      <div></div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>QUANTITY</th>
            <th>PRICE</th>
            <th>TOTAL</th>
            <th>/</th>
          </tr>
        </thead>
        <tbody>
          {data?.innerData?.map((el) => (
            <tr key={el._id}>
              <td>{el._id}</td>
              <td>{el.title}</td>
              <td>
                {el.quantity} {el.units}
              </td>
              <td>{el.price?.toFixed(2)} so`m</td>
              <td
                className={`customer__budget ${
                  el.price * el.quantity > 0
                    ? "incomer"
                    : el.price * el.quantity == 0
                    ? "nothing"
                    : "outcomer"
                } `}
              >
                {(el.price * el.quantity)?.toFixed(2)}
              </td>
              <td>
                <Link style={{ color: "blue" }} to={`${el._id}`}>
                  Batafsil
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminStore;
