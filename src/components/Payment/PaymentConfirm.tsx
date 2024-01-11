import { useDispatch, useSelector } from "react-redux";
import {
  closePayment,
  acceptedPayment,
  declinedPayment,
} from "../../features/PaymentSlice";
import { NavigateFunction, useNavigate } from "react-router";
import { FC } from "react";
import { AnyAction, Dispatch } from "redux";
import { removeAllProducts } from "../../features/CartSlice";
import { RootState } from "../../store";
import { db } from "../../assets/FirebaseConfig";
import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  Query,
  QuerySnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { addShopHistory } from "../../features/AccountSlice";
import { CartItems } from "../../Types/Types";
import { useTranslation } from "react-i18next";
const PaymentConfirm: FC = () => {
  const dispatch: Dispatch<AnyAction> = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const saveDataPayment = () => {
    dispatch(removeAllProducts());
    dispatch(addShopHistory({ cart: cart }));
  };
  const { t } = useTranslation();
  const formatDateTime = (date: Date) => {
    const day: string = String(date.getDate()).padStart(2, "0");
    const month: string = String(date.getMonth() + 1).padStart(2, "0");
    const year: number = date.getFullYear();
    const hours: string = String(date.getHours()).padStart(2, "0");
    const minutes: string = String(date.getMinutes()).padStart(2, "0");
    const seconds: string = String(date.getSeconds()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };
  const currentDate: Date = new Date();
  const formattedDate: string = formatDateTime(currentDate);

  const cart = useSelector((state: RootState) => state.cart) as any;
  const isLoggedIn = useSelector(
    (state: RootState) => state.account.isLoggedIn
  );
  const user = useSelector((state: RootState) => state.account.userData);
  const removeFromStock = async (source: CartItems[]) => {
    const productsCollection: CollectionReference<DocumentData> = collection(
      db,
      "products"
    );
    for (const item of source) {
      const productsQuery: Query<DocumentData> = query(
        productsCollection,
        where("name", "==", item.name)
      );
      const productsSnapshot: QuerySnapshot<DocumentData> = await getDocs(
        productsQuery
      );

      if (!productsSnapshot.empty) {
        productsSnapshot.forEach((productDoc) => {
          const productDocRef: DocumentReference<DocumentData> = doc(
            productsCollection,
            productDoc.id
          );
          const newInStock: number = productDoc.data().inStock - item.quantity;
          updateDoc(productDocRef, { inStock: newInStock });
        });
      }
    }
  };
  const submitPayment = async (accepted: boolean) => {
    dispatch(closePayment());

    if (accepted === true) {
      dispatch(acceptedPayment());

      if (isLoggedIn) {
        const accountsQuery: Query<DocumentData> = query(
          collection(db, "accounts"),
          where("name", "==", user.name)
        );

        const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
          accountsQuery
        );

        if (!querySnapshot.empty) {
          const userDocRef: DocumentReference<DocumentData> = doc(
            db,
            "accounts",
            querySnapshot.docs[0].id
          );
          const userDocSnapshot: DocumentSnapshot<DocumentData> = await getDoc(
            userDocRef
          );

          if (userDocSnapshot.exists()) {
            const userData: DocumentData = userDocSnapshot.data();
            const currentShopHistory: any[] = Array.isArray(
              userData.shopHistory
            )
              ? userData.shopHistory
              : [];
            const newShopHistoryEntry = {
              cart: cart,
              date: formattedDate,
            };

            const cartItems: CartItems[] = newShopHistoryEntry.cart.cartItems;

            const updatedShopHistory = [
              currentShopHistory,
              newShopHistoryEntry,
            ].flatMap((entry) => entry);
            removeFromStock(cartItems);

            await updateDoc(userDocRef, {
              shopHistory: updatedShopHistory,
            });
          }
        }
      } else {
        removeFromStock(cart.cartItems);
      }
      saveDataPayment();
    } else {
      dispatch(declinedPayment());
    }

    navigate("/payment-submit");
  };

  return (
    <section className="modal-container">
      <aside className="modal">
        <h3>{t("payment-confirm")}</h3>
        <div className="btn-container">
          <button
            className="btn-confirm"
            onClick={() => {
              submitPayment(true);
              navigate("/payment-submit");
            }}
          >
            {t("yes")}
          </button>
          <button
            className="btn-cancel"
            onClick={() => {
              navigate("/payment-submit");
              submitPayment(false);
            }}
          >
            {t("no")}
          </button>
        </div>
      </aside>
    </section>
  );
};

export default PaymentConfirm;
