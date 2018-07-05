var add_button = document.getElementById("add-todo");
add_button.addEventListener('click', addTodoItem);

function addTodoItem(){
    var todoItem = document.getElementById('todo-input').value;
    console.log(todoItem);
}