export default function cPromise(fn) {
    var promise = this,
        value = null;
        promise._resolves = [];
        promise._status = 'PENDING';
    this.then = function(onFulfilled) {
        //第一次进来的时候，因为settimeout的原因，所以状态还是pending, 
        //根据案例, 此时onfulfilled应该是 function(res) {console.info('我真TM是一个傻逼', res);}
        //而此时返回了一个new promise 会执行promise._resolves.push(handle);  把这个存到resolves[]中，
        //然后再回到异步settimeout中，此时因为他第一个promise中,使用了resolve('222woshinaocan');
        //所以触发handle('222woshinaocan'); 此时ret的值会执行console.info('我真TM是一个傻逼', 222woshinaocan), 但是会返回undefined，则为value的值;
        //然后因为ret不是promise对象，没有then属性，所以触发了resolve
        return new cPromise(function(resolve) {
            function handle(value) {
                console.info(onFulfilled(value), value, '555555555555555555555555555555555555555');
                var ret = typeof onFulfilled === 'function' && onFulfilled(value) || value;
                if( ret && typeof ret ['then'] == 'function') {
                    ret.then(function(value){
                       resolve(value);
                    });
                } else {
                    console.info('77777777777777777777777777777777777', resolve, ret)
                    resolve(ret);
                }
            }
            if(promise._status === 'PENDING') {
                promise._resolves.push(handle);
            } else if(promise._status === 'FULFILLED') {
                console.info('666666666666666666666666666666666666666')
                handle(value)
            }
        })
    }
    function resolve(value) {
        //此处要让then中代码先执行，所以使用settimeout
        setTimeout(function() {
            console.info(promise._resolves, '8888888888888888888888888888888', value);
            promise._status = "FULFILLED";
            //then方法中，会把里面返回的方法都放到_resolves中
            promise._resolves.forEach(function(callback) {
                value = callback.call(promise, value)
            })
        }, 0)
    }
    fn(resolve);
}

// function cpromise() {
    // return new cPromise(function(resolve, reject) {
    //     resolve('222woshinaocan');
    // })
// }

// this.cpromise().then(res => {
//     console.info('我真TM是一个傻逼', res);
// })