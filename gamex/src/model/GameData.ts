class GameData {
    constructor(){}
    //自我维护的版本 (主要用于一些更新说明)
    static GAME_VERSION = "1.1.1";
    //
    static urlPath = "";
    //app版和本地测试版
    static isLocal = true;
    //是否是测试版
    static isTestMode = false;
    //IP
    static IP = "";//v2
    static IP_V3 = "";//v3
    //基础信息包括 token等
    static baseData;
    //userdata
    static userData;
    //配置信息
    static gameConfig = [];

}