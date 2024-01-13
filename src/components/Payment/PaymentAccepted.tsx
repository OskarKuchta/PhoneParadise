import { FC, useState, useEffect } from "react";
import { Rating } from "@smastrom/react-rating";
import DesktopFooter from "../Footer/DesktopFooter";
import { NavigateFunction, useNavigate } from "react-router";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  onSnapshot,
  CollectionReference,
  DocumentData,
  Query,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "../../assets/FirebaseConfig";
import { RatingData } from "../../Types/Types";
import { Unsubscribe } from "redux";
import { useTranslation } from "react-i18next";

const PaymentAccepted: FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const [average, setAverage] = useState<number>(0);
  const [counter, setCounter] = useState<number>(15);
  const [rating, setRating] = useState<number>(0);
  const [showText, setShowText] = useState<boolean>(false);
  const [rateLength, setRateLength] = useState<number>(0);
  const { t } = useTranslation();
  const ratingsCollection: CollectionReference<DocumentData, DocumentData> =
    collection(db, "ratings");
  const getRating = async () => {
    if (rating !== 0) {
      try {
        const rate: number = rating;
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
      const intervalId: NodeJS.Timeout = setInterval(() => {
        setCounter((prev) => {
          const newCounter: number = prev - 1;
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
    <main className="mt-12 flex flex-col text-center items-center max-w-[90vw] mx-auto">
      <h2 className="text-xl">{t("thanks-after-payment")}</h2>
      <h3 className="my-8">{t("rate-ask")}</h3>
      <Rating
        style={{ maxWidth: 250 }}
        value={rating}
        onChange={showText ? undefined : setRating}
      />
      <div>
        <button
          onClick={getRating}
          disabled={showText ? true : false}
          className="mt-12 py-2 px-8 border-2 rounded border-purple transition-colors duration-500 focus:bg-purple focus:text-white focus:outline-none hover:bg-purple hover:text-white"
        >
          {t("send-rating")}
        </button>
        <button
          style={{ marginLeft: "0.5rem" }}
          className="mt-12 py-2 px-8 border-2 rounded border-purple transition-colors duration-500 focus:bg-purple focus:text-white focus:outline-none hover:bg-purple hover:text-white"
          onClick={() => navigate("/")}
        >
          {t("back-to-main")}
        </button>
      </div>
      {showText ? (
        <aside className="mt-4 text-center">
          <i>
            {t("thanks-text")} {counter} {t("seconds")}
          </i>
          <br />
        </aside>
      ) : null}
      <i style={{ marginTop: "2rem" }}>
        {t("average-rating")}: {average} / 5{" "}
        <span
          style={{
            fontSize: "12px",
            marginLeft: "0.5rem",
          }}
        >
          ({rateLength})
        </span>
      </i>
      <DesktopFooter />
    </main>
  );
};

export default PaymentAccepted;
