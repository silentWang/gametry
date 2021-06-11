//游戏model管理器
class GameModel {
    constructor(){
        this.refreshData();
    }
    private static _instance:GameModel;
    public static instance(){
        if(!this._instance){
            this._instance = new GameModel();
        }
        return this._instance;
    }

    private _isSelf;
    private _userData;

    public refreshData(){
        this._isSelf = true;
        this._userData = GameData.userData;
    }

    public get userData(){
        return this._userData;
    }

}