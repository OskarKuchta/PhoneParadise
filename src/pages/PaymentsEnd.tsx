import { useSelector } from "react-redux";
import { RootState } from "../store";
import PaymentAccepted from "../components/Payment/PaymentAccepted";
import PaymentDeclined from "../components/Payment/PaymentDeclined";
import Expired from "../components/Expired";

const PaymentsEnd = () => {
  const { accepted, declined } = useSelector(
    (store: RootState) => store.payment
  );
  return accepted ? (
    <PaymentAccepted />
  ) : declined ? (
    <PaymentDeclined />
  ) : (
    <Expired />
  );
};

export default PaymentsEnd;
