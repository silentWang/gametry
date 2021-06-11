class GameScene extends BaseScene{
	public constructor() {
		super();
		this._setSkin(GameSceneSkin);
		this.init();
	}

	private loadBtn:eui.Image;

	private init(){
		this.loadBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.loadApp,this);

		let image = new eui.Image();
		image.source = SourceUtil.sheet_main;
		this.addChild(image)
	}

	private loadApp(){
		AppCenter.install();
	}

	protected resizeContent(portrait:boolean){

	}
}