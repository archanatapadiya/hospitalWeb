import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// import TopbarSidebarButton from './TopbarSidebarButton';
import "./topbar.css";
import logo from "../images/logo.jpeg";
import axios from "axios";
import history from "../lib/history";
// import { UserProps } from '../../../shared/prop-types/ReducerProps';

const Topbar = (props) => {
  let user_id = props.userId;

  let loc = window.location.href;
  const localToken = localStorage.getItem("token");
  const isSuperuser = localStorage.getItem("isSuperuser");

  const user_data = localStorage.getItem("user_data");

  const clickLogout = async (params) => {
    let url = "http://3.109.71.28/user_logout/";
    axios
      .get(url, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: localToken,
        },
      })
      .then((res) => {
        localStorage.removeItem("token");
        localStorage.removeItem("is_superuser");
        localStorage.removeItem("isSuperuser");
        localStorage.removeItem("user_id");
        localStorage.removeItem("username");
        localStorage.removeItem("hospital_id");
        history.push(`/`);
        window.location.reload();
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="topbar">
      <div className="topbar__left" style={{ marginLeft: 20 }}>
        <h1
          style={{ cursor: "pointer" }}
          onClick={() => {
            window.location.href = "/";
          }}
        >
          {" "}
          <img src={logo} alt="Logo" width="40" /> MyMedCords
        </h1>

        <Link className="topbar__logo" to="/" />
      </div>
      <div className="topbar__right" style={{ marginRight: 50, marginTop: 20 }}>
        {!isSuperuser && (
        <Link
          className="topbar__link"
          onClick={() => {
            window.location.href = "/";
          }}
          to="/"
          style={{ marginRight: 50 }}
        >
          Search Patient
        </Link>
        )}

        {user_data && (
          <Link
            className="topbar__link"
            to={`/upload-details/${user_id}`}
            style={{ marginRight: 50 }}
          >
            Patient Details
          </Link>
        )}

        <Link className="topbar__link" onClick={clickLogout}>
          Logout
        </Link>
      </div>
    </div>
  );
};

Topbar.propTypes = {
  changeMobileSidebarVisibility: PropTypes.func.isRequired,
  changeSidebarVisibility: PropTypes.func.isRequired,
  //   user: UserProps.isRequired,
};

export default Topbar;
