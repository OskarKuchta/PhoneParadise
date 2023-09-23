import { FC, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import Footertext from "../Footer/Footertext";

const PaymentAccepted: FC = () => {
  const [rating, setRating] = useState(0);
  const getRating = () => {};
  return (
    <section className="payment-accepted">
      <h2>
        Thank you for trust. Proof of payment and numer of shipments will be
        send on your e-mail.
      </h2>
      <h3>We'll be glad if you can leave a rating for shopping experience.</h3>
      <Rating style={{ maxWidth: 250 }} value={rating} onChange={setRating} />
      <button onClick={getRating}>Send rating</button>
      <Footertext />
    </section>
  );
};

export default PaymentAccepted;
