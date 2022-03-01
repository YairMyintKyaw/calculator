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
const input=document.querySelector('#input');
const numbersToBeOperated=[]
let number='';
let inputString=''
input.addEventListener('keydown',(e)=>{
    if(e.key=='Enter'){
        result.textContent=`Ans:${showResult(numbersToBeOperated,number)} || ''`
        input.value=showResult(numbersToBeOperated,number)
        number=showResult(numbersToBeOperated,number) || ''
        numbersToBeOperated.length=0
    }
})
input.addEventListener('input',(e)=>{
    let key=e.data;
    console.log(e)
    if(!isNaN(key) || key=='Backspace' || key=='Enter' || key=='*' || key=='/' || key=='+' || key=='-'){
        if(e.inputType=='deleteContentBackward'){
            backspace()
        }else if(key.match(/[0-9+/*-]/)){
            console.log(number)
            e.target.value=e.target.value.slice(0,e.target.value.length-1)
            numberAndOperatorInput(key)
        }
    }else{
        e.target.value=e.target.value.slice(0,e.target.value.length-1)
        console.log('key wrong')
        return false
    }

    })

window.addEventListener('load',()=>{
    input.value=''
})

function backspace(check){
    console.log(input.value)
    let lastCharacter=inputString[inputString.length-1]
    
    if(lastCharacter=='+'||lastCharacter=='-'||lastCharacter=='*'||lastCharacter=='/' || lastCharacter=='^'){
        numbersToBeOperated.pop()
        if(check==true) input.value=input.value.slice(0,input.value.length-1)
        number=numbersToBeOperated[numbersToBeOperated.length-1];
        numbersToBeOperated.pop()
        inputString=inputString.slice(0,inputString.length-1)
    }else if(number.length>0){
            number=number.slice(0,number.length-1)
            if(check==true) input.value=input.value.slice(0,input.value.length-1)
            console.log(showResult(numbersToBeOperated,number))
            inputString=inputString.slice(0,inputString.length-1)
        }
    
    result.textContent=`Ans:${showResult(numbersToBeOperated,number) || ''}`
}


function numberAndOperatorInput(key){
    if(key=='*'|| key=='/' || key=='+' || key=='-'||key=='x'||key=='÷' || key=='^'){
        if(numbersToBeOperated.length>0){
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
    result.textContent=`Ans:${showResult(numbersToBeOperated,number) || ''}`
    inputString+=key
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
    return numberAndOperatorArray[0].toString() || ''
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
    
    //number buttons
    
    const LnumberBtnRow=document.createElement('div');
    LnumberBtnRow.classList.add('numberBtnRow');
    for(let j=0;j<3;j++){

        const numberBtn=document.createElement('div');
        numberBtn.classList.add('numberBtn','leftNumber');
        numberBtn.textContent=text=='0'?'^':text=='-1'?'.':text=='-2'?'0':text
        LnumberBtnRow.append(numberBtn)
        numberBtn.addEventListener('click',numberAndOperatorInput.bind(null,numberBtn.textContent))
        numberBtn.addEventListener('click',clickAnimation)
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
            numberBtn.classList.add('numberBtn');
            if(index==0 || index==1){
                numberBtn.classList.add('orangeBackground')
            }
            numberBtn.textContent=operatorSymbols[index];
            numberBtn.addEventListener('click',clickAnimation)
            if(index>1 && index<operatorSymbols.length-1){
                numberBtn.addEventListener('click',numberAndOperatorInput.bind(null,numberBtn.textContent))
                numberBtn.classList.add('operatorBtn')
            }else if(operatorSymbols[index]=='AC'){
                numberBtn.addEventListener('click',()=>{
                    input.value='';
                    number='';
                    numbersToBeOperated.length=0
                    result.textContent='Ans:'
                })
            }else if(operatorSymbols[index]=='DEL'){
                numberBtn.addEventListener('click',backspace.bind(null,true))
            }else if(operatorSymbols[index]='='){
                numberBtn.addEventListener('click',()=>{
                    result.textContent=`Ans:${showResult(numbersToBeOperated,number) || ''}`
                    input.value=showResult(numbersToBeOperated,number)
                    number=showResult(numbersToBeOperated,number) || ''
                    numbersToBeOperated.length=0
                })
            }
            RnumberBtnRow.append(numberBtn)
            index++;
        }
        
    }
    operators.append(RnumberBtnRow)
}

//Click animation
function clickAnimation(){
    this.classList.add('clicked')
    setTimeout(() => {
        this.classList.remove('clicked')
    }, 100);
}
