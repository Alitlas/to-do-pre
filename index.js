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

// Загрузка задач из localStorage или начального массива
function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    return JSON.parse(savedTasks);
  }
  return [...items];
}

// Создание элемента задачи
function createItem(item) {
  const template = document.getElementById("to-do__item-template");
  const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  const editButton = clone.querySelector(".to-do__item-button_type_edit");

  textElement.textContent = item;

  // Удаление задачи
  deleteButton.addEventListener("click", () => {
    clone.remove();
    const currentItems = getTasksFromDOM();
    saveTasks(currentItems);
  });

  // Копирование задачи
  duplicateButton.addEventListener("click", () => {
    const newItem = createItem(textElement.textContent);
    listElement.prepend(newItem);
    const currentItems = getTasksFromDOM();
    saveTasks(currentItems);
  });

  // Редактирование задачи
  editButton.addEventListener("click", () => {
    textElement.setAttribute("contenteditable", "true");
    textElement.focus();
  });

  textElement.addEventListener("blur", () => {
    textElement.removeAttribute("contenteditable");
    const currentItems = getTasksFromDOM();
    saveTasks(currentItems);
  });

  return clone;
}

// Получение текущего списка задач из DOM
function getTasksFromDOM() {
  const tasks = [];
  const taskElements = document.querySelectorAll(".to-do__item-text");
  taskElements.forEach((el) => {
    tasks.push(el.textContent);
  });
  return tasks;
}

// Сохранение задач в localStorage
function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Добавление новой задачи из формы
formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const newTaskText = inputElement.value.trim();
  if (newTaskText === "") return;

  const newTask = createItem(newTaskText);
  listElement.prepend(newTask);

  const currentItems = getTasksFromDOM();
  saveTasks(currentItems);

  inputElement.value = "";
});

// Инициализация при загрузке страницы
const initialTasks = loadTasks();
initialTasks.forEach((task) => {
  const taskElement = createItem(task);
  listElement.append(taskElement);
});