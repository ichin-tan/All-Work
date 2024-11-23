console.log("Hii");


function getSum(start, end) {
    let result = 0;

    for (s = start; start <= end; start++) {
        // result += num;
        result = result + start;
    }
    
    return(result);
}

let ans = getSum(7,10);
console.log(ans);
