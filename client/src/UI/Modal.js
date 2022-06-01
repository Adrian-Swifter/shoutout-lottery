function Modal({ modalMessage, setModalOpen }) {
  return (
    <div className="modal-background">
      <div className="modal-container">
        <div className="title-close-btn">
          <button onClick={() => setModalOpen(false)}>X</button>
        </div>

        <header>
          <i className="fa-solid fa-circle-info"></i>
        </header>
        <main className="body">{modalMessage}</main>
        <footer>
          <button onClick={() => setModalOpen(false)}>OK</button>
        </footer>
      </div>
    </div>
  );
}

export default Modal;
