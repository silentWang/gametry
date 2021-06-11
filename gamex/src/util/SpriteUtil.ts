class SpriteUtil {
    static stageWidth = 0;
    static stageHeight = 0;
    static stageCenterX = 0;
    static stageCenterY = 0;
    //key bitmap
    static createImage(reskey = "",anchorCenter = true){
        if(!reskey) return;
        let image = new egret.Bitmap(RES.getRes(reskey));
        if(anchorCenter){
            image.anchorOffsetX = image.width/2;
            image.anchorOffsetY = image.height/2;
        }
        image.touchEnabled = true;
        return image;
    }
    //通过image_json图集 创建bitmap
    static createSheetImage(reskey = "",anchorCenter = true){
        let image = new egret.Bitmap(RES.getRes(`actionImg_json#${reskey}`));
        if(anchorCenter){
            image.anchorOffsetX = image.width/2;
            image.anchorOffsetY = image.height/2;
        }
        image.touchEnabled = true;
        return image;
    }
    //创建矩形
    static createRect(width=this.stageWidth,height=this.stageHeight,roundx=0,roundy=0,bgcolor=0x000000) {
        let shape = new egret.Shape();
        shape.graphics.beginFill(bgcolor);
        shape.graphics.drawRoundRect(0, 0, width, height,roundx);
        shape.graphics.endFill();
        return shape;
    }
    //圆
    static createCircle(r = 10,color = 0xffffff){
        let shape = new egret.Shape();
        shape.graphics.beginFill(0x000000);
        shape.graphics.drawCircle(0, 0, r);
        shape.graphics.endFill();
        return shape;
    }
    //text
    static createText(str = "",size = 30,color=0xffffff,align="left",bold = false,stroke = 0,strokeColor = 0x000000){
        let text = new egret.TextField();
        text.text = str;
        text.size = size;
        text.textColor = color;
        text.bold = bold;
        text.stroke = stroke;
        text.strokeColor = strokeColor;
        text.textAlign = align;
        return text;
    }
    //已经装载到RES管理器的movieClip
    static createMovieClip(key,reskey,iscenter = true):egret.MovieClip{
        let data = RES.getRes(`${reskey}_json`);
        let png = RES.getRes(`${reskey}_png`);
        let mcFactory = new egret.MovieClipDataFactory(data,png);
        let mc:egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData(key));
        if(iscenter){
            mc.anchorOffsetX = mc.width/2;
            mc.anchorOffsetY = mc.height/2;
        }
        return mc;
    }

    //自定义按钮
    static createTextButton(width=240,height=80,text="按钮",size=34,textColor = 0xffffff,bgcolor=0xf24035,lineWidth = 0,lineColor=0xf24035){
        let btnspr = new egret.Sprite();
        btnspr.graphics.lineStyle(lineWidth,lineColor);
        btnspr.graphics.beginFill(bgcolor);
        btnspr.graphics.drawRoundRect(0,0,width,height,height,height);
        btnspr.graphics.endFill();
        let labtxt = SpriteUtil.createText(text,size);
        labtxt.width = width;
        labtxt.textColor = textColor;
        labtxt.textAlign = "center";
        labtxt.y = (height - labtxt.height)/2 + 2;
        btnspr.addChild(labtxt);
        btnspr.touchEnabled = true;
        btnspr.cacheAsBitmap = true;
        return btnspr;
    }
    //自定义渐变按钮
    static createLinearTextButton(width=240,height=80,text="按钮",size=34,textColor = 0xffffff,scolor = 0xFF9532,tcolor = 0xFC6630,lineWidth = 0,lineColor=0xf24035){
        let bg = new egret.Sprite();
        let xmatrix = new egret.Matrix();
        xmatrix.createGradientBox(width, height, 0, 0, 0);
        bg.graphics.lineStyle(lineWidth,lineColor);
        bg.graphics.beginGradientFill(egret.GradientType.LINEAR,[scolor,tcolor],[1,1],[50,255],xmatrix);
        bg.graphics.drawRoundRect(0,0,width,height,height);
        bg.graphics.endFill();
        let labtxt = SpriteUtil.createText(text,size);
        labtxt.width = width;
        labtxt.textColor = textColor;
        labtxt.textAlign = "center";
        labtxt.y = (height - labtxt.height)/2 + 2;
        bg.addChild(labtxt);
        bg.touchEnabled = true;
        bg.cacheAsBitmap = true;
        return bg;
    }
    
}