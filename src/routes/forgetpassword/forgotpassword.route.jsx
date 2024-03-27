import { Fragment } from "react";
import Header from "../../components/header/header.component.jsx";
import FpForm from "../../components/login/components/forgetpassword.component.jsx";

const OtpRoute = () => {
  return (
    <Fragment>
      <Header/>
      <Otp/>
    </Fragment>
  );
};

export default OtpRoute;