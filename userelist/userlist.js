//console.log('hi');
async function getDataFromServer(currntpage) {
  const api = `https://reqres.in/api/users?page=${currntpage}&per_page=2`;
  let data = await fetch(api)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      throw Error("An error occured while fetching data...");
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
  return data;
}
//getDataFromServer();
function addpagination(totalpage) {
  var paginationList = document.getElementById("paginationList");
  paginationList.innerHTML = ""; // Clear existing pagination buttons

  for (var i = 1; i <= totalpage; i++) {
    var li = document.createElement("li");
    var button = document.createElement("button");
    button.textContent = i;
    button.onclick = (function (index) {
      return function (event) {
        userdata(index);
      };
    })(i);
    // button.onclick = function () {
    //   userdata(i);
    // };
    li.appendChild(button);
    paginationList.appendChild(li);
  }
}

async function userdata(currntpage) {
  document.getElementById("usercontainer").style.display = "none";
  document.getElementById("spinner").style.display = "block";

  var table = document.getElementById("Table"); // Corrected table id

  var x = table.rows.length;
  for (var i = x - 1; i > 0; i--) {
    table.deleteRow(i);
  }
  x = 1;
  let data = await getDataFromServer(currntpage);
  data.data.forEach((element) => {
    var row = document.getElementById("Table").insertRow(x);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var avatarImg = document.createElement("img");
    avatarImg.src = element.avatar; // Assuming there is an 'avatarUrl' property in your element
    avatarImg.alt = "Avatar";
    var name = document.createElement("p");
    name.innerHTML = element.first_name + " " + element.last_name;
    cell1.innerHTML = element.id;
    cell2.appendChild(avatarImg);
    cell2.appendChild(name);
    // cell2.innerHTML = element.first_name + " " + element.last_name;

    cell3.innerHTML = element.email;
    x++;
  });
  setTimeout(() => {
    document.getElementById("spinner").style.display = "none";
    document.getElementById("usercontainer").style.display = "block";
  }, 1000);
  addpagination(data.total_pages);
}

userdata(1);
