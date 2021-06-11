class GameDemo extends egret.Sprite{
    constructor(){
        super();
        // this.init();
        this.addEvent();

        let view = new GameScene();
        this.addChild(view);
        view.width = Game.instance().gameStage.stageWidth/2 - view.width/2;
    }

    private ratItems:Array<RatItem>;
    private model:GameModel;
    private timer:egret.Timer;
    private scoreTxt:egret.TextField;
    private startBtn:egret.Sprite;
    private init(){
        let txt = SpriteUtil.createText("分数\n0",120,0xffff00,"center",true,5,0x555555);
        txt.width = SpriteUtil.stageWidth;
        txt.y = 60;
        txt.lineSpacing = 20;
        this.addChild(txt);
        this.scoreTxt = txt;

        let btn = new egret.Sprite();
        let btnimg = SpriteUtil.createSheetImage("bigbtn",false);
        let label = SpriteUtil.createText("START",68,0xffffff,"center",true);
        label.width = btnimg.width;
        label.y = 20;
        btn.addChild(btnimg);
        btn.addChild(label);
        btn.x = SpriteUtil.stageCenterX - btnimg.width/2;
        btn.y = SpriteUtil.stageHeight - btnimg.height - 50;
        this.addChild(btn);
        btn.touchChildren = false;
        btn.touchEnabled = true;
        btn.visible = false;
        btn.name = "startBtn";
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);
        this.startBtn = btn;

        let bit1 = SpriteUtil.createSheetImage("sunsmile");
        bit1.x = SpriteUtil.stageCenterX - 220;
        bit1.y = btn.y + 50;
        this.addChild(bit1);
        bit1.name = "leftbtn";
        bit1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);
        let bit2 = SpriteUtil.createSheetImage("sunsmile");
        bit2.x = SpriteUtil.stageCenterX + 220;
        bit2.y = bit1.y;
        this.addChild(bit2);
        bit2.name = "rightbtn";
        bit2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);

        this.createList();
        let tm = new egret.Timer(1000);
        tm.addEventListener(egret.TimerEvent.TIMER,this.timerHandler,this);
        this.timer = tm;
    }

    private addEvent(){
        EventCenter.instance().addEventListener(GameEvent.START_EVENT,this.hideBtn,this);
    }

    private createList(){
        let arr = [];
        let sprite = new egret.Sprite();
        for(let i = 0;i < 9;i++){
            let item = new RatItem();
            item.x = item.width/2 + (i%3)*250;
            item.y = 250 * (~~(i/3));
            sprite.addChild(item);
            arr.push(item);
        }
        sprite.x = SpriteUtil.stageCenterX - sprite.width/2;
        sprite.y = SpriteUtil.stageCenterY - 160;
        this.addChild(sprite);
        this.ratItems = arr;
        sprite.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);
    }

    private touchHandler(evt:egret.TouchEvent){
        let name = evt.target.name;
        if(name == "startBtn"){
            this.timer.start();
            this.startBtn.visible = false;
        }
        else if(name == "leftbtn"){
            Game.instance().gameView.showUIBViewView();
        }
        else if(name == "rightbtn"){
            Game.instance().gameView.showUIEuiView();
        }
        else{
            let item = evt.target as RatItem;
            if(item instanceof RatItem){
                item.hitIt();
                this.scoreTxt.text = `分数\n${GameData.userData.score}`;
            }
        }
    }

    private hideBtn(evt:GameEvent){
        let show = evt.data.show;
        // this.startBtn.visible = show;
    }

    private timerHandler(evt:egret.TimerEvent){
        let idx = ~~(this.ratItems.length * Math.random());
        this.ratItems[idx].show();
    }
    
    public gotoGame(){
        this.model = GameModel.instance();
    }

}