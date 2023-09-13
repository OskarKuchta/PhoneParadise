import PaymentTop from "./PaymentTop";
const PaymentStart = () => {
  return (
    <section className="payment-start">
      <PaymentTop />
      <div className="payments-start-bottom">
        <h3>
          You will be redirected to your bank's website shortly. To proceed,
          click the button below or wait a few seconds.
        </h3>
        <button>To payment</button>
      </div>
    </section>
  );
};

export default PaymentStart;
