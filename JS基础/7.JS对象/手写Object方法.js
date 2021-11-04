// 手写 Object.create
function myCreate(obj) {
    // 新声明一个函数
    function C() {};
    // 将函数的原型指向obj
    C.prototype = obj;
    // 返回这个函数的实例对象
    return new C();
}

// 手写 Object.assign
function myAssign(target, ...source) {
    if(target == null) {
        throw new TypeError('Cannot convert null to object');
    }
    let res = Object(target);
    source.forEach(obj => {
        if(obj != null) {
            for(let key in obj) {
                if(obj.hasOwnProperty(key)) {
                    res[key] = obj[key];
                }
            }
        }
    })

    return res;
}