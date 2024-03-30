import React, { useEffect, useState } from "react";
import Styles from "../Dashboard.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowBack } from "@material-ui/icons";

export default function Navbar() {
  const plan = localStorage.getItem("plan");
  const location= useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const clickLogout = (e) => {
    e.preventDefault();
    localStorage.setItem("token", "");
    localStorage.setItem("plan", "");
    localStorage.setItem("email", "");
    localStorage.setItem("verified", "");
    navigate("/login");
    window.location.href = "/login";
  };

  const clickPlans = (e) => {
    e.preventDefault();
    navigate("/payment");
  };
  const clickProfile = (e) => {
    e.preventDefault();
    navigate("/profile");
  };
  const [show,setShow]=useState(true);
  useEffect(()=>{
    if(location.pathname.includes("/dashboard"))
    setShow(false);
  },[])
  return (
    <div className={`d-flex p-4 ${!show? "justify-content-end": "justify-content-between"}`}>
      {show && <div
        className="head"
        onClick={() => {
          navigate(-1);
        }}
      >
        <ArrowBack className=" back-btn" />
      </div>}
      <div className="d-flex flex-row">
        {plan === "free" && (
          <div className={Styles.plans}>
            <button className="btn btn-danger" onClick={clickPlans}>
              Plans
            </button>
          </div>
        )}
        <div className="sign-in-button ms-4 position-relative" style={{zIndex:1}}>
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
            alt="Profile"
            className={`profile-icon ${Styles.profile_icon}`}
            onClick={() => setShowDropdown(!showDropdown)}
          />
          {showDropdown && (
            <div className={Styles.dropdown_menu}>
              <button className={`dashboard-item ${Styles.dropdown_item}`} onClick={clickProfile}>
                Profile
              </button>
              <hr className="my-1"/>
              <button className={`dashboard-item ${Styles.dropdown_item}`} onClick={clickLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
