import '../css/style.css';

$(function() {
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
            $('.tasks').append(renderTask(item.text, item.id, item.isComplete));
        }
    }

    function addTask() {
        $('.todo-header__btn').on('click', function() {
            if ( $('.todo-header__input').val() ) {
                let taskId = createTaskId(1000, 9999);
                $('.tasks').append(renderTask( $('.todo-header__input').val(), taskId) );
                updateStorageContainer( $('.todo-header__input').val(), taskId );
                $('.todo-header__input').val('');
            }
        })
    }

    function createTaskId(min, max) {
        let number = Math.floor(min + Math.random() * (max + 1 - min));
        return number;
    }

    function updateStorageContainer(task, id='') {
        if (itemsArray.length < $('.tasks').children().length) {
            let taskObj = Object.assign( {id: id}, {text: task}, {isComplete: false} )
            itemsArray.push(taskObj);
        } else if (itemsArray.length > $('.tasks').children().length) {
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
            return `<li class="tasks__task-item tasks__task-item_complete" data-id="${id}">
                        <span>${task}</span>
                        <button class="tasks__task-item__closed">X</button>
                        <input type="checkbox" class="tasks__task-item__checkbox">
                    </li>`
        } else {
            return `<li class="tasks__task-item" data-id="${id}">
                        <span>${task}</span>
                        <button class="tasks__task-item__closed">X</button>
                        <input type="checkbox" class="tasks__task-item__checkbox">
                    </li>`
        }
    }

    function deleteTask() {
        $('.tasks').on('click', '.tasks__task-item__closed', function() {
            $(this).parent().remove();
            updateStorageContainer(this.parentElement);
            showControlBtns();
        })
    }

    function completeTaskFromClick() {
        $('.tasks').on('click', function(event) {
            if ($(event.target).prop('tagName') == 'LI') {
                $(event.target).toggleClass('tasks__task-item_complete');
                updateStorageContainer(event.target);
            } else if ($(event.target).prop('tagName') == 'SPAN') {
                $(event.target.parentElement).toggleClass('tasks__task-item_complete');
                updateStorageContainer(event.target.parentElement);
            }
        })
    }

    function setCheckedTask() {
        $('.tasks').on('click', function(event) {
            if ($(event.target).prop('tagName') == 'INPUT' && $(event.target).prop('checked') == true) {
                $(event.target).css('display', 'block');
            } else if ($(event.target).prop('tagName') == 'INPUT' && $(event.target).prop('checked') == false) {
                $(event.target).css('display', 'none');
            }
            showControlBtns();
        })
    }

    function completeTaskFromBtn() {
        $('.btns__complete').on('click', function() {
            $('.tasks__task-item__checkbox:checked').each(function() {
                if (!$(this.parentElement).hasClass('tasks__task-item_complete')) {
                    $(this.parentElement).addClass('tasks__task-item_complete');
                    updateStorageContainer(this.parentElement);
                }
            })
        })
    }

    function deleteTaskFromBtn() {
        $('.btns__remove').on('click', function() {
            $('.tasks__task-item__checkbox:checked').each(function() {
                $(this.parentElement).remove();
                updateStorageContainer(this.parentElement);
            })
            showControlBtns();
        })
    }

    function selectAllCheckboxes() {
        $('.btns__select').on('click', function() {
            $('.tasks__task-item__checkbox:not(:checked)').each(function() {
                $(this).css('display', 'block');
                $(this).prop('checked', true);
            })
            showControlBtns();
        })
    }

    function clearAllCheckboxes() {
        $('.btns__clear').on('click', function() {
            $('.tasks__task-item__checkbox:checked').each(function() {
                $(this).prop('checked', false);
                $(this).css('display', 'none');
            })
            showControlBtns();
        })
    }

    function showControlBtns() {
        if ($('.tasks__task-item__checkbox:checked').length == 0) {
            $('.btns__complete, .btns__remove, .btns__clear').fadeOut(200);
        } else {
            $('.btns__complete, .btns__remove, .btns__clear').fadeIn(200);
        }
    }

    initToDoList();
});