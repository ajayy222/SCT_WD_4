const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  const li = document.createElement("li");
  li.className = "task-item";

  const span = document.createElement("span");
  span.textContent = text;

  const checkBtn = document.createElement("button");
  checkBtn.textContent = "✓";
  checkBtn.className = "check";
  checkBtn.onclick = () => li.classList.toggle("completed");

  const editBtn = document.createElement("button");
  editBtn.textContent = "✎";
  editBtn.className = "edit";
  editBtn.onclick = () => {
    const newText = prompt("Edit your task:", span.textContent);
    if (newText) span.textContent = newText;
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.className = "delete";
  deleteBtn.onclick = () => li.remove();

  li.appendChild(span);
  li.appendChild(checkBtn);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  taskInput.value = "";
}
