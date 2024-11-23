// alert("Hello");
console.log("Hi");
const a = 1;
const b = 2;
console.log(a + b);

function addNums(start, end) {
    let result = 0;

    for(; start <= end; start++) {
        result += start;
    }

    return(result)
}

let answer = addNums(1,100);
console.log(answer);

class NumberAdder {
    constructor(start, end) {
        this.start = start
        this.end = end;
        this.result = 0;
    }

    addTwoNumbers() {
        let s = this.start;
        let e = this.end;
        let r = this.result;
        for(; s <= e; s++) {
            r += s;
        }
        return(r);
    }
}

const add = new NumberAdder(1,100);
console.log(add.addTwoNumbers());
