import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.forms["add-todo-form"];
const todosCounter = new TodoCounter(initialTodos, ".counter__text");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (formData) => {
    const { name, date } = formData;
    const dateObj = new Date(date);
    dateObj.setMinutes(dateObj.getMinutes() + dateObj.getTimezoneOffset());

    const newTodo = {
      name,
      date: dateObj,
      completed: false,
      id: uuidv4(),
    };

    renderTodo(newTodo);
    todosCounter.updateTotal(true);
  },
});

addTodoPopup.setEventListeners();

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  const todoElement = todo.getView();

  // Handle checkbox toggle
  const checkbox = todoElement.querySelector(".todo__completed");
  checkbox.addEventListener("change", (event) => {
    const isChecked = event.target.checked;
    todosCounter.updateCompleted(isChecked);
  });

  // Handle delete button click
  const deleteButton = todoElement.querySelector(".todo__delete-btn");
  deleteButton.addEventListener("click", () => {
    todoElement.remove();

    todosCounter.updateTotal(false);

    if (checkbox.checked) {
      todosCounter.updateCompleted(false);
    }
  });

  return todoElement;
};

const section = new Section({
  items: initialTodos,
  renderer: (todo) => {
    const todoElement = generateTodo(todo);
    section.addItem(todoElement);
  },
  containerSelector: ".todos__list",
});

section.renderItems();

const renderTodo = (item) => {
  const todoElement = generateTodo(item);
  section.addItem(todoElement);
};

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
