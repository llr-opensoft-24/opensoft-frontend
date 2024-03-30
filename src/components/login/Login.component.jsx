import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure, setToken } from '../../redux/actions';
import axios from 'axios';
import Styles from './Login.module.css';
import { toast } from 'react-toastify';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';

const Login = () => {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const navigate = useNavigate();
  
  const handleCrossClick = () => {
    navigate('/');
  };

  return (
    <div className={Styles.login}>
      <div className={Styles.holder}>
        <button className={Styles.closeButton} onClick={handleCrossClick}>×</button>
        <h1 className="text-white text-center mb-4">{isSigningUp ? 'Sign Up' : 'Sign In'}</h1>
        {!isSigningUp && <LoginForm />}
        {isSigningUp && <SignupForm setIsSigningUp={setIsSigningUp} />}
        
        <br />
        <br />
        <div className={Styles.login_form_other}>
          <div className={Styles.login_signup_now}>
            {isSigningUp ? 'Existing User ? ' : 'New to Flixpedia? '}
            <button className="" onClick={() => setIsSigningUp(!isSigningUp)}>
              {isSigningUp ? 'Sign In' : 'Sign up now'}
            </button>
            .
          </div>
        </div>
      </div>
      <div className={Styles.shadow}></div>
    </div>
  );
};

export default Login;
