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






let rows= 100;
let col = 26;

//creating the state for every cell 
let sheetDb = [] ;

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
            bColor: "none"
        }
        row.push(cell);
    }
   sheetDb.push(row);
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
