// 自定义Promise函数模块:IIFE

(function (window) {

    function Promise(excutor) {
        // excutor: 执行器函数（同步执行）
        // 给promise对象指定status属性，初始值为pending
        this.status = 'pending'; 
        // 给promise对象指定一个用于存储结果数据的属性
        this.data = undefined; 
        // 每个元素的结构： {onResolved() {}, onRejected() {}}
        this.callbacks = []; 
        function resolve(value) {
            if (this.status == 'pending') {
                this.status = 'resolved';
                this.data = value;
                // 如果有待执行的回调函数，立即异步执行回调函数onResolved
                if (this.callbacks.length > 0) {
                    setTimeout(() => {
                        // 执行队列中所有成功的回调
                        this.callbacks.forEach(v => {
                            v.onResolved(value);
                        })
                    })
                }
            }
        }
        function reject(reason) {
            if (this.status == 'pending') {
                this.status = 'rejected';
                 this.data = reason;
                // 如果有待执行的回调函数，立即异步执行回调函数onRejected
                if (this.callbacks.length > 0) {
                    setTimeout(() => { 
                        // 执行队列中所有失败的回调
                        this.callbacks.forEach(v => {
                            v.onRejected(reason);
                        })
                    })
                }
            }
        }
        // 同步执行 excutor
        try {
            excutor(resolve.bind(this), reject.bind(this));
        } catch (error) { 
            // 如果执行器抛出异常，promise对象变为rejected状态
            reject(error);
        }
    }

    // Promise原型对象的then()指定成功和失败的回调函数，并返回一个新的promise对象
    Promise.prototype.then = function (onResolved, onRejected) {
        // 指定默认的成功回调和失败回调
        onResolved = typeof onResolved === 'function' ? onResolved : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : reason => reason;
        // 返回一个新的 promise 对象
        return new Promise((resolve, reject) => {
            // 处理回调函数的返回值
            const handle = callback => {
                // 1. 如果抛出异常，return的promise就会失败，reason就是error
                // 2. 如果回调函数返回不是promise，return的promise就会成功，value就是返回的值
                // 3. 如果回调函数返回是promise，return的promise结果就是这个promise的结果
                try {
                    const result = callback(this.data);
                    if (result instanceof Promise) {
                        result.then(resolve, reject);
                    } else {
                        resolve(result);
                    }
                } catch (error) {
                    reject(error);
                }
            }
            if (this.status == 'pending') {
                // 将回调函数保存起来
                this.callbacks.push({
                    onResolved(value) {
                        handle(onResolved);
                    },
                    onRejected(reason) {
                        handle(onRejected);
                    }
                })
            } 
            if (this.status == 'resolved') {
                // 如果当前是resolve状态，异步执行onResolved并改变return的promise状态
                setTimeout(() => {
                    handle(onResolved);
                })
            }
            if(this.status == 'rejected') {
                // 如果当前是reject状态，异步执行onRejected并改变return的promise状态
                setTimeout(() => {
                    handle(onRejected);
                })
            }
        })
    }

    // Promise原型对象的catch()
    // 指定失败的回调函数
    // 返回一个新的promise对象
    Promise.prototype.catch = function (onRejected) {
        return this.then(undefined, onRejected)
    }

    // Promise函数对象resolve方法
    // 返回一个指定结果的成功的promise
    Promise.resolve = function (value) {
        return new Promise((resolve, reject) => {
            // value是promise
            if (value instanceof Promise) { // 使用value的结果作为promise的结果
                value.then(resolve, reject)
            } else { // value 不是promise
                resolve(value)
            }
        })
    }

    // Promise函数对象reject方法
    // 返回一个指定结果的失败的promise
    Promise.reject = function (reason) {
        return new Promise((resolve, reject) => {
            reject(reason)
        })
    }

    // Promise函数对象all方法
    // 返回一个promise，只有当参数里的所有promise都成功时才返回成功，只要有一个失败就返回失败
    Promise.all = (promises) => {
        const values = new Array(promises.length); // 用来保存所有成功 value 的数组
        let finishedCount = 0; // 记录当前完成了几个 Promise

        return new Promise((resolve, reject) => {
            // 遍历promises 获取每个promise的结果
            promises.forEach((v, k) => {
                v.then(
                    val => { // 成功，将成功的value保存到values
                        values[k] = val;
                        finishedCount++;
                        // 如果全部成功，将return的promise改为成功
                        if (finishedCount === promises.length) {
                            resolve(values);
                        }
                    },
                    reason => {
                        reject(reason);
                    }
                )
            });
        })
    }

    // Promise函数对象race方法
    // 返回一个promise，返回成功/失败由第一个完成的promise的结果决定
    Promise.race = function (promises) {
        return new Promise((resolve, reject) => {
            // 遍历promises 获取每个promise的结果
            promises.forEach(p => {
                p.then(
                    value => { // 一旦有成功的，将return变为成功
                        resolve(value)
                    },
                    reason => { // 一旦有失败的，将return变为失败
                        reject(reason)
                    }
                )
            });
        })
    }

    // 返回一个 Promise 对象，它在指定的时间后才确定成功的结果
    Promise.resolveDelay = function (value, time) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (value instanceof Promise) { // 使用value的结果作为promise的结果
                    value.then(resolve, reject)
                } else { // value 不是promise
                    resolve(value)
                }
            }, time)
        })
    }

    // 返回一个promise对象，它在指定的时间后才确定失败的结果
    Promise.rejectDelay = function (reason, time) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(reason)
            }, time)
        })
    }

    // 向外暴露自定义的Promise函数
    window.Promise = Promise
})(window)