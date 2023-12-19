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
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { addShopHistory } from "../../features/AccountSlice";
const PaymentConfirm: FC = () => {
  const dispatch: Dispatch<AnyAction> = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const saveDataPayment = () => {
    dispatch(removeAllProducts());
    dispatch(addShopHistory({ cart: cart }));
  };
  const formatDateTime = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };
  const currentDate: Date = new Date();
  const formattedDate = formatDateTime(currentDate);

  const cart = useSelector((state: RootState) => state.cart);
  const isLoggedIn = useSelector(
    (state: RootState) => state.account.isLoggedIn
  );
  const user = useSelector((state: RootState) => state.account.userData);

  const submitPayment = async (accepted: boolean) => {
    dispatch(closePayment());

    if (accepted === true) {
      dispatch(acceptedPayment());

      if (isLoggedIn) {
        const accountsQuery = query(
          collection(db, "accounts"),
          where("name", "==", user.name)
        );

        const querySnapshot = await getDocs(accountsQuery);

        if (!querySnapshot.empty) {
          const userDocRef = doc(db, "accounts", querySnapshot.docs[0].id);
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            const currentShopHistory = Array.isArray(userData.shopHistory)
              ? userData.shopHistory
              : [];
            const newShopHistoryEntry = {
              cart: cart,
              date: formattedDate,
            };
            const productsCollection = collection(db, "products");
            const cartItems = newShopHistoryEntry.cart.cartItems;

            for (const item of cartItems) {
              const productsQuery = query(
                productsCollection,
                where("name", "==", item.name)
              );
              const productsSnapshot = await getDocs(productsQuery);

              if (!productsSnapshot.empty) {
                productsSnapshot.forEach((productDoc) => {
                  const productDocRef = doc(productsCollection, productDoc.id);
                  const newInStock = productDoc.data().inStock - item.quantity;
                  updateDoc(productDocRef, { inStock: newInStock });
                });
              }
            }

            const updatedShopHistory = [
              currentShopHistory,
              newShopHistoryEntry,
            ].flatMap((entry) => entry);

            await updateDoc(userDocRef, {
              shopHistory: updatedShopHistory,
            });
          }
        }
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
        <h3>If payment process is done click YES. Otherwise click NO.</h3>
        <div className="btn-container">
          <button
            className="btn-confirm"
            onClick={() => {
              submitPayment(true);
              navigate("/payment-submit");
            }}
          >
            YES
          </button>
          <button
            className="btn-cancel"
            onClick={() => {
              navigate("/payment-submit");
              submitPayment(false);
            }}
          >
            NO
          </button>
        </div>
      </aside>
    </section>
  );
};

export default PaymentConfirm;
