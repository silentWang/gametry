class GameView{
    constructor() {
        this.addEvent();
    }

    private addEvent(){

    }

    private _euiView:UIEuiView;
    private _uibView:UIBView;

    public showUIEuiView(){
        this.closeAll();
        if(!this._euiView){
            this._euiView = new UIEuiView();
        }
        this._euiView.open();
    }

    public showUIBViewView(){
        this.closeAll();
        if(!this._uibView){
            this._uibView = new UIBView();
        }
        this._uibView.open();
    }
    //可通过该方法取ui实例
    public get euiView(){   
        return this._euiView;
    }

    public closeAll(){
        if(this._euiView) this._euiView.close();
        if(this._uibView) this._uibView.close();
    }

}