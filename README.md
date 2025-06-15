# Step 1
## Task 1.1
### Main Challenge(s)
- The use of 'this' keyword is not achievable with arrow function when using ES6. Throws error that variable is 'Undefined'


# Step 2
## Task 2.2
### Why we created Prototype first and not place methods directly in the counter instances
- We created the Prototype to serve as a template with which counter instances can make use of any time without polluting the code base by making different methods for different counter instance. This makes our code DRY.
- Also, I believe using the prototype saves memory space and increases efficiency.


# Step 3
## Task 3.1
### createCounter Function

function createCounter(initialValue = 0){
    let count = initialValue;

    let counter = {
        __proto__ : counterPrototype    
    }
    return counter;
}

## Task 3.2
### How the prototype methods will access the private count variable.
Unable to access the private variables using the prototype methods, to access the private count variable we need to create another function inside the createCounter function, forming a closure. The closure function can access and modify the private variable 'count'.

### After creating two counters, should they share the same count variable or have separate ones? Why?
With the function below,  the 2 counters can share the count variable without affecting each others value.
Why? Because they are 2 different instances of the createCounter function. 

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


# Step 4
## Task 4.1 & 4.2
### Modification of Factory Function and Implementation of private methods on counter object

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

## Task 4.4
### Testing instances to ensure no interference 
 
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


# Step 5
## Task 5.1 
### Higher-order functions that accept functions as parameters.
function s5createCounter(initialValue = 0){
    let count = initialValue;

    let counter = {
        __proto__ : counterPrototype,
        // created private methods to override prototype methods
        increment() { return count+=2 },
        decrement() {return count-=1},
        getValue() {return count},
        reset() {return count = initialValue}, 
        // added higher order function 
        transform(transformFn){
            return transformFn(count);
        } 
    }
    return counter;
};

const s5counter = s5createCounter(5);
console.log(s5counter.transform( value =>{
    return value * 2;
}));
console.log(s5counter.transform( value =>{
   return Math.max(value, 0)
}));

## Task 5.2 
### Higher-order functions that return functions
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
    }
    return counter;
};

## Task 5.3 
### Higher-order functions - onChange method

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
        onChange(callback){
            this.increment()
        }
    }
    return counter;
};

const add = s5counter.onChange((newValue, operationType)=>{
    return `New Value: ${newValue}, Operation Type: ${operationType}`
}).increment();

const subtract = s5counter.onChange((newValue, operationType)=>{
    return `New Value: ${newValue}, Operation Type: ${operationType}`
}).decrement();

console.log(add);
console.log(subtract)



# Step 6
## Implementing Immutability
### Task 6.1 
#### Added immutable methods
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
        }
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
    }
    return counter;
};

### Task 6.2
#### Added a snapshot() method that returns a new counter with the same current count.
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
        snapshot(){
            const newValue = count ;
            return newValue;
        }
    }
    return counter;
};

### Task 6.3
#### Testing that the original counter is unchanged after calling these methods

const s6counter = s6createCounter(5);

console.log(s6counter.add(1));
console.log(s6counter.subtract(1));
console.log(s6counter.multiply(2));

console.log(s6counter.getValue())

#### Question: What's the difference between counter.increment() and counter.add(1)?
#### Answer: 
s6counter.increment() mutates/ directly change the original value of count by adding to it while.
s6counter.add(1) creates a copy of count and adds 1 to it leaving the original count immutable.


# Step 7
## Enhance with ES6 Features
### Task 7.1 
#### ES6 features in code implementation
All code already in ES6

### Task 7.2
#### batch(operations) method that accepts an object with destructuring
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
        
    }
    return counter;
};

const s7count = s7createCounter(10);
console.log(s7count.batch({increment:3, decrement:2}))

### Task 7.3
#### added a toString() method that uses template literals to return a formatted string.

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
console.log(s7count.toString());



# Step 8
## Advanced Counter Factory
### Task 8.1 
#### a createAdvancedCounter() function that accepts a configuration object

function createAdvancedCounter ({initialValue = 0, step = 1, min =  -Infinity, max = Infinity }){
    let count = initialValue;
    
};

### Task 8.2 
#### Ensuring the counter respects the min/max boundaries.

function createAdvancedCounter ({initialValue = 0, step = 1, min =  -Infinity, max = Infinity }){
    let count = initialValue;
    // To ensure the counter respects the min/max boundaries.
    const counter = {
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
        
    }
    
    return counter;
};

### Task 8.3
#### A getConfig() method that returns the current configuration.

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


# Step 9
## Testing 
### Task 9
#### 

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