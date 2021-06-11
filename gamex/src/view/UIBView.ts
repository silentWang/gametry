class UIBView extends BaseView{
    constructor(){
        super();
        this.init();
    }

    private _title:egret.TextField;
    private _data = null;
    private init(){
        let uibg = SpriteUtil.createImage("uibg_png",false);
        uibg.x = SpriteUtil.stageCenterX - uibg.width/2;
        uibg.y = SpriteUtil.stageCenterY - uibg.height/2;
        this.addChild(uibg);

        let title = SpriteUtil.createText("标题",30,0x00ff00,"center",true);
        title.width = uibg.width;
        title.x = uibg.x;
        title.y = uibg.y + 60;
        this.addChild(title);
        this._title = title;
        
        let effect = SpriteUtil.createSheetImage("effect");
        effect.scaleX = 0.8;
        effect.scaleY = 0.8;
        effect.x = SpriteUtil.stageCenterX;
        effect.y = SpriteUtil.stageCenterY - 30;
        this.addChild(effect);
        egret.Tween.get(effect,{loop:true}).to({rotation:360},5000);

        let img = SpriteUtil.createSheetImage("mostlevel");
        img.x = effect.x;
        img.y = effect.y;
        img.scaleX = 0.8;
        img.scaleY = 0.8;
        this.addChild(img);

        let btn = new egret.Sprite();
        let btnimg = SpriteUtil.createSheetImage("bigbtn",false);
        let label = SpriteUtil.createText("确定",30,0xffffff,"center",true);
        label.width = btnimg.width;
        label.y = 34;
        btn.addChild(btnimg);
        btn.addChild(label);
        btn.x = SpriteUtil.stageCenterX - btnimg.width/2;
        btn.y = uibg.y + uibg.height - btnimg.height - 30;
        this.addChild(btn);
        btn.touchChildren = false;
        btn.touchEnabled = true;
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);
    }

    private touchHandler(evt:egret.TouchEvent){
        this._data = {title:"我被改变了"};
        this.refresh();
    }

    private refresh(){
        if(!this._data){
            this._data = {title:"这是初始化打开的"};
        }
        this._title.text = this._data.title;
    }

    public open(data = null){
        super.open();
        this._data = data;
        this.refresh();
    }
}