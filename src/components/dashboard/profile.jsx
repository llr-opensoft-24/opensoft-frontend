import React from "react";
import Navbar from "./component/Navbar";
import Styles from "./Dashboard.module.css";
import sty from "./profile.module.css";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const plan = localStorage.getItem("plan");
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");

  const generateDescription = () => {
    let description = "";

    switch (plan.toLowerCase()) {
      case "free":
        description = "Basic plan with limited features. Access to 5000+ movies in 720p quality.";
        break;
      case "pro":
        description = "Standard plan with enhanced features. Access to 10000+ movies in 1080p quality.";
        break;
      case "premium":
        description = "Premium plan with full access to all features. Unlimited access to movies in 4k quality.";
        break;
      default:
        description = "No plan selected.";
        break;
    }

    return description;
  };

  return (
    <div className={Styles.background}>
      <Navbar />
      <div>
        <section style={{ opacity: "100%", minHeight: "87vh" }}>
          <div className="container py-5">
            <div className="row justify-content-center align-items-center">
              <div className="col-lg-8 mb-4 mb-lg-0">
                <div className={`card ${sty.profileCard}`}>
                  <div className="row g-0">
                    <div className={`col-md-4 ${sty.gradient_custom} text-center text-white d-flex flex-column justify-content-center`}>
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" alt="Avatar" className="img-fluid mx-auto mb-3" style={{ width: "50%", borderRadius: "50%" }} />
                      <h4>{username}</h4>
                    </div>
                    <div className="col-md-8">
                      <div className="card-body p-4">
                        <h6>Information</h6>
                        <hr className="mt-0 mb-4" />
                        <div className="row">
                          <div className="col-12 mb-3">
                            <h6>Email</h6>
                            <p className="text-muted">{email}</p>
                          </div>
                        </div>
                        <h6>Plans</h6>
                        <hr className="mt-0 mb-4" />
                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <h6>Current Plan</h6>
                            <p className="text-muted">{plan.charAt(0).toUpperCase() + plan.slice(1)}</p>
                          </div>
                          <div className="col-md-6 mb-3">
                            <h6>Benefits</h6>
                            <p className="text-muted">{generateDescription()}</p>
                          </div>
                        </div>
                        <div className="d-flex justify-content-center">
                          <button className="btn btn-danger" onClick={() => { navigate('/dashboard') }}>Back to Dashboard</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
