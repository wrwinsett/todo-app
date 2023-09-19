const inputBox = document.getElementById("input-box");
const timeInput = document.getElementById("time-input");
const listContainer = document.getElementById("list-container");

function addTask() {
  const task = inputBox.value;
  const time = timeInput.value;

  if (task === "") {
    alert("You must write something!");
    return;
  }

  if (!time) {
    alert("please pick a time and day!");
    return;
  } else {
    const parsedTime = new Date(time);
    const formatTime = parsedTime.toLocaleString();

    let li = document.createElement("li");
    li.innerHTML = task + " at " + formatTime + ".";

    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }

  inputBox.value = "";
  timeInput.value = "";
  saveData();
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
