var add_button = document.getElementById('add-todo');
//console.log(add_button);

var inputField = document.getElementById('input');
//console.log(inputField);

add_button.addEventListener('click', addItemTodo);

function addItemTodo(){
    var userInput = inputField.value;
    if(userInput){
      addItem(userInput);
        inputField.value = '';
    } 
}

function removeTodoItem(){
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    parent.removeChild(item);
}

function completeTodo(){
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var parentId = parent.id;
    
    var target = (parentId === "todo")? document.getElementById('completed'):document.getElementById('todo');
    
    var completedItems = document.getElementById('completed').childElementCount;
    if(completedItems === 0){
        var completedLabel = document.createElement('h4');
        completedLabel.appendChild(document.createTextNode("Completed tasks"));
        document.getElementById('todo').appendChild(completedLabel);
    }
    
    parent.removeChild(item);
    target.insertBefore(item, target.childNodes[0]);
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
    delete_btn.addEventListener('click', removeTodoItem);
    
    var done_btn = document.createElement('button');
    done_btn.innerHTML = "<img src='images/done_icon.png'>";
    done_btn.addEventListener('click', completeTodo);
    
    var todoList = document.getElementById('todo');
    
    buttons.appendChild(delete_btn);
    buttons.appendChild(done_btn);
    
    list_item.appendChild(buttons);
    
    todoList.insertBefore(list_item, todoList.childNodes[0]);
}