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

        // unique id for so that same tasks can be distinguished
        const taskId = Date.now();
        li.dataset.id = taskId;

        input.addEventListener('change',function(e){
            if(input.checked){
                li.classList.add('completed');
                counter();
                storingTasks();
            }
            else{
                li.classList.remove('completed');
                counter();
                storingTasks();
            }
        });

        const span = document.createElement("span");
        span.classList.add("task-text");
        span.textContent = addTaskValue.value;

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-btn");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click",function(e){
            li.remove();
            counter();
            storingTasks();
        });
        li.appendChild(input);
        li.appendChild(span);
        li.appendChild(deleteButton);

        taskList.appendChild(li);

        counter();
        storingTasks();
        addTaskValue.value = "";
    }
});

// Logic for using ENTER KEY to add task 
addTaskValue.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        addTaskButton.click();
    }
});

// const listItem = document.querySelector(".task-item");
// // console.log(listItem);
// const checkbox = document.querySelector(".task-checkbox");
// // console.log(checkbox);
// checkbox.addEventListener('change',function(e){
//     if(checkbox.checked){
//         listItem.classList.add('completed');
//     }
//     else{
//         listItem.classList.remove('completed');
//     }
// });

const totalTasksCounter = document.querySelector("#total-tasks");
const completedTasksCounter = document.querySelector("#completed-tasks");

function counter(){
    const totalTasks = document.querySelectorAll(".task-item").length;
    const completedTasks = document.querySelectorAll(".task-item.completed").length;

    totalTasksCounter.textContent = totalTasks;
    completedTasksCounter.textContent = completedTasks;
}

const clearCompletedButton = document.querySelector("#clear-tasks");


clearCompletedButton.addEventListener("click",function(e){
    const completedTasks = document.querySelectorAll(".task-item.completed");
    completedTasks.forEach(function (i) {
        i.remove();
    });
    counter();
    storingTasks();
})

// Storing task in the local storage 

function storingTasks(){
    const allTasks=[];
    const taskItem = document.querySelectorAll(".task-item");
    taskItem.forEach(function(element){
        const id = element.dataset.id;
        const text = element.querySelector(".task-text").textContent;
        // const stateCompleted = element.classList.contains("completed");
        const state = element.classList.contains("completed");
        
        allTasks.push({id, text, state});
    })

    localStorage.setItem("allTasks",JSON.stringify(allTasks));
}

function loadTasks(){
    const savedTasks = JSON.parse(localStorage.getItem("allTasks")) || [];

    savedTasks.forEach(function(task){
        const li = document.createElement("li");
        li.classList.add("task-item");

        li.dataset.id = task.id;
        if (task.state) {
            li.classList.add("completed");
        }

        const input = document.createElement("input")
        input.classList.add("task-checkbox");
        input.type = "checkbox";
        input.checked = task.state;

        input.addEventListener('change',function(e){
            li.classList.toggle("completed",input.checked);
            counter();
            storingTasks();
        });

        const span = document.createElement("span");
        span.classList.add("task-text");
        span.textContent = task.text;

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-btn");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click",function(e){
            li.remove();
            counter();
            storingTasks();
        });
        li.appendChild(input);
        li.appendChild(span);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
        // addTaskValue.value = "";
    });
    counter();
}
loadTasks();

