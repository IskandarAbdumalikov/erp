import { IoIosMenu } from "react-icons/io";
import React from "react";
import { CiSearch } from "react-icons/ci";

const AdminHeader = ({ setClose }) => {
  return (
    <div className="admin__header">
      <div className="admin__header__left">
        <button
          className="admin__header__btn"
          onClick={() => setClose((p) => !p)}
        >
          <IoIosMenu />
        </button>
        <form action="">
          <button>
            <CiSearch />
          </button>
          <input placeholder="Search" type="text" />
        </form>
      </div>
      <div>
        <p>John doe</p>
      </div>
    </div>
  );
};

export default AdminHeader;
