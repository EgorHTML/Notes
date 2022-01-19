async function getDataFromClient(req){
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
module.exports = getDataFromClient