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
            let bool = false;
            for(let key in sobj){
                if(sobj[key] == spr[key]){
                    bool = true;
                }
            }
            let obj = bool ? tobj : sobj;
            egret.Tween.get(spr).to(obj,time).call(()=>{
                if(times == 0){
                    this.playBreathAnim(spr,sobj,tobj,time);
                }
                else{
                    egret.Tween.removeTweens(spr);
                }
            });
        });
    }
    /**下落特效 */
    static playFollowDownEff(count = 50){
        let grp = new eui.Group();
        Game.instance().addTop(grp);
        grp.x = Game.instance().gameStage.stageWidth/2;
        grp.y = Game.instance().gameStage.stageHeight/2;
        let index = 0;
        let idx = egret.setInterval(()=>{
            let img = new eui.Image();
            img.source = "sheet_json.pp @3x";
            let x0 = 0;
            let y0 = 0;
            let x1 = 300 + Math.floor(300*Math.random());
            let y1 = y0;
            let angle = -Math.PI*Math.random();
            let sx = (x1-x0)*Math.cos(angle) - (y1-y0)*Math.sin(angle) + x0;
            let sy = (y1-y0)*Math.cos(angle) + (x1-x0)*Math.sin(angle) + y0;
            let scale = 0.8 + Math.random();
            grp.addChild(img);
            if(index == count - 1){
                egret.clearInterval(idx)
                egret.Tween.get(img).to({x:sx,y:sy},300,egret.Ease.sineOut).call(()=>{
                    egret.Tween.removeTweens(img);
                    egret.setTimeout(()=>{
                        egret.Tween.get(img).to({y:1000},800).call(()=>{
                            grp.removeChildren();
                            if(grp.parent){
                                grp.parent.removeChild(grp);
                            }
                        })
                    },this,0);
                });
            }
            else{
                egret.Tween.get(img).to({x:sx,y:sy},300,egret.Ease.sineOut).call(()=>{
                    egret.setTimeout(()=>{
                        egret.Tween.get(img).to({y:1000},800,egret.Ease.cubicIn)
                    },this,0);
                });
            }
            index++;
        },this,10);
    }
    /**循环 */
    // static playLoopAnim(spr,sobj,tobj,time = 800){
    //     egret.Tween.removeTweens(spr);
    //     if(!sobj || !tobj) return;
    //     egret.Tween.get(spr).to(tobj,time).call(()=>{
    //         egret.Tween.get(spr).to(sobj,time).call(()=>{
    //             if(times == 0){
    //                 this.playBreathAnim(spr,sobj,tobj,time);
    //             }
    //             else{
    //                 egret.Tween.removeTweens(spr);
    //             }
    //         });
    //     });
    // }

    static randomNumToText(txt:eui.Label,start = 0,tnum:number = 9999,forv = ""){
        let num = 1;
        let idx = egret.setInterval(()=>{
            start += num;
            num++;
            if(start >= tnum){
                start = tnum;
                egret.clearInterval(idx);
            }
            txt.text = `${forv}${(start/100).toFixed(2)}`;
        },this,10);
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

    /**喷射效果 */
    static playFirePieces(r = 100,count = 50,angleMin = 0,angleMax = 360,x = SpriteUtil.stageCenterX,y = SpriteUtil.stageCenterY){
        let grp = new eui.Group();
        grp.x = x;
        grp.y = y;
        Game.instance().addTop(grp);
        let index = 0;
        let idx = egret.setInterval(()=>{
            let img = new eui.Image();
            img.source = `sheet_json.fp${1 + Math.floor(5*Math.random())}`;
            grp.addChild(img);
            img.width = 64;
            img.height = 64;
            img.anchorOffsetX = 32;
            img.anchorOffsetY = 32;
            img.alpha = 0.8 + 0.2*Math.random();
            let scale = 0.2 + 0.8*Math.random();
            let nscale = 0.8 + 0.8*Math.random();
            img.scaleX = nscale;
            img.scaleY = nscale;
            let angle = angleMin/180*Math.PI + (angleMax - angleMin)/180*Math.PI*Math.random();
            r + r/2 + r/2 * Math.random();
            let sx = r*Math.cos(angle) - Math.sin(angle);
            let sy = Math.cos(angle) + r*Math.sin(angle);
            let srotate = 360 + 2*360*Math.random();
            let trotate = 360 + 2*360*Math.random();
            let yy = 50*Math.random();
            let falpha = 0.2 + 0.5*Math.random();
            let alpha = 0;
            let ax = 200 * Math.random();
            ax = sx < 0 ? sx - ax : sx + ax;
            grp.addChild(img);
            let obj1 = {x:sx,y:sy,rotation:srotate,alpha:falpha,scaleX:scale,scaleY:scale};
            let obj2 = {x:ax,y:yy,rotation:trotate,alpha,scaleX:0.01,scaleY:0.01};
            if(index == count - 1){
                egret.clearInterval(idx)
                egret.Tween.get(img).to(obj1,400,egret.Ease.sineOut).to(obj2,500).call(()=>{
                    egret.Tween.removeTweens(img);
                    grp.removeChildren();
                    if(grp.parent){
                        grp.parent.removeChild(grp);
                    }
                });
            }
            else{
                egret.Tween.get(img).to(obj1,400,egret.Ease.sineOut).to(obj2,500);
            }
            index++;
        },this,10);
    }
}