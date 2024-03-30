import React from "react";
import "./Payment.css"
const PricingCard = ({ title, price, movies, quality, handler}) => {
  return (
    <div className="PricingCard">
      <header>
        <h1 className="card-price">{title}</h1>
      </header>
      {/* features here */}
      <div className="card-features">
        <div className="card-storage">Movies : {movies}</div>
        <div className="card-prices">₹ {price}</div>
        <div className="card-users-allowed">Quality : {quality}</div>
      </div>
      <button className="card-btn" onClick={()=>handler(price,title)}>UPGRADE</button>
    </div>
  );
};

export default PricingCard;