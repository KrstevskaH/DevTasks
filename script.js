const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
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
    // Format date nicely if it exists
    const formattedDate = task.date ? new Date(task.date).toLocaleString() : "No date";
    li.innerHTML = `
      <div>
        <span onclick="toggleTask(${index})">${task.text}</span><br>
        <small>📅 ${formattedDate}</small>
      </div>
      <button onclick="deleteTask(${index})">❌</button>
    `;
    taskList.appendChild(li);
  });
  taskCount.textContent = `${tasks.length} tasks`;
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addNewTask() {
  const text = taskInput.value.trim();
  const dateValue = taskDate.value;
  if (!text) return;

  if (dateValue && new Date(dateValue) < new Date()) {
    alert("Please select a future date and time.");
    return;
  }

  tasks.push({ text, date: dateValue, done: false });
  taskInput.value = "";
  taskDate.value = "";
  renderTasks();
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
    document.documentElement.classList.toggle("dark");
  };
  

addTask.onclick = addNewTask;
taskInput.addEventListener("keypress", e => {
  if (e.key === "Enter") addNewTask();
});

renderTasks();
