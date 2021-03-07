let addBtn = document.querySelector('.todo-header__btn');
let input = document.querySelector('.todo-header__input');
let taskContainer = document.querySelector('.todo-body__tasks');
let checkboxes = document.getElementsByClassName('todo-body__tasks__task-item__checkbox');
let completeBtn = document.querySelector('.todo-body__btns__complete');
let removeBtn = document.querySelector('.todo-body__btns__remove');
let selectBtn = document.querySelector('.todo-body__btns__select');
let clearBtn = document.querySelector('.todo-body__btns__clear');

function initToDoList() {
    addTask();
    deleteTask();
    completeTaskFromClick();
    setCheckedTask();
    completeTaskFromBtn();
    deleteTaskFromBtn();
    selectAllCheckboxes();
    clearAllCheckboxes();
}

function addTask() {
    addBtn.addEventListener('click', function() {
        if (input.value) {
            taskContainer.insertAdjacentHTML('beforeend', renderTask(input.value));
            input.value = '';
        }
    })
}

function renderTask(task) {
    return `<li class="todo-body__tasks__task-item">
                <span>${task}</span>
                <button class="todo-body__tasks__task-item__closed">X</button>
                <input type="checkbox" class="todo-body__tasks__task-item__checkbox">
            </li>`
}

function deleteTask() {
    taskContainer.addEventListener('click', function(event) {
        if (event.target.tagName == 'BUTTON') {
            event.target.parentElement.remove();
        }
        showControlBtns();
    })
}

function completeTaskFromClick() {
    taskContainer.addEventListener('click', function(event) {
        if (event.target.tagName == 'LI') {
            event.target.classList.toggle('todo-body__tasks__task-item_complete');
        } else if (event.target.tagName == 'SPAN') {
            event.target.parentElement.classList.toggle('todo-body__tasks__task-item_complete');
        }
    })
}

function setCheckedTask() {
    taskContainer.addEventListener('click', function(event) {
        if (event.target.tagName == 'INPUT' && event.target.checked) {
            event.target.style.display = 'block';
            showControlBtns();
        } else if (event.target.tagName == 'INPUT' && !event.target.checked) {
            event.target.style.display = 'none';
            showControlBtns();
        }
    })
}

function completeTaskFromBtn() {
    completeBtn.addEventListener('click', function() {
        for (let checkbox of checkboxes) {
            if (checkbox.checked) {
                checkbox.parentElement.classList.add('todo-body__tasks__task-item_complete');
            }
        }
    })
}

function deleteTaskFromBtn() {
    removeBtn.addEventListener('click', function() {
        let checkboxesStatic = document.querySelectorAll('.todo-body__tasks__task-item__checkbox');       
        checkboxesStatic.forEach(function(checkbox) {
            if (checkbox.checked) {
                checkbox.parentElement.remove();
            }
        })
        showControlBtns();
    })
}

function selectAllCheckboxes() {
    selectBtn.addEventListener('click', function() {
        for (let checkbox of checkboxes) {
            if (!checkbox.checked) {
                checkbox.style.display = 'block';
                checkbox.checked = true;
            }
        }
        showControlBtns();
    })
}

function clearAllCheckboxes() {
    clearBtn.addEventListener('click', function() {
        for (let checkbox of checkboxes) {
            if (checkbox.checked) {
                checkbox.checked = false;
                checkbox.style.display = 'none';
            }
        }
        showControlBtns();
    })
}

function countOfCheckedCheckboxes() {
    let containerOfCheckedCheckboxes = [];
    for (let checkbox of checkboxes) {
        if (checkbox.checked) {
            containerOfCheckedCheckboxes.push(checkbox);
        }
    }
    return containerOfCheckedCheckboxes.length;
}

function showControlBtns() {
    if (countOfCheckedCheckboxes() == 0) {
        completeBtn.classList.add('todo-body__btns_hide');
        removeBtn.classList.add('todo-body__btns_hide');
        clearBtn.classList.add('todo-body__btns_hide');
    } else {
        completeBtn.classList.remove('todo-body__btns_hide');
        removeBtn.classList.remove('todo-body__btns_hide');
        clearBtn.classList.remove('todo-body__btns_hide');
    }
}

initToDoList();