let leftCol = document.querySelector(".left_col");
let topRow = document.querySelector(".top_row");
let grid = document.querySelector(".grid");
let addressInput = document.querySelector(".address-input");
let boldBtn = document.querySelector(".bold");
let italicBtn = document.querySelector(".italic");
let underline  = document.querySelector(".underline");





let rows= 100;
let col = 26;

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
        //do remember ki maine  rid and cid  2d ke i=0 and j0 ke 
        //according kiya hai
        // j dikkat nhi dega  woh 0 se A and  and usi 2d index
        //me chalega row i problem karenge toh + 1 kar denge 
         
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

    })
}

allCells[0].click();

//applying bold functionality 
boldBtn.addEventListener("click",function(){
  let uiCellElement = findUiCellElement();
  uiCellElement.style.fontWeight = "bold";
});

italicBtn.addEventListener("click",function(){
    let uiCellElement = findUiCellElement();
    uiCellElement.style.fontStyle = "italic";

})
underline.addEventListener("click",function(){
    let uiCellElement = findUiCellElement();
    uiCellElement.style.textDecoration = "underline";
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
