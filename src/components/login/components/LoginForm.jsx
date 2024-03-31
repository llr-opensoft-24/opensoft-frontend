import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure, setToken, setData } from '../../../redux/actions';
import axios from 'axios';
import { toast } from 'react-toastify';
import showIcon from '../../../assets/showicon.png';
import hideIcon from '../../../assets/hideicon.png';
import Styles from '../Login.module.css';

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [res,setRes] = useState(false);
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false); // State to track password visibility
  const dispatch = useDispatch();

  const emailOnChangeHandler = (e) => {
    setEmail(e.target.value);
    setEmailValid(true);
  };

  const passwordOnChangeHandler = (e) => {
    setPassword(e.target.value);
    setPasswordValid(true);
  };

  const togglePasswordVisibility = (e) => {
    e.preventDefault(); 
    e.stopPropagation();
    setShowPassword(!showPassword);
  };

  const ctaClickHandler = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailValid(false);
      return;
    }
    if (!password) {
      setPasswordValid(false);
      return;
    }

    setRes(true);

    try {
      const response = await axios.post('http://4.247.166.168/login', {
        email: email,
        password: password
      });
      setRes(false);
      if(response.data && response.data.data.token){
        
        dispatch(loginSuccess(response.data.data.user_data));
        dispatch(setToken(response.data.data.token));
        localStorage.setItem("token",response.data.data.token);
        console.log(response.data.data.user_data);
        localStorage.setItem("email",response.data.data.user_data.email);
        localStorage.setItem("plan",response.data.data.user_data.plan);
        localStorage.setItem("verified",response.data.data.user_data.verified);
        localStorage.setItem("username",response.data.data.user_data.username);
        toast.success('Login Successful',{
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        navigate('/dashboard');
      }
      else
      {
        console.log(response.data.data.user_data);
        dispatch(setData(response.data.data.user_data));
        toast.success(response.data.message
          ,{
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        navigate('/otp');
      }
    } catch (error) {
      toast.error(error.response.data.message,{
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      dispatch(loginFailure(error.response.data.message));
    }
  };

  const validateEmail = (value) => {
    return value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
  };

  const handleForgotPassword = () => {
    navigate('/forgotpassword');
  };

  return (
    <div>
      <form>
        <input
          className={`form-control mb-0 ${Styles.loginemail}`}
          value={email}
          onChange={emailOnChangeHandler}
          type="email"
          placeholder="Email"
        />
        {!emailValid && (
          <p className="m-0 p-1 text-danger">Email is invalid/blank</p>
        )}
        <div className="input-group mt-3">
          <input
            className={`form-control ${Styles.loginpwd}`}
            value={password}
            onChange={passwordOnChangeHandler}
            type={showPassword ? "text" : "password"} 
            placeholder="Password"
          />
          <div className={Styles.input_group_append}>
            {showPassword ? 
              <img className={Styles.visiblity_img} src={showIcon} alt="Hide" onClick={(e) => togglePasswordVisibility(e)} /> : 
              <img className={Styles.visiblity_img} src={hideIcon} alt="Show" onClick={(e) => togglePasswordVisibility(e)} />
            }
          </div>
        </div>
        {!passwordValid && (
          <p className="text-danger p-1 mb-0">Password is invalid/blank</p>
        )}
    
        
        <button className="btn btn-danger w-100 mt-4" onClick={ctaClickHandler}>
          Sign In {res && (<i className="fa fa-spinner fa-spin"></i>)}

        </button>
        <div className="d-flex justify-content-end ">
        <button className="btn text-white mt-2 text-end" onClick={handleForgotPassword}>
          Forgot Password?
        </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
