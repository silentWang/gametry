//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class LoadingUI extends egret.Sprite implements RES.PromiseTaskReporter {

    public constructor() {
        super();
        this.createView();
    }

    private textField: egret.TextField;
    private progressShp:egret.Shape;
    private anim:egret.MovieClip;

    private createView(): void {
        let swid = egret.MainContext.instance.stage.stageWidth;
        let shgt = egret.MainContext.instance.stage.stageHeight;
        let bg = new egret.Shape();
        bg.graphics.beginFill(0x60C766);
        bg.graphics.drawRect(0,0,swid,shgt);
        bg.graphics.endFill();
        this.addChild(bg);

        let bg1 = new egret.Shape();
        bg1.graphics.beginFill(0x4CB452);
        bg1.graphics.drawRoundRect(0,0,375,10,10);
        bg1.graphics.endFill();
        this.addChild(bg1);
        bg1.x = swid/2 - 188;
        bg1.y = shgt/2 + 200;

        let bg2 = new egret.Shape();
        bg2.graphics.beginFill(0xFFD72E);
        bg2.graphics.drawRoundRect(0,0,375,10,12);
        bg2.graphics.endFill();
        this.addChild(bg2);
        bg2.x = bg1.x;
        bg2.y = bg1.y;
        bg2.scaleX = 0.01;
        this.progressShp = bg2;

        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.x = bg1.x;
        this.textField.y = bg1.y + 40;
        this.textField.width = 375;
        this.textField.textAlign = "center";
    }

    public onProgress(current: number, total: number): void {
        let scale = current/total;
        this.progressShp.scaleX = scale;
        this.textField.text = `${Math.floor(scale*100)}%`;
    }

    public close(){
        if(this.parent){
            this.parent.removeChild(this);
        }
        this.removeChildren();
    }
}
