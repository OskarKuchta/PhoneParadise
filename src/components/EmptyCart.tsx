import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <section className="empty-cart">
      <h2>Currently, there are no items in the cart...</h2>
      <h3>Add some item and back to cart.</h3>
      <Link to="/">
        <button tabIndex={0}>Back to shopping</button>
      </Link>
    </section>
  );
};

export default EmptyCart;
