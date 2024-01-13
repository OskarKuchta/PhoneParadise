import { useDispatch } from "react-redux";
import { close } from "../features/ModalSlice";
import { removeAllProducts } from "../features/CartSlice";
import { FC } from "react";
import { Dispatch, AnyAction } from "redux";
import { useTranslation } from "react-i18next";

const Modal: FC = () => {
  const dispatch: Dispatch<AnyAction> = useDispatch();
  const removeAllCart = () => {
    dispatch(removeAllProducts());
    dispatch(close());
  };
  const closeModal = () => {
    dispatch(close());
  };
  const { t } = useTranslation();
  return (
    <section className="modal-container">
      <aside className="modal">
        <h3>{t("remove-question")}</h3>
        <div className="btn-container">
          <button className="btn-confirm" onClick={removeAllCart}>
            {t("confirm")}
          </button>
          <button className="btn-cancel" onClick={closeModal}>
            {t("cancel")}
          </button>
        </div>
      </aside>
    </section>
  );
};

export default Modal;
