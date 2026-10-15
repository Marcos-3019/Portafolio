// Taskflow: gestión de tareas con DOM y localStorage.
const STORAGE_KEY = "marcos-taskflow-tasks-v1";

const form = document.querySelector("#taskForm");
const input = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");
const emptyState = document.querySelector("#emptyState");
const formHint = document.querySelector("#formHint");
const clearDoneButton = document.querySelector("#clearDoneButton");
const filterButtons = document.querySelectorAll("[data-filter]");

const totalStat = document.querySelector("#totalStat");
const doneStat = document.querySelector("#doneStat");
const progressStat = document.querySelector("#progressStat");
const progressBar = document.querySelector("#progressBar");
const allCount = document.querySelector("#allCount");
const activeCount = document.querySelector("#activeCount");
const doneCount = document.querySelector("#doneCount");
const remainingLabel = document.querySelector("#remainingLabel");
const todayLabel = document.querySelector("#todayLabel");

let currentFilter = "all";
let tasks = loadTasks();

const today = new Intl.DateTimeFormat("es-ES", {
  weekday: "short",
  day: "numeric",
  month: "short"
}).format(new Date());
todayLabel.textContent = today.toLocaleUpperCase("es-ES");

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed)
      ? parsed.filter((task) =>
          task &&
          typeof task.id === "string" &&
          typeof task.text === "string" &&
          typeof task.completed === "boolean"
        )
      : [];
  } catch (error) {
    console.warn("No se pudieron recuperar las tareas guardadas.", error);
    return [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    formHint.textContent = "Cambios guardados en este navegador.";
  } catch (error) {
    formHint.textContent = "No se pudo guardar. Comprueba la configuración del navegador.";
    console.error("No se pudieron guardar las tareas.", error);
  }
}

function createTask(text) {
  return {
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    text,
    completed: false,
    createdAt: new Date().toISOString()
  };
}

function addTask(text) {
  tasks.unshift(createTask(text));
  saveTasks();
  render();
}

function toggleTask(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  render();
}

function clearCompleted() {
  const before = tasks.length;
  tasks = tasks.filter((task) => !task.completed);
  if (tasks.length === before) {
    formHint.textContent = "No hay tareas completadas para borrar.";
    return;
  }
  saveTasks();
  render();
}

function visibleTasks() {
  if (currentFilter === "active") return tasks.filter((task) => !task.completed);
  if (currentFilter === "done") return tasks.filter((task) => task.completed);
  return tasks;
}

function makeTaskElement(task) {
  const item = document.createElement("li");
  item.className = `task-item${task.completed ? " completed" : ""}`;

  const check = document.createElement("button");
  check.type = "button";
  check.className = "task-check";
  check.setAttribute("aria-pressed", String(task.completed));
  check.setAttribute(
    "aria-label",
    task.completed ? `Marcar "${task.text}" como pendiente` : `Marcar "${task.text}" como completada`
  );
  check.textContent = task.completed ? "✓" : "";
  check.addEventListener("click", () => toggleTask(task.id));

  const text = document.createElement("span");
  text.className = "task-text";
  // textContent evita interpretar el texto del usuario como HTML.
  text.textContent = task.text;

  const remove = document.createElement("button");
  remove.type = "button";
  remove.className = "delete-button";
  remove.textContent = "×";
  remove.setAttribute("aria-label", `Eliminar "${task.text}"`);
  remove.addEventListener("click", () => deleteTask(task.id));

  item.append(check, text, remove);
  return item;
}

function render() {
  const completed = tasks.filter((task) => task.completed).length;
  const active = tasks.length - completed;
  const progress = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;

  totalStat.textContent = tasks.length;
  doneStat.textContent = completed;
  progressStat.textContent = `${progress}%`;
  progressBar.style.width = `${progress}%`;
  allCount.textContent = tasks.length;
  activeCount.textContent = active;
  doneCount.textContent = completed;
  remainingLabel.textContent = active
    ? `${active} ${active === 1 ? "tarea pendiente" : "tareas pendientes"}`
    : tasks.length
      ? "¡Todo completado!"
      : "Todo listo para empezar";

  taskList.replaceChildren();
  const filtered = visibleTasks();
  filtered.forEach((task) => taskList.appendChild(makeTaskElement(task)));

  emptyState.hidden = filtered.length > 0;
  taskList.hidden = filtered.length === 0;

  filterButtons.forEach((button) => {
    const selected = button.dataset.filter === currentFilter;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();

  if (!text) {
    formHint.textContent = "Escribe una tarea antes de añadirla.";
    input.focus();
    return;
  }

  addTask(text);
  input.value = "";
  input.focus();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    render();
  });
});

clearDoneButton.addEventListener("click", clearCompleted);

render();
