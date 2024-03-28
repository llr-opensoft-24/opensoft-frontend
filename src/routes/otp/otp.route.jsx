import { Fragment } from "react";
import Header from "../../components/header/header.component.jsx";
import Otp from "../../components/login/components/OtpForm.jsx";

const OtpRoute = () => {
  return (
    <Fragment>
      <Header/>
      <Otp/>
    </Fragment>
  );
};

export default OtpRoute;