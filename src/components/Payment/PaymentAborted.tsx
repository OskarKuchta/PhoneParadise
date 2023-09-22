import { FC } from "react";
import { useNavigate } from "react-router";
const PaymentAborted: FC = () => {
  const navigate = useNavigate();
  const backToCart = () => {
    navigate("/cart");
  };
  return (
    <section className="payment-aborted">
      <h2>Your link is expired. Back to cart and try again.</h2>
      <button onClick={backToCart}> Back to cart </button>
    </section>
  );
};

export default PaymentAborted;
