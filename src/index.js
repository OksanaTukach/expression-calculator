function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let arr = expr.split("");
    let firstArr = [];
    let numb = "";
    arr = arr.filter(item => item != " ");
    for(let a of arr){
        if(isFinite(a)){
        numb += a;
        }
        else{
        firstArr.push(numb);
        firstArr.push(a); 
        numb = "";
        }
    }
    firstArr.push(numb);
    firstArr = firstArr.filter(item => item != "");
    while(firstArr.length != 1){
    let secondArr = [];
    let thirdArr = [];
    let y = 0;
    for(let i = 0; i < firstArr.length; i++){
        if(firstArr[i] == "(")
        secondArr.push(i);
        if(firstArr[i] == ")"){
            if(secondArr.length == 0){
                throw new ("ExpressionError: Brackets must be paired");
            }
            else{
                thirdArr = firstArr.slice(secondArr[secondArr.length-1]+1,i);
                y = i - secondArr[secondArr.length-1];
                break;    
        }
    }
        if(i == firstArr.length-1 && secondArr.length > 0){
            throw new ("ExpressionError: Brackets must be paired");
        }
    }
    if(thirdArr.length == 0)
        thirdArr = firstArr.slice();
    while(thirdArr.length != 1){
        for(let i = 0; i < thirdArr.length; i++ ){
            if(thirdArr[i] == "*"){
            let x = thirdArr[i-1] * thirdArr[i+1];
            thirdArr.splice(i-1,3,x);
            break;
            }
            if(thirdArr[i] == "/"){
                if(thirdArr[i+1] == 0)
                throw new ("TypeError: Division by zero.");
                let x = thirdArr[i-1] / thirdArr[i+1];
                thirdArr.splice(i-1,3,x);
            break;
            }
        }
        if(thirdArr.find(item => item == "*" || item == "/") == "*" || thirdArr.find(item => item == "*" || item == "/") == "/")
            continue;
            else{
            for(let i = 0; i < thirdArr.length; i++ ){
            if(thirdArr[i] == "+"){
            let x = +thirdArr[i-1] + +thirdArr[i+1];
            thirdArr.splice(i-1,3,x);
            break;
            }
            if(thirdArr[i] == "-"){
                let x = thirdArr[i-1] - thirdArr[i+1];
                thirdArr.splice(i-1,3,x);
            break;
            }
        }
    }
    }
    if(secondArr.length != 0){
    firstArr.splice(secondArr.pop(),y+1,+thirdArr.toString());
    }
    else {
        firstArr = thirdArr;
        break;
    }

}
    return +firstArr.join("");
}

module.exports = {
    expressionCalculator
}