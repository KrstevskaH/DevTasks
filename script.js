const taskInput = document.getElementById("taskInput");
const addTask = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const clearCompleted = document.getElementById("clearCompleted");
const toggleMode = document.getElementById("toggleMode");

let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.done ? "completed" : "";
    li.innerHTML = `
      <span onclick="toggleTask(${index})">${task.text}</span>
      <button onclick="deleteTask(${index})">❌</button>
    `;
    taskList.appendChild(li);
  });
  taskCount.textContent = `${tasks.length} tasks`;
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addNewTask() {
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ text, done: false });
    taskInput.value = "";
    renderTasks();
  }
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

clearCompleted.onclick = () => {
  tasks = tasks.filter(task => !task.done);
  renderTasks();
};

toggleMode.onclick = () => {
  const isDark = document.body.style.getPropertyValue('--bg') === '#111';
  document.body.style.setProperty('--bg', isDark ? '#f0f0f0' : '#111');
  document.body.style.setProperty('--text', isDark ? '#000' : '#fff');
};

addTask.onclick = addNewTask;
taskInput.addEventListener("keypress", e => {
  if (e.key === "Enter") addNewTask();
});

renderTasks();
