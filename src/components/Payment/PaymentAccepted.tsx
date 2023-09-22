import { FC } from "react";

const PaymentAccepted: FC = () => {
  return (
    <section className="payment-accepted">
      <h2>
        Thank you for trust. Proof of payment and numer of shipments will be
        send on your e-mail.
      </h2>

      <h3>We'll be glad if you can leave a rating for shopping experience.</h3>

      <button>Send rating</button>
    </section>
  );
};

export default PaymentAccepted;
