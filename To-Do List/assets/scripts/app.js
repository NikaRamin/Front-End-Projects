const taskList = [];
const addTask = function() {
    const taskInput = document.getElementById('task-title');
    const taskTitle = taskInput.value;

    if (taskTitle.trim() === "") {
        alert("Task title cannot be empty!");
        return;
    }
    const newTask = {
        title: taskTitle,
        status: 'not-started'
    };
    taskList.push(newTask);
    addTaskToDOM(newTask, newTask.status);
    taskInput.value = "";
};

const addTaskToDOM = function(newTask, status = 'not-started') {

    const taskElement = document.createElement('div');

    taskElement.classList.add('task-item');  // Add a class for styling
    taskElement.innerHTML = `
        <span>${newTask.title}</span>
        <button class = 'delete-btn'>Delete</button>
    `;
    taskElement.setAttribute('draggable','true');
    taskElement.setAttribute('data-title',newTask.title)

    taskElement.addEventListener('dragstart',handleDragStart);
    taskElement.addEventListener('dragoend',handleDragEnd)


    const relatedColumn = document.getElementById(status).querySelector('.task-list');
    relatedColumn.appendChild(taskElement);

    const deleteBtn = taskElement.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        taskElement.remove();
        const taskIndex = taskList.findIndex(t => t.title === newTask.title);
        if (taskIndex > -1) {
            taskList.splice(taskIndex, 1);
        }
    });
};


const handleDragStart = function(event){
    event.dataTransfer.setData('text/plain',event.target.getAttribute('data-title'));
    event.target.classList.add('dragging');

}
const handleDragEnd = function(event){
    event.target.classList.remove('dragging');
    
}

const handleDrop = function(event){
    event.preventDefault();
    const taskTitle = event.dataTransfer.getData('text/plain');
    const taskElement = document.querySelector(`[data-title="${taskTitle}"]`);
    const taskListElement = event.target.closest('.task-column').querySelector('.task-list');
    taskListElement.appendChild(taskElement);

    const task = taskList.find(t => t.title === taskTitle);
    if (task) {
        task.status = event.target.closest('.task-column').id;
    }
}

const allowDrop = function(event){
    event.preventDefault();
}

const columns = document.querySelectorAll('.task-column');
columns.forEach(column => {

    column.addEventListener('dragover',allowDrop);
    column.addEventListener('drop',handleDrop);
    }
)

document.getElementById('add-task-button').addEventListener('click', addTask);

const taskInput = document.getElementById('task-title');

taskInput.addEventListener('keydown',function(event){
    if(event.key === 'Enter'){
        document.getElementById('add-task-button').click();
    }
});
