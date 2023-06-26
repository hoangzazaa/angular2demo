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
var SF00309_service_1 = require("../SF00309.service");
var SF00309_helper_1 = require("../SF00309.helper");
var UserModel_1 = require("../../COMMON/model/UserModel");
var MAIL_GROUPS = "designg@sagasiki.co.jp";
var SF0030903SearchPic = (function () {
    function SF0030903SearchPic(pageSerice) {
        this.pageSerice = pageSerice;
        this.emitSelectedPic = new core_1.EventEmitter();
        this.keySearchs = [];
    }
    SF0030903SearchPic.prototype.ngAfterViewInit = function () {
        // 2424
        $('.modal').on('hidden.bs.modal', function (e) {
            if ($('.modal').hasClass('in')) {
                $('body').addClass('modal-open');
            }
        });
    };
    Object.defineProperty(SF0030903SearchPic.prototype, "pageData", {
        get: function () {
            return this.pageSerice.pageData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030903SearchPic.prototype, "departments", {
        get: function () {
            return this.pageData.departments;
        },
        enumerable: true,
        configurable: true
    });
    SF0030903SearchPic.prototype.onKeywordsChange = function (tags) {
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
            this.pageData.listDepartmentScreen = SF00309_helper_1.SF00309Helper.cloneDepartmentModel(this.pageData.departments);
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
    SF0030903SearchPic.prototype.changeDepartment = function (index) {
        // check keysearch == null
        var department = this.pageData.listDepartmentScreen[index];
        //1. reset active department
        this.resetActiveDepartment();
        department["active"] = true;
        this.pageData.listPicScreen = [];
        if (this.keySearchs == undefined || this.keySearchs.length == 0) {
            //2. get list userPic by department
            this.pageData.listPicScreen = this.pageData.listDepartmentScreen[index].users;
        }
        else {
            var userPicSearch = SF00309_helper_1.SF00309Helper.cloneUserModel(this.pageData.listPicSearch);
            this.pageData.listPicScreen = userPicSearch.filter(function (item) {
                return item.departmentId == department.id;
            });
        }
        //scoll userPic
        $('#table-body-userPic').scrollTop(0);
    };
    SF0030903SearchPic.prototype.changeUser = function (index) {
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
    SF0030903SearchPic.prototype.closeModalUserPic = function () {
        // remove all input tags
        this.removeAllInputTag();
        $("#searchModal").modal("hide");
        $("#sendRequestModal").modal('show');
        this.disabledInputTag();
    };
    SF0030903SearchPic.prototype.submitUserPic = function () {
        this.pageData.userPicModals = [];
        // get list user active
        this.addListSale();
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
    SF0030903SearchPic.prototype.disabledInputTag = function () {
        $('.tagsinput input').attr("readonly", "true");
    };
    SF0030903SearchPic.prototype.removeAllInputTag = function () {
        this.keySearchs = [];
    };
    // reset active list department
    SF0030903SearchPic.prototype.resetActiveDepartment = function () {
        this.pageData.listDepartmentScreen.forEach(function (data) {
            data["active"] = false;
            data.users.forEach(function (user) {
                user["active"] = false;
            });
        });
    };
    // add address to mail groups
    SF0030903SearchPic.prototype.addAddressToGroups = function () {
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
    SF0030903SearchPic.prototype.addListSale = function () {
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
    SF0030903SearchPic.prototype.findIndexSale = function (key, list) {
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
    ], SF0030903SearchPic.prototype, "emitSelectedPic", void 0);
    SF0030903SearchPic = __decorate([
        core_1.Component({
            selector: "[SF0030903]",
            templateUrl: "SF0030903.SearchPic.component.html"
        }), 
        __metadata('design:paramtypes', [SF00309_service_1.SF00309Service])
    ], SF0030903SearchPic);
    return SF0030903SearchPic;
}());
exports.SF0030903SearchPic = SF0030903SearchPic;
//# sourceMappingURL=SF0030903.SearchPic.component.js.map