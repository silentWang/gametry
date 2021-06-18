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

class Main extends eui.UILayer {


    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        if(GameData.isPublish){
            RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadLocal();
        }
        else {
            await this.loadResource();
        }
        this.createGameScene();
    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private async loadLocal(){
        let json = {
            "groups": [
                {
                    "keys": "bg_jpg,sheet_json",
                    "name": "preload"
                }
            ],
            "resources": [
                {
                    "url": "assets/bg.jpg",
                    "type": "image",
                    "name": "bg_jpg"
                },
                {
                    "url": "assets/sheet.json",
                    "type": "sheet",
                    "name": "sheet_json",
                    "subkeys": "$@3x,0@3x,1@3x,2@3x,3@3x,4@3x,5@3x,6@3x,7@3x,8@3x,9@3x,coins@3x,guang@3x(1),guangg@3x,jindu@3x,jindu@3x(2),paibei_01@3x,pp @3x,tianjia@3x(1),top_bgg@3x(1),tyi_bg@3x,xin@3x,xin_1@3x,yuanhu@3x"
                }
            ]
        }
        let item = { type: "legacyResourceConfig", root:"resource/", url:"default.res.json", name: "default.res.json" }
        ResLocalLoad.loadLoadJSON(item,json);
        await this.loadTheme();
        if (RES.config.config.loadGroup.indexOf("preload") == -1) {
            RES.config.config.loadGroup.push("preload");
        }
        await ResLocalLoad.loadLocalRes(SourceUtil.sheet_main);
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve("");
            }, this);
        })
    }

    /**
     * 创建场景界面
     * Create scene interface
     */
    protected async createGameScene(){
        Game.instance().setStage(this.stage);
        Game.instance().gotoGame();
        AppCenter.gameStart(()=>{});
    }
}
