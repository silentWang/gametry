//用于动态加载动画mc
class GameLoader{
    constructor(){
        let urlloader = new egret.URLLoader();
        urlloader.addEventListener(egret.Event.COMPLETE,this.onLoadComplete,this);
        urlloader.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onIOError,this);
        let imageLoader:egret.ImageLoader = new egret.ImageLoader();
        imageLoader.addEventListener(egret.Event.COMPLETE, this.onLoadTextureComplete, this);
        imageLoader.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onImageIOError,this);
        this._urlLoader = urlloader;
        this._imageLoader = imageLoader;
    }
    //每次都new 一个实例
    public static newInstance(){
        let gloader = new GameLoader();
        return gloader;
    }

    private loaders:any;
    private _urlLoader:egret.URLLoader;
    private _imageLoader:egret.ImageLoader;
    private _key:String;
    private _callback:Function;
    //加载失败则重新加载(不能超过三次)
    private times = 0;
    private pngjson = {data:null,texture:null};

    public loaderMc(key,callback:Function){
        this._key = key;
        this._callback = callback
        let loader = this._urlLoader;
        let url = `${GameData.urlPath}resource/assets/animations/${this._key}.json`;
        loader.load(new egret.URLRequest(url));
    }

    private onLoadComplete(evt){
        this.times = 0;
        let loader:egret.URLLoader = <egret.URLLoader>evt.target;
        let data = JSON.parse(loader.data);
        this.pngjson.data = data;
        this._imageLoader.load(`${GameData.urlPath}resource/assets/animations/${this._key}.png`);
    }

    private onIOError(evt){
        this.times++;
        if(this.times > 3){
            this.destroy();
            return;
        }
        let loader = this._urlLoader;
        let url = `${GameData.urlPath}resource/assets/animations/${this._key}.json`;
        loader.load(new egret.URLRequest(url));
    }

    private onImageIOError(evt){
        this.times++;
        if(this.times > 3){
            this.destroy();
            return;
        }
        this._imageLoader.load(`${GameData.urlPath}resource/assets/animations/${this._key}.png`);
    }

    private onLoadTextureComplete(evt){
        let loader:egret.ImageLoader = <egret.ImageLoader>evt.target;
        //获取加载到的纹理对象
        var bitmapData:egret.BitmapData = loader.data;
        //创建纹理对象
        let texture = new egret.Texture();
        texture.bitmapData = bitmapData;
        this.pngjson.texture = texture;

        let mcFactory = new egret.MovieClipDataFactory(this.pngjson.data,this.pngjson.texture);
        let mc:egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData("mc"));
        if(this._callback){
            this._callback(mc);
        }
        this.destroy();
    }

    private destroy(){
        this._urlLoader.removeEventListener(egret.Event.COMPLETE,this.onLoadComplete,this);
        this._urlLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR,this.onIOError,this);
        this._imageLoader.removeEventListener(egret.Event.COMPLETE, this.onLoadTextureComplete, this);
        this._imageLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR,this.onImageIOError,this);
        this._callback = null;
        this._key = "";
        this._urlLoader = null;
        this._imageLoader = null;
        this.pngjson.data = null;
        this.pngjson.texture = null;
        this.pngjson = null;
    }

}