import { FC } from "react";
import { useNavigate } from "react-router";
const PaymentAborted: FC = () => {
  const navigate = useNavigate();
  const backToMain = () => {
    navigate("/");
  };
  return (
    <section className="payment-aborted">
      <h2>Your link is expired. Back to cart and try again.</h2>
      <button onClick={backToMain}> Back to main</button>
    </section>
  );
};

export default PaymentAborted;
