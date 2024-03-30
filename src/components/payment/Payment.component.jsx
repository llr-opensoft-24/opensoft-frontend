import React from 'react'
import './Payment.css'
import axios from 'axios'
import PricingCard from './PricingCard'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { ArrowBack } from '@material-ui/icons'
import { toast } from 'react-toastify';
import Navbar from "../dashboard/component/Navbar";
//import Razorpay from 'razorpay';

const Plans = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  // const [titl,setTitle] = useState('free');
  const checkoutHandler = async (amount, title) => {
    var b_amount = 0;
    var order_id = '';
    var razorpay_payment_id ='';
    var razorpay_signature ='';
    var razorpay_order_id ='';
    // setTitle(title);

    try {
      const plan = title.toLowerCase();

      const response = await axios.post(`http://4.247.166.168/order?amount=${amount}&plan=${plan}`,{}, {
        headers:{
          Authorization : `${localStorage.getItem("token")}`,
        }
      });

      if(response['statusText'] !== 'OK'){
        throw new Error('Failed to create order');
      }

      const data = response['data'];
      order_id = data.data.order_id;
      b_amount = data.data.amount;
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    console.log(order_id);
    console.log(b_amount);

    const options = {
      key: "rzp_test_5oyeXgrO0WUciY",
      amount: b_amount,
      currency: "INR",
      name: "Acme Corp",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order_id,
      handler: function (response){
        console.log(response);

        razorpay_payment_id = response.razorpay_payment_id;
        razorpay_order_id = response.razorpay_order_id;
        razorpay_signature = response.razorpay_signature;

        const send_data={
          razorpay_payment_id : response.razorpay_payment_id,
          razorpay_order_id : response.razorpay_order_id,
          razorpay_signature : response.razorpay_signature
        };

        axios.post(`http://4.247.166.168/verify`,send_data,{ 
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        }).then(response => {
          console.log('Response from backend:', response.data);
          if(response.data.data.verification_status){
            console.log(title);
            localStorage.setItem("plan", title);
            toast.success('Plan Upgraded Successfully',{
              position: "bottom-right",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            navigate('/dashboard');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
      },
      prefill: {
        // name: "Gaurav Kumar",
        // email: "gaurav.kumar@example.com",
        // contact: "9000090000"
      },
      notes: {
        address: "Razorpay Corporate Office"
      },
      theme: {
        color: "#3399cc"
      }
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  const redirectToHome = () => {
    
    
    navigate('/dashboard');
  };

  return (
    <><Navbar/>
      <div className="PricingApp">
        <div className="app-container">
          <header>
            <h1 className="header-topic">Our Pricing Plan</h1>
          </header>
          <div className="pricing-cards">
            <PricingCard
              title="Free"
              price={"Free"}
              movies="5000+"
              quality="720p"
              handler={redirectToHome}
            />
            <PricingCard
              title="Premium"
              price={"499"}
              movies="All"
              quality="4k"
              handler={checkoutHandler}
            />
            <PricingCard
              title="Pro"
              price={"299"}
              movies="10000+"
              quality="1080p"
              handler={checkoutHandler}
            />
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Plans;
