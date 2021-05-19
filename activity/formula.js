//since i have put click listener on every cell to check 2-way binding conditions
//now i will apply blur event on all to save value of the cell in sheetDb

for(let i=0;i<allCells.length;i++){
    allCells[i].addEventListener("blur",function(){
        let data = allCells[i].innerText;
        let address = addressInput.value;
        console.log(data);
        console.log(address);

        let {rid,cid} = getRIDCIDObject(address);
        let cellObject = sheetDb[rid][cid];
        

// case3-formula - case a() clicked cell but no change in value 
//in that case simply return without removing formula 
        if(cellObject.value == data){
            return;
        }   
        
        //case-3 formula implementation case b() clcik on cell and 
        //changed the value inside cell then we have to remove formula 

         if(cellObject.formula){
             removeFormula(cellObject,address);
             formulaBar.value = "";
         }

        cellObject.value = data;
        // console.log(cellObject.value);
        updateChildren(cellObject);
    })
}


//now putting event listener on formula bar as we can only
//set formula from the formula box;


//writing code for fromula remove 


formulaBar.addEventListener("keydown",function(e){
    if(e.key == "Enter" && formulaBar.value){
       //get formula from formula bar
      let currentFormula = formulaBar.value;
        console.log(currentFormula);
       //address of the cell jispe formula execute karna hai 
       //toh formula bar pe click karne se pehle ui pe 
      // us cell pe click karna is important 

      //yeh address whana kaam aayega jaahan hum jab set parent karenge
      // toh formula ke ander ke A1 A2 jis cell par formule
      //ki tarah lagenge woh cell A1 A2 ka child ka part banaega 
      //and cyurrently clicked B1  par hai 
      //toh B1 child banega DOno ka and wahi hume achieve bhi karna 
      //hai  ki A1 + A2 jo bhi use kar raha hai woh use karne vala
      //A1 A2 ka child ban jaaye 
      let address = addressInput.value;

      let {rid,cid} = getRIDCIDObject(address);
      let cellObject = sheetDb[rid][cid];
      
      //case 3- formula implementation case c -check 
      // overiding different formula
       if(currentFormula != cellObject.formula){
          removeFormula(cellObject,address);
      }

       //calculate and return the value after evaluationg the formula
       let value = evaluateFormula(currentFormula);

       //set cell for the which we are setting the formula on
       //ui + sheetDb update
       setCell(value,currentFormula);
       setParentCHArray(currentFormula,address);


       //also updating children after overiding the old formula and 
       //inserting the new one
       updateChildren(cellObject);

    }
})
function removeFormula(cellObject,myName){
    let formula = cellObject.formula;
    let formulaToken = formula.split(" ");

    for(let i=0;i<formulaToken.length;i++){
        let ascii = formulaToken[i].charCodeAt(0);
        if(ascii>=65 && ascii<=90){
            let {rid,cid} = getRIDCIDObject(formulaToken[i]);
            let parentObj = sheetDb[rid][cid];
            let idx = parentObj.children.indexOf(myName);
            parentObj.children.splice(idx,1);
        }
    }
    cellObject.formula = "";
}

function evaluateFormula(cformula) {
    // ( A1 + A2 )
    // split 
    // [(,A1,+,A2,)]
    // a-> z
    let formulaTokens = cformula.split(" ");
    for (let i = 0; i < formulaTokens.length; i++) {
        let ascii = formulaTokens[i].charCodeAt(0);
        if (ascii >= 65 && ascii <= 90) {
            let { rid, cid } = getRIDCIDObject(formulaTokens[i]);
            let value = sheetDb[rid][cid].value;
            formulaTokens[i] = value;
        }
    }
    // [(,10,+,20,)]
    let evaluatedFormula = formulaTokens.join(" ");
    // ( 10 + 20 )
    // stack 
    return eval(evaluatedFormula);
}

function setCell(calculatedValue,currentFormula){

    //yeh woh uicell element hai jisme actually formula implemented hoke uski value change hogi

    let uiCellElem  = findUiCellElement();
    uiCellElem.innerText = calculatedValue;
     
    //same uicell ka rid cid object nikala kyunki 
    //use sheetDb me bhi update karana hai 

    let {rid,cid} = getRIDCIDObject(addressInput.value);
    sheetDb[rid][cid].value = calculatedValue;
    sheetDb[rid][cid].formula = currentFormula;
}

function setParentCHArray(formula,chAddress){
    let formulaTokens = formula.split(" ");
    for (let i = 0; i < formulaTokens.length; i++) {
        let ascii = formulaTokens[i].charCodeAt(0);
        if (ascii >= 65 && ascii <= 90) {
            let { rid, cid } = getRIDCIDObject(formulaTokens[i]);
            let parentObj = sheetDb[rid][cid];
        //yahan kaam aaya woh address jo ki
        //formula bar ke eventlistener me nikala tha
            parentObj.children.push(chAddress);
            console.log(parentObj);
        }
    }
}

// function updateChildren()

function updateChildren(cellObject){
   let children = cellObject.children ;

   for(let i=0;i<children.length;i++){
       let childAddress = children[i];

       //finding children in the sheetDb 
       let{rid ,cid} = getRIDCIDObject(childAddress);
       let childObject  = sheetDb[rid][cid];

        //now i have to find formula on this childObj
        //and re-evaluate the formula on that cel
        //then update the cell propertirees on Ui and db

        let childFormula = childObject.formula;
        let newValue = evaluateFormula(childFormula);
        setChildrenCell(newValue,childFormula,rid,cid);
        updateChildren(childObject);
   }
}

function setChildrenCell(newValue,childFormula,rid,cid){
    let uiCellElem = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    uiCellElem.innerText = newValue;
    sheetDb[rid][cid].value = newValue; 
    sheetDb[rid][cid].formula = childFormula; 
}