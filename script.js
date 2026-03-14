let draggedTask=null;

function addTaskToColumn(columnId){

let text=prompt("Task title");

if(!text) return;

let priority=prompt("Priority (low,medium,high)","low");

let dueDate=prompt("Due date YYYY-MM-DD","");

createTask(text,columnId,priority,dueDate);

saveTasks();

}

function createTask(text,columnId,priority,dueDate){

let task=document.createElement("div");

task.className="task";

task.draggable=true;

task.innerHTML=`

<p class="task-text">${text}</p>

<span class="priority ${priority}">${priority}</span>

<br>

<small>Due: ${dueDate}</small>

<br>

<button class="edit-btn">Edit</button>

<button class="delete-btn">Delete</button>

`;

task.addEventListener("dragstart",()=>{

draggedTask=task;

});

task.querySelector(".delete-btn").onclick=()=>{

task.remove();

saveTasks();

};

task.querySelector(".edit-btn").onclick=()=>{

let newText=prompt("Edit task",text);

let newPriority=prompt("Priority",priority);

let newDate=prompt("Edit date",dueDate);

if(newText)

task.querySelector(".task-text").textContent=newText;

if(newPriority){

let span=task.querySelector(".priority");

span.textContent=newPriority;

span.className="priority "+newPriority;

}

if(newDate)

task.querySelector("small").textContent="Due: "+newDate;

saveTasks();

};

document.getElementById(columnId).appendChild(task);

}

document.querySelectorAll(".task-list").forEach(column=>{

column.addEventListener("dragover",e=>{

e.preventDefault();

});

column.addEventListener("drop",()=>{

if(draggedTask){

column.appendChild(draggedTask);

saveTasks();

}

});

});

function saveTasks(){

let tasks=[];

document.querySelectorAll(".task").forEach(task=>{

tasks.push({

text:task.querySelector(".task-text").textContent,

priority:task.querySelector(".priority").textContent,

dueDate:task.querySelector("small").textContent.replace("Due: ",""),

column:task.parentElement.id

});

});

localStorage.setItem("kanbanTasks",JSON.stringify(tasks));

}

function loadTasks(){

let tasks=JSON.parse(localStorage.getItem("kanbanTasks"))||[];

tasks.forEach(t=>{

createTask(t.text,t.column,t.priority,t.dueDate);

});

}

loadTasks();