import React from "react";
import { useGetSellersBySearchQuery } from "../../../context/sellerApi";
import { useGetCustomersBySearchQuery } from "../../../context/customerApi";
import { Link } from "react-router-dom";

const SearchModule = ({ search, setSearch }) => {
  let { data, isError } = useGetCustomersBySearchQuery({ value: search });
  console.log(search);

  return (
    <>
      {isError ? (
        <div className="search__module">Not found</div>
      ) : (
        <div className="search__module">
          {data?.innerData?.map((el) => (
            <Link
              onClick={() => setSearch("")}
              to={`/admin/customers/${el._id}`}
              className="search__module__card"
            >
              <p>
                {el.fname} {el.lname}
              </p>{" "}
              <p>{el.phone_primary}</p>
              <p>{el.budget}</p>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default SearchModule;
