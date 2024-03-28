import { Fragment, useEffect } from "react";
import Header from "../../components/header/header.component.jsx";
import Login from "../../components/login/Login.component.jsx";
import { useNavigate } from "react-router-dom";

const LoginRoute = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    if(localStorage.getItem('token')){
      navigate('/dashboard');
    }
  }, [])
  return (
    <Fragment>
      <Header/>
      <Login/>
    </Fragment>
  );
};

export default LoginRoute;