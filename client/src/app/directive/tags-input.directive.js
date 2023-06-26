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
var core_1 = require("@angular/core");
var TagsInputDirective = (function () {
    function TagsInputDirective(el) {
        this.el = el;
        this.tagsChange = new core_1.EventEmitter();
        this._tags = [];
        this.inited = false;
    }
    Object.defineProperty(TagsInputDirective.prototype, "tags", {
        set: function (value) {
            this._tags = value;
            if (this.inited) {
                this.setTags();
            }
        },
        enumerable: true,
        configurable: true
    });
    TagsInputDirective.prototype.ngAfterViewInit = function () {
        var self = this;
        var option = {
            height: '36px',
            width: '100%',
            minInputWidth: "210px",
            defaultText: '',
            removeWithBackspace: true,
            delimiter: [', '],
            onAddTag: function (tag) {
                self.addTag(tag);
            },
            onRemoveTag: function (tag) {
                self.removeTag(tag);
            }
        };
        if (this.preAddTag != undefined) {
            option.onPreAddTag = function (tag) {
                return this.preAddTag(tag);
            };
        }
        $(this.el.nativeElement).tagsInput(option);
        this.setTags();
        this.inited = true;
    };
    TagsInputDirective.prototype.addTag = function (tag) {
        // http://fridaynight.vnext.vn/issues/2979
        this._tags.push(tag);
        this.tagsChange.emit(this._tags);
    };
    TagsInputDirective.prototype.removeTag = function (tag) {
        // http://fridaynight.vnext.vn/issues/3139
        if (tag != "") {
            this._tags = $.grep(this._tags, function (value) { return value != tag; });
            this.tagsChange.emit(this._tags);
        }
    };
    TagsInputDirective.prototype.setTags = function () {
        // http://fridaynight.vnext.vn/issues/2979
        $(this.el.nativeElement).importTags(this._tags.join(", "));
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Function)
    ], TagsInputDirective.prototype, "preAddTag", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TagsInputDirective.prototype, "tagsChange", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array), 
        __metadata('design:paramtypes', [Array])
    ], TagsInputDirective.prototype, "tags", null);
    TagsInputDirective = __decorate([
        core_1.Directive({
            selector: "[js-tags-input]"
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], TagsInputDirective);
    return TagsInputDirective;
}());
exports.TagsInputDirective = TagsInputDirective;
//# sourceMappingURL=tags-input.directive.js.map