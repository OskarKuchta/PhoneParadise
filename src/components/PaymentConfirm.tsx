import { useDispatch } from "react-redux";
import { closePayment } from "../features/PaymentSlice";

const PaymentConfirm = () => {
  const dispatch = useDispatch();

  const accpetedPayment = () => {
    dispatch(closePayment());
  };
  const declinedPayment = () => {
    dispatch(closePayment());
  };
  return (
    <section className="modal-container">
      <aside className="modal">
        <h3>If payment process is done click YES. Otherwise click NO.</h3>
        <div className="btn-container">
          <button className="btn-confirm" onClick={accpetedPayment}>
            YES
          </button>
          <button className="btn-cancel" onClick={declinedPayment}>
            NO
          </button>
        </div>
      </aside>
    </section>
  );
};

export default PaymentConfirm;
