//自定义事件
class GameEvent extends egret.Event{
    constructor(type,data = null){
        super(type)
        this.data = data;
    }
    public data = null;
    static RESIZE_EVENT = "RESIZE_EVENT"
    //隐藏按钮
    static START_EVENT = "START_EVENT";
    

}