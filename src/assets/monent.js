class Monent {
    constructor(timer) {
        const self = this;
        this.NowTime = timer || new Date;
        this.defftime = 0;
        this.timeformt = {
            y: 31536000,
            M: 2678400,
            d: 86400,
            H: 3600,
            m: 60,
            s: 1
        };
        return function(obj) {
            if(obj) {
                self.NowTime = self.isNumber(obj) ? self.timestamp(obj) : obj;
            } else {
                self.NowTime = new Date    
            }
            return self
        }
    }
        
    each(obj, cb) {
        if(!obj) return [];
        const length = obj.length;
        let keys = Object.keys(obj);
        if(Object.prototype.toString.call(obj) === '[object Array]') {
            for(let i = 0; i < length; i++) {
                //在callback方法中返回三个参数 
                cb(obj[i], keys[i], i ,obj);
            }
        } else  {
            let resole= [];
            for(let i = 0; i < length; i++) {
                cb(obj[i], keys[i], i ,obj);
            }
        }
        return obj
    }
    
    //根据传入的type,返回时间的各值
    //FullYear(年),Month(月),Date(天),Hours(时),Minutes(分),Seconds(秒),Milliseconds(毫秒),Day(星期)
    getoftype(type, timer) {
        if(!type) return ''
        const t = timer ? timer : this;
        return new Date(t)['get' + type]()
    }

    isDate(d) {
        return d instanceof Date || Object.prototype.toString.call(d) === '[object Date]'
    }

    isNumber(v) {
        return Object.prototype.toString.call(v) === '[objcet Number]'
    }

    //日期加法
    add(t, p) {
        const self = this;
        if(!!this.timeformt[p]) {
            this.NowTime = this.timestamp(this.cfordate(this.NowTime) + Number(this.timeformt[p] * t));
            return this
        } else {
            alert('22');
        }
    }

    //日期减法
    subtract(t, p) {
        if(!!this.timeformt[p]) {
            this.NowTime = this.timestamp(this.cfordate(this.NowTime) - Number(this.timeformt[p] * t));
            return this
        }
    }

    //二者时间差
    tiemrdeff(st, et) {
        let self = this;
        const length = arguments.length;
        let fv = Object.values(this.timeformt);
        console.info(this);
        let deff =  length === 1 ? Math.abs(this.cfordate(st) - this.cfordate(this.NowTime)) : this.cfordate(et) - this.cfordate(st),
              o = ['y', 'M', 'd', 'H', 'm', 's'],
              ts = ['年', '月', '日', '时', '分', '秒'];
        // let g = get.length > 0 ? o.indexOf(get[0]) : '';
        // self.each(ts, (v, k, n ,obj) => {
        //     if(g !== '' && g !== null) {
        //         if(n <= g) {
        //             s = Math.floor(deff / fv[g]) + obj[g];
        //         }
        //     } else {
        //         s += Math.floor(deff / fv[n]) + v;
        //         deff = deff - Math.floor(deff / fv[n]) *  fv[n];
        //     }
        // })
        // ts.forEach((v, n) => {
        //     s += Math.floor(deff / fv[n]) + v;
        //     deff = deff - Math.floor(deff / fv[n]) *  fv[n];
        //     if(g !== null && n === g) {
        //         return false
        //     }
        // })
        this.defftime = deff
        return this
    }

    //格式化时间戳
    deffmart(fmt) {
        let dt = this.defftime;
        let fv = this.timeformt;
        let s = fmt;
        if(!dt) return
        const ts = ['年', '月', '日', '时', '分', '秒'],
            o = {
                "y" : Math.floor(dt / fv['y']),
                "M" : Math.floor(dt / fv['M']),
                "d" : Math.floor(dt / fv['d']),
                "H" : Math.floor(dt / fv['H']),
                "h" : Math.floor(dt / fv['h']),
                "m" : Math.floor(dt / fv['m']),
                "s" : Math.floor(dt / fv['s']),
            }
        if(!fmt) {
            ts.forEach((v, n) => {
                let timevlaue = Object.values(fv);
                s += Math.floor(dt / timevlaue[n]) + ts[n];
                dt = dt - (Number(timevlaue[n]) * Math.floor(dt / timevlaue[n]));
            })
        } else {
            for(var k in o) {
                if(fmt.length > 1) {
                    let timevlaue = Object.values(fv);
                    if(new RegExp("("+ k +")").test(fmt)) {
                        s = s.replace(RegExp.$1, Math.floor(dt / fv[k]));
                        dt = dt - (Number(fv[k]) * Math.floor(dt / fv[k]));
                    }
                    // s += Math.floor(dt / fv[k]);
                } else {
                    if(new RegExp("("+ k +")").test(fmt)) {
                        // s += Math.floor(dt / fv[k]);
                        s = s.replace(RegExp.$1, Math.floor(dt / fv[k]));
                    }
                }
            }
        }
        return s
    }

    //时间格式转换成时间戳格式
    cfordate(c) {
        return Number(Date.parse(c) / 1000)
    }

    //时间戳格式转换成Date格式
    timestamp(timer, type) {
        if(!timer) return this
        return type ? new Date(parseInt(timer) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ') : new Date(parseInt(timer) * 1000);
    }

    //yyyy:MM:dd HH:mm:ss  转换时间格式
    formart(fmt, timer) {
        //判断传出的timer是否为时间戳格式
        const atimer = !!Number(timer) ? this.timestamp(timer) : timer;
        //如果传入了timer，则把this指向传入的时间，否则就指向monent.NowTime.
        const a = timer ? this.getoftype.bind(atimer) : this.getoftype.bind(this.NowTime);
        const o = {
            "M+" : a('Month') + 1, //月份
            "d+" : a('Date'), //日
            "h+" : a('Hours') % 12 == 0 ? 12 : a('Hours') % 12, //小时
            "H+" : a('Hours'), //小时
            "m+" : a('Minutes'), //分
            "s+" : a('Seconds'), //秒
            "q+" : Math.floor((a('Month') + 3) / 3), //季度
            "S"  : a('Milliseconds') //毫秒
        };
        const week = {
            "0" : "\u65e5",
            "1" : "\u4e00",
            "2" : "\u4e8c",
            "3" : "\u4e09",
            "4" : "\u56db",
            "5" : "\u4e94",
            "6" : "\u516d"
        };
        if(/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (a('FullYear') + "").substr(4 - RegExp.$1.length));
        }
        if(/(E+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[a('Day') + ""]);
        }
        for(var k in o) {
            if(new RegExp("("+ k +")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00"+ o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }

}

const moment = new Monent();
export default moment;