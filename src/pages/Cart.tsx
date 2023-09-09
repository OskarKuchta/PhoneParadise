import { useSelector } from "react-redux";
import { RootState } from "../store";

const Cart = () => {
  const { cartItems, amount } = useSelector((state: RootState) => state.cart);
  console.log(cartItems);
  if (amount < 1) {
    return <h2>No one in cart</h2>;
  }
  return (
    <section>
      {cartItems.map((product) => (
        <aside key={product.id}>
          <h2>{product.name}</h2>
          <img src={product.image} alt={product.name} />
          <div>
            <p>{product.desc}</p>
            <p>${product.price}</p>
          </div>
        </aside>
      ))}
    </section>
  );
};

export default Cart;
