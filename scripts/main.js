
var data = (localStorage.getItem('tasks'))? JSON.parse(localStorage.getItem('tasks')) : {
    todo:[],
    completed:[]
}

var showCompleteLabel = false;

displayData();

function displayData(){
    //Displays the stored tasks on th elist items
    if(!data.todo.length && !data.completed.length) return;
    
    for(let i = 0; i < data.todo.length; i++){
        var task = data.todo[i];
        addItem(task);
    }
    
    for(let j = 0; j < data.completed.length; j++){
        var task = data.completed[j];
        addItem(task, completed);

    }
}

function storeDataLocally(){
    //This function gets called everytime the data object is being updated
    //JSON.stringify() converts a javascript object to JSON
    localStorage.setItem('tasks', JSON.stringify(data));
}


var add_button = document.getElementById('add-todo');

var inputField = document.getElementById('input');

add_button.addEventListener('click', addItemTodo);

inputField.addEventListener("keypress", function(event){
    if(event.which === 13){
        //console.log("Enter key has been pressed");  
        validateInput();
    }
})



function addItemTodo(){
     validateInput()
}

function validateInput(){
    var userInput = inputField.value;
    userInput = userInput.trim();
    if(userInput){
        data.todo.push(userInput);
        storeDataLocally();
        addItem(userInput);
        inputField.value = '';
    }
}

function removeTodoItem(){
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var parentId = parent.id;
    var todoText = item.innerText;
    
    if(parentId === "todo"){
        data.todo.splice(data.todo.indexOf(todoText), 1);
    }else{
        data.completed.splice(data.completed.indexOf(todoText), 1);   
    }
    
    storeDataLocally();
    
    parent.removeChild(item);
}

function completeTodo(){
    var item = this.parentNode.parentNode; //Retrieves the list item which button was clicked
    var parent = item.parentNode; //Retrieves the list(ul) associated with that list item
    var parentId = parent.id; //Retrieves the id of the list
    
    //
    var todoText = item.innerText;
    
    if(parentId === "todo"){
        data.todo.splice(data.todo.indexOf(todoText), 1);
        data.completed.push(todoText);
    }else{
        data.completed.splice(data.completed.indexOf(todoText), 1);
        data.todo.push(todoText);
    }
    
    storeDataLocally();
    
    //Determines where to move the list item:either the list of todo items or the list of completed items
    var target = (parentId === "todo")? document.getElementById('completed'):document.getElementById('todo');
    
    //Display a label on the completed list
    var completedItems = document.getElementById('completed').childElementCount;
    if(completedItems === 0){
        var completedLabel = document.createElement('h4');
        completedLabel.appendChild(document.createTextNode("Completed tasks"));
        document.getElementById('todo').appendChild(completedLabel);
    }
    
    parent.removeChild(item);
    target.insertBefore(item, target.childNodes[0]);
}

function addItem(todoItem, completed){
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
    
    var todoList = (completed)? document.getElementById("completed") : document.getElementById('todo');
    
    if(completed  && !showCompleteLabel){
        var completedLabel = document.createElement('h4');
        completedLabel.appendChild(document.createTextNode("Completed tasks"));
        document.getElementById('todo').appendChild(completedLabel);
        
        showCompleteLabel = true;
    }
    
    buttons.appendChild(delete_btn);
    buttons.appendChild(done_btn);
    
    list_item.appendChild(buttons);
    
    //Adds the new list item to the top of the list
    todoList.insertBefore(list_item, todoList.childNodes[0]);
}
