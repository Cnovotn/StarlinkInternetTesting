async function buttonClick() {
  let[fileHandle] =  await window.showOpenFilePicker();
  let fileData = await fileHandle.getFile();
  let text = await fileData.text;
  console.log(text);
}

function readFiles() {
  console.log('Reading files');
}

window.onload = (event) => {
  console.log("We have loaded the internet testing page and javascript file");
  readFiles();
}