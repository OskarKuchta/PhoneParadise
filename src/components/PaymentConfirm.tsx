import { useDispatch } from "react-redux";
import {
  closePayment,
  acceptedPayment,
  declinedPayment,
} from "../features/PaymentSlice";
import { useNavigate } from "react-router";

const PaymentConfirm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const acceptPayment = () => {
  //   dispatch(closePayment());
  //   dispatch(acceptedPayment());
  //   naviagte("/payment-submit");
  //   dispatch(resetPaymentState());
  // };
  // const declinePayment = () => {
  //   dispatch(closePayment());
  //   dispatch(declinedPayment());
  //   naviagte("/payment-submit");
  //   dispatch(resetPaymentState());
  // };
  const submitPayment = (accepted: boolean) => {
    dispatch(closePayment());
    if (accepted === true) {
      dispatch(acceptedPayment());
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
