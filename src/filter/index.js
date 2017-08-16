export const timeFormat = (val, type) => {
    if(val == null) return ''
    if(!val) return '0000-00-00 00:00:00'
    var openDate = new Date();
    openDate.setTime(val*1000);
    var YY = openDate.getFullYear(); //获取完整的年份
    var MM = openDate.getMonth()+1; //获取当前月份
    var DD = openDate.getDate(); // 获取系统日，
    var hh = openDate.getHours(); //获取系统时，
    var mm = openDate.getMinutes(); //分
    var ss = openDate.getSeconds(); //秒
    var str = '';
    if(type == 1){//年月日
        str = YY+"-"+(MM<10?'0'+MM:MM)+"-"+(DD<10?'0'+DD:DD);
    }else if(type == 2){//时分秒
        str = (hh<10?'0'+hh:hh)+": "+(mm<10?'0'+mm:mm)+": "+(ss<10?'0'+ss:ss);
    }else{//完整时间
        str = YY+"-"+(MM<10?'0'+MM:MM)+"-"+(DD<10?'0'+DD:DD)+" "+(hh<10?'0'+hh:hh)+": "+(mm<10?'0'+mm:mm)+": "+(ss<10?'0'+ss:ss);
    }
    return str;
}