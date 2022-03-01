const addBtn = document.getElementById("add");
const saveBtn = document.getElementById("save");
const input = document.getElementById("addTodo");
const list = document.getElementById("todoList");
var tasks = JSON.parse(localStorage.getItem("list")) || [];

addBtn.addEventListener("click", add);

function isValidInput(value) {
  if (value === ''){    
    alert("Please enter a valid task name");
  } else if (tasks.includes(value)) {
    alert("The Todo task already exits");
  } else {
    return true;
  }
}

function add(event) {
  event.preventDefault();
  if (isValidInput(input.value)){
    tasks.push(input.value);
    localStorage.setItem("list", JSON.stringify(tasks));
    input.value = "";
  }
  display();
}

function display() {
  list.innerHTML = "";
  if(tasks.length > 0) {
    for(var i = 0; i < tasks.length; i++) {
      deleteId= "delete" + i; 
      list.innerHTML += `<div><p>${tasks[i]}</p>
      <button class="delete" id="delete${i}" onClick ="deleteItem(this.id)">Delete</button>
      <button class="edit" id="edit${i}" onClick ="editItem(this.id)">Edit</button><div>`;
    }
  }
}

function deleteItem(id) {  
  index = id.match(/\d+/);
  if(confirm("Are you sure you want to delete " + tasks[index] + "?")) {    
    tasks.splice(index, 1);
    localStorage.setItem("list", JSON.stringify(tasks));
  }
  display();
}

function editItem(id) {
  index = id.match(/\d+/);
  input.value = tasks[index];
  document.getElementById("delete" + index).disabled = true;
  addBtn.style.display = "none";
  saveBtn.style.display = "inline-block"
  saveBtn.onclick = function () {
    if (isValidInput(input.value)){
      tasks[index] = input.value;
      localStorage.setItem("list", JSON.stringify(tasks));
      input.value = "";
    }
    display();
  }
}

display();