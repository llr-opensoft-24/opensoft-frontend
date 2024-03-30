import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify';
import Styles from '../Login.module.css';
import { useSelector,useDispatch } from 'react-redux';
import { loginSuccess } from '../../../redux/actions';


const OtpForm = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state=>state.auth.userData);
    console.log(userData)
  useEffect(()=>{
    dispatch(loginSuccess());
  },[dispatch]);
  const navigate = useNavigate();
  const [otp, setOtp] = useState(null);


  const otpOnChangeHandler = (e) => {
    setOtp(e.target.value);
  };

  
  
  const validateOtp = async (e) => {
    e.preventDefault();
    try {
        const email = userData["email"];
        const response = await axios.post('http://4.247.166.168/verifyemail', {
            email: email,
            otp : otp,
            type:"email"
        });
      console.log(response);
      if(response.data.error===null)
      { localStorage.setItem("token",response.data.data.token);
        localStorage.setItem("email",response.data.data.user_data.email);
        localStorage.setItem("plan",response.data.data.user_data.plan);
        localStorage.setItem("verified",response.data.data.user_data.verified);
        localStorage.setItem("username",response.data.data.user_data.username);
        toast.success(response.data.message,{
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        navigate('/dashboard');
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

  return (
    <div>
    <div className={Styles.login}>
      <div className={Styles.holder}>
        <h2 className='text-white'>Otp Verification</h2>
      <form>
        <input
            className={`form-control mt-3 mb-0 ${Styles.signupemail}`}
            value={otp}
            onChange={otpOnChangeHandler}
            type="otp"
            placeholder="Otp"
          />
          <button className="btn btn-danger w-100 mt-4" onClick={validateOtp}>
            Validate
          </button>
        </form>
        </div>
      </div>
      <div className={Styles.shadow}></div>
      </div>
  );


}

export default OtpForm
