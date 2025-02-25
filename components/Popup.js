class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscapeClose = this._handleEscapeClose.bind(this);
    this._popupCloseBtn = this._popupElement.querySelector(".popup__close");
  }

  open() {
    this._popupElement.classList.add("popup_visible");
    document.addEventListener("keyup", this._handleEscapeClose);
  }

  close() {
    this._popupElement.classList.remove("popup_visible");
    document.removeEventListener("keyup", this._handleEscapeClose);
  }

  _handleEscapeClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement
      .querySelector(".popup__close")
      .addEventListener("click", () => this.close());

    this._popupElement.addEventListener("mousedown", (event) => {
      if (event.target === this._popupElement) {
        this.close();
      }
    });
    this._popupCloseBtn.addEventListener("click", () => {
      this.close();
    });
  }
}

export default Popup;
