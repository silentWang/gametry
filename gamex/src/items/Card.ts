class Card extends eui.Component implements eui.UIComponent{
    constructor(){
        super();
        this.skinName = CardSkin;
    }

    private txt_num:eui.Label;
    private img_a:eui.Image;
    private img_b:eui.Image;
    private img_k:eui.Image;
    private grp_card:eui.Group;
    private grp_alpha:eui.Group;
    private grp_eff:eui.Group;
    private hand:eui.Image;
    private img_eff:eui.Image;
    private _isHand = false;
    private _num:number;
    private _type:number;

    protected childrenCreated(){
        super.childrenCreated();
        this.touchChildren = false;
        this.img_eff.visible = false;
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);
    }

    private touchHandler(evt:egret.TouchEvent){
        if(!this._isHand) return;
        GameSound.instance().playH5Audio(SourceUtil.audioClick)
        this.setHand(false);
        EventCenter.instance().dispatchEvent(new GameEvent(GameEvent.CLICK_ITEM,{item:this}));
    }

    public get num(){
        return this._num;
    }

    public get type(){
        return this._type;
    }

    public setData(num,type = 1){
        this._num = num;
        this._type = type;
        this.hand.visible = false;
        if(num < 0){
            this.grp_alpha.visible = true;
            this.grp_card.visible = false;
            return;
        }
        this.grp_alpha.visible = false;
        this.grp_card.visible = true;
        if(num > 10 || num == 0){
            if(num > 10){
                this.img_k.source = this.getNameByType(num,type);
            }
            else if(num == 0){
                this.img_k.source = "sheet_json.paibei_01@3x";
            }
            this.img_k.visible = true;
            return;
        }
        this.img_k.visible = false;
        this.txt_num.text = num == 1 ? "A" : num;
        this.txt_num.textColor = type%2 == 0 ? 0xff0000:0x00000;
        let hb = "";
        let hs = "";
        if(type == 1){
            hb = "sheet_json.fengge1_heitao_big@3x";
            hs = "sheet_json.fengge1_heitao_small@3x";
        }
        else if(type == 2){
            hb = "sheet_json.fengge1_hongtao_big@3x";
            hs = "sheet_json.fengge1_hongtao_samll@3x";
        }
        else if(type == 3){
            hb = "sheet_json.fengge1_meihua_big@3x";
            hs = "sheet_json.fengge1_meihua_samll@3x";
        }
        else if(type == 4){
            hb = "sheet_json.fengge1_fangkuai_big@3x";
            hs = "sheet_json.fengge1_fangkuai_samll@3x";
        }
        this.img_a.source = hs;
        this.img_b.source = hb;
    }

    private getNameByType(num,type){
        let name = ""
        let hs = num == 13 ? "k" : (num == 12 ? "Q" : "J");
        if(hs == "k" && type == 2){
            name = "sheet_json.FG2_HONGTAO_K@3x";
        }
        else if(type == 1){
            name = `sheet_json.fg2_heitao_${hs}@3x`;
        }
        else if(type == 2){
            name = `sheet_json.fg2_hongtao_${hs}@3x`;
        }
        else if(type == 3){
            name = `sheet_json.fg2_meihua_${hs}@3x`;
        }
        else if(type == 4){
            name = `sheet_json.fg2_fangkuai_${hs}@3x`;
        }
        return name;
    }

    public setHand(bool = true){
        this.hand.visible = bool;
        egret.Tween.removeTweens(this.hand);
        egret.Tween.removeTweens(this.img_eff);
        this.img_eff.visible = false;
        if(bool){
            GameUtil.playBreathAnim(this.hand,{y:40},{y:60},250);
            this.img_eff.visible = true;
            GameUtil.playBreathAnim(this.img_eff,{alpha:1},{alpha:0.5},200);
        }
        this._isHand = bool;
    }

    public get isHand(){
        return this._isHand;
    }

    private starPools = [];
    public playEff(){
        let index= 0;
        let idx = egret.setInterval(()=>{
			this.createStarEff(this.grp_eff);
            index++;
            if(index >= 10){
                egret.clearInterval(idx);
            }
		},this,5);
        this.img_eff.visible = true;
        this.img_eff.alpha = 0;
        egret.Tween.get(this.img_eff).to({alpha:1},100).wait(200).to({alpha:0},300).call(()=>{
            this.img_eff.visible = false;
            egret.Tween.removeTweens(this.img_eff);
        });
    }

    public createStarEff(grp){
        let r = 50 + Math.ceil(100*Math.random());
		let star = this.getPools();
		let angle = 2*Math.PI*Math.random();
		let sx = r*Math.cos(angle) - Math.sin(angle);
		let sy = Math.cos(angle) + r*Math.sin(angle);
		let scale = 0.5 + Math.random();
        let rotation = -180 + 360*Math.random();
		grp.addChild(star);
		star.alpha = 0.01;
		egret.Tween.get(star).to({x:sx,y:sy,scaleX:scale,scaleY:scale,alpha:0.8 + 0.2*Math.random(),rotation},400,egret.Ease.circOut).to({scaleX:0.01,scaleY:0.01,alpha:0},100,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(star);
			if(star.parent){
				star.parent.removeChild(star);
			}
			star.alpha = 1;
		});
	}

    private getPools(){
		if(!this.starPools){
			this.starPools = [];
		}
		if(this.starPools.length > 0){
			for(let star of this.starPools){
				if(!star.parent){
					star.x = 0;
					star.y = 0;
					return star;
				} 
			}
		}
		let star = new eui.Image();
		star.source = "sheet_json.guang@3x(1)";
        star.width = 62;
        star.height = 62;
		star.anchorOffsetX = 31;
		star.anchorOffsetY = 31;
		star.x = 0;
		star.y = 0;
		this.starPools.push(star);
		return star;
	}

}