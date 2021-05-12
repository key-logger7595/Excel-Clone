let btnContainer = document.querySelector(".add-sheet_btn-container");
let sheetList = document.querySelector(".sheet-list");
let firstSheet = document.querySelector(".sheet");

firstSheet.addEventListener("click",makeMeActive);
btnContainer.addEventListener('click',function(){
   
    // get all the sheets first as we want to get the last sheet 
   // and its index so that we can use it in getting idx attribute 
let allSheets = document.querySelectorAll(".sheet");
let lastSheet = allSheets[allSheets.length-1];

let lastIdx = lastSheet.getAttribute("idx");

lastIdx = Number(lastIdx);

//creating a div which will represent newSheet 
let newSheet = document.createElement("div");
newSheet.setAttribute("class",'sheet');
newSheet.setAttribute("idx",`${lastIdx+1}`);
newSheet.innerText = `Sheet${lastIdx+2}`;

sheetList.appendChild(newSheet);

//removing active class on all before adding it to current one
//why we remove so that when we are doing this for suppose 4th sheet
//then  we have to make other 3 non-active to achieve active on 4th one
for(let i=0;i<allSheets.length;i++){
    allSheets[i].classList.remove('active');
}

newSheet.classList.add('active');

//now applying event listener on newSheet to achieve behaviour 
//
newSheet.addEventListener("click",makeMeActive);


});


function makeMeActive(e) {
    // evnt listener  add 
    let sheet = e.currentTarget;
    let AllSheets = document.querySelectorAll(".sheet");
    for (let i = 0; i < AllSheets.length; i++) {
        AllSheets[i].classList.remove("active");
    }
    sheet.classList.add("active");
}