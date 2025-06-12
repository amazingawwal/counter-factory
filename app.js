// -------------------------STEP 1----------------------------------------------------------------
// This is a counter factory (Constructor ) function that creates counter objects
function CreateCounter (value){
    this.value = value
};

// Creating counter objects with private count value which are instances of the counter factory
const counter1 = new CreateCounter(5);
const counter2 = new CreateCounter(10);

// This adds new methods to the count factory function which can be inherited by the counter objects
CreateCounter.prototype.increment = function (){
    return this.value++;
};
CreateCounter.prototype.getValue = function (){
    return this.value;
};

// console.log(`counter1 value: ${counter1.getValue()}`);
// counter1.increment();
// console.log(`counter2 value: ${counter2.getValue()}`);
// console.log(`new counter1 value: ${counter1.getValue()}`);



// ---------------------------STEP 2-------------------------------------------------------------------------------

CreateCounter.prototype.methods = {
    increment() {},
    decrement() {},
    getValue() {},
    reset() {}
}

// console.log(counter1.methods.increment())

const counterPrototype = {
    increment() { return `Hello`},
    decrement() {return this.count + 1;},
    getValue() {},
    reset() {}
}

// ---------------------------STEP 3-------------------------------------------------------------------------------

function createCounter(initialValue = 0){
    let count = initialValue;

    let counter = {
        count,
        __proto__ : counterPrototype    
    }
    return counter;
}


const counter = createCounter(1);
console.log(counter.count)

const counter3 = createCounter();
console.log(counter3.count);




