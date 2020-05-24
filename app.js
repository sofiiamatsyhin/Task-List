const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const taskInput = document.querySelector('#task')
const filter = document.querySelector('#filter');
const clearBtn = document.querySelector('.clear-task');


callEventListener();
function callEventListener() {
    document.addEventListener('DOMContentLoaded', getTasks);
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeItem);
    clearBtn.addEventListener('click', removeAllItems);
    filter.addEventListener('keyup', filterTasks);
}
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task) {
        const li = document.createElement('li');
        const link = document.createElement('a');

        li.setAttribute('class', 'collection-item');
        link.setAttribute('class', 'delete secondary-content');
        li.appendChild(document.createTextNode(task));
        link.innerHTML ='<i class="fa fa-remove"></i>';
        li.appendChild(link);
        taskList.appendChild(li);
    });
}
function addTask(e) {
    if(taskInput.value === '') {
        alert('Please, write a new task!');
    } else {
        const li = document.createElement('li');
        const link = document.createElement('a');

        li.setAttribute('class', 'collection-item');
        link.setAttribute('class', 'delete secondary-content');
        li.appendChild(document.createTextNode(taskInput.value));
        link.innerHTML ='<i class="fa fa-remove"></i>';
        li.appendChild(link);
        taskList.appendChild(li);
        storeTaskInLocalStorage(taskInput.value);
        taskInput.value = '';
    }
    e.preventDefault();
}
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function removeItem(e) {
    if(e.target.parentElement.classList.contains('delete')) {
        if(confirm('Are you sure?')) {
          e.target.parentElement.parentElement.remove();  
          removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function removeAllItems() {
    if(confirm('Are you sure?')) {
        while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
        }  
    }
    removeAllTasksFromLocalStorage();
}
function removeAllTasksFromLocalStorage() {
    localStorage.clear();
}
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) !== -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}