import PaymentTop from "../components/Payment/PaymentTop";
import { useEffect, useState, FC } from "react";
import PaymentConfirm from "../components/Payment/PaymentConfirm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { openPayment } from "../features/PaymentSlice";
import { AnyAction, Dispatch } from "redux";

const Payments: FC = () => {
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
    <section className="flex flex-col justify-center items-center mx-[10%] text-center">
      <PaymentTop />
      <div className="mb-8">
        <h3 className="mx-auto mb-8 w-3/4">
          You will be redirected to your bank's website shortly. To proceed,
          click the button below or wait a few seconds{" "}
          <span className="dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </h3>
        <button
          className="py-2 px-12 border rounded border-purple transition-all 
          duration-500 hover:bg-purple hover:text-white hover:outline-none hover:scale-105 focus:bg-purple 
          focus:text-white focus:outline-none focus:scale-105"
          onClick={() => dispatch(openPayment())}
        >
          To payment
        </button>
      </div>
    </section>
  );
};

export default Payments;
