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
var UserModel_1 = require("../../COMMON/model/UserModel");
var SF00306_helper_1 = require("../SF00306.helper");
var SF00306_service_1 = require("../SF00306.service");
var MAIL_GROUPS = "designg@sagasiki.co.jp";
var SF0030602SearchPic = (function () {
    function SF0030602SearchPic(sf00306Service) {
        this.sf00306Service = sf00306Service;
        this.emitSelectedPic = new core_1.EventEmitter();
        this.keySearchs = [];
    }
    SF0030602SearchPic.prototype.ngAfterViewInit = function () {
        // 2424
        $('.modal').on('hidden.bs.modal', function (e) {
            if ($('.modal').hasClass('in')) {
                $('body').addClass('modal-open');
            }
        });
    };
    Object.defineProperty(SF0030602SearchPic.prototype, "pageData", {
        get: function () {
            return this.sf00306Service.pageData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030602SearchPic.prototype, "departments", {
        get: function () {
            return this.pageData.departments;
        },
        enumerable: true,
        configurable: true
    });
    SF0030602SearchPic.prototype.onKeywordsChange = function (tags) {
        this.keySearchs = tags;
        // create list search
        this.pageData.listDepartmentScreen = [];
        this.pageData.listPicScreen = [];
        this.pageData.listPicSearch = [];
        //1. reset active
        this.resetActiveDepartment();
        if (tags.length > 0) {
            for (var i = 0; i < this.pageData.departments.length; i++) {
                var _loop_1 = function(j) {
                    var check = false;
                    // check username in list key
                    for (var k = 0; k < tags.length; k++) {
                        if (this_1.pageData.departments[i].users[j].username.indexOf(tags[k]) >= 0) {
                            check = true;
                        }
                    }
                    // add user and department selected
                    if (check) {
                        var department_1 = this_1.pageData.departments[i];
                        var userPic = this_1.pageData.departments[i].users[j];
                        //1. reset active selected
                        this_1.resetActiveDepartment();
                        //2. get department and add to list searchDepartment(check department da ton tai)
                        var checkIn = this_1.pageData.listDepartmentScreen.findIndex(function (item) {
                            return item.id == department_1.id;
                        });
                        // if department not in list departmentScreen then add dept
                        if (checkIn < 0)
                            this_1.pageData.listDepartmentScreen.push(department_1);
                        //3. add userPic to list listUser
                        this_1.pageData.listPicScreen.push(userPic);
                        this_1.pageData.listPicSearch.push(userPic);
                    }
                };
                var this_1 = this;
                for (var j = 0; j < this.pageData.departments[i].users.length; j++) {
                    _loop_1(j);
                }
            }
        }
        else {
            //2. active by userPic selected
            this.pageData.listDepartmentScreen = SF00306_helper_1.SF00306Helper.cloneDepartmentModel(this.pageData.departments);
            var departmentSlt = this.pageData.listDepartmentScreen[0];
            departmentSlt['active'] = true;
            //3. list userPic
            this.pageData.listPicScreen = departmentSlt.users;
        }
        // check if 1 record
        if (this.pageData.listDepartmentScreen.length == 1) {
            this.pageData.listDepartmentScreen[0]['active'] = true;
            if (this.pageData.listPicSearch.length == 1) {
                this.pageData.listPicSearch[0]['active'] = true;
            }
        }
    };
    SF0030602SearchPic.prototype.changeDepartment = function (index) {
        // check keysearch == null
        var department = this.pageData.listDepartmentScreen[index];
        //1. reset active department
        this.resetActiveDepartment();
        department["active"] = true;
        this.pageData.listPicScreen = [];
        // check all
        if (this.keySearchs == undefined || this.keySearchs.length == 0) {
            //2. get list userPic by department
            this.pageData.listPicScreen = this.pageData.listDepartmentScreen[index].users;
        }
        else {
            var userPicSearch = SF00306_helper_1.SF00306Helper.cloneUserModel(this.pageData.listPicSearch);
            this.pageData.listPicScreen = userPicSearch.filter(function (item) {
                return item.departmentId == department.id;
            });
        }
        //scoll userPic
        $('#table-body-userPic').scrollTop(0);
    };
    SF0030602SearchPic.prototype.changeUser = function (index) {
        var userPic = this.pageData.listPicScreen[index];
        // check active
        if (userPic["active"] == true) {
            //1. active = false
            userPic["active"] = false;
            //2. reset active department
            var department = this.pageData.listDepartmentScreen.find(function (item) { return item.id == userPic.departmentId; });
            if (!!this.keySearchs && this.keySearchs.length > 0)
                department['active'] = false;
        }
        else {
            //1. active = true
            userPic["active"] = true;
            //2. set department by userPic selected
            var department = this.pageData.listDepartmentScreen.find(function (item) { return item.id == userPic.departmentId; });
            department['active'] = true;
        }
    };
    SF0030602SearchPic.prototype.closeModalUserPic = function () {
        // remove all input tags
        this.removeAllInputTag();
        $("#searchModal").modal("hide");
        $("#sendRequestModal").modal('show');
        this.disabledInputTag();
    };
    SF0030602SearchPic.prototype.submitUserPic = function () {
        // add list sale
        this.addListSale();
        // add groups
        this.addAddressToGroups();
        // get list user active
        this.closeModalUserPic();
        // emit action add email address user pic
        this.emitSelectedPic.emit();
        // disabled input tags
        this.disabledInputTag();
        // remove all input tags
        this.removeAllInputTag();
    };
    SF0030602SearchPic.prototype.disabledInputTag = function () {
        $('.tagsinput input').attr("readonly", "true");
    };
    SF0030602SearchPic.prototype.removeAllInputTag = function () {
        this.keySearchs = [];
    };
    // reset active list department
    SF0030602SearchPic.prototype.resetActiveDepartment = function () {
        this.pageData.listDepartmentScreen.forEach(function (data) {
            data["active"] = false;
            data.users.forEach(function (user) {
                user["active"] = false;
            });
        });
    };
    // add address to mail groups
    SF0030602SearchPic.prototype.addAddressToGroups = function () {
        var _this = this;
        this.pageData.listDepartmentScreen.forEach(function (item) {
            // check department groups using
            var saleGroups = new UserModel_1.UserModel();
            saleGroups.username = item.department;
            saleGroups.email = MAIL_GROUPS;
            saleGroups.id = item.id + 1000000;
            var index = _this.findIndexSale(saleGroups.id, _this.pageData.userPicModals);
            if (index < 0 && item['active'] && item.mailGroupFlag == 1) {
                // check department choose
                var indexUserChoose = _this.pageData.listPicScreen.findIndex(function (item) { return item["active"] == true; });
                if (indexUserChoose < 0) {
                    _this.pageData.userPicModals.push(saleGroups);
                }
            }
        });
    };
    // add list sale
    SF0030602SearchPic.prototype.addListSale = function () {
        var _this = this;
        this.pageData.userPicModals = [];
        // get list user active
        this.pageData.listPicScreen.forEach(function (item) {
            var index = _this.findIndexSale(item.id, _this.pageData.userPicModals);
            if (item['active'] && index < 0) {
                _this.pageData.userPicModals.push(item);
            }
        });
    };
    SF0030602SearchPic.prototype.findIndexSale = function (key, list) {
        if (!!!list) {
            return -1;
        }
        var index = list.findIndex(function (item) {
            return item.id == key;
        });
        return index;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0030602SearchPic.prototype, "emitSelectedPic", void 0);
    SF0030602SearchPic = __decorate([
        core_1.Component({
            selector: "sf0030602",
            templateUrl: "SF0030602.SearchPic.component.html"
        }), 
        __metadata('design:paramtypes', [SF00306_service_1.SF00306Service])
    ], SF0030602SearchPic);
    return SF0030602SearchPic;
}());
exports.SF0030602SearchPic = SF0030602SearchPic;
//# sourceMappingURL=SF0030602.SearchPic.component.js.map