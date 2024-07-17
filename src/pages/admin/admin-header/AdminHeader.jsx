import { IoIosMenu } from "react-icons/io";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import SearchModule from "./SearchModule";
import "./adminHeader.scss";

const AdminHeader = ({ setClose }) => {
  let [search, setSearch] = useState("");
  return (
    <div className="admin__header">
      <div className="admin__header__left">
        <button
          className="admin__header__btn"
          onClick={() => setClose((p) => !p)}
        >
          <IoIosMenu />
        </button>
        <form className="form__search" action="">
          <button>
            <CiSearch />
          </button>
          <input
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            value={search}
            type="text"
          />
          {search ? <SearchModule search={search} /> : <></>}
        </form>
      </div>
      <div>
        <p>John doe</p>
      </div>
    </div>
  );
};

export default AdminHeader;
