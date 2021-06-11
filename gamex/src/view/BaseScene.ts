class BaseScene extends eui.Component implements eui.UIComponent{
	public constructor() {
		super();
		EventCenter.instance().addEventListener(GameEvent.RESIZE_EVENT,this.resizeScene,this);
	}

	protected _setSkin(ref:new () => eui.Skin){
		let skin = new ref();
		this.setSkin(skin)
		this.resizeScene();
	}

	private resizeScene(evt = null){
		this.setLayoutBoundsSize(Game.instance().gameStage.stageWidth,Game.instance().gameStage.stageHeight);
		if(evt){
			this.resizeContent(evt.data.isPortrait)
		}
	}

	protected resizeContent(portrait:boolean){

	}

}