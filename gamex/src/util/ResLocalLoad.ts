class ResLocalLoad {
    constructor(){
        this.init();
    }

    public static loadDefaultInit(resourceRoot,url){
        if (resourceRoot.indexOf('://') >= 0) {
            var temp = resourceRoot.split('://');
            resourceRoot = temp[0] + '://' + RES.path.normalize(temp[1] + '/');
            url = url.replace(resourceRoot, '');
        }
        else {
            resourceRoot = RES.path.normalize(resourceRoot + "/");
            url = url.replace(resourceRoot, '');
        }
        RES.setConfigURL(url, resourceRoot);
    }

    public static loadLoadJSON(resource,data){
        var host = RES.host;
        var resConfigData = RES.config.config;
        var root = resource.root;
        var fileSystem = resConfigData.fileSystem;
        if (!fileSystem) {
            fileSystem = {
                getFile: function (filename) {
                    return fsData[filename];
                },
                addFile: function (data) {
                    if (!data.type)
                        data.type = "";
                    if (root == undefined) {
                        data.root = "";
                    }
                    fsData[data.name] = data;
                },
                profile: function () {
                    console.log(fsData);
                },
                removeFile: function (filename) {
                    delete fsData[filename];
                }
            };
            fileSystem["fsData"] = {}
            resConfigData.fileSystem = fileSystem;
        }
        var groups = resConfigData.groups;
        for (var _i = 0, _a = data.groups; _i < _a.length; _i++) {
            var g = _a[_i];
            if (g.keys == "") {
                groups[g.name] = [];
            }
            else {
                groups[g.name] = g.keys.split(",");
            }
        }
        var alias = resConfigData.alias;
        var fsData = fileSystem['fsData'];
        var _loop_1 = function (resource_1) {
            fsData[resource_1.name] = resource_1;
            fsData[resource_1.name].root = root;
            if (resource_1.subkeys) {
                resource_1.subkeys.split(",").forEach(function (subkey) {
                    alias[subkey] = resource_1.name + "#" + subkey;
                    alias[resource_1.name + "." + subkey] = resource_1.name + "#" + subkey;
                });
            }
        };
        for (var _b = 0, _c = data.resources; _b < _c.length; _b++) {
            var resource_1 = _c[_b];
            _loop_1(resource_1);
        }
        host.save(resource, data);
    }

    public static loadLocalTheme(str,stage){
        let theme = new eui.Theme("resource/default.thm.json",stage);
        theme["onConfigLoaded"](str);
    }

    public static loadLocalRes(sheet:{config,bitmapData} = null){
        return new Promise((resolve,reject)=>{
            let data = sheet.config;
            if (!sheet.bitmapData) return null;
            var r = RES.host.resourceConfig.getResource(RES.nameSelector(data.file));
            if (!r) {
                var imageName = RES.processor.getRelativePath("assets/sheet.json", "sheet.png");
                r = { name: RES.nameSelector(data.file), url: imageName, type: 'image', root: "resource/" };
                RES.host.resourceConfig.addResourceData(r);
            }
            var frames = data.frames;
            egret.BitmapData.create("base64",sheet.bitmapData,(bitmapdata)=>{
                let stexture = new egret.Texture();
                stexture.bitmapData = bitmapdata;
                let bitmapData = stexture;
                var spriteSheet = new egret.SpriteSheet(bitmapData);
                spriteSheet["$resourceInfo"] = r;
                for (var subkey in frames) {
                    var config = frames[subkey];
                    var texture = spriteSheet.createTexture(subkey, config.x, config.y, config.w, config.h, config.offX, config.offY, config.sourceW, config.sourceH);
                    if (config["scale9grid"]) {
                        var str = config["scale9grid"];
                        var list = str.split(",");
                        texture["scale9Grid"] = new egret.Rectangle(parseInt(list[0]), parseInt(list[1]), parseInt(list[2]), parseInt(list[3]));
                    }
                }
                RES.host.save(r, bitmapData);
                let t = {
                    name: "sheet_json",
                    root: "resource/"
                }
                RES.host.save(t as any, spriteSheet);
                resolve("");
            });
        })
    }

    private init(){
        RES.processor["loadLocalJSON"] = function(data){
            
        }
    }

}