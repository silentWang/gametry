//eui view 基类
class BaseEuiView extends eui.Component{
    constructor(){
        super();
        this.addEventListener(egret.Event.COMPLETE,this.init,this);
    }
    
    private blackBg:egret.Shape;
    protected isOpen = false;
    protected openType = 0;
    protected isNeedBg = false;
    protected isCreated = false;
    //子类必须实现该方法
    protected init(){
        //皮肤解析成功
        this.isCreated = true;
    }

    public open(data = null){
        if(this.isOpen) return;
        this.isOpen = true;
        if(this.isNeedBg){
            if(!this.blackBg){
                this.blackBg = SpriteUtil.createRect();
                this.blackBg.alpha = 0.6;
                this.blackBg.touchEnabled = true;
                this.blackBg.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
                    this.close();
                },this);
            }
            Game.instance().addMiddle(this.blackBg);
        }
        Game.instance().addMiddle(this);
        if(this.openType == 1){
            GameUtil.fadeIn(this);
        }
        else if(this.openType == 2){
            GameUtil.flowIn(this);
        }
        EventCenter.instance().addEventListener(GameEvent.RESIZE_EVENT,this.resizeScene,this);
        this.resizeScene();
    }

    protected resizeScene(){
        this.width = egret.MainContext.instance.stage.stageWidth;
        this.height = egret.MainContext.instance.stage.stageHeight;
    }
    
    public close(){
        this.isOpen = false;
        if(this.parent){
            this.parent.removeChild(this);
        }
        if(this.blackBg && this.blackBg.parent){
            this.blackBg.parent.removeChild(this.blackBg);
        }
        EventCenter.instance().removeEventListener(GameEvent.RESIZE_EVENT,this.resizeScene,this);
    }

}