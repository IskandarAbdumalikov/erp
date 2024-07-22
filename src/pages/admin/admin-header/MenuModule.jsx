import { Button } from "@mui/material";
import React from "react";
import ReactFlagsSelect from "react-flags-select";
import { FaUser } from "react-icons/fa6";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const MenuModule = ({ handleClickOpen, handleLanguageChange ,t}) => {
  return (
    <div className="admin__header__show-module">
      <Button
        variant="outlined"
        className="button-log-out"
        onClick={handleClickOpen}
      >
        <RiLogoutBoxRLine
          icon="pi pi-check"
          label="Confirm"
          className={"log-out-btn"}
        />{" "}
        Chiqish
      </Button>
      <Link to={"settings"}>
        <Button>
          <FaUser /> Profil
        </Button>
      </Link>
      <ReactFlagsSelect
        className="lang-select__media"
        countries={["US", "UZ"]}
        onSelect={handleLanguageChange}
        customLabels={{
          US: "EN",
          UZ: "UZ",
        }}
        placeholder={t("select_language")}
      />
    </div>
  );
};

export default MenuModule;
