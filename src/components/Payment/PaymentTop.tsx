import logo from "../../assets/logo.png";
import { FC } from "react";
const PaymentTop: FC = () => {
  return (
    <div className="flex mt-8 mr-40 mb-16 relative">
      <img src={logo} />
      <h2 className="absolute top-[0.9rem] left-32 text-purple tracking-widest">Phone Paradise</h2>
    </div>
  );
};

export default PaymentTop;
