import React from 'react'
import './Payment.css'
import axios from 'axios'
import PricingCard from './PricingCard'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { ArrowBack } from '@material-ui/icons'
//import Razorpay from 'razorpay';

const Plans = () => {
  const navigate = useNavigate();
  const [selectMonthly, setSelectMonthly] = useState(true);
  const checkoutHandler = async (amount, title) => {
    var b_amount = 0
    var order_id = ''
    var razorpay_payment_id =''
    var razorpay_signature =''
    var razorpay_order_id =''


    // console.log("hiiiii")
      try {
        // console.log("hi1")
        const plan = title.toLowerCase()
        console.log(plan,"ff",title)
        const response = await axios.post(`http://10.145.54.6:8080/order?amount=${amount}&plan=${plan}`,{
          headers:{
            Authorization : `${localStorage.getItem("token")}`,
          }
        });
        if(response['statusText'] != 'OK'){
          throw new Error('failed to create order');
        }
        const data = response['data'];
        order_id=data.data.order_id
        b_amount = data.data.amount
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    console.log(order_id)
    console.log(b_amount)
    console.log(window)
    const options = {
      key: "rzp_test_5oyeXgrO0WUciY", // Enter the Key ID generated from the Dashboard
      amount: b_amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Acme Corp",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "handler": function (response){
        console.log(response)

        razorpay_payment_id = response.razorpay_payment_id;
        razorpay_order_id = response.razorpay_order_id;
        razorpay_signature = response.razorpay_signature;

        const send_data={
          razorpay_payment_id : response.razorpay_payment_id,
          razorpay_order_id : response.razorpay_order_id,
          razorpay_signature : response.razorpay_signature
        }
        
         axios.post(`http://10.145.54.6:8080/verify`,send_data,{
          headers: {
            'Content-Type': 'application/json',
          },
         }).then(response => {
          console.log('Response from backend:', response.data);
          // Handle the response data here
        })
        .catch(error => {
          console.error('Error:', error);
          // Handle errors here
        });
        

        
    },
    // callback_url:"http://localhost:8080/verify/",
      prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000"
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
      // e.preventDefault();
    
  }

  const redirectToHome= () =>{
    navigate('/dashboard');
  }

  return (
    <>
    <div className="PricingApp">
      <div className="app-container">
        <div className="head" onClick={()=>{navigate(-1)}}>
        <ArrowBack className=" back-btn" />
      </div>
        {/* Header */}
        <header>
          <h1 className="header-topic">Our Pricing Plan</h1>
          {/* <div className="header-row">
            <p>Annually</p>
            <label className="price-switch">
              <input
                className="price-checkbox"
                onChange={() => {
                  setSelectMonthly((prev) => !prev);
                }}
                type="checkbox"
              />
              <div className="switch-slider"></div>
            </label>
            <p>Monthly</p>
          </div> */}
        </header>
        {/* Cards here */}
        <div className="pricing-cards">
          <PricingCard
            title="Free"
            price={"Free"}
            movies="5000+"
            quality="720p"
            handler={redirectToHome}
          />
          <PricingCard
            title="Pro"
            price={"299"}
            movies="10000+"
            quality="1080p"
            handler={checkoutHandler}
          />
          <PricingCard
            title="Premium"
            price={"499"}
            movies="All"
            quality="4k"
            handler={checkoutHandler}
          />
        </div>
      </div>
    </div>
    </>
  )
}

export default Plans
