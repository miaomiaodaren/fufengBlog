class Monent {
    constructor(timer) {
        const self = this;
        this.NowTime = timer || new Date;
    }
        
    each(obj, cb) {
        if(!obj) return [];
        const length = obj.length;
        if(Object.prototype.toString.call(obj) === '[object Array]') {
            for(let i = 0; i < length; i++) {
                cb(obj[i]);
            }
        } else  {
            let keys = Object.keys(obj), resole= [];
            for(let i = 0; i < length; i++) {
                cb(keys[i]);
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

    //yyyy:MM:dd HH:mm:ss
    formart(fmt, timer) {
        let a = timer ? this.getoftype.bind(timer) : this.getoftype.bind(this.NowTime);
        var o = {
            "M+" : a('Month') + 1, //月份
            "d+" : a('Date'), //日
            "h+" : a('Hours') % 12 == 0 ? 12 : a('Hours') % 12, //小时
            "H+" : a('Hours'), //小时
            "m+" : a('Minutes'), //分
            "s+" : a('Seconds'), //秒
            "q+" : Math.floor((a('Month') + 3) / 3), //季度
            "S"  : a('Milliseconds') //毫秒
        };
        var week = {
            "0" : "/u65e5",
            "1" : "/u4e00",
            "2" : "/u4e8c",
            "3" : "/u4e09",
            "4" : "/u56db",
            "5" : "/u4e94",
            "6" : "/u516d"
        };
        if(/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (a('FullYear') + "").substr(4 - RegExp.$1.length));
        }
        if(/(E+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[a('Day') + ""]);
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