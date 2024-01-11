import PaymentTop from "../components/Payment/PaymentTop";
import { useEffect, useState, FC } from "react";
import PaymentConfirm from "../components/Payment/PaymentConfirm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { openPayment } from "../features/PaymentSlice";
import { AnyAction, Dispatch } from "redux";
import { useTranslation } from "react-i18next";

const Payments: FC = () => {
  const dispatch: Dispatch<AnyAction> = useDispatch();
  const { isOpen } = useSelector((store: RootState) => store.payment);
  const { t } = useTranslation();
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
    <main className="m-8 flex flex-col justify-center items-center mx-[10%] text-center">
      <PaymentTop />
      <div className="mb-8">
        <h3 className="mx-auto mb-8 w-3/4">
          {t("payment-redirect")}{" "}
          <span className="dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </h3>
        <button
          className="button-withArrow py-[0.7rem] px-12 mb-8 md:mb-0"
          onClick={() => dispatch(openPayment())}
        >
          {t("to-payment")}
        </button>
      </div>
    </main>
  );
};

export default Payments;
