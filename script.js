const inputBox = document.getElementById("input-box");
const dateTimePicker = document.getElementById("date-time-picker");
const listContainer = document.getElementById("list-container");

const tasksDated = loadTasks();

flatpickr(dateTimePicker, {
  enableTime: true,
  dateFormat: "Y-m-d H:i",
});

function addTask() {
  const taskText = inputBox.value;
  const dateTimeText = dateTimePicker.value;
  const date = new Date(dateTimeText);

  if (taskText === "") {
    alert("You must write something!");
    return;
  }

  if (isNaN(date)) {
    displayError("Invalid date and time format.");
    return;
  }

  if (!date || isNaN(date)) {
    alert("please pick a time and day!");
    return;
  } else {
    const task = { text: taskText, date: date, checked: false };
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
  dateTimePicker.value = "";
  clearError();
  saveTasks();
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
    li.classList.add("fade-in");

    if (task.checked) {
      li.classList.add("checked");
    }

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
      const li = e.target;
      li.classList.toggle("checked");
      const taskIndex = Array.from(li.parentNode.children).indexOf(li);
      tasksDated[taskIndex].checked = li.classList.contains("checked");

      // e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  return tasks || [];
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasksDated));
}

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
  saveTasks();
}
function showTask() {
  tasksDated.sort((a, b) => a.date - b.date);
  displayTasks();
}

function clearError() {
  errorMessage.textContent = "";
}

showTask();
