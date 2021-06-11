//事件派发中心
class EventCenter extends egret.EventDispatcher{
    constructor(){
        super();
    }

    private static _instance = null;
    public static instance():EventCenter{
        if(this._instance == null){
            this._instance = new EventCenter();
        }
        return this._instance;
    }

}