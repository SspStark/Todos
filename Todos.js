let todosContainer = document.getElementById('todosContainer');

function getTodoList() {
    let stringifytodoList = localStorage.getItem('todoList');
    let parsedtodoList = JSON.parse(stringifytodoList);

    if (parsedtodoList === null) {
        return [];
    } else {
        return parsedtodoList;
    }
}

let todoList = getTodoList();
let todoCount = todoList.length;

function saveTodo() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

function deleteTodo(todoId) {
    let todoEln = document.getElementById(todoId);
    todosContainer.removeChild(todoEln);
    let todoIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = 'todo' + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(todoIndex, 1);
}

function strikeTodo(checkboxId, labelId, todoId) {
    let checkboxEln = document.getElementById(checkboxId);
    let labelEln = document.getElementById(labelId);
    labelEln.classList.toggle('striked');

    let todoIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = 'todo' + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    let todoObject = todoList[todoIndex];
    if (todoObject.ischecked === true) {
        todoObject.ischecked = false;
    } else {
        todoObject.ischecked = true;
    }
}

function createandAddtodo(todo) {
    let checkboxId = 'checkbox' + todo.uniqueNo;
    let labelId = 'label' + todo.uniqueNo;
    let todoId = 'todo' + todo.uniqueNo;

    let todoElement = document.createElement('li');
    todoElement.classList.add('list_container', 'd-flex', 'flex-row');
    todoElement.id = todoId;
    todosContainer.appendChild(todoElement);

    let checkboxElement = document.createElement('input');
    checkboxElement.type = 'checkbox';
    checkboxElement.id = checkboxId;
    checkboxElement.classList.add('checkbox_input');
    checkboxElement.checked = todo.ischecked;
    checkboxElement.onclick = function() {
        strikeTodo(checkboxId, labelId, todoId);
    };
    todoElement.appendChild(checkboxElement);

    let labelContainer = document.createElement('div');
    labelContainer.classList.add('label_container');
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement('label');
    labelElement.setAttribute('for', checkboxId);
    labelElement.id = labelId;
    labelElement.classList.add('checkbox_label');
    labelElement.textContent = todo.text;
    if (todo.ischecked === true) {
        labelElement.classList.add('striked');
    }
    labelContainer.appendChild(labelElement);

    let deleteElement = document.createElement('i');
    deleteElement.classList.add('delete_icon', 'far', 'fa-trash-alt');
    deleteElement.onclick = function() {
        deleteTodo(todoId);
    };
    labelContainer.appendChild(deleteElement);
}

function addTodo() {

    let userInput = document.getElementById('todosuserinput');
    let inputValue = userInput.value;

    if (inputValue === '') {
        alert('Please Enter valid input');
        return;
    }
    todoCount = todoCount + 1;

    let newTodo = {
        text: inputValue,
        uniqueNo: todoCount,
        ischecked: false
    };
    todoList.push(newTodo);
    createandAddtodo(newTodo);
    userInput.value = '';
}

for (let todo of todoList) {
    createandAddtodo(todo);
}