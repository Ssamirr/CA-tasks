function deepEquals(val1, val2) {

    if (val1 === val2) {
        return true;
    }
    else if (typeof val1 === "object" && typeof val2 === "object") {
        if (Array.isArray(val1) === true && Array.isArray(val2) === false ||
            Array.isArray(val1) === false && Array.isArray(val2) === true) {
            return false;
        } else {
            let val1Keys = Object.keys(val1)
            let val2Keys = Object.keys(val2)
            for (let key of val1Keys) {
                if (!val2Keys.includes(key) || !deepEquals(val1[key], val2[key])) {
                    return false;
                }
            }
            return true;
        }
    }
    else {
        return false;
    }
}

console.log(deepEquals(1, 1));
console.log(deepEquals(1, "1"));
console.log(deepEquals(null, null));
console.log(deepEquals(null, undefined));
console.log(deepEquals([], []));
console.log(deepEquals({}, {}));
console.log(deepEquals([], {}));
console.log(deepEquals({ a: 123, b: { c: [4, 5, 6] } }, { a: 123, b: { c: [4, 5, 6] } }));
console.log(deepEquals({ a: 123, b: { c: [4, 5, 6] } }, { b: { c: [4, 5, 6] } }));
console.log(deepEquals({ a: 123, b: { c: [4, 5, 6] } }, { a: 123, b: { c: [4, "5", 6] } }));
console.log(deepEquals([1, 2, [3, 4]], [1, 2, [3, 4]]));
console.log(deepEquals([1, 2, [3, 4, { a: 'abc' }]], [1, 2, [3, 4, { a: 'abc' }]]));