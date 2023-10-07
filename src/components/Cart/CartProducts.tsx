import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  increaseProductAmount,
  decreaseProductAmount,
  removeProduct,
} from "../../features/CartSlice";
import { ChevronDown, ChevronUp } from "../../assets/icons";
import { AnyAction, Dispatch } from "redux";
import { FC } from "react";

const CartProducts: FC = () => {
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const dispatch: Dispatch<AnyAction> = useDispatch();
  const increase = (productId: number) => {
    dispatch(increaseProductAmount({ productId }));
  };
  const decrease = (productId: number) => {
    dispatch(decreaseProductAmount({ productId }));
  };
  const remove = (productId: number) => {
    dispatch(removeProduct({ productId }));
  };
  return (
    <section className="cart">
      <h2 className="cart-header">Your cart:</h2>
      {[...new Set(cartItems.map((product) => product.id))].map((productId) => {
        const product = cartItems.find((item) => item.id === productId);
        return (
          <aside className="cart-product" key={product.id}>
            <div className="product-main">
              <h2 className="product-name">{product.name}</h2>
              <img src={product.image} alt={product.name} loading="lazy"/>
            </div>
            <div className="product-quantity">
              <div className="quantity-top">
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
              <div className="quantity-bottom">
                <button onClick={() => remove(product.id)}>Remove</button>
              </div>
            </div>
            <p>Cost: ${product.price * product.quantity}</p>
          </aside>
        );
      })}
    </section>
  );
};

export default CartProducts;
