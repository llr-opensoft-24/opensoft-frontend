import { Fragment } from "react";
import Header from "../../components/header/header.component.jsx";
import FpForm from "../../components/login/components/ForgotPasswordForm.jsx";

const FpRoute = () => {
  return (
    <Fragment>
      <Header/>
      <FpForm/>
    </Fragment>
  );
};

export default FpRoute;