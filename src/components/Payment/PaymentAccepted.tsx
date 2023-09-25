import { FC, useState, useEffect } from "react";
import { Rating } from "@smastrom/react-rating";
import Footertext from "../Footer/Footertext";
import { NavigateFunction, useNavigate } from "react-router";
import axios from "axios";
const PaymentAccepted: FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const [average, setAverage] = useState<number>(0);
  const [counter, setCounter] = useState<number>(5);
  const [rating, setRating] = useState<number>(0);
  const [showText, setShowText] = useState<boolean>(false);
  const getRating = async () => {
    if (rating !== 0) {
      try {
        const rate = rating;
        await axios.post("/.netlify/functions/index/vote", { rate });
        setShowText(true);
        setRating(0);
        console.log("Vote sent successfully");
      } catch (error) {
        console.error("Error sending vote:", error);
      }
    }
  };
  useEffect(() => {
    const showAverage = async () => {
      try {
        const res = await axios.get(
          "https://phoneparadise.netlify.app/.netlify/functions/index/vote"
        );
        const response = res.data;
        const rate = response.default.map(
          (item: { date: Date; rate: number }) => (item.rate ? item.rate : 5)
        );
        const sum = rate.reduce((a: number, b: number) => a + b, 0);
        const average = Number((sum / rate.length).toFixed(2));
        setAverage(average)
      } catch (error) {
        console.error("Problem with show average");
      }
    };
    showAverage();
  }, []);
  useEffect(() => {
    if (showText) {
      const intervalId = setInterval(() => {
        setCounter((counter) => counter - 1);
      }, 1000);
      if (counter == 0) {
        navigate("/");
        return () => {
          clearInterval(intervalId);
          setCounter(5);
        };
      }
    }
  }, [showText, counter]);
  return (
    <section className="payment-accepted">
      <h2>
        Thank you for trust. Proof of payment and numer of shipments will be
        send on your e-mail.
      </h2>
      <h3>We'll be glad if you can leave a rating for shopping experience.</h3>
      <Rating style={{ maxWidth: 250 }} value={rating} onChange={setRating} />
      <button onClick={getRating}>Send rating</button>
      {showText ? (
        <p className="rating-thanks">
          <i>Thank you for rating, have a good day.</i>
          <p>Average rating: {average} / 5</p>
        </p>
      ) : null}
      <Footertext />
    </section>
  );
};

export default PaymentAccepted;
