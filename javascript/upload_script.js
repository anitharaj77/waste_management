function filetype() {
  var filename = document.getElementsByClassName("file-input")[0].value;
  var dropArea = document.getElementById("dropArea");
  var chooseBtn = document.getElementById("chooseBtn");
  var allowedExtensions = /(\.png)$/i;

  var getFilename = function (str) {
    return str.substring(str.lastIndexOf("\\") + 1);
  };

  if (!allowedExtensions.exec(filename)) {
    // alert("Invalid file type");
    document.getElementById("fileError").style.display = "block";
    dropArea.style.borderColor = "#ce0000";
    dropArea.style.backgroundColor = "#ce0000";
    document.getElementById("filename").style.color = "#fff";
    document.getElementsByClassName("file-input")[0].value = "";
    chooseBtn.style.backgroundColor = "#2d4085";
    return false;
  }

  if (getFilename(filename) != "") {
    document.getElementById("filename").innerHTML =
      "File uploded sucessfully ✅";
    // document.getElementById("filename").innerHTML = getFilename(filename);
    document.getElementById("file_content").style.display = "block";
    document.getElementById("textArea").innerHTML = getFilename(filename);
    document.getElementById("fileError").style.display = "none";
    // document.getElementById("filename").style.color = "#fff";
    dropArea.style.borderColor = "#029c9c";
    dropArea.style.backgroundColor = "#029c9c";
    dropArea.style.color = "#fff";
    chooseBtn.style.backgroundColor = "#2d4085";
  } else {
    document.getElementById("filename").innerHTML =
      "or drag and drop your .sav file here";
  }
}
function remove() {
  document.getElementById("file").value = "";
  document.getElementById("file_content").style.display = "none";
  document.getElementById("filename").style.color = "#000";
  document.getElementById("filename").innerHTML =
    "or drag and drop your file here";
  dropArea.style.backgroundColor = "#fff";
  dropArea.style.borderColor = "#000";
  dropArea.style.color = "#000";
  chooseBtn.style.backgroundColor = "#029c9c";
}


