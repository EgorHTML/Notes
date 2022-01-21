const db = require("./db.js")

function renderingFromDb(){
    return new Promise((resolve,rej)=>{
        
            db.connection().query("SELECT * FROM notes",(err,data)=>{
                if(err)console.log(err.message)
                resolve(JSON.stringify(data))
            })
        
    })
}
module.exports = renderingFromDb