
__extend = function (D, B) {
  function ___() { this.constructor = D; }
  ___.prototype = B.prototype;
  D.prototype = new ___();
};


var dpi = 72;//25.4;//72;
var pxRate = 25.4 / dpi;

function mmToPx(mm){
  return mm/pxRate;
}
function pxToMm(px){
  var dpi = 72;//25.4;//72;
  var pxRate = 25.4 / dpi;
  return px * pxRate;
}



//
//
//
var NSGrid = NineScaleGrid = (function(){

  var repeat = [
    "no-repeat",
    "no-repeat",
    "no-repeat",
    
    "no-repeat",
    "no-repeat",
    "no-repeat",

    "no-repeat",
    "no-repeat",
    "no-repeat"    
  ]

  function NineScaleGrid(obj, debug){
    this.obj = obj;
    this.obj.regX = 
    this.obj.regY = 0;
    this.debugMode = debug;
    

    this.bitmap = obj.getChildAt(0);
    var frame = this.bitmap._currentFrame;
    this.image = this.bitmap.spriteSheet._frames[frame].image;//this.bitmap.image;
    this.imageRect = this.bitmap.spriteSheet._frames[frame].rect;
    
    this.rects = [
      //
      [0, 0, obj.t1.x, obj.y1.y],
      [obj.t1.x, 0, obj.t2.x - obj.t1.x, obj.y1.y],
      [obj.t2.x, 0, this.imageRect.width * 0.5 - obj.t2.x, obj.y1.y],
      //
      [0, obj.y1.y, obj.t1.x, obj.y2.y - obj.y1.y],
      [obj.t1.x, obj.y1.y, obj.t2.x - obj.t1.x, obj.y2.y - obj.y1.y],
      [obj.t2.x, obj.y1.y, this.imageRect.width * 0.5 - obj.t2.x, obj.y2.y - obj.y1.y],
      //
      [0, obj.y2.y, obj.t1.x, this.imageRect.height * 0.5 - obj.y2.y],
      [obj.t1.x, obj.y2.y, obj.t2.x - obj.t1.x, this.imageRect.height * 0.5 - obj.y2.y],
      [obj.t2.x, obj.y2.y, this.imageRect.width * 0.5 - obj.t2.x, this.imageRect.height * 0.5 - obj.y2.y]
    ]
    
    this.patterns = [];
    this.shapes = [];
    this.created = false;

    var count = 0;
    var self = this;
    for(var i = 0; i < this.rects.length; i++){
      var canvas = $("<canvas></canvas>");
      canvas.attr("width", this.rects[i][2] * 2);
      canvas.attr("height", this.rects[i][3] * 2);

      if(this.rects[i][2] <= 0) canvas.attr("width", 1);
      if(this.rects[i][3] <= 0) canvas.attr("height", 1);

      var ctx = canvas.get(0).getContext("2d");
      
      
      var w = this.rects[i][2] * 2;
      var h = this.rects[i][3] * 2;
      
      ctx.drawImage(
        this.image,
        this.imageRect.x + this.rects[i][0] * 2, this.imageRect.y + this.rects[i][1] * 2, w * 2, h * 2,
        0, 0, w * 2, h * 2
      );
      

      var source = canvas.get(0).toDataURL();
      var img = new Image();
      $(img).on("error", (function(src){
        return function(){
        }
      })(source))
      $(img).on("load", (function(index, image){
        return function(){
          self.patterns[index] = image;
          count++;
          if(count == self.rects.length){
            self.created = true;
          }
        }
      })(i, img))
      img.src = source;
      
      //$("body").append(img)
      self.patterns.push(canvas);
      
      var s = new createjs.Shape();
      obj.addChild(s);
      this.shapes.push(s);
    }
    
    obj.t1.visible = 
    obj.t2.visible = 
    obj.y1.visible = 
    obj.y2.visible = 
    this.bitmap.visible = false;
    
    this.width = NaN;
    this.height = NaN;
  }

  NineScaleGrid.prototype.setSize = function(w, h){
    if(!this.created){
      var self = this;
      clearTimeout(this.timerID);
      this.timerID = setTimeout(function(){
        self.setSize(w, h);
      }, 500)
      return;
    }else{
    }
    
    this.width = w;
    this.height = h;
    
    for(var i = 0; i < this.rects.length; i++){
      var s = this.shapes[i];
      var g = s.graphics;

      var xi = i % 3;
      var yi = parseInt(i / 3);
      
      var _x = 0;
      var _y = 0;
      var _w = 0;
      var _h = 0;

      var _d = 2;
      if(xi == 0){
        _x = -1; //???
        _w = Math.floor(this.rects[0][2]) +_d * 0.5;
      }else if(xi == 1){
        _x = (this.rects[0][2]-_d*0.5);
        _w = (w - this.rects[0][2] - this.rects[2][2] +_d * 0.5);
      }else if(xi == 2){
        _x = (w - this.rects[2][2]-_d*0.5);
        _w = (this.rects[2][2]+ _d * 0.5);
      }

      if(yi == 0){
        _y = 0;
        _h = (this.rects[0][3]);
      }else if(yi == 1){
        _y = (this.rects[0][3] - _d * 0.5);
        _h = (h - this.rects[0][3] - this.rects[6][3] + _d * 0.5);
      }else if(yi == 2){
        _y = (h - this.rects[6][3] - _d * 0.5);
        _h = (this.rects[6][3]+ _d * 0.5);
      }

      var sx = (_w)/this.rects[i][2] * 0.5;
      var sy = (_h)/this.rects[i][3] * 0.5;
      

      var m = new createjs.Matrix2D(sx, 0, 0, sy, _x, _y);
      
      g.clear();
      if(this.debugMode) g.beginStroke("#F00");
    
      g.beginBitmapFill(this.patterns[i], repeat[i], m);
      g.drawRect(_x, _y, _w, _h+1);
    }
    
    $(this).trigger("updateCache");

  }

  NineScaleGrid.prototype.setPosition = function(x, y){
    this.obj.x = x;
    this.obj.y = y;
  }
  NineScaleGrid.prototype.debug = function(x, y){
    this.patterns.forEach(function(el){
      $("body").append(el);
    })
  }

  return NineScaleGrid;
})();


var NSGFormat = (function(){

  function NSGFormat(displayObj){

    if(displayObj.obj){
      this.obj = displayObj.obj;
      this.TY = displayObj.TY;

      this.baseX = this.obj.x;
      this.baseY = this.obj.y;

      this.meterT = displayObj.meterT;
      this.meterY = displayObj.meterY;
    }else{
      this.obj = displayObj;
      //this.controller = displayObj.controller;
      this.baseX = 0//this.obj.x;
      this.baseY = 0//this.obj.y;
    }

    this.currentParams = {

    }
    this.width = 0;
    this.height = 0;
    

    this.bg = new createjs.Shape();
    this.border = new createjs.Shape();
    this.border.visible = false;
    //this.obj.addChildAt(this.border, 0);
    //this.obj.addChildAt(this.bg, 0);
    this.obj.set({
      hitArea: this.bg
    })
  
    this.isFocus = false;

    this.handleDown = this.handleDown.bind(this)
    this.handleMove = this.handleMove.bind(this)
    this.handleUp = this.handleUp.bind(this)

    this.grid = [];

    this.setup();
    this._setup();
  }

  NSGFormat.prototype.setup = function(){
    this.data = [
      "", "p01", "", "", "",
      "", "p02", "", "", "",
      "p05", "p06", "p07", "p08", "p09",
      "", "p10", "p11", "p12", "p13" 
    ]
    this.data_o = [
      "p03", "p04"
    ]

    var s1 = 15;
    var s2 = 46;
    this.ws = [s1, "width_mm", "depth_mm", "width_mm", "depth_mm"];
    this.hs = ["flap_mm", "depth_mm", "height_mm", s2];

    this.os = [
      {
        x : [s1, "width_mm"],
        y : ["flap_mm", "depth_mm"],
        w : "depth_mm",
        h : 30,
        regX : 0,
        regY : 85
      },
      {
        x : [s1, "width_mm", "depth_mm", "width_mm"],
        y : ["flap_mm", "depth_mm"],
        w : "depth_mm",
        h : 30,
        regX : 0,
        regY : 85
      }
    ]
  }

  NSGFormat.prototype._setup = function(){
    var self = this;
    this.data.forEach(function(el){
      if(el != ""){
        var g = new NSGrid(self.obj[el]);
        $(g).on("updateCache", function(){
          self.obj.cache(-5, -5, self.width+10, self.height+10);
        })
        self.grid.push(g);
      }
    })
    this.data_o.forEach(function(el){
      if(el != ""){
        var g = new NSGrid(self.obj[el]);
        $(g).on("updateCache", function(){
          self.obj.cache(-5, -5, self.width+10, self.height+10);
        })
        //g.debug();
        self.grid.push(g);
      }
    })
  }

  NSGFormat.prototype.remove = function(){
    this.obj.removeChild(this.bg);
    this.obj.removeChild(this.border);
    
    this.bg.graphics.clear();
    this.border.graphics.clear();
    
    this.obj = null;
  }

  NSGFormat.prototype.addDragEvent = function(b){
    this.obj.addEventListener("mousedown", this.handleDown);
    if(b){
      this.obj.addEventListener("pressmove", this.handleMove);
    }
    this.obj.addEventListener("pressup", this.handleUp, false);
  }
  NSGFormat.prototype.removeDragEvent = function(){
    this.obj.removeEventListener("mousedown", this.handleDown);
    this.obj.removeEventListener("pressmove", this.handleMove);
    this.obj.removeEventListener("pressup", this.handleUp);
  }

  var dragPointX = 0;
  var dragPointY = 0;
  
  NSGFormat.prototype.handleDown = function(event) {
    this.isMouseDown = true;
    dragPointX = this.obj.stage.mouseX;
    dragPointY = this.obj.stage.mouseY;
    
    this.showFocus();
  }
  NSGFormat.prototype.handleMove = function(event) {
    var s = parseFloat($("#scaleSlider").val())/100;
    var dx = (this.obj.stage.mouseX - dragPointX) * 1/s;
    var dy = (this.obj.stage.mouseY - dragPointY) * 1/s;
    
    //
    // this.obj.parent.x += dx;
    // this.obj.parent.y += dy;
    //

    dragPointX = this.obj.stage.mouseX;
    dragPointY = this.obj.stage.mouseY;
    $(this).trigger("move", [dx, dy]);
  }
  NSGFormat.prototype.handleUp = function(event) {
    this.isMouseDown = false;
    //this.hideFocus();
    event.stopPropagation();
      event.preventDefault();
      return false;
  }

  NSGFormat.prototype.showFocus = function() {
    this.isFocus = true;
    this.border.visible = true;
    $(this).trigger("focus");
  }
  NSGFormat.prototype.hideFocus = function() {
    this.isFocus = false;
    this.border.visible = false;
  }

  NSGFormat.prototype.update = function(params){
    this.width = 0;
    this.width_mm = 0;
    for(var i = 0; i < this.ws.length; i++){
      if(!isNaN(this.ws[i])){
        this.width += mmToPx(this.ws[i]);
        this.width_mm += this.ws[i];
      }else{
        if(Array.isArray(this.ws[i])){
          var n = 0;
          var n_mm = 0;
          for(var j = 0; j < this.ws[i].length; j++){
            if(!isNaN(this.ws[i][j])){
              n += mmToPx(this.ws[i][j]);
              n_mm += this.ws[i][j]
            }else{
              n += params[this.ws[i][j].replace("_mm", "")];
              n_mm += params[this.ws[i][j]];
            }
          }
          this.width += n;
          this.width_mm += n_mm;
        }else{
          this.width += params[this.ws[i].replace("_mm", "")];
          this.width_mm += params[this.ws[i]];
        }
      }
    }

    this.height = 0;
    this.height_mm = 0;
    for(var i = 0; i < this.hs.length; i++){
      if(!isNaN(this.hs[i])){
        this.height += mmToPx(this.hs[i]);
        this.height_mm += this.hs[i];
      }else{
        if(Array.isArray(this.hs[i])){
          var n = 0;
          var n_mm = 0;
          for(var j = 0; j < this.hs[i].length; j++){
            if(!isNaN(this.hs[i][j])){
              n += mmToPx(this.hs[i][j]);
              n_mm += this.hs[i][j]
            }else{
              n += params[this.hs[i][j].replace("_mm", "")];
              n_mm += params[this.hs[i][j]];
            }
          }
          this.height += n;
          this.height_mm += n_mm;
        }else{
          this.height += params[this.hs[i].replace("_mm", "")];
          this.height_mm += params[this.hs[i]];
        }
      }
    }
  }

  NSGFormat.prototype._update = function(params){
    var self = this;
    var xr = this.ws.length;
    var yr = this.hs.length;
    var count = 0;
    this.data.forEach(function(el, i){
      if(el != ""){
        var g = self.grid[count];
        var xi = i%xr;
        var yi = parseInt(i/xr);
        var x = 0;
        var y = 0;
        var w = 0;//self.ws[xi];
        var h = 0;//self.hs[yi];

        
        if(!isNaN(self.ws[xi])){
          w = mmToPx(self.ws[xi]);
        }else{
          if(Array.isArray(self.ws[xi])){
            var n = 0;
            for(var t = 0; t < self.ws[xi].length; t++){
              if(!isNaN(self.ws[xi][t])){
                n += mmToPx(self.ws[xi][t])
              }else{
                n += params[self.ws[xi][t].replace("_mm", "")];
              }
            }
            w = n;
          }else{
            w = params[self.ws[xi].replace("_mm", "")];
          }
        }
        if(!isNaN(self.hs[yi])){
          h = mmToPx(self.hs[yi]);
        }else{
          if(Array.isArray(self.hs[yi])){
            var n = 0;
            for(var t = 0; t < self.hs[yi].length; t++){
              if(!isNaN(self.hs[yi][t])){
                n += mmToPx(self.hs[yi][t])
              }else{
                n += params[self.hs[yi][t].replace("_mm", "")];
              }
            }
            h = n;
          }else{
            h = params[self.hs[yi].replace("_mm", "")];
          }
        }

        for(var j = 0; j < xi; j++){
          if(!isNaN(self.ws[j])){
            x += mmToPx(self.ws[j]);
          }else{
            if(Array.isArray(self.ws[j])){
              var n = 0;
              for(var t = 0; t < self.ws[j].length; t++){
                if(!isNaN(self.ws[j][t])){
                  n += mmToPx(self.ws[j][t])
                }else{
                  n += params[self.ws[j][t].replace("_mm", "")];
                }
              }
              x += n;
            }else{
              x += params[self.ws[j].replace("_mm", "")];
            }
          }
        }
        for(var j = 0; j < yi; j++){
          if(!isNaN(self.hs[j])){
            y += mmToPx(self.hs[j]);
          }else{
            if(Array.isArray(self.hs[j])){
              var n = 0;
              for(var t = 0; t < self.hs[j].length; t++){
                if(!isNaN(self.hs[j][t])){
                  n += mmToPx(self.hs[j][t])
                }else{
                  n += params[self.hs[j][t].replace("_mm", "")];
                }
              }
              y += n;
            }else{
              y += params[self.hs[j].replace("_mm", "")];
            }
          }
        }

        //g.obj.uncache();
        g.setPosition(x, y);
        g.setSize(w, h);
        //g.obj.cache(0, 0, w, h);

        
        count++;
      }
    })

    this.data_o.forEach(function(el, i){
      if(el != ""){
        var g = self.grid[count];
        var x = 0;
        var y = 0;
        var w = 0;//self.ws[xi];
        var h = 0;//self.hs[yi];

        if(!isNaN(self.os[i].regX)){
          g.obj.regX = self.os[i].regX;
        }else{
          if(Array.isArray(self.os[i].regX)){
            var regX = 0;
            for(var j = 0; j < self.os[i].regX.length; j++){
              if(!isNaN(self.os[i].regX[j])){
                regX += mmToPx(self.os[i].regX[j]);
              }else{
                regX += params[self.os[i].regX[j].replace("_mm", "")];
              }
            }
            g.obj.regX = regX;
          }else{
            g.obj.regX = params[self.os[i].regX.replace("_mm", "")];
          }
        }
        if(!isNaN(self.os[i].regY)){
          g.obj.regY = self.os[i].regY;
        }else{
          if(Array.isArray(self.os[i].regY)){
            var regY = 0;
            for(var j = 0; j < self.os[i].regY.length; j++){
              if(!isNaN(self.os[i].regY[j])){
                regY += mmToPx(self.os[i].regY[j]);
              }else{
                regY += params[self.os[i].regY[j].replace("_mm", "")];
              }
            }
            g.obj.regY = regY;
          }else{
            g.obj.regY = params[self.os[i].regY.replace("_mm", "")];
          }
        }
        
        for(var j = 0; j < self.os[i].w.length; j++){
          if(!isNaN(self.os[i].w[j])){
            w += mmToPx(self.os[i].w[j]);
          }else{
            w += params[self.os[i].w[j].replace("_mm", "")];
          }
        }
        for(var j = 0; j < self.os[i].h.length; j++){
          if(!isNaN(self.os[i].h[j])){
            h += mmToPx(self.os[i].h[j]);
          }else{
            h += params[self.os[i].h[j].replace("_mm", "")];
          }
        }

        for(var j = 0; j < self.os[i].x.length; j++){
          if(!isNaN(self.os[i].x[j])){
            x += mmToPx(self.os[i].x[j]);
          }else{
            x += params[self.os[i].x[j].replace("_mm", "")];
          }
        }
        for(var j = 0; j < self.os[i].y.length; j++){
          if(!isNaN(self.os[i].y[j])){
            y += mmToPx(self.os[i].y[j]);
          }else{
            y += params[self.os[i].y[j].replace("_mm", "")];
          }
        }

        g.setPosition(x, y);
        g.setSize(w, h);
        
        count++;
      }
    })
    this.obj.cache(-5, -5, this.width+10, this.height+10);
  }

  NSGFormat.prototype.setMeterPosition = function(params){
    var arr1 = [];
    var arr2 = [];
    for(var i = 0; i < this.ws.length; i++){
      if(!isNaN(this.ws[i])){
        arr1.push(mmToPx(this.ws[i]));
        arr2.push(this.ws[i]);
      }else{
        if(Array.isArray(this.ws[i])){
          var n = 0;
          var n_mm = 0;
          for(var j = 0; j < this.ws[i].length; j++){
            if(!isNaN(this.ws[i][j])){
              n += mmToPx(this.ws[i][j]);
              n_mm += this.ws[i][j]
            }else{
              n += params[this.ws[i][j].replace("_mm", "")];
              n_mm += params[this.ws[i][j]];
            }
          }
          arr1.push(n);
          arr2.push(n_mm);
        }else{
          arr1.push(params[this.ws[i].replace("_mm", "")]);
          arr2.push(params[this.ws[i]]);
        }
        
      }
    }
    this._setMeterPosition(
      "Y",
      arr1,
      arr2,
      this.width,
      this.width_mm
    );

    var arr1 = [];
    var arr2 = [];
    for(var i = 0; i < this.hs.length; i++){
      if(!isNaN(this.hs[i])){
        arr1.push(mmToPx(this.hs[i]));
        arr2.push(this.hs[i]);
      }else{
        if(Array.isArray(this.hs[i])){
          var n = 0;
          var n_mm = 0;
          for(var j = 0; j < this.hs[i].length; j++){
            if(!isNaN(this.hs[i][j])){
              n += mmToPx(this.hs[i][j]);
              n_mm += this.hs[i][j]
            }else{
              n += params[this.hs[i][j].replace("_mm", "")];
              n_mm += params[this.hs[i][j]];
            }
          }
          arr1.push(n);
          arr2.push(n_mm);
        }else{
          arr1.push(params[this.hs[i].replace("_mm", "")]);
          arr2.push(params[this.hs[i]]);
        }
        
      }
    }
    this._setMeterPosition(
      "T",
      arr1,
      arr2,
      this.height,
      this.height_mm
    );
  }

  NSGFormat.prototype._setMeterPosition = function(TY, data, data_mm, width, width_mm){

    if(TY == "Y"){
      if(this.meterY){
        this.meterY.x = this.obj.x;
        this.meterY.y = this.obj.y + this.height + 20;
        var p = 0;
        for(var i = 2; i<= 10; i++){
          if(i <= data.length + 1){
            this.meterY["l" + i.toString()].x = p + data[i - 2];
            p = this.meterY["l" + i.toString()].x;
          }else{
            this.meterY["l" + i.toString()].visible = false;
          }
          
        }
        this.meterY.l10.x = p;
        this.meterY.l10.visible = true;
        

        this.meterY.al1.children[0].graphics
        .clear()
        .beginFill("#FFFFFF")
        .drawRect(0, 0, width, 1);
        this.meterY.al2.children[0].graphics
        .clear()
        .beginFill("#FFFFFF")
        .drawRect(0, 0, width, 1);


        for(var i = 1; i<= 9; i++){
          if(i <= data.length + 1){
            this.meterY["t" + i.toString()].width = data[i - 1];
            this.meterY["t" + i.toString()].x = this.meterY["l" + i.toString()].x + this.meterY["t" + i.toString()].width * 0.5;
            if(data_mm[i - 1]) this.meterY["t" + i.toString()].text = (Math.ceil(data_mm[i - 1] * 10)/10).toFixed(1);
            else this.meterY["t" + i.toString()].text = ""
          }else{
            this.meterY["t" + i.toString()].visible = false;
          }
        }
        this.meterY.t_all1.width = width;
        this.meterY.t_all1.x = this.meterY.t_all1.width * 0.5;
        this.meterY.t_all1.text = (Math.ceil(width_mm*10)/10).toFixed(1);;
      }
    }
     if(TY == "T"){
      if(this.meterT){
        this.meterT.x = this.obj.x - 60;
        this.meterT.y = this.obj.y;
        var p = 0;
        for(var i = 2; i<= 10; i++){
          if(i <= data.length + 1){
            this.meterT["l" + i.toString()].x = p + data[i - 2];
            p = this.meterT["l" + i.toString()].x
          }else{
            this.meterT["l" + i.toString()].visible = false;
          }
          
        }
        this.meterT.l10.x = p;
        this.meterT.l10.visible = true;

        this.meterT.al1.children[0].graphics
        .clear()
        .beginFill("#FFFFFF")
        .drawRect(0, 0, width, 1);
        this.meterT.al2.children[0].graphics
        .clear()
        .beginFill("#FFFFFF")
        .drawRect(0, 0, width, 1);


        for(var i = 1; i<= 9; i++){
          if(i <= data.length + 1){
            this.meterT["t" + i.toString()].width = data[i - 1];
            this.meterT["t" + i.toString()].x = this.meterT["l" + i.toString()].x + this.meterT["t" + i.toString()].width * 0.5;
            if(data_mm[i - 1]) this.meterT["t" + i.toString()].text = (Math.ceil(data_mm[i - 1] * 10)/10).toFixed(1);
            else  this.meterT["t" + i.toString()].text = "";
        
          }else{
            this.meterT["t" + i.toString()].visible = false;
          }
        }
        this.meterT.t_all1.width = width;
        this.meterT.t_all1.x = this.meterT.t_all1.width * 0.5;
        this.meterT.t_all1.text = (Math.ceil(width_mm*10)/10).toFixed(1);
      }
    }
  }

  NSGFormat.prototype.setScale = function(s){
    for(var i = 1; i<= 9; i++){
      this.meterT["t" + i.toString()].font = parseInt(14/s) + "px Arial"
      this.meterY["t" + i.toString()].font = parseInt(14/s) + "px Arial"
      this.meterT["t" + i.toString()].y = -1 * 14/s * 0.5;
      this.meterY["t" + i.toString()].y = -1 * 14/s * 0.5;
    }
    this.meterT.t_all1.font = parseInt(14/s) + "px Arial"
    this.meterY.t_all1.font = parseInt(14/s) + "px Arial"
    

  }

  NSGFormat.prototype.validate = function(params, prev_params, default_params, target){
    params.changed = false;
    return params;
  }

  NSGFormat.prototype.checkUseParams = function(){
    return {
      width : true,
      height: true,
      flap: true,
      depth: true,
      insertion: true,
      gluing: true
    };
  }
  NSGFormat.prototype.getLabels = function(){
    return {
      width : "長さ",
      height: "高さ",
      flap: "フラップ",
      depth: "幅",
      insertion: "差し込み",
      gluing: "糊付け"
    };
  }

  NSGFormat.prototype.changeParams = function(params){
    this.currentParams = params;
    this.update(params);
    this._update(params);

    //alert(this.baseY)
    this.obj.x = this.baseX - this.width * 0.5;
    this.obj.y = this.baseY - this.height * 0.5;
    
    //
    this.setMeterPosition(params);
    

    if(this.TY){
      this.TY.regX = 13;
      this.TY.regY = 13;
      
      this.TY.x = this.obj.x + this.width - 13 * this.TY.scaleX;
      this.TY.y = this.obj.y + this.height - 13 * this.TY.scaleX;
    }

    this.bg.graphics
    .clear()
    .beginFill("#FFFFFF")
    .drawRect(0, 0, this.width, this.height)
    //this.bg.alpha = 0.01;

    this.border.graphics
    .clear()
    .beginStroke("#0000FF")
    .drawRect(0, 0, this.width, this.height)
  }

  return NSGFormat;
})();


// nsg format01
var NSGFormatF008_01 = (function(){

  __extend(NSGFormatF008_01, NSGFormat);

  function NSGFormatF008_01(displayObj){
    NSGFormat.apply(this, [displayObj]);
  }

  NSGFormatF008_01.prototype.setup = function(){
    this.data = [
      "", "p01", "", "", "",
      "", "p02", "", "", "",
      "p05", "p06", "p07", "p08", "p09",
      "", "p10", "", "p12", "" 
    ]
    this.data_o = [
      "p03", "p04", "p11", "p13"
    ]

    var s1 = 15;
    var s2 = 46;
    this.ws = ["gluing_part_mm", "width_mm", "depth_mm", "width_mm", "depth_mm"];
    this.hs = ["insertion_mm", "depth_mm", "height_mm", s2];

    this.os = [
      {
        x : ["gluing_part_mm", "width_mm"],
        y : ["insertion_mm", "depth_mm"],
        w : ["depth_mm"],
        h : ["flap_mm"],
        regX : 0,
        regY : "flap_mm"
      },
      {
        x : ["gluing_part_mm", "width_mm", "depth_mm", "width_mm"],
        y : ["insertion_mm", "depth_mm"],
        w : ["depth_mm"],
        h : ["flap_mm"],
        regX : 0,
        regY : "flap_mm"
      },
      {
        x : ["gluing_part_mm", "width_mm"],
        y : ["insertion_mm", "depth_mm", "height_mm"],
        w : ["depth_mm"],
        h : ["*"],
        regX : 0,
        regY : 0
      },
      {
        x : ["gluing_part_mm", "width_mm", "depth_mm", "width_mm"],
        y : ["insertion_mm", "depth_mm", "height_mm"],
        w : ["depth_mm"],
        h : ["*"],
        regX : 0,
        regY : 0
      }
    ]
  }

  NSGFormatF008_01.prototype.changeParams = function(params){
    this.hs[3] = Math.ceil(parseFloat((params.depth_mm * 0.65).toFixed(1)));
    this.os[2].h[0] = Math.ceil(parseFloat((params.width_mm * 0.5).toFixed(1)));
    this.os[3].h[0] = Math.ceil(parseFloat((params.width_mm * 0.5).toFixed(1)));
    NSGFormat.prototype.changeParams.apply(this, [params]);
  }

  

  return NSGFormatF008_01;
})();

// nsg format02
var NSGFormatF008_02 = (function(){

  __extend(NSGFormatF008_02, NSGFormat);

  function NSGFormatF008_02(displayObj){
    NSGFormat.apply(this, [displayObj]);
  }

  NSGFormatF008_02.prototype.setup = function(){
    this.data = [
      "", "", "", "p01", "",
      "", "", "", "p02", "",
      "p05", "p08", "p07", "p06", "p09",
      "", "p10", "", "p12", "" 
    ]
    this.data_o = [
      "p04", "p03", "p11", "p13"
    ]

    var s1 = 15;
    var s2 = 46;
    this.ws = ["gluing_part_mm", "width_mm", "depth_mm", "width_mm", "depth_mm"];
    this.hs = ["insertion_mm", "depth_mm", "height_mm", s2];

    this.os = [
      {
        x : ["gluing_part_mm", "width_mm"],
        y : ["insertion_mm", "depth_mm"],
        w : ["depth_mm"],
        h : ["flap_mm"],
        regX : 0,
        regY : "flap_mm"
      },
      {
        x : ["gluing_part_mm", "width_mm", "depth_mm", "width_mm"],
        y : ["insertion_mm", "depth_mm"],
        w : ["depth_mm"],
        h : ["flap_mm"],
        regX : 0,
        regY : "flap_mm"
      },
      {
        x : ["gluing_part_mm", "width_mm"],
        y : ["insertion_mm", "depth_mm", "height_mm"],
        w : ["depth_mm"],
        h : ["*"],
        regX : 0,
        regY : 0
      },
      {
        x : ["gluing_part_mm", "width_mm", "depth_mm", "width_mm"],
        y : ["insertion_mm", "depth_mm", "height_mm"],
        w : ["depth_mm"],
        h : ["*"],
        regX : 0,
        regY : 0
      }
    ]
  }
  NSGFormatF008_02.prototype.changeParams = function(params){
    this.hs[3] = Math.ceil(parseFloat((params.depth_mm * 0.65).toFixed(1)));
    this.os[2].h[0] = Math.ceil(parseFloat((params.width_mm * 0.5).toFixed(1)));
    this.os[3].h[0] = Math.ceil(parseFloat((params.width_mm * 0.5).toFixed(1)));
    NSGFormat.prototype.changeParams.apply(this, [params]);
  }

  return NSGFormatF008_02;
})();

// nsg format03
var NSGFormatF008_03 = (function(){

  __extend(NSGFormatF008_03, NSGFormat);

  function NSGFormatF008_03(displayObj){
    NSGFormat.apply(this, [displayObj]);
  }

  NSGFormatF008_03.prototype.setup = function(){
    this.data = [
      "", "p01", "", "", "",
      "", "p02", "", "", "",
      "p05", "p06", "p07", "p08", "p09",
      "", "p10", "", "p12", "" 
    ]
    this.data_o = [
      "p03", "p04", "p11", "p13"
    ]

    var s1 = 15;
    var s2 = 46;
    this.ws = ["gluing_part_mm", "width_mm", "depth_mm", "width_mm", "depth_mm"];
    this.hs = ["insertion_mm", "depth_mm", "height_mm", s2];

    this.os = [
      {
        x : ["gluing_part_mm", "width_mm"],
        y : ["insertion_mm", "depth_mm"],
        w : ["depth_mm"],
        h : ["flap_mm"],
        regX : 0,
        regY : "flap_mm"
      },
      {
        x : ["gluing_part_mm", "width_mm", "depth_mm", "width_mm"],
        y : ["insertion_mm", "depth_mm"],
        w : ["depth_mm"],
        h : ["flap_mm"],
        regX : 0,
        regY : "flap_mm"
      },
      {
        x : ["gluing_part_mm", "width_mm"],
        y : ["insertion_mm", "depth_mm", "height_mm"],
        w : ["depth_mm"],
        h : ["*"],
        regX : 0,
        regY : 0
      },
      {
        x : ["gluing_part_mm", "width_mm", "depth_mm", "width_mm"],
        y : ["insertion_mm", "depth_mm", "height_mm"],
        w : ["depth_mm"],
        h : ["*"],
        regX : 0,
        regY : 0
      }
    ]
  }
  NSGFormatF008_03.prototype.changeParams = function(params){
    this.hs[3] = Math.ceil(parseFloat((params.depth_mm * 0.70).toFixed(1)));
    this.os[2].h[0] = Math.ceil(parseFloat((params.width_mm * 0.5).toFixed(1)));
    this.os[3].h[0] = Math.ceil(parseFloat((params.width_mm * 0.5).toFixed(1)));
    NSGFormat.prototype.changeParams.apply(this, [params]);
  }

  return NSGFormatF008_03;
})();

// nsg format04
var NSGFormatF008_04 = (function(){

  __extend(NSGFormatF008_04, NSGFormat);

  function NSGFormatF008_04(displayObj){
    NSGFormat.apply(this, [displayObj]);
  }

  NSGFormatF008_04.prototype.setup = function(){
    this.data = [
      "", "", "", "p01", "",
      "", "", "", "p02", "",
      "p05", "p08", "p07", "p06", "p09",
      "", "p10", "", "p12", "" 
    ]
    this.data_o = [
      "p04", "p03", "p11", "p13"
    ]

    var s1 = 15;
    var s2 = 46;
    this.ws = ["gluing_part_mm", "width_mm", "depth_mm", "width_mm", "depth_mm"];
    this.hs = ["insertion_mm", "depth_mm", "height_mm", s2];

    this.os = [
      {
        x : ["gluing_part_mm", "width_mm"],
        y : ["insertion_mm", "depth_mm"],
        w : ["depth_mm"],
        h : ["flap_mm"],
        regX : 0,
        regY : "flap_mm"
      },
      {
        x : ["gluing_part_mm", "width_mm", "depth_mm", "width_mm"],
        y : ["insertion_mm", "depth_mm"],
        w : ["depth_mm"],
        h : ["flap_mm"],
        regX : 0,
        regY : "flap_mm"
      },
      {
        x : ["gluing_part_mm", "width_mm"],
        y : ["insertion_mm", "depth_mm", "height_mm"],
        w : ["depth_mm"],
        h : ["*"],
        regX : 0,
        regY : 0
      },
      {
        x : ["gluing_part_mm", "width_mm", "depth_mm", "width_mm"],
        y : ["insertion_mm", "depth_mm", "height_mm"],
        w : ["depth_mm"],
        h : ["*"],
        regX : 0,
        regY : 0
      }
    ]
  }
  NSGFormatF008_04.prototype.changeParams = function(params){
    this.hs[3] = Math.ceil(parseFloat((params.depth_mm * 0.70).toFixed(1)));
    this.os[2].h[0] = Math.ceil(parseFloat((params.width_mm * 0.5).toFixed(1)));
    this.os[3].h[0] = Math.ceil(parseFloat((params.width_mm * 0.5).toFixed(1)));
    NSGFormat.prototype.changeParams.apply(this, [params]);
  }

  return NSGFormatF008_04;
})();


// nsg format05
var NSGFormatF008_05 = (function(){

  __extend(NSGFormatF008_05, NSGFormat);

  function NSGFormatF008_05(displayObj){
    NSGFormat.apply(this, [displayObj]);
  }

  NSGFormatF008_05.prototype.setup = function(){
    this.data = [
      "", "p01", "", "", "",
      "", "p02", "", "", "",
      "p05", "p06", "p07", "p08", "p09",
      "", "p10", "", "", "",
      "", "p13", "", "", "" 
    ]
    this.data_o = [
      "p03", "p04", "p11", "p12"
    ]

    var s1 = 15;
    var s2 = 46;
    this.ws = ["gluing_part_mm", "width_mm", "depth_mm", "width_mm", "depth_mm"];
    this.hs = ["insertion_mm", "depth_mm", "height_mm", "depth_mm", "insertion_mm"];

    this.os = [
      {
        x : ["gluing_part_mm", "width_mm"],
        y : ["insertion_mm", "depth_mm"],
        w : ["depth_mm"],
        h : ["flap_mm"],
        regX : 0,
        regY : "flap_mm"
      },
      {
        x : ["gluing_part_mm", "width_mm", "depth_mm", "width_mm"],
        y : ["insertion_mm", "depth_mm"],
        w : ["depth_mm"],
        h : ["flap_mm"],
        regX : 0,
        regY : "flap_mm"
      },
      {
        x : ["gluing_part_mm", "width_mm"],
        y : ["insertion_mm", "depth_mm", "height_mm"],
        w : ["depth_mm"],
        h : ["flap_mm"],
        regX : 0,
        regY : 0
      },
      {
        x : ["gluing_part_mm", "width_mm", "depth_mm", "width_mm"],
        y : ["insertion_mm", "depth_mm", "height_mm"],
        w : ["depth_mm"],
        h : ["flap_mm"],
        regX : 0,
        regY : 0
      }
    ]
  }

  return NSGFormatF008_05;
})();

// nsg format06
var NSGFormatF008_06 = (function(){

  __extend(NSGFormatF008_06, NSGFormat);

  function NSGFormatF008_06(displayObj){
    NSGFormat.apply(this, [displayObj]);
  }

  NSGFormatF008_06.prototype.setup = function(){
    this.data = [
      "", "", "", "p01", "",
      "", "", "", "p02", "",
      "p05", "p08", "p07", "p06", "p09",
      "", "", "", "p10", "",
      "", "", "", "p13", "" 
    ]
    this.data_o = [
      "p04", "p03", "p12", "p11"
    ]

    var s1 = 15;
    var s2 = 46;
    this.ws = ["gluing_part_mm", "width_mm", "depth_mm", "width_mm", "depth_mm"];
    this.hs = ["insertion_mm", "depth_mm", "height_mm", "depth_mm", "insertion_mm"];

    this.os = [
      {
        x : ["gluing_part_mm", "width_mm"],
        y : ["insertion_mm", "depth_mm"],
        w : ["depth_mm"],
        h : ["flap_mm"],
        regX : 0,
        regY : "flap_mm"
      },
      {
        x : ["gluing_part_mm", "width_mm", "depth_mm", "width_mm"],
        y : ["insertion_mm", "depth_mm"],
        w : ["depth_mm"],
        h : ["flap_mm"],
        regX : 0,
        regY : "flap_mm"
      },
      {
        x : ["gluing_part_mm", "width_mm"],
        y : ["insertion_mm", "depth_mm", "height_mm"],
        w : ["depth_mm"],
        h : ["flap_mm"],
        regX : 0,
        regY : 0
      },
      {
        x : ["gluing_part_mm", "width_mm", "depth_mm", "width_mm"],
        y : ["insertion_mm", "depth_mm", "height_mm"],
        w : ["depth_mm"],
        h : ["flap_mm"],
        regX : 0,
        regY : 0
      }
    ]
  }

  return NSGFormatF008_06;
})();

// nsg format07
var NSGFormatF008_07 = (function(){

  __extend(NSGFormatF008_07, NSGFormat);

  function NSGFormatF008_07(displayObj){
    NSGFormat.apply(this, [displayObj]);
  }

  NSGFormatF008_07.prototype.setup = function(){
    this.data = [
      "", "p01", "", "", "",
      "", "p02", "", "", "",
      "p05", "p08", "p07", "p06", "p09",
      "", "", "", "p10", "",
      "", "", "", "p13", "" 
    ]
    this.data_o = [
      "p03", "p04", "p12", "p11"
    ]

    var s1 = 15;
    var s2 = 46;
    this.ws = ["gluing_part_mm", "width_mm", "depth_mm", "width_mm", "depth_mm"];
    this.hs = ["insertion_mm", "depth_mm", "height_mm", "depth_mm", "insertion_mm"];

    this.os = [
      {
        x : ["gluing_part_mm", "width_mm"],
        y : ["insertion_mm", "depth_mm"],
        w : ["depth_mm"],
        h : ["flap_mm"],
        regX : 0,
        regY : "flap_mm"
      },
      {
        x : ["gluing_part_mm", "width_mm", "depth_mm", "width_mm"],
        y : ["insertion_mm", "depth_mm"],
        w : ["depth_mm"],
        h : ["flap_mm"],
        regX : 0,
        regY : "flap_mm"
      },
      {
        x : ["gluing_part_mm", "width_mm"],
        y : ["insertion_mm", "depth_mm", "height_mm"],
        w : ["depth_mm"],
        h : ["flap_mm"],
        regX : 0,
        regY : 0
      },
      {
        x : ["gluing_part_mm", "width_mm", "depth_mm", "width_mm"],
        y : ["insertion_mm", "depth_mm", "height_mm"],
        w : ["depth_mm"],
        h : ["flap_mm"],
        regX : 0,
        regY : 0
      }
    ]
  }

  return NSGFormatF008_07;
})();

// nsg format08
var NSGFormatF008_08 = (function(){

  __extend(NSGFormatF008_08, NSGFormat);

  function NSGFormatF008_08(displayObj){
    NSGFormat.apply(this, [displayObj]);
  }

  NSGFormatF008_08.prototype.setup = function(){
    this.data = [
      "", "", "", "p01", "", "",
      "", "", "", "p03", "", "",
      "p05", "p06", "p07", "p08", "p09", "p10",
      "", "", "", "p12", "", "",
      "", "", "", "p14", "", ""
    ]
    this.data_o = [
      "p02", "p04", "p11", "p13"
    ]

    var s1 = 15;
    var s2 = 46;
    this.ws = ["insertion_mm", "width_mm", "height_mm", "width_mm", "height_mm", ["height_mm", 2]];
    this.hs = ["flap_mm", "height_mm", "depth_mm", "height_mm", "flap_mm"];

    this.os = [
      {
        x : ["insertion_mm"],
        y : ["flap_mm"],
        w : ["width_mm", "height_mm"],
        h : ["height_mm"],
        regX : 0,
        regY : 0
      },
      {
        x : ["insertion_mm", "width_mm", "height_mm", "width_mm"],
        y : ["flap_mm"],
        w : ["height_mm", "height_mm"],
        h : ["height_mm"],
        regX : 0,
        regY : 0
      },
      {
        x : ["insertion_mm"],
        y : ["flap_mm", "depth_mm", "height_mm"],
        w : ["width_mm", "height_mm"],
        h : ["height_mm"],
        regX : 0,
        regY : 0
      },
      {
        x : ["insertion_mm", "width_mm", "height_mm", "width_mm"],
        y : ["flap_mm", "depth_mm", "height_mm"],
        w : ["height_mm", "height_mm"],
        h : ["height_mm"],
        regX : 0,
        regY : 0
      }
    ]
  }

  NSGFormatF008_08.prototype.checkUseParams = function(){
    return {
      width : true,
      height: true,
      flap: true,
      depth: true,
      insertion: true,
      gluing: false
    };
  }

  return NSGFormatF008_08;
})();


// nsg format09
var NSGFormatF008_09 = (function(){

  __extend(NSGFormatF008_09, NSGFormat);

  function NSGFormatF008_09(displayObj){
    NSGFormat.apply(this, [displayObj]);
  }

  NSGFormatF008_09.prototype.setup = function(){
    this.data = [
         "",    "",    "", "p00",    "",    "",    "",
         "", "p01", "p02", "p03", "p04", "p05",    "",
         "", "p06", "p07", "p08", "p09", "p10",    "",
      "p11", "p12", "p13", "p14", "p15", "p16", "p17",
         "", "p18", "p19", "p20", "p21", "p22",    "",
         "", "p23", "p24", "p25", "p26", "p27",    "",
         "",    "",    "", "p28",    "",    "",    "",
    ]
    this.data_o = []

    var s1 = 15;
    var s2 = 46;
    this.ws = ["insertion_mm", ["height_mm", -1], "height_mm", "width_mm", "height_mm", ["height_mm", -1], "insertion_mm"];
    this.hs = ["insertion_mm", ["height_mm", -1], "height_mm", "depth_mm", "height_mm", ["height_mm", -1], "insertion_mm"];

    this.os = []
  }

  NSGFormatF008_09.prototype.checkUseParams = function(){
    return {
      width : true,
      height: true,
      flap: false,
      depth: true,
      insertion: true,
      gluing: false
    };
  }

  return NSGFormatF008_09;
})();

// nsg format10
var NSGFormatF008_10 = (function(){

  __extend(NSGFormatF008_10, NSGFormat);

  function NSGFormatF008_10(displayObj){
    NSGFormat.apply(this, [displayObj]);
  }

  NSGFormatF008_10.prototype.setup = function(){
    this.data = [
         "",    "",    "", "p00",    "",    "",    "",
         "", "p01", "p02", "p03", "p04", "p05",    "",
         "",    "", "p07", "p08", "p09",    "",    "",
      "p11", "p12", "p13", "p14", "p15", "p16", "p17",
         "",    "", "p19", "p20", "p21",    "",    "",
         "", "p23", "p24", "p25", "p26", "p27",    "",
         "",    "",    "", "p28",    "",    "",    "",
    ]
    this.data_o = []

    var s1 = 15;
    var s2 = 46;
    this.ws = ["insertion_mm", ["height_mm", -1], "height_mm", "width_mm", "height_mm", ["height_mm", -1], "insertion_mm"];
    this.hs = ["insertion_mm", ["height_mm", -1], "height_mm", "depth_mm", "height_mm", ["height_mm", -1], "insertion_mm"];

    this.os = []
  }

  NSGFormatF008_10.prototype.checkUseParams = function(){
    return {
      width : true,
      height: true,
      flap: false,
      depth: true,
      insertion: true,
      gluing: false
    };
  }

  return NSGFormatF008_10;
})();

// nsg format11
var NSGFormatF008_11 = (function(){

  __extend(NSGFormatF008_11, NSGFormat);

  function NSGFormatF008_11(displayObj){
    NSGFormat.apply(this, [displayObj]);
  }

  NSGFormatF008_11.prototype.setup = function(){
    this.data = [
         "",    "",    "",    "", "p00",    "",    "",    "",    "",
         "",    "", "p01", "p02", "p03", "p04", "p05",    "",    "",
         "",    "",    "",    "", "p91",    "",    "",    "",    "",
         "",    "",    "", "p07", "p08", "p09",    "",    "",    "",
      "p11", "p12", "p92", "p13", "p14", "p15", "p93", "p16", "p17",
         "",    "",    "", "p19", "p20", "p21",    "",    "",    "",
         "",    "",    "",    "", "p94",    "",    "",    "",    "",
         "",    "", "p23", "p24", "p25", "p26", "p27",    "",    "",
         "",    "",    "",    "", "p28",    "",    "",    "",    "",
    ]
    this.data_o = []

    var s1 = 15;
    var s2 = 5;
    this.ws = ["insertion_mm", ["height_mm", -1], s2, "height_mm", "width_mm", "height_mm", s2, ["height_mm", -1], "insertion_mm"];
    this.hs = ["insertion_mm", ["height_mm", -1], s2, "height_mm",  "depth_mm", "height_mm", s2, ["height_mm", -1], "insertion_mm"];

    this.os = []
  }

  NSGFormatF008_11.prototype.checkUseParams = function(){
    return {
      width : true,
      height: true,
      flap: false,
      depth: true,
      insertion: true,
      gluing: false
    };
  }

  return NSGFormatF008_11;
})();


// nsg format12
var NSGFormatF008_12 = (function(){

  __extend(NSGFormatF008_12, NSGFormat);

  function NSGFormatF008_12(displayObj){
    NSGFormat.apply(this, [displayObj]);
  }

  NSGFormatF008_12.prototype.setup = function(){
    this.data = [
         "",    "",    "", "p00",    "",    "",    "",
         "", "p91", "p07", "p08", "p09", "p92",    "",
      "p11", "p12", "p13", "p14", "p15", "p16", "p17",
         "", "p93", "p19", "p20", "p21", "p94",    "",
         "",    "",    "", "p28",    "",    "",    "",
    ]
    this.data_o = []

    var s1 = 15;
    var s2 = 33;
    this.ws = ["insertion_mm", ["height_mm", -1], "height_mm", "width_mm", "height_mm", ["height_mm", -1], "insertion_mm"];
    this.hs = [["height_mm", -1], "height_mm", "depth_mm", "height_mm", ["height_mm", -1]];

    this.os = []
  }

  NSGFormatF008_12.prototype.checkUseParams = function(){
    return {
      width : true,
      height: true,
      flap: false,
      depth: true,
      insertion: true,
      gluing: false
    };
  }

  return NSGFormatF008_12;
})();

// nsg format13
var NSGFormatF008_13 = (function(){

  __extend(NSGFormatF008_13, NSGFormat);

  function NSGFormatF008_13(displayObj){
    NSGFormat.apply(this, [displayObj]);
  }

  NSGFormatF008_13.prototype.setup = function(){
    this.data = [
         "",    "",    "", "p01",    "",
         "",    "", "p02", "p03", "p04",
      "p05", "p06", "p07", "p08", "p09",
         "",    "", "p10", "p11", "p12",
         "",    "",    "", "p13",    "", 
    ]
    this.data_o = ["d01","d02","d03","d04"]


    var s1 = 15;
    var s2 = 33;
    this.ws = ["insertion_mm", "width_mm", "height_mm", "width_mm", "height_mm"];
    this.hs = ["flap_mm", "height_mm", "depth_mm", "height_mm",  "flap_mm"];

    this.os = [
      {
        x : ["insertion_mm", "width_mm", "height_mm"],
        y : [0],
        w : ["flap_mm", "height_mm"],
        h : ["flap_mm", "height_mm"],
        regX : ["flap_mm", "height_mm"],
        regY : 0
      },
      {
        x : ["insertion_mm", "width_mm", "height_mm", "width_mm"],
        y : ["flap_mm", "height_mm"],
        w : ["flap_mm", "height_mm"],
        h : ["flap_mm", "height_mm"],
        regX : 0,
        regY : 0
      },
      {
        x : ["insertion_mm", "width_mm", "height_mm"],
        y : ["flap_mm", "height_mm", "depth_mm"],
        w : ["flap_mm", "height_mm"],
        h : ["flap_mm", "height_mm"],
        regX : 0,
        regY : 0
      },
      {
        x : ["insertion_mm", "width_mm", "height_mm", "width_mm"],
        y : ["flap_mm", "height_mm", "depth_mm", "flap_mm", "height_mm"],
        w : ["flap_mm", "height_mm"],
        h : ["flap_mm", "height_mm"],
        regX : ["flap_mm", "height_mm"],
        regY : 0,
      }
    ]
  }

  NSGFormatF008_13.prototype.validate = function(params, prev_params, default_params, target){
    var b = false;

    if(params['height_mm'] + params['flap_mm'] > params['width_mm'] * 0.5 - 10){
      if($(target).attr("id") == "paramHeight"){
        params['height_mm'] = (params['width_mm'] * 0.5 - 10) - params['flap_mm'];
        if(params['height_mm'] < default_params.min_height){
          params['height_mm'] = default_params.min_height;
          params['flap_mm'] = (params['width_mm'] * 0.5 - 10) - params['height_mm'];
        }
      }else if($(target).attr("id") == "paramFlap"){
        params['flap_mm'] = (params['width_mm'] * 0.5 - 10) - params['height_mm'];
      }else if($(target).attr("id") == "paramWidth"){
        params['width_mm'] = prev_params["width_mm"];
        params['width'] = mmToPx(prev_params["width_mm"]);
      }
      params['height'] = mmToPx(params['height_mm']);
      params['flap'] = mmToPx(params['flap_mm']);
      b = true;
    }
    if(params['height_mm'] + params['flap_mm'] > params['depth_mm'] * 0.5 - 10){
      if($(target).attr("id") == "paramHeight"){
        params['height_mm'] = (params['depth_mm'] * 0.5 - 10) - params['flap_mm'];
        if(params['height_mm'] < default_params.min_height){
          params['height_mm'] = default_params.min_height;
          params['flap_mm'] = (params['depth_mm'] * 0.5 - 10) - params['height_mm'];
        }
      }else if($(target).attr("id") == "paramFlap"){
        params['flap_mm'] = (params['depth_mm'] * 0.5 - 10) - params['height_mm'];
      }else if($(target).attr("id") == "paramDepth"){
        params['depth_mm'] = prev_params["depth_mm"];
        params['depth'] = mmToPx(prev_params["depth_mm"]);
      }
      params['height'] = mmToPx(params['height_mm']);
      params['flap'] = mmToPx(params['flap_mm']);
      b = true;
    }
    params.changed = b;
    return params;
  }

  NSGFormatF008_13.prototype.checkUseParams = function(){
    return {
      width : true,
      height: true,
      flap: true,
      depth: true,
      insertion: true,
      gluing: false
    };
  }

  return NSGFormatF008_13;
})();


// nsg format14
var NSGFormatF008_14 = (function(){

  __extend(NSGFormatF008_14, NSGFormat);

  function NSGFormatF008_14(displayObj){
    NSGFormat.apply(this, [displayObj]);
  }

  NSGFormatF008_14.prototype.setup = function(){
    this.data = [
         "",    "",    "", "p01",    "",
         "",    "", "p02", "p03", "p04",
      "p05", "p06", "p07", "p08", "p09",
         "",    "", "p10", "p11", "p12",
         "",    "",    "", "p13",    "", 
    ]
    this.data_o = ["d01","d02","d03","d04"]


    var s1 = 15;
    var s2 = 33;
    this.ws = ["insertion_mm", "width_mm", "height_mm", "width_mm", "height_mm"];
    this.hs = ["flap_mm", "height_mm", "depth_mm", "height_mm",  "flap_mm"];

    this.os = [
      {
        x : ["insertion_mm", "width_mm", "height_mm"],
        y : ["flap_mm", "height_mm"],
        w : ["flap_mm", "height_mm"],
        h : ["flap_mm", "height_mm"],
        regX :0,
        regY : 0
      },
      {
        x : ["insertion_mm", "width_mm", "height_mm"],
        y : ["flap_mm", "height_mm", "depth_mm"],
        w : ["flap_mm", "height_mm"],
        h : ["flap_mm", "height_mm"],
        regX : 0,
        regY : 0
      },
      {
        x : ["insertion_mm", "width_mm", "height_mm", "width_mm"],
        y : ["flap_mm", "height_mm"],
        w : ["height_mm"],
        h : ["height_mm"],
        regX : 0,
        regY : 0
      },
      {
        x : ["insertion_mm", "width_mm", "height_mm", "width_mm"],
        y : ["flap_mm", "height_mm", "depth_mm"],
        w : ["height_mm"],
        h : ["height_mm"],
        regX : 0,
        regY : 0,
      }
    ]
  }

  NSGFormatF008_14.prototype.checkUseParams = function(){
    return {
      width : true,
      height: true,
      flap: true,
      depth: true,
      insertion: true,
      gluing: false
    };
  }

  return NSGFormatF008_14;
})();

// nsg format15
var NSGFormatF008_15 = (function(){

  __extend(NSGFormatF008_15, NSGFormat);

  function NSGFormatF008_15(displayObj){
    NSGFormat.apply(this, [displayObj]);
  }

  
  NSGFormatF008_15.prototype.setup = function(){
    this.data = [
      "p01", "p02", "p03",
      "p04", "p05", "p06",
      "p07", "p08", "p09",
    ]
    this.data_o = ["d01","d02","d03","d04"]

    var s1 = 15;
    var s2 = 33;
    this.ws = ["height_mm", "width_mm", "height_mm"];
    this.hs = ["height_mm", "depth_mm", "height_mm"];

    this.os = [
      {
        x : [0],
        y : ["height_mm"],
        w : ["height_mm"],
        h : ["height_mm"],
        regX : "height_mm",
        regY : 0
      },
      {
        x : [0],
        y : ["height_mm","depth_mm"],
        w : ["height_mm"],
        h : ["height_mm"],
        regX : "height_mm",
        regY : 0
      },
      {
        x : ["height_mm","width_mm"],
        y : ["height_mm"],
        w : ["height_mm"],
        h : ["height_mm"],
        regX : 0,
        regY : 0
      },
      {
        x : ["height_mm","width_mm"],
        y : ["height_mm","depth_mm"],
        w : ["height_mm"],
        h : ["height_mm"],
        regX : "height_mm",
        regY : "height_mm",
      }
    ]
  }

  NSGFormatF008_15.prototype.validate = function(params, prev_params, default_params, target){
    var b = false;
    if(params['height_mm'] > params['width_mm'] * 0.5 - 10){
      params['height_mm'] = params['width_mm'] * 0.5 - 10;
      if(params['height_mm'] < default_params.min_height){
        params['height_mm'] = default_params.min_height;
        //params['width_mm'] = (params['height_mm'] + 10) * 2;
      }
      params['height'] = mmToPx(params['height_mm']);
        
      b = true;
    }
    if(params['height_mm'] > params['depth_mm'] * 0.5 - 10){
      params['height_mm'] = params['depth_mm'] * 0.5 - 10;
      if(params['height_mm'] < default_params.min_height){
        params['height_mm'] = default_params.min_height;
        //params['depth_mm'] = (params['height_mm'] + 10) * 2;
      }
      params['height'] = mmToPx(params['height_mm']);
        
      b = true;
    }
    return params;
  }

  NSGFormatF008_15.prototype.checkUseParams = function(){
    return {
      width : true,
      height: true,
      flap: false,
      depth: true,
      insertion: false,
      gluing: false
    };
  }

  return NSGFormatF008_15;
})();


// nsg format16
var NSGFormatF008_16 = (function(){

  __extend(NSGFormatF008_16, NSGFormat);

  function NSGFormatF008_16(displayObj){
    NSGFormat.apply(this, [displayObj]);
  }

  
  NSGFormatF008_16.prototype.setup = function(){
    this.data = [
      "p01", "p02", "p03", "p04","p05",
         "", "p06",   "", "p08",  "",
      "p10", "p11", "p12", "p13","p14",
         "", "p15", "", "p17",""
    ]
    this.data_o = ["p07", "p09", "p16", "p18"]

    var s1 = 15;
    var s2 = 33;
    this.ws = ["gluing_part_mm", "width_mm", "depth_mm", "width_mm", "depth_mm"];
    this.hs = ["insertion_mm", s1, "height_mm", s2];

    this.os = [
      {
        x : ["gluing_part_mm", "width_mm"],
        y : ["insertion_mm", s1],
        w : ["depth_mm"],
        h : ["flap_mm"],
        regX : 0,
        regY : ["flap_mm"]
      },
      {
        x : ["gluing_part_mm", "width_mm", "depth_mm", "width_mm"],
        y : ["insertion_mm", s1],
        w : ["depth_mm"],
        h : ["flap_mm"],
        regX : 0,
        regY : ["flap_mm"]
      },
      {
        x : ["gluing_part_mm", "width_mm"],
        y : ["insertion_mm", s1, "height_mm"],
        w : ["depth_mm"],
        h : ["*"],
        regX : 0,
        regY : 0
      },
      {
        x : ["gluing_part_mm", "width_mm", "depth_mm", "width_mm"],
        y : ["insertion_mm", s1, "height_mm"],
        w : ["depth_mm"],
        h : ["*"],
        regX : 0,
        regY : 0
      }
    ]
  }

  NSGFormatF008_16.prototype.changeParams = function(params){
    this.hs[1] = Math.ceil(parseFloat((params.depth_mm * 0.5).toFixed(1)));
    this.hs[3] = Math.ceil(parseFloat((params.depth_mm * 0.65).toFixed(1)));

    this.os[0].y[1] = Math.ceil(parseFloat((params.depth_mm * 0.5).toFixed(1)));
    this.os[1].y[1] = Math.ceil(parseFloat((params.depth_mm * 0.5).toFixed(1)));
    this.os[2].y[1] = Math.ceil(parseFloat((params.depth_mm * 0.5).toFixed(1)));
    this.os[3].y[1] = Math.ceil(parseFloat((params.depth_mm * 0.5).toFixed(1)));

    this.os[2].h[0] = Math.ceil(parseFloat((params.width_mm * 0.5).toFixed(1)));
    this.os[3].h[0] = Math.ceil(parseFloat((params.width_mm * 0.5).toFixed(1)));
    NSGFormat.prototype.changeParams.apply(this, [params]);
  }

  NSGFormatF008_16.prototype.checkUseParams = function(){
    return {
      width : true,
      height: true,
      flap: true,
      depth: true,
      insertion: true,
      gluing: true
    };
  }
  NSGFormatF008_16.prototype.getLabels = function(){
    return {
      width : "長さ",
      height: "高さ",
      flap: "フラップ",
      depth: "幅",
      insertion: "差し込み/取手",
      gluing: "糊付け"
    };
  }

  return NSGFormatF008_16;
})();

  var FormatController = (function(){

    function FormatController(target, r_default){
      this.target = target;
      this.controller = new lib.Controller();
      this.x_mm = 0;
      this.y_mm = 0;
      this.width_mm = target.width_mm;
      this.height_mm = target.height_mm;

      //this.controller.visible = false;
      
      this.TY = this.controller.TY;
      this.dBtn = this.controller.deleteBtn;
      this.rBtn = this.controller.rotateBtn;
      this.c01 = this.controller.controll01;
      this.c02 = this.controller.controll02;


      this.TY.visible = false;
      this.rBtn.visible = false;
      this.dBtn.visible = false;
      this.c01.visible = false;
      this.c02.visible = false;

      this.target.obj.regX = this.target.width * 0.5;
      this.target.obj.regY = this.target.height * 0.5;

      this.target.obj.x = this.target.width * 0.5;
      this.target.obj.y = this.target.height * 0.5;
      
      this.rDefault = r_default;
      this.controller.addChildAt(this.target.obj, 0);

      this.TY.regX = 13;
        this.TY.regY = 13;
        
      this.TY.rotation = this.rDefault;
      
      this.TY.x = this.target.width - 13;
      this.TY.y = this.target.height - 13;

      this._b = 0;
      this._num = 0;





      this.rotateEvent = this.rotateEvent.bind(this)
      this.moveUp = this.moveUp.bind(this)
      this.moveDown = this.moveDown.bind(this)
      this.moveLeft = this.moveLeft.bind(this)
      this.moveRight = this.moveRight.bind(this)
      this.deleteY = this.deleteY.bind(this)
      this.createY = this.createY.bind(this)
      this.deleteT = this.deleteT.bind(this)
      this.createT = this.createT.bind(this)
      this.targetMove = this.targetMove.bind(this)
      this.bindEvent();
    }

    FormatController.prototype.setVisible = function(num){
      this._num = num;
      if(num > 1){
        this.dBtn.alpha = 1;
        this.dBtn.mouseEnabled = true;
      }else{
        this.dBtn.alpha = 0;
        this.dBtn.mouseEnabled = false;
      }
    }

    FormatController.prototype.bindEvent = function(){
      

      this.rBtn.addEventListener("click", this.rotateEvent);
      this.dBtn.addEventListener("click", this.deleteY);
      this.c01.btn01.addEventListener("click", this.moveDown);
      this.c01.btn02.addEventListener("click", this.moveUp);
      this.c01.btn03.addEventListener("click", this.createY);
      /*
      this.c01.btn03.btn03.addEventListener("click", this.deleteY);
      */

      this.c02.btn02.addEventListener("click", this.moveRight);
      this.c02.btn01.addEventListener("click", this.moveLeft);
      /*
      this.c02.btn03.btn03.addEventListener("click", this.deleteT);*/
      this.c02.btn03.addEventListener("click", this.createT);


      $(this.target).on("move", this.targetMove);
    }
    FormatController.prototype.unbindEvent = function(){
      this.rBtn.removeEventListener("click", this.rotateEvent);
      this.dBtn.removeEventListener("click", this.deleteY);
      this.c01.btn01.removeEventListener("click", this.moveDown);
      this.c01.btn02.removeEventListener("click", this.moveUp);
      this.c01.btn03.removeEventListener("click", this.createY);

      this.c02.btn02.removeEventListener("click", this.moveLeft);
      this.c02.btn01.removeEventListener("click", this.moveRight);
      this.c02.btn03.removeEventListener("click", this.createT);
    }

    FormatController.prototype.showFocus = function(){
      this.TY.visible = 
      this.rBtn.visible = 
      this.dBtn.visible = true;
      this.c01.visible = 
      this.c02.visible = true;
    }
    FormatController.prototype.hideFocus = function(){
      this.TY.visible = false;
      this.rBtn.visible = false;
      this.dBtn.visible = false;
      this.c01.visible = false;
      this.c02.visible = false;
      this.target.hideFocus();
    }

    FormatController.prototype.targetMove = function(e, dx, dy){
      this.controller.x += (dx);
      this.x_mm += (pxToMm(dx));
      this.controller.y += (dy);
      this.y_mm += (pxToMm(dy));
      
      $(this).trigger("move");
    }

    FormatController.prototype.moveUp = function(){
      //$(this).trigger("moveUp");
      this.controller.y -= mmToPx(10);
      this.y_mm -= 10;
      
      $(this).trigger("move");
    }
    FormatController.prototype.moveDown = function(){
      //$(this).trigger("moveDown");
      this.controller.y += mmToPx(10);
      this.y_mm += 10;
      $(this).trigger("move");
    }
    FormatController.prototype.moveLeft = function(){
      //$(this).trigger("moveLeft");
      this.controller.x -= mmToPx(10);
      this.x_mm -= 10;
      $(this).trigger("move");
    }
    FormatController.prototype.moveRight = function(){
      //$(this).trigger("moveRight");
      this.controller.x += mmToPx(10);
      this.x_mm += 10;
      $(this).trigger("move");
    }

    FormatController.prototype.deleteY = function(){
      this.setEnable(false);
      
      $(this).trigger("f_deleteY");
    }
    FormatController.prototype.createY = function(){
      this.setEnable(false);
      
      $(this).trigger("f_createY");
    }

    FormatController.prototype.deleteT = function(){
      this.setEnable(false);
      
      $(this).trigger("f_deleteT");
    }
    FormatController.prototype.createT = function(){
      this.setEnable(false);
      
      $(this).trigger("f_createT");
    }

    FormatController.prototype.setEnable = function(bool){
      this.dBtn.mouseEnabled = bool;
    }

    FormatController.prototype.rotateEvent = function(){
      this.target.obj.rotation -= 90;
      this.TY.rotation -= 90;
      this._update();
      $(this).trigger("move");
    }
    FormatController.prototype._update = function(){
      var t = (-this.target.obj.rotation/90)%4;
      
      if(t == 0 || t == 2){
        this.TY.x = this.target.width - 13 *this.rBtn.scaleX;
        this.TY.y = this.target.height - 13 *this.rBtn.scaleX;

        this.target.obj.x = this.target.width * 0.5;
        this.target.obj.y = this.target.height * 0.5;
        this._b = 0;
      }else{
        this.TY.x = this.target.height - 13 *this.rBtn.scaleX;
        this.TY.y = this.target.width - 13 *this.rBtn.scaleX;
      
        this.target.obj.x = this.target.height * 0.5;
        this.target.obj.y = this.target.width * 0.5;
        this._b = 1;
      }
    }

    FormatController.prototype.setScale = function(s){
      this.TY.scaleX =
      this.TY.scaleY = 
      this.c01.scaleX = 
      this.c01.scaleY = 
      this.c02.scaleX = 
      this.c02.scaleY = 
      this.rBtn.scaleX = 
      this.rBtn.scaleY = s;
      this.dBtn.scaleX = 
      this.dBtn.scaleY = s;

      this.dBtn.x = -32 * s;
      this.c01.x = 32 * s;
      this.c02.y = 32 * s;
      
      this._update();
    }

    return FormatController;
  })();

  var CustomFormat = (function(){

    function CustomFormat(displayObj, scaleX, scaleY){
      this.displayObj = displayObj;

      this.displayObj.regX = 0;//displayObj.width * 0.5;
      this.displayObj.regY = 0;//displayObj.height * 0.5;
      this.displayObj.scaleX = scaleX;
      this.displayObj.scaleY = scaleY;
      
      
      //displayObj.TY.visible = false;
      this.obj = new createjs.Container();
      this.obj.addChild(this.displayObj);
      this.obj.mouseEnabled = true;
        //this.controller = displayObj.controller;
        this.baseX = this.obj.x;
        this.baseY = this.obj.y;

       //this.displayObj.TY.visible = false;

      this.currentParams = {

      }
      
      this.width = this.displayObj.image.width * scaleX;
      this.height = this.displayObj.image.height * scaleY;
      this.width_mm = parseInt($("#paramPSW").val());
      this.height_mm = parseInt($("#paramPSH").val());
      

      this.bg = new createjs.Shape();
      this.border = new createjs.Shape();
      this.border.visible = false;
      //this.obj.addChildAt(this.border, 0);
      //this.obj.addChild(this.bg);

      this.obj.set({
        hitArea : this.bg
      })

      this.isFocus = false;

      this.handleDown = this.handleDown.bind(this)
      this.handleMove = this.handleMove.bind(this)
      this.handleUp = this.handleUp.bind(this)

      this.bg.graphics
      .clear()
      .beginFill("#FFFFFF")
      .drawRect(0,0, this.width, this.height)
      this.bg.alpha = 0.01;

      this.border.graphics
      .clear()
      .beginStroke("#0000FF")
      .drawRect(0,0, this.width, this.height)

      
    }

    CustomFormat.prototype.remove = function(){
      this.obj.removeChild(this.displayObj);
      this.obj.removeChild(this.bg);
      this.obj.removeChild(this.border);
      this.displayObj = null;

      this.bg.graphics.clear();
      this.border.graphics.clear();
      

      this.obj = null;
    }

    CustomFormat.prototype.addDragEvent = function(b){
      this.obj.addEventListener("mousedown", this.handleDown);
      if(b){
        this.obj.addEventListener("pressmove", this.handleMove);
      }
      this.obj.addEventListener("pressup", this.handleUp);
    }
    CustomFormat.prototype.removeDragEvent = function(){
      this.obj.removeEventListener("mousedown", this.handleDown);
      this.obj.removeEventListener("pressmove", this.handleMove);
      this.obj.removeEventListener("pressup", this.handleUp);
    }

    var dragPointX = 0;
    var dragPointY = 0;
    
    CustomFormat.prototype.handleDown = function(event) {
      this.isMouseDown = true;
      dragPointX = this.obj.stage.mouseX;
      dragPointY = this.obj.stage.mouseY;
      //alert("A")
      this.showFocus();
    }
    CustomFormat.prototype.handleMove = function(event) {
      var s = parseFloat($("#scaleSlider").val())/100;
      var dx = (this.obj.stage.mouseX - dragPointX) * 1/s;
      var dy = (this.obj.stage.mouseY - dragPointY) * 1/s;
      
      dragPointX = this.obj.stage.mouseX;
      dragPointY = this.obj.stage.mouseY;
      $(this).trigger("move", [dx, dy]);
//      this.obj.parent.x += this.obj.stage.mouseX - dragPointX;
//      this.obj.parent.y += this.obj.stage.mouseY - dragPointY;
//      dragPointX = this.obj.stage.mouseX;
//      dragPointY = this.obj.stage.mouseY;
    }
    CustomFormat.prototype.handleUp = function(event) {
      this.isMouseDown = false;
      //this.hideFocus();
      event.stopPropagation();
      event.preventDefault();
      return false;
    }

    CustomFormat.prototype.showFocus = function() {
      this.isFocus = true;
      //this.border.visible = true;
      $(this).trigger("focus");
    }
    CustomFormat.prototype.hideFocus = function() {
      this.isFocus = false;
      //this.border.visible = false;
    }

    return CustomFormat;
  })();







var flib = {
  NSGrid : NSGrid,
  FormatSF008_01 : NSGFormatF008_01,
  FormatSF008_02 : NSGFormatF008_02,
  FormatSF008_03 : NSGFormatF008_03,
  FormatSF008_04 : NSGFormatF008_04,
  FormatSF008_05 : NSGFormatF008_05,
  FormatSF008_06 : NSGFormatF008_06,
  FormatSF008_07 : NSGFormatF008_07,
  FormatSF008_08 : NSGFormatF008_08,
  FormatSF008_09 : NSGFormatF008_09,
  FormatSF008_10 : NSGFormatF008_10,
  FormatSF008_11 : NSGFormatF008_11,
  FormatSF008_12 : NSGFormatF008_12,
  FormatSF008_13 : NSGFormatF008_13,
  FormatSF008_14 : NSGFormatF008_14,
  FormatSF008_15 : NSGFormatF008_15,
  FormatSF008_16 : NSGFormatF008_16
};

