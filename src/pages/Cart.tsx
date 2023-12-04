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
        <main>
          <CartProducts />
          <Discount />
          <section className="flex flex-col md:flex-row justify-center md:justify-around items-center mb-12 md:mb-16">
            <h2 className="text-center mb-8 md:mb-0">
              Total:
              {isDiscount ? (
                <p>
                  <s className="mr-2">${total}</s> $
                  {withDiscount?.toFixed(2).replace(/\.00$/, "")}
                </p>
              ) : (
                ` $${total}`
              )}
              {isDiscount ? (
                <span className="text-[0.8rem]">
                  ($
                  {Number(total - withDiscount)
                    .toFixed(2)
                    .replace(/\.00$/, "")}
                  ) save
                </span>
              ) : (
                ""
              )}
            </h2>
            <button
              className="button-withArrow py-[0.7rem] px-12 mb-8 md:mb-0"
              onClick={navigateToPayments}
            >
              Go to payments
            </button>
            <button
              onClick={openModal}
              className="py-[0.7rem] px-12 border-2 border-red shadow-md rounded-md outline-none transition-all duration-1000 ease-in-out hover:bg-red focus:bg-red hover:text-lightGray focus:text-lightGray mb-8 md:mb-0"
            >
              Remove cart
            </button>
          </section>
        </main>
      )}
    </>
  );
};

export default Cart;
