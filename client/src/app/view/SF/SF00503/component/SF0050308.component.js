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
/**
 * Created by VuPT on 2/16/2017.
 */
var core_1 = require("@angular/core");
var SF00503_data_1 = require("../SF00503.data");
var User_model_1 = require("../../../../model/core/User.model");
/**
 * TOP &gt; 営業目標登録 ... 得意先別目標タブ ... 担当者検索モーダル
 */
var SF0050308Component = (function () {
    function SF0050308Component(sf00503Data) {
        this.sf00503Data = sf00503Data;
        this.changePicId = new core_1.EventEmitter();
    }
    Object.defineProperty(SF0050308Component.prototype, "departments", {
        get: function () {
            return this.sf00503Data.departments;
        },
        enumerable: true,
        configurable: true
    });
    SF0050308Component.prototype.changeUserDepartment = function (id) {
        this.sf00503Data.userDepartments = this.sf00503Data.departments[id].users;
        this.sf00503Data.departments.forEach(function (data) {
            data["active"] = false;
            data.users.forEach(function (user) {
                user["active"] = false;
            });
        });
        this.sf00503Data.departments[id]["active"] = true;
        // set default selected option
        if (this.sf00503Data.userDepartments) {
            this.sf00503Data.userDepartments[0]["active"] = true;
            // userPic default
            this.sf00503Data.userPicModal = this.sf00503Data.userDepartments[0];
        }
    };
    SF0050308Component.prototype.onKeywordsChange = function (tags) {
        if (tags.length > 0) {
            for (var i = 0; i < this.sf00503Data.departments.length; i++) {
                for (var j = 0; j < this.sf00503Data.departments[i].users.length; j++) {
                    var check = false;
                    for (var k = 0; k < tags.length; k++) {
                        if (this.sf00503Data.departments[i].users[j].username.indexOf(tags[k]) >= 0) {
                            check = true;
                        }
                    }
                    if (check) {
                        this.sf00503Data.userDepartments = this.sf00503Data.departments[i].users;
                        this.sf00503Data.departments.forEach(function (data) {
                            data["active"] = false;
                        });
                        this.sf00503Data.departments[i]["active"] = true;
                        this.sf00503Data.userDepartments.forEach(function (data) {
                            data["active"] = false;
                        });
                        this.sf00503Data.departments[i].users[j]["active"] = true;
                        this.sf00503Data.userPicModal = this.sf00503Data.departments[i].users[j];
                        this.sf00503Data.checkChangeUser = true;
                        return;
                    }
                }
            }
        }
    };
    SF0050308Component.prototype.changeUser = function (index) {
        this.sf00503Data.userDepartments.forEach(function (data) {
            data["active"] = false;
        });
        this.sf00503Data.userDepartments[index]["active"] = true;
        this.sf00503Data.userPicModal = this.sf00503Data.userDepartments[index];
        this.sf00503Data.checkChangeUser = true;
    };
    SF0050308Component.prototype.closeModal = function () {
        $("#searchModal" + this.modalId).modal("hide");
    };
    Object.defineProperty(SF0050308Component.prototype, "checkSelected", {
        get: function () {
            this.sf00503Data.departments.forEach(function (data) {
                data.users.forEach(function (user) {
                    if (user["active"] == true) {
                        return true;
                    }
                });
            });
            return false;
        },
        enumerable: true,
        configurable: true
    });
    SF0050308Component.prototype.submitUserPic = function () {
        // check user pic
        if (!this.sf00503Data.checkChangeUser && this.sf00503Data.userDepartments) {
            this.sf00503Data.userPicModal = this.sf00503Data.userDepartments[0];
        }
        this.changePicId.emit(this.sf00503Data.userPicModal);
        this.closeModal();
        this.sf00503Data.checkChangeUser = false;
        this.sf00503Data.userPicModal = new User_model_1.User();
        $("#searchModal" + this.modalId).modal("hide");
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], SF0050308Component.prototype, "picId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SF0050308Component.prototype, "modalId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], SF0050308Component.prototype, "departmentId", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0050308Component.prototype, "changePicId", void 0);
    SF0050308Component = __decorate([
        core_1.Component({
            selector: "sf0050308",
            templateUrl: "SF0050308.component.html"
        }), 
        __metadata('design:paramtypes', [SF00503_data_1.SF00503Data])
    ], SF0050308Component);
    return SF0050308Component;
}());
exports.SF0050308Component = SF0050308Component;
//# sourceMappingURL=SF0050308.component.js.map