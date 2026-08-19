const inputURL = document.getElementById('inputURL');
const outputURL = document.getElementById('outputURL');
const copyButton = document.getElementById('copyButton');
const clearButton = document.getElementById('clearButton');
const pasteButton = document.getElementById('pasteButton');
const copyMode = document.getElementById('copyMode');
let url;
let resultUrl;
copyButton.onclick = () => {
    copy();
}
inputURL.onchange = () => {
    url = inputURL.value.replace("https://github.com/", "https://cdn.jsdelivr.net/gh/").replace("/blob/", "@");
    outputURL.value = url;
    copyButton.textContent = "Copy";
}
pasteButton.onclick = () => {
    navigator.clipboard.readText().then(res => {
        inputURL.value = res
        url = inputURL.value.replace("https://github.com/", "https://cdn.jsdelivr.net/gh/").replace("/blob/", "@");
        outputURL.value = url;
        copy();
        copyButton.textContent = "Copy";
    });
}
clearButton.onclick = () => {
    inputURL.value = "";
    outputURL.value = "";
}
function copy() {
    console.log(copyMode.value);
    if (copyMode.value === "simple") {
        console.log("シンプル");
    
        resultUrl = url;
        outputURL.value = resultUrl;
    } else if (copyMode.value === "asModule") {
        console.log("モジュール");
        resultUrl = "import * as moduleName from " + "'" + url + "';";
        outputURL.value = resultUrl;
    } else if (copyMode.value === "asClass") {
        console.log("クラス");
        resultUrl = "import className from " + "'" + url + "';";
        outputURL.value = resultUrl;
    }
    if (url !== undefined) {
        navigator.clipboard.writeText(resultUrl).then(() => {
            console.log(resultUrl);
            console.log("コピー成功");
            copyButton.textContent = "Copied!";
        }).catch((e) => {
            console.log("コピー失敗", e);
        })
    } else {
        console.log("trying to copy something undefined");
        console.log("コピー失敗");
    }
}
copyMode.onchange = () => {
    copyButton.textContent = "Copy"
}