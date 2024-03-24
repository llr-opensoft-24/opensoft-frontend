import React, { Fragment, useState, useEffect } from "react";
import HeaderS from "../../components/header/headersearch.component.jsx";
import Banner from "../../components/banner/banner.component.jsx";
import Movies from "../../components/list/listCard.component.jsx";
import LoginRoute from "../login/login.route.jsx";

const DashboardRoute = () => {
  
  // const token = localStorage.getItem("token");
  // console.log(token)
  // if (token === null) {
  //   console.log("hii")
  //   // return <Navigate to="/login"  />;4
  //   return <LoginRoute />
  // }
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token'); 

    if (token ) {
        setAuthenticated(true);
       
    } else {
        setAuthenticated(false);
       
        
    }
}, []);

  return (
    <div>
            {authenticated ? (
                <div>
                    <Fragment>
      <HeaderS />
      <Banner />
      <Movies />
    </Fragment>
    </div>
            ) : (
                <div>
                    <LoginRoute />
                </div>
            )}
        </div>
    
  );
};

export default DashboardRoute;

