import { useDispatch } from "react-redux";
import { close } from "../features/ModalSlice";
import { removeAllProducts } from "../features/CartSlice";
import { FC } from "react";
import { Dispatch, AnyAction } from "redux";

const Modal: FC = () => {
  const dispatch: Dispatch<AnyAction> = useDispatch();
  const removeAllCart = () => {
    dispatch(removeAllProducts());
    dispatch(close());
  };
  const closeModal = () => {
    dispatch(close());
  };
  return (
    <section className="modal-container">
      <aside className="modal">
        <h3>Remove all items from your shopping cart?</h3>
        <div className="btn-container">
          <button className="btn-confirm" onClick={removeAllCart}>
            CONFIRM
          </button>
          <button className="btn-cancel" onClick={closeModal}>
            CANCEL
          </button>
        </div>
      </aside>
    </section>
  );
};

export default Modal;
