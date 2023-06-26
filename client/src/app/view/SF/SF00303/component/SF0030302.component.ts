import {SF00303Data} from "../SF00303.data";
import {ChangeDetectorRef, Component, OnInit, QueryList, ViewChildren} from "@angular/core";
import {SF0030301Component} from "./SF0030301.component";
import {QuotationItemType} from "../../../../helper/enum-type";
import {QuotationItem} from "../../../../model/core/QuotationItem.model";
import {DealProduct} from "../../../../model/core/DealProduct.model";
import {Item} from "../../../../model/common/Item";
import {ProductCommonFee} from "../../../../model/core/ProductCommonFee.model";
import {Product} from "../../../../model/core/Product.model";
import {Constants} from "../../../../helper/constants";
import {FormatUtil} from "../../../../util/format-util";

interface Select2Options {
    data?: any,
    tags?: any;
    allowClear?: any;
    language?: {noResults: () => string} | any;
    escapeMarkup?: any;
    processResults?: any;
    templateResult?: (object: Select2SelectionObject) => any;
    placeholder?: string | IdTextPair;
    minimumResultsForSearch?: number;
    createTag?: (params) => any;
    insertTag?: (data, tag) => any;
}

interface Select2SelectionObject {
    loading: boolean;
    disabled: boolean;
    element: HTMLOptionElement;
    id: string;
    selected: boolean;
    text: string;
    title: string;
    newOption: any;
}

/** 単位=空欄の id */
const UNIT_BLANK_ID: number = 0;


/**
 * TOP &gt; 案件概況 &gt; 見積情報  見積もり明細表示/入力セクション
 */
@Component({
    selector: 'SF0030302-Component',
    templateUrl: './SF0030302.component.html'
})
export class SF0030302Component implements OnInit {
    ngOnInit(): void {
        this.pageData.getChangeCalculator();
        this.pageData.updateDataParent();
    }

    @ViewChildren("sf0030301Rows") sf0030301Rows: QueryList<SF0030301Component>;

    /**
     * Constructor SF0030302 component
     * @param pageData
     * @param changeDetectorRef
     */
    constructor(private pageData: SF00303Data, private changeDetectorRef: ChangeDetectorRef) {
    }

    /**
     * Switch to view mode
     */
    goViewMode() {
        // calculator
        let submittedPrice = 0;
        for (let i = 0; i < this.quotationItems.length; i++) {
            submittedPrice += this.quotationItems[i].submittedPrice;
        }

        // change view mode
        this.pageData.viewMode = true;
        // disable sortable
        $('.js-table-handle_sort').sortable("option", "disabled", true);
    }

    get checkCreateQuotation(): boolean {
        return !!this.quotation.quotationCode;
    }

    get isView(): boolean {
        return this.pageData.view;
    }

    /**
     * Switch to edit mode
     */
    goEditMode() {
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
    }

    /**
     * 単位のコンボボックスオプションを生成する
     */
    private select2Option(): Select2Options {
        // 単位に空欄を含める
        let productUnitOptions
            = [{id: UNIT_BLANK_ID, text: String.fromCharCode(0xa0 /* U+00A0 &nbsp; */ )}]
                .concat(this.pageData.mstProductUnit().map(opt => ({id: opt.id, text: opt.name})));

        return {
            data: productUnitOptions,
            tags: true,
            escapeMarkup: function (markup) {
                return markup;
            },
            createTag: (params) => {
                return {
                    id: this.pageData.nextNegativeId(),
                    text: params.term.slice(0, 2),
                    newOption: true
                };
            },
            templateResult: (data: Select2SelectionObject) => {
                let $result = $("<span></span>");

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

    private applyProductTypeList() {
        let self = this;
        self.quotationItems.forEach(item => self.generateUnitSelector(item));
    }

    private generateUnitSelector(item: QuotationItem) {
        let self = this;
        let select2Options = this.select2Option();
        let hasCustomUnit = !!item.productTypeName && select2Options.data.find(o => o.text == item.productTypeName) == null;
        if (hasCustomUnit){
            let additionOpt = { id: self.pageData.nextNegativeId(), text: item.productTypeName };
            select2Options.data.unshift(additionOpt);
            item.productType = additionOpt.id;
        }

        setTimeout(() => {
            let $select = $(`#productUnit_${item.identity}`);
            $select
                .select2(select2Options)
                .on("select2:select", (event: any) => {
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
    }

    /**
     * Remove item from list
     */
    removeQuotationItem(itemIndex: number) {
        this.pageData.checkEdit = true;
        let index = itemIndex - 1;
        // get item to remove
        let item = this.pageData.quotationItems[index];
        // if remove set, change its product to normal product
        if (item.itemType == QuotationItemType.SET) {
            for (let i = index + 1; i < this.quotationItems.length; i++) {
                let childItem = this.quotationItems[i];
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
    }

    /**
     * Add new product to list
     */
    addGroups(): void {
        this.pageData.checkEdit = true;
        // create new group item
        let groupItem = new QuotationItem();
        groupItem.itemType = QuotationItemType.SET;
        // set tmp index
        this.pageData.setTmpIndex--;
        groupItem.id = this.pageData.setTmpIndex;
        // add item to list
        this.quotationItems.push(groupItem);

        this.pageData.updateDisplayNo();

        this.generateUnitSelector(groupItem);
    }

    /**
     * Add new blank row to list
     */
    addBlankItem(): void {
        this.pageData.checkEdit = true;
        // create new blank item
        let blankItem = new QuotationItem();
        blankItem.itemType = QuotationItemType.LINE;
        // add item to list
        this.quotationItems.push(blankItem);
    }

    /**
     * Add heading item
     */
    addHeadingItem(): void {
        this.pageData.checkEdit = true;
        // create new heading item
        let headingItem = new QuotationItem();
        headingItem.itemType = QuotationItemType.LINE;
        headingItem.name = "";
        // add item to list
        this.quotationItems.push(headingItem);
    }

    /**
     * Add product item
     * @param dealProduct
     */
    addProductRow(dealProduct?: DealProduct): void {
        this.pageData.checkEdit = true;
        // create new dealProduct item
        let productItem = new QuotationItem();
        productItem.itemType = QuotationItemType.PRODUCT;
        productItem.setClosedFlag = undefined;

        // set name product
        if (dealProduct != undefined) {
            let product = dealProduct.product;
            productItem.name = product.productName;
            productItem.description = FormatUtil.formatProductDescription(product, this.pageData.mstLaminations);
            // dealProduct item is linked dealProduct
            productItem.dealProductId = dealProduct.id;
            productItem.dealProduct = dealProduct;
            if (dealProduct.product.productOutputs != null) {
                productItem.dealProduct.product.productOutputs = product.productOutputs;
            } else {
                productItem.dealProduct.product.productOutputs = [];
            }
        } else {
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
    }

    /**
     * Add item product common
     * @param item
     */
    addProductCommonRow(item: Item): void {
        this.pageData.checkEdit = true;
        // create new dealProduct item
        let productItem = new QuotationItem();
        // item type
        productItem.itemType = item.itemType;
        productItem.setClosedFlag = undefined;

        // dealProduct item is linked dealProduct
        productItem.dealProductId = item.dealProduct.id;
        productItem.dealProduct = item.dealProduct;

        // set description
        productItem.description = Constants.BLANK;

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
    }

    /**
     * Enable edit mode
     * */
    enableEditMode() {
        let self = this;
        let $target_table = $('.js-table-handle_sort');
        setSortable();
        $target_table.disableSelection();
        $target_table.on('sortstart', function (evt, ui) {
            let $moved_target = jQuery(ui.item[0]);
            if ($moved_target.hasClass('group-heading')) {
                let children = [];
                let $target = $moved_target.next().next();
                while ($target.hasClass('group-child')) {
                    children.push($target.get(0))
                    let $next = $target.next();
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
                let $group_heading = findParent($moved_target);
                $moved_target.data('pre_parent', $group_heading);
            }
        }).on('sortstop', function (evt, ui) {
            // Group heading
            let $moved_target = jQuery(ui.item[0]);
            if ($moved_target.hasClass('group-heading')) {
                let $check_target = $moved_target.prev();
                if ($check_target.hasClass('group-heading') || $moved_target.next().hasClass('group-child')) {
                    $target_table.sortable('cancel');
                    return;
                }

                jQuery.each($moved_target.data('children'), function () {
                    $(this).insertAfter($moved_target);
                })
            } else if ($moved_target.hasClass('heading') || $moved_target.hasClass('blank')) {
                let $check_target = $moved_target.prev();
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
                let $check_target = $moved_target.prev();
                if (!$check_target.hasClass('group-heading') && !$check_target.hasClass('group-child')) {
                    $moved_target.removeClass('group-child');
                }
                let $current_parent = findParent($moved_target);
                let $pre_parent = $moved_target.data('pre_parent');
                if ($current_parent) {
                    // calculateGroup($current_parent);
                }
                if (!$current_parent || ($current_parent && ( $current_parent.get(0) != $pre_parent.get(0) ))) {
                    // calculateGroup($pre_parent);
                }
            }
            else {
                let $check_target = $moved_target.prev();
                if ($check_target.hasClass('group-heading') || $check_target.hasClass('group-child')) {
                    $moved_target.addClass('group-child');
                    if ($check_target.hasClass('group-heading-close') || $check_target.hasClass('group-child-hidden')) {
                        $moved_target.addClass('group-child-hidden');
                    }
                    // calculateGroup(findParent($moved_target));
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
            let $tr_group_heading = $(this).parents('.group-heading').first();
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
            let is_close = $group_heading.hasClass('group-heading-close');
            let $target = $group_heading.next();
            while ($target.hasClass('group-child')) {
                if (is_close) {
                    $target.addClass('group-child-hidden');
                }
                else {
                    $target.removeClass('group-child-hidden');
                }

                let $next = $target.next();
                if ($next.size() > 0) {
                    $target = $target.next();
                }
                else {
                    break;
                }
            }
        }

        function findParent($element) {
            if (!$element.hasClass('group-child')) return false;
            let $target = $element.prev();
            while ($target.hasClass('group-child')) {
                $target = $target.prev();
                if ($target.hasClass('group-heading')) {
                    break;
                }
            }
            return $target;
        }

    }

    /*Sort deal item list*/
    sortDealItemList() {
        // sort quotation items by itemIndex
        this.quotationItems.sort((item1, item2) => {
            return item1.itemIndex - item2.itemIndex;
        });

        // update parentId
        // temp parentId
        let parentId = undefined;
        this.quotationItems.forEach(item => {
            // check if current item is set
            if (item.itemType == QuotationItemType.SET) {
                // reset temp parentId
                parentId = item.id;
            } else if (item.itemType >= QuotationItemType.PRODUCT) {
                if (item.setClosedFlag != undefined) {
                    // update parentId for child product
                    item.parentId = parentId;
                } else {
                    // remove parentId
                    item.parentId = undefined;
                }
            }
        });
    }

    /*Update product state*/
    updateProductState() {
        this.sf0030301Rows.forEach((row, index) => {
            // update product state and parent
            if (row.itemData.itemType >= QuotationItemType.PRODUCT) {
                if (row.element.nativeElement.classList.contains("group-child")) {
                    // product is child, update closed state
                    if (row.element.nativeElement.classList.contains("group-child-hidden")) {
                        row.itemData.setClosedFlag = 1;//true - 1;
                    } else {
                        row.itemData.setClosedFlag = 0;//false - 0;
                    }
                } else {
                    // not child product, update state and parentId
                    row.itemData.setClosedFlag = undefined;
                }
            }
        });
    }

    /*Trigger menu add item*/
    triggerMenuAddItem($event) {
        $event.stopPropagation();
        $("#SF00303-dropdown-button").dropdown("toggle");
    }


    /*calculator data price, total, quantity quotation info*/


    /**
     * Method check {@link ProductCommonFee}.
     * If has value {designFee, ...} then render component .... else not render
     * @param productCommon
     * @returns {boolean}
     */
    hasProductCommonFee(productCommon?: ProductCommonFee) {
        let hasCommonFee = (FormatUtil.isNaN(productCommon.designFee) > 0)
            || FormatUtil.isNaN(productCommon.moldFee) > 0
            || FormatUtil.isNaN(productCommon.plateMakingFee) > 0
            || FormatUtil.isNaN(productCommon.resinFee) > 0
            || FormatUtil.isNaN(productCommon.woodenFee) > 0;
        return hasCommonFee;
    }

    closedQuotationItemGroups() {
        this.quotationItems.forEach(itemChid => {
            itemChid.setClosedFlag = 1;
        })
    }

    /*Format dimension display as 'size x depth x height'*/
    getDimension(product?: Product) {
        if (this.hasProduct(product))
            return FormatUtil.formatDimension(Constants.X_SEPARATOR, product.sizeW, product.sizeD, product.sizeH);

        return Constants.BLANK;
    }

    /*Check current deals-product includes product*/
    hasProduct(product?: Product) {
        return FormatUtil.hasProduct(product);
    }

    // Get list deal product
    get dealProducts() {
        return this.pageData.dealProducts;
    }

    // Get total excludedTax
    get totalExcludedTax() {
        if (this.pageData.totalExcludedTax > 99999999) {
            this.pageData.totalExcludedTax = 99999999;
        }
        return this.pageData.totalExcludedTax;
    }

    // Get consumptionTax
    get consumptionTax() {
        return this.pageData.consumptionTax;
    }

    // Get totalCost
    get totalCost() {
        return this.pageData.totalCost;
    }

    // Get deal
    get deal() {
        return this.pageData.deal;
    }

    // Get quotation
    get quotation() {
        return this.pageData.quotation;
    }

    // Get list quotation items
    get quotationItems() {
        return this.pageData.quotationItems;
    }

    // Get view mode
    get viewMode() {
        return this.pageData.viewMode;
    }

    // Get view data quotation info
    get view() {
        return this.pageData.view;
    }

    eventChange() {
        this.pageData.checkEdit = true;
    }

}
