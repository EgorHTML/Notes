const content = document.querySelector(".my__content");
const nameNote = document.getElementById("exampleFormControlInput1");
const bodyNote = document.getElementById("exampleFormControlTextarea1");
const addButton = document.querySelector(".added");

document.addEventListener("DOMContentLoaded", ready);
//прогрузка при запуске
function ready() {
  getDataFromDb().then((data) => {
    console.log(data);
    renderData(data);
  });
}

addButton.addEventListener("click", () => {
  let valueHed = nameNote.value;
  let valueBody = bodyNote.value;
  postToServer(valueHed, valueBody);
  getDataFromDb().then(() => {
    renderData([{ header: valueHed, body: valueBody }]);
  });

  nameNote.value = "";
  bodyNote.value = "";
});

async function postToServer(valueHed, valueBody) {
  let result = {
    header: valueHed,
    body: valueBody,
  };
  await fetch("/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify(result),
  });
}

async function getDataFromDb() {
  let response = await fetch("http://localhost:5000/get.json");
  // content.innerHTML = response.text()
  return response.json();
}

function renderData(data) {
  data.forEach((data) => {
    if (data.header != null && data.body != null) {
      let div = document.createElement("div");

      let html = ` <div class="card" style="width: 18rem;">  
            <div class="card-body">
              <h5 class="card-title">${data.header}</h5>
              <p class="card-text">${data.body}</p>   
            </div>
          </div>`;
      div.innerHTML = html;

      content.appendChild(div);
    }
  });
}
