let leftCol = document.querySelector(".left_col");
let topRow = document.querySelector(".top_row");
let grid = document.querySelector(".grid");
let addressInput = document.querySelector(".address-input");
let boldBtn = document.querySelector(".bold");
let italicBtn = document.querySelector(".italic");
let underline  = document.querySelector(".underline");

let fontSizeBtn = document.querySelector(".font-size");
let fontFamilyBtn = document.querySelector(".font-family");

let leftBtn = document.querySelector(".left");
let rightBtn = document.querySelector(".right");
let centerBtn = document.querySelector(".center");

let colorBtn1 = document.querySelector(".color");
let colorBtn2 = document.querySelector(".bg-color"); 


let formulaBar = document.querySelector(".formula-input");



let rows= 100;
let col = 26;

let btnContainer = document.querySelector(".add-sheet_btn-container");
let sheetList = document.querySelector(".sheet-list");
let firstSheet = document.querySelector(".sheet");

firstSheet.addEventListener("click",makeMeActive);
firstSheet.click();
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

//new sheet create meaning creating Db for the sheet
createSheet();

sheetDb = sheetArr[lastIdx+1];

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
    let idx = sheet.getAttribute("idx");
    //the time when first sheet is created
    if(!sheetArr[idx]){
       createSheet();
    }

    //pointing to the current Db now 
    sheetDb =sheetArr[idx];
    //finally setting the UI i.e filling the values 
    //but its effect will be shown when we will switch from one sheet to another 
    setUi();
}


//creating the sheetArray to store DB for every sheet created 
let sheetArr =[]

//creating the state for every cell 
// pointing to currentDb
let sheetDb = [] ;


//copying code of creating sheet logic here 

//this function create the db of the excel sheet i.e created object for every cell of the sheet to store its info .
function createSheet(){
    let newDb =[] ;
    for(let i=0;i<rows;i++){
        let row = [];
        for(let j=0;j<col;j++){
            let cell = {
                bold: "normal"
                , italic: "normal",
                underline: "none", hAlign: "center",
                fontFamily: "Times New Roman"
                , fontSize: "16",
                color: "black",
                bColor: "none",
                value:"",
                formula:"",
                children:[]
            }
            let element = document.querySelector(`.grid .cell[rid="${i}"][cid="${j}"]`);
            element.innerText = "";

            row.push(cell);
        }
       newDb.push(row);
    }
    sheetArr.push(newDb);
}
//function to setUi i.e fill UI woth its previous value when clicked on that sheet
function setUi(){
    for(let i=0;i<rows;i++){
        for(let j=0;j<col;j++){
            let elem =document.querySelector(`.grid .cell[rid='${i}'][cid='${j}']`);
            elem.innerText = sheetDb[i][j].value;
        }
    }
}
//creating colums boxes 
for(let i= 0;i<rows;i++){
    let colBox = document.createElement("div");
    colBox.setAttribute("class","box");
    colBox.innerText=i+1;
    leftCol.appendChild(colBox);
}

for(let i=0;i<col;i++){
    let cell = document.createElement("div");
    cell.innerText = String.fromCharCode(65 + i);
    // setAttribute
    cell.setAttribute("class", "cell");
    topRow.appendChild(cell);
}

for(let i=0;i<rows;i++){
    let row = document.createElement("div");
    row.setAttribute("class","row");
    
    for(let j= 0;j<col;j++){
        let cell = document.createElement("div");
        cell.setAttribute("class","cell");
        // cell.innerText=`${String.fromCharCode(65+j)} ${i+1}`;
        // humne rid cid actually me 0,0 format se set kare hai dikhaye 1 ,A  vali form me hai 
        //meaning ki row +1 karke dikhayi hai colum simple 65+ 0 karke check line 68 of code.
         
        cell.setAttribute("rid",i);
        cell.setAttribute("cid",j);
        cell.setAttribute("contenteditable","true");
        row.appendChild(cell);
    }

    grid.appendChild(row);
}



//now putting event listener on every cell so that 
//we can extract address and show it in input container

let allCells = document.querySelectorAll(".grid .cell");
for(let i=0;i<allCells.length;i++){

    allCells[i].addEventListener("click",function(){
        //now getting address of current cell
        let rid = allCells[i].getAttribute("rid");
        let cid = allCells[i].getAttribute("cid");

        rid = Number(rid);
        cid = Number(cid);

        let address = `${String.fromCharCode(65 + cid)}${rid+1}`;
        addressInput.value = address;
        //yahan par check lagayenge ki hum agar doosre pe 
        // cell pe jaa rahe hai toh woh bhi bold na ho jaaye apne 
        // aap   

        let cellObject = sheetDb[rid][cid] ;
        //check for bold 
        if(cellObject.bold == "normal"){
            boldBtn.classList.remove("active-btn");
        }
        else{
            boldBtn.classList.add("active-btn");
        }     
        
        //check for italic
        if(cellObject.italic == "normal"){
            italicBtn.classList.remove("active-btn");
        }
        else{
            italicBtn.classList.add("active-btn");
        } 
        
        if(cellObject.underline == "none"){
            underline.classList.remove("active-btn");
        }
        else{
            underline.classList.add("active-btn");
        } 

        //changing toolbaar for sleected property
        if(cellObject.fontSize !== "16"){
            let fontSize = parseInt(cellObject.fontSize);
            let selectedTag = document.querySelector(".font-size");
            for(let i=0;i<selectedTag.options.length;i++){
                let option = selectedTag.options[i] ;

                if(option.value == fontSize){
                    selectedTag.selectedIndex = i ;
                }
            }

        }
        else{
            let selectedTag = document.querySelector(".font-size");
            selectedTag.selectedIndex = 1;
        }

        //putting a  check for font-family
        if(cellObject.fontFamily == "Times New Roman"){
            let selectedTag = document.querySelector(".font-family");
            selectedTag.selectedIndex = 0;
        }
        else{
            let fontFamily = cellObject.fontFamily ;
            let selectedTag = document.querySelector(".font-family");
            for(let i=0;i<selectedTag.options.length;i++){
                let option = selectedTag.options[i] ;

                if(option.value == fontFamily){
                    selectedTag.selectedIndex = i ;
                }
            }

        }

        //yeh case 3 of formula implemntation ka check hai 
        //jo ki yeh check karta hai bass ki agar cell pe formula ;aga hua hai toh usme '
        //formula display kar deta hai
        
        if(cellObject.formula){
            formulaBar.value = cellObject.formula;
        }
        else{
            formulaBar.value = "";
        }

    })
}

allCells[0].click();

//applying bold functionality 
boldBtn.addEventListener("click",function(){
  let uiCellElement = findUiCellElement();
  let rid = uiCellElement.getAttribute("rid");
  let cid = uiCellElement.getAttribute("cid");
  let cellObject = sheetDb[rid][cid];

  if(cellObject.bold == "normal"){
    uiCellElement.style.fontWeight = "bold";
    boldBtn.classList.add("active-btn");
    cellObject.bold="bold";
  }
  else{
    uiCellElement.style.fontWeight = "normal";
    boldBtn.classList.remove("active-btn");
    cellObject.bold="normal";
  }
  
});
//applying italic functionality 
italicBtn.addEventListener("click",function(){
    let uiCellElement = findUiCellElement();
    let rid = uiCellElement.getAttribute("rid");
    let cid = uiCellElement.getAttribute("cid");
    let cellObject = sheetDb[rid][cid];

  if(cellObject.italic == "normal"){
    uiCellElement.style.fontStyle = "italic";
    italicBtn.classList.add("active-btn");
    cellObject.italic ="italic";
  }
  else{
    uiCellElement.style.fontStyle = "normal";
    italicBtn.classList.remove("active-btn");
    cellObject.italic ="normal";
  }

})

//applying the underline functionality
underline.addEventListener("click",function(){
    let uiCellElement = findUiCellElement();
    let rid = uiCellElement.getAttribute("rid");
    let cid = uiCellElement.getAttribute("cid");
    let cellObject = sheetDb[rid][cid];

  if(cellObject.underline == "none"){
    underline.classList.add("active-btn");
    cellObject.underline ="underline";
    uiCellElement.style.textDecoration = "underline";
  }
  else{
    underline.classList.remove("active-btn");
    cellObject.underline ="none";
    uiCellElement.style.textDecoration = "none";
  }

})


fontSizeBtn.addEventListener("change",function(){
   
  let value = fontSizeBtn.value;  
  let uiCellElement = findUiCellElement();
  let rid = uiCellElement.getAttribute("rid");
  let cid = uiCellElement.getAttribute("cid");
  let cellObject = sheetDb[rid][cid];

  uiCellElement.style.fontSize = value+"px";
  cellObject.fontSize = value;



});

fontFamilyBtn.addEventListener("change",function(){
    let value = fontFamilyBtn.value;
    let uiCellElement = findUiCellElement();
    let rid = uiCellElement.getAttribute("rid");
    let cid = uiCellElement.getAttribute("cid");
    let cellObject = sheetDb[rid][cid];
    

    uiCellElement.style.fontFamily = value ;
    cellObject.fontFamily = value;
})

//alignment buttons
leftBtn.addEventListener("click",function(){
    let uiCellElement =findUiCellElement();
    uiCellElement.style.textAlign = "left";

})

rightBtn.addEventListener("click",function(){
    let uiCellElement = findUiCellElement();
    uiCellElement.style.textAlign = "right";
})

centerBtn.addEventListener("click",function(){
    let uiCellElement = findUiCellElement();
    uiCellElement.style.textAlign = "center";
})


//changing color of the text 
colorBtn1.addEventListener("change",function(e){
    let uiCellElement = findUiCellElement();
    uiCellElement.style.color = e.target.value;
})

colorBtn2.addEventListener("change",function(e){
    let uiCellElement = findUiCellElement();
    uiCellElement.style.backgroundColor = e.target.value;
})

function findUiCellElement(){
    
  let address = addressInput.value;
  let ridCidObj = getRIDCIDObject(address);
  let rid = ridCidObj.rid;
  let cid = ridCidObj.cid;

  let uiCellElement = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
  return uiCellElement;

}
function getRIDCIDObject(address){
    let cid = Number(address.charCodeAt(0))- 65;
    let rid = Number(address.slice(1))-1;
    return { "rid":rid,"cid":cid}
}
