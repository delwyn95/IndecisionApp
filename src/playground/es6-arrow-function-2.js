// argument object - no longer bound with arrow function

const add = (a, b)=> {
    // console.log(arguments);
    return a+b;
}
console.log(add(55,1,1001));

// this keyword - no longer bound

const user = {
    name: "Delwyn",
    cities: ['Montreal', 'Lausanne', 'Dublin'],
    printPlacesLived() {
        return this.cities.map((city) => this.name + ' has lived in ' + city ); 
    }
};

console.log(user.printPlacesLived());

//Challenge

const multiplier = {
    numbers: [ 1,2,3],
    multiplyBy: 2,
    multiply() {
       return this.numbers.map((value) => value * this.multiplyBy );
    }
    // numbers - array of numbers
    // multiplyBy - single number
    //multiply - return a new array where the numbers have been miltipled
};

console.log(multiplier.multiply());