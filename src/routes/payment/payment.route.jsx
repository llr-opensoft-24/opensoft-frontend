import React from 'react';
import { Fragment } from "react";
import Plans from "../../components/payment/Payment.component.jsx";
import HeaderS from "../../components/header/headersearch.component.jsx";

const PaymentRoute = () => {
    return (
        <Fragment>
            <HeaderS />
            <Plans />
        </Fragment>
    );
};

export default PaymentRoute;