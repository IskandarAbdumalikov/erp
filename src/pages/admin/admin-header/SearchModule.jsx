import React from "react";
import { useGetSellersBySearchQuery } from "../../../context/sellerApi";

const SearchModule = ({ search }) => {
  let { data, isError } = useGetSellersBySearchQuery({ value: search });
  console.log(data);
  return (
    <>
      {isError ? (
        <div className="search__module">Not found</div>
      ) : (
        <div className="search__module">
          {data?.innerData?.map((el) => (
            <div className="search__module__card">
              <p>
                {el.fname} {el.lname}
              </p>{" "}
              <p>{el.phone_primary}</p>
              <p>{el.budget}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SearchModule;
