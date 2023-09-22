import { FC } from "react";
import { NavigateFunction, useNavigate } from "react-router";
const PaymentDeclined: FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const backToCart = () => {
    navigate("/cart")
  }
  return (
    <section className="payment-declined">
      <h2>Something went wrong with payment. Back to cart and try again.</h2>
      <button onClick={backToCart}>Back to main</button>
    </section>
  );
};

export default PaymentDeclined;
