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
var SF00303_data_1 = require("../SF00303.data");
var core_1 = require("@angular/core");
var enum_type_1 = require("../../../../helper/enum-type");
var QuotationItem_model_1 = require("../../../../model/core/QuotationItem.model");
var constants_1 = require("../../../../helper/constants");
var format_util_1 = require("../../../../util/format-util");
/** 単位=空欄の id */
var UNIT_BLANK_ID = 0;
/**
 * TOP &gt; 案件概況 &gt; 見積情報  見積もり明細表示/入力セクション
 */
var SF0030302Component = (function () {
    /**
     * Constructor SF0030302 component
     * @param pageData
     * @param changeDetectorRef
     */
    function SF0030302Component(pageData, changeDetectorRef) {
        this.pageData = pageData;
        this.changeDetectorRef = changeDetectorRef;
    }
    SF0030302Component.prototype.ngOnInit = function () {
        this.pageData.getChangeCalculator();
        this.pageData.updateDataParent();
    };
    /**
     * Switch to view mode
     */
    SF0030302Component.prototype.goViewMode = function () {
        // calculator
        var submittedPrice = 0;
        for (var i = 0; i < this.quotationItems.length; i++) {
            submittedPrice += this.quotationItems[i].submittedPrice;
        }
        // change view mode
        this.pageData.viewMode = true;
        // disable sortable
        $('.js-table-handle_sort').sortable("option", "disabled", true);
    };
    Object.defineProperty(SF0030302Component.prototype, "checkCreateQuotation", {
        get: function () {
            return !!this.quotation.quotationCode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030302Component.prototype, "isView", {
        get: function () {
            return this.pageData.view;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Switch to edit mode
     */
    SF0030302Component.prototype.goEditMode = function () {
        // change view mode
        this.pageData.viewMode = false;
        // init sortable for edit mode
        if (this.pageData.inited) {
            this.enableEditMode();
            this.pageData.inited = false;
        }
        // enable sortable
        $('.js-table-handle_sort').sortable("option", "disabled", false);
        this.applyProductTypeList();
    };
    /**
     * 単位のコンボボックスオプションを生成する
     */
    SF0030302Component.prototype.select2Option = function () {
        var _this = this;
        // 単位に空欄を含める
        var productUnitOptions = [{ id: UNIT_BLANK_ID, text: String.fromCharCode(0xa0 /* U+00A0 &nbsp; */) }]
            .concat(this.pageData.mstProductUnit().map(function (opt) { return ({ id: opt.id, text: opt.name }); }));
        return {
            data: productUnitOptions,
            tags: true,
            escapeMarkup: function (markup) {
                return markup;
            },
            createTag: function (params) {
                return {
                    id: _this.pageData.nextNegativeId(),
                    text: params.term.slice(0, 2),
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
            placeholder: '',
            minimumResultsForSearch: 0
        };
    };
    ;
    SF0030302Component.prototype.applyProductTypeList = function () {
        var self = this;
        self.quotationItems.forEach(function (item) { return self.generateUnitSelector(item); });
    };
    SF0030302Component.prototype.generateUnitSelector = function (item) {
        var self = this;
        var select2Options = this.select2Option();
        var hasCustomUnit = !!item.productTypeName && select2Options.data.find(function (o) { return o.text == item.productTypeName; }) == null;
        if (hasCustomUnit) {
            var additionOpt = { id: self.pageData.nextNegativeId(), text: item.productTypeName };
            select2Options.data.unshift(additionOpt);
            item.productType = additionOpt.id;
        }
        setTimeout(function () {
            var $select = $("#productUnit_" + item.identity);
            $select
                .select2(select2Options)
                .on("select2:select", function (event) {
                item.productType = parseInt(event.target.value);
                item.productTypeName = event.target.options[event.target.selectedIndex].text;
                self.pageData.checkEdit = true;
                // 単位が空欄のときの処理
                if (item.productType == UNIT_BLANK_ID) {
                    item.productTypeName = '';
                    item.quantity = 0;
                }
                self.pageData.updateDataParent();
                self.pageData.getChangeCalculator();
            })
                .val(!!item.productType ? item.productType : null)
                .trigger("change");
        }, 50);
    };
    /**
     * Remove item from list
     */
    SF0030302Component.prototype.removeQuotationItem = function (itemIndex) {
        this.pageData.checkEdit = true;
        var index = itemIndex - 1;
        // get item to remove
        var item = this.pageData.quotationItems[index];
        // if remove set, change its product to normal product
        if (item.itemType == enum_type_1.QuotationItemType.SET) {
            for (var i = index + 1; i < this.quotationItems.length; i++) {
                var childItem = this.quotationItems[i];
                if (childItem.setClosedFlag == undefined) {
                    break;
                }
                childItem.setClosedFlag = undefined;
            }
        }
        // remove item
        this.quotationItems.splice(index, 1);
        // find no
        this.pageData.updateDisplayNo();
        // update calculator
        this.pageData.updateDataParent();
        this.pageData.getChangeCalculator();
        // update data by lot
        this.pageData.checkLotValue();
    };
    /**
     * Add new product to list
     */
    SF0030302Component.prototype.addGroups = function () {
        this.pageData.checkEdit = true;
        // create new group item
        var groupItem = new QuotationItem_model_1.QuotationItem();
        groupItem.itemType = enum_type_1.QuotationItemType.SET;
        // set tmp index
        this.pageData.setTmpIndex--;
        groupItem.id = this.pageData.setTmpIndex;
        // add item to list
        this.quotationItems.push(groupItem);
        this.pageData.updateDisplayNo();
        this.generateUnitSelector(groupItem);
    };
    /**
     * Add new blank row to list
     */
    SF0030302Component.prototype.addBlankItem = function () {
        this.pageData.checkEdit = true;
        // create new blank item
        var blankItem = new QuotationItem_model_1.QuotationItem();
        blankItem.itemType = enum_type_1.QuotationItemType.LINE;
        // add item to list
        this.quotationItems.push(blankItem);
    };
    /**
     * Add heading item
     */
    SF0030302Component.prototype.addHeadingItem = function () {
        this.pageData.checkEdit = true;
        // create new heading item
        var headingItem = new QuotationItem_model_1.QuotationItem();
        headingItem.itemType = enum_type_1.QuotationItemType.LINE;
        headingItem.name = "";
        // add item to list
        this.quotationItems.push(headingItem);
    };
    /**
     * Add product item
     * @param dealProduct
     */
    SF0030302Component.prototype.addProductRow = function (dealProduct) {
        this.pageData.checkEdit = true;
        // create new dealProduct item
        var productItem = new QuotationItem_model_1.QuotationItem();
        productItem.itemType = enum_type_1.QuotationItemType.PRODUCT;
        productItem.setClosedFlag = undefined;
        // set name product
        if (dealProduct != undefined) {
            var product = dealProduct.product;
            productItem.name = product.productName;
            productItem.description = format_util_1.FormatUtil.formatProductDescription(product, this.pageData.mstLaminations);
            // dealProduct item is linked dealProduct
            productItem.dealProductId = dealProduct.id;
            productItem.dealProduct = dealProduct;
            if (dealProduct.product.productOutputs != null) {
                productItem.dealProduct.product.productOutputs = product.productOutputs;
            }
            else {
                productItem.dealProduct.product.productOutputs = [];
            }
        }
        else {
            productItem.dealProductId = undefined;
        }
        productItem.quantity = 0;
        productItem.submittedPrice = 0;
        productItem.total = 0;
        // add item to list
        this.quotationItems.push(productItem);
        // find no
        this.pageData.updateDisplayNo();
        // update data by lot
        this.pageData.checkLotValue();
        this.generateUnitSelector(productItem);
    };
    /**
     * Add item product common
     * @param item
     */
    SF0030302Component.prototype.addProductCommonRow = function (item) {
        this.pageData.checkEdit = true;
        // create new dealProduct item
        var productItem = new QuotationItem_model_1.QuotationItem();
        // item type
        productItem.itemType = item.itemType;
        productItem.setClosedFlag = undefined;
        // dealProduct item is linked dealProduct
        productItem.dealProductId = item.dealProduct.id;
        productItem.dealProduct = item.dealProduct;
        // set description
        productItem.description = constants_1.Constants.BLANK;
        // set quantity
        productItem.quantity = 1;
        // set name product
        productItem.name = item.valueName;
        // set submittedPrice
        productItem.submittedPrice = item.valueNumber;
        // set total price
        productItem.total = productItem.submittedPrice;
        // add item to list
        this.quotationItems.push(productItem);
        // find no
        this.pageData.updateDisplayNo();
        // update data by lot
        this.pageData.checkLotValue();
    };
    /**
     * Enable edit mode
     * */
    SF0030302Component.prototype.enableEditMode = function () {
        var self = this;
        var $target_table = $('.js-table-handle_sort');
        setSortable();
        $target_table.disableSelection();
        $target_table.on('sortstart', function (evt, ui) {
            var $moved_target = jQuery(ui.item[0]);
            if ($moved_target.hasClass('group-heading')) {
                var children = [];
                var $target = $moved_target.next().next();
                while ($target.hasClass('group-child')) {
                    children.push($target.get(0));
                    var $next = $target.next();
                    if ($next.length > 0) {
                        $target = $target.next();
                    }
                    else {
                        break;
                    }
                }
                $moved_target.data('children', children);
            }
            else if ($moved_target.hasClass('group-child')) {
                var $group_heading = findParent($moved_target);
                $moved_target.data('pre_parent', $group_heading);
            }
        }).on('sortstop', function (evt, ui) {
            // Group heading
            var $moved_target = jQuery(ui.item[0]);
            if ($moved_target.hasClass('group-heading')) {
                var $check_target = $moved_target.prev();
                if ($check_target.hasClass('group-heading') || $moved_target.next().hasClass('group-child')) {
                    $target_table.sortable('cancel');
                    return;
                }
                jQuery.each($moved_target.data('children'), function () {
                    $(this).insertAfter($moved_target);
                });
            }
            else if ($moved_target.hasClass('heading') || $moved_target.hasClass('blank')) {
                var $check_target = $moved_target.prev();
                if ($check_target.hasClass('group-heading')) {
                    if ($check_target.hasClass('group-heading-close')) {
                        while ($moved_target.next().hasClass('group-child')) {
                            //move after record
                            $moved_target.next().after($moved_target);
                        }
                    }
                }
                if ($moved_target.next().hasClass('group-child')) {
                    $target_table.sortable('cancel');
                    return;
                }
            }
            else if ($moved_target.hasClass('group-child')) {
                var $check_target = $moved_target.prev();
                if (!$check_target.hasClass('group-heading') && !$check_target.hasClass('group-child')) {
                    $moved_target.removeClass('group-child');
                }
                var $current_parent = findParent($moved_target);
                var $pre_parent = $moved_target.data('pre_parent');
                if ($current_parent) {
                }
                if (!$current_parent || ($current_parent && ($current_parent.get(0) != $pre_parent.get(0)))) {
                }
            }
            else {
                var $check_target = $moved_target.prev();
                if ($check_target.hasClass('group-heading') || $check_target.hasClass('group-child')) {
                    $moved_target.addClass('group-child');
                    if ($check_target.hasClass('group-heading-close') || $check_target.hasClass('group-child-hidden')) {
                        $moved_target.addClass('group-child-hidden');
                    }
                }
            }
            resetSortTarget();
            self.pageData.checkEdit = true;
            self.pageData.checkLotValue();
            // update product state
            self.updateProductState();
            self.changeDetectorRef.detectChanges();
            self.sortDealItemList();
            // update display no
            self.changeDetectorRef.detectChanges();
            self.pageData.updateDisplayNo();
            // calculator data parent and data submit quotation
            self.changeDetectorRef.detectChanges();
            // update data parent call detect chages
            self.pageData.updateDataParent();
            // update data change calculator
            self.changeDetectorRef.detectChanges();
            self.pageData.getChangeCalculator();
        });
        $target_table.on('click', '.group-heading .btn-group-toggle', function (evt) {
            var $tr_group_heading = $(this).parents('.group-heading').first();
            $tr_group_heading.toggleClass('group-heading-close');
            checkGroupState($tr_group_heading);
        });
        $target_table.find('.group-heading').each(function () {
            checkGroupState($(this));
        });
        function setSortable() {
            $('.js-table-handle_sort').sortable({
                items: "tbody tr",
                cursor: "move"
            });
        }
        function resetSortTarget() {
            $('.js-table-handle_sort').sortable("option", "items", "tbody tr");
        }
        function checkGroupState($group_heading) {
            var is_close = $group_heading.hasClass('group-heading-close');
            var $target = $group_heading.next();
            while ($target.hasClass('group-child')) {
                if (is_close) {
                    $target.addClass('group-child-hidden');
                }
                else {
                    $target.removeClass('group-child-hidden');
                }
                var $next = $target.next();
                if ($next.size() > 0) {
                    $target = $target.next();
                }
                else {
                    break;
                }
            }
        }
        function findParent($element) {
            if (!$element.hasClass('group-child'))
                return false;
            var $target = $element.prev();
            while ($target.hasClass('group-child')) {
                $target = $target.prev();
                if ($target.hasClass('group-heading')) {
                    break;
                }
            }
            return $target;
        }
    };
    /*Sort deal item list*/
    SF0030302Component.prototype.sortDealItemList = function () {
        // sort quotation items by itemIndex
        this.quotationItems.sort(function (item1, item2) {
            return item1.itemIndex - item2.itemIndex;
        });
        // update parentId
        // temp parentId
        var parentId = undefined;
        this.quotationItems.forEach(function (item) {
            // check if current item is set
            if (item.itemType == enum_type_1.QuotationItemType.SET) {
                // reset temp parentId
                parentId = item.id;
            }
            else if (item.itemType >= enum_type_1.QuotationItemType.PRODUCT) {
                if (item.setClosedFlag != undefined) {
                    // update parentId for child product
                    item.parentId = parentId;
                }
                else {
                    // remove parentId
                    item.parentId = undefined;
                }
            }
        });
    };
    /*Update product state*/
    SF0030302Component.prototype.updateProductState = function () {
        this.sf0030301Rows.forEach(function (row, index) {
            // update product state and parent
            if (row.itemData.itemType >= enum_type_1.QuotationItemType.PRODUCT) {
                if (row.element.nativeElement.classList.contains("group-child")) {
                    // product is child, update closed state
                    if (row.element.nativeElement.classList.contains("group-child-hidden")) {
                        row.itemData.setClosedFlag = 1; //true - 1;
                    }
                    else {
                        row.itemData.setClosedFlag = 0; //false - 0;
                    }
                }
                else {
                    // not child product, update state and parentId
                    row.itemData.setClosedFlag = undefined;
                }
            }
        });
    };
    /*Trigger menu add item*/
    SF0030302Component.prototype.triggerMenuAddItem = function ($event) {
        $event.stopPropagation();
        $("#SF00303-dropdown-button").dropdown("toggle");
    };
    /*calculator data price, total, quantity quotation info*/
    /**
     * Method check {@link ProductCommonFee}.
     * If has value {designFee, ...} then render component .... else not render
     * @param productCommon
     * @returns {boolean}
     */
    SF0030302Component.prototype.hasProductCommonFee = function (productCommon) {
        var hasCommonFee = (format_util_1.FormatUtil.isNaN(productCommon.designFee) > 0)
            || format_util_1.FormatUtil.isNaN(productCommon.moldFee) > 0
            || format_util_1.FormatUtil.isNaN(productCommon.plateMakingFee) > 0
            || format_util_1.FormatUtil.isNaN(productCommon.resinFee) > 0
            || format_util_1.FormatUtil.isNaN(productCommon.woodenFee) > 0;
        return hasCommonFee;
    };
    SF0030302Component.prototype.closedQuotationItemGroups = function () {
        this.quotationItems.forEach(function (itemChid) {
            itemChid.setClosedFlag = 1;
        });
    };
    /*Format dimension display as 'size x depth x height'*/
    SF0030302Component.prototype.getDimension = function (product) {
        if (this.hasProduct(product))
            return format_util_1.FormatUtil.formatDimension(constants_1.Constants.X_SEPARATOR, product.sizeW, product.sizeD, product.sizeH);
        return constants_1.Constants.BLANK;
    };
    /*Check current deals-product includes product*/
    SF0030302Component.prototype.hasProduct = function (product) {
        return format_util_1.FormatUtil.hasProduct(product);
    };
    Object.defineProperty(SF0030302Component.prototype, "dealProducts", {
        // Get list deal product
        get: function () {
            return this.pageData.dealProducts;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030302Component.prototype, "totalExcludedTax", {
        // Get total excludedTax
        get: function () {
            if (this.pageData.totalExcludedTax > 99999999) {
                this.pageData.totalExcludedTax = 99999999;
            }
            return this.pageData.totalExcludedTax;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030302Component.prototype, "consumptionTax", {
        // Get consumptionTax
        get: function () {
            return this.pageData.consumptionTax;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030302Component.prototype, "totalCost", {
        // Get totalCost
        get: function () {
            return this.pageData.totalCost;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030302Component.prototype, "deal", {
        // Get deal
        get: function () {
            return this.pageData.deal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030302Component.prototype, "quotation", {
        // Get quotation
        get: function () {
            return this.pageData.quotation;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030302Component.prototype, "quotationItems", {
        // Get list quotation items
        get: function () {
            return this.pageData.quotationItems;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030302Component.prototype, "viewMode", {
        // Get view mode
        get: function () {
            return this.pageData.viewMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SF0030302Component.prototype, "view", {
        // Get view data quotation info
        get: function () {
            return this.pageData.view;
        },
        enumerable: true,
        configurable: true
    });
    SF0030302Component.prototype.eventChange = function () {
        this.pageData.checkEdit = true;
    };
    __decorate([
        core_1.ViewChildren("sf0030301Rows"), 
        __metadata('design:type', core_1.QueryList)
    ], SF0030302Component.prototype, "sf0030301Rows", void 0);
    SF0030302Component = __decorate([
        core_1.Component({
            selector: 'SF0030302-Component',
            templateUrl: './SF0030302.component.html'
        }), 
        __metadata('design:paramtypes', [SF00303_data_1.SF00303Data, core_1.ChangeDetectorRef])
    ], SF0030302Component);
    return SF0030302Component;
}());
exports.SF0030302Component = SF0030302Component;
//# sourceMappingURL=SF0030302.component.js.map