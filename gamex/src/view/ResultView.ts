class ResultView extends BaseEuiView{
    constructor(){
        super();
        this.skinName = ResultViewSkin;
        this.openType = 1;
    }

    private image_eff:eui.Image;
    private group:eui.Group;
    protected childrenCreated(){
        super.childrenCreated();
        GameUtil.playBreathAnim(this.image_eff,{rotation:0},{rotation:-360},6000);
        this.touchEnabled = true;
        this.touchChildren = false;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,AppCenter.install,this);
        GameUtil.playBreathAnim(this.group,{scaleX:1,scaleY:1},{scaleX:1.2,scaleY:1.2},300);
    }

    protected resizeScene(){
        super.resizeScene();
    }

}