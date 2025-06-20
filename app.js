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
    increment() {return `Hello`},
    decrement() {},
    getValue() {},
    reset() {}
}

// console.log(counter1.methods.increment())


const counterPrototype = {
    increment() { return `Hello`},
    decrement() {},
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

// const counter = createCounter(1);
// console.log(counter.count)

// const counter3 = createCounter();
// console.log(counter3.count);


// ---------------------------STEP 4-------------------------------------------------------------------------------

function s4createCounter(initialValue = 0){
    let count = initialValue;

    let counter = {
        __proto__ : counterPrototype,
        // created private methods to override prototype methods
        increment() { return count+=2 },
        decrement() {return count-=1},
        getValue() {return count},
        reset() {return count = initialValue}   
    }
    return counter;
};
// 2 counter instances created from s4createCounter
const s4counter1 = s4createCounter(5);
const s4counter2 = s4createCounter(12);

// 1st counter instance
// console.log(s4counter1.increment());
// console.log(s4counter1.decrement());
// console.log(s4counter1.getValue());
// console.log(s4counter1.reset());

// 2nd counter instance
// console.log(s4counter2.increment());
// console.log(s4counter2.decrement());
// console.log(s4counter2.getValue());
// console.log(s4counter2.reset());



// ---------------------------STEP 5-------------------------------------------------------------------------------

function s5createCounter(initialValue = 0){
    let count = initialValue;

    let counter = {
        __proto__ : counterPrototype,
        // created private methods to override prototype methods
        increment() { return count+=2 },
        decrement() {return count-=1},
        getValue() {return count},
        reset() {return count = initialValue}, 
        // added higher order function - takes function as parameter
        transform(transformFn){
            return transformFn(count);
        },
        // added higher order function - returns a function
        createPredicate(){
            return (threshold) =>{
                if(count >= threshold){
                    return true;
                }
                return false;
            }
        },

        // added higher order function - takes a callback function as parameter
        onChange(callbackFn){
            // increment / decrement modification
            count.increment = ()=>{
                const newValue = count.increment();
                // call callback function
                callbackFn(newValue, 'Increment');
            };
            count.decrement = ()=>{
                const newValue = count.decrement;
                // call callback function
                callbackFn(newValue, 'decrement')
            };
            return counter;
        }
    };
    return counter;
};


const s5counter = s5createCounter(5);

// console.log(s5counter.transform( value =>{
//     return value * 2;
// }));

// console.log(s5counter.transform( value =>{
//    return Math.max(value, 0)
// }));

// const isAboveThreshold = s5counter.createPredicate();
// console.log(isAboveThreshold(10))

// const add = s5counter.onChange((newValue, operationType)=>{
//     return `New Value: ${newValue}, Operation Type: ${operationType}`
// }).increment();

// const subtract = s5counter.onChange((newValue, operationType)=>{
//     return `New Value: ${newValue}, Operation Type: ${operationType}`
// }).decrement();

// console.log(add);
// console.log(subtract);

// ---------------------------STEP 6-------------------------------------------------------------------------------

function s6createCounter(initialValue = 0){
    let count = initialValue;

    let counter = {
        __proto__ : counterPrototype,
        // created private methods to override prototype methods
        increment() { return count+=2 },
        decrement() {return count-=1},
        getValue() {return count},
        reset() {return count = initialValue}, 
        // added higher order function - takes function as parameter
        transform(transformFn){
            return transformFn(count);
        },
        // added higher order function - returns a function
        createPredicate(){
            return (threshold) =>{
                if(count >= threshold){
                    return true;
                }
                return false;
            }
        },
        // added higher order function - takes a callback function as parameter
        onChange(callbackFn){
            // increment / decrement modification
            count.increment = ()=>{
                const newValue = count.increment();
                // call callback function
                callbackFn(newValue, 'Increment');
            };
            count.decrement = ()=>{
                const newValue = count.decrement;
                // call callback function
                callbackFn(newValue, 'decrement')
            };
            return counter;
        },
        // implemented immutability with the following functions
        add(value) {
            const newValue = count + value;
            return newValue;
        },
        subtract(value) {
            const newValue = count - value;
            return newValue;
        },
        multiply(value) {
            const newValue = count * value;
            return newValue;
        },
        // added a snapshot method
        snapshot(){
            const newValue = count ;
            return newValue;
        }
    }
    return counter;
};


const s6counter = s6createCounter(5);

// console.log(s6counter.add(1));
// console.log(s6counter.subtract(1));
// console.log(s6counter.multiply(2));

// console.log(s6counter.increment())
// console.log(s6counter.snapshot())

// console.log(s6counter.getValue());


// ---------------------------STEP 7-------------------------------------------------------------------------------

function s7createCounter(initialValue = 0){
    let count = initialValue;

    let counter = {
        __proto__ : counterPrototype,
        // created private methods to override prototype methods
        increment() { return count+=2 },
        decrement() {return count-=1},
        getValue() {return count},
        reset() {return count = initialValue}, 
        // added higher order function - takes function as parameter
        transform(transformFn){
            return transformFn(count);
        },
        // added higher order function - returns a function
        createPredicate(){
            return (threshold) =>{
                if(count >= threshold){
                    return true;
                }
                return false;
            }
        },
        // added higher order function - takes a callback function as parameter
        onChange(callbackFn){
            // increment / decrement modification
            count.increment = ()=>{
                const newValue = count.increment();
                // call callback function
                callbackFn(newValue, 'Increment');
            };
            count.decrement = ()=>{
                const newValue = count.decrement;
                // call callback function
                callbackFn(newValue, 'decrement')
            };
            return counter;
        },
        // implemented immutability with the following functions
        add(value) {
            const newValue = count + value;
            return newValue;
        },
        subtract(value) {
            const newValue = count - value;
            return newValue;
        },
        multiply(value) {
            const newValue = count * value;
            return newValue;
        },
        // added a snapshot method
        snapshot(){
            const newValue = count ;
            return newValue;
        },
        //added a batch(operations) method that accepts an object with destructuring
        batch({increment, decrement}){
            const valueInc = count + increment;
            const valueDec = count - decrement;
            return(
                `increase value: ${valueInc}, decrease value: ${valueDec}`
            )
        },
        // added a toString() method that uses template literals to return a formatted string.
        toString(){
            return `The current count is ${count}`
        }
    }
    return counter;
};

const s7count = s7createCounter(10);

// console.log(s7count.batch({increment:3, decrement:2}))
// console.log(s7count.toString());

// ---------------------------STEP 8-------------------------------------------------------------------------------

function createAdvancedCounter ({initialValue = 0, step = 1, min =  -Infinity, max = Infinity }){
    let count = initialValue;
    
    const counter = {
        // To ensure the counter respects the min/max boundaries.
        increment() { 
            count+=step
            if (count > max) throw new Error(`${count} is greater than the expected maximum value of ${max} `);
            return count;
         },
        decrement() {
            count-=step
            if (count < min) throw new Error(`${count} is less than the expected minimum value of ${min} `);
            return count;
        },
        // a getConfig() method that returns the current configuration.
        getConfig (){
        return {
            initialValue,
            step,
            max,
            min
        }

        }
    }
    
    return counter;
};

const advancedCounter = createAdvancedCounter({initialValue:2, step:5, max:3, min:-1})
// console.log(advancedCounter.increment())
// console.log(advancedCounter.decrement())
// console.log(advancedCounter.getConfig())



// ---------------------------STEP 9-------------------------------------------------------------------------------

// Test for Step 1
console.log(`counter1 value: ${counter1.getValue()}`);
counter1.increment();
console.log(`counter2 value: ${counter2.getValue()}`);
console.log(`new counter1 value: ${counter1.getValue()}`);

// Test for Step 2
console.log(counter1.methods.increment())

// Test for Step 3
const counter = createCounter(1);
console.log(counter.count)

const counter3 = createCounter();
console.log(counter3.count);

//Test for Step 4
// 1st counter instance
console.log(s4counter1.increment());
console.log(s4counter1.decrement());
console.log(s4counter1.getValue());
console.log(s4counter1.reset());

// 2nd counter instance
console.log(s4counter2.increment());
console.log(s4counter2.decrement());
console.log(s4counter2.getValue());
console.log(s4counter2.reset());

//Test for Step 5
console.log(s5counter.transform( value =>{
    return value * 2;
}));

console.log(s5counter.transform( value =>{
   return Math.max(value, 0)
}));

const isAboveThreshold = s5counter.createPredicate();
console.log(isAboveThreshold(10))

const add = s5counter.onChange((newValue, operationType)=>{
    return `New Value: ${newValue}, Operation Type: ${operationType}`
}).increment();

const subtract = s5counter.onChange((newValue, operationType)=>{
    return `New Value: ${newValue}, Operation Type: ${operationType}`
}).decrement();

console.log(add);
console.log(subtract)


// Test for Step 6
console.log(s6counter.add(1));
console.log(s6counter.subtract(1));
console.log(s6counter.multiply(2));

console.log(s6counter.increment())
console.log(s6counter.snapshot())

console.log(s6counter.getValue());

// Test for Step 7
console.log(s7count.batch({increment:3, decrement:2}))
console.log(s7count.toString());


// Test for Step 8
console.log(advancedCounter.increment())
console.log(advancedCounter.decrement())
console.log(advancedCounter.getConfig())