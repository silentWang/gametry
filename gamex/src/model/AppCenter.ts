//sdk
class AppCenter{
    constructor(){}
    //andorid 还是 ios
    static isAndroidOrIos(){
        if(GameData.isLocal) return 0;
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if(isAndroid) return 1;
        if(isiOS) return 2;
        return 0; 
    }
    //是否是iphonex
    static isIphoneX(){
        var u = navigator.userAgent;
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isIOS) {        
            if (screen.height == 812 && screen.width == 375){
                return true;
            }else{
                return false;
            } 
        }
    }
    //是否是乐视手机
    static isLeShiPhone(){
        var u = navigator.userAgent;
        var isSBLeshi = !!u.match(/(Le|Letv) X(\d)+/);
        if (isSBLeshi) {       
            return true;
        }
        return false;
    }
    /**下载安装 */
    static install(){
        window["install"] && window["install"]();
        console.log("install")
    }
    /**开始游戏入口 */
    static gameStart(func:Function){
        window["gameStart"] = func;
    }
    /**结束游戏处理 */
    static gameClose(func:Function){
        window["gameClose"] = func;
    }
    /**重新试玩 */
    static gameRetry(){
        window["gameRetry"] && window["gameRetry"]();
    }
    /**游戏结束 */
    static gameEnd(){
        window["gameEnd"] && window["gameEnd"]();
    }
    
}