import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify';
import showIcon from '../../../assets/showicon.png';
import hideIcon from '../../../assets/hideicon.png';
import Styles from '../Login.module.css';

const SignupForm = (props) => {
  const navigate = useNavigate();
  const [text , setText] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const textOnChangeHandler = (e) => {
    setText(e.target.value);
  };

  const emailOnChangeHandler = (e) => {
    setEmail(e.target.value);
    setEmailValid(true);
  };

  const passwordOnChangeHandler = (e) => {
    setPassword(e.target.value);
    setPasswordValid(true);
  };

  const confirmPasswordOnChangeHandler = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordValid(true);
  };

  const togglePasswordVisibility = (e, setShowPassword) => {
    e.preventDefault(); 
    e.stopPropagation();
    setShowPassword(!showPassword);
  };

  const registerUser = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailValid(false);
      return;
    }
    if (!password) {
      setPasswordValid(false);
      return;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordValid(false);
      return;
    }

    try {
      const response = await axios.post('http://4.247.166.168/register', {
        username: text,
        email: email,
        password: password
      });
      console.log(response.data);
      if(response.data.error===null) {
        props.setIsSigningUp(false);
        toast.success(response.data.message,{
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        navigate('/login');
      } else {
        toast.error(response.data.message,{
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
      }
    } catch (error) {
      console.error('Error registering user:', error);
      toast.error(error.response.data.message,{
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    }
  };

  const validateEmail = (value) => {
    return value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
  };

  return (
    <div>
      <form>
        <input
          className={`form-control mb-3 ${Styles.signupusername}`}
          value={text}
          onChange={textOnChangeHandler} 
          type="text"
          placeholder="Username"
        />
        <input
          className={`form-control mt-3 mb-0 ${Styles.signupemail}`}
          value={email}
          onChange={emailOnChangeHandler}
          type="email"
          placeholder="Email"
        />
        {!emailValid && <p className="mb-0 p-1 text-danger">Email is invalid/blank</p>}
        <div className="input-group ">
          <input
            className={`form-control mt-3 mb-0 ${Styles.signuppwd}`}
            value={password}
            onChange={passwordOnChangeHandler}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
          /> 
          <div className={Styles.input_group_append1}>
            {showPassword ? 
              <img className={Styles.signup_img} src={showIcon} alt="Hide" onClick={(e) => togglePasswordVisibility(e, setShowPassword)} /> : 
              <img className={Styles.signup_img} src={hideIcon} alt="Show" onClick={(e) => togglePasswordVisibility(e, setShowPassword)} />
            }
          </div>
        </div >
        {!passwordValid && <p className="mb-0 p-1 text-danger">Password is invalid/blank</p>}
        <div className="input-group ">
        <input
          className={`form-control mt-3 mb-0 ${Styles.signupcnfpwd}`}
          value={confirmPassword}
          onChange={confirmPasswordOnChangeHandler}
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm Password"
        />
         <div className={`${Styles.input_group_append2} ${Styles.visibility_img}`}>
          {showConfirmPassword ? 
            <img className={Styles.signup_img} src={showIcon} alt="Hide" onClick={(e) => togglePasswordVisibility(e, setShowConfirmPassword)} /> : 
            <img className={Styles.signup_img} src={hideIcon} alt="Show" onClick={(e) => togglePasswordVisibility(e, setShowConfirmPassword)} />
          }
        </div> 
        </div>
        {!confirmPasswordValid && <p className="p-1 mb-0 text-danger">Passwords do not match</p>}
        <button className="btn btn-danger w-100 mt-4" onClick={registerUser}>
          Register
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
