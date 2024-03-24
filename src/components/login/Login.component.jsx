import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure, setToken } from '../../redux/actions';
import axios from 'axios';
import Styles from './Login.module.css';

const Login = () => {
  const navigate = useNavigate();
  const [text , setText] =useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);
  const [isUserExist, setIsUserExist] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const dispatch = useDispatch();
  


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

    try {
      const response = await axios.post('http://10.145.80.49:8080/login', {
        email: email,
        password: password
      });
      console.log(response);
      if(response.data){
        dispatch(loginSuccess());
        dispatch(setToken(response.data.results.token));
        localStorage.setItem("token",response.data.results.token)
      }
      console.log(response.data.results);
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        setIsUserExist(true);
        dispatch(loginFailure(error.message));
      }
    }
  };

  const registerUser = async () => {
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
      const response = await axios.post('http://10.145.80.49:8080/register', {
        username: text,
        email: email,
        password: password
      });
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const validateEmail = (value) => {
    return value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
  };

  return (
    <div className={Styles.login}>
      <div className={Styles.holder}>
        <h1 className="text-white">{isSigningUp ? 'Sign Up' : 'Sign In'}</h1>
        <br />
        <form style={{ display: isSigningUp ? 'none' : 'block' }}>
          <input
            className="form-control"
            value={email}
            onChange={emailOnChangeHandler}
            type="email"
            placeholder="Email"
          />
          {!emailValid && <p className="text-danger">Email is invalid/blank</p>}
          <input
            className="form-control"
            value={password}
            onChange={passwordOnChangeHandler}
            type="password"
            placeholder="Password"
          />
          {!passwordValid && <p className="text-danger">Password is invalid/blank</p>}
          <button className="btn btn-danger btn-block" onClick={ctaClickHandler}>
            Sign In
          </button>
          <br />
          
        </form>
        <form style={{ display: isSigningUp ? 'block' : 'none' }}>
        <input
            className="form-control"
            value={text}
            onChange={textOnChangeHandler}
            type="text"
            placeholder="username"
          />
          <input
            className="form-control"
            value={email}
            onChange={emailOnChangeHandler}
            type="email"
            placeholder="Email"
          />
          {!emailValid && <p className="text-danger">Email is invalid/blank</p>}
          <input
            className="form-control"
            value={password}
            onChange={passwordOnChangeHandler}
            type="password"
            placeholder="Password"
          />
          {!passwordValid && <p className="text-danger">Password is invalid/blank</p>}
          <input
            className="form-control"
            value={confirmPassword}
            onChange={confirmPasswordOnChangeHandler}
            type="password"
            placeholder="Confirm Password"
          />
          {!confirmPasswordValid && <p className="text-danger">Passwords do not match</p>}
          <button className="btn btn-danger btn-block" onClick={registerUser}>
            Register
          </button>
        </form>
        <br />
        <br />
        {isUserExist && <p className="text-danger">The username or password is incorrect</p>}
        <div className={Styles.login_form_other}>
          <div className={Styles.login_signup_now}>
            {isSigningUp ? 'Existing User' : 'New to flixpedia?'} &nbsp;
            <button className="" onClick={() => setIsSigningUp(!isSigningUp)}>
              {isSigningUp ? 'Sign In' : 'Sign up now'}
            </button>
            .
          </div>
        </div>
      </div>
      <div className={Styles.shadow}></div>
      <img
        className="concord-img vlv-creative"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/6e32b96a-d4be-4e44-a19b-1bd2d2279b51/ee068656-14b9-4821-89b4-53b4937d9f1c/IN-en-20220516-popsignuptwoweeks-perspective_alpha_website_small.jpg"
        alt=""
      />
    </div>
  );
};

export default Login;
