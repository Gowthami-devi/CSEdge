let tasks = [];
    function renderTasks() {
        const taskList = document.getElementById("taskList");
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const taskElement = document.createElement("li");
            taskElement.className = "task";
            if (task.completed) {
                taskElement.classList.add("completed");
            }
            taskElement.innerHTML = `
                <span>${task.title}</span>
                <span>Priority: ${task.priority}</span>
                <span>Due Date: ${task.dueDate}</span>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
                <input type="checkbox" onchange="toggleCompleted(${index})" ${task.completed ? "checked" : ""}>
            `;
            taskList.appendChild(taskElement);
        });
    }

    function addTask() {
        const taskInput = document.getElementById("taskInput");
        const priorityInput = document.getElementById("priorityInput");
        const dueDateInput = document.getElementById("dueDateInput");
        const title = taskInput.value.trim();
        const priority = parseInt(priorityInput.value.trim());
        const dueDate = dueDateInput.value.trim();
        if (title && !isNaN(priority) && priority >= 1 && priority <= 5) {
            tasks.push({ title: title, priority: priority, dueDate: dueDate, completed: false });
            taskInput.value = "";
            priorityInput.value = "";
            dueDateInput.value = "";
            renderTasks();
        }
    }

    function editTask(index) {
        const newTitle = prompt("Enter new title for the task:");
        if (newTitle !== null) {
            tasks[index].title = newTitle.trim();
            renderTasks();
        }
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        renderTasks();
    }

    function toggleCompleted(index) {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    }

    function sortTasks() {
        const sortSelect = document.getElementById("sortSelect");
        const sortBy = sortSelect.value;
        switch (sortBy) {
            case "priority":
                tasks.sort((a, b) => a.priority - b.priority);
                renderTasks();
                break;
            case "duedate":
                tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
                renderTasks();
                break;
            case "completed":
                tasks.sort((a, b) => a.completed - b.completed);
                renderTasks();
                break;
            default:
                // Default sorting (by order of addition)
                renderTasks();
                break;
        }
    }

    // Initial rendering
    renderTasks();
