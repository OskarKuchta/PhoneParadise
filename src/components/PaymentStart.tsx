import PaymentTop from "./PaymentTop";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { NavigateFunction } from "react-router";
const PaymentStart = () => {
  const [count, setCount] = useState<number>(10);
  const navigate: NavigateFunction = useNavigate();
  useEffect(() => {
    const intervalId: React.ReactNode = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);
    if (count === 0) {
      navigate("/");
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [count, navigate]);
  return (
    <section className="payment-start">
      <PaymentTop />
      <div className="payments-start-bottom">
        <h3>
          You will be redirected to your bank's website shortly. To proceed,
          click the button below or wait a few seconds{" "}
          <span className="dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </h3>
        <button className="payments-start-button">To payment</button>
      </div>
    </section>
  );
};

export default PaymentStart;
