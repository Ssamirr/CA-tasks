// import _ from 'lodash';

// first
let firstArr = [1, 2, 3];
let secondArr = [4, 5, 6];
console.log("join", firstArr.concat(secondArr));

// second
let array2 = [1, 0, "2", "", false, undefined, NaN, 4, "sa", -22];

function InArray(array) {
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
        if (Number(array[i]) || typeof (array[i]) == "string" && array[i].length > 0) {
            newArray.push(array[i]);
        }
    }
    return newArray
}
console.log(InArray(array2));

// third

function arrayFilled(times, value) {
    let filledArr = [];
    for (let i = 0; i < times; i++) {
        filledArr.push(value);
    }
    return filledArr;
}
console.log(arrayFilled(6, 0));

// fourth
let array3 = [10, 20, 30, 40, 50];

function moveArray(array, index, position) {
    let movedArray = [];
    let changedElement;
    for (let i = 0; i < array.length; i++) {
        if (i != index) {
            movedArray.push(array[i]);
        } else {
            changedElement = array[i];
        }
        if (i == position) {
            movedArray.push(changedElement);
        }
    }
    return movedArray;
}
console.log(moveArray(array3, 0, 2));

// fifth

function increaseArray(start, lengthArray) {
    let increasedArray = [];
    for (let i = start; i <= lengthArray; i++) {
        increasedArray.push(i);
    }
    return increasedArray;
}
console.log(increaseArray(1, 4))

// sixth
function primeArray(array) {
    let newArr = [];
    array.map(element => {
        if (element > 2) {
            for (let i = 2; i < element; i++) {
                if (element % i == 0) {
                    newArr.push(i);
                    break;
                }
            }
        }
    })
    if (newArr.length) {
        return false
    } else {
        return true
    }
}
console.log(primeArray([2, 3, 5, 7, 8]));

// seven
let array4 = [1, -2, -2, 3, 4, -5, -6, -5];
let setArray = new Set(array4);
console.log(setArray);

// eight
let array5 = [1, 2, 3];
let array6 = [100, 2, 1, 10];
let setArray2 = new Set(array5.concat(array6));
let sortArray2 = [...setArray2].sort((a, b) => a - b);
console.log(sortArray2);

// nine
let array7 = [1, 2, 3];
let array8 = [100, 2, 1, 10];

function diff(arr1, arr2) {
    let difference = [..._.difference(arr1, arr2), ..._.difference(arr2, arr1)];
    return difference
}

console.log(diff(array7, array8));

// ten

// lodash
let arrShuffle = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
function shuffleArray(arr) {
    return _.shuffle(arrShuffle)
}
console.log("with lodash ", shuffleArray(arrShuffle));

// ......
function shuffleJs(arr) {
    let shuffledArray = [];
    let random = [];
    for (let x in arr) {
        let randomNumber = Math.floor(Math.random() * arr.length);
        while (random.includes(randomNumber)) {
            randomNumber = Math.floor(Math.random() * arr.length);
        }
        random.push(randomNumber);
        shuffledArray.push(arr[randomNumber]);
    }
    return shuffledArray
}

console.log("vanilla js", shuffleJs(arrShuffle));



