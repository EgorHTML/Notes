const http = require("http");
const path = require("path");
const fs = require("fs");
const db = require("./db.js")
const renderingNotes = require("./renderingNotesFromDb")

// const getClient = require('./getDataFromClient.js')

http
  .createServer((req,res) => {
 
 
    //вывод статических файлов у клиента
    rendering(req, res);
  })
  .listen(5000);

//routing
function rendering(req, res) {

  if (req.url === "/") {
    postStatickFilesToClient("index.html", "text/html", res);
  
  }else if(req.url==="/get.json"){
    renderingNotes().then(data=>{
      res.end(data)
    })
  }else{
    postStatickFilesToClient(req.url.slice(1), getTypeContent(req.url), res);
  }

  if(req.url ==="/notes"){
    async function getDataFromClient(){
      return new Promise((res,rej)=>{
        result = ""
        req.on("data",(chunk)=>{
          result+=chunk
        })
        req.on("end",()=>{
          res(result)
          
        })
      })
    }
    getDataFromClient().then(data=>{
      let response = JSON.parse(data)
      let body = response.body
      let header = response.header
      db.addNote(header,body)
    })
  }

}


//функция, которая находит статический файл и отправляет его клиенту.
function postStatickFilesToClient(extension, header, res) {
  //путь
  let file = path.resolve("statickFiles", extension);

  fs.readFile(file, (err, data) => {
    if (err) err.message;
    res.writeHead(200, { "Content-Type": header });
    res.end(data);
  });
}
// определяет аргумент header в методе res.write(..,{...:header})
function getTypeContent(extension) {
  switch (path.extname(extension)) {
    case ".html":
      return "text/html";
    case ".js":
      return "text/javascript";
    case ".css":
      return "text/css";
    case ".json":
      return "application/json";
    case ".mjs":
        return "text/javascript"
    default:
      return "application/octet-stream";
  }
}

