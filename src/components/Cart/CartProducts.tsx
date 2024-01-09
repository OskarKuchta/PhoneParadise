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
import { CartItems } from "../../Types/Types";
import { useTranslation } from "react-i18next";

const CartProducts: FC = () => {
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const { t } = useTranslation();
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
    <section className="flex flex-col items-center m-8">
      <h2 className="text-center text-2xl mb-8">{t("your-cart")}:</h2>
      {[...new Set(cartItems.map((product) => product.id))].map((productId) => {
        const product: CartItems = cartItems.find(
          (item) => item.id === productId
        );
        return (
          <aside
            className=" bg-[aliceblue] w-full flex flex-col justify-center items-center md:flex-row py-12 px-8 border rounded-lg mb-4 "
            key={product.id}
          >
            <div className="flex-[33%]">
              <h2 className="my-2 w-[150px] text-center">{product.name}</h2>
              <img
                className="mb-4 md:mb-0"
                src={product.image}
                alt={product.name}
                loading="lazy"
              />
            </div>
            <div className="mb-4 md:mb-0 flex-[33%] flex-col justify-center items-center">
              <div className="flex items-center mb-4">
                <p>
                  {t("quantity")}: {Number(product.quantity)}
                </p>
                <div className="w-4 flex flex-col ml-2">
                  <button onClick={() => increase(product.id)}>
                    <ChevronUp />
                  </button>
                  <button onClick={() => decrease(product.id)}>
                    <ChevronDown />
                  </button>
                </div>
              </div>
              <div>
                <button
                  className="p-2 pl-6 pr-6 border-2 border-red shadow-md rounded-md outline-none transition-all duration-1000 ease-in-out hover:bg-red focus:bg-red hover:text-lightGray focus:text-lightGray"
                  onClick={() => remove(product.id)}
                >
                  {t("remove")}
                </button>
              </div>
            </div>
            <p>
              {t("cost")}: ${product.price * product.quantity}
            </p>
          </aside>
        );
      })}
    </section>
  );
};

export default CartProducts;
