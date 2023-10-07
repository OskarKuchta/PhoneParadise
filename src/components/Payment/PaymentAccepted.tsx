import { FC, useState, useEffect } from "react";
import { Rating } from "@smastrom/react-rating";
import Footertext from "../Footer/Footertext";
import { NavigateFunction, useNavigate } from "react-router";
import { FirebaseApp, initializeApp } from "firebase/app";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  onSnapshot,
  getFirestore,
  Firestore,
  CollectionReference,
  DocumentData,
  Query,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { FirebaseConfig, RatingData } from "../../Types/Types";
import { Unsubscribe } from "redux";

const firebaseConfig: FirebaseConfig = {
  apiKey: "AIzaSyDxloi2QFu7gcImAbsCz_wqjcQYhAfiPaA",
  authDomain: "phone-paradise.firebaseapp.com",
  projectId: "phone-paradise",
  storageBucket: "phone-paradise.appspot.com",
  messagingSenderId: "342601028672",
  appId: "1:342601028672:web:4ca8b36533ed7fe6237ba5",
  measurementId: "G-9LX4PNP9DC",
};
const app: FirebaseApp = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);

const PaymentAccepted: FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const [average, setAverage] = useState<number>(0);
  const [counter, setCounter] = useState<number>(10);
  const [rating, setRating] = useState<number>(0);
  const [showText, setShowText] = useState<boolean>(false);
  const [rateLength, setRateLength] = useState<number>(0);
  const ratingsCollection: CollectionReference<DocumentData, DocumentData> =
    collection(db, "ratings");
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
    const ratingsQuery: Query<DocumentData, DocumentData> =
      query(ratingsCollection);

    const fetchData = async () => {
      const rate: Unsubscribe = onSnapshot(ratingsQuery, (snapshot) => {
        const ratingsData: RatingData[] = [];
        snapshot.forEach(
          (doc: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
            ratingsData.push({ id: doc.id, ...doc.data() });
          }
        );
        const sum: number = ratingsData.reduce(
          (total, rating) => total + rating.rate,
          0
        );
        const averageRating: number =
          ratingsData.length > 0
            ? Number((sum / ratingsData.length).toFixed(2))
            : 0;
        setAverage(averageRating);
        setRateLength(ratingsData.length);
      });
      return () => rate();
    };

    fetchData();
  }, []);
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
      <Rating
        style={{ maxWidth: 250 }}
        value={rating}
        onChange={showText ? undefined : setRating}
      />
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
