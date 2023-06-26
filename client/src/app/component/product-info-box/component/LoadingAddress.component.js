"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var ProductInfoBox_component_1 = require("../ProductInfoBox.component");
var data_util_1 = require("../../../util/data-util");
var LoadingAddressComponent = (function () {
    function LoadingAddressComponent(component) {
        this.component = component;
        this._keywords = [];
        this.hotData = [];
    }
    LoadingAddressComponent.prototype.ngAfterViewInit = function () {
        var self = this;
        // init table
        var hotElement = this.hotE.nativeElement;
        this.hotData = this.hotGetData();
        var hotSettings = {
            data: this.hotData,
            columns: [
                {
                    data: data_util_1.default.data('pib_code'),
                    type: 'text',
                    readOnly: true,
                    width: 40
                },
                {
                    data: data_util_1.default.data('pib_abbr'),
                    readOnly: true,
                    type: 'text'
                },
                {
                    data: data_util_1.default.data('pib_name'),
                    readOnly: true,
                    type: 'text'
                }
            ],
            colHeaders: [
                'ID',
                '略称漢字',
                '場所名'
            ],
            stretchH: 'last',
            manualColumnResize: [150, 200, 300],
            height: 400,
            cells: function (row, col, prop) {
                var cellProperties = {};
                if (row == self.selected) {
                    cellProperties.className = "selected-address";
                }
                else {
                    cellProperties.className = "";
                }
                return cellProperties;
            },
            multiSelect: false
        };
        this.hot = new Handsontable(hotElement, hotSettings);
        this.hot.addHook("beforeOnCellMouseDown", function (event, coords) {
            self.preventSelectCell(event, coords);
        });
        this.hot.addHook("afterSelectionEnd", function (r) {
            self.selectRow(r);
        });
    };
    Object.defineProperty(LoadingAddressComponent.prototype, "keywords", {
        //region Screen bindings
        get: function () {
            return this._keywords;
        },
        set: function (value) {
            // check if need filter
            this._keywords = value;
            this.doFilter();
        },
        enumerable: true,
        configurable: true
    });
    //endregion
    //region Screen actions
    LoadingAddressComponent.prototype.open = function () {
        // clear keywords
        this._keywords = [];
        this.doFilter();
        // open modal
        $(this.modalE.nativeElement).modal('show');
        this.hot.updateSettings({
            width: "100%"
        });
        // scroll to selected
        var selectedId = this.component.data.tmpShipping.pib_loadingAddressId;
        if (selectedId != undefined) {
            var len = this.hotData.length;
            for (var i = 0; i < len; i++) {
                if (this.hotData[i].pib_id == selectedId) {
                    this.hot.selectCell(len - 1, 0, len - 1, 0, true);
                    this.hot.selectCell(i, 0, i, 0, true);
                    break;
                }
            }
        }
    };
    LoadingAddressComponent.prototype.close = function () {
        $(this.modalE.nativeElement).modal('hide');
    };
    LoadingAddressComponent.prototype.cancel = function () {
        this.close();
    };
    LoadingAddressComponent.prototype.select = function () {
        // set selected value
        var tmpShipping = this.component.data.tmpShipping;
        if (this.selected != undefined) {
            var selectedData = this.hotData[this.selected];
            tmpShipping.pib_loadingAddressId = selectedData.pib_id;
            tmpShipping.pib_loadingAddressName = selectedData.pib_abbr;
            tmpShipping.pib_loadingAddressCode = selectedData.pib_code;
        }
        else {
            tmpShipping.pib_loadingAddressId = undefined;
            tmpShipping.pib_loadingAddressName = "";
            tmpShipping.pib_loadingAddressCode = "";
        }
        // close modal
        this.close();
    };
    LoadingAddressComponent.prototype.doFilter = function () {
        this.hotData = this.hotGetData();
        this.hot.loadData(this.hotData);
        // clear selected
        this.selectRow(undefined);
    };
    //endregion
    //region private functions
    LoadingAddressComponent.prototype.preventSelectCell = function (event, coords) {
        if (coords.row < 0) {
            event.stopImmediatePropagation();
        }
    };
    LoadingAddressComponent.prototype.selectRow = function (row) {
        if (row != undefined) {
            this.selected = row;
        }
        else {
            this.selected = undefined;
        }
        this.hot.render();
    };
    LoadingAddressComponent.prototype.hotGetData = function () {
        var tableData = [];
        // filter
        var sourceData = this.getSourceData();
        var self = this;
        if (sourceData != undefined) {
            tableData = sourceData.filter(function (value) {
                return self.filter(value);
            });
        }
        return tableData;
    };
    LoadingAddressComponent.prototype.filter = function (value) {
        // match all keywords
        for (var _i = 0, _a = this._keywords; _i < _a.length; _i++) {
            var keyword = _a[_i];
            var match = false;
            if (value.pib_code != undefined && value.pib_code.indexOf(keyword) >= 0) {
                // code
                match = true;
            }
            else if (value.pib_abbr != undefined && value.pib_abbr.indexOf(keyword) >= 0) {
                // abbr
                match = true;
            }
            else if (value.pib_name != undefined && value.pib_name.indexOf(keyword) >= 0) {
                // name
                match = true;
            }
            if (!match) {
                return false;
            }
        }
        return true;
    };
    LoadingAddressComponent.prototype.getSourceData = function () {
        return this.component.data.loadings;
    };
    __decorate([
        core_1.ViewChild("modal"), 
        __metadata('design:type', core_1.ElementRef)
    ], LoadingAddressComponent.prototype, "modalE", void 0);
    __decorate([
        core_1.ViewChild("hot"), 
        __metadata('design:type', core_1.ElementRef)
    ], LoadingAddressComponent.prototype, "hotE", void 0);
    LoadingAddressComponent = __decorate([
        core_1.Component({
            selector: "loading-address",
            templateUrl: "LoadingAddress.component.html"
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return ProductInfoBox_component_1.ProductInfoBoxComponent; }))), 
        __metadata('design:paramtypes', [ProductInfoBox_component_1.ProductInfoBoxComponent])
    ], LoadingAddressComponent);
    return LoadingAddressComponent;
}());
exports.LoadingAddressComponent = LoadingAddressComponent;
//# sourceMappingURL=LoadingAddress.component.js.map