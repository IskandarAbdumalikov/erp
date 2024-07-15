import React from "react";
import { Link } from "react-router-dom";
import { useGetSellersQuery } from "../../../context/sellerApi";

const Saller = () => {
  let { data } = useGetSellersQuery();
  return (
    <div className="customer">
      <h1>Order Lists</h1>
      <div></div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>ADDRESS</th>
            <th>TEL</th>
            <th>BUDGET</th>
            <th>/</th>
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
                    : el.budget == 0
                    ? "nothing"
                    : "outcomer"
                } `}
              >
                {el.budget}
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

export default Saller;
