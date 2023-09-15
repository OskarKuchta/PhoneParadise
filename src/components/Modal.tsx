const Modal = () => {
  return (
    <section className="modal-container">
      <aside className="modal">
        <h3>Remove all items from your shopping cart?</h3>
        <div className="btn-container">
          <button className="btn-confirm">CONFIRM</button>
          <button className="btn-cancel">CANCEL</button>
        </div>
      </aside>
    </section>
  );
};

export default Modal;
