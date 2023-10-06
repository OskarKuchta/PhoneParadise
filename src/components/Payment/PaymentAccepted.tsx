import { FC, useState, useEffect } from "react";
import { Rating } from "@smastrom/react-rating";
import Footertext from "../Footer/Footertext";
import { NavigateFunction, useNavigate } from "react-router";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDxloi2QFu7gcImAbsCz_wqjcQYhAfiPaA",
  authDomain: "phone-paradise.firebaseapp.com",
  projectId: "phone-paradise",
  storageBucket: "phone-paradise.appspot.com",
  messagingSenderId: "342601028672",
  appId: "1:342601028672:web:908920a6f3fb7a7e237ba5",
  measurementId: "G-0WW23REF0B",
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(analytics);
const db = getFirestore(app);
const PaymentAccepted: FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const [average, setAverage] = useState<number>(0);
  const [counter, setCounter] = useState<number>(10);
  const [rating, setRating] = useState<number>(0);
  const [showText, setShowText] = useState<boolean>(false);
  const [rateLength, setRateLength] = useState<number>(0);
  const getRating = async () => {
    if (rating !== 0) {
      try {
        const rate = rating;
        await axios.post(
          "https://phoneparadise.netlify.app/.netlify/functions/index/vote",
          { rate }
        );
        const ratingsCollection = collection(db, "ratings");
        await addDoc(ratingsCollection, {
          rate,
          timestamp: serverTimestamp(),
        });
        console.log(
          addDoc(ratingsCollection, {
            rate,
            timestamp: serverTimestamp(),
          })
        );
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
        setRateLength(rate.length);
        setAverage(average);
      } catch (error) {
        console.error("Problem with show average");
      }
    };
    showAverage();
  }, []);
  useEffect(() => {
    if (showText) {
      const intervalId: ReturnType<typeof setInterval> = setInterval(() => {
        setCounter((counter) => counter - 1);
      }, 1000);
      if (counter == 0) {
        navigate("/");
        return () => {
          clearInterval(intervalId);
          setCounter(10);
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
        <aside className="rating-thanks">
          <i>Thank you for rating, have a good day.</i>
          <br />
        </aside>
      ) : null}
      <i style={{ marginTop: "2rem" }}>
        Average rating: {average} / 5 ({rateLength})
      </i>
      <Footertext />
    </section>
  );
};

export default PaymentAccepted;
