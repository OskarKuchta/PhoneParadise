import { FC, useState, useEffect } from "react";
import { Rating } from "@smastrom/react-rating";
import Footertext from "../Footer/Footertext";
import { NavigateFunction, useNavigate } from "react-router";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  onSnapshot,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLZr80Hx_wzZzWSuJ8n5fYxQdCwFTcfKI",
  authDomain: "phone-paradise-76d3a.firebaseapp.com",
  projectId: "phone-paradise-76d3a",
  storageBucket: "phone-paradise-76d3a.appspot.com",
  messagingSenderId: "115318917346",
  appId: "1:115318917346:web:e9234b142a33af2ed0b6bb",
  measurementId: "G-02GG8VGCJM",
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
  const ratingsCollection = collection(db, "ratings");

  const getRating = async () => {
    if (rating !== 0) {
      try {
        const rate = rating;
        await addDoc(ratingsCollection, {
          rate,
          timestamp: serverTimestamp(),
        });
        setShowText(true);
        setRating(0);
        console.log("Vote sent successfully");
      } catch (error) {
        console.error("Error sending vote:", error);
      }
    }
  };

  useEffect(() => {
    const ratingsQuery = query(ratingsCollection);

    const fetchData = async () => {
      const unsubscribe = onSnapshot(ratingsQuery, (snapshot) => {
        const ratingsData = [];
        snapshot.forEach((doc) => {
          ratingsData.push({ id: doc.id, ...doc.data() });
        });
        const sum = ratingsData.reduce(
          (total, rating) => total + rating.rate,
          0
        );
        const averageRating =
          ratingsData.length > 0
            ? Number((sum / ratingsData.length).toFixed(2))
            : 0;
        console.log(sum, averageRating);
        setAverage(averageRating);
        setRateLength(ratingsData.length);
      });
      return () => unsubscribe();
    };

    fetchData();
  }, [ratingsCollection]);
  useEffect(() => {
    if (showText) {
      const intervalId: ReturnType<typeof setInterval> = setInterval(() => {
        setCounter((counter) => counter - 1);
      }, 1000);
      if (counter === 0) {
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
        Average rating: {average} / 5{" "}
        <span
          style={{
            fontSize: "12px",
            marginLeft: "0.5rem",
          }}
        >
          ({rateLength})
        </span>
      </i>
      <Footertext />
    </section>
  );
};

export default PaymentAccepted;
