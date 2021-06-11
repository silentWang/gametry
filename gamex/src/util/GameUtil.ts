//游戏工具类
class GameUtil {
    private static toastSprite:egret.Sprite;
    //tips toast
    static showTips(str = "",time = 800){
        if(!str) return;
        if(!this.toastSprite){
            let shape = new egret.Shape();
            shape.graphics.beginFill(0x000000,0.7);
            shape.graphics.drawRoundRect(0,0,480,100,16);
            shape.graphics.endFill();
            let sprite = new egret.Sprite();
            sprite.x = SpriteUtil.stageCenterX - 225;
            sprite.y = SpriteUtil.stageCenterY - 160;
            sprite.addChild(shape);
            let txt = new egret.TextField();
            txt.text = str;
            txt.width = 480;
            txt.size = 32;
            txt.backgroundColor = 0x000000;
            txt.textAlign = "center";
            txt.name = "txtstr";
            txt.y = 50 - txt.height/2;
            sprite.addChild(txt);
            this.toastSprite = sprite;
        }
        egret.Tween.removeTweens(this.toastSprite);
        this.toastSprite.y = SpriteUtil.stageCenterY - 100;
        this.toastSprite.alpha = 0.01;
        this.toastSprite.getChildByName("txtstr")["text"] = str;
        Game.instance().addTop(this.toastSprite);
        let tween = egret.Tween.get(this.toastSprite).to({alpha:1},200);
        tween.wait(time);
        tween.to({alpha:0.01},400).call(()=>{
            egret.Tween.removeTweens(this.toastSprite);
            if(this.toastSprite && this.toastSprite.parent){
                this.toastSprite.parent.removeChild(this.toastSprite);
            }
        });
    }
    
    static flowIn(view:egret.DisplayObject){
        view.y = SpriteUtil.stageHeight;
        egret.Tween.get(view).to({y:SpriteUtil.stageHeight - view.height + 40}, 200).call(() => {
           egret.Tween.removeTweens(view);
        })
    }
    static flowOut(view:egret.DisplayObject,callback = null){
        egret.Tween.get(view).to({y:SpriteUtil.stageHeight}, 200).call(() => {
           egret.Tween.removeTweens(view);
           if(callback){
               callback();
           }
        })
    }
    //淡入淡出
    static fadeIn(view:egret.DisplayObject){
        view.alpha = 0;
        egret.Tween.get(view).to({alpha:1}, 200).call(() => {
           egret.Tween.removeTweens(view);
        })
    }
    static fadeOut(view,callback = null){
        let alpha = 0;
        egret.Tween.get(view).to({alpha}, 200).call(() => {
           egret.Tween.removeTweens(view);
           if(callback){
               callback();
           }
        })
    }
    //呼吸动画
    static playBreathAnim(spr,sobj,tobj,time = 800,times = 0){
        egret.Tween.removeTweens(spr);
        if(!sobj || !tobj) return;
        egret.Tween.get(spr).to(tobj,time).call(()=>{
            egret.Tween.get(spr).to(sobj,time).call(()=>{
                if(times == 0){
                    this.playBreathAnim(spr,sobj,tobj,time);
                }
                else{
                    egret.Tween.removeTweens(spr);
                }
            });
        });
    }
    //灰显滤镜 滤镜比较耗性能 注意合理使用
    private static grayFilter;
    static getGrayFilter(){
        if(!this.grayFilter){
            let colorMatrix = [
                0.3,0.6,0,0,0,
                0.3,0.6,0,0,0,
                0.3,0.6,0,0,0,
                0,0,0,1,0
            ];
            let colorFliter = new egret.ColorMatrixFilter(colorMatrix);
            this.grayFilter = colorFliter;
        }
        return [this.grayFilter];
    }
    //获取path
    static getURLPath(){
        let pathname = window.location.pathname;
        let path = pathname.substring(0,pathname.lastIndexOf("/")+1);
        return window.location.protocol + "//" + window.location.host + path;
    }
    //imgLoader加载同源图片
    static getDynamicImage(path = "",callback = null){
        let imgLoader = new egret.ImageLoader();
        imgLoader.crossOrigin = "anonymous";// 这个好像没什么用处，加不加都可以
        imgLoader.once(egret.Event.COMPLETE,function(evt: egret.Event){
            if(evt.currentTarget.data){
                // 创建一个容器
                let texture = new egret.Texture();
                texture.bitmapData = evt.currentTarget.data;
                let bitmap = new egret.Bitmap(texture);
                if(callback){
                    callback(bitmap);
                }
            }
        },this);
        imgLoader.once(egret.IOErrorEvent.IO_ERROR,function(evt: egret.IOErrorEvent){
            egret.log("加载头像失败");
            egret.log(evt);
        },this);
        imgLoader.load(path);
    }
    //url参数
    static getUrlValueByKey(key:string = ""){
        if(!key) return "";
        let url = window.location.href;
        let str = url.split("?")[1];
        let val = "";
        if(str){
            let arr = str.split("&");
            for(let qst of arr){
                if(qst.search(key) >= 0){
                    if(qst.search("=") >= 0){
                        val = qst.split("=")[1];
                    }
                    else{
                        val = "default";
                    }
                    break;
                }
            }
        }
        return val;
    }
}