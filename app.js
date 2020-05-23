const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const taskInput = document.querySelector('#task')
const filter = document.querySelector('#filter');
const clearBtn = document.querySelector('.clear-task');


callEventListener();
function callEventListener() {
    form.addEventListener('submit', addTask);
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
        taskInput.value = '';
    }
    e.preventDefault();
}