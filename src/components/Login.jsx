import React, { useState } from "react";
import "./stylesLogin.css";
import PropTypes from "prop-types";
import Notification from "rc-notification";
import logo from "./images/logo.jpeg";
import { Link, useParams } from "react-router-dom";
import "./modal.css";
import Modal from "react-modal";

async function loginUser(credentials) {
  return fetch("http://3.109.71.28/hospital_login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

async function forgotPassword(credentials) {
  return fetch("http://3.109.71.28/check_hospital_username/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

async function setNewPasswordCall(credentials) {
  return fetch("http://3.109.71.28/hospital_forgot_password/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

async function loginAdmin(credentials) {
  return fetch("http://3.109.71.28/super_admin_login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function Login({ setToken, setSuperUser, setUserId }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const [Username, setUserName1] = useState();
  const [hospital_id, setHospital_id] = useState();
  const [reg_no, setRegNo] = useState();

  const [new_password, setNewPassword] = useState();
  const [adminLogin, setAdminLogin] = useState(false);

  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });

    if (token.is_success) {
      setToken(token.data.token);
      setSuperUser(token.data.is_superuser);
      setUserId(token.data.user_id);
      localStorage.setItem("token", token.data.token);
      localStorage.setItem("hospital_id", token.data.user_id);
      localStorage.setItem("username", token.data.username);
      localStorage.setItem("is_superuser", false);
    }

    if (!token.is_success) {
      Notification.newInstance({}, (notification) => {
        notification.notice({
          content: (
            <span style={{ backgroundColor: "red", top: 65, left: "50%" }}>
              {token.response_message}
            </span>
          ),
          closable: true,
          duration: null,
        });
      });
    }
  };

  const handleNewPasswordSubmit  = async (e) => {
    e.preventDefault();
    const token = await setNewPasswordCall({
      hospital_id,
      new_password,
    });

    
    if (token.is_success) {
     window.location.reload();
     
    }


    // if (!token.is_success) {
    //   Notification.newInstance({}, (notification) => {
    //     notification.notice({
    //       content: (
    //         <span style={{ backgroundColor: "red", top: 65, left: "50%" }}>
    //           {token.response_message}
    //         </span>
    //       ),
    //       closable: true,
    //       duration: null,
    //     });
    //   });
    // }
  };

  

  const handleForgotPasswordSubmit  = async (e) => {
    e.preventDefault();
    const token = await forgotPassword({
      Username,
      reg_no,
    });

    if (token.is_success) {
      setShowNewPassword(true);
      setHospital_id(token.data.user_id);
      localStorage.setItem("hospital_id", token.data.user_id); 
    }else{
      alert('Invalid Username or Registration Number')
    }

    // if (token.is_success) {
    //   setToken(token.data.token);
    //   setSuperUser(token.data.is_superuser);
    //   localStorage.setItem("token", token.data.token);
    //   localStorage.setItem("hospital_id", token.data.user_id);
    //   localStorage.setItem("username", token.data.username);
    //   localStorage.setItem("is_superuser", false);
    // }

    // if (!token.is_success) {
    //   Notification.newInstance({}, (notification) => {
    //     notification.notice({
    //       content: (
    //         <span style={{ backgroundColor: "red", top: 65, left: "50%" }}>
    //           {token.response_message}
    //         </span>
    //       ),
    //       closable: true,
    //       duration: null,
    //     });
    //   });
    // }
  };
  

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    const token = await loginAdmin({
      username,
      password,
    });

    if (token.is_success) {
      setToken(token.data.token);
      setSuperUser(token.data.is_superuser);
      setUserId(token.data.user_id);
      localStorage.setItem("token", token.data.token);
      localStorage.setItem("username", token.data.username);
      localStorage.setItem("isSuperuser", token.data.is_superuser);
      localStorage.setItem("user_id", token.data.user_id);
    }

    if (!token.is_success) {
      Notification.newInstance({}, (notification) => {
        notification.notice({
          content: (
            <span style={{ backgroundColor: "red", top: 65, left: "50%" }}>
              {token.response_message}
            </span>
          ),
          closable: true,
          duration: 5,
        });
      });
    }
  };

  return (
    <div
      className="login-wrapper"
      style={{
        boxShadow: "0px 0px 10px #0000001a",
        border: "1px solid #c9c9c9",
        padding: 50,
        marginLeft: 200,
        marginRight: 200,
        marginTop: 50,
        backgroundColor: "#F7FBF9",
        opacity: 1,
      }}
    >
      <br />

      <div style={{ padding: 20, border: "10px solid", borderRadius: 10 }}>
        <h1>
          {" "}
          <img src={logo} alt="Logo" width="40" /> MyMedCords
        </h1>
      </div>
      <br />

      <button
        type="button"
        class="btn btn-success btn-sm"
        onClick={() => setAdminLogin(!adminLogin)}
      >
       {adminLogin ? 'Hospital Login' : 'Admin Login' }
      </button>

      <h2>Welcome to Hospital Data Upload System</h2>

      {!adminLogin && (
        <h3>Please login with the hospital username and password </h3>
      )}
      {!adminLogin && (
        <form
          onSubmit={handleSubmit}
          style={{
            boxShadow: "0px 0px 10px #0000001a",
            backgroundColor: "#0E53A5",
            width: "30%",
            border: "2px solid black",
            marginTop: "20px",
            padding: "20px",
          }}
        >
          <label>
            <p style={{ color: "white" }}>Username</p>
            <input type="text" onChange={(e) => setUserName(e.target.value)} />
          </label>
          <label>
            <p style={{ color: "white", marginTop: 20 }}>Password</p>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <div>
            {/* <div className="btn-wrapper">
              <br />
              <a
                href={`/forgot-password`}
                className="btn btn-primary"
                style={{ color: "lightgrey" }}
              >
                Forgot Password
              </a>
            </div> */}

            <div className="App">
             

              <span style={{cursor: 'pointer'}} onClick={toggleModal}>
                Forgot Password
              </span>
            </div>

            <br />
            <button type="submit">Submit</button>
          </div>
        </form>
      )}

      {adminLogin && <h3>Please enter your Admin username and password </h3>}

      {adminLogin && (
        <form
          onSubmit={handleAdminSubmit}
          style={{
            boxShadow: "0px 0px 10px #0000001a",
            backgroundColor: "#0E53A5",
            width: "30%",
            border: "2px solid black",
            marginTop: "20px",
            padding: "20px",
          }}
        >
          <label>
            <p style={{ color: "white" }}>Admin Username</p>
            <input
              type="text"
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </label>
          <label>
            <p style={{ color: "white", marginTop: 20 }}>Admin Password</p>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <div>
            <br />
            <button type="submit">Submit</button>
          </div>
        </form>
      )}

      <Modal
        className="modal"
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
      >
        <div className="login-wrapper">
         <span style={{fontSize: 20, fontWeight: 'bold'}}> Confirm your identity </span>
          <form
            onSubmit={handleForgotPasswordSubmit}
            style={{
              // boxShadow: "0px 0px 10px #0000001a",
              // backgroundColor: "#0E53A5",
              // width: "30%",
              // border: "2px solid black",
              // marginTop: "10px",
              padding: "20px",
            }}
          >
            <label>
              <p style={{ color: "black" }}>Username</p>
              <input
                type="text"
                onChange={(e) => setUserName1(e.target.value)}
                required
              />
            </label>
            <label>
              <p style={{ color: "black", marginTop: 20 }}>Registration Number</p>
              <input
                type="regNo"
                onChange={(e) => setRegNo(e.target.value)}
                required
              />
            </label>

            <div>
              <br />
              <button type="submit">Submit</button>
            </div>
          </form>
{showNewPassword && (
          <form
            onSubmit={handleNewPasswordSubmit}
            style={{
              // boxShadow: "0px 0px 10px #0000001a",
              // backgroundColor: "#0E53A5",
              // width: "30%",
              // border: "2px solid black",
              // marginTop: "10px",
              padding: "20px",
            }}
          >
            <label>
              <p style={{ color: "black" }}>Enter New Password</p>
              <input
                type="text"
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </label>
       

            <div>
              <br />
              <button type="submit">Submit</button>
            </div>
          </form>
          )}
        
        </div>
        {/* <button onClick={toggleModal}>Close modal</button> */}
      </Modal>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
  setUserId: PropTypes.func.isRequired,
  setSuperUser: PropTypes.func.isRequired,
};
