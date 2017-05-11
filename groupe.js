// Problem: User interaction doesn't provide desired results.
// Solution: Add interactivity so the user can manage daily tasks

var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTasksHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");

//New Task List Item
var createNewTaskElement = function(taskString) {
  //Create List Item
  var listItem = document.createElement("li");

  //input (checkbox)
  var checkBox = document.createElement("input"); // checkbox
  //label
  var label = document.createElement("label");
  //input (text)
  var editInput = document.createElement("input"); // text
  //button.edit
  var editButton = document.createElement("button");
  //button.delete
  var deleteButton = document.createElement("button");
  
      //Each element needs modifying
  

	//Further modifies individual Elements - initializes
	 checkBox.type = "checkbox";
	 editInput.type = "text";
	 editButton.innerText = "Edit";
	 editButton.className = "edit";
 	 deleteButton.innerText = "Delete";
	 deleteButton.className = "delete";
  	 label.innerText = taskString;
	
	//Appends elements
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    //Returns Completed item
	return listItem;
}

//Creates a new Task
var addTask = function() {
  console.log("Add task...");
  
   //Creates Task with the user input from calendar-Task
  var listItem = createNewTaskElement(taskInput.value);
  
  //Append listItem to unfinishedTask
  incompleteTasksHolder.appendChild(listItem);
  bindTaskTasks(listItem, taskCompleted);  
  
  taskInput.value = "";   
}

// This code edits an already existing Task
var editTask = function() {
  console.log("Edit Task...");
  
  var listItem = this.parentNode;
  
  var editInput = listItem.querySelector("input[type=text]")
  var label = listItem.querySelector("label");
  
  var containsClass = listItem.classList.contains("editMode");
  
  
   //If class is already in Edit Mode converts typed text to visible input
  if(containsClass) {
	  
    //Switches from Edit Mode and makes label input
    label.innerText = editInput.value;
  } else {
	  
      
    //Switches TO Edit Mode and makes input label
    editInput.value = label.innerText;
  }
  
   //Switches between Edit mode
  listItem.classList.toggle("editMode");
 
}


//Delete an Task
var deleteTask = function() {
  console.log("Delete task...");
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  
  //Remove Task
  ul.removeChild(listItem);
}

//Mark-as-finished
var taskCompleted = function() {
  console.log("Task complete...");
  
  //Switches Task to Done! 
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskTasks(listItem, taskIncomplete);
}

//Mark a Task as unfinished
var taskIncomplete = function() {
  console.log("Task Incomplete...");
 
 // When unchecked, change Task status
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskTasks(listItem, taskCompleted);
}

var bindTaskTasks = function(taskListItem, checkBoxTaskHandler) {
  console.log("Bind list item Tasks");
  
  
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
  
  
  editButton.onclick = editTask;
  
  deleteButton.onclick = deleteTask;
  
  checkBox.onchange = checkBoxTaskHandler;
}

var ajaxRequest = function() {
  console.log("AJAX Request");
}

//Assigns the Clicking of the Add Task button to  the Adding Task function
//Therefore: 1 click = 1 new Task Added;	
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


//Binds all incomplete Tasks
for(var i = 0; i <  incompleteTasksHolder.children.length; i++) {
  bindTaskTasks(incompleteTasksHolder.children[i], taskCompleted);
}
//Binds all complete Tasks
for(var i = 0; i <  completedTasksHolder.children.length; i++) {
  bindTaskTasks(completedTasksHolder.children[i], taskIncomplete); 

}





