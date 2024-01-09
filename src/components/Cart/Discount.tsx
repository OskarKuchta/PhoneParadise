import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCode, removeDiscount } from "../../features/CartSlice";
import { RootState } from "../../store";
import { AnyAction, Dispatch } from "redux";
import { useTranslation } from "react-i18next";

const Discount = () => {
  const dispatch: Dispatch<AnyAction> = useDispatch();
  const [inputValue, setInputValue] = useState<string>("");
  const { t } = useTranslation();
  const [invalidCode, setInvalidCode] = useState<boolean>(false);
  let { codeName, isDiscount } = useSelector((store: RootState) => store.cart);
  const addDiscount = () => {
    switch (inputValue) {
      case "winter24":
        dispatch(addCode({ percentage: 20, codeName: "winter24" }));
        setInvalidCode(false);
        break;
      case "phone15":
        dispatch(addCode({ percentage: 15, codeName: "phone15" }));
        setInvalidCode(false);
        break;
      case "paradise10":
        dispatch(addCode({ percentage: 10, codeName: "paradise10" }));
        setInvalidCode(false);
        break;
      case "":
        dispatch(removeDiscount());
        setInvalidCode(false);
        break;
      default:
        setInvalidCode(true);
        break;
    }
  };
  return (
    <div className="mx-[5%] flex flex-col justify-center items-center md:block mb-16 text-center md:text-start">
      <h2 className="text-purple text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4">
        {t("discount-code")}:
      </h2>
      <label className="block" htmlFor="discount-label">
        {t("discount-question")}?{" "}
        <span className="text-[0.8rem] ml-2 block md:inline">
          (winter24, paradise10, phone15)
        </span>
      </label>
      <input
        id="discount-label"
        className={`${
          !isDiscount && !invalidCode ? "mb-6" : ""
        } block focus:outline-purple mt-4`}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {invalidCode ? (
        <p className="text-[0.8rem] my-3 text-purple">
          {t("discount-not-exist")}
        </p>
      ) : null}
      {isDiscount ? (
        <p className="text-[0.9rem] mt-2 mb-4">
          {t("actual-discount")}: {codeName}
          <span className="text-[0.7rem] ml-2">
            {codeName === "winter24"
              ? `(20% ${t("discount-percent")})`
              : codeName === "phone15"
              ? `(15% ${t("discount-percent")})`
              : `(10% ${t("discount-percent")})`}
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
        {t("add-discount-button")}
      </button>
    </div>
  );
};

export default Discount;
