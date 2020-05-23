const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const taskInput = document.querySelector('#task')
const filter = document.querySelector('#filter');
const clearBtn = document.querySelector('.clear-task');


callEventListener();
function callEventListener() {
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeItem);
    clearBtn.addEventListener('click', removeAllItems);
    filter.addEventListener('keyup', filterTasks);
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
function removeItem(e) {
    if(e.target.parentElement.classList.contains('delete')) {
        if(confirm('Are you sure?')) {
          e.target.parentElement.parentElement.remove();  
        }
    }
}
function removeAllItems() {
    if(confirm('Are you sure?')) {
        while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
        }  
    }
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