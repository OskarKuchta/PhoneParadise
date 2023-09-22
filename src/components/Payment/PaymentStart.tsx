import PaymentTop from "./PaymentTop";
import { useEffect, useState, FC } from "react";
import PaymentConfirm from "./PaymentConfirm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { openPayment } from "../../features/PaymentSlice";
import { AnyAction, Dispatch } from "redux";

const PaymentStart: FC = () => {
  const dispatch: Dispatch<AnyAction> = useDispatch();
  const { isOpen } = useSelector((store: RootState) => store.payment);
  const [count, setCount]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = useState<number>(10);
  useEffect(() => {
    const intervalId: ReturnType<typeof setInterval> = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);
    if (count === 0) {
      dispatch(openPayment());
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [count]);

  return isOpen ? (
    <PaymentConfirm />
  ) : (
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
        <button
          className="payments-start-button"
          onClick={() => dispatch(openPayment())}
        >
          To payment
        </button>
      </div>
    </section>
  );
};

export default PaymentStart;
