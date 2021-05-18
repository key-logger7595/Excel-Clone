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
        cellObject.value = data;
        console.log(cellObject.value);
    })
}


//now putting event listener on formula bar as we can only
//set formula from the formula box;

formulaBar.addEventListener("keydown",function(e){
    if(e.key == "Enter" && formulaBar.value){
       //get formula from formula bar
        let currentFormula = formulaBar.value;
        console.log(currentFormula);
       //calculate and return the value after evaluationg the formula
      let value = evaluateFormula(currentFormula);

       //address of the cell jispe formula execute karna hai 
       //toh formula bar pe click karne se pehle ui pe 
      // us cell pe click karna is important 
      let address = addressInput.value;
     
       //set cell for the which we are setting the formula on
       //ui + sheetDb update
       setCell(value,currentFormula);

    }
})

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

