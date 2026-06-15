let display = document.getElementById("display");

let historyList = document.getElementById("historyList");

window.onload = function(){
    let saved = JSON.parse(localStorage.getItem("history")) || [];
    saved.forEach(item=>{
        addHistory(item);
    });
};

function appendValue(value){
    display.value += value;
}

function clearDisplay(){
    display.value="";
}

function deleteChar(){
    display.value =
    display.value.slice(0,-1);
}

function calculate(){
    try{
        let expression = display.value;
        let result = eval(expression);
        display.value=result;

        let record =
        expression + " = " + result;

        saveHistory(record);
    }
    catch{
        display.value="Error";
    }
}

function saveHistory(item){
    let history =
    JSON.parse(localStorage.getItem("history")) || [];

    history.push(item);

    localStorage.setItem(
        "history",
        JSON.stringify(history)
    );

    addHistory(item);
}

function addHistory(item){
    let li=document.createElement("li");
    li.innerHTML=item;
    historyList.appendChild(li);
}

function clearHistory(){
    localStorage.removeItem("history");
    historyList.innerHTML="";
}

document.addEventListener(
"keydown",
function(event){
    let key=event.key;
    if(
    "0123456789+-*/.%"
    .includes(key)
    ){
        appendValue(key);
    }
    else if(key==="Enter"){
        calculate();
    }
    else if(key==="Backspace"){
        deleteChar();
    }
    else if(key==="Escape"){
        clearDisplay();
    }
});