//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo')

//Event Listeners
document.addEventListener('DOMContentLoaded', getTODOs);
todoButton.addEventListener('click', addTODO);
todoList.addEventListener('click', checkOrDelete);
filterOption.addEventListener('click', filterTODO);

//Functions
function addTODO(event){
    //Prevent form from submitting
    event.preventDefault();
    //Create TODO DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //Create LI
    const newTODO = document.createElement('li');
    newTODO.innerText = todoInput.value;
    newTODO.classList.add('todo-item');
    //Appent new todo to div
    todoDiv.appendChild(newTODO);
    //Add TODO to local storage
    saveLocalTodos(todoInput.value);
    //Check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class = "fas fa-check"></i>';
    completedButton.classList.add('completed-button');
    //Appent completed button to div
    todoDiv.appendChild(completedButton);
    //Delete button
    const feleteButton = document.createElement('button');
    feleteButton.innerHTML = '<i class = "fas fa-trash"></i>';
    feleteButton.classList.add('delete-button');
    //Appent delete button to div
    todoDiv.appendChild(feleteButton);
    //Appent do list
    todoList.appendChild(todoDiv);
    //Clear TODO input value
    todoInput.value = "";
}

function checkOrDelete(event){
    const item = event.target;
    //Delete item
    if(item.classList[0] === "delete-button"){
        const todo = item.parentElement;
        //Animation
        todo.classList.add("fall");
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
        removeLocalTODOs(todo);
    }

    //Check item
    if(item.classList[0] === "completed-button"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTODO(event){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(event.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = 'flex';
                } else{
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = 'flex';
                } else{
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

function saveLocalTodos(todo){
    let todos;
    //Check if there are previous TODOs
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTODOs(){
    let todos;
    //Check if there are previous TODOs
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo){
        //Create TODO DIV
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        //Create LI
        const newTODO = document.createElement('li');
        newTODO.innerText = todo;
        newTODO.classList.add('todo-item');
        //Appent each todo to div
        todoDiv.appendChild(newTODO);
        //Check mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class = "fas fa-check"></i>';
        completedButton.classList.add('completed-button');
        //Appent completed button to div
        todoDiv.appendChild(completedButton);
        //Delete button
        const feleteButton = document.createElement('button');
        feleteButton.innerHTML = '<i class = "fas fa-trash"></i>';
        feleteButton.classList.add('delete-button');
        //Appent delete button to div
        todoDiv.appendChild(feleteButton);
        //Appent do list
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTODOs(todo){
    let todos;
    //Check if there are previous TODOs
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoText = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoText), 1);

    localStorage.setItem("todos", JSON.stringify(todos));
}