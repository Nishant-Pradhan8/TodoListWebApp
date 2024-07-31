let todoList = JSON.parse(localStorage.getItem('todoList')) || [];
let completedTodo = JSON.parse(localStorage.getItem('CompletedtodoList')) || [];
const inputElement = document.querySelector(".input");
const todoDivElement = document.querySelector(".todo-div");
const leftElement = document.querySelector('.left-items');
const allElem = document.querySelector('.all');
const activeElem = document.querySelector('.active');
const completeElem = document.querySelector('.complete');
const clearCompElem = document.querySelector('.clearCompleted');
let uniqueId = 0;
let completedId = 0;

renderTodo();
darkMode();
function renderTodo(){
  let todoListHTML = ""
  
  todoList.forEach((item)=>{
    uniqueId++;
    let HTML = `
    <div class="todoListDiv"  draggable="true">
    <div class="details">
     <input type="checkbox" id="${uniqueId}" class = "checkedBox" >
     <label class= "label" for="${uniqueId}">${item}</label>
    </div>
    </div>`;
    todoListHTML += HTML;
  })
  
  todoDivElement.innerHTML = todoListHTML;
  let detailsElem = document.querySelectorAll('.details');
  let imageElem = document.querySelector('.mode');
  detailsElem.forEach((div)=>{
    if(imageElem.src.endsWith("icon-sun.svg")){
      div.classList.remove('todo');

    } else{
       div.classList.add('todo');
    }
  })
  
  allElem.classList.add("todoStates");
  todoState();
  updateItemNumber(todoList);
  sortable();
}


function renderCompleted(){
  let completedHTML = "";
  completedTodo.forEach((item)=>{
    completedId++;
    let HTML = `
    <div class="todoListDiv">
     <div class="details">
     <input type="checkbox" id="${completedId}" class = "checkedBox" checked>
     <label class= "label crossed" for="${completedId}">${item}</label>
     </div>
    </div>`;
    completedHTML += HTML;
  })
   todoDivElement.innerHTML =  completedHTML;
   updateItemNumber(completedTodo);
   localStorage.setItem('CompletedtodoList',JSON.stringify(completedTodo))
}

inputElement.addEventListener("keydown",(event)=>{
  if(event.key === "Enter"){
    addTodoList();
  }
})

function addTodoList(){
  let todo = inputElement.value;
  todoList.push(todo);
  inputElement.value = "";
  renderTodo();
  localStorage.setItem('todoList',JSON.stringify(todoList))
}

function todoState(){
const checkBoxElem = document.querySelectorAll('.checkedBox');
checkBoxElem.forEach((checkbox)=>{
  checkbox.addEventListener("change",()=>{
    const labelElem = document.querySelector(`.label[for="${checkbox.id}"]`);
    const todo = labelElem.innerHTML;
    if(labelElem.classList.contains('crossed')){
      labelElem.classList.remove("crossed");
      todoList.push(todo);
      if(completedTodo.includes(todo)){
        let index = completedTodo.indexOf(todo);
        completedTodo.splice(index,1)
      }
      localStorage.setItem('todoList',JSON.stringify(todoList))
      updateItemNumber();
      
    } 
    else{
      labelElem.classList.add("crossed");
      let todoToRemove = todoList.indexOf(todo);
      todoList.splice(todoToRemove,1);
      completedTodo.push(todo);
      localStorage.setItem('todoList',JSON.stringify(todoList));
      localStorage.setItem('CompletedtodoList',JSON.stringify(completedTodo));
      updateItemNumber();
    } 
  })
})
};


function updateItemNumber(arr){
  let leftItems = 0;
  arr.forEach(()=>{
    leftItems+=1;
  })
  leftElement.innerHTML = `${leftItems} items left`;
}
document.querySelector(".complete").addEventListener("click",()=>{
  renderCompleted();
  completeElem.classList.add("todoStates");
  allElem.classList.remove("todoStates");
  activeElem.classList.remove("todoStates");

});
document.querySelector(".active").addEventListener("click",()=>{
  renderTodo();
  allElem.classList.remove("todoStates");
  completeElem.classList.remove("todoStates");
  activeElem.classList.add("todoStates");
  
});
document.querySelector(".all").addEventListener("click",()=>{
  renderTodo();
  activeElem.classList.remove("todoStates");
  completeElem.classList.remove("todoStates");
});
clearCompElem.addEventListener('click',()=>{
   completedTodo.splice(0, completedTodo.length);
   renderCompleted();
   completeElem.classList.add("todoStates");
   allElem.classList.remove("todoStates");
   activeElem.classList.remove("todoStates");
})
function sortable(){
const todoListDivElem = document.querySelectorAll(".todoListDiv");
const sortable = document.querySelector(".todo-div"); 
todoListDivElem.forEach((todo) => {
  todo.addEventListener("dragstart", () => {
    setTimeout(() => {
      todo.classList.add('dragging');
    }, 0);
  });

  todo.addEventListener('dragend', () => {
    todo.classList.remove('dragging');
  });
});
sortable.addEventListener('dragover', initSortableList);
  
function initSortableList(e) {
    
    const draggingItem = sortable.querySelector('.dragging');
    const siblings = [...sortable.querySelectorAll(".todoListDiv:not(.dragging)")];
    const nextSibiling = siblings.find(sibling => {
      return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
    });
    sortable.insertBefore(draggingItem,nextSibiling);
    sortList();    
  }
}

function sortList(){
  const todoListDivElem = document.querySelectorAll(".todoListDiv");
  let sortedList = []
  todoListDivElem.forEach((todo)=>{
    let labelText = todo.querySelector('.label').innerHTML;
    sortedList.push(labelText);
  })
  todoList = sortedList;
  localStorage.setItem('todoList',JSON.stringify(todoList))
}

function darkMode(){
  let body = document.querySelector('body');
  let todoDivElem = document.querySelector('.todo-div');
  let optionsElem = document.querySelector('.options');
  let messageElem = document.querySelector('.message');
  let imageElem = document.querySelector('.mode');
  let topElem = document.querySelector('.top-div');
  let stateElem = document.querySelector('.state-div');
  
  imageElem.addEventListener('click',()=>{
    if(imageElem.src.endsWith("icon-sun.svg")){
      imageElem.src = "images/icon-moon.svg";
      body.classList.add('dark-mode');
      inputElement.classList.add('dark-mode');
      todoDivElem.classList.add('todoListDiv-dark-mode');
      optionsElem.classList.add('options-dark-mode');
      messageElem.classList.add('message-dark-mode');
      topElem.classList.add('top-div-dark-mode');
      stateElem.classList.add('state-div-dark-mode');
    } 
    else{
      imageElem.src = "images/icon-sun.svg";
      body.classList.remove('dark-mode');
      inputElement.classList.remove('dark-mode');
      todoDivElem.classList.remove('todoListDiv-dark-mode');
      optionsElem.classList.remove('options-dark-mode');
      messageElem.classList.remove('message-dark-mode');  
      topElem.classList.remove('top-div-dark-mode');
       stateElem.classList.remove('state-div-dark-mode');
    }
    renderTodo();
  })
  
}