class TimeUtil{
    
    //h:m:s time:秒
    static getHMSTimeStr(time = 0){
        let h = Math.floor(time/3600);
        let m = Math.floor((time - h*3600)/60);
        let s = time - h*3600 - m*60;
        return `${h >= 10 ? h : '0'+h}:${m >= 10 ? m : '0'+m}:${s >= 10 ? s : '0'+s}`;
    }
    //m:s time:秒
    static getMSTimeStr(time = 0){
        let m = time/60;
        let s = time - m*60;
        return `${m >= 10 ? m : '0'+m}:${s >= 10 ? s : '0'+s}`;
    }
    
}