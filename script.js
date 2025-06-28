const taskList = document.getElementById("task-list");
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function renderTasks() {
      taskList.innerHTML = "";
      tasks.forEach((task, index) => {
        const li = document.createElement("li");
        if (task.completed) li.classList.add("completed");

        const text = document.createElement("div");
        text.className = "task-text";
        text.textContent = task.text;

        const due = document.createElement("div");
        due.className = "due-box";
        due.textContent = task.datetime ? `📅 Due: ${new Date(task.datetime).toLocaleString()}` : "No deadline";

        const btnGroup = document.createElement("div");
        btnGroup.className = "task-buttons";

        const completeBtn = document.createElement("button");
        completeBtn.textContent = "✓";
        completeBtn.className = "complete";
        completeBtn.onclick = () => {
          tasks[index].completed = !tasks[index].completed;
          saveTasks();
          renderTasks();
        };

        const editBtn = document.createElement("button");
        editBtn.textContent = "✎";
        editBtn.className = "edit";
        editBtn.onclick = () => {
          const newText = prompt("Edit task:", task.text);
          if (newText) {
            tasks[index].text = newText;
            saveTasks();
            renderTasks();
          }
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑️";
        deleteBtn.className = "delete";
        deleteBtn.onclick = () => {
          tasks.splice(index, 1);
          saveTasks();
          renderTasks();
        };

        btnGroup.appendChild(completeBtn);
        btnGroup.appendChild(editBtn);
        btnGroup.appendChild(deleteBtn);

        li.appendChild(text);
        li.appendChild(due);
        li.appendChild(btnGroup);
        taskList.appendChild(li);
      });
    }

    function addTask() {
      const textInput = document.getElementById("task-text");
      const timeInput = document.getElementById("task-time");
      const taskText = textInput.value.trim();
      const taskTime = timeInput.value;

      if (!taskText) return;
      tasks.push({ text: taskText, datetime: taskTime, completed: false });
      saveTasks();
      renderTasks();
      textInput.value = "";
      timeInput.value = "";
    }

    renderTasks();
