// Theme toggling
const toggleEle = document.querySelector('nav');
toggleEle.addEventListener('click', changeTheme);
function changeTheme() {
    toggleEle.innerHTML = '';
    let currentTheme = document.documentElement.getAttribute('data-theme');
    let targetTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', targetTheme);
    if (targetTheme === 'dark') {
        toggleEle.innerHTML = '<i class="fa-solid fa-moon"></i> Dark mode';
    } else {
        toggleEle.innerHTML = '<i class="fa-solid fa-sun"></i> Light mode';
    }
}

// Task storage - an array of objects
// tasks = [
//     {
//         taskName: taskInput,
//         isComplete: false
//     }
// ]
let tasks = [];

// Add task
const addBtnEle = document.querySelector('#add-icon button');
const textInputEle = document.querySelector('#text-input input');
const tasksEle = document.querySelector('#tasks-container');
addBtnEle.addEventListener('click', () => {
    const taskInput = textInputEle.value;
    // creating a new task object
    const newTask = {
        taskName: taskInput,
        isComplete: false
    }
    tasks.push(newTask);
    // Creating and appending the task
    const taskEle = document.createElement('div');
    taskEle.classList.add('task');
    taskEle.innerHTML = `
        <div class="task-name">
            <input type="checkbox">
            <span id="task-content">${taskInput}</span>
        </div>
        <div class="remove-btn">
            <i class="fa-regular fa-square-minus"></i>
        </div>
    `;
    tasksEle.appendChild(taskEle);
    textInputEle.value = '';
    tasksLeft();
});

// Complete all tasks
const tasksManagerEle = document.querySelectorAll('#tasks-manager button');
const completeAllBtn = tasksManagerEle[0];
const clearCompletedBtn = tasksManagerEle[1];

completeAllBtn.addEventListener('click', () => {
    tasks.forEach(task => {
        task.isComplete = true;
    });
    displayTasks('All');
});

// Clear completed tasks
clearCompletedBtn.addEventListener('click', () => {
    tasks = tasks.filter(task => task.isComplete === false);
    displayTasks('All');
});

// Rendering all tasks
function displayTasks(filter) {
    tasksEle.innerHTML = '';
    if (filter === 'All') {
        tasks.forEach(task => {
            if (task.isComplete) {
                const taskEle = document.createElement('div');
                taskEle.classList.add('task');
                taskEle.innerHTML = `
                    <div class="task-name">
                        <input type="checkbox" checked>
                        <span id="task-content">${task.taskName}</span>
                    </div>
                    <div class="remove-btn">
                        <i class="fa-regular fa-square-minus"></i>
                    </div>
                `;
                tasksEle.appendChild(taskEle);
            } else {
                const taskEle = document.createElement('div');
                taskEle.classList.add('task');
                taskEle.innerHTML = `
                    <div class="task-name">
                        <input type="checkbox">
                        <span id="task-content">${task.taskName}</span>
                    </div>
                    <div class="remove-btn">
                        <i class="fa-regular fa-square-minus"></i>
                    </div>
                `;
                tasksEle.appendChild(taskEle);
            }
        });
    } else if (filter === 'Uncomplete') {
        tasks.forEach(task => {
            if (!task.isComplete) {
                const taskEle = document.createElement('div');
                taskEle.classList.add('task');
                taskEle.innerHTML = `
                    <div class="task-name">
                        <input type="checkbox">
                        <span id="task-content">${task.taskName}</span>
                    </div>
                    <div class="remove-btn">
                        <i class="fa-regular fa-square-minus"></i>
                    </div>
                `;
                tasksEle.appendChild(taskEle);
            }
        });
    } else if (filter === 'Completed') {
        tasks.forEach(task => {
            if (task.isComplete) {
                const taskEle = document.createElement('div');
                taskEle.classList.add('task');
                taskEle.innerHTML = `
                    <div class="task-name">
                        <input type="checkbox" checked>
                        <span id="task-content">${task.taskName}</span>
                    </div>
                    <div class="remove-btn">
                        <i class="fa-regular fa-square-minus"></i>
                    </div>
                `;
                tasksEle.appendChild(taskEle);
            }
        });
    }
    tasksLeft();
}

// Adding event listener to tasks-container div -using event delegation
tasksEle.addEventListener('click', (event) => {
    if (event.target.tagName === 'INPUT') {
        const taskContent = event.target.nextElementSibling.textContent;
        const taskIndex = tasks.findIndex(task => task.taskName === taskContent);
        const isChecked = event.target.checked;
        markComplete(taskIndex, isChecked);
        tasksLeft();
    }
});
// Check and mark a task as complete
function markComplete(taskIndex, isChecked) {
    tasks[taskIndex].isComplete = isChecked;
}

// Delete a particular task
tasksEle.addEventListener('click', (event) => {
    if (event.target.tagName === 'I') {
        const taskNameEle = event.target.parentElement.previousElementSibling;
        const taskContent = taskNameEle.children[1].textContent;
        const taskIndex = tasks.findIndex(task => task.taskName === taskContent);
        deleteTask(taskIndex);
    }
    displayTasks('All');
});

function deleteTask(taskIndex){
    tasks.splice(taskIndex, 1);
}

// To display number of tasks left
function tasksLeft() {
    let count = 0;
    tasks.forEach(task => {
        if (!task.isComplete) {
            count++;
        }
    })
    const taskNumEle = document.querySelector('#task-num span');
    taskNumEle.textContent = count;
}

// Filter tasks based on status

const filterEle = document.querySelector('#filter');
// const filterAll = filterEle[0];
// const filterUncomplete = filterEle[1];
// const filterComplete = filterEle[2];

filterEle.addEventListener('click', (event) => {
    filter = event.target.textContent;
    displayTasks(filter);
});