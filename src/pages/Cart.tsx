import EmptyCart from "../components/Cart/EmptyCart";
import CartProducts from "../components/Cart/CartProducts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { NavigateFunction, useNavigate } from "react-router";
import { open } from "../features/ModalSlice";
import Modal from "../components/Modal";
import { useState } from 'react';
import { addCode } from "../features/CartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const openModal = () => {
    dispatch(open());
  };
  let { amount, total, discount, isDiscount } = useSelector(
    (store: RootState) => store.cart
  );
  const { isOpen } = useSelector((store: RootState) => store.modal);
  const navigate: NavigateFunction = useNavigate();
  const navigateToPayments = () => {
    navigate("payments");
  };
  const [inputValue, setInputValue] = useState<string>("");
  const addDiscount = () => {
    if (inputValue === "winter24") {
      dispatch(addCode(20));
    }
    if (inputValue === "phone15") {
      dispatch(addCode(15));
    }
    if (inputValue === "paradise10") {
      dispatch(addCode(10));
    }
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
          <div className="m-[5%]">
            <h2 className="text-purple text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4">
              Discount code:
            </h2>
            <label className="block" htmlFor="discount-label">
              Do you have a discount code?{" "}
              <span className="text-[0.8rem] ml-2">
                (winter24, paradise10, phone15)
              </span>
            </label>
            <input
              id="discount-label"
              className="block focus:outline-purple my-4"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              className="py-2 px-6 border rounded border-purple text-sm transition-all 
          duration-500 hover:bg-purple hover:text-white hover:outline-none hover:scale-105 focus:bg-purple 
          focus:text-white focus:outline-none focus:scale-105"
              onClick={addDiscount}
            >
              Use code
            </button>
          </div>
          <section className="cart-bottom">
            <h2>Total: ${isDiscount ? discount : total} </h2>
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
