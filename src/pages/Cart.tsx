import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { Link } from "react-router-dom";
import {
  increaseProductAmount,
  decreaseProductAmount,
} from "../features/CartSlice";
import { ChevronDown, ChevronUp } from "../assets/icons";

const Cart = () => {
  const { cartItems, amount } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const increase = (productId: number) => {
    dispatch(increaseProductAmount({ productId }));
  };
  const decrease = (productId: number) => {
    dispatch(decreaseProductAmount({ productId }));
  };
  if (amount < 1) {
    return (
      <div className="empty-cart">
        <h2>Currently, there are no items in the cart...</h2>
        <h3>Add some item and back to cart.</h3>
        <Link to="/">
          <button tabIndex={0}>Back to shopping</button>
        </Link>
      </div>
    );
  }
  return (
    <section className="cart">
      <h2 className="cart-header">Your cart:</h2>
      {[...new Set(cartItems.map((product) => product.id))].map((productId) => {
        const product = cartItems.find((item) => item.id === productId);
        return (
          <aside className="cart-product" key={product.id}>
            <div className="product-top">
              <h2>{product.name}</h2>
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-quantity">
              <p>Quantity: {Number(product.quantity)}</p>
              <div className="quantity-icons">
                <button onClick={() => increase(product.id)}>
                  <ChevronUp />
                </button>
                <button onClick={() => decrease(product.id)}>
                  <ChevronDown />
                </button>
              </div>
            </div>
            <p>Cost: ${product.price * product.quantity}</p>
          </aside>
        );
      })}
    </section>
  );
};

export default Cart;
