//$(function(){

var canvas, stage, exportRoot;
images = images||{};
ss = ss||{};

var bgCanvas = $("<canvas></canvas>");
bgCanvas.attr("width", mmToPx(10));
bgCanvas.attr("height", mmToPx(10));

var bgContext = bgCanvas.get(0).getContext('2d');
var bgImage = new Image();

var paperPadding = {
    t : 15,
    b : 15,
    l : 15,
    r : 15
}

// 本番用
var API_URL = {
    SETUP: "/SF0080101/",
    RESULT: "/SF0080102",
    SHAPE_IMAGE: "/SF0080103",
    SHEET_SIZES: "/SF0080104"
}
// 

var errorMessages = [
    "適切な面付けが行えない可能性のある断裁サイズを選択されていますがよろしいですか？",
    "作業性が高くない断裁サイズを選択されていますがよろしいですか？必要に応じて生産側に相談してください",
    "面付け数が奇数の場合は、打ち抜き時の加重が均等にならず、製造ロスが増える可能性がありますがよろしいですか？必要に応じて生産側に相談してください"
]

var formats = [
    "01",
    "02",

    "16",

    "03",
    "04",
    "05",
    "06",

    "07",

    "08", // 7
    "09", // 8
    "10", // 9
    "11", // 10
    "12", // 11

    "13",
    "14",
    "15"
]

var original = null;
var originalImg = new Image();
var imageWidth = 0;
var imageHeight = 0;

var prev_params = {};


//
// setup canvas
//
var SF008Canvas = (function(){

    function SF008Canvas(o){
        this.parent = o;
        this.formatIndex = 0;
        this.formatList = {};
        this.shapeList = [];
        this.SFMode = 0;

        this.paper = null;
        this.bg = null;

        this.isDown = false;
        this.prevGroup1 = 0;
        this.prevShapeIndex = 0;

        this.loader = null;
    }

    SF008Canvas.prototype.init = function(){
        canvas = document.getElementById("canvas1");

        this.loader = new createjs.LoadQueue(false);
        this.loader.addEventListener("fileload", this.handleFileLoad.bind(this));
        this.loader.addEventListener("complete", this.handleComplete.bind(this));
        this.loader.loadFile({src:"assets/data/images/format1_atlas_.json", type:"spritesheet", id:"format1_atlas_"}, true);
        this.loader.loadManifest(lib.properties.manifest);
    }

    SF008Canvas.prototype.handleFileLoad = function(evt) {
        if (evt.item.type == "image") { images[evt.item.id] = evt.result; }
    }

    SF008Canvas.prototype.handleComplete = function(evt) {
        var self = this;

        var queue = evt.target;
        ss["format1_atlas_"] = queue.getResult("format1_atlas_");

        exportRoot = new lib.format1();
        exportRoot.scene2.visible = false;

        stage = new createjs.Stage(canvas);
        stage.addChild(exportRoot);
        stage.update();


        original = new createjs.Bitmap();

        exportRoot.dummy.visible = false;
        exportRoot.dummy.parent.removeChild(exportRoot.dummy);

        exportRoot.scene1.oContainer.customFormat.addChildAt(original, 0);
        exportRoot.scene1.oContainer.visible = false;

        exportRoot.scene1.oContainer.customFormat.TY.regX = 13;
        exportRoot.scene1.oContainer.customFormat.TY.regY = 13;

        exportRoot.scene1.oContainer.customFormat.TY.visible = false;
        //createjs.Ticker.setFPS(lib.properties.fps);
        createjs.Ticker.setFPS(15);
        createjs.Ticker.addEventListener("tick", stage);

        for(var i = 0; i < formats.length; i++){
            this.formatList["SF008_" + formats[i]] = new flib["FormatSF008_" + formats[i]](exportRoot.scene1.container["SF008_" + formats[i]]);
            this.formatList["SF008_"+formats[i]].obj.parent.visible = false;
        }
        this.formatList["SF008_"+formats[this.formatIndex]].obj.parent.visible = true;


        this.paper = new createjs.Shape();
        this.paper.alpha = 0.8;
        exportRoot.scene2.container.addChild(this.paper);
        exportRoot.scene2.container.addChild(exportRoot.scene2.container.TY);
        exportRoot.scene2.container.TY.gotoAndStop(1);
        exportRoot.scene2.container.TY.regX = 13;
        exportRoot.scene2.container.TY.regY = 13;


        this.bg = new createjs.Shape();
        this.bg.alpha = 0.3;
        exportRoot.addChildAt(this.bg, 1);

        exportRoot.scene2.x = 0;
        exportRoot.scene2.y = 0;
        exportRoot.scene2.container.x = 0;
        exportRoot.scene2.container.y = 0;

        this.bindEvent();

        $(this).trigger("complete");
    }



    SF008Canvas.prototype.bindEvent = function(){
        var self = this;

        this.handleDown = this.handleDown.bind(this);
        this.handleMove = this.handleMove.bind(this);
        this.handleUp = this.handleUp.bind(this);


        // インタラクティブの設定
        stage.addEventListener("stagemousedown", this.handleDown.bind(this));
        stage.addEventListener("stagemousemove", this.handleMove.bind(this));
        stage.addEventListener("stagemouseup", this.handleUp.bind(this));


        $(window).on("keydown.sf008", function(e){
            var b = false;
            if(e.keyCode == 38){
                self.shapeList.forEach(function(el){
                    if(el.target.isFocus){
                        el.moveUp();
                        b = true;
                    }
                })
            }else if(e.keyCode == 40){
                self.shapeList.forEach(function(el){
                    if(el.target.isFocus){
                        el.moveDown();
                        b = true;
                    }
                })
            }else if(e.keyCode == 37){
                self.shapeList.forEach(function(el){
                    if(el.target.isFocus){
                        el.moveLeft();
                        b = true;
                    }
                })
            }else if(e.keyCode == 39){
                self.shapeList.forEach(function(el){
                    if(el.target.isFocus){
                        el.moveRight();
                        b = true;
                    }
                })
            }else if(e.keyCode == 46 || e.keyCode == 8) {
                if(self.shapeList.length > 1){
                    self.shapeList.forEach(function(el){
                        if(el.target.isFocus){
                            el.deleteT();
                            b = true;
                        }
                    })
                }
            }
            if(b){
                e.stopPropagation();
                e.preventDefault();
                return false;
            }
        });
    }

    var dragPointX = 0;
    var dragPointY = 0;
    SF008Canvas.prototype.handleDown = function(){
        dragPointX = (stage.mouseX - exportRoot.x)
        dragPointY = (stage.mouseY - exportRoot.y)
        this.isDown = true;
        if(this.SFMode == 0){
        }else{
            var b = false;
            this.shapeList.forEach(function(el){
                var point = el.controller.globalToLocal(stage.mouseX, stage.mouseY);
                var isHit = el.controller.hitTest(point.x, point.y);
                if(!b && isHit) {
                    b = true;
                }
            })
            if(b){
                this.isDown = false;
            }
            //exportRoot.scene2.cache(-1000, -1000, 2000, 2000);
        }
    }
    SF008Canvas.prototype.handleMove = function(){
        var self = this;
        if(this.SFMode == 0){
            if(this.isDown){

                exportRoot.x = (stage.mouseX - dragPointX);
                exportRoot.y = (stage.mouseY - dragPointY);
                stage.update()
            }
        }else{
            if(this.isDown){
              /*
               self.shapeList.forEach(function(el){
               el.hideFocus();
               })
               */
                exportRoot.x = (stage.mouseX - dragPointX);
                exportRoot.y = (stage.mouseY - dragPointY);
                stage.update()
            }
        }
    }

    SF008Canvas.prototype.handleUp = function(e){
        dragPointX = stage.mouseX;
        dragPointY = stage.mouseY;
        this.isDown = false;
        if(this.SFMode == 0){
        }else{
            var b = false;
            this.shapeList.forEach(function(el){
                var point = el.controller.globalToLocal(stage.mouseX, stage.mouseY);
                var isHit = el.controller.hitTest(point.x, point.y);
                if(!b && isHit) {
                    b = true;
                }
            })
            if(!b){
                this.shapeList.forEach(function(el){
                    el.hideFocus();
                })
            }
            //exportRoot.scene2.uncache();
        }
    }


    SF008Canvas.prototype.addShape = function (shapeName){
        var self = this;
        if($("input[name=group1]:checked").val() == "0"){
            var sObj = new lib["SF008_format"+formats[this.formatIndex]]();
            var s = new flib["FormatSF008_" + formats[this.formatIndex]](sObj);
            s.changeParams(this.formatList["SF008_"+formats[this.formatIndex]].currentParams)
            s.addDragEvent(true);
        }else{
            var s = new CustomFormat(new createjs.Bitmap(originalImg), imageWidth / originalImg.width, imageHeight / originalImg.height);
            s.addDragEvent(true);
        }

        var r_Default = 0;
        if(this.parent.getGroup1Val() == 0){
            r_Default = ($("input[name=groupTY]:checked").val() == "0") ? 0 : 90;
        }else{
            r_Default = ($("input[name=groupCustomPTY]:checked").val() == "0") ? 0 : 90;
        }
        var c = new FormatController(s, r_Default);

        $(c).on("move", function(){
            //TODO :
            var o = self.parent.getPaperParams();
            self.parent.updatePaperSize(o.w, o.h, o.g, false, true);
            stage.update();

        })
        $(s).on("focus", function(){
            self.shapeList.forEach(function(el){
                if(el != c) el.hideFocus();
            })
            c.showFocus();
            exportRoot.scene2.container.addChild(c.controller);
            stage.update();
        })
        $(c).on("f_deleteY", function(){
            this.target.removeDragEvent();
            this.target.remove();
            $(this.target).off("focus")
            $(this).off("move")
            $(this).off("f_deleteY")
            $(this).off("f_deleteT")
            $(this).off("f_createY")
            $(this).off("f_createT")
            exportRoot.scene2.container.removeChild(this.controller);
            this.target = null;
            this.controller = null;
            self.shapeList.splice(self.shapeList.indexOf(this), 1);
            self.shapeList.forEach(function(el){
                el.setVisible(self.shapeList.length);
            })


            this.setEnable(true);
            var o = self.parent.getPaperParams();
            self.parent.updatePaperSize(o.w, o.h, o.g, false);
            stage.update();


        })
        $(c).on("f_createY", function(){
            var added = self.addShape();
            added.target.obj.rotation = this.target.obj.rotation;
            added.TY.rotation = this.TY.rotation;
            added._update();

            var t = ((-added.target.obj.rotation / 90) %4)
            var d = (t == 0 || t == 2) ? this.target.width : this.target.height;
            var d_mm = (t == 0 || t == 2) ? this.width_mm : this.height_mm;

            var len = self.shapeList.length;
            var _x = this.x_mm + d_mm + parseFloat($("#paperMargin").val());
            var _y = this.y_mm;
            var count = 0;
            for(var i = 0; i < len; i++){
                if(_x == self.shapeList[i].x_mm && _y == self.shapeList[i].y_mm){
                    count++;
                    _x += 10;
                    _y += 10;
                }
            }
            added.controller.y = this.controller.y + mmToPx(10 * (count));
            added.controller.x = this.controller.x + d + mmToPx(parseFloat($("#paperMargin").val())) + mmToPx(10 * (count));
            added.y_mm = this.y_mm + 10 * (count);
            added.x_mm = this.x_mm + d_mm + parseFloat($("#paperMargin").val()) + 10 * (count);

            this.setEnable(true);
            var o = self.parent.getPaperParams();
            self.parent.updatePaperSize(o.w, o.h, o.g, false);
            stage.update();
        })
        $(c).on("f_deleteT", function(){
            this.target.removeDragEvent();
            this.target.remove();
            $(this.target).off("focus")
            $(this).off("move")
            $(this).off("f_deleteY")
            $(this).off("f_deleteT")
            $(this).off("f_createY")
            $(this).off("f_createT")
            exportRoot.scene2.container.removeChild(this.controller);
            this.target = null;
            this.controller = null;
            self.shapeList.splice(self.shapeList.indexOf(this), 1);
            self.shapeList.forEach(function(el){
                el.setVisible(self.shapeList.length);
            })

            this.setEnable(true);
            var o = self.parent.getPaperParams();
            self.parent.updatePaperSize(o.w, o.h, o.g, false);
            stage.update();
        })
        $(c).on("f_createT", function(){
            var added = self.addShape();
            added.target.obj.rotation = this.target.obj.rotation;
            added.TY.rotation = this.TY.rotation;
            added._update();

            var t = ((-added.target.obj.rotation / 90) %4)
            var d = (t == 0 || t == 2) ? this.target.height : this.target.width;
            var d_mm = (t == 0 || t == 2) ? this.height_mm : this.width_mm;




            var len = self.shapeList.length;
            var _x = this.x_mm;
            var _y = this.y_mm + d_mm + parseFloat($("#paperMargin").val())
            var count = 0;
            for(var i = 0; i < len; i++){
                if(_x == self.shapeList[i].x_mm && _y == self.shapeList[i].y_mm ){
                    count++;
                    _x += 10;
                    _y += 10;
                }
            }
            added.controller.x = this.controller.x + mmToPx(10 * (count));
            added.controller.y = this.controller.y + d + mmToPx(parseFloat($("#paperMargin").val())) + mmToPx(10 * (count));
            added.x_mm = this.x_mm + 10 * (count);
            added.y_mm = this.y_mm + d_mm + parseFloat($("#paperMargin").val()) + 10 * (count);

            this.setEnable(true);
            var o = self.parent.getPaperParams();
            self.parent.updatePaperSize(o.w, o.h, o.g, false);
            stage.update();
        })
        self.shapeList.push(c);
        self.shapeList.forEach(function(el){
            el.setVisible(self.shapeList.length);
        })

        exportRoot.scene2.container.addChild(c.controller);

        this.parent._updatePaperParams();
        return c;
    }

    SF008Canvas.prototype.clearScene2 = function(){
        var self = this;
        this.shapeList.forEach(function(el){
            el.target.removeDragEvent();
            el.target.remove();
            $(el.target).off("focus")
            $(el).off("move")
            $(el).off("f_deleteY")
            $(el).off("f_deleteT")
            $(el).off("f_createY")
            $(el).off("f_createT")
            exportRoot.scene2.container.removeChild(el.controller);
            el.target = null;
            el.controller = null;
        })

        this.shapeList = [];
    }


    SF008Canvas.prototype.initScene2 = function(data){
        //this.prevGroup1 = 1;
        var self = this;
        for(var i = 0; i < data.length; i++){
            var s = self.addShape();
            if(!data[i].rotation) data[i].rotation = 0;
            if(!data[i].x) data[i].x = 0;
            if(!data[i].y) data[i].y = 0;



            s.target.obj.rotation += data[i].rotation;
            s.TY.rotation += data[i].rotation;
            s._update();

            s.controller.x = mmToPx(data[i].x);
            s.controller.y = mmToPx(data[i].y);
            s.x_mm = data[i].x;
            s.y_mm = data[i].y;
        }

        var o = this.parent.getPaperParams();
        self.parent.updatePaperSize(o.w, o.h, o.g);
        stage.update();

        //TODO :
        //self.parent.checkSize();
        self.parent.checkError();
        //$("#fitToPaper").trigger("click")
    }

    SF008Canvas.prototype.setUpScene2 = function(){
        var self = this;
        if(!self.parent.initialized) return;

        var bool = true;
        if(this.prevGroup1 != this.parent.getGroup1Val()){
            this.clearScene2();
            this.prevGroup1 = this.parent.getGroup1Val();
            bool = false;
        }
        if(this.prevShapeIndex != this.parent.shapeIndex){
            this.clearScene2();
            this.prevShapeIndex = this.parent.shapeIndex;
            bool = false;
        }
        if(this.shapeList.length == 0){
            var s = self.addShape();
            s.controller.x = mmToPx(paperPadding.l);
            s.controller.y = mmToPx(paperPadding.t);
            s.x_mm = paperPadding.l;
            s.y_mm = paperPadding.t;
        }else{
            var obj = [];
            this.shapeList.forEach(function(el, index){
                obj.push({
                    x : el.x_mm,
                    y : el.y_mm,
                    rotation : el.target.obj.rotation
                })
            })
            this.clearScene2();
            this.initScene2(obj);
        }

        var o = this.parent.getPaperParams();
        self.parent.updatePaperSize(o.w, o.h, o.g);
        stage.update();

        //TODO :
        //self.parent.checkSize();
        self.parent.checkError();
        $("#fitToPaper").trigger("click")
    }

    SF008Canvas.prototype.fitToPaper = function(){

    }

    SF008Canvas.prototype.fitToShape = function(){
        var w = $("#canvas1").width() * 0.8;
        var h = $("#canvas1").height() * 0.8;

        if(this.parent.getGroup1Val() == 0){
            var _w = this.formatList["SF008_"+formats[this.formatIndex]].width + 200;
            var _h = this.formatList["SF008_"+formats[this.formatIndex]].height + 100;
        }else{
            if(original.image){
                var _w = original.scaleX * original.image.width;
                var _h = original.scaleY * original.image.height;
            }else{
                var _w = 0;
                var _h = 0;
            }
        }

        if(w/h > _w/_h){
            var s = h/_h;
        }else{
            var s = w/_w;
        }

        exportRoot.x = 0;
        exportRoot.y = 0;


        $("#scaleSlider").val(parseInt(s * 100)).trigger("change");
        stage.update();
    }

    SF008Canvas.prototype._changeScale = function(scale){
        var __s = parseFloat(scale)/100;
        var bgX = 0;
        var bgY = 0;
        var dx = 0;
        var dy = 0;

        if(this.SFMode == 0){
            exportRoot.scene1.container.scaleX =
                exportRoot.scene1.container.scaleY =
                    exportRoot.scene1.oContainer.scaleX =
                        exportRoot.scene1.oContainer.scaleY = parseFloat(scale)/100;

            if(this.parent.getGroup1Val() == 0){
                var o = sf008.canvas.formatList["SF008_"+formats[sf008.canvas.formatIndex]];
                o.TY.scaleX =
                    o.TY.scaleY = 1/exportRoot.scene1.container.scaleY;

                o.setScale(__s);

                o.TY.x = o.obj.x+ o.width - 13 * 1/exportRoot.scene1.container.scaleY;
                o.TY.y = o.obj.y+ o.height - 13 * 1/exportRoot.scene1.container.scaleY;

                this.bg.x = exportRoot.scene1.container.x - sf008.canvas.formatList["SF008_"+formats[sf008.canvas.formatIndex]].width * 0.5 * __s- 5.5;
                this.bg.y = exportRoot.scene1.container.y - sf008.canvas.formatList["SF008_"+formats[sf008.canvas.formatIndex]].height * 0.5 * __s;
            }else{
                exportRoot.scene1.oContainer.customFormat.TY.scaleX =
                    exportRoot.scene1.oContainer.customFormat.TY.scaleY = 1/exportRoot.scene1.container.scaleY;
                if(original.image){
                    exportRoot.scene1.oContainer.customFormat.TY.visible = true;
                    exportRoot.scene1.oContainer.customFormat.TY.x = imageWidth * 0.5 - 13 * 1/exportRoot.scene1.container.scaleY;
                    exportRoot.scene1.oContainer.customFormat.TY.y = imageHeight * 0.5 - 13 * 1/exportRoot.scene1.container.scaleY;
                }else{
                    exportRoot.scene1.oContainer.customFormat.TY.visible = false;
                }
                this.bg.x = exportRoot.scene1.container.x - imageWidth * 0.5 * __s;
                this.bg.y = exportRoot.scene1.container.y - imageHeight * 0.5 * __s;
            }

        }else{
            var o = this.parent.getPaperParams();
            exportRoot.scene2.scaleX =
                exportRoot.scene2.scaleY = parseFloat(scale)/100;

            for(var i = 0; i < this.shapeList.length; i++){
                this.shapeList[i].setScale(1/exportRoot.scene2.scaleY);
            }

            exportRoot.scene2.container.TY.scaleX =
                exportRoot.scene2.container.TY.scaleY = 1/exportRoot.scene2.scaleY;

            exportRoot.scene2.container.TY.x = mmToPx(o.w) + paperPadding.r + 13 * 1/exportRoot.scene2.scaleY + 30;
            exportRoot.scene2.container.TY.y = mmToPx(o.h) - 13 * 1/exportRoot.scene2.scaleY;

            this.bg.x = exportRoot.scene2.x + exportRoot.scene2.container.x * __s;
            this.bg.y = exportRoot.scene2.y + exportRoot.scene2.container.y * __s;

        }


        this.bg.graphics.clear();
        var s_ = 10;

        var sizes = [50, 25, 10, 10, 10, 5, 1];

        if(scale <= 20){
            s_ = sizes[0];
        }else if(scale <= 50){
            s_ = sizes[1];
        }else if(scale <= 70){
            s_ = sizes[2];
        }else if(scale <= 90){
            s_ = sizes[3];
        }else if(scale <= 110){
            s_ = sizes[4];
        }else if(scale <= 360){
            s_ = sizes[5];
        }else if(scale <= 400){
            s_ = sizes[6];
        }
        //s_ = 10;
        $("#meterUnit").html(s_);
        //if(this.debugMode) g.beginStroke("#F00");
        var size = mmToPx(s_) * parseFloat(scale)/100;


        bgContext.clearRect(0, 0, 1000, 1000);
        bgCanvas.attr("width", size*2);
        bgCanvas.attr("height", size*2);

        bgContext.fillStyle = "#FFF";
        bgContext.rect(0, 0, 2, size*2);
        bgContext.rect(2, 0, size*2, 2);
        bgContext.fill();

        var m = new createjs.Matrix2D(size/Math.floor(size*2), 0, 0, size/Math.floor(size*2), size * parseInt(2500/size), size * parseInt(2500/size));
        var self = this;
        $(bgImage).off("load");
        $(bgImage).on("load", function(){
            $(bgImage).off("load");
            if(self.bg){
                self.bg.graphics.beginBitmapFill(bgImage, "repeat", m);
                self.bg.graphics.drawRect(-2500, -2500, 5000, 5000);
            }
        })
        bgImage.src = bgCanvas.get(0).toDataURL();



        stage.update();
    }

    SF008Canvas.prototype._changeGroupTY = function(){
        var format = exportRoot.scene1.container["SF008_" + formats[this.formatIndex]];
        if($("input[name=groupTY]:checked").val() == "0"){
            format.TY.rotation = 0;
        }else{
            format.TY.rotation = 90;
        }
        stage.update();
    }

    SF008Canvas.prototype.changeSFMode = function(mode){
        this.SFMode = mode;
        if(mode == 1){
            exportRoot.scene2.visible = true;
            exportRoot.scene1.visible = false;
            $(".content01").hide();
            $(".content02").show();

            $(window).trigger("resize");
            this.setUpScene2();
        }else{
            exportRoot.scene2.visible = false;
            exportRoot.scene1.visible = true;
            $(".content01").show();
            $(".content02").hide();

            $("#scaleSlider").val(parseInt(100)).trigger("change");
            $(window).trigger("resize");
        }
    }

    SF008Canvas.prototype.setShapeParams = function(params, bool){
        if(this.parent.getGroup1Val() == 0){
            this.formatList["SF008_"+formats[this.formatIndex]].changeParams(params)
            $("#sizeW").html(parseFloat(this.formatList["SF008_"+formats[this.formatIndex]].width_mm).toFixed(1));
            $("#sizeH").html(parseFloat(this.formatList["SF008_"+formats[this.formatIndex]].height_mm).toFixed(1));
        }else{
            $("#sizeW").html(parseFloat($("#paramPSW").val()).toFixed(1));
            $("#sizeH").html(parseFloat($("#paramPSH").val()).toFixed(1));
        }
        if(bool) this.fitToShape();

        this._changeScale(parseFloat($("#scaleSlider").val()));
    }

    SF008Canvas.prototype.setShapeFormat = function(index){
        this.formatIndex = index;
        for(var i = 0; i < formats.length; i++){
            this.formatList["SF008_"+formats[i]].obj.parent.visible = false;
        }
        this.formatList["SF008_"+formats[this.formatIndex]].obj.parent.visible = true;
        exportRoot.scene1.container["SF008_"+formats[this.formatIndex]].x = 0;
        exportRoot.scene1.container["SF008_"+formats[this.formatIndex]].y = 0;

        var useParams = this.formatList["SF008_"+formats[this.formatIndex]].checkUseParams();
        var labels = this.formatList["SF008_"+formats[this.formatIndex]].getLabels();

        if(useParams.width) $($("#params .row").get(0)).show();
        else  $($("#params .row").get(0)).hide();
        $($($("#params .row").get(0)).find("div span").get(0)).html(labels.width);

        if(useParams.depth) $($("#params .row").get(1)).show();
        else  $($("#params .row").get(1)).hide();
        $($($("#params .row").get(1)).find("div span").get(0)).html(labels.depth);

        if(useParams.height) $($("#params .row").get(2)).show();
        else  $($("#params .row").get(2)).hide();
        $($($("#params .row").get(2)).find("div span").get(0)).html(labels.height);

        if(useParams.flap) $($("#params .row").get(3)).show();
        else  $($("#params .row").get(3)).hide();
        $($($("#params .row").get(3)).find("div span").get(0)).html(labels.flap);

        if(useParams.insertion) $($("#params .row").get(4)).show();
        else  $($("#params .row").get(4)).hide();
        $($($("#params .row").get(4)).find("div span").get(0)).html(labels.insertion);

        if(useParams.gluing) $($("#params .row").get(5)).show();
        else  $($("#params .row").get(5)).hide();
        $($($("#params .row").get(5)).find("div span").get(0)).html(labels.gluing);
    }

    SF008Canvas.prototype.destory = function(){
        createjs.Ticker.removeEventListener("tick", stage);
        stage.removeEventListener("stagemousedown", this.handleDown);
        stage.removeEventListener("stagemousemove", this.handleMove);
        stage.removeEventListener("stagemouseup", this.handleUp);
        $(window).off("keydown.sf008");

        for(var i = 0; i < formats.length; i++){
            this.formatList["SF008_" + formats[i]] = null;;
        }

        this.clearScene2();


        exportRoot.removeAllChildren();
        stage.update();
        exportRoot = null;
        stage = null;
        this.paper = null;
        this.bg = null;
        this.shapeList = [];
    }


    return SF008Canvas;
})();


//
//
//
var SF008 = (function(){

    var prevShape = 0;

    function SF008(){

        tmpImagePath = "";
        //
        this.settings = {

        };

        this.sheet_sizes = {

        };
        //
        prevShape = this.shapeIndex = 0;

        this.initialized = false;
        //
        //
        //
        this.canvas = new SF008Canvas(this);
        $(this.canvas).on("complete", this.setupComplete.bind(this))
    }

  /*
   初期設定ファイルの読み込み
   */
    SF008.prototype.init = function(product_id){
        var self = this;

        App.loader('show');

        $.ajax({
            type : "GET",
            url : API_URL.SETUP + product_id,
            scriptCharset: 'utf-8',
            dataType: "json",
            success : function(data){
                if (data.status != 0) {
                    self.settings = data.result;
                    self.setup();
                } else {
                    $.notify({message: 'Data error'}, {type: 'danger'});
                    return;
                }
            },
            error : function(data){
                //
                $.notify({message: 'データの初期化に失敗しました。'}, {type: 'danger'});
                App.loader('hide');
            }
        })
    }


  /*
   断裁サイズ情報の取得
   */
    var __ajax = null;
    SF008.prototype.getSheetSizes = function(paper_id, basis_weights_id, complete){
        if(__ajax) {
            __ajax.abort();
            __ajax = null;
        }

        var self = this;

        //App.loader('show');

        __ajax = $.ajax({
            type: "POST",
            url: API_URL.SHEET_SIZES,
            data: JSON.stringify({
                paper_id: paper_id,
                basis_weights_id: basis_weights_id
            }),
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                if (data && typeof data === 'string' ) {
                    data = JSON.parse(data);
                }

                if (!data || parseInt(data.status) != 1) {
                    $.notify({
                        message: data.messages[0]
                    }, {
                        type: 'danger'
                    });
                    return;
                }

                self.settings.sheet_sizes = data.result.sheet_sizes;
                var len = self.settings.sheet_sizes.length;
                var check = false;
                for(var i = 0; i < len; i++){
                    self.settings.sheet_sizes[i].sheet_grain = self.settings.sheet_sizes[i].grain;
                    self.settings.sheet_sizes[i].grain = 0;

                    if(parseInt(self.settings.selected_sheet_size) == parseInt(self.settings.sheet_sizes[i].id)){
                        check = true;
                    }
                }
                if(!check && self.settings.selected_sheet_size != null
                    && self.settings.selected_sheet_size.toString() != '99'){
                    self.settings.selected_sheet_size = parseInt(self.settings.sheet_sizes[0].id);
                }

                if(exportRoot){
                    var o = self.getPaperParams();
                    self.updatePaperSize(o.w, o.h, o.g);
                }
                self._updatePaperParams(true);
                //App.loader('hide');
                if(complete) complete();
            },
            error : function(data){
                //
                //$.notify({message: '断裁サイズ情報の取得に失敗しました。'}, {type: 'danger'});
                //App.loader('hide');
            }
        })
    }

    var tmpImagePath = "";

  /*
   初期設定ファイルの読み込み
   */
    SF008.prototype.saveResult = function(evt) {
        if ( evt && $(evt.target).hasClass('disabled') ) return;

        if(tmpImagePath != ""){
            this.settings.original_shape_params.image = tmpImagePath;
            tmpImagePath = "";
        }

        var data = { }
        data.product_id = this.settings.product_id;
        if(this.getGroup1Val() == 0){
            data.selected_shape = parseInt($("#shapeList table tr[data-index="+this.shapeIndex+"]").attr("data-id"));
        }else{
            data.selected_shape = 99;
        }
        data.selected_paper = parseInt($("#paper_names").val());
        data.selected_basis_weight = parseInt($("#paper_weights").val());
        if(this.getGroup2Val() == 0){
            var index = parseInt($("#sheet_sizes table tr.selected").attr("data-index"));
            data.selected_sheet_size = parseInt($("#sheet_sizes table tr.selected").attr("data-id"));
            data.sheet_size = {
                width  : this.settings.sheet_sizes[index].width,
                height : this.settings.sheet_sizes[index].height,
                grain  : this.settings.sheet_sizes[index].sheet_grain
            }
        }else{
            data.selected_sheet_size = 99;
            data.sheet_size = {
                width  : this.$input_ssw.val(),
                height : this.$input_ssh.val(),
                grain  : parseInt($("input[name=groupCustomTY]:checked").val())
            }
        }
        data.imposition = this.canvas.shapeList.length;
        data.objects = [];
        for(var i = 0; i < this.canvas.shapeList.length; i++){
            data.objects.push({
                x : this.canvas.shapeList[i].x_mm,
                y : this.canvas.shapeList[i].y_mm,
                rotation : this.canvas.shapeList[i].target.obj.rotation
            })
        }

        data.original_shape_params = {
            width : parseFloat($("#paramWidth").val()),
            depth : parseFloat($("#paramDepth").val()),
            height : parseFloat($("#paramHeight").val()),
            flap : parseFloat($("#paramFlap").val()),
            insertion : parseFloat($("#paramInsertion").val()),
            gluing_part : parseFloat($("#paramGluing").val()),
            grain : (!this.getGroup1Val()) ? parseInt($("input[name=groupTY]:checked").val()) : parseInt($("input[name=groupCustomPTY]:checked").val()),
            development_width : parseFloat($("#sizeW").html()),
            development_height : parseFloat($("#sizeH").html()),
            groove : parseFloat($("#paperMargin").val()),
            image : this.settings.original_shape_params.image,
            wooden_fee : parseFloat($("#woodenFee").val())
        }

        if ( data.selected_shape == 99 ) {
            data.original_shape_params['width'] = null;
            data.original_shape_params['depth'] = null;
            data.original_shape_params['height'] = null;
            data.original_shape_params['flap'] = null;
            data.original_shape_params['gluing_part'] = null;
        }

        // FIXME: This process is not preferable.
        var is_finish = false;
        if ( evt && $(evt.target).attr('id') == 'saveBtn2' ) {
            is_finish = true;
        }

        var xhr = $.ajax({
            type : "POST",
            url : API_URL.RESULT,
            data : JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            traditional: true,
            success : function(res){
                var dataJson = JSON.parse(res);
                if (dataJson && dataJson.status == 1) {
                    $.notify({message: 'データを保存しました。'}, {type: 'success'});
                    if (is_finish) {
                        $("#sf008-saveBtn").click();
                    }
                }else{
                    $.notify({message: dataJson.messages[0]}, {type: 'danger'});
                }
            },
            error : function(data){
                //
            }
        });
    }

  /*
   初期設定ファイルの読み込み
   */
    SF008.prototype.saveShapeImage = function(image){
        if(!image) {
            $.notify({message: '図面が追加されていません。'}, {type: 'danger'});
            return;
        }

        var canvas = $("<canvas></canvas>");
        canvas.attr("width", image.width);
        canvas.attr("height", image.height);

        var context = canvas.get(0).getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);

        canvas.remove();

        var data = {
            product_id : this.settings.product_id,
            // image : window.atob(canvas.get(0).toDataURL().replace("data:image/png;base64,", ""))
            image : image.src.replace("data:image/png;base64,", "")
        }

        $.ajax({
            type : "POST",
            url : API_URL.SHAPE_IMAGE,
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success : function(data){
                if (data) {
                    data = JSON.parse(data);
                }
                if(data && data.status == 1){
                    // 画像保存後に基本データ情報の保存
                    // tmpImagePath = window.location.origin + data.result.image;
                    tmpImagePath = data.result.image;
                    $.notify({message: '図面を追加しました。'}, {type: 'success'});
                }else{
                    //tmpImagePath = "";
                    $.notify({message: data.messages[0]}, {type: 'danger'});
                }
            },
            error : function(data){
                $.notify({message: '図面の追加に失敗しました。'}, {type: 'danger'});
            }
        })
    }




  /*
   初期設定の反映
   */
    SF008.prototype.setup = function(){
        var self = this;

        this.$input_ssw = $("#paramSSW");
        this.$input_ssh = $("#paramSSH");

        $("#saveBtn1").on("click", this.saveResult.bind(this));
        $("#saveBtn2").on("click", function(){
            var rect = self.checkSize();
            var selectable = "○";
            var td = $("#sheet_sizes tr.selected td");
            if(self.getGroup2Val() == 0){
                if($(td.get(1)).find("div").html() != "○" ){
                    selectable = "△"
                }
            }else{
                if(rect.x < paperPadding.l || rect.y < paperPadding.t || paperPadding.l + parseFloat(self.$input_ssw.val()) - paperPadding.l - paperPadding.r < rect.x + rect.w || paperPadding.t + parseFloat(self.$input_ssh.val()) - paperPadding.t - paperPadding.b < rect.y + rect.h){
                    selectable = "-"
                }
                for(var i = 0; i < self.canvas.shapeList.length; i++){
                    var t = (-self.canvas.shapeList[i].target.obj.rotation/90)%2;
                    if(self.getGroup1Val() == 0){
                        if(parseInt($("input[name=groupCustomTY]:checked").val()) != parseInt($("input[name=groupTY]:checked").val()) + t){
                            selectable = "△";
                            break;
                        }
                    }else{
                        if(parseInt($("input[name=groupCustomTY]:checked").val()) != parseInt($("input[name=groupCustomPTY]:checked").val()) + t){
                            selectable = "△";
                            break;
                        }
                    }
                }
            }

            if(selectable != "○" ){
                alert("紙目が合っていないため製造リスクがありますがよろしいですか？");
            }
            self.saveResult();
        });

        //
        // setup shapes
        //
        this.settings.shapes.forEach(function(obj, index){
            var tr = $('<tr data-index="'+index+'" data-id="'+obj.id+'"><td><div>'+obj.id + " " + obj.name +'</div></td></tr>');
            $("#shapeList tbody").append(tr);

            // evt
            tr.on("click", function(){
                self.shapeIndex = parseInt($(this).attr("data-index"));
                self.setShapeForModal(self.shapeIndex);
            })
        })


        for(var i = 0; i < self.settings.papers.length; i++){
            var len = self.settings.papers[i].basis_weights.length;
            if(!self.settings.papers_byId) self.settings.papers_byId = {};
            self.settings.papers_byId[self.settings.papers[i].id] = self.settings.papers[i];

            self.settings.papers[i].basis_weights_byId = {};
            for(var j = 0; j < len; j++){
                var o = self.settings.papers[i].basis_weights[j];
                self.settings.papers[i].basis_weights_byId[parseInt(o.id)] = o;
            }
        }


        //
        // setup papers
        //
        var first = true;
        $("#paper_names").empty();
        $("#paper_names").on("change", function(){
            var index = parseInt($(this).val());
            $("#paper_weights").empty();
            self.settings.papers_byId[index].basis_weights.forEach(function(obj, index){
                var b = (first) ? (obj.id == parseInt(self.settings.selected_basis_weight)) : (index == 0);
                if(b){
                    $("#paper_weights").append('<option value="'+obj.id+'" selected>'+obj.value+' g</option>');
                    $("#paperPrice span").html(obj.price);
                }else{
                    $("#paper_weights").append('<option value="'+obj.id+'">'+obj.value+' g</option>');
                }
            })
            $("#paper_weights").trigger("change");
            if(exportRoot){
                var o = self.getPaperParams();
                self.updatePaperSize(o.w, o.h, o.g);
            }
            self._updatePaperParams();
        })
        $("#paper_weights").on("change", function(){
            var index = parseInt($("#paper_names").val());
            self.settings.papers_byId[index].basis_weights.forEach(function(obj, index){
                if(obj.id == $("#paper_weights").val()){
                    $("#paperPrice span").html(obj.price);
                }
            })

            self.renderUnitPricePerSheetOnGroup22();

            self.getSheetSizes($("#paper_names").val(),$("#paper_weights").val());
        })
        self.settings.papers.forEach(function(obj, index){
            if(obj.id == parseInt(self.settings.selected_paper)){
                $("#paper_names").append('<option value="'+obj.id+'" selected>'+obj.name+'</option>');
            }else{
                $("#paper_names").append('<option value="'+obj.id+'">'+obj.name+'</option>');
            }
        })
        //this._updatePaperParams();


        // for custom sheet size event
        this.$input_ssw.on("change", $.proxy(this.inputParamsSSXchangeHandler, this));
        this.$input_ssh.on("change", $.proxy(this.inputParamsSSXchangeHandler, this));

        $("input[name=groupCustomTY]").on("change", function(){
            var w = parseFloat(self.$input_ssw.val());
            var h = parseFloat(self.$input_ssh.val());
            var g = parseInt($("input[name=groupCustomTY]:checked").val());

            self.updatePaperSize(w, h, g, true, true);
            self.checkError();
        })

        // change tabs
        $("input[name=group1]").on("change", function(){
            if(!exportRoot) return;
            if($("input[name=group1]:checked").val() == "0"){
                exportRoot.scene1.container.visible = true;
                exportRoot.scene1.oContainer.visible = false;
            }else{
                exportRoot.scene1.container.visible = false;
                exportRoot.scene1.oContainer.visible = true;
            }
            exportRoot.x = 0;
            exportRoot.y = 0;
        })
        $("input[name=groupCustomPTY]").on("change", function(){
            if(!exportRoot) return;
            if($("input[name=groupCustomPTY]:checked").val() == "0"){
                exportRoot.scene1.oContainer.customFormat.TY.rotation = 0;
            }else{
                exportRoot.scene1.oContainer.customFormat.TY.rotation = 90;
            }
        })



        this.bindEvent();
        self.getSheetSizes($("#paper_names").val(),$("#paper_weights").val(), function(){
            self.canvas.init();
        });
    }


    SF008.prototype.inputParamsSSXchangeHandler = function (evt) {
        var $evt_target = $(evt.target);
        var val = $evt_target.val();
        var n = 0;
        if ( val == "" ) {
            n = 0;
        }
        else if( /\D/.test(val) ) {
            n = parseFloat(val).toFixed(1);
            if(isNaN(n)) n = 0;
        }
        else {
            n = parseFloat(val).toFixed(1);
        }
        if ( n < 10 ) {
            n = 10.0;
        }
        else if (n > 999) {
            n = 999.0;
        }
        $evt_target.val(n);

        var w = parseFloat(this.$input_ssw.val());
        var h = parseFloat(this.$input_ssh.val());
        var g = parseInt($("input[name=groupCustomTY]:checked").val());

        this.renderUnitPricePerSheetOnGroup22();

        this.updatePaperSize(w, h, g);
        this._fitToPaper();
    }


    SF008.prototype.getUnitPricePerSheet = function(w, h){
        var a = Math.round(Math.floor(w * h * parseFloat($("#paper_weights option:selected").html()) / 1000000) / 10 * 2) / 2;
        return (Math.ceil(a * parseFloat($("#paperPrice span").html()))/100).toFixed(2);
    }


    SF008.prototype.renderUnitPricePerSheetOnGroup22 = function() {
        var unit_price_per_sheet = this.getUnitPricePerSheet(this.$input_ssw.val(), this.$input_ssh.val());
        $("#custom_sheet_price .priceOfShapes").html(parseFloat(unit_price_per_sheet).toFixed(1) + '円');
    }


    SF008.prototype.setupComplete = function(){
        var self = this;
        if(this.settings.selected_shape == "" || this.settings.selected_shape == null){
            this.settings.selected_shape = "1";
        }
        if(this.settings.selected_paper == "" || this.settings.selected_paper == null){
            this.settings.selected_paper = "1";
        }
        if(this.settings.selected_basis_weight == "" || this.settings.selected_basis_weight == null){
            this.settings.selected_basis_weight = "1";
        }

        if(this.settings.selected_sheet_size == "" || this.settings.selected_sheet_size == null){
            this.settings.selected_sheet_size = "1";
        }

        if(this.settings.original_shape_params == null || this.settings.original_shape_params.wooden_fee == null || this.settings.original_shape_params.wooden_fee == ""){
            this.settings.original_shape_params.wooden_fee = 0;
        }

        if ( this.settings.selected_sheet_size.toString() != '99' ) {
            var check = false;
            $(this.settings.sheet_sizes).each(function(o){
                if(parseInt(o.id) ==  parseInt(self.settings.selected_sheet_size)){
                    check = true;
                }
            })
            if(!check) this.settings.selected_sheet_size = this.settings.sheet_sizes[0].id;
        }


        //
        // TODO : 基本データの復元処理を追加
        //
        $("#customer_name").html(this.settings.customer_name);
        $("#product_name").html(this.settings.product_name);
        $("#woodenFee").val(this.settings.original_shape_params.wooden_fee);

        if(this.settings.selected_shape.toString() == "99"){
            this.prevGroup1 = 1;
            $($("input[name=group1]").get(1)).prop("checked", true).trigger("change");
            this.prevShapeIndex = this.shapeIndex = 0;
            this.setShapeParams(this.settings.shapes[this.shapeIndex]);
            this.setShapeForModal(this.shapeIndex);

          /*
           // 画像の復元
           $("#paramPSW").val(parseFloat(this.settings.original_shape_params.development_width).toFixed(1));
           $("#paramPSH").val(parseFloat(this.settings.original_shape_params.development_height).toFixed(1));
           $($("input[name=groupCustomPTY]").get(parseInt(this.settings.original_shape_params.grain))).prop("checked", true);
           */
            this.prevShapeIndex = this.shapeIndex = parseInt($("#shapeList table tr[data-id=" + this.settings.shapes[0].id + "]").attr("data-index"));

            // 図面読み込みモードから形状選択モードに変更した場合にエラーになるため、ここで一度コールしておく。
            this.canvas.setShapeFormat(0);
        }else{
            this.prevGroup1 = 0;
            //
            // $($("input[name=group1]").get(0)).prop("checked", true).trigger("change");
            // selected_shape
            this.prevShapeIndex = this.shapeIndex = parseInt($("#shapeList table tr[data-id="+this.settings.selected_shape+"]").attr("data-index"));

            this.canvas.setShapeFormat(this.shapeIndex);

            // TODO: error hs[i] is undefined
            $($("input[name=group1]").get(0)).prop("checked", true).trigger("change");

            if(!this.settings.original_shape_params || isNaN(parseFloat(this.settings.original_shape_params.width))){
                this.setShapeParams(this.settings.shapes[this.shapeIndex]);

            }else{
                var default_shape = this.settings.shapes[this.shapeIndex];
                var default_params = {};
                if (default_shape) {
                    default_params = default_shape.default_params;
                }

                if(!this.settings.original_shape_params.width){
                    this.settings.original_shape_params.width = default_params.width || 0;
                }
                if(!this.settings.original_shape_params.height){
                    this.settings.original_shape_params.height = default_params.height || 0;
                }
                if(!this.settings.original_shape_params.depth){
                    this.settings.original_shape_params.depth = default_params.depth || 0;
                }
                if(!this.settings.original_shape_params.flap){
                    this.settings.original_shape_params.flap = default_params.flap || 0;
                }
                if(!this.settings.original_shape_params.insertion){
                    this.settings.original_shape_params.insertion = default_params.insertion || 0;
                }
                if(!this.settings.original_shape_params.gluing_part){
                    this.settings.original_shape_params.gluing_part = default_params.gluing_part || 0;
                }
                if(!this.settings.original_shape_params.grain){
                    this.settings.original_shape_params.grain = default_params.grain || 0;
                }
                this.setShapeParams({
                    name : this.settings.shapes[this.shapeIndex].name,
                    default_params : this.settings.original_shape_params
                });

                $("input[name=groupTY]").trigger("change");

            }
            this.setShapeForModal(this.shapeIndex);
        }

        if(this.settings.selected_sheet_size.toString() == "99"){
            this.prevGroup2 = 1;
            this.$input_ssw.val(parseFloat(this.settings.original_sheet_size.width).toFixed(1));
            this.$input_ssh.val(parseFloat(this.settings.original_sheet_size.height).toFixed(1));
            $($("input[name=groupCustomTY]").get(this.settings.original_sheet_size.grain)).prop("checked", true);
        }else{
            this.prevGroup2 = 0;
            $("#sheet_sizes table tr.selected").removeClass("selected");
            $("#sheet_sizes table tr[data-id="+this.settings.selected_sheet_size+"]").addClass("selected");
        }

        if(this.settings.selected_shape.toString() == "99"){

            $(originalImg).on("load", function(){
                $(originalImg).off("load");
                $("#SFBtn01").removeClass("disabled");
                $("#print1").removeClass("disabled");
                $("#saveBtn1").removeClass("disabled");

                original.image = originalImg;

                var __w = original.image.width;
                var __h = original.image.height;
                if(__w > __h && __w > 999){
                    __h = __h * 999/__w;
                    __w = 999;
                }else if(__h > __w && __h > 999){
                    __w = __w * 999/__h;
                    __h = 999;
                }

                original.regX = original.image.width * 0.5;
                original.regY = original.image.height * 0.5;


                imageWidth = __w;
                imageHeight = __h;

                $("#paramPSW").val(parseFloat(pxToMm(__w)).toFixed(1));
                $("#paramPSH").val(parseFloat(pxToMm(__h)).toFixed(1));

                if ( self.settings.original_shape_params.development_width ) {
                    $("#paramPSW").val(parseFloat(self.settings.original_shape_params.development_width).toFixed(1));
                }
                if ( self.settings.original_shape_params.development_height ) {
                    $("#paramPSH").val(parseFloat(self.settings.original_shape_params.development_height).toFixed(1));
                }
                $($("input[name=groupCustomPTY]").get(parseInt(self.settings.original_shape_params.grain))).prop("checked", true);

                $("#paramPSW").trigger("change");


                self.canvas.initScene2(self.settings.objects);

                $("input[name=group1]").trigger("change");
                $("input[name=groupCustomPTY]").trigger("change");

                $(window).trigger("resize");
                $("#scaleSlider").trigger("change");

                self.initialized = true;
                $("#paper_names").trigger("change")
                self._updatePaperParams();
                setTimeout(function(){
                    sf008._fitToShape();
                }, 100)

            });

            if ( this.settings.original_shape_params.image ) {
                originalImg.src = this.settings.original_shape_params.image;
            }
            else {
                this.canvas.initScene2(this.settings.objects);

                $(window).trigger("resize");
                $("#scaleSlider").trigger("change");

                this.initialized = true;
                this._updatePaperParams();
                setTimeout(function(){
                    sf008._fitToShape();
                }, 100)
            }

        }else{
            this.canvas.initScene2(this.settings.objects);
            $("input[name=group1]").trigger("change");
            $("input[name=groupCustomPTY]").trigger("change");
            $(window).trigger("resize");
            $("#scaleSlider").trigger("change");
            $("#paramWidth").trigger("change");

            this.initialized = true;
            $("#paper_names").trigger("change")
            self._updatePaperParams();
            setTimeout(function(){
                sf008._fitToShape();
            }, 100)
        }

        App.loader('hide');

        $.notify({
            message: '本機能は、見積概算のために簡易画面を作成するツールです<br/>（製造仕様書には本図面を使用せず、必ず形状・デザイン担当に相談してください）'
        }, {
            element: $("#canvas1").parent(),
            type: 'danger',
            animate: {
                enter: 'animated fadeIn',
                exit: 'animated fadeOut'
            }
        });

    }



    // set shape params
    SF008.prototype.setShapeParams = function(params){
        if(params.default_params){
            $("#shape_name").val(params.name);
            $("#paramWidth").val(parseFloat(params.default_params.width).toFixed(1));
            $("#paramDepth").val(parseFloat(params.default_params.depth).toFixed(1));
            $("#paramHeight").val(parseFloat(params.default_params.height).toFixed(1));
            $("#paramFlap").val(parseFloat(params.default_params.flap).toFixed(1));
            $("#paramInsertion").val(parseFloat(params.default_params.insertion).toFixed(1));
            $("#paramGluing").val(parseFloat(params.default_params.gluing_part).toFixed(1));
            $($("input[name=groupTY]").get(params.default_params.grain)).prop("checked", true);

            if(params.default_params.groove){
                $("#paperMargin").val(params.default_params.groove);
            }
            if(params.default_params.image){
                $("#paperMargin").val(params.default_params.groove);
            }

            prev_params = {
                width_mm : params.default_params.width,
                height_mm : params.default_params.height,
                depth_mm : params.default_params.depth,
                flap_mm : params.default_params.flap,
                insertion_mm : params.default_params.insertion,
                gluing_part_mm : params.default_params.gluing_part
            }
        }else{
            $("#paramWidth").val(parseFloat(params.width_mm).toFixed(1));
            $("#paramDepth").val(parseFloat(params.depth_mm).toFixed(1));
            $("#paramHeight").val(parseFloat(params.height_mm).toFixed(1));
            $("#paramFlap").val(parseFloat(params.flap_mm).toFixed(1));
            $("#paramInsertion").val(parseFloat(params.insertion_mm).toFixed(1));
            $("#paramGluing").val(parseFloat(params.gluing_part_mm).toFixed(1));

            prev_params = {
                width_mm : params.width_mm,
                height_mm : params.height_mm,
                depth_mm : params.depth_mm,
                flap_mm : params.flap_mm,
                insertion_mm : params.insertion_mm,
                gluing_part_mm : params.gluing_part_mm
            }
        }
    }

    // modal内への反映
    SF008.prototype.setShapeForModal = function(index){
        var obj = this.settings.shapes[index];
        $("#shapeList tbody tr").removeClass("selected");
        $($("#shapeList tbody tr").get(index)).addClass("selected");
        $("#shapeDetail").empty();
        $("#shapeDetail").append('<span class="img"><img src="'+obj.image+'"></span>');
        $("#shapeDetail").append('<br>');
        $("#shapeDetail").append('<div id="shapeDetailText"><p>'+obj.note+'</p></div>');
    }


    // set paper params
    SF008.prototype._updatePaperParams = function(reset){
        var self = this;
        var selected = 0;
        if(!reset){
            if($("#sheet_sizes table tr.selected").length > 0){
                var index = parseInt($("#sheet_sizes table tr.selected").attr("data-index"));
                selected = index;
            }
        }

        //sheet_sizes
        $("#sheet_sizes table tr").off("click");
        $("#sheet_sizes table tbody").empty();
        this.settings.sheet_sizes.forEach(function(obj, index){
            var name = obj.name + " ( "+obj.width+"x"+obj.height+" ) " + ((obj.sheet_grain == 0) ? "T" : "Y");

            var unit_price_per_sheet = self.getUnitPricePerSheet(obj.width, obj.height);
            var grain = obj.grain;

            var selectable = "○";
            if(obj.width - paperPadding.l - paperPadding.r < parseInt($("#sizeW_all").html()) || obj.height - paperPadding.t - paperPadding.b < parseInt($("#sizeH_all").html())){
                selectable = "—";
            }else{
                if(self.getGroup1Val() == 0){
                    for(var i = 0; i < self.canvas.shapeList.length; i++){
                        var t = (-self.canvas.shapeList[i].target.obj.rotation/90)%2;
                        if(obj.grain != parseInt($("input[name=groupTY]:checked").val()) + t){
                            selectable = "△";
                            break;
                        }
                    }
                }else{
                    for(var i = 0; i < self.canvas.shapeList.length; i++){
                        var t = (-self.canvas.shapeList[i].target.obj.rotation/90)%2;
                        if(obj.grain != parseInt($("input[name=groupCustomPTY]:checked").val()) + t){
                            selectable = "△";
                            break;
                        }
                    }
                }
            }
            //枚単価 = Ceil(<連量> * <建値> * 1/100)
            $("#sheet_sizes table tbody").append("<tr data-index='"+index+"' data-id='"+obj.id+"'><td><div>"+name+"</div></td><td><div>"+selectable+"</div></td><td><div class='text-right'>"+unit_price_per_sheet+"</div></td></tr>");
        })
        $("#sheet_sizes table tr").each(function(i, el){
            if(i == 0){

            }else{
                $(el).on("click", function(){
                    $("#sheet_sizes table tr").removeClass("selected");
                    $(this).addClass("selected");
                    var index = parseInt($(this).attr("data-index"));
                    var o = self.getPaperParams(index);
                    self.updatePaperSize(o.w, o.h, o.g);
                })
            }
        })
        $($("#sheet_sizes table tr").get(selected + 1)).addClass("selected");


        //
        $("#numShapes").html(self.canvas.shapeList.length);

        var w = parseFloat($("#woodenFee").val());
        var l = parseFloat($("#numOfLots").val());
        var b = w/l;
        if(isNaN(l) || l <= 0) b = 0;

        if($("input[name=group2]:checked").val() == "0"){
            var a = parseFloat($($("#sheet_sizes tr.selected td").get($("#sheet_sizes tr.selected td").length - 1)).find("div").html().replace("円", ""));
            var val = ((a/self.canvas.shapeList.length) + b).toFixed(1);
            val = parseInt(val.split(".")[0]).toLocaleString() + "." + val.split(".")[1];
            $("#priceOfShapes").html("@" + val);
        }else{
            var a = parseFloat($("#custom_sheet_price .priceOfShapes").html().replace("円", ""));
            var val = ((a/self.canvas.shapeList.length) + b).toFixed(1);
            val = parseInt(val.split(".")[0]).toLocaleString() + "." + val.split(".")[1];
            $("#priceOfShapes").html("@" + val);
        }
    }

    //
    SF008.prototype.updatePaperSize = function(w, h, g, __d, __d2){
        if(!stage) return;

        var rect = this.checkSize();
        var _rect = {
            x : paperPadding.l,
            y : paperPadding.t,
            w : w - paperPadding.l * 2,
            h : h - paperPadding.t * 2
        }

        var color_left = "#FFF";
        var color_right = "#FFF";
        var color_top = "#FFF";
        var color_bottom = "#FFF";

        if(rect.x < _rect.x){
            color_left = "#F00";
        }
        if(rect.y < _rect.y){
            color_top = "#F00";
        }
        if(rect.w + rect.x  > _rect.w + _rect.x){
            color_right = "#F00";
        }
        if(rect.h + rect.y  > _rect.h + _rect.y){
            color_bottom = "#F00";
        }
        ///*
        this.canvas.paper.graphics.clear();

        this.canvas.paper.graphics.setStrokeStyle(2).beginStroke(color_left);
        this.canvas.paper.graphics.moveTo(0, 0);
        this.canvas.paper.graphics.lineTo(0,  mmToPx(h));
        this.canvas.paper.graphics.closePath();


        this.canvas.paper.graphics.setStrokeStyle(2).beginStroke(color_right);
        this.canvas.paper.graphics.moveTo(mmToPx(w), 0);
        this.canvas.paper.graphics.lineTo(mmToPx(w),  mmToPx(h));
        this.canvas.paper.graphics.closePath();

        this.canvas.paper.graphics.setStrokeStyle(2).beginStroke(color_top);
        this.canvas.paper.graphics.moveTo(0, 0);
        this.canvas.paper.graphics.lineTo(mmToPx(w),  0);
        this.canvas.paper.graphics.closePath();

        this.canvas.paper.graphics.setStrokeStyle(2).beginStroke(color_bottom);
        this.canvas.paper.graphics.moveTo(0, mmToPx(h));
        this.canvas.paper.graphics.lineTo(mmToPx(w),  mmToPx(h));
        this.canvas.paper.graphics.closePath();

        this.canvas.paper.graphics.beginStroke("#FFF");
        this.canvas.paper.graphics.drawRect(mmToPx(_rect.x), mmToPx(_rect.y), mmToPx(_rect.w), mmToPx(_rect.h));

        if(g == 0){
            exportRoot.scene2.container.TY.rotation = 0;
        }else{
            exportRoot.scene2.container.TY.rotation = 90;
        }

        if(!__d) this.checkError(rect);
        if(!__d2) $("#fitToPaper").trigger("click");
    }


    //
    SF008.prototype.checkError = function(rect){
        if(!rect) rect = this.checkSize();

        $("#errorMessage").empty();
        var count = 0;
        var td = $("#sheet_sizes tr.selected td");
        if(this.getGroup2Val() == 0){
            if($(td.get(1)).find("div").html() != "○" ){
                $("#errorMessage").append("<p>" + errorMessages[0] + "</p>");
                count++;
            }
            if($(td.get(0)).html().indexOf("L3") >= 0 || $(td.get(0)).html().indexOf("K3") >= 0 ){
                $("#errorMessage").append("<p>" + errorMessages[1] + "</p>");
                count++;
            }
        }else{
            var selectable = "○";
            if(rect.x < paperPadding.l || rect.y < paperPadding.t || paperPadding.l + parseFloat(this.$input_ssw.val()) - paperPadding.l - paperPadding.r < rect.x + rect.w || paperPadding.t + parseFloat(this.$input_ssh.val()) - paperPadding.t - paperPadding.b < rect.y + rect.h){
                selectable = "-"
            }
            for(var i = 0; i < this.canvas.shapeList.length; i++){
                var t = (-this.canvas.shapeList[i].target.obj.rotation/90)%2;
                if(this.getGroup1Val() == 0){
                    if(parseInt($("input[name=groupCustomTY]:checked").val()) != parseInt($("input[name=groupTY]:checked").val()) + t){
                        selectable = "△";
                        break;
                    }
                }else{
                    if(parseInt($("input[name=groupCustomTY]:checked").val()) != parseInt($("input[name=groupCustomPTY]:checked").val()) + t){
                        selectable = "△";
                        break;
                    }
                }
            }
            if(selectable != "○" ){
                $("#errorMessage").append("<p>" + errorMessages[0] + "</p>");
                count++;
            }

        }
        if(this.canvas.shapeList.length % 2 == 1){
            $("#errorMessage").append("<p>" + errorMessages[2] + "</p>");
            count++;
        }
        if(count == 0){
            $("#errorMessage").hide();
        }else{
            if(this.canvas.SFMode == 1){
                $("#errorMessage").show();
            }
        }
    }

    SF008.prototype.checkSize = function(){
        var minX = 999999;
        var minY = 999999;
        var maxX = 0;
        var maxY = 0;
        for(var i = 0; i < this.canvas.shapeList.length; i++){
            var _s = this.canvas.shapeList[i];
            if(Math.floor(_s.x_mm) < minX){
                minX = Math.floor(_s.x_mm);
            }
            if(Math.floor(_s.y_mm) < minY){
                minY = Math.floor(_s.y_mm);
            }

            var _w_mm = (_s._b == 0) ? _s.width_mm : _s.height_mm;
            var _h_mm = (_s._b == 0) ? _s.height_mm : _s.width_mm;
            if(Math.floor(_s.x_mm) + _w_mm > maxX){
                maxX = _s.x_mm + _w_mm;
            }
            if(Math.floor(_s.y_mm) + _h_mm  > maxY){
                maxY = _s.y_mm + _h_mm;
            }
        }

        ///* // TODO?
        for(var i = 0; i < this.canvas.shapeList.length; i++){
            this.canvas.shapeList[i].setScale(1/exportRoot.scene2.scaleY);
        }


        $("#sizeW_all").html(Math.floor(maxX - minX));
        $("#sizeH_all").html(Math.floor(maxY - minY));
        this._updatePaperParams();
        //*/
        return {
            x : minX,
            y : minY,
            w : Math.floor(maxX - minX),
            h : Math.floor(maxY - minY)
        }
    }


    SF008.prototype.bindEvent = function(){
        var self = this;

        $("#scaleSlider").on("input change", this._changeScale.bind(this));
        $("input[name=groupTY]").on("change", this._changeGroupTY.bind(this));

        $("#scaleDown").on("click", function(){
            var value = parseInt($("#scaleSlider").val());
            value = (Math.ceil(value/10)-1)*10
            $("#scaleSlider").val(value).change();
        })
        $("#scaleUp").on("click", function(){
            var value = parseInt($("#scaleSlider").val());
            value = (Math.floor(value/10)+1)*10
            $("#scaleSlider").val(value).change();
        })

        $("#SFBtn01").on("click", function(){
            if($(this).hasClass("disabled")) return;
            self.canvas.changeSFMode(1);
            self._fitToPaper();
        })
        $("#SFBtn02").on("click", function(){
            self.canvas.changeSFMode(0);
            self._fitToShape();
        })

        //
        $("#params .paramText").each(function(){
            $(this).on("change", function(e){
                var val = $(this).val();
                var n = 0;
                if(val == ""){
                    n = 0;
                }else if(/\D/.test(val)){
                    val = Math.round(val * 10)/10;
                    n = val;
                    if(isNaN(n)) n = 0;
                    $(this).val(n);
                }else{
                    val = Math.round(val * 10)/10;
                    n = val;
                }
                if(n < 10) {
                    n = 10.0;
                }else if(n > 999){
                    n = 999.0;
                }
                $(this).val(n);

                var params = self.getShapeParams();
                ///*
                if(self.canvas.formatList["SF008_"+formats[self.canvas.formatIndex]]){
                    var o = self.settings.shapes[self.shapeIndex];
                    params = self.canvas.formatList["SF008_"+formats[self.canvas.formatIndex]].validate(params, prev_params, o.default_params, e.currentTarget)

                    self.setShapeParams(params);

                    $(this).blur();

                    if(params.changed){
                        $.notify({message: '入力値が制限に達しましたので補正しました。'}, {type: 'success'});
                    }
                }


                self.canvas.setShapeParams(params)
                self._updatePaperParams();
            })

        })

        $("#fitToShape").on("click", function(){
            self._fitToShape();
        });
        $("#fitToPaper").on("click", function(){
            self._fitToPaper();
        });

        // tabGroupChange
        $("input[name=group1]").on("change", function(){
            if($("input[name=group1]:checked").val() == "0"){
                $("#SFBtn01").removeClass("disabled");
                $("#print1").removeClass("disabled");
                $("#saveBtn1").removeClass("disabled");
            }else{
                if(originalImg.src){
                    $("#SFBtn01").removeClass("disabled");
                    $("#print1").removeClass("disabled");
                    $("#saveBtn1").removeClass("disabled");
                }else{
                    $("#SFBtn01").addClass("disabled");
                    $("#print1").addClass("disabled");
                    $("#saveBtn1").addClass("disabled");
                }
            }
            self._fitToShape();
        })
        $("input[name=group2]").on("change", function(){
            if(exportRoot) self.canvas.setUpScene2();
            self._updatePaperParams();
            self.checkError();
        })

        // change shapes
        $('#shapes').magnificPopup({
            type: 'inline',
            preloader: false
        });
        $(document).on('click.sf008', '.popup-modal-dismiss', function (e) {
            self.shapeIndex = prevShape;
            self.setShapeForModal(self.shapeIndex);

            e.preventDefault();
            $.magnificPopup.close();
        });
        $(document).on('click.sf008', '.popup-modal-selective', function (e) {
            prevShape = self.shapeIndex;
            self.canvas.setShapeFormat(self.shapeIndex);
            self.setShapeParams(self.settings.shapes[self.shapeIndex]);
            self._fitToShape();

            stage.update();

            e.preventDefault();
            $.magnificPopup.close();
        });

        $(window).on("resize.sf008", function(){
            $("#canvas1").attr("width", $("#canvas1").parent().width())
            var h = $(window).height() - $("#canvas1").offset().top - $("#sf008Info").height();
            //$("#canvas1").parent().width() * 452/640
            $("#canvas1").attr("height", h)

            if(exportRoot){
                exportRoot.scene1.container.x = $("#canvas1").width() * 0.5;
                exportRoot.scene1.container.y = h * 0.5;
                exportRoot.scene1.oContainer.x = $("#canvas1").width() * 0.5;
                exportRoot.scene1.oContainer.y = h * 0.5;

                exportRoot.scene2.x = exportRoot.scene1.container.x;
                exportRoot.scene2.y = exportRoot.scene1.container.y;
              /*
               exportRoot.scene2.scaleX =
               exportRoot.scene2.scaleY = $("#canvas1").width() / 1191;
               */

                sf008._changeScale();
                stage.update();
            }

        }).trigger("resize");

        $("#paramPSW").on("change", function(){
            if(!originalImg.src) {
                $("#paramPSW").val("0.0");
                $("#paramPSH").val("0.0");
                return false;
            }
            var val = $(this).val();
            var n = 0;
            if(val == ""){
                n = 0;
            }else if(/\D/.test(val)){
                n = parseFloat($(this).val()).toFixed(1);
                if(isNaN(n)) n = 0;
                $(this).val(n);
            }else{
                n = parseFloat(val).toFixed(1);
            }
            if(n < 10) {
                n = 10.0;
            }else if(n > 999){
                n = 999.0;
            }
            $(this).val(n);

            var p = parseFloat(mmToPx($("#paramPSW").val()))/imageWidth;
            imageWidth = parseFloat(mmToPx($("#paramPSW").val()));
            imageHeight = imageHeight * p;
            $("#paramPSH").val(parseFloat(pxToMm(imageHeight)).toFixed(1));

            if(original.image){
                original.scaleX = imageWidth / original.image.width;
                original.scaleY = imageHeight / original.image.height;
            }
            sf008._fitToShape();
        })
        // http://fridaynight.vnext.vn/issues/3048
        $("#showOrHideSidebarButton").on("click", function(){
            $("#canvas1").attr("width", $("#canvas1").parent().width())
            var h = $(window).height() - $("#canvas1").offset().top - $("#sf008Info").height();
            //$("#canvas1").parent().width() * 452/640
            $("#canvas1").attr("height", h)

            if(exportRoot){
                exportRoot.scene1.container.x = $("#canvas1").width() * 0.5;
                exportRoot.scene1.container.y = h * 0.5;
                exportRoot.scene1.oContainer.x = $("#canvas1").width() * 0.5;
                exportRoot.scene1.oContainer.y = h * 0.5;

                exportRoot.scene2.x = exportRoot.scene1.container.x;
                exportRoot.scene2.y = exportRoot.scene1.container.y;
                /*
                 exportRoot.scene2.scaleX =
                 exportRoot.scene2.scaleY = $("#canvas1").width() / 1191;
                 */

                sf008._changeScale();
                stage.update();
            }
        })
        $("#paramPSH").on("change", function(){
            if(!originalImg.src) {
                $("#paramPSW").val("0.0");
                $("#paramPSH").val("0.0");
                return false;
            }
            var val = $(this).val();
            var n = 0;
            if(val == ""){
                n = 0;
            }else if(/\D/.test(val)){
                n = parseFloat($(this).val()).toFixed(1);
                if(isNaN(n)) n = 0;
                $(this).val(n);
            }else{
                n = parseFloat(val).toFixed(1);
            }
            if(n < 10) {
                n = 10.0;
            }else if(n > 999){
                n = 999.0;
            }
            $(this).val(n);

            var p = parseFloat(mmToPx($("#paramPSH").val()))/imageHeight;
            imageHeight = parseFloat(mmToPx($("#paramPSH").val()));
            imageWidth = imageWidth * p;

            $("#paramPSW").val(parseFloat(pxToMm(imageWidth)).toFixed(1));
            if(original.image){
                original.scaleX = imageWidth / original.image.width;
                original.scaleY = imageHeight / original.image.height;
            }
            sf008._fitToShape();
        })

        $("#woodenFee").on("change", function(){
            var val = $(this).val();
            var n = 0;
            if(val == ""){
                n = 0;
            }else if(/\D/.test(val)){
                n = parseFloat($(this).val());
                if(isNaN(n)) n = 0;
                $(this).val(n);
            }else{
                n = parseFloat(val);
            }
            if(n < 0) {
                n = 0;
            }
            $(this).val(n);

            self._updatePaperParams();
            self.checkError();
        })

        $("#numOfLots").on("change", function(){
            var val = $(this).val();
            var n = 0;
            if(val == ""){
                n = 0;
            }else if(/\D/.test(val)){
                n = parseFloat($(this).val());
                if(isNaN(n)) n = 0;
                $(this).val(n);
            }else{
                n = parseFloat(val);
            }
            if(n < 0) {
                n = 0;
            }
            $(this).val(n);

            self._updatePaperParams();
            self.checkError();
        })

        var colorFilter = new createjs.ColorFilter(1,1,1,1,-255,-255,-255,0);

        $(document).on("click.sf008", this._blur);

        $("#print1").on('click', function(){
            var printPage = '';
            //var parent = $("#canvas").parent;

            var _scale = $("#scaleSlider").val();

            sf008.canvas.bg.visible = false;
            sf008.canvas.formatList["SF008_"+formats[sf008.canvas.formatIndex]].TY.visible = false;

            sf008.canvas.formatList["SF008_"+formats[sf008.canvas.formatIndex]].meterT.filters = [colorFilter];
            sf008.canvas.formatList["SF008_"+formats[sf008.canvas.formatIndex]].meterT.cache(0, -50, 2000, 2000)

            sf008.canvas.formatList["SF008_"+formats[sf008.canvas.formatIndex]].meterY.filters = [colorFilter];
            sf008.canvas.formatList["SF008_"+formats[sf008.canvas.formatIndex]].meterY.cache(0, -50, 2000, 2000)
            sf008._fitToShape();

            for(var i = 0; i < sf008.canvas.shapeList.length; i++){
                sf008.canvas.shapeList[i].hideFocus();
            }

            var d = new Date();
            var _m = d.getMonth() + 1;
            if(_m < 10) _m = "0" + _m;
            var _d = d.getMonth() + 1;
            if(_d < 10) _d = "0" + _d;

            var date = d.getFullYear() + "/" + _m + "/" + _d;

            var printBody = "";
            printBody += '<div id="print">';
            printBody += '<table width="100%" class="printHead row" style="font-size: 10px;">';
            printBody += '<tr>';

            printBody += '<td width="25%" class="printHead_01 col-md-3" style="padding:20px;vertical-align:top;">';
            printBody += '<h2 style="font-size: 14px;">仮図面</h2>';
            printBody += '<p>作成日: '+ date + "　" + "作成者: " + $($("#header-navbar .btn-group").find("span").get(0)).html() + '</p>';
            printBody += '</td>';

            printBody += '<td width="50%" class="printHead_02 col-md-7" style="padding:20px;vertical-align:top;">';
            printBody += '<table width="100%" style="margin-bottom: 10px;">';
            printBody += '<tr>';
            printBody += '<td width="33%"><p>案件名: '+self.settings.product_name+'</p></td>';
            printBody += '<td width="33%"><p>得意先名: '+self.settings.customer_name+'</p></td>';
            printBody += '<td width="33%"><p>製品名: '+self.settings.product_name+'</p></td>';
            printBody += '</tr>';
            if(self.getGroup1Val() == 0){
                printBody += '<tr>';
                printBody += '<td colspan="3">紙器タイプ: '+self.settings.shapes[self.shapeIndex].name+'</td>';
                printBody += '</tr>';
                printBody += '<tr>';
                printBody += '<td colspan="3">幅: '+$("#paramWidth").val()+' 奥行き: '+$("#paramDepth").val()+' 高さ: '+$("#paramHeight").val()+' フラップ:'+$("#paramFlap").val()+' 差し込み:'+$("#paramInsertion").val()+' 糊付け:'+$("#paramGluing").val()+'</td>';
                printBody += '</tr>';
            }
            printBody += '</table>';
            printBody += '</td>';

            printBody += '<td width="25%" class="printHead_03 col-md-2" style="padding:20px;">';
            printBody += '</td>';
            printBody += '</tr>';
            printBody += '</table>';

            printBody += '<div class="printBody" style="text-align:center;">';
            printBody += '<img style="height: 540px;" src="'+$("#canvas1").get(0).toDataURL()+'" />';
            printBody += '</div>';
            printBody += '</div>';

            $('body').append(printBody);
            //$('#print').append('<img src="'+$("#canvas1").get(0).toDataURL()+'" />');
            $("head").append('<style id="printStyle" type="text/css"> @page { size:landscape; } </style>')
            $('body').addClass('print-off');
            //return

            setTimeout(function(){
                window.print();

                $('#print').remove();
                $('#printStyle').remove();
                $('.print-off').removeClass('print-off');
                $("#scaleSlider").val(_scale)
                sf008.canvas.formatList["SF008_"+formats[sf008.canvas.formatIndex]].TY.visible = true;
                sf008.canvas.formatList["SF008_"+formats[sf008.canvas.formatIndex]].meterT.uncache();
                sf008.canvas.formatList["SF008_"+formats[sf008.canvas.formatIndex]].meterY.uncache();
                sf008.canvas.formatList["SF008_"+formats[sf008.canvas.formatIndex]].meterT.filters = [];
                sf008.canvas.formatList["SF008_"+formats[sf008.canvas.formatIndex]].meterY.filters = [];


                sf008.canvas.bg.visible = true;

                $(window).trigger("resize");
                setTimeout(function(){
                    $("#fitToShape").click();
                }, 100)
            }, 500)


        });
        $("#print2").on('click', function(){
            var printPage = '';
            //var parent = $("#canvas").parent;

            if(self.getGroup2Val() == 0){
                var index = parseInt($("#sheet_sizes table tr.selected").attr("data-index"));
                var w = self.settings.sheet_sizes[index].width;
                var h = self.settings.sheet_sizes[index].height
                var g = self.settings.sheet_sizes[index].grain;
                var n = self.settings.sheet_sizes[index].name;
            }else{
                var w = self.$input_ssw.val();
                var h = self.$input_ssh.val();
                var g = parseInt($("input[name=groupCustomTY]:checked").val());
                var n = "得寸サイズ";
            }

            var _scale = $("#scaleSlider").val();

            sf008.canvas.bg.visible = false;
            sf008.canvas.paper.filters = [colorFilter];
            sf008.canvas.paper.cache(0, 0, mmToPx(w), mmToPx(h))
            //sf008.canvas.paper.visible = false;

            for(var i = 0; i < sf008.canvas.shapeList.length; i++){
                sf008.canvas.shapeList[i].hideFocus();
            }

            //図面サイズに合わせる
            $("#canvas1").attr("width", parseFloat(w) * 2);
            $("#canvas1").attr("height", parseFloat(h) * 2);

            sf008._fitToPaper(true);

            var d = new Date();
            var _m = d.getMonth() + 1;
            if(_m < 10) _m = "0" + _m;
            var _d = d.getMonth() + 1;
            if(_d < 10) _d = "0" + _d;

            var date = d.getFullYear() + "/" + _m + "/" + _d;

            var printBody = "";
            printBody += '<div id="print">';
            printBody += '<table width="100%" style="font-size: 10px;">';
            printBody += '<tr>';
            printBody += '<td width="25%" style="padding:20px; vertical-align: top;">';
            printBody += '<h2 style="font-size: 14px;">面付図面</h2>';
            printBody += '<p>作成日: '+ date + "　" + "作成者: " + $($("#header-navbar .btn-group").find("span").get(0)).html() + '</p>';
            printBody += '</td>';

            printBody += '<td width="50%" class="printHead_02 col-md-7" style="padding:20px; vertical-align: top;">';
            printBody += '<table width="100%" style="margin-bottom: 10px;">';
            printBody += '<tr>';
            printBody += '<td width="33%"><p>案件名: '+self.settings.product_name+'</p></td>';
            printBody += '<td width="33%"><p>得意先名: '+self.settings.customer_name+'</p></td>';
            printBody += '<td width="33%"><p>製品名: '+self.settings.product_name+'</p></td>';
            printBody += '</tr>';
            if(self.getGroup1Val() == 0){
                printBody += '<tr>';
                printBody += '<td colspan="3">紙器タイプ: '+self.settings.shapes[self.shapeIndex].name+'</td>';
                printBody += '</tr>';
                printBody += '<tr>';
                printBody += '<td colspan="3">幅: '+$("#paramWidth").val()+' 奥行き: '+$("#paramDepth").val()+' 高さ: '+$("#paramHeight").val()+' フラップ:'+$("#paramFlap").val()+' 差し込み:'+$("#paramInsertion").val()+' 糊付け:'+$("#paramGluing").val()+'</td>';
                printBody += '</tr>';
            }
            printBody += '</table>';
            printBody += '<table width="100%">';
            if(self.getGroup2Val() == 0){
                var o = self.settings.papers_byId[parseInt($("#paper_names").val())];
                var n = o.name + " " + o.basis_weights_byId[parseInt($("#paper_weights").val())].value + "g （建値"+$("#paperPrice span").html()+"円）";
                printBody += '<tr>';
                printBody += '<td>材料: '+n+'</td>';
                printBody += '</tr>';
            }
            printBody += '<tr>';

            printBody += '<td>断裁サイズ: '+n + ' （' + w + ' x ' + h + '） '+ ((g == 0) ? 'T目' : 'Y目') +'</td>';
            printBody += '</tr>';
            printBody += '<tr>';
            printBody += '<td>面付け数: '+self.canvas.shapeList.length+'</td>';
            printBody += '</tr>';
            printBody += '</table>';
            printBody += '</td>';

            printBody += '<td class="printHead_03 col-md-3" style="padding:20px; vertical-align: top;">';
            printBody += '</td>';
            printBody += '</table>';

            printBody += '<div class="printBody" style="text-align:center;position:relative;">';
            printBody += '<span id="unitT" style="position:absolute;top:50%;left:50%;margin-left:-'+(mmToPx(w)*0.25*($("#scaleSlider").val()/100)+50)+'px;">475</span>';
            printBody += '<img style="height: 540px;" src="'+$("#canvas1").get(0).toDataURL()+'" />';
            printBody += '<p style="display:block; margin-top:10px;"><span id="unitY">650</span></p>';
            printBody += '</div>';
            printBody += '</div>';

            $('body').append(printBody);
            //$('#print').append('<img src="'+$("#canvas1").get(0).toDataURL()+'" />');

            $("head").append('<style id="printStyle" type="text/css"> @page { size:landscape; } </style>')
            $('body').addClass('print-off');
            //return
            setTimeout(function(){
                window.print();

                $('#print').remove();
                $('#printStyle').remove();
                $('.print-off').removeClass('print-off');
                $("#scaleSlider").val(_scale)
                sf008.canvas.paper.uncache();
                sf008.canvas.paper.filters = [];
                sf008.canvas.paper.visible = true;
                sf008.canvas.bg.visible = true;

                $(window).trigger("resize");
                setTimeout(function(){
                    $("#fitToPaper").click();
                }, 100)
            }, 500)

        });

        // change style
        $("input[name=group1]").on("change", function(){
            $("#tabGroup1-header li").removeClass("active");
            $($("#tabGroup1-header li").get($("input[name=group1]:checked").val())).addClass("active");
        })
        $("input[name=group2]").on("change", function(){
            $("#tabGroup2-header li").removeClass("active");
            $($("#tabGroup2-header li").get($("input[name=group2]:checked").val())).addClass("active");

        })

        $('#drop_zone').on('dragover', this.handleDragOver.bind(this));
        $('#drop_zone').on('drop', this.handleFileSelect.bind(this));
    }

    SF008.prototype._blur = function(e){
        if(e.target.localName == "canvas") return;
        if(sf008.canvas){
            for(var i = 0; i < sf008.canvas.shapeList.length; i++){
                sf008.canvas.shapeList[i].hideFocus();
            }
        }
    }

    SF008.prototype._changeScale = function(){
        if(!exportRoot) return;
        var _scale = $("#scaleSlider").val();
        $("#scaleSliderValue").html(_scale + " %");
        this.canvas._changeScale(_scale);
    }

    SF008.prototype._changeGroupTY = function(){
        this._updatePaperParams();
        this.canvas._changeGroupTY();
    }

    SF008.prototype._fitToPaper = function(bool){
        if(!exportRoot) return;
        var w = $("#canvas1").width() * 0.8;
        var h = $("#canvas1").height() * 0.8;
        //alert(bool)
        if(bool){
            w = $("#canvas1").width();
            h = $("#canvas1").height();
        }

        var o = this.getPaperParams();

        var _w = mmToPx(o.w);
        var _h = mmToPx(o.h);

        if(w/h > _w/_h){
            var s = h/_h;
        }else{
            var s = w/_w;
        }

        exportRoot.x = exportRoot.y = 0;

        exportRoot.scene2.container.x = -_w * 0.5;
        exportRoot.scene2.container.y = -_h * 0.5;
        if(bool){
            exportRoot.scene2.x = w * 0.5;
            exportRoot.scene2.y = h * 0.5;
        }

        $("#scaleSlider").val(parseInt(s * 100)).trigger("change");

        stage.update();
    }
    SF008.prototype._fitToShape = function(){
        if(!exportRoot) return;
        var params = this.getShapeParams();
        this.canvas.setShapeParams(params);
        this._updatePaperParams();
        this.canvas.fitToShape();
    }




    SF008.prototype.getGroup1Val = function(){
        return parseInt($("input[name=group1]:checked").val());
    }
    SF008.prototype.getGroup2Val = function(){
        return parseInt($("input[name=group2]:checked").val());
    }
    SF008.prototype.getShapeParams = function(){
        var o = this.settings.shapes[this.shapeIndex];
        var w = parseFloat(parseFloat($("#paramWidth").val()).toFixed(1));
        var d = parseFloat(parseFloat($("#paramDepth").val()).toFixed(1));
        var h = parseFloat(parseFloat($("#paramHeight").val()).toFixed(1));
        var f = parseFloat(parseFloat($("#paramFlap").val()).toFixed(1));
        var i = parseFloat(parseFloat($("#paramInsertion").val()).toFixed(1));
        var g = parseFloat(parseFloat($("#paramGluing").val()).toFixed(1));

        if(this.getGroup1Val() == 0){
            if(o.default_params.min_width != null && w < o.default_params.min_width){
                w = o.default_params.min_width;
                $("#paramWidth").val(parseFloat(w).toFixed(1))
            }
            if(o.default_params.max_width != null && w > o.default_params.max_width){
                w = o.default_params.max_width;
                $("#paramWidth").val(parseFloat(w).toFixed(1))
            }

            if(o.default_params.min_height != null && h < o.default_params.min_height){
                h = o.default_params.min_height;
                $("#paramHeight").val(parseFloat(h).toFixed(1))
            }
            if(o.default_params.max_height != null && h > o.default_params.max_height){
                h = o.default_params.max_height;
                $("#paramHeight").val(parseFloat(h).toFixed(1))
            }

            if(o.default_params.min_depth != null && d < o.default_params.min_depth){
                d = o.default_params.min_depth;
                $("#paramDepth").val(parseFloat(d).toFixed(1))
            }
            if(o.default_params.max_depth != null && d > o.default_params.max_depth){
                d = o.default_params.max_depth;
                $("#paramDepth").val(parseFloat(d).toFixed(1))
            }
        }


        if(this.getGroup1Val() == 0){
            return {
                width : mmToPx(w),
                depth : mmToPx(d),
                height : mmToPx(h),
                flap : mmToPx(f),
                insertion: mmToPx(i),
                gluing_part: mmToPx(g),
                //insertion: mmToPx(parseInt($("#paramInsertion").val())),
                width_mm : (w),
                depth_mm : (d),
                height_mm : (h),
                flap_mm : (f),
                insertion_mm : (i),
                gluing_part_mm : (g)
            }
        }else{
            return {

            }
        }
    }
    SF008.prototype.getPaperParams = function(_index){
        if(this.getGroup2Val() == 0){
            var index = parseInt($("#sheet_sizes tr.selected").attr("data-index"));
            if(!isNaN(_index)) index = _index;
            //var index =
            var w = this.settings.sheet_sizes[index].width;
            var h = this.settings.sheet_sizes[index].height;
            var g = this.settings.sheet_sizes[index].grain;
        }else{
            var w = parseFloat(this.$input_ssw.val());
            var h = parseFloat(this.$input_ssh.val());
            var g = parseInt($("input[name=groupCustomTY]:checked").val());
        }

        return {
            w : w,
            h : h,
            g : g
        }
    }

    SF008.prototype.handleFileSelect = function(evt) {
        evt = evt.originalEvent;
        evt.stopPropagation();
        evt.preventDefault();

        var files = evt.dataTransfer.files;

        var reader = new FileReader();
        var f = files[0];
        var extChecks = f.name.split(".");

        if(!String(extChecks[extChecks.length-1]).toLowerCase().match(/png/) || !(f.size < 5 * 1000 * 1000)){
            window.alert("規定のファイルを選択してください。\nファイル形式：PNG\nサイズ：5MBまで");
            return false;
        }
        reader.onload = (function(theFile) {
            return function(e) {
                reader.onload = null;
                originalImg.src =  e.target.result;
                original.image = originalImg;

                var __w = original.image.width;
                var __h = original.image.height;
                if(__w > __h && __w > 999){
                    __h = __h * 999/__w;
                    __w = 999;
                }else if(__h > __w && __h > 999){
                    __w = __w * 999/__h;
                    __h = 999;
                }

                original.regX = original.image.width * 0.5;
                original.regY = original.image.height * 0.5;

                imageWidth = __w;
                imageHeight = __h;

                $("#paramPSW").val(parseFloat(pxToMm(__w)).toFixed());
                $("#paramPSH").val(parseFloat(pxToMm(__h)).toFixed());

                original.scaleX = imageWidth / original.image.width;
                original.scaleY = imageHeight / original.image.height;

                $("#SFBtn01").removeClass("disabled");
                $("#print1").removeClass("disabled");

                sf008._fitToShape();
                sf008.saveShapeImage(originalImg);
                sf008.canvas.clearScene2();
            };
        })(f);
        reader.readAsDataURL(f);
    }

    SF008.prototype.handleDragOver = function(evt) {
        evt = evt.originalEvent;
        evt.stopPropagation();
        evt.preventDefault();
        if(evt.dataTransfer) evt.dataTransfer.dropEffect = 'copy';
    }

  /*
   削除処理
   */
    SF008.prototype.destroy = function(){
        $("#SFBtn02").trigger("click");

        // unbindEventAll
        $("#saveBtn1").off("click");
        $("#saveBtn2").off("click");
        $("#shapeList tr").off("click");
        $("#paper_names").off("change");
        $("#paper_weights").off("change");
        $("#paramSSW").off("change");
        $("#paramSSH").off("change");
        $("input[name=groupCustomTY]").off("change")
        $("input[name=group1]").off("change");
        $("input[name=group2]").off("change");
        $(originalImg).off("load");
        $("#sheet_sizes table tr").off("click");
        $("#scaleSlider").off("input change");
        $("input[name=groupTY]").off("change");
        $("#SFBtn01").off("click");
        $("#SFBtn02").off("click");
        $("#params .paramText").each(function(){
            $(this).off("change");
        })
        $(document).off("click.sf008");
        $("#fitToPaper").off("click");
        $("input[name=group1]").off("change");
        $("input[name=group2]").off("change");
        $(document).off('click.sf008', '.popup-modal-dismiss');
        $(document).off('click.sf008', '.popup-modal-selective');
        $(window).off("resize.sf008");
        $("#paramPSW").off("change");
        $("#paramPSH").off("change");
        $("#print1").off('click');
        $("#print2").off('click');

        $('#drop_zone').off('dragover');
        $('#drop_zone').off('drop');
        $("#scaleDown").off("click");
        $("#scaleUp").off("click");

        //
        this.settings = null;
        //
        prevShape = this.shapeIndex = 0;
        this.initialized = false;



        this.canvas.destory();
        //
        //
        //
        this.canvas = null;
        $(this.canvas).off("complete");

    }


    return SF008;
})();



var sf008;
var SF008Api = {
    init: function (productId) {
        if (sf008 != undefined) {
            try {
                sf008.destroy();
            } catch (e) {
            }
        }
        sf008 = new SF008();
        sf008.init(productId);
    },
    destroy: function() {
        if (sf008 != undefined) {
            try {
                sf008.destroy();
            } catch (e) {
            }
        }
    }
}; 
