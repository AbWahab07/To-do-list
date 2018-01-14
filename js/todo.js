window.onload = init;
var todos = new Array();

function todo(task, who, dueDate) {
    this.task = task;
    this.who = who;
    this.dueDate = dueDate;
    this.done = false;
}

function init() {
    getToDoList();
    var submit = document.getElementById('submit');
    submit.onclick = getFormData;
}

function getToDoList() {
    var request = new XMLHttpRequest();
    var url = "http://localhost/to-do-list/js/tasks.json";
    request.open("GET", url);
    request.onreadystatechange = function() {
        //var div = document.getElementById('todolist');
        if (this.readyState == this.DONE && this.status == 200) {
            console.log("Content-type : " + this.getResponseHeader("Content-type"));
            console.log("Status : " + this.statusText);
            if (this.responseText != null) {
                //div.innerHTML = this.responseText;
                parseToDoItems(this.responseText);
                addTodoToPage();
            } else {
                div.innerHTML = "Error. No data.";
            }
        }
    }
    request.send();
}

function parseToDoItems(todoJson) {
    if (todoJson == null || todoJson.trim() == "") {
        return;
    }
    var todoArray = JSON.parse(todoJson);
    if (todoArray.length == 0) {
        console.log("No To do Item");
        return;
    }
    for (var i = 0; i < todoArray.length; i++) {
        todos.push(todoArray[i]);
    }
    //console.log("To do Array : ");
    //console.log(todos);
}

function addTodoToPage() {
    var list = document.getElementById('todolist');
    for (var i = 0; i < todos.length; i++) {
        var todoItem = todos[i];
        var li = document.createElement('li');
        li.innerHTML = todoItem.who + " needs to " + todoItem.task + " by " + todoItem.dueDate;
        list.appendChild(li);
    }
}

function getFormData() {
    //alert('hello');
    var task = document.getElementById('task').value;
    if (checkInput(task, "Please enter task."))
        return;
    var who = document.getElementById('who').value;
    if (checkInput(who, "Please enter who."))
        return;
    var duedate = document.getElementById('dueDate').value;
    if (checkInput(duedate, "Please enter dueDate.")) {
        return;
    }

    //console.log("Task :" + task + " " + who + " " + due);
    var newToDo = new todo(task, who, duedate);
    console.log(newToDo);
    todos.push(newToDo);
    addNewTodoToPage(newToDo);
}

function checkInput(value, msg) {
    if (value == null || value == "") {
        alert(msg);
        return true;
    }
    return false;
}

function addNewTodoToPage(newToDo) {
    var list = document.getElementById('todolist');
    //var toDoItem = JSON.parse(newToDo);
    var li = document.createElement('li');
    li.innerHTML = newToDo.who + " needs to " + newToDo.task + " by " + newToDo.dueDate;
    list.appendChild(li);
    document.forms[0].reset();

}