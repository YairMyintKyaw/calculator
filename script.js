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

console.log(operate('*',2,2,2,3))