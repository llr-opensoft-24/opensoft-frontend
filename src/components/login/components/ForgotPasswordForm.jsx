import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify';
import Styles from '../Login.module.css';
import { useSelector,useDispatch } from 'react-redux';
import { loginSuccess } from '../../../redux/actions';


const FpForm = () => {
    const [text , setText] =useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const [otp, setOtp] = useState(null);


  const otpOnChangeHandler = (e) => {
    setOtp(e.target.value);
  };
  const emailOnChangeHandler = (e) => {
    setEmail(e.target.value);
    
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
      const response = await axios.post('http://10.145.80.49:8080/forgotpassword', { 
        email: email,
      });
      console.log(response.data);
      if(response.data.error===null)
      {
        toast.success(response.data.message,{
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        
      }
    } catch (error) {
      console.error('Error :', error);
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
  
  
  const validateOtp = async (e) => {
    e.preventDefault();
    try {
        
        const response = await axios.post('http://10.145.80.49:8080/verifyemail', {
            email: email,
            otp : otp
        });
      console.log(response);
      if(response.data.error===null)
      {
        toast.success(response.data.message,{
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        
      }
      else{
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
    //   toast.error(error.response,{
    //     position: "bottom-right",
    //     autoClose: 2000,
    //     hideProgressBar: true,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true
    //   });
    }
  };
  /*need to complete below code  */
  const updateUser = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://10.145.80.49:8080/', {
        username: text,
        email: email,
        password: password
      });
      console.log(response.data);
      if(response.data.error===null)
      {
        toast.success(response.data.message,{
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        navigate('/login');
      }
      else{
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

  return (
    <div>
    <div className={Styles.login}>
      <div className={Styles.holder}>
        <h2 className='text-white'>Reset</h2>
      <form>
        <input
            className={`form-control mt-3 mb-0 ${Styles.signupemail}`}
            value={email}
            onChange={emailOnChangeHandler}
            type="email"
            placeholder="email"
          />
          <button className="btn btn-danger w-100 mt-4" onClick={enterEmail}>
            Enter
          </button>
          
        </form>
        
        <form>
        <input
            className={`form-control mt-3 mb-0 ${Styles.signupemail}`}
            value={otp}
            onChange={otpOnChangeHandler}
            type="otp"
            placeholder="otp"
          />
          <button className="btn btn-danger w-100 mt-4" onClick={validateOtp}>
            submit otp
          </button>
          
        </form>
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
        </div>
      </div>
      <div className={Styles.shadow}></div>
      </div>
  );


}

export default FpForm
