function add(numbers){
    return numbers.reduce((total,number)=>total + number,0);
}

function subtract(numbers){
    return numbers.reduce((result,number)=>result==0?result=number: result-=number,0)
}

function multiply(numbers){
    return numbers.reduce((result,number)=>result*=number,1)
}

function divide(numbers){
    return numbers.reduce((result,number)=>result==0?result=number: result/=number,0);
}

function exponent(numbers){
    return numbers.reduce((result,number)=>result==0?result=number: result **=number,0)
}

function operate(operator,...numbers){
    return operator=='+'? add(numbers):
        operator=='-'?subtract(numbers):
        operator=='*'?multiply(numbers):
        operator=='**'?exponent(numbers):
        divide(numbers);
}

/* Reslt */
const result = document.querySelector('.result')

/* Input */
const input=document.querySelector('input');
const numbersToBeOperated=[]
let number='';
input.addEventListener('keydown',(e)=>{
    e.preventDefault()
    let key=e.key;
    console.log(key)
    if(key=='Backspace'){
        backspace()
    }else if(key.match(/^F[1-9]|^F1[0-2]$/)){
        return
    }else if(key=='Enter'){
        result.textContent=`Ans:${showResult(numbersToBeOperated,number)}`
        input.value=showResult(numbersToBeOperated,number)
        number=showResult(numbersToBeOperated,number)
        numbersToBeOperated.length=0
    }
    if(key.match(/[0-9+/*-]/)){
        console.log(number)
        numberAndOperatorInput(key)
    }
    })

window.addEventListener('load',()=>{
    input.value=''
})

function backspace(){
    input.focus()
    let lastCharacter=input.value[input.value.length-1]
    if(lastCharacter=='+'||lastCharacter=='-'||lastCharacter=='x'||lastCharacter=='÷' || lastCharacter=='^'){
        numbersToBeOperated.pop()
        console.log(numbersToBeOperated)
        input.value=input.value.slice(0,input.value.length-1)
        number=numbersToBeOperated[numbersToBeOperated.length-1]
        numbersToBeOperated.pop()
    }else{
        console.log('number',number)
        if(number.length>0){
            console.log('ti is in')
            number=number.slice(0,number.length-1)
            input.value=input.value.slice(0,input.value.length-1)
            console.log(showResult(numbersToBeOperated,number))

        }
    }
    result.textContent=`Ans:${showResult(numbersToBeOperated,number)}`
}


function numberAndOperatorInput(key){
    input.focus()
    if(key=='*'|| key=='/' || key=='+' || key=='-'||key=='x'||key=='÷' || key=='^'){
        console.log(numbersToBeOperated,'here')
        if(numbersToBeOperated.length>0){
            console.log('here')
            let lastCharacter=input.value[input.value.length-1];
            if(lastCharacter=='+'||lastCharacter=='-'
                ||lastCharacter=='*'||lastCharacter=='/'
                ||lastCharacter=='x'||lastCharacter=='÷' 
                || lastCharacter=='^') return
        }
        numbersToBeOperated.push(number,key);
        number='';
        console.log(numbersToBeOperated)
    }
    else{
        number +=key
        console.log(numbersToBeOperated)
    }
    input.value+=key=='*'?'x':key=='/'?'÷':key;
    result.textContent=`Ans:${showResult(numbersToBeOperated,number)}`
}

function showResult(list,lastNumber){
    let numberAndOperatorArray=[...list,lastNumber].map((operator)=>{return operator=='x'?operator='*':
                                                                                operator=='÷'?operator='/':
                                                                                operator=='^'?operator='**':
                                                                                operator});
    console.log(numberAndOperatorArray)
    let operatorArray=[]

    if(numberAndOperatorArray.indexOf('**')!=-1) operatorArray.push('**')
    if(numberAndOperatorArray.indexOf('*')!=-1) operatorArray.push('*')
    if(numberAndOperatorArray.indexOf('/')!=-1) operatorArray.push('/')
    if(numberAndOperatorArray.indexOf('-')!=-1) operatorArray.push('-')
    if(numberAndOperatorArray.indexOf('+')!=-1) operatorArray.push('+')
    solveStePByStep(numberAndOperatorArray,operatorArray)
    operatorArray.length=0
    return numberAndOperatorArray[0].toString()
}
function solveStePByStep(array,operatorArray){
    for(let i=0;i<operatorArray.length;i++){
        while(array.indexOf(operatorArray[i])!=-1){
            let operatorIndex = array.indexOf(operatorArray[i])
            let leftNumber;
            let rightNumber;
            if(operatorArray[i]=='*'||operatorArray[i]=='/'||operatorArray[i]=='**'){
                leftNumber=array[operatorIndex-1]==''?1 : array[operatorIndex-1];
                rightNumber=array[operatorIndex+1]==''?1 : array[operatorIndex+1];
            }else{
                leftNumber=array[operatorIndex-1]==''?0 :array[operatorIndex-1];
                rightNumber=array[operatorIndex-1]==''&& operatorIndex-1==0 && operatorArray[i]=='-'?'-'+array[operatorIndex+1]:
                            array[operatorIndex+1]==''?0 : array[operatorIndex+1];
            }
            console.log(leftNumber,rightNumber)
            let newNumber=operate(operatorArray[i],+leftNumber,+rightNumber);
            array.splice(operatorIndex-1,3,newNumber)
        }
    }
}



/* Numbers and Operator buttons */
const numberButtons = document.querySelectorAll('.buttonArea div')[0];
const operators = document.querySelectorAll('.buttonArea div')[1];
let text='9';
let operatorSymbols=['AC','DEL','÷','x','-','+','=']
let index=0;
for(let i=0;i<4;i++){
    
    function buttonFunction(){
        input.value+=this.textContent
    }   
    //number buttons
    
    const LnumberBtnRow=document.createElement('div');
    LnumberBtnRow.classList.add('numberBtnRow');
    for(let j=0;j<3;j++){

        const numberBtn=document.createElement('div');
        numberBtn.classList.add('numberBtn','leftNumber');
        numberBtn.textContent=text=='0'?'^':text=='-1'?'.':text=='-2'?'0':text
        LnumberBtnRow.append(numberBtn)
        numberBtn.addEventListener('click',numberAndOperatorInput.bind(null,numberBtn.textContent))
        text--;
    }
    numberButtons.append(LnumberBtnRow)

    //operators buttons
    const RnumberBtnRow=document.createElement('div');
    RnumberBtnRow.classList.add('numberBtnRow');
    for(let j=0;j<2;j++){
        if(index==7){
            break;
        }else{
            const numberBtn=document.createElement('div');
            numberBtn.classList.add('numberBtn','rightNumber');
            if(index==0 || index==1){
                numberBtn.classList.add('orangeBackground')
            }
            numberBtn.textContent=operatorSymbols[index];
            if(index>1 && index<operatorSymbols.length-1){
                numberBtn.addEventListener('click',numberAndOperatorInput.bind(null,numberBtn.textContent))
            }else if(operatorSymbols[index]=='AC'){
                numberBtn.addEventListener('click',()=>{
                    input.value='';
                    number='';
                    numbersToBeOperated.length=0
                    result.textContent='Ans:'
                })
            }else if(operatorSymbols[index]=='DEL'){
                numberBtn.addEventListener('click',backspace)
            }else if(operatorSymbols[index]='='){
                numberBtn.addEventListener('click',()=>{
                    result.textContent=`Ans:${showResult(numbersToBeOperated,number)}`
                    input.value=showResult(numbersToBeOperated,number)
                    number=showResult(numbersToBeOperated,number)
                    numbersToBeOperated.length=0
                })
            }
            RnumberBtnRow.append(numberBtn)
            index++;
        }
        
    }
    operators.append(RnumberBtnRow)
}

