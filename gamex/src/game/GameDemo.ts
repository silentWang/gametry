class GameDemo extends egret.Sprite{
    constructor(){
        super();
        let view = new GameScene();
        this.addChild(view);
        view.width = Game.instance().gameStage.stageWidth/2 - view.width/2;
    }

    private model:GameModel;
    
    public gotoGame(){
        this.model = GameModel.instance();
    }

}