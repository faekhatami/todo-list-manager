const taskInput = document.getElementById("new-task");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    const listItem = document.createElement("li");
    listItem.textContent = taskText;
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => listItem.remove();
    listItem.appendChild(deleteButton);
    listItem.onclick = () => listItem.classList.toggle("completed");
    taskList.appendChild(listItem);
    taskInput.value = "";
    saveTasks();
  }
}

function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll("li").forEach((task) => {
    tasks.push({
      text: task.textContent.replace("Delete", "").trim(),
      completed: task.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    const listItem = document.createElement("li");
    listItem.textContent = task.text;
    if (task.completed) listItem.classList.add("completed");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => listItem.remove();
    listItem.appendChild(deleteButton);
    listItem.onclick = () => listItem.classList.toggle("completed");
    taskList.appendChild(listItem);
  });
}

addTaskButton.onclick = addTask;
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

window.onload = loadTasks;
