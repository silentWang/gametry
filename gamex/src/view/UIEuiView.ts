class UIEuiView extends BaseEuiView{
    constructor(){
        super();
        this.skinName = "resource/eui_skins/UIEuiSkin.exml";
    }

    private titleTxt:eui.Label;
    private effectImg:eui.Image;
    private button:eui.Image;
    private _data = null;
    protected init(){
        egret.Tween.get(this.effectImg,{loop:true}).to({rotation:360},5000);
        this.button.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);
        if(!this._data){
            this._data = {title:"我是初始化"};
        }
        this.x = SpriteUtil.stageCenterX - this.width/2;
        this.y = SpriteUtil.stageCenterY - this.height/2;
    }

    private touchHandler(){
        this._data = {title:"我被改变了"};
        this.refresh();
    }

    private refresh(){
        this.titleTxt.text = this._data.title;
    }

    public open(data = null){
        super.open();
        this._data = data;
        if(this.isCreated){
            this.refresh();
        }
    }
}