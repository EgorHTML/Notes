const db = require("./db.js")

function actionsClient(promise){
promise().then(data=>{
    let response = JSON.parse(data)
    if(response.method==="add"){
      let body = response.body
      let header = response.header
      let id =  response.id
      db.addNote(id,header,body)
    }else if(response.method ==="delete"){
        db.deleteNote(response.id)
    }
})
}


module.exports = actionsClient