import EmptyCart from "../components/Cart/EmptyCart";
import CartProducts from "../components/Cart/CartProducts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { NavigateFunction, useNavigate } from "react-router";
import { open } from "../features/ModalSlice";
import Modal from "../components/Modal";
import Discount from "../components/Cart/Discount";
import { AnyAction, Dispatch } from "redux";

const Cart = () => {
  const dispatch: Dispatch<AnyAction> = useDispatch();
  const openModal = () => {
    dispatch(open());
  };
  let { amount, total, withDiscount, isDiscount } = useSelector(
    (store: RootState) => store.cart
  );
  const { isOpen } = useSelector((store: RootState) => store.modal);
  const navigate: NavigateFunction = useNavigate();
  const navigateToPayments = () => {
    navigate("payments");
  };

  if (amount < 1) {
    return <EmptyCart />;
  }
  return (
    <>
      {isOpen ? (
        <Modal />
      ) : (
        <>
          <CartProducts />
          <Discount />
          <section className="cart-bottom">
            <h2 className="text-center">
              Total:
              {isDiscount ? (
                <p>
                  <s className="mr-2">${total}</s> ${withDiscount}
                </p>
              ) : (
                total
              )}
              <span className="text-[0.8rem]">
                (${Number(total - withDiscount).toFixed(2)}) save
              </span>
            </h2>
            <button className="cart-payments" onClick={navigateToPayments}>
              Go to payments
            </button>
            <button onClick={openModal} className="cart-remove">
              Remove cart
            </button>
          </section>
        </>
      )}
    </>
  );
};

export default Cart;
