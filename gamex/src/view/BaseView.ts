class BaseView extends egret.Sprite{
    constructor(){
        super();
    }

    private blackBg:egret.Shape;
    protected isOpen = false;
    protected openType = 0;
    protected isNeedBg = true;

    open(data = null){
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
        }
        Game.instance().addMiddle(this.blackBg);
        Game.instance().addMiddle(this);
        if(this.openType == 1){
            GameUtil.fadeIn(this);
        }
        else if(this.openType == 2){
            GameUtil.flowIn(this);
        }
    }

    close(){
        this.isOpen = false;
        if(this.parent){
            this.parent.removeChild(this);
        }
        if(this.blackBg && this.blackBg.parent){
            this.blackBg.parent.removeChild(this.blackBg);
        }
    }

}