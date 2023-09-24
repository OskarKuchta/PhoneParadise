import { useDispatch } from "react-redux";
import {
  closePayment,
  acceptedPayment,
  declinedPayment,
} from "../../features/PaymentSlice";
import { NavigateFunction, useNavigate } from "react-router";
import { FC } from "react";
import { AnyAction, Dispatch } from "redux";
import { removeAllProducts } from "../../features/CartSlice";
const PaymentConfirm: FC = () => {
  const dispatch: Dispatch<AnyAction> = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const submitPayment = (accepted: boolean) => {
    dispatch(closePayment());
    if (accepted === true) {
      dispatch(acceptedPayment());
      dispatch(removeAllProducts());
    } else {
      dispatch(declinedPayment());
    }
    navigate("/payment-submit");
  };

  return (
    <section className="modal-container">
      <aside className="modal">
        <h3>If payment process is done click YES. Otherwise click NO.</h3>
        <div className="btn-container">
          <button className="btn-confirm" onClick={() => submitPayment(true)}>
            YES
          </button>
          <button className="btn-cancel" onClick={() => submitPayment(false)}>
            NO
          </button>
        </div>
      </aside>
    </section>
  );
};

export default PaymentConfirm;
