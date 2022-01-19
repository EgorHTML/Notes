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
    addNote(header,body){
        this.connection().connect(err=>{
            if(err)console.log(err.message)
        })
        this.connection().query("INSERT INTO notes(header,body) VALUES(?,?)",[header,body])
        this.connection().end(err=>{
            if(err)console.log(err.message)
        })
    }
    deleteNote(){
        //
    }
}
let db = new Db()

module.exports = db

