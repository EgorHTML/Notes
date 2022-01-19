

const nameNote = document.getElementById("exampleFormControlInput1")
const bodyNote  = document.getElementById("exampleFormControlTextarea1")
const addButton = document.querySelector(".added")

addButton.addEventListener("click",()=>{
    let valueHed = nameNote.value
    let valueBody = bodyNote.value
    postToServer(valueHed,valueBody)
    nameNote.value= ""
    bodyNote.value = ""
})

async function postToServer(valueHed,valueBody){
    let result = {
        header:valueHed,
        body:valueBody
    }
    await fetch("/",{
        method:"POST",
        headers:{'Content-Type': 'application/json;charset=utf-8'},
        body:JSON.stringify(result)
    })
}



