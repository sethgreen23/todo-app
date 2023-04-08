/*
  FUNCTIONALITIES
*/
function addModalActive(isOpen){
  let addModal = document.querySelector(".todo-input");
  if(isOpen){
    addModal.classList.add("active");
    document.querySelector(".input-text").focus();
  }else{
    addModal.classList.remove("active")
  }
}

// activate the modal and filling it with values to prepare the update
function updateModalActive(isOpen,event){
  let updateModal = document.querySelector(".todo-update");
  if(isOpen){
    // window.setTimeout(() => updatedText.focus(), 0);
    document.querySelector(".update-text").focus();
    updateModal.classList.add("active");
    //need to bring the id of the element
    let parentNode = event.parentElement.parentElement;
    let id = parentNode.getAttribute("data-id");
    console.log(id);
    //call the object
    let object = todos[id];
    // get the object text for the todo
    let todoText = object.name;
    console.log(todoText)
    // i need to get the textfield
    let input = document.querySelector(".update-text");
    input.value = todoText;
    let inputHidden = document.querySelector(".update-hidden")
    inputHidden.value = object.id;
  }else{
    updateModal.classList.remove("active")
    let input = document.querySelector(".update-text");
    input.value = "";
    let inputHidden = document.querySelector(".update-hidden")
    inputHidden.value = "";
  }
  
}

function deleteModalActive(isOpen, event){
  let deleteModal = document.querySelector(".todo-delete");
  let deleteHiden = document.querySelector(".delete-hidden");
  if(isOpen){
    // add the active class
    deleteModal.classList.add("active")
    let parentNode = event.parentElement.parentElement;
    // console.log(parentNode)
    let id = parentNode.getAttribute("data-id")
    console.log(parentNode,id)
    deleteHiden.value = id;
  }else{
    //delete the active class
    deleteModal.classList.remove("active");
    deleteHiden.value= "";
  }
}


// Create a Todo
let addBtnAction = document.querySelector(".add-btn-action");
addBtnAction.addEventListener("click", (event)=>{
  // i need to get the textfield
  let input = document.querySelector(".input-text");
  let inputValue = input.value;
  if(inputValue!=""){

    //close the modal
    let addModal = document.querySelector(".todo-input");
    input.value = "";
    addModal.classList.remove("active")
    createTodoController(inputValue, todos);
  }else{
    alert("Please enter a Todo");
  }
})
// update a Todo
let updateBtnAction = document.querySelector(".update-btn-action");

// updateBtnAction.forEach((btn)=>{
//   btn.addEventListener("click", (event)=>{
    // // need to bring the id of the element
    // let id = event.target.parentElement.parentElement;
    // // call the object
    // let object = todos[id];
    // // get the object text for the todo
    // let todoText = object.name;
    // console.log(todoText)
    // // i need to get the textfield
    // let input = document.querySelector(".update-text");
    // input.value = todoText;
//   })
// })

updateBtnAction.addEventListener("click",(event)=>{
  let updatedText = document.querySelector(".update-text");
  let updatedTextValue = updatedText.value;
  
  if(updatedTextValue!=""){
    let updateBtnHidden = document.querySelector(".update-hidden");
    console.log(updateBtnHidden.value)
    let id = updateBtnHidden.value;
    let objectUpdated = todos[id];
    objectUpdated.date = createDate();
    objectUpdated.name = updatedTextValue;
    setTodosLocalStorage(todos)
    updatedText.value = "";
    updateModalActive(false,event);
    printTodos(todos);

  }else{
    alert("Please update the todo!");
  }
})

//delete todo
let deleteBtnAction = document.querySelector(".delete-action-yes");
deleteBtnAction.addEventListener("click", (event)=>{
  let id = document.querySelector(".delete-hidden");
  // delete the object
  todos.splice(id, 1);
  setTodosLocalStorage(todos)
  // remove the active class from delete todo
  document.querySelector(".todo-delete").classList.remove("active")
  // print todos
  printTodos(todos);
})

// Functionality for Completed btn
let tasksBtns = document.querySelectorAll(".task-btn");

tasksBtns.forEach((btn)=>{
  btn.addEventListener("click", taskBtnEventListener)
})

//
function taskBtnEventListener(event){
  console.log(tasksBtns);
  // get the dataset attribute
  let btn = event.target.parentElement;
  let btnAttribute = btn.getAttribute("data-btn");
  //get the targetedIcon
  let iconTarget = event.target;
  //get the todo element
  let btnParent = btn.parentElement.parentElement;
  // get the id
  let id = btnParent.getAttribute("data-id");
  // console.log("parent", btnParent)
  // console.log("parent id", id);
  if(btnAttribute == "finished"){
    // change the fisnished attribute to unfinished
    btn.setAttribute("data-btn","unfinished")
    //change the icon name
    iconTarget.setAttribute("name","checkmark-outline")
    //change the class from finished to unfinished
    btn.classList.remove("finished-btn");
    btn.classList.add("unfinished-btn");
    //change thedataset from finished to unfinished
    let object = todos[id];
    object.isFinished = false;
    setTodosLocalStorage(todos)
    
    // console.log(todos,id);
  }else if(btnAttribute=="unfinished"){
     // change the fisnished attribute to unfinished
     btn.setAttribute("data-btn","finished")
     //change the icon name
     iconTarget.setAttribute("name","close-circle")
     //change the class from finished to unfinished
     btn.classList.remove("unfinished-btn");
     btn.classList.add("finished-btn");
     //change thedataset from finished to unfinished
     let object = todos[id];
     console.log(object);
     object.isFinished = true;
     setTodosLocalStorage(todos)
    //  console.log(todos,id);
  }
  btnParent.classList.toggle("finished")
}

// print todos
printTodos(todos);

// close the modal when clicking away
var modals = document.querySelectorAll(".modal");

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  modals.forEach((modal)=>{
    // the target is the ovelay i need its parent
    if (event.target.parentElement == modal) {
      modal.classList.remove("active");
    }
  })
  
}
