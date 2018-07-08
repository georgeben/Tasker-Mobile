var add_button = document.getElementById('add-todo');
//console.log(add_button);

var inputField = document.getElementById('input');
//console.log(inputField);

add_button.addEventListener('click', addItemTodo);

function addItemTodo(){
    var userInput = inputField.value;
    if(userInput) addItem(userInput);
}

function addItem(todoItem){
    //console.log(todoItem);
    var list_item = document.createElement('li');
    list_item.classList.add('todo-list');
    list_item.innerHTML = todoItem;
    
    var buttons = document.createElement('div');
    buttons.classList.add('buttons');
    
    var delete_btn = document.createElement('button');
    delete_btn.innerHTML = "<img src='images/delete_button.png'>";
    
    var done_btn = document.createElement('button');
    done_btn.innerHTML = "<img src='images/done_icon.png'>";
    
    var todoList = document.getElementById('todo');
    
    buttons.appendChild(delete_btn);
    buttons.appendChild(done_btn);
    
    list_item.appendChild(buttons);
    
    //todoList.appendChild(list_item);
    
    todoList.insertBefore(list_item, todoList.childNodes[0]);
}