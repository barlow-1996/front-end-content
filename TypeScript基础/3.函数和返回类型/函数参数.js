function getAdd(one, two) {
    return one + two;
}
var add = getAdd(1, 2);
console.log(add);
function getAdd1(one, two) {
    var items = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        items[_i - 2] = arguments[_i];
    }
    console.log(items);
    return 1;
}
getAdd1(1, 2, 'a', 'b', 'c', 3);
