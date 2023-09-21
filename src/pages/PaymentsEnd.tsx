import { useSelector } from "react-redux";
import { RootState } from "../store";
import PaymentAccepted from "../components/PaymentAccepted";
import PaymentDeclined from "../components/PaymentDeclined";

const PaymentsEnd = () => {
  const { accepted, declined } = useSelector(
    (store: RootState) => store.payment
  );
  return accepted ? <PaymentAccepted /> : declined ? <PaymentDeclined /> : null;
};

export default PaymentsEnd;
