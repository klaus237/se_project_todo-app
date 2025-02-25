import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;

    // Corrected _popup to _popupElement
    this._form = this._popupElement.querySelector("form");
    this._inputList = Array.from(this._form.querySelectorAll("input"));
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    console.log("Input Values:", formValues);
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      console.log("Form Submitted!");
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
      this.close();
      this._form.reset();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}

export default PopupWithForm;
