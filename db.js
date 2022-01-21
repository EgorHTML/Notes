const mysql = require("mysql2")
class Db{
    constructor(){}
    connection(){
        return mysql.createConnection({
            host:"localhost",
            user:"root",
            database:"usersdb",
            password:'1593007k'
        })
    }
    addNote(id,header,body){
        this.connection().connect(err=>{
            if(err)console.log(err.message)
        })
        this.connection().query("INSERT INTO notes(id,header,body) VALUES(?,?,?)",[id,header,body])
        this.connection().end(err=>{
            if(err)console.log(err.message)
        })
    }
    deleteNote(id){
        this.connection().connect(err=>{
            if(err)console.log(err.message)
        })
        this.connection().query(`DELETE FROM notes WHERE id=?`,id)
        this.connection().end(err=>{
            if(err)console.log(err.message)
        })
    }
}
let db = new Db()

module.exports = db

