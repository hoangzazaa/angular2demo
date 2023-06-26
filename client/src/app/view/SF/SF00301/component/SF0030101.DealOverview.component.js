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
var message_1 = require("../../../../helper/message");
var mst_data_type_1 = require("../../../../helper/mst-data-type");
var data_util_1 = require("../../../../util/data-util");
var format_util_1 = require("../../../../util/format-util");
var validator_util_1 = require("../../../../util/validator-util");
var SF00301_Customer_model_1 = require("../model/SF00301_Customer.model");
var SF00301_Deal_model_1 = require("../model/SF00301_Deal.model");
var SF00301_User_model_1 = require("../model/SF00301_User.model");
var SF00301_service_1 = require("../SF00301.service");
var SF0030101Component = (function () {
    function SF0030101Component(sf00301Service) {
        var _this = this;
        this.sf00301Service = sf00301Service;
        this.requestSubmitDeal = new core_1.EventEmitter();
        this.requestOrder = new core_1.EventEmitter();
        this.requestDesign = new core_1.EventEmitter();
        this.requestCancel = new core_1.EventEmitter();
        this.SELECT_NONE = -1;
        this.stagingDepIndex = this.SELECT_NONE;
        this.stagingPicIndex = this.SELECT_NONE;
        this.customersDatasourceLoaded = false;
        this.select2Option = {
            tags: true,
            language: {
                noResults: function () {
                    return "No any customer";
                }
            },
            escapeMarkup: function (markup) {
                return markup;
            },
            createTag: function (params) {
                return {
                    id: _this.sf00301Service.nextNegativeId(),
                    text: params.term.slice(0, 30),
                    newOption: true
                };
            },
            templateResult: function (data) {
                var $result = $("<span></span>");
                $result.text(data.text);
                if (data.newOption) {
                    $result.append(" <em>(new)</em>");
                }
                return $result;
            },
            placeholder: "得意先名",
            minimumResultsForSearch: 0
        };
    }
    Object.defineProperty(SF0030101Component.prototype, "pageData", {
        get: function () {
            return this.sf00301Service.pageData;
        },
        enumerable: true,
        configurable: true
    });
    SF0030101Component.prototype.ngOnInit = function () {
        // clone sale deal
        // http://fridaynight.vnext.vn/issues/2795
        this.pageData.departmentIdTmp = data_util_1.default.cloneObject(this.deal).saler.department.id;
    };
    SF0030101Component.prototype.ngAfterViewInit = function () {
        this.manipulateCustomers(this.deal.saler);
        this.highlightCurrentPIC();
    };
    SF0030101Component.prototype.clearDealNameErrMsg = function () {
        var errEl = $("#dealName-error");
        errEl.parent().parent().removeClass("has-error");
        errEl.remove();
    };
    SF0030101Component.prototype.manipulateCustomers = function (saler) {
        var self = this;
        self.customersDatasourceLoaded = false;
        var departmentForCustomersSource = null;
        if (!!saler.department) {
            departmentForCustomersSource = saler.department.id;
        }
        if (!!departmentForCustomersSource) {
            self.sf00301Service
                .getCustomers(departmentForCustomersSource)
                .then(function (resultList) {
                self.applyCustomersList(resultList);
            });
        }
        else {
            self.applyCustomersList([]);
        }
    };
    SF0030101Component.prototype.applyCustomersList = function (customers) {
        var _this = this;
        var self = this;
        self.customers = customers;
        if (self.deal.customer) {
            // trường hợp deal có customer, và customer ko trực thuộc sale của deal quản lý thì vẫn phải add vào list
            // để duplicate
            var customer = self.customers.find(function (item) { return item.id == self.deal.customer.id; });
            // nếu customer có trong deal nhưng không có trong list customers thì add thêm vào
            if (!!self.deal.customer.id && !customer) {
                self.customers.unshift(self.deal.customer);
            }
            else if (!self.deal.customer.id && !customer) {
                var customer_1 = new SF00301_Customer_model_1.SF00301_Customer();
                customer_1.id = self.sf00301Service.nextNegativeId();
                customer_1.customerName = self.deal.customer.customerName;
                self.deal.customer = customer_1;
                // clone customer
                // add customer to list customers
                self.customers.unshift(self.deal.customer);
            }
            if (!!!this.pageData.isUpdated) {
                this.pageData.customerTmp = data_util_1.default.cloneObject(self.deal.customer);
            }
        }
        //check sale clone and isUpdated
        if (!!this.sf00301Service.pageData.isUpdated) {
            if (this.pageData.departmentIdTmp == this.deal.saler.department.id) {
                this.deal.customer = this.pageData.customerTmp;
            }
        }
        var $select2El = $("#customerSelector");
        if (!$select2El.length)
            return;
        // turn on this flag will show select2 element, it's took a litle time before we can initialize select2,
        // so setTimeout is needed
        self.customersDatasourceLoaded = true;
        setTimeout(function () {
            $select2El
                .select2(self.select2Option)
                .on("select2:select", function (event) {
                var id = parseInt(event.target.value);
                var cus = self.customers.find(function (item) { return item.id == id; });
                if (!cus) {
                    cus = new SF00301_Customer_model_1.SF00301_Customer();
                    cus.id = id; // id always let then zero (negative number)
                    cus.customerName = event.target.options[event.target.selectedIndex].text;
                    self.deal.customerId = undefined;
                }
                else {
                    self.deal.customerName = undefined;
                }
                self.deal.customer = cus;
                // set save state is false
                self.deal.hasRegisteredCustomer = false;
                // check page is updated
                _this.sf00301Service.pageData.isUpdated = true;
            })
                .val(self.deal.customer ? self.deal.customer.id : null)
                .trigger("change");
            $(".select2-search__field").css({ "outline": "0 !important;" });
        }, 50);
    };
    Object.defineProperty(SF0030101Component.prototype, "dealType", {
        get: function () {
            if (validator_util_1.default.isEmpty(this.deal.id) || this.sf00301Service.pageData.screenMode === SF00301_service_1.SF00301Service.MODE_COPY) {
                if (!this.deal.isSaveCustomer) {
                    $('.select2-selection__rendered').css({ "border": "solid 2px #5c90d2", "border-radius": "3px" });
                }
            }
            return this.deal.dealType;
        },
        set: function (value) {
            this.deal.dealType = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030101Component.prototype, "dealTypeOption", {
        get: function () {
            //http://fridaynight.vnext.vn/issues/2944
            return mst_data_type_1.NEW_DEAL_TYPE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030101Component.prototype, "dealStatus", {
        /**
         * @deprecated Use SF00301_Deal::dealStatusDisplayName
         */
        get: function () {
            return this.deal.dealStatusDisplayName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030101Component.prototype, "canRequestOrder", {
        get: function () {
            return (this.deal.dealStatus >= mst_data_type_1.DEAL_STATUS_VALUES.DESIGN_CONFIRMED && this.deal.dealStatus < mst_data_type_1.DEAL_STATUS_VALUES.SHIPPED);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030101Component.prototype, "canRepeatOrder", {
        get: function () {
            return this.deal.dealStatus == mst_data_type_1.DEAL_STATUS_VALUES.SHIPPED;
        },
        enumerable: true,
        configurable: true
    });
    SF0030101Component.prototype.onRequestOrder = function () {
        if (this.canRequestOrder && !this.deal.isClosed) {
            this.requestOrder.emit("REQUEST_ORDER");
        }
    };
    SF0030101Component.prototype.onRepeatOrder = function () {
        if (this.canRepeatOrder && !this.deal.isClosed) {
            this.requestOrder.emit("REPEAT_ORDER");
        }
    };
    SF0030101Component.prototype.onRequestDesign = function () {
        if (this.deal.canRequestDesign && !this.deal.isClosed && !this.deal.isJobInprocess)
            this.requestDesign.emit();
    };
    SF0030101Component.prototype.submitDeal = function () {
        if (this.validateForm()) {
            this.requestSubmitDeal.emit();
        }
        else {
            $.notify({ message: message_1.default.get(message_1.MSG.SF00301.ERR015) }, { type: 'danger' });
        }
    };
    SF0030101Component.prototype.cancel = function () {
        this.requestCancel.emit();
    };
    SF0030101Component.prototype.removeCustomer = function () {
        $("#customerSelector").select2().val(null).trigger("change").select2(this.select2Option);
        this.deal.customer = null;
        this.deal.isSaveCustomer = true;
        // check page is updated
        this.sf00301Service.pageData.isUpdated = true;
    };
    SF0030101Component.prototype.toggleBookmark = function () {
        var _this = this;
        this.sf00301Service.toggleBookmark(this.deal).then(function (result) {
            _this.deal.isInMybox = result;
        });
    };
    SF0030101Component.prototype.toggleLock = function () {
        var _this = this;
        this.sf00301Service.toggleLock(this.deal).then(function (result) {
            _this.deal.isInLock = result;
        });
    };
    SF0030101Component.prototype.showModalToAssignPIC = function () {
        $("#modalSelectPIC").modal('show');
    };
    SF0030101Component.prototype.applyStagingPIC = function () {
        if (!this.choosingPIC)
            return;
        this.deal.saler = this.choosingPIC;
        this.manipulateCustomers(this.deal.saler);
        this.hideModalToAssignPIC();
        this.sf00301Service.pageData.isUpdated = true;
    };
    SF0030101Component.prototype.hideModalToAssignPIC = function () {
        $("#modalSelectPIC").modal("hide");
        this.highlightCurrentPIC();
    };
    SF0030101Component.prototype.resetPIC = function () {
        if (this.deal.saler.id != this.loginUser.id) {
            this.deal.saler = this.loginUser;
            this.manipulateCustomers(this.deal.saler);
            this.highlightCurrentPIC();
            this.sf00301Service.pageData.isUpdated = true;
            if (!this.deal.customer || !this.deal.customer.customerName) {
                this.deal.isSaveCustomer = true;
            }
        }
    };
    Object.defineProperty(SF0030101Component.prototype, "deliveryDate", {
        get: function () {
            return this.deal.deliveryDate;
        },
        enumerable: true,
        configurable: true
    });
    SF0030101Component.prototype.setDeliveryDate = function (value) {
        var dateBefore = format_util_1.FormatUtil.formatDateToString(this.deal.deliveryDate + "", "yyyy/MM/dd");
        var dateAfter = format_util_1.FormatUtil.formatDateToString(value + "", "yyyy/MM/dd");
        if (dateBefore != dateAfter) {
            this.changeData();
        }
        this.deal.deliveryDate = value;
        //this.validateForm();
    };
    Object.defineProperty(SF0030101Component.prototype, "saleNameFolowByDepartment", {
        get: function () {
            var ret = "";
            if (!!this.deal.saler) {
                ret += this.deal.saler.username;
                if (!!this.deal.saler.department)
                    ret = this.deal.saler.department.departmentName + "／" + ret;
            }
            return ret;
        },
        enumerable: true,
        configurable: true
    });
    SF0030101Component.prototype.highlightCurrentPIC = function () {
        this.stagingDepIndex = this.findDepIndex(this.deal.saler);
        this.stagingPicIndex = this.findSaleIndex(this.deal.saler);
    };
    Object.defineProperty(SF0030101Component.prototype, "choosingDep", {
        get: function () {
            return this.stagingDepIndex !== this.SELECT_NONE ? this.departments[this.stagingDepIndex] : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030101Component.prototype, "choosingPIC", {
        get: function () {
            return this.stagingPicIndex !== this.SELECT_NONE ? this.allUsersOfChoosingDep[this.stagingPicIndex] : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030101Component.prototype, "allUsersOfChoosingDep", {
        get: function () {
            return !this.choosingDep ? [] : this.choosingDep.users || [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030101Component.prototype, "dealName", {
        get: function () {
            return this.deal.dealName;
        },
        set: function (value) {
            this.deal.dealName = value;
            //this.validateForm();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030101Component.prototype, "estTotalDeal", {
        get: function () {
            return this.deal.estTotalDeal;
        },
        set: function (value) {
            this.deal.estTotalDeal = value;
            //this.validateForm();
        },
        enumerable: true,
        configurable: true
    });
    SF0030101Component.prototype.onDeparmentChanged = function (index) {
        this.stagingDepIndex = index;
        this.stagingPicIndex = this.SELECT_NONE;
    };
    SF0030101Component.prototype.onPicChanged = function (index) {
        this.stagingPicIndex = index;
    };
    SF0030101Component.prototype.findDepIndex = function (saler) {
        var index = this.departments.findIndex(function (dep) { return dep.hasUser(saler); });
        return index === -1 ? this.SELECT_NONE : index;
    };
    SF0030101Component.prototype.findSaleIndex = function (saler) {
        var index = this.allUsersOfChoosingDep.findIndex(function (usr) { return usr.id === saler.id; });
        return index === -1 ? this.SELECT_NONE : index;
    };
    Object.defineProperty(SF0030101Component.prototype, "defaultFieldBorderCss", {
        get: function () {
            return { style: "solid 2px #5c90d2", radius: "3px" };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030101Component.prototype, "errFieldBorderCss", {
        get: function () {
            return { style: "solid 2px #FF0000", radius: "3px" };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030101Component.prototype, "noneFieldBorderCss", {
        get: function () {
            return { style: "", radius: "" };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030101Component.prototype, "checkBorderDealName", {
        get: function () {
            if (validator_util_1.default.isNotEmpty(this.deal.id) && this.sf00301Service.pageData.screenMode !== SF00301_service_1.SF00301Service.MODE_COPY) {
                if (this.deal.isSaveDealName) {
                    return this.errFieldBorderCss;
                }
                else {
                    return this.noneFieldBorderCss;
                }
            }
            else {
                if (this.deal.isSaveDealName) {
                    return this.errFieldBorderCss;
                }
                else {
                    return this.defaultFieldBorderCss;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030101Component.prototype, "checkBorderDealType", {
        get: function () {
            if (validator_util_1.default.isNotEmpty(this.deal.id) && this.sf00301Service.pageData.screenMode !== SF00301_service_1.SF00301Service.MODE_COPY) {
                return this.noneFieldBorderCss;
            }
            else {
                return this.defaultFieldBorderCss;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030101Component.prototype, "checkBorderDeliveryDate", {
        get: function () {
            if (validator_util_1.default.isNotEmpty(this.deal.id) && this.sf00301Service.pageData.screenMode !== SF00301_service_1.SF00301Service.MODE_COPY) {
                if (this.deal.isSaveDeliveryDate) {
                    return this.errFieldBorderCss;
                }
                else {
                    return this.noneFieldBorderCss;
                }
            }
            else {
                if (this.deal.isSaveDeliveryDate) {
                    return this.errFieldBorderCss;
                }
                else {
                    return this.defaultFieldBorderCss;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030101Component.prototype, "checkBorderEstimate", {
        get: function () {
            if (validator_util_1.default.isEmpty(this.deal.id) || this.sf00301Service.pageData.screenMode == SF00301_service_1.SF00301Service.MODE_COPY) {
                return this.defaultFieldBorderCss;
            }
            else {
                return this.noneFieldBorderCss;
            }
        },
        enumerable: true,
        configurable: true
    });
    // validate form data deal
    SF0030101Component.prototype.validateForm = function () {
        var isValidate = true;
        // check deal name
        if (!this.deal.dealName) {
            this.deal.isSaveDealName = true;
            // check validate false
            isValidate = false;
        }
        else {
            this.deal.isSaveDealName = false;
        }
        // check customer
        if (!this.deal.customer || (!this.deal.customer && validator_util_1.default.isEmpty(this.deal.customer.customerName))) {
            this.deal.isSaveCustomer = true;
            $('.select2-selection__rendered').css({ "border": "solid 2px red", "border-radius": "3px" });
            // check validate false
            isValidate = false;
        }
        else {
            this.deal.isSaveCustomer = false;
            $('.select2-selection__rendered').css({ "border": "solid 2px white", "border-radius": "3px" });
        }
        // check delivery date
        if (!this.deal.deliveryDate) {
            this.deal.isSaveDeliveryDate = true;
            // check validate false
            isValidate = false;
        }
        else {
            this.deal.isSaveDeliveryDate = false;
        }
        return isValidate;
    };
    SF0030101Component.prototype.changeData = function () {
        this.sf00301Service.pageData.isUpdated = true;
    };
    SF0030101Component.MODE_COPY = Symbol("SF00301Service.MODE_COPY");
    __decorate([
        core_1.Input(), 
        __metadata('design:type', SF00301_Deal_model_1.SF00301_Deal)
    ], SF0030101Component.prototype, "deal", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], SF0030101Component.prototype, "departments", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], SF0030101Component.prototype, "customers", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', SF00301_User_model_1.SF00301_User)
    ], SF0030101Component.prototype, "loginUser", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], SF0030101Component.prototype, "canSelectCustomer", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Date)
    ], SF0030101Component.prototype, "defaultDeliveryDate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0030101Component.prototype, "requestSubmitDeal", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0030101Component.prototype, "requestOrder", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0030101Component.prototype, "requestDesign", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SF0030101Component.prototype, "requestCancel", void 0);
    SF0030101Component = __decorate([
        core_1.Component({
            selector: "sf0030101-dealOverview",
            templateUrl: "SF0030101.DealOverview.component.html",
            styleUrls: ['SF0030101.DealOverview.component.css']
        }), 
        __metadata('design:paramtypes', [SF00301_service_1.SF00301Service])
    ], SF0030101Component);
    return SF0030101Component;
}());
exports.SF0030101Component = SF0030101Component;
//# sourceMappingURL=SF0030101.DealOverview.component.js.map