let addBtn = document.querySelector('.todo-header__btn');
let input = document.querySelector('.todo-header__input');
let taskContainer = document.querySelector('.todo-body__tasks');
let checkboxes = document.getElementsByClassName('todo-body__tasks__task-item__checkbox');
let completeBtn = document.querySelector('.todo-body__btns__complete');
let removeBtn = document.querySelector('.todo-body__btns__remove');
let selectBtn = document.querySelector('.todo-body__btns__select');
let clearBtn = document.querySelector('.todo-body__btns__clear');

let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

function initToDoList() {
    loadTasksFromStorageContainer();
    addTask();
    deleteTask();
    completeTaskFromClick();
    setCheckedTask();
    completeTaskFromBtn();
    deleteTaskFromBtn();
    selectAllCheckboxes();
    clearAllCheckboxes();
}

function loadTasksFromStorageContainer() {
    for (let item of itemsArray) {
        taskContainer.insertAdjacentHTML('beforeend', renderTask(item.text, item.id, item.isComplete));
    }
}

function addTask() {
    addBtn.addEventListener('click', function() {
        if (input.value) {
            let taskId = createTaskId(1000, 9999);
            taskContainer.insertAdjacentHTML('beforeend', renderTask(input.value, taskId));
            updateStorageContainer(input.value, taskId);
            input.value = '';
        }
    })
}

function createTaskId(min, max) {
    let number = Math.floor(min + Math.random() * (max + 1 - min));
    return number;
}

function updateStorageContainer(task, id='') {
    if (itemsArray.length < taskContainer.children.length) {
        let taskObj = Object.assign( {id: id}, {text: task}, {isComplete: false} )
        itemsArray.push(taskObj);
    } else if (itemsArray.length > taskContainer.children.length) {
        for (let item of itemsArray) {
            if (item.id == task.dataset.id) {
                itemsArray.splice(itemsArray.indexOf(item), 1);
            }
        }
    } else {
        for (let item of itemsArray) {
            if (item.id == task.dataset.id && item.isComplete == false) {
                item.isComplete = true;
            } else if (item.id == task.dataset.id && item.isComplete == true) {
                item.isComplete = false;
            }
        }
    }
    localStorage.setItem('items', JSON.stringify(itemsArray));
}

function renderTask(task, id, isComplite=false) {
    if (isComplite) {
        return `<li class="todo-body__tasks__task-item todo-body__tasks__task-item_complete" data-id="${id}">
                    <span>${task}</span>
                    <button class="todo-body__tasks__task-item__closed">X</button>
                    <input type="checkbox" class="todo-body__tasks__task-item__checkbox">
                </li>`
    } else {
        return `<li class="todo-body__tasks__task-item" data-id="${id}">
                    <span>${task}</span>
                    <button class="todo-body__tasks__task-item__closed">X</button>
                    <input type="checkbox" class="todo-body__tasks__task-item__checkbox">
                </li>`
    }
}

function deleteTask() {
    taskContainer.addEventListener('click', function(event) {
        if (event.target.tagName == 'BUTTON') {
            event.target.parentElement.remove();
            updateStorageContainer(event.target.parentElement);
        }
        showControlBtns();
    })
}

function completeTaskFromClick() {
    taskContainer.addEventListener('click', function(event) {
        if (event.target.tagName == 'LI') {
            event.target.classList.toggle('todo-body__tasks__task-item_complete');
            updateStorageContainer(event.target);
        } else if (event.target.tagName == 'SPAN') {
            event.target.parentElement.classList.toggle('todo-body__tasks__task-item_complete');
            updateStorageContainer(event.target.parentElement);
        }
    })
}

function setCheckedTask() {
    taskContainer.addEventListener('click', function(event) {
        if (event.target.tagName == 'INPUT' && event.target.checked) {
            event.target.style.display = 'block';
        } else if (event.target.tagName == 'INPUT' && !event.target.checked) {
            event.target.style.display = 'none';
        }
        showControlBtns();
    })
}

function completeTaskFromBtn() {
    completeBtn.addEventListener('click', function() {
        for (let checkbox of checkboxes) {
            if (checkbox.checked && !checkbox.parentElement.classList.contains('todo-body__tasks__task-item_complete')) {
                checkbox.parentElement.classList.add('todo-body__tasks__task-item_complete');
                updateStorageContainer(checkbox.parentElement);
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
                updateStorageContainer(checkbox.parentElement);
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