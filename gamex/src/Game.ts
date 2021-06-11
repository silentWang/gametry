class Game {
    private static _instance = null;
    static instance():Game{
        if(this._instance == null){
            this._instance = new Game();
        }
        return this._instance;
    }

    private _gameStage:egret.Stage;
    private _gameView:GameView;
    private _bottom:egret.DisplayObjectContainer;
    private _middle:egret.DisplayObjectContainer;
    private _top:egret.DisplayObjectContainer;
    private _gameDemo:GameDemo;
    private stageBg:egret.Bitmap;
    public setStage(stage:egret.Stage){
        this._gameStage = stage;
        SpriteUtil.stageWidth = stage.stageWidth;
        SpriteUtil.stageHeight = stage.stageHeight;
        SpriteUtil.stageCenterX = SpriteUtil.stageWidth/2;
        SpriteUtil.stageCenterY = SpriteUtil.stageHeight/2;
        GameData.urlPath = GameUtil.getURLPath();
        let bg = SpriteUtil.createImage("bg_jpg",false);
        bg.width = stage.stageWidth;
        bg.height = stage.stageHeight;
        stage.addChild(bg);
        this.stageBg = bg;
        
        this._bottom = new egret.DisplayObjectContainer();
        stage.addChild(this._bottom);
        this._middle = new egret.DisplayObjectContainer();
        stage.addChild(this._middle);
        this._top = new egret.DisplayObjectContainer();
        stage.addChild(this._top);
        this._gameView = new GameView();
        stage.addEventListener(egret.Event.RESIZE,this.setResize,this);
        this.setResize();
    }

    private setResize(){
        let isPortrait = this._gameStage.stageHeight >= this._gameStage.stageWidth;
        this.stageBg.width = this._gameStage.stageWidth;
        this.stageBg.height = this._gameStage.stageHeight;
        SpriteUtil.stageWidth = this._gameStage.stageWidth;
        SpriteUtil.stageHeight = this._gameStage.stageHeight;
        SpriteUtil.stageCenterX = SpriteUtil.stageWidth/2;
        SpriteUtil.stageCenterY = SpriteUtil.stageHeight/2;
        EventCenter.instance().dispatchEvent(new GameEvent(GameEvent.RESIZE_EVENT,{isPortrait}))
    }

    get gameStage(){
        return this._gameStage;
    }

    get gameView(){
        return this._gameView;
    }
    
    get gameDemo(){
        return this._gameDemo;
    }

    addBottom(display:egret.DisplayObject){
        if(this._bottom.contains(display)) return;
        this._bottom.addChild(display);
    }
    addMiddle(display:egret.DisplayObject){
        if(this._middle.contains(display)) return;
        this._middle.addChild(display);
    }
    addTop(display:egret.DisplayObject){
        if(this._top.contains(display)) return;
        this._top.addChild(display);
    }
    //
    gotoGame(){
        if(!this._gameDemo){
            this._gameDemo = new GameDemo();
            this.addBottom(this._gameDemo);
        }
        this._gameDemo.gotoGame();
        //url参数
        let materialid = GameUtil.getUrlValueByKey("materialid");
        if(materialid != ""){
            console.log(`来源id:${materialid}`);
        }
    }

}