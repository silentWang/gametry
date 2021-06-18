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
    private sbgWid = 1000;
    private sbgHgt = 1000;
    public setStage(stage:egret.Stage){
        this._gameStage = stage;
        SpriteUtil.stageWidth = stage.stageWidth;
        SpriteUtil.stageHeight = stage.stageHeight;
        SpriteUtil.stageCenterX = SpriteUtil.stageWidth/2;
        SpriteUtil.stageCenterY = SpriteUtil.stageHeight/2;
        GameData.urlPath = GameUtil.getURLPath();
        // let bg = SpriteUtil.createImage("bg_jpg",false);
        let bg = new eui.Image();
        bg.source = SourceUtil.imageBg;
        stage.addChild(bg);
        this.stageBg = bg;
        // this.sbgWid = bg.width;
        // this.sbgHgt = bg.height;
        
        this._bottom = new egret.DisplayObjectContainer();
        stage.addChild(this._bottom);
        this._middle = new egret.DisplayObjectContainer();
        stage.addChild(this._middle);
        this._top = new egret.DisplayObjectContainer();
        stage.addChild(this._top);
        this._gameView = new GameView();
        stage.addEventListener(egret.Event.RESIZE,this.setResize,this);
        stage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);
        this.setResize();
    }

    private setResize(){
        let isPortrait = this._gameStage.stageHeight >= this._gameStage.stageWidth;
        this.gameStage.scaleMode = isPortrait ? egret.StageScaleMode.FIXED_WIDTH : egret.StageScaleMode.FIXED_HEIGHT;
        this.stageBg.width = this.sbgWid <= this._gameStage.stageWidth ? this._gameStage.stageWidth : this.sbgWid;
        this.stageBg.height = this.sbgWid <= this._gameStage.stageHeight ? this._gameStage.stageHeight : this.sbgWid;
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
    }
    
    private touchHandler(){
        GameSound.instance().playH5Music(SourceUtil.audiobg);
        this._gameStage.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);
    }
    
}