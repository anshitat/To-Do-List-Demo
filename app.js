const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todos');

//all funtions
const addTodo = (e) =>{
    e.preventDefault();
    //create todo div
    if(todoInput.value === ""){
        alert('Enter Something!!')    
    }
    else{
    console.log(todoInput.value);

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // create todo list item
    const newItem = document.createElement('li');
    newItem.innerText = todoInput.value;
    newItem.classList.add('todo-item');
    todoDiv.appendChild(newItem);

    //save todo to local storage
    saveLocalTodo(todoInput.value);
    //create check btn
    const checkBtn = document.createElement('button');
    checkBtn.classList.add('check-btn');
    checkBtn.innerHTML = '<i class= "fas fa-check"></i>'
    todoDiv.appendChild(checkBtn);
    //create trash btn
    const trashBtn = document.createElement('button');
    trashBtn.classList.add('trash-btn');
    trashBtn.innerHTML = '<i class= "fas fa-trash"></i>'
    todoDiv.appendChild(trashBtn);

    todoList.appendChild(todoDiv);

    todoInput.value = "";
    }
}
const deleteCheck = (e) =>{
    const item = e.target;

    if(item.classList[0] === 'check-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }

    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', ()=>{
            todo.remove();
        })
    }
}
function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach( (todo) =>{
        switch(e.target.value){
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
        }
    })
}
function setTodo(){
    //check --do i already have things any todos
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    return todos;
}

function saveLocalTodo(todo){
    //set todos to local storage
    let todos = setTodo();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}
function getTodo(){
    let todos = setTodo();
    
    todos.forEach( (todo) =>{

        //create todo Div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        //create list item
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //create check btn
        const checkBtn = document.createElement('button');
        checkBtn.classList.add('check-btn');
        checkBtn.innerHTML = '<i class= "fas fa-check"></i>'
        todoDiv.appendChild(checkBtn);
        //create trash btn
        const trashBtn = document.createElement('button');
        trashBtn.classList.add('trash-btn');
        trashBtn.innerHTML = '<i class= "fas fa-trash"></i>'
        todoDiv.appendChild(trashBtn);

        todoList.appendChild(todoDiv);
    })
}
function removeLocalTodos(todo){
    let todos = setTodo();

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);

    localStorage.setItem('todos', JSON.stringify(todos));
}


//all events
document.addEventListener('DOMContentLoaded', getTodo);
todoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);