let todolist = [];

function displaylist() {
  let list = document.getElementById("list");
  list.innerHTML = ""; // Clear existing pagination buttons
  const totallength = todolist.length;
  if (totallength > 0) {
    for (var i = 0; i <= totallength - 1; i++) {
      var li = document.createElement("li");
      var p = document.createElement("span");
      p.innerHTML = todolist[i];
      var button = document.createElement("button");
      button.textContent = "Remove";
      button.onclick = (function (index) {
        return function (event) {
          remove(index);
        };
      })(i);
      li.append(p);
      li.appendChild(button);
      list.appendChild(li);
    }
  } else {
    var p = document.createElement("span");
    p.innerHTML = "No record found";
    list.appendChild(p);
  }
}

function remove(event) {
  if (event > -1) {
    todolist.splice(event, 1);
  }
  displaylist();
}

function add(event) {
  debugger;
  event.preventDefault();
  const newlist = document.getElementById("input").value;
  if (newlist == "") {
    return;
  }
  todolist.push(newlist);
  document.getElementById("input").value = "";
  displaylist();
}

displaylist();
