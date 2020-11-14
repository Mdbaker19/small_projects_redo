$(document).ready(function (){
    let inputField = document.getElementById("inputArea");
    let storedValue1 = null;
    let storedValue2 = null;
    let operator = null;
    let answerCalculated = false;
    let useAgainAnswer;
    let useAgainStoredValue;

    let equalAgain = false;
    let added = false;
    let subtracted = false;
    let multiplied = false;
    let divided = false;

   $(".numbers").on("click", function (){
       if(answerCalculated){
           inputField.innerText = "";
           equalAgain = false;
       }
       answerCalculated = false;
       if(inputField.innerText.length < 22){
           inputField.innerText += $(this).html();
       }
   });
    $(".method").on("click", function (){
        if(inputField.innerText.length > 0){
            operator = $(this).html().toString();
            storedValue1 = parseFloat(inputField.innerText);
            inputField.innerText = "";
        } else{
            inputField.innerText = "enter a number first";
            answerCalculated = true;
        }
    });
    $("#equal").on("click", function (){
       let answer = null;
       let calcAgainAnswer = null;
       storedValue2 = parseFloat(inputField.innerText);
        if(!equalAgain){
            if (operator === "+") {
                answer = storedValue1 + storedValue2;
                useAgainAnswer = answer;
                useAgainStoredValue = storedValue2;
                equalAgain = true;
                added = true;
                subtracted = false;
                multiplied = false;
                divided = false;
            }
            if (operator === "-") {
                answer = storedValue1 - storedValue2;
                useAgainAnswer = answer;
                useAgainStoredValue = storedValue2;
                equalAgain = true;
                subtracted = true;
                added = false;
                multiplied = false;
                divided = false;
            }
            if (operator === "*") {
                answer = storedValue1 * storedValue2;
                useAgainAnswer = answer;
                useAgainStoredValue = storedValue2;
                equalAgain = true;
                multiplied = true;
                added = false;
                subtracted = false;
                divided = false;
            }
            if (operator === "/") {
                answer = storedValue1 / storedValue2;
                useAgainAnswer = answer;
                useAgainStoredValue = storedValue2;
                equalAgain = true;
                divided = true;
                added = false;
                subtracted = false;
                multiplied = false;
            }
               inputField.innerText = answer;
               answerCalculated = true;
        } else{
            if(added){
                calcAgainAnswer = useAgainAnswer + useAgainStoredValue;
            } else if(subtracted){
                calcAgainAnswer = useAgainAnswer - useAgainStoredValue;
            } else if(multiplied){
                calcAgainAnswer = useAgainAnswer * useAgainStoredValue;
            } else if(divided){
                calcAgainAnswer = useAgainAnswer / useAgainStoredValue;
            }
            inputField.innerText = calcAgainAnswer;
            answerCalculated = true;
        }
    });
    $("#clear").on("click", function (){
        inputField.innerText = "";
        storedValue1 = null;
        storedValue2 = null;
        answerCalculated = false;
    });
});