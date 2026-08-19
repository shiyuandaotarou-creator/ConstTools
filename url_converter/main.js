const inputURL = document.getElementById('inputURL');
const outputURL = document.getElementById('outputURL');
const copyButton = document.getElementById('copyButton');
const clearButton = document.getElementById('clearButton');
const copyMode = document.getElementById('copyMode');
let url;
let resultUrl;
let copyModeValue = copyMode.value;
inputURL.onchange = () => {
    url = inputURL.value.replace("https://github.com/","https://cdn.jsdelivr.net/gh/").replace("/blob/", "@");
    outputURL.value = url;
}
clearButton.onclick = ()=>{
    inputURL.value = "";
    outputURL.value= "";
}
copyButton.onclick = () => {
    switch (copyModeValue) {
        case "simple":
            resultUrl = url;
        case "asModule":
            resultUrl = "import * as moduleName from "+"'"+url +"';";
        case "asClass":
            resultUrl = "import className from "+"'"+url +"';";
    }
    if (url !== undefined) {
        navigator.clipboard.writeText(resultUrl).then(() => {
            console.log("コピー成功");
            copyButton.textContent = "Copied!";
        }).catch((e) => {
            console.log("コピー失敗", e);
        })
    }else{
        console.log("trying to copy something undefined");
        console.log("コピー失敗");
    }
}
copyMode.onchange = ()=>{
    copyModeValue = copyMode.value;
    console.log(copyModeValue);
    
}