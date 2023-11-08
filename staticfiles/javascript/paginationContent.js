const list = document.querySelector(".list");
const currPage = document.querySelector("#current-page");
const totalPages = document.querySelector("#total-pages");
const buttonPrev = document.querySelector("#prev-page");
const buttonNext = document.querySelector("#next-page");

const items = [
  {
    title: "Has/Will Product Launch?",
    id: "text1",
    type: "textbox",
  },
  {
    title: "Vendor",
    id: "text2",
    type: "textbox",
  },
  {
    title: "Supplier Job Number",
    id: "text3",
    type: "number",
  },
  {
    title: "Project name",
    id: "text4",
    type: "textbox",
  },
  {
    title: "Project Code",
    id: "text5",
    type: "textbox",
  },
  {
    title: "HIVE / non HIVE",
    id: "text6",
    type: "textbox",
  },
  {
    title: "If  HIVE, CC or 737",
    id: "text7",
    type: "textbox",
  },
  {
    title: "Category",
    id: "text8",
    type: "textbox",
  },
  {
    title: "Product Format",
    id: "text9",
    type: "dropDown",
  },
  {
    title: "Brand",
    id: "text10",
    type: "dropDown",
  },
  {
    title: "Variant",
    id: "text11",
    type: "dropDown",
  },
  {
    title: "SKU tested / Size of the pack",
    id: "text12",
    type: "number",
  },
  {
    title: "UL Commissioning Group",
    id: "text13",
    type: "dropDown",
  },
  {
    title: "Blind / Branded",
    id: "text14",
    type: "dropDown",
  },
  {
    title: "Country Commissioned by Unilever",
    id: "text15",
    type: "dropDown",
  },
  {
    title: "Fieldwork Country",
    id: "text16",
    type: "dropDown",
  },
  {
    title: "Study Type",
    id: "text17",
    type: "dropDown",
  },
  {
    title: "CPT or PT?",
    id: "text18",
    type: "dropDown",
  },
  {
    title: "Fieldwork Start Dt: Month & Year",
    id: "text19",
    type: "month",
  },
  {
    title: "Fieldwork End Dt: Month & Year",
    id: "text20",
    type: "month",
  },
  {
    title: "Upload Data File",
    id: "upldFile",
    type: "file",
  },
];

let currentPage = 1;
let currentIndex = 0;
const itemsPerPage = 7;
var page1_arr = [];
var page1_title = [];
var page1_valarr = [];
var page2_arr = [];
var page2_title = [];
var page2_valarr = [];

const numPages = Math.ceil(items.length / itemsPerPage);
console.log(numPages)

// Functions

const createListItem = (item) => {
  if (item.type == "dropDown") {
    return `<li class="list-item"><label for="${item.id}" class="item-title">${item.title}</label><select id="${item.id}" type="${item.type}" class="DD_field"><option value="abc">abc</option></select></li>`;
  } else if (item.type == "file") {
    return `<li class="list-item"><form><div id="dropArea" class="file-drop-area">
    <span id="chooseBtn" class="fake-btn">Choose file</span>
    <span class="file-msg" id="filename">or drag and drop your .sav file here</span>
    <input id="file" class="file-input" accept=".sav" onchange ="filetype()" type="file">
    </div>
    <div id="fileError"><span class="fileError">Invalid file type, please insert only .sav file</span></div>
    <div id="file_content" class="file_content"><span id="textArea" class="textArea">Hello</span><span onclick="remove()"><i class="fa removeBtn">&#xf1f8;</i></span></div>
    <a href="/show/"><input id="submit" value="Submit" type="button" class="submit_btn"></li></a>`;
    // } else if (item.type == "button") {
    //   return `<li class="list-item"><input id="${item.id}" value="${item.value}" type="${item.type}" class="submit_btn"></li>`;
  } else {
    return `<li class="list-item"><label for="${item.id}" class="item-title">${item.title}</label><input id="${item.id}" type="${item.type}" class="input_field" require></li>`;
  }
};

const nextPage = () => {
  if (currentPage === numPages) return;
  currentPage++;


  if (currentPage == 2) {
    
    for (var i = 0; i < itemsPerPage; i++) {
      page1_arr.push(items[i].id)
      page1_title.push(items[i].title)
    }
    for (var i = 0; i < page1_arr.length; i++) {
      var temp = document.getElementById(page1_arr[i]).value
      page1_valarr.push(temp)
    }
    for (var i = 0; i < page1_arr.length; i++) {
      window.localStorage.setItem(page1_title[i], page1_valarr[i])
    }
  }



    
  
  



  currentIndex = (currentPage - 1) * itemsPerPage;
  let newIndex = currentIndex + itemsPerPage;
  list.innerHTML = items
    .slice(currentIndex, newIndex)
    .map((item) => createListItem(item))
    .join("");
  currPage.innerHTML = currentPage;

  
  

  console.log(page2_arr)
  console.log(page2_title)
  console.log(page2_valarr)
  

};

if (currentPage === numPages) {
  itemsPerPage = -6;
}

const prevPage = () => {
  if (currentPage === 1  ) return;
  currentPage--;

  currentIndex = (currentPage - 1) * itemsPerPage;
  let newIndex = currentIndex + itemsPerPage;
  list.innerHTML = items
    .slice(currentIndex, newIndex)
    .map((item) => createListItem(item))
    .join("");
  currPage.innerHTML = currentPage;
  for(var i=0;i< page1_arr.length;i++){
    document.getElementById(page1_arr[i]).value = window.localStorage.getItem(page1_title[i])
  }
  for(var i=0;i< page2_arr.length;i++){
    document.getElementById(page2_arr[i]).value = window.localStorage.getItem(page2_title[i])
  }
};

const init = () => {
  currPage.innerHTML = currentPage;
  totalPages.innerHTML = numPages;
  list.innerHTML = items
    .slice(0, itemsPerPage)
    .map((item) => createListItem(item))
    .join("");
};

// Event Listeners
buttonPrev.addEventListener("click", prevPage);
buttonNext.addEventListener("click", nextPage);

init();
