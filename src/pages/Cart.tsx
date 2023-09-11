import EmptyCart from "../components/EmptyCart";
import CartProducts from "../components/CartProducts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { removeAllProducts } from "../features/CartSlice";
const Cart = () => {
  const dispatch = useDispatch();
  const { amount, total } = useSelector((store: RootState) => store.cart);
  const removeAll = () => {
    dispatch(removeAllProducts());
  };
  if (amount < 1) {
    return <EmptyCart />;
  }
  return (
    <>
      <CartProducts />
      <section className="cart-bottom">
        <h2>Total: ${total}</h2>
        <button className="cart-payments">Go to payments</button>
        <button onClick={removeAll} className="cart-remove">
          Remove cart
        </button>
      </section>
    </>
  );
};

export default Cart;
