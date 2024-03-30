import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify';
import Styles from '../Login.module.css';

const FpForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(true);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);


  const emailOnChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const otpOnChangeHandler = (e) => {
    setOtp(e.target.value);
  };

  const passwordOnChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const confirmPasswordOnChangeHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  const enterEmail = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://4.247.166.168/forgotpassword', {
        email: email,

      });

      if (response.data.error === null) {
        toast.success(response.data.message, {
          position: 'bottom-right',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setShowEmailForm(false);
        setShowOtpForm(true);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response.data.message, {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const validateOtp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://4.247.166.168/verifyemail', {
        email: email,
        otp: otp,
        type: "password"
      });

      if (response.data.error === null) {
        toast.success(response.data.message, {
          position: 'bottom-right',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setShowOtpForm(false);
        setShowPasswordForm(true);
      } else {
        toast.error(response.data.message, {
          position: 'bottom-right',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const updateUser = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setConfirmPasswordValid(false);
      return;
    }

    try {
      const response = await axios.post('http://4.247.166.168/resetpassword', {
        email: email,
        password: password
      });

      if (response.data.error === null) {
        toast.success(response.data.message, {
          position: 'bottom-right',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        navigate('/login');
      } else {
        toast.error(response.data.message, {
          position: 'bottom-right',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response.data.message, {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div>
      <div className={Styles.login}>
        <div className={Styles.holder}>
          {showEmailForm && (
            <div>
              <h2 className="text-white">Enter Email</h2>
            <form>

              <input
                className={`form-control mt-3 mb-0 ${Styles.signupemail}`}
                value={email}
                onChange={emailOnChangeHandler}
                type="email"
                placeholder="Email"
              />
              <button className="btn btn-danger w-100 mt-4" onClick={enterEmail}>
                Enter
              </button>
            </form>
            </div>
          )}
          {showOtpForm && (
            <div>
              <h2 className="text-white">Enter Otp</h2>
            <form>
              <input
                className={`form-control mt-3 mb-0 ${Styles.signupemail}`}
                value={otp}
                onChange={otpOnChangeHandler}
                type="otp"
                placeholder="OTP"
              />
              <button className="btn btn-danger w-100 mt-4" onClick={validateOtp}>
                Submit OTP
              </button>
            </form>
            </div>
          )}
          {showPasswordForm && (
            <div>
              <h2 className="text-white ">Reset Password</h2>
            <form>
              <input
                className={`form-control mt-3 mb-0 ${Styles.signuppwd}`}
                value={password}
                onChange={passwordOnChangeHandler}
                type="password"
                placeholder="Password"
              />
              <input
                className={`form-control mt-3 mb-0 ${Styles.signupcnfpwd}`}
                value={confirmPassword}
                onChange={confirmPasswordOnChangeHandler}
                type="password"
                placeholder="Confirm Password"
              />
              <button className="btn btn-danger w-100 mt-4" onClick={updateUser}>
                Update
              </button>
            </form>
            {!confirmPasswordValid && <p className="p-1 mb-0 text-danger">Passwords do not match</p>}
            </div>
          )}
        </div>
      </div>
      <div className={Styles.shadow}></div>
    </div>
  );
};

export default FpForm;

