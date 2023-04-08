/*
  CLASSESS

*/
class Todo{
  constructor(name){
    this.name = name;
  }
  createTodo=(todos)=>{
    // get the id from the model
    this.id = determineId(todos);
    //create the date
    this.date = createDate();
    //create the object
    this.isFinished = false;
    todos.push(this);
    setTodosLocalStorage(todos);
  }
  
  
}

Todo.prototype.createTodo=(todos)=>{
  // get the id from the model
  this.id = determineId(todos);
  //create the date
  this.date = createDate();
  //create the object
  this.isFinished = false;
  todos.push(this);
}

// Todo.prototype.updateDate=()=>{
//   this.date =   createDate();
// };


/*
  MODELS
  Exemple:
  {
      id:0,
      name:"Reading Books",
      date:"06/04/2023",
      isFinished:false
  },
  {
    id:1,
    name:"Finish assignment",
    date:"06/04/2023",
    isFinished:false
  }
array
  [
  {
    id:0,
    name:"Reading Books",
    date:"06/04/2023",
    isFinished:true
},
{
  id:1,
  name:"Finish assignment",
  date:"06/04/2023",
  isFinished:false
}
]
*/

let todos = getTodosLocalStorage();

function setTodosLocalStorage(todo){
  localStorage.setItem("todos", JSON.stringify(todo));
}

function getTodosLocalStorage(){
  return JSON.parse(localStorage.getItem("todos")) ?JSON.parse(localStorage.getItem("todos")):[];
}


/*
  MODEL CONTROLLERS

*/
function createTodoModel(todoText,todos){
  //
  let object = new Todo(todoText);
  object.createTodo(todos);
  return object;
}

/*
  CONTROLLERS

*/
function createTodoController(todoText, todos){
  let todo = createTodoModel(todoText, todos);
  
  addTodoView(todo);
}

/*
  VIEW FUNCTIONS

*/

function addTodoView(todo){
  
  let todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  todoDiv.setAttribute("data-id",todo.id);

  let todoContent = document.createElement("div");
  todoContent.classList.add("todo-content");
  let h3 = document.createElement("h3");
  h3.classList.add("todo-title");
  h3.textContent = todo.name;
  let todoDate = document.createElement("div");
  todoDate.classList.add("todo-date-box");
  let documentIcon = document.createElement("ion-icon");
  documentIcon.classList.add("icon-todo");
  documentIcon.setAttribute("name","document-text-outline");
  let date = document.createElement("span");
  date.classList.add("todo-date");
  date.textContent = todo.date;
  todoContent.appendChild(h3);
  todoDate.appendChild(documentIcon);
  todoDate.appendChild(date);
  todoContent.appendChild(todoDate);

  let todoAction = document.createElement("div");
  todoAction.classList.add("todo-action-box");

  let buttonUpdate = document.createElement("button");
  buttonUpdate.classList.add("btn","update-btn");
  buttonUpdate.setAttribute("data-btn","update");
  buttonUpdate.setAttribute("onclick","updateModalActive(true,this)");
  let updateIcon = document.createElement("ion-icon");
  updateIcon.classList.add("icon-todo");
  updateIcon.setAttribute("name","pencil");
  buttonUpdate.appendChild(updateIcon);

  let buttonComplite = document.createElement("button");
  buttonComplite.classList.add("btn","task-btn", "unfinished-btn");
  buttonComplite.setAttribute("data-btn","unfinished");
  let completeIcon = document.createElement("ion-icon");
  completeIcon.classList.add("icon-todo");
  completeIcon.setAttribute("name","checkmark-outline");
  buttonComplite.appendChild(completeIcon);
  buttonComplite.addEventListener("click",taskBtnEventListener)

  let buttonDelete = document.createElement("button");
  buttonDelete.classList.add("btn","delete-btn");
  buttonDelete.setAttribute("data-btn","delete");
  let deleteIcon = document.createElement("ion-icon");
  deleteIcon.classList.add("icon-todo");
  deleteIcon.setAttribute("name","trash");
  buttonDelete.appendChild(deleteIcon);
  buttonDelete.setAttribute("onclick","deleteModalActive(true,this)");

  todoAction.appendChild(buttonUpdate);
  todoAction.appendChild(buttonComplite);
  todoAction.appendChild(buttonDelete);

  let todosContainer = document.querySelector(".todos");
  todoDiv.appendChild(todoContent);
  todoDiv.appendChild(todoAction);
  todosContainer.appendChild(todoDiv);
}
function printTodoView(todo){
  
  let todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  if(todo.isFinished){
    todoDiv.classList.add("finished");
  }
  todoDiv.setAttribute("data-id",todo.id);

  let todoContent = document.createElement("div");
  todoContent.classList.add("todo-content");
  let h3 = document.createElement("h3");
  h3.classList.add("todo-title");
  h3.textContent = todo.name;
  let todoDate = document.createElement("div");
  todoDate.classList.add("todo-date-box");
  let documentIcon = document.createElement("ion-icon");
  documentIcon.classList.add("icon-todo");
  documentIcon.setAttribute("name","document-text-outline");
  let date = document.createElement("span");
  date.classList.add("todo-date");
  date.textContent = todo.date;
  todoContent.appendChild(h3);
  todoDate.appendChild(documentIcon);
  todoDate.appendChild(date);
  todoContent.appendChild(todoDate);

  let todoAction = document.createElement("div");
  todoAction.classList.add("todo-action-box");

  let buttonUpdate = document.createElement("button");
  buttonUpdate.classList.add("btn","update-btn");
  buttonUpdate.setAttribute("data-btn","update");
  buttonUpdate.setAttribute("onclick","updateModalActive(true,this)");
  let updateIcon = document.createElement("ion-icon");
  updateIcon.classList.add("icon-todo");
  updateIcon.setAttribute("name","pencil");
  buttonUpdate.appendChild(updateIcon);

  let buttonComplite = document.createElement("button");
  if(todo.isFinished){
    buttonComplite.classList.add("btn","task-btn", "finished-btn");
    buttonComplite.setAttribute("data-btn","finished");
  }else{
    buttonComplite.classList.add("btn","task-btn", "unfinished-btn");
    buttonComplite.setAttribute("data-btn","unfinished");
  }
  let completeIcon = document.createElement("ion-icon");
  completeIcon.classList.add("icon-todo");
  if(todo.isFinished){
    completeIcon.setAttribute("name","close-circle");

  }else{
    completeIcon.setAttribute("name","checkmark-outline");
  }
  buttonComplite.appendChild(completeIcon);
  buttonComplite.addEventListener("click",taskBtnEventListener)

  let buttonDelete = document.createElement("button");
  buttonDelete.classList.add("btn","delete-btn");
  buttonDelete.setAttribute("data-btn","delete");
  let deleteIcon = document.createElement("ion-icon");
  deleteIcon.classList.add("icon-todo");
  deleteIcon.setAttribute("name","trash");
  buttonDelete.appendChild(deleteIcon);
  buttonDelete.setAttribute("onclick","deleteModalActive(true,this)");

  todoAction.appendChild(buttonUpdate);
  todoAction.appendChild(buttonComplite);
  todoAction.appendChild(buttonDelete);

  let todosContainer = document.querySelector(".todos");
  todoDiv.appendChild(todoContent);
  todoDiv.appendChild(todoAction);
  todosContainer.appendChild(todoDiv);
}

// print todos
function printTodos(todos){
  let todosContainer = document.querySelector(".todos")
  todosContainer.innerHTML = "";
  for(let i=0; i<todos.length; i++){
    printTodoView(todos[i]);
  }
 }
/*
  HELPER FUNCTIONS

*/
//create the date
function createDate(){
  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth()+1;
  let year = today.getFullYear();

  if(month < 10){
    month = `0${month}`;
  }
  if(day < 10){
    day = `0${day}`;
  }

  return `${day}/${month}/${year}`;
}
function determineId(todos){
  if(todos.length==0){
    return 0;
  }
  return todos[todos.length-1].id+1;
}

