import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, amount } = useSelector((state: RootState) => state.cart);
  console.log(cartItems);
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
    <section>
      {[...new Set(cartItems.map((product) => product.id))].map((productId) => {
        const product = cartItems.find((item) => item.id === productId);
        return (
          <aside key={product.id}>
            <h2>{product.name}</h2>
            <img src={product.image} alt={product.name} />
            <div>
              <p>{product.desc}</p>
              <p>Quantity: {Number(product.quantity)}</p>
              <p>${product.price * product.quantity}</p>
            </div>
          </aside>
        );
      })}
    </section>
  );
};

export default Cart;
