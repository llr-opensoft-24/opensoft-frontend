import React, { useState } from "react";
import Styles from "../Dashboard.module.css";
import { useNavigate } from "react-router-dom";


export default function Navbar() {
  const plan = localStorage.getItem("plan");
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
  return (
    <div className="d-flex p-4 justify-content-end">
      {plan === "free" && (
        <div className={Styles.plans}>
          <button className="btn btn-danger" onClick={clickPlans}>
            Plans
          </button>
        </div>
      )}
      <div className="sign-in-button ms-4 position-relative">
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
          alt="Profile"
          className={`profile-icon ${Styles.profile_icon}`}
          onClick={() => setShowDropdown(!showDropdown)}
        />
        {showDropdown && (
          <div className={Styles.dropdown_menu}>
            <button className="dropdown-item" onClick={clickProfile}>
              Profile
            </button>
            <button className="dropdown-item" onClick={clickLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
