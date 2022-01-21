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
  let id = `${new Date().getSeconds()}${new Date().getMilliseconds()}${new Date().getDay()}`
  postToServer(valueHed, valueBody,id);
  getDataFromDb().then(() => {
    
    renderData([{ id:id,header: valueHed, body: valueBody,method:"add" }]);
  });

  nameNote.value = "";
  bodyNote.value = "";
});

async function postToServer(valueHed, valueBody,id) {
  let result = {
    id:id,
    header: valueHed,
    body: valueBody,
    method:"add"
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
              <button id="${data.id}" class="deleteBtn">delete</button> 
            </div>
          </div>`;
      div.innerHTML = html;
      
      content.appendChild(div);
    }
  });
  content.querySelectorAll("div").forEach(item=>{
    console.log(item)
    item.addEventListener("click",({target})=>{
      console.log(target.id)
      deletefunc(target.id,item)
      
      
    })
  })
  
}

async function deletefunc(id,item){
  if(id){
    item.innerHTML = ""
    let delMethod = {
      method:"delete",
      id:id
    }
     await fetch('/notes',{
      method:"POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body:JSON.stringify(delMethod)
    })
  }
  
  
}