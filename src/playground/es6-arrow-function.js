function square(x) {
    return x*x;
};

console.log(square(3));

// const squareArrow = (x) => {
//  return x*x;   
// };

const squareArrow = (x) => x*x;
console.log(squareArrow(4));

// getFirstName 
const fullName = "Delwyn Yit";

const getFirstName = (fullName) => {
    return fullName.split(' ')[0];
}

const getFirst = (fullName) => fullName.split(' ')[0]

console.log(getFirst(fullName));
