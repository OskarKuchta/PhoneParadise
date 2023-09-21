import { Link } from "react-router-dom";
import { FC } from "react";
const EmptyCart: FC = () => {
  return (
    <section className="empty-cart">
      <h2>Currently, there are no items in the cart...</h2>
      <h3>Add some item and back to cart.</h3>
      <Link to="/" aria-label="Back to main page">
        <button tabIndex={0}>Back to shopping</button>
      </Link>
    </section>
  );
};

export default EmptyCart;
