// OOP approach

class Task {
    constructor(title, status = 'not-started') {
        this.title = title;
        this.status = status;
    }
}

class TaskManager {
    constructor() {
        this.taskList = [];
        this.init();
    }

    init() {
        document.getElementById('add-task-button').addEventListener('click', () => this.addTask());
        const taskInput = document.getElementById('task-title');
        taskInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                this.addTask();
            }
        });
        this.initDragAndDrop();
    }

    addTask() {
        const taskInput = document.getElementById('task-title');
        const taskTitle = taskInput.value.trim();

        if (taskTitle === "") {
            alert("Task title cannot be empty!");
            return;
        }

        const newTask = new Task(taskTitle);
        this.taskList.push(newTask);
        this.addTaskToDOM(newTask);
        taskInput.value = "";
    }

    addTaskToDOM(task) {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task-item');
        taskElement.innerHTML = `
            <span>${task.title}</span>
            <button class='delete-btn'>Delete</button>
        `;
        taskElement.setAttribute('draggable', 'true');
        taskElement.setAttribute('data-title', task.title);

        taskElement.addEventListener('dragstart', this.handleDragStart);
        taskElement.addEventListener('dragend', this.handleDragEnd);

        const relatedColumn = document.getElementById(task.status).querySelector('.task-list');
        relatedColumn.appendChild(taskElement);

        const deleteBtn = taskElement.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => this.deleteTask(task, taskElement));
    }

    deleteTask(task, taskElement) {
        taskElement.remove();
        const taskIndex = this.taskList.findIndex(t => t.title === task.title);
        if (taskIndex > -1) {
            this.taskList.splice(taskIndex, 1);
        }
    }

    handleDragStart(event) {
        event.dataTransfer.setData('text/plain', event.target.getAttribute('data-title'));
        event.target.classList.add('dragging');
    }

    handleDragEnd(event) {
        event.target.classList.remove('dragging');
    }

    handleDrop(event) {
        event.preventDefault();
        const taskTitle = event.dataTransfer.getData('text/plain');
        const taskElement = document.querySelector(`[data-title="${taskTitle}"]`);
        const taskListElement = event.target.closest('.task-column').querySelector('.task-list');
        taskListElement.appendChild(taskElement);

        const task = this.taskList.find(t => t.title === taskTitle);
        if (task) {
            task.status = event.target.closest('.task-column').id;
        }
    }

    allowDrop(event) {
        event.preventDefault();
    }

    initDragAndDrop() {
        const columns = document.querySelectorAll('.task-column');
        columns.forEach(column => {
            column.addEventListener('dragover', this.allowDrop);
            column.addEventListener('drop', (event) => this.handleDrop(event));
        });
    }
}

const taskManager = new TaskManager();
