import logo from "../assets/logo.png";
import { FC } from "react";
const PaymentTop: FC = () => {
  return (
    <div className="payment-top">
      <img src={logo} />
      <h2 className="payment-name">Phone Paradise</h2>
    </div>
  );
};

export default PaymentTop;
