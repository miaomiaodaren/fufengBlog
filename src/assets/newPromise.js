//https://github.com/liriliri/eris/blob/master/p/Promise.js
//
import { isObject, isFun } from '@/assets/util'

//这个方法在resolve成功与失败reject的时候都会使用apple进行调用，都会把newPromise对象的this传过来，所以这边this必定是newPromise
var final = function(status, value) {
    var promise = this, fn, st;
    if(promise._status !== 'PENDING') return     //promise 只有二种状态由进行到成功，或进行到失败，再无第三种可能
    //这边使用异步的操作，主要是为了让then先执行，从面这方法里面主要是用来改变promise的状态，来判断是否成功还是失败
    setTimeout(function() {
        promise._status = status;
        st = promise._status === 'FULFILLED'        //st 返回bool，来判断状态是否成功
        var queue = promise[st ? '_resolves' : '_rejects'];
        //这边会触发then里面的handle方法
        while(fn = queue.shift()) {
            value = fn.call(promise, value) || value;
        }
        promise[st ? '_value' : '_reason'] = value;
        promise['_resolves'] = promise['_rejects'] = undefined;
    })
}


function newPromise(resolver) {
    //第一次传入的时候resolver是function(resolve, reject) {} 方法，最后会执行这个方法，resolve reject都是fun
    //传入的resolver是一个function，会带有二个参数，分别是正确的resolve 与错误的 reject
    if(! typeof resolver === 'function') throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
    //如果不是promise实例,则new一个
    if(!(this instanceof newPromise)) return new newPromise(resolver);

    var promise = this;
    promise._status = 'PENDING';   //promise有三种状态，分别是 pending 进行中   fulfilled 成功   rejected 失败
    promise._value;
    promise._reason;
    //存储状态
    promise._resolves = [];
    promise._rejects = [];
    var resolve = function(value) {
        //这边使用了apply,把参数以数组包装，形成['FULFILLED', value]的形势
        final.apply(promise, ['FULFILLED'].concat([value]));
    };

    var reject = function(reason) {
        final.apply(promise, ['REJECTED'].concat([reason]));
    }
    //new Promise(function(resolve,reject){xxx}   resolve 与 reject 二个都是function,可以带一个参数
    resolver(resolve, reject)
}

newPromise.prototype.then = function(onFulfilled, onRejected) {
    var promise = this;
    //then里面每次返回的都是一个promise对象
    return new newPromise(function(resolve, reject) {
        function handle(value) {
            var ret = typeof onFulfilled === 'function' && onFulfilled(value) || value
            if(ret && typeof ret['then'] == 'function') {
                ret.then(function(value) {
                    resolve(value);
                }, function(reason) {
                    reject(reason)
                })
            } else {
                resolve(ret)
            }
        };

        function errback(reason) {
            reason = typeof onRejected === 'function' && onRejected(reason) || reason;
            reject(reason);
        }
        if(promise._status === 'PENDING') {
            promise._resolves.push(handle);
            promise._rejects.push(errback);
        } else if(promise._status === 'FULFILLED') {
            callback(promise._value);
        } else if(promise._status === 'REJECTED') {
            errback(promise._reason);
        }
    })
}

//promise catch函数
newPromise.prototype.catch = function(onRejected) {
    return this.then(undefined, onRejected)
}

newPromise.resolve = function(arg) {
    return newPromise(function(resolve, reject) {
        resolve(arg)
    })
}

newPromise.reject = function(arg) {
    return newPromise(function(resolve, reject) {
        reject(arg)
    })
}

newPromise.all = function(promise) {
    if(!Array.isArray(promise)) {
        throw new TypeError('You must pass an array to all.');
    }
    return newPromise(function(resolve, reject) {
        var i = 0,
            result = [],
            len = promise.length,
            count = len;
        function resolver(index) {
            return function(value) {
                resolveAll(index, value);
            }
        };

        function rejecter(reason) {
            reject(reason)
        }

        function resolveAll(index,value){
            result[index] = value;
            if( --count == 0){
                resolve(result)
            }
        }

        for (; i < len; i++) {
            promises[i].then(resolver(i),rejecter);
        }
    })
}


newPromise.race = function(promises){
    if (!Array.isArray(promises)) {
        throw new TypeError('You must pass an array to race.');
    }
    return newPromise(function(resolve,reject){
        var i = 0,
            len = promises.length;

        function resolver(value) {
            resolve(value);
        }

        function rejecter(reason){
            reject(reason);
        }

        for (; i < len; i++) {
            promises[i].then(resolver,rejecter);
        }
    });
}

//实例
// var getData100 = function(){
//     return new Promise(function(resolve,reject){
//         setTimeout(function(){
//             resolve('100ms');
//         },1000);
//     });
// }
// getData100().then(function(data){
//     console.log(data); // 100ms
//     return getData200();
// }).then(function(data){}}
export default newPromise