class RatItem extends egret.Sprite{
    constructor(){
        super();
        this.init();
    }

    private rat:egret.Bitmap;
    private heamer:egret.Bitmap;
    private isShow = false;
    private init(){
        let blank = SpriteUtil.createCircle(100,0x000000);
        let full = SpriteUtil.createSheetImage("mouse");
        let mask = SpriteUtil.createRect(210,180);
        full.y = 150;
        this.addChild(blank)
        this.addChild(full);
        this.addChild(mask);

        let hm = SpriteUtil.createSheetImage("hg");
        hm.y = -50;
        this.addChild(hm);
        this.heamer = hm;
        hm.visible = false;

        mask.x = -blank.width/2;
        mask.y = 50 - mask.height;
        full.mask = mask;
        this.rat = full;
        this.touchChildren = false;
        this.touchEnabled = true;
    }

    public show(){
        if(this.isShow) return;
        this.isShow = true;
        this.rat.y = 150;
        egret.Tween.removeTweens(this.rat);
        egret.Tween.get(this.rat).to({y:0},300);
        let idx = egret.setTimeout(()=>{
            egret.clearTimeout(idx);
            if(this.isShow){
                egret.Tween.get(this.rat).to({y:150},300).call(()=>{
                    this.isShow = false;
                    egret.Tween.removeTweens(this.rat);
                });
            }
        },this,2000);
    }

    public hitIt(){
        if(!this.isShow) return;
        this.heamer.visible = true;
        this.heamer.rotation = 0;
        GameData.userData.score++;
        GameSound.instance().playSound();
        egret.Tween.get(this.heamer).to({rotation:-90},200).call(()=>{
            this.isShow = false;
            egret.Tween.removeTweens(this.heamer);
            this.heamer.visible = false;
            egret.Tween.removeTweens(this.rat);
            this.rat.y = 150;
        });

        GameLoader.newInstance().loaderMc("bombeff",(mc:egret.MovieClip)=>{
            mc.x = -80;
            mc.y = -90;
            this.addChild(mc);
            mc.addEventListener(egret.Event.COMPLETE,()=>{
                if(mc.parent){
                    mc.parent.removeChild(mc);
                }
                mc.stop();
                mc = null;
            },this);
            mc.play(1);
        });
    }

}