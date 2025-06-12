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