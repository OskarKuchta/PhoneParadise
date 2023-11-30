import { FC, useState, useEffect } from "react";
import { Rating } from "@smastrom/react-rating";
import Footertext from "../Footer/DesktopFooter";
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
import { FirebaseConfig, RatingData } from "../../Types";
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
      } catch (error) {
        console.error("Error sending vote:", error);
      }
    }
  };
  useEffect(() => {
    if (showText) {
      const intervalId = setInterval(() => {
        setCounter((prev) => {
          const newCounter = prev - 1;
          if (newCounter === 0) {
            clearInterval(intervalId);
            navigate("/");
            return 10;
          }
          return newCounter;
        });
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [showText, navigate]);
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
  }, [ratingsCollection]);

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
      <div>
        <button onClick={getRating} disabled={showText ? true : false}>
          Send rating
        </button>
        <button style={{ marginLeft: "0.5rem" }} onClick={() => navigate("/")}>
          Back to main page
        </button>
      </div>
      {showText ? (
        <aside className="rating-thanks">
          <i>
            Thank you for rating, have a good day. You will redirected to main
            page for {counter} seconds
          </i>
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
