class GameScene extends BaseScene{
	public constructor() {
		super();
		this._setSkin(GameSceneSkin);
	}

	private grp_coin:eui.Group;
	private img_progress:eui.Image;
	private rect_mask:eui.Rect;
	private txt1:eui.Label;
	private txt2:eui.Label;
	private txt3:eui.Label;

	private img_star1:eui.Image;
	private img_star2:eui.Image;
	private img_star3:eui.Image;
	private img_star4:eui.Image;
	private img_star5:eui.Image;

	private card0:Card;
	private card1:Card;
	private card2:Card;
	private card3:Card;
	private card4:Card;
	private card5:Card;
	private card6:Card;
	private card7:Card;
	private card8:Card;
	private card9:Card;
	private card10:Card;
	private card11:Card;
	private card12:Card;
	private grp_download:eui.Group;
	private downGrp:eui.Group;
	private xgrps:eui.Group[];
	private dragFlag = false;
	private rollGrp:eui.Group;
	private dataArr = [];
	private starsArr:eui.Image[];
	private curStarIndex = 0;

	protected childrenCreated(){
		super.childrenCreated();
		this.img_progress.mask = this.rect_mask;
		this.grp_coin.visible = false;
		EventCenter.instance().addEventListener(GameEvent.CLICK_ITEM,this.clickItem,this);
		this.initData();
		this.init();
		this.grp_download.addEventListener(egret.TouchEvent.TOUCH_TAP,AppCenter.install,this);
		GameUtil.playBreathAnim(this.downGrp,{scaleX:1,scaleY:1},{scaleX:1.2,scaleY:1.2},300);
		let arr = [];
		for(let i = 1;i <= 5;i++){
			arr.push(this[`img_star${i}`]);
		}
		this.starsArr = arr;
	}

	private initData(){
		let arr = [];
		if(GameData.stepTryType == 0){
			let arr0 = [13,3,12,2,11,1];
			let arr1 = [13,1,12,4,11,3,10,4,9,1,8,4,7,1];
			let arr2 = [13,2,12,1,11,2,10,1,9,4,8,3];
			let arr3 = [9,3,8,2];
			let arr4 = [13,4,12,3,11,4,10,3,9,2,8,1,7,4];
			let arr5 = [10,2];
			arr = [arr0,arr1,arr2,arr3,arr4,arr5];
			Game.instance().gameStage.addEventListener(egret.TouchEvent.TOUCH_TAP,AppCenter.install,this);
		}
		else if(GameData.stepTryType == 1){
			let arr0 = [13,3,12,2,11,1];
			let arr1 = [13,1,12,4,11,3,10,4,9,1,8,4,7,1];
			let arr2 = [13,2,12,1,11,2,10,1,9,4,8,3];
			let arr3 = [9,3,8,2];
			let arr4 = [13,4,12,3,11,4,10,3,9,2,8,1,7,4];
			let arr5 = [10,2];
			arr = [arr0,arr1,arr2,arr3,arr4,arr5];
		}
		else if(GameData.stepTryType == 2){
			let arr0 = [13,3,12,2];
			let arr1 = [13,1,12,4,11,3,10,4,9,1,8,4,7,1];
			let arr2 = [13,2,12,1,11,2,10,1,9,4,8,3];
			let arr3 = [9,3];
			let arr4 = [13,4,12,3,11,4,10,3,9,2,8,1,7,4];
			let arr5 = [0,1,0,1,7,3];
			arr = [arr0,arr1,arr2,arr3,arr4,arr5];
		}
		this.dataArr = arr;
	}

	private init(){
		this.card0.setData(6,1);
		this.card1.setData(6,2);
		this.card2.setData(6,3);
		this.card3.setData(7,4);
		this.card4.setData(0,1);
		this.card5.setData(-1,1);

		this.card6.setData(-1,1);
		this.card7.setData(-1,1);
		this.card8.setData(-1,1);
		this.card9.setData(-1,1);
		this.card10.setData(-1,1);
		this.card11.setData(-1,1);
		this.card12.setData(-1,1);

		this.initGrp();
		this.rollGrp = new eui.Group;
		if(GameData.stepTryType == 1){
			(this.xgrps[5].getChildAt(this.xgrps[5].numChildren - 1) as Card).setHand(true);
			this.card2.setData(7,3);
		}
		else if(GameData.stepTryType == 2){
			this.card4.setHand(true);
		}
		// this.xgrp.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchHandler,this);
		// this.addEventListener(egret.TouchEvent.TOUCH_END,this.touchHandler,this);
		// this.xgrp.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchHandler,this);
	}
	
	private initGrp(){
		if(!this.xgrps) this.xgrps = [];
		for(let i = 0;i < 7;i++){
			this.xgrps.push(this["xgrp" + i]);
		}
		let arr = this.dataArr;
		for(let i = 0;i < arr.length;i++){
			let items = arr[i];
			let len = items.length;
			for(let j = 0;j < len;j += 2){
				let item = new Card();
				item.setData(items[j],items[j + 1]);
				item.x = 0;
				item.y = (j/2)*60;
				this.xgrps[i].addChild(item);
			}
		}
	}

	private clickItem(evt:GameEvent){
		let data = evt.data;
		let item = data.item as Card;
		if(!item) return;
		if(item == this.card4){ 
			this.card5.scaleX = 0;
			this.card5.visible = true;
			this.card5.setData(11,1);
			this.card4.setData(-1);
			egret.Tween.get(this.card5).to({scaleX:1},100,egret.Ease.cubicOut).call(()=>{
				this.card5.setHand(true);
			})
			this.curStarIndex++;
		}
		else if(item == this.card5){
			this.moveToGrp(item,this.xgrps[0]).then(()=>{
				let grp = this.xgrps[5];
				let mitem = grp.getChildAt(grp.numChildren - 1) as Card;
				mitem.setHand(true);
			});
			this.curStarIndex++;
		}
		else if(item.parent == this.xgrps[5]){
			this.curStarIndex++;
			if(item.num == 7){
				this.moveToCard(item,this.card2).then(()=>{
					let grp = this.xgrps[5];
					let len = grp.numChildren;
					let mitem = grp.getChildAt(grp.numChildren - 1) as Card;
					if(len == 2){
						mitem.setData(10,2);
					}
					mitem.setHand(true);
				});
			}
			else if(item.num == 10){
				this.moveToGrp(item,this.xgrps[0],true).then(()=>{
					let grp = this.xgrps[5];
					if(grp.numChildren > 0){
						let mitem = grp.getChildAt(grp.numChildren - 1) as Card;
						mitem.setData(8,2);
					}
					this.playSuccess();
					this.curStarIndex++;
					egret.Tween.get(this.rect_mask).to({width:this.curStarIndex*630/5},200);
					this.starsArr[this.curStarIndex - 1].source = "sheet_json.star1@2x";
				});
			}
		}
		egret.Tween.get(this.rect_mask).to({width:this.curStarIndex*630/5},200);
		this.starsArr[this.curStarIndex - 1].source = "sheet_json.star1@2x";
		let tnum = Math.ceil(this.curStarIndex * 9999/4);
		let start = isNaN(parseInt(this.txt1.text.slice(1))) ? 0 : parseInt(this.txt1.text.slice(1));
		GameUtil.randomNumToText(this.txt1,start*100,tnum,"$");
		GameUtil.randomNumToText(this.txt2,start*100,tnum,"$");
	}
	
	private moveToGrp(item,grp,remove = false){
		return new Promise((resolve,reject) => {
			let pt1 = item.parent.localToGlobal(item.x,item.y);
			let num = grp.numChildren;
			let pt2 = grp.parent.localToGlobal(grp.x,grp.y);
			let card = new Card();
			card.x = pt1.x;
			card.y = pt1.y;
			card.scaleX = card.scaleY = 0.72;
			this.addChild(card);
			card.setData(item.num,item.type);
			item.setData(-1);
			if(remove && item.parent){
				item.parent.removeChild(item);
			}
			GameSound.instance().playH5Audio(SourceUtil.audioFinish)
			egret.Tween.get(card).to({x:pt2.x,y:pt2.y},200,egret.Ease.quadIn).call(()=>{
				card.x = 0;
				card.y = num * 60;
				card.scaleX = card.scaleY = 1;
				grp.addChild(card);
				card.playEff();
				resolve(""); 
			});
		})
	}
	
	private moveToCard(item1,item2,time = 400){
		return new Promise((resolve,reject) => {
			let pt1 = item1.parent.localToGlobal(item1.x,item1.y);
			let pt2 = item2.parent.localToGlobal(item2.x,item2.y);
			let card = new Card();
			card.x = pt1.x;
			card.y = pt1.y;
			card.scaleX = card.scaleY = 0.72;
			this.addChild(card);
			card.setData(item1.num,item1.type);
			if(item1.parent){
				item1.parent.removeChild(item1);
			}
			GameSound.instance().playH5Audio(SourceUtil.audioFinish)
			egret.Tween.get(card).to({x:pt2.x,y:pt2.y},time,egret.Ease.quadIn).call(()=>{
				card.parent.removeChild(card);
				item2.setData(card.num,card.type);
				item2.playEff();
				resolve(""); 
			});
		})

	}

	private moveToTarget(item1,item2,time = 200){
		return new Promise((resolve,reject) => {
			let pt1 = item1.parent.localToGlobal(item1.x,item1.y);
			let pt2 = item2.parent.localToGlobal(item2.x,item2.y);
			let card = new Card();
			card.x = pt1.x;
			card.y = pt1.y;
			card.scaleX = card.scaleY = 0.72;
			this.addChild(card);
			card.setData(item1.num,item1.type);
			if(item1.parent){
				item1.parent.removeChild(item1);
			}
			item2.setData(item1.num,item1.type);
			item2.setData(card.num,card.type);
			GameSound.instance().playH5Audio(SourceUtil.audioFinish)
			egret.Tween.get(card).to({x:pt2.x,y:pt2.y},time,egret.Ease.quadIn).call(()=>{
				card.parent.removeChild(card);
				item2.playEff();
				resolve(card);
			});
		})

	}

	private playSuccess(){
		let grps = this.xgrps;
		let arr = [];
		for(let j = 0;j < 7;j++){
			for(let i = 0;i < grps.length;i++){
				let grp = grps[i];
				if(j < grp.numChildren){
					arr.push(grp.getChildAt(j));
				}
			}
		}
		GameSound.instance().playH5Audio(SourceUtil.audioSuccess)
		let esid = egret.setInterval(()=>{
			let item = arr.pop() as Card;
			let t = this.getTItem(item);
			if(!t){
				arr.unshift(item);
				return;
			}
			if(arr.length == 0){
				egret.clearInterval(esid);
				this.moveToTarget(item,t).then(()=>{
					this.createRoll();
				});
			}
			else{
				this.moveToTarget(item,t);
			}
		},this,100);
	}

	private getTItem(item:Card){
		if(!item) return null;
		let num = item.num - 1;
		let t:Card;
		if(num == this.card0.num && item.type%2 != this.card0.type%2){
			t = this.card0;
		}
		else if(num == this.card1.num && item.type%2 != this.card1.type%2){
			t = this.card1;
		}
		else if(num == this.card2.num && item.type%2 != this.card2.type%2){
			t = this.card2;
		}
		else if(num == this.card3.num && item.type%2 != this.card3.type%2){
			t = this.card3;
		}
		return t;
	}

	private touchHandler(evt:egret.TouchEvent){
		// if(evt.type == egret.TouchEvent.TOUCH_BEGIN){
		// 	this.dragFlag = true;
		// }
		// else if(evt.type == egret.TouchEvent.TOUCH_END){
		// 	if(this.dragFlag){
		// 		egret.Tween.get(this.xgrp).to({x:500,y:10,scaleY:0.2},250).call(()=>{
		// 			this.xgrp.visible = false;
		// 			this.img_tk.visible = true;
		// 			this.showResult();
		// 		});
		// 	}
		// 	this.dragFlag = false;
		// }
		// else if(evt.type == egret.TouchEvent.TOUCH_MOVE){
		// 	if(this.dragFlag){
		// 		let pt = evt.target.parent.globalToLocal(evt.stageX,evt.stageY);
		// 		this.xgrp.x = pt.x;
		// 		this.xgrp.y = pt.y;
		// 	}
		// }
	}
	private curEffIndex = 0;
	private playRollEff(num,type){
		let grp = this.rollGrp;
		grp.width = 750;
		grp.height = 750;
		let r = 250;
		let rotate = this.curEffIndex * 360/52;
		let angle = rotate*Math.PI/180;
		let x = r*Math.cos(angle) - Math.sin(angle);
		let y = Math.cos(angle) + r*Math.sin(angle);
		let card = new Card();
		card.anchorOffsetX = card.width/2;
		card.anchorOffsetY = card.height/2;
		card.x = x;
		card.y = y;
		card.rotation = 90 + rotate;
		card.scaleX = card.scaleY = 0.72;
		card.setData(num,type);
		grp.addChild(card);
		this.addChild(grp);
		grp.x = Game.instance().gameStage.stageWidth/2;
		grp.y = Game.instance().gameStage.stageHeight/2;
		this.curEffIndex++;
	}

	private createRoll(){
		let count = 0;
		this.curEffIndex = 0;
		let idx = egret.setInterval(()=>{
			this.moveEff(this.card0);
			count++;
			this.moveEff(this.card1);
			count++;
			this.moveEff(this.card2);
			count++;
			this.moveEff(this.card3);
			count++;
			if(count >= 52){
				egret.clearInterval(idx);
				GameUtil.playBreathAnim(this.rollGrp,{rotation:0},{rotation:360},6000)
				egret.setTimeout(()=>{
					this.showResult();
				},this,500);
			}
		},this,50);
	}

	private moveEff(item:Card){
		let pt1 = item.parent.localToGlobal(item.x,item.y);
		let pt2 = {x:Game.instance().gameStage.stageWidth/2 + 236,y:Game.instance().gameStage.stageHeight/2}
		let card = new Card();
		card.anchorOffsetX = card.width/2;
		card.anchorOffsetY = card.height/2;
		card.x = pt1.x;
		card.y = pt1.y + 10;
		card.scaleX = card.scaleY = 0.72;
		this.addChild(card);
		card.setData(item.num,item.type);
		item.setData(item.num - 1 == 0 ? -1 : item.num - 1,item.type);
		egret.Tween.get(card).to({x:pt2.x,y:pt2.y,rotation:90},200).call(()=>{
			card.parent.removeChild(card);
			this.playRollEff(card.num,card.type);
		});
	}

	private showResult(){
		// this.grp_coin.visible = true;
		// GameUtil.randomNumToText(this.txt1,99.99,"$");
		// GameUtil.randomNumToText(this.txt2,99.99,"$");
		// this.txt1.text = "999999";
		// this.txt2.text = "$999";
		// this.txt3.text = "999k";
		// let index = 0;
		// let num = this.grp_coin.numChildren;
		// let invervalid = egret.setInterval(()=>{
		// 	index++;
		// 	for(let i = num - 1;i > 0;i--){
		// 		let img = this.grp_coin.getChildAt(i);
		// 		img["source"] = `sheet_json.${Math.ceil(9*Math.random())}@3x`
		// 	}
		// 	if(index >= 30){
		// 		egret.clearInterval(invervalid);
		// 		for(let i = num - 1;i > 0;i--){
		// 			let img = this.grp_coin.getChildAt(i);
		// 			img["source"] = `sheet_json.9@3x`
		// 		}
				// this.txt1.text = "999999";
				// this.txt2.text = "$999";
				// this.txt3.text = "999k";
		// 		egret.Tween.get(this.grp_coin).wait(200).to({scaleX:1.5,scaleY:1.5},100,egret.Ease.backOut).call(()=>{
		// 			Game.instance().gameView.resultView.open();
		// 			GameUtil.playFollowDownEff();
		// 		})
		// 	}
		// },this,10);
		Game.instance().gameView.resultView.open();
		GameSound.instance().playH5Audio(SourceUtil.audioSuccess)
		let r = SpriteUtil.stageWidth/1.2;
        GameUtil.playFirePieces(r,100,220,260,SpriteUtil.stageWidth + 100,SpriteUtil.stageCenterY - 180);
        GameUtil.playFirePieces(r,100,-70,-30,-100,SpriteUtil.stageCenterY - 180);
		egret.setTimeout(()=>{
			GameUtil.playFollowDownEff();
		},this,1500);
		AppCenter.gameEnd();
	}

	protected resizeContent(portrait:boolean){
		if(this.rollGrp){
			this.rollGrp.x = Game.instance().gameStage.stageWidth/2;
			this.rollGrp.y = Game.instance().gameStage.stageHeight/2;
		}
	}
}