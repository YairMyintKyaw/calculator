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

function operate(operator,...numbers){
    return operator=='+'? add(numbers):
        operator=='-'?subtract(numbers):
        operator=='*'?multiply(numbers):
        divide(numbers);
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
        numberBtn.textContent=text=='0'?'x10^':text=='-1'?'.':text=='-2'?'0':text
        LnumberBtnRow.append(numberBtn)
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
            RnumberBtnRow.append(numberBtn)
            index++;
        }
        
    }
    operators.append(RnumberBtnRow)
}

