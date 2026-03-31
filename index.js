const items = [
  "Сделать проектную работу",
  "Полить цветы",
  "Пройти туториал по Реакту",
  "Сделать фронт для своего проекта",
  "Прогуляться по улице в солнечный день",
  "Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
  const savedTasks = localStorage.getItem("tasksList");
  if (savedTasks) {
    return JSON.parse(savedTasks);
  }
  return [...items];
}

function createItem(item) {
  const template = document.getElementById("to-do__item-template");
  const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  const editButton = clone.querySelector(".to-do__item-button_type_edit");

  textElement.textContent = item;

  // Удаление
  deleteButton.addEventListener("click", () => {
    clone.remove();
    saveTasks(getTasksFromDOM());
  });

  // Копирование
  duplicateButton.addEventListener("click", () => {
    const newItem = createItem(item);
    listElement.prepend(newItem);
    saveTasks(getTasksFromDOM());
  });

  // Редактирование
  editButton.addEventListener("click", () => {
    textElement.setAttribute("contenteditable", "true");
    textElement.focus();
  });

  textElement.addEventListener("blur", () => {
    textElement.setAttribute("contenteditable", "false");
    saveTasks(getTasksFromDOM());
  });

  return clone;
}

// Сбор задач из разметки в массив
function getTasksFromDOM() {
  const itemsNamesElements = document.querySelectorAll(".to-do__item-text");
  const tasks = [];
  itemsNamesElements.forEach((el) => {
    tasks.push(el.textContent);
  });
  return tasks;
}

// Сохранение задач в localStorage
function saveTasks(tasks) {
  localStorage.setItem("tasksList", JSON.stringify(tasks));
}

// добавление новой задачи
formElement.addEventListener("submit", (event) => {
  event.preventDefault(); // нет перезагрузке

  const newTaskText = inputElement.value.trim();
  if (newTaskText === "") return;

  const newItem = createItem(newTaskText);
  listElement.prepend(newItem);
  saveTasks(getTasksFromDOM());

  inputElement.value = "";
  inputElement.focus();
});

// Инициализация при загрузке
const initialTasks = loadTasks();
initialTasks.forEach((task) => {
  listElement.append(createItem(task));
});