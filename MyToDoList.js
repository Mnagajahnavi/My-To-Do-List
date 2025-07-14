let descriptionInput = document.getElementById('InputList');
let priorityInput = document.getElementById('PriorityInput');
let deadlineInput = document.getElementById('DeadlineInput');
let itemContainer = document.getElementById('todoItemsContainer');
let saveToDoButton = document.getElementById('saveToDoButton');
let todoId = 0;

function getToDoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem('todoList');
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}

let todoList = getToDoListFromLocalStorage();


function saveToLocalStorage() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}


function ToDoCompleted(uniqueId, labelId, listId) {
    let checkBoxElem = document.getElementById(uniqueId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle('checked');

    let todoObjectIndex = todoList.findIndex(function(eachTodo) {
        if (eachTodo.id === listId) {
            return true;
        } else {
            return false;
        }
    });

    let todoObject = todoList[todoObjectIndex];
    if (todoObject.is_checked === true) {
        todoObject.is_checked = false;
    } else {
        todoObject.is_checked = true;
    }
}

function deleteToDo(listId) {
    let listElement = document.getElementById(listId);
    itemContainer.removeChild(listElement);

    let Index = todoList.findIndex(function(eachElement) {
        if (eachElement.id === listId) {
            return true;
        } else {
            return false;
        }
    });

    console.log(todoList[Index]);
    todoList.splice(Index, 1);
    console.log(todoList);
    saveToLocalStorage();
}


function createAndAppend(todo) {
    const {
        text,
        id,
        priority,
        deadline
    } = todo;

    const listId = id;
    const uniqueId = "checkbox_" + todoId;
    const labelId = "label_" + todoId;

    let listElement = document.createElement("li");
    listElement.classList.add("todo-item-container", "d-flex", "flex-row", "justify-content-between", "align-items-center");
    listElement.id = listId;
    itemContainer.appendChild(listElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = uniqueId;
    inputElement.checked = todo.is_checked;
    inputElement.classList.add("checkbox-Input");
    listElement.appendChild(inputElement);

    inputElement.onclick = function() {
        ToDoCompleted(uniqueId, labelId, listId);
    };

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row", "justify-content-between", "w-100");
    listElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", uniqueId);
    labelElement.classList.add("checkbox-label");
    labelElement.id = labelId;
    labelElement.textContent = text;
    if (todo.is_checked === true) {
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);

    let priorityElement = document.createElement("p");
    priorityElement.textContent = priority;
    priorityElement.classList.add("priority-text");
    labelContainer.appendChild(priorityElement);

    let deadlineElement = document.createElement("p");
    deadlineElement.textContent = deadline;
    deadlineElement.classList.add("deadline-text");
    labelContainer.appendChild(deadlineElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteText = document.createElement("p");
    deleteText.textContent = "×"; // Or you can use "X" if you prefer
    deleteText.classList.add("delete-text");
    deleteText.onclick = function () {
        deleteToDo(listId);
    };
    deleteIconContainer.appendChild(deleteText);


    todoId++;
}


function AddEvent() {
    if (descriptionInput.value !== "" && priorityInput.value !== "" && deadlineInput.value !== "") {
        const newTodo = {
            text: descriptionInput.value.trim(),
            id: "list_" + todoId,
            priority: priorityInput.value,
            deadline: deadlineInput.value,
            is_checked: false
        };
        todoList.push(newTodo);
        saveToLocalStorage();
        createAndAppend(newTodo);

        descriptionInput.value = "";
        priorityInput.value = "";
        deadlineInput.value = "";
    } else {
        alert("Please enter Valid Inputs");
    }
}

// Optional Save Button (already saving on add)
saveToDoButton.onclick = function() {
    saveToLocalStorage();
    alert("To-do list saved!");
};

// Render all saved items on page load
for (let todo of todoList) {
    createAndAppend(todo);
}