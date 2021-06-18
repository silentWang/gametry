class GameData {
    constructor(){}
    //自我维护的版本 (主要用于一些更新说明)
    static GAME_VERSION = "1.1.1";
    //
    static urlPath = "";
    /**发布一体版 */
    static isPublish = false;
    /**1一步 2三步 0直接 */
    static stepTryType = 1;
    //app版和本地测试版
    static isLocal = true;
    //userdata
    static userData;

}