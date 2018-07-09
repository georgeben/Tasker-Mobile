
var taskData = (localStorage.getItem('tasks'))? JSON.parse(localStorage.getItem('tasks')) : {
    uncompletedTasks:[],
    completedTasks:[]
}

var showCompleteLabel = false;

displayData();

function displayData(){
    //Displays the stored tasks on th elist items
    if(!taskData.uncompletedTasks.length && !taskData.completedTasks.length) return;
    
    for(let i = 0; i < taskData.uncompletedTasks.length; i++){
        var task = taskData.uncompletedTasks[i];
        addItemToDOM(task);
    }
    
    for(let j = 0; j < taskData.completedTasks.length; j++){
        var task = taskData.completedTasks[j];
        addItemToDOM(task, true);

    }
}

function storeDataLocally(){
    //This function gets called everytime the data object is being updated
    //JSON.stringify() converts a javascript object to JSON
    localStorage.setItem('tasks', JSON.stringify(taskData));
}


var add_button = document.getElementById('add-todo');

var inputField = document.getElementById('input');

add_button.addEventListener('click', validateInput);

inputField.addEventListener("keypress", function(event){
    if(event.which === 13){
        //console.log("Enter key has been pressed");  
        validateInput();
    }
})



/*function addItemTodo(){
     validateInput()
}*/

function validateInput(){
    var userInput = inputField.value;
    userInput = userInput.trim();
    if(userInput){
        taskData.uncompletedTasks.push(userInput);
        storeDataLocally();
        addItemToDOM(userInput);
        inputField.value = '';
    }
}

function removeTodoItem(){
    var listItemClicked = this.parentNode.parentNode;
    var parent = listItemClicked.parentNode;
    var parentId = parent.id;
    var task = listItemClicked.innerText;
    
    if(parentId === "todo"){
        taskData.uncompletedTasks.splice(taskData.uncompletedTasks.indexOf(task), 1);
    }else{
        taskData.completedTasks.splice(taskData.completedTasks.indexOf(task), 1);   
    }
    
    storeDataLocally();
    
    parent.removeChild(listItemClicked);
}

function completeTodo(){
    var listItemClicked = this.parentNode.parentNode; //Retrieves the list item which button was clicked
    var parent = listItemClicked.parentNode; //Retrieves the list(ul) associated with that list item
    var parentId = parent.id; //Retrieves the id of the list
    
    //
    var task = listItemClicked.innerText;
    
    if(parentId === "todo"){
        taskData.uncompletedTasks.splice(taskData.uncompletedTasks.indexOf(task), 1);
        taskData.completedTasks.push(task);
    }else{
        taskData.completedTasks.splice(taskData.completedTasks.indexOf(task), 1);
        taskData.uncompletedTasks.push(task);
    }
    
    storeDataLocally();
    
    //Determines where to move the list item:either the list of todo items or the list of completed items
    var target = (parentId === "todo")? document.getElementById('completed'):document.getElementById('todo');
    
    //Display a label on the completed list
    var completedItems = document.getElementById('completed').childElementCount;
    if(completedItems === 0 && !showCompleteLabel){
        var completedLabel = document.createElement('h4');
        completedLabel.appendChild(document.createTextNode("Completed tasks"));
        document.getElementById('todo').appendChild(completedLabel);
    }
    
    parent.removeChild(listItemClicked);
    target.insertBefore(listItemClicked, target.childNodes[0]);
}

function addItemToDOM(task, completed){
    //console.log(todoItem);
    var list_item = document.createElement('li');
    list_item.classList.add('todo-list');
    list_item.innerHTML = task;
    
    var buttons = document.createElement('div');
    buttons.classList.add('buttons');
    
    var delete_btn = document.createElement('button');
    delete_btn.innerHTML = "<img src='images/delete_button.png'>";
    delete_btn.addEventListener('click', removeTodoItem);
    
    var done_btn = document.createElement('button');
    done_btn.innerHTML = "<img src='images/done_icon.png'>";
    done_btn.addEventListener('click', completeTodo);
    
    var taskList = (completed)? document.getElementById("completed") : document.getElementById('todo');
    
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
    taskList.insertBefore(list_item, taskList.childNodes[0]);
}
