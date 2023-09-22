import EmptyCart from "../components/Cart/EmptyCart";
import CartProducts from "../components/Cart/CartProducts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { NavigateFunction, useNavigate } from "react-router";
import { open } from "../features/ModalSlice";
import Modal from "../components/Modal";

const Cart = () => {
  const dispatch = useDispatch();
  const openModal = () => {
    dispatch(open());
  };
  const { amount, total } = useSelector((store: RootState) => store.cart);
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
          <section className="cart-bottom">
            <h2>Total: ${total}</h2>
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
