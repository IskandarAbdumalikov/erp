import { IoIosMenu } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import SearchModule from "./SearchModule";
import "./adminHeader.scss";
import ReactFlagsSelect from "react-flags-select";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { logout } from "../../../context/authSlice/authSlice";
import Draggable from "react-draggable";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { FaEllipsisVertical } from "react-icons/fa6";
import MenuModule from "./MenuModule";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const AdminHeader = ({ setClose }) => {
  const { t, i18n } = useTranslation();
  const [search, setSearch] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [open, setOpen] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSearch("");
    setConfirm(false);
    setShowMenu(false);
  };

  useEffect(() => {
    if (confirm) {
      navigate("/");
      dispatch(logout());
    }
    handleClose();
  }, [confirm]);

  const handleLanguageChange = (countryCode) => {
    const language = countryCode === "US" ? "en" : "uz";
    i18n.changeLanguage(language);
  };

  return (
    <div className="admin__header">
      
      <div
        className={`admin__header__left ${
          showInput ? "show__input__header" : ""
        }`}
      >
        <button
          className="admin__header__btn"
          onClick={() => setClose((p) => !p)}
        >
          <IoIosMenu />
        </button>
        <form className="form__search" action="">
          <button className="input-btn">
            <CiSearch />
          </button>
          <button
            type="button"
            className="search-btn"
            onClick={() => setShowInput(true)}
          >
            <CiSearch />
          </button>
          <input
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("search")}
            value={search}
            type="text"
          />
          {showInput && (
            <button
              type="button"
              className="close-btn"
              onClick={() => setShowInput(false)}
            >
              X
            </button>
          )}
          {search && <SearchModule search={search} setSearch={setSearch} />}
        </form>
      </div>{" "}
     
      <div className="admin__header__right">
        <ReactFlagsSelect
          className="lang-select"
          countries={["US", "UZ"]}
          onSelect={handleLanguageChange}
          customLabels={{
            US: "EN",
            UZ: "UZ",
          }}
          placeholder={t("select_language")}
        />
        <button
          onClick={() => setShowMenu((p) => !p)}
          className="menu-btn"
          variant="outlined"
        >
          <FaEllipsisVertical />
          {showMenu && (
            <MenuModule
              handleLanguageChange={handleLanguageChange}
              handleClickOpen={handleClickOpen}
              t={t}
            />
          )}
        </button>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
            {t("logout")}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>{t("confirm_logout")}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              {t("no")}
            </Button>
            <Button onClick={() => setConfirm(true)}>{t("yes")}</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminHeader;
