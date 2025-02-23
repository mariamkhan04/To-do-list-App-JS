const inputBox = document.getElementById("input-box");
const listContainer = document.querySelector(".list-container");

function addTask(){
    if(inputBox.value === ""){
        alert("Please enter a task");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        
        let editSpan = document.createElement("span");
        editSpan.innerHTML = "\u270E"; // '✎' symbol for edit
        editSpan.className = "edit-icon";
        li.appendChild(editSpan);

        let deleteSpan = document.createElement("span");
        deleteSpan.innerHTML = "\u00d7"; // 'x' symbol for delete
        li.appendChild(deleteSpan);

        listContainer.prepend(li); // so that new task will be added at the start of the list items
    }
    inputBox.value = "";
    saveTasks();
}

listContainer.addEventListener("click", (e) => {
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked"); // add or remove the className checked
        if(e.target.classList.contains("checked")){
            listContainer.appendChild(e.target); //if 'checked' it moves to the bottom of the list
        }else{
            listContainer.prepend(e.target); //moves to top - unchecked
        }
        saveTasks();
    }
    else if(e.target.className === "edit-icon"){
        let li = e.target.parentElement;
        let taskText = li.firstChild.textContent;
        let editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = taskText;
        li.innerHTML = "";
        li.appendChild(editInput);

        let saveButton = document.createElement("button");
        saveButton.innerHTML = "Save";
        li.appendChild(saveButton);

        saveButton.addEventListener("click", () => {
            let updatedTask = editInput.value;
            li.innerHTML = updatedTask;
            li.appendChild(e.target); // Re-add the edit icon
            // Re-add the delete icon
            let deleteSpan = document.createElement("span");
            deleteSpan.innerHTML = "\u00d7"; // 'x' symbol for delete
            li.appendChild(deleteSpan);
            saveTasks();
        });
    }
    else if(e.target.tagName === "SPAN" && e.target.className !== "edit-icon"){
        e.target.parentElement.remove();
        saveTasks();
    }
}, false);

function deleteAll(){
    listContainer.innerHTML = ""; // Clears all list items
    saveTasks();
}

function saveTasks(){
    localStorage.setItem("tasks", listContainer.innerHTML);
}

function showTaskList(){
    listContainer.innerHTML = localStorage.getItem("tasks");
}

showTaskList();