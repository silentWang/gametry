//声音管理器
class GameSound{
    constructor(){
    }

    private static _instance:GameSound = null;
    public static instance(){
        if(this._instance == null){
            this._instance = new GameSound();
        }
        return this._instance;
    }

    private audio_url = 'resource/audio/';
    private soundVec;
    playSound(type = 1){
        // if(!SUtil.isCanPlay) return;
        if(this.soundVec && this.soundVec[type]){
            this.soundVec[type].play(0,1);
            return;
        }
        let resName = "";
        if(type == 1){
            resName = this.audio_url+"hit.mp3";
        }
        try{
            //sb 乐视手机单独处理 报错decode error
            if(AppCenter.isLeShiPhone()){
                let sound = document.createElement("audio");
                sound.src = "../"+resName;
                document.body.appendChild(sound);
                sound.play();
                if(!this.soundVec){
                    this.soundVec = {};
                    this.soundVec[type] = sound;
                }
                else{
                    this.soundVec[type] = sound;
                }
            }
            else{
                let sound:egret.Sound = new egret.Sound();
                sound.addEventListener(egret.Event.COMPLETE,(event:egret.Event)=>{
                    try{
                        if(!this.soundVec){
                            this.soundVec = {};
                            this.soundVec[type] = sound;
                        }
                        else{
                            this.soundVec[type] = sound;
                        }
                        sound.play(0,1);
                    }
                    catch(e){
                        console.log(e);
                    }
                }, this);
                sound.addEventListener(egret.IOErrorEvent.IO_ERROR, function loadError(event:egret.IOErrorEvent) {
                    console.log("loaded error!");
                }, this);
                sound.load(resName);
            }
        }
        catch(e){
            console.log(e);
        }
    }

}