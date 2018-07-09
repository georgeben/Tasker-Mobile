//Object to store all the tasks added by the user
var taskData = (localStorage.getItem('tasks'))? JSON.parse(localStorage.getItem('tasks')) : {
    uncompletedTasks:[],
    completedTasks:[]
}

//Determines when to show the "Completed tasks label"
var showCompleteLabel = false;

//Retrieves data from local storage and renders it on the DOM
displayData();

function displayData(){
    //Displays the data in local storage on the DOM
    
    //If there are no tasks, end function
    if(!taskData.uncompletedTasks.length && !taskData.completedTasks.length) return;
    
    //Add tasks from the uncompletedTasks array
    for(let i = 0; i < taskData.uncompletedTasks.length; i++){
        let task = taskData.uncompletedTasks[i];
        addItemToDOM(task);
    }
    
    //Add tasks from the completedTasks array
    for(let j = 0; j < taskData.completedTasks.length; j++){
        let task = taskData.completedTasks[j];
        addItemToDOM(task, true);

    }
}

function storeDataLocally(){
    //JSON.stringify() converts a javascript object to JSON and stores it in local storage
    localStorage.setItem('tasks', JSON.stringify(taskData));
}

//Button to add tasks to the taskList
var add_button = document.getElementById('add-todo');

//Field for the user to type in tasks
var inputField = document.getElementById('input');

//Adds task to the taskList when the add_button is clicked
add_button.addEventListener('click', addTaskToList);

//Add tasks to task list when the enter key is pressed
inputField.addEventListener("keypress", function(event){
    if(event.which === 13){ 
        //Checks if the enter key as pressed
        addTaskToList();
    }
})


function addTaskToList(){
    let userInput = inputField.value;
    userInput = userInput.trim(); //Removes empty spaces from the users input
    if(userInput){
        taskData.uncompletedTasks.push(userInput);
        storeDataLocally();
        addItemToDOM(userInput);
        inputField.value = ''; //Resets the input field back toits emptys state
    }
}

function removeTodoItem(){
    let listItemClicked = this.parentNode.parentNode;  //Retrieves the list item that was clicked
    let parent = listItemClicked.parentNode;
    let parentId = parent.id;
    let task = listItemClicked.innerText;  //Retrieves the text contaied in the list item
    
    //Determine which array to remove item from
    if(parentId === "todo"){
        taskData.uncompletedTasks.splice(taskData.uncompletedTasks.indexOf(task), 1);
    }else{
        taskData.completedTasks.splice(taskData.completedTasks.indexOf(task), 1);   
    }
    
    storeDataLocally();
    
    //Removes the list item from the list
    parent.removeChild(listItemClicked);
}

function completeTodo(){
    
    let listItemClicked = this.parentNode.parentNode; //Retrieves the list item that was clicked
    let parent = listItemClicked.parentNode; //Retrieves the list(ul) associated with that list item
    let parentId = parent.id; //Retrieves the id of the list
    
    let task = listItemClicked.innerText;
    
    //Determines which array would e updated
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
