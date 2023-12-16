import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCode } from "../../features/CartSlice";
import { RootState } from "../../store";
import { AnyAction, Dispatch } from "redux";

const Discount = () => {
  const dispatch: Dispatch<AnyAction> = useDispatch();
  const [inputValue, setInputValue] = useState<string>("");
  let { codeName, isDiscount } = useSelector((store: RootState) => store.cart);
  const addDiscount = () => {
    switch (inputValue) {
      case "winter24":
        dispatch(addCode({ percentage: 20, codeName: "winter24" }));
        break;
      case "phone15":
        dispatch(addCode({ percentage: 15, codeName: "phone15" }));
        break;
      case "paradise10":
        dispatch(addCode({ percentage: 10, codeName: "paradise10" }));
        break;
      default:
        dispatch(addCode({ percentage: 0, codeName: "" }));
        break;
    }
  };
  return (
    <div className="mx-[5%] flex flex-col justify-center items-center md:block mb-16 text-center md:text-start">
      <h2 className="text-purple text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4">
        Discount code:
      </h2>
      <label className="block" htmlFor="discount-label">
        Do you have a discount code?{" "}
        <span className="text-[0.8rem] ml-2 block md:inline">
          (winter24, paradise10, phone15)
        </span>
      </label>
      <input
        id="discount-label"
        className={`${
          !isDiscount ? "mb-6" : ""
        } block focus:outline-purple mt-4`}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {isDiscount ? (
        <p className="text-[0.9rem] mt-2 mb-4">
          You have already used code: {codeName}
          <span className="text-[0.7rem] ml-2">
            {codeName === "winter24"
              ? "(20% discount)"
              : codeName === "phone15"
              ? "(15% discount)"
              : "(10% discount)"}
          </span>
        </p>
      ) : (
        ""
      )}
      <button
        className="py-2 px-6 border rounded border-purple text-sm transition-all 
          duration-500 hover:bg-purple hover:text-white hover:outline-none hover:scale-105 focus:bg-purple 
          focus:text-white focus:outline-none focus:scale-105"
        onClick={addDiscount}
      >
        Use code
      </button>
    </div>
  );
};

export default Discount;
