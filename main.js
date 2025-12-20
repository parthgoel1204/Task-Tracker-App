const taskList = document.querySelector("#task-list");
const addTaskValue = document.querySelector("#add-task")
const addTaskButton = document.querySelector("#add-task-btn");

addTaskButton.addEventListener("click",function(e){
    if(addTaskValue.value == ""){
        return
    }
    else{
        const li = document.createElement("li");
        li.classList.add("task-item");

        const input = document.createElement("input")
        input.classList.add("task-checkbox");
        input.type = "checkbox";

        const span = document.createElement("span");
        span.classList.add("task-text");
        span.textContent = addTaskValue.value;

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-btn");
        deleteButton.textContent = "Delete";

        li.appendChild(input);
        li.appendChild(span);
        li.appendChild(deleteButton);

        taskList.appendChild(li);

        addTaskValue.value = "";
    }
});
