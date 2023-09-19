const inputBox = document.getElementById("input-box");
const timeInput = document.getElementById("time-input");
const listContainer = document.getElementById("list-container");

let tasksDated = [];

function addTask() {
  const taskText = inputBox.value;
  const date = new Date(timeInput.value);

  if (taskText === "") {
    alert("You must write something!");
    return;
  }

  if (!date || isNaN(date)) {
    alert("please pick a time and day!");
    return;
  } else {
    const task = { text: taskText, date: date };
    tasksDated.push(task);

    tasksDated.sort((a, b) => a.date - b.date);

    // const parsedTime = new Date(time);
    // const formatTime = parsedTime.toLocaleString();

    // let li = document.createElement("li");
    // li.innerHTML = task + " at " + formatTime + ".";

    // listContainer.appendChild(li);
    // let span = document.createElement("span");
    // span.innerHTML = "\u00d7";
    // li.appendChild(span);
  }

  displayTasks();

  inputBox.value = "";
  timeInput.value = "";
  saveData();
}

function displayTasks() {
  // Clear the list container
  listContainer.innerHTML = "";

  // Iterate over the sorted tasks and create list items
  tasksDated.forEach((task) => {
    const li = document.createElement("li");
    const formatTime = task.date.toLocaleString();
    li.innerHTML = `${task.text} at ${formatTime}.`;
    listContainer.appendChild(li);

    const span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  });
}

function showTask() {
  tasksDated.sort((a, b) => a.date - b.date);
  displayTasks();
  listContainer.innerHTML = localStorage.getItem("data");
}

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}
function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}

showTask();
