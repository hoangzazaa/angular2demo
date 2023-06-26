"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var SFN0402_service_1 = require('./SFN0402.service');
var common_page_1 = require('../COMMON/common.page');
var router_1 = require('@angular/router');
var Header_provider_1 = require('../SF00100/Header.provider');
var constants_1 = require('../../../helper/constants');
var message_1 = require('../../../helper/message');
var screen_url_1 = require('../../../helper/screen-url');
var common_helper_1 = require('../../../helper/common-helper');
var mst_data_type_1 = require('../../../helper/mst-data-type');
var message_2 = require('../../../helper/message');
var ShippingDestinationImage_model_1 = require('../../../model/core/ShippingDestinationImage.model');
var url_util_1 = require('../../../util/url-util');
/** 届け先担当者の最大数 */
var MAX_PIC_LENGTH = 5;
/** 画像ファイル受付拡張子 */
var IMAGE_EXTENSIONS = ["JPG", "JPEG", "PNG"];
/** その他ラジオボタンの値 */
var RADIO_VALUE_OTHERS = 9999;
/** 届け先文字列項目のキー名 */
var SHIPPING_DESTINATION_STRING_KEYS = [
    'deliveryName',
    'deliveryAddress1',
    'tel',
    'fax',
    'requiredTime',
    'extraWork',
    'extraMethod',
    'memo1',
    'memo2',
    'customerId',
    'districtCode',
    'abbreviation',
    'furigana',
    'abbrFurigana',
    'postalCode',
    'deliveryAddress2',
    'extension',
    'dennoPartnerCode',
    'deliveryCompany',
    'specifyVehicleOthers',
    'deliveryTime',
    'upstairsDetailOthers',
    'unloadingPlace',
    'parkingPlace',
    'unloadForm',
    'attention'
];
/** 届け先数値項目のキー名 */
var SHIPPING_DESTINATION_NUMBER_KEYS = [
    'specifyVehicle',
    'upstairsDetail',
    'limitQuantity',
    'liftUserInUnloading'
];
/** 届け先論理型項目のキー名 */
var SHIPPING_DESTINATION_BOOLEAN_KEYS = [
    'telBeforeDelivery',
    'attachmentEbo',
    'deliveryInCaseOfBadWeather',
    'stretchFilm',
    'upstairs',
    'paletteDelivery',
    'paletteTakeBack'
];
/** 数量制限の選択リスト */
var LIMIT_QUANITITY_OPTIONS = common_helper_1.CommonHelper.getList(mst_data_type_1.LIMIT_QUANTITY_CODE_LIST, mst_data_type_1.LIMIT_QUANTITY);
/**
 * TOP &gt; 取引先検索 &gt; 取引先照会 &gt; 届け先 ページ
 *
 * @export
 * @class SFN040281ShippingDestinationPage
 * @extends {CommonPage}
 */
var SFN040281ShippingDestinationPage = (function (_super) {
    __extends(SFN040281ShippingDestinationPage, _super);
    /**
     * コンストラクタ
     *
     * @param router ルーター
     * @param route 現在のルート
     * @param headerProvider
     * @param service 得意先・取引先に関するサービス
     */
    function SFN040281ShippingDestinationPage(router, route, headerProvider, service) {
        _super.call(this, router, route);
        this.router = router;
        this.route = route;
        this.headerProvider = headerProvider;
        this.service = service;
    }
    /**
     * パンくず生成
     */
    SFN040281ShippingDestinationPage.prototype.initBreadcrumb = function () {
        var self = this;
        self.headerProvider.reset();
        self.headerProvider.pageName = "取引先照会";
        self.headerProvider.addBreadCrumb(constants_1.Constants.TOP, [constants_1.Constants.SLASH]); //Dashboard
        self.headerProvider.addBreadCrumb("取引先検索", [screen_url_1.ScreenUrl.SFN0401]); //SF003-01
        self.headerProvider.addBreadCrumb("取引先照会", [screen_url_1.ScreenUrl.SFN0402, this.customer.customerCode]);
        self.headerProvider.addBreadCrumb("届け先引き継ぎ入力");
    };
    /**
     * 初期化処理
     */
    SFN040281ShippingDestinationPage.prototype.ngOnInit = function () {
        this.service.navigateTo("届け先引き継ぎ入力", this.router.url);
        // 解決結果を記入
        this.setShippingDestination(this.route.snapshot.data['shippingDestination']);
        this.shippingDestinationList = this.route.snapshot.data['shippingDestinationList'];
        // パンくず生成
        this.initBreadcrumb();
    };
    /**
     * ビュー表示後の処理
     */
    SFN040281ShippingDestinationPage.prototype.ngAfterViewInit = function () {
        // 画像アップロードフォームを初期化
        this.initDropzone();
        // ギャラリーの初期化
        OneUI.initHelpers(['magnific-popup']);
    };
    /**
     * 編集対象届け先を設定
     *
     * null な項目を空文字列に変換する。
     *
     * @param destination 届け先 (破壊的)
     */
    SFN040281ShippingDestinationPage.prototype.setShippingDestination = function (destination) {
        // null, undefined を空文字に変換する
        for (var _i = 0, SHIPPING_DESTINATION_STRING_KEYS_1 = SHIPPING_DESTINATION_STRING_KEYS; _i < SHIPPING_DESTINATION_STRING_KEYS_1.length; _i++) {
            var key = SHIPPING_DESTINATION_STRING_KEYS_1[_i];
            destination[key] = normalize(destination[key], String, '');
        }
        for (var _a = 0, SHIPPING_DESTINATION_NUMBER_KEYS_1 = SHIPPING_DESTINATION_NUMBER_KEYS; _a < SHIPPING_DESTINATION_NUMBER_KEYS_1.length; _a++) {
            var key = SHIPPING_DESTINATION_NUMBER_KEYS_1[_a];
            destination[key] = normalize(destination[key], Number);
        }
        for (var _b = 0, SHIPPING_DESTINATION_BOOLEAN_KEYS_1 = SHIPPING_DESTINATION_BOOLEAN_KEYS; _b < SHIPPING_DESTINATION_BOOLEAN_KEYS_1.length; _b++) {
            var key = SHIPPING_DESTINATION_BOOLEAN_KEYS_1[_b];
            destination[key] = normalize(destination[key], Boolean);
        }
        // 編集対象変更
        this.destination = destination;
        this.customer = destination.customer;
        this.currentId = destination.id;
        // 正規化する (null, undefined を空文字列に変換する)
        function normalize(value, ctor, defaultValue) {
            if (defaultValue === void 0) { defaultValue = null; }
            return value != null ? ctor(value) : defaultValue;
        }
        // 変更フラグを戻す
        this.changed = false;
    };
    /**
     * 届け先を移動
     *
     * @param shippingDestinationId 表示する届け先 ID
     */
    SFN040281ShippingDestinationPage.prototype.moveTo = function (shippingDestinationId) {
        var self = this;
        var previousId = this.destination.id;
        // 変更チェック
        if (this.changed) {
            // 確認画面を表示する   ↓ こうしないとなぜかキャンセルコールバックが呼ばれない
            this.showConfirmModal(function (isConfirm) { return showForm(isConfirm); });
        }
        else {
            // 変更されていないので普通に移動
            showForm(true);
        }
        // 届け先画面遷移処理
        function showForm(isConfirm) {
            if (!isConfirm) {
                // キャンセルが押された ... もとに戻す
                self.currentId = previousId;
                return;
            }
            // History 変更
            self.router.navigate([screen_url_1.ScreenUrl.SFN0402, self.customer.customerCode, 'shipping-destination', shippingDestinationId], { replaceUrl: true });
            // 届け先情報を取得
            self.service.sfn040214GetShippingDestinationDetail(self.customer.customerCode, shippingDestinationId)
                .then(function (destination) {
                self.setShippingDestination(destination);
            });
        }
    };
    /**
     * キャンセル (得意先画面へ移動)
     */
    SFN040281ShippingDestinationPage.prototype.cancel = function (event) {
        var self = this;
        // 変更チェック
        if (this.changed) {
            this.showConfirmModal(showCustomer);
        }
        else {
            showCustomer();
        }
        // 得意先画面へ移動
        function showCustomer() {
            self.router.navigate([screen_url_1.ScreenUrl.SFN0402, self.customer.customerCode]);
        }
    };
    /**
     * フォームの変更通知 (input, change)
     *
     * @param event イベント
     */
    SFN040281ShippingDestinationPage.prototype.onFormChange = function (event) {
        this.changed = true;
        // ラジオボタンの場合
        if (event.type == 'change' && isNamedRadio(event.target, this)) {
            var input = event.target;
            var name_1 = input.name; // as keyof ShippingDestination
            // this.destination に反映させる
            var value = void 0;
            if (input.value == "true") {
                value = true;
            }
            else if (input.value == "false") {
                value = false;
            }
            else {
                value = parseInt(input.value, 10);
                value = isNaN(value) ? null : value;
            }
            this.destination[name_1] = value;
            if (name_1 == "upstairsDetail") {
                // 2F 上げ 詳細が変更されたとき ... 自動的に 2F 上げを選択する
                this.destination.upstairs = true;
            }
            else if (name_1 == "specifyVehicle" && value != RADIO_VALUE_OTHERS) {
                // 配送車両指定 (その他以外) が選択されたとき ... 自動的にその他を空欄にする
                this.destination.specifyVehicleOthers = '';
            }
            else if (name_1 == "upstairsDetail" && value != RADIO_VALUE_OTHERS) {
                // 2F 上げ (その他以外) が選択されたとき ... 自動的にその他を空欄にする
                this.destination.upstairsDetailOthers = '';
            }
            else if (name_1 == "upstairs" && value == false) {
                // 2F 上げ 無 が選択されたとき ... 自動的に詳細を空欄にする
                this.destination.upstairsDetail = null;
                this.destination.upstairsDetailOthers = '';
            }
        }
        // テキストボックスの場合
        if (event.type == 'input' && isNamedTextbox(event.target, this)) {
            var input = event.target;
            var name_2 = input.name; // as keyof ShippingDestination
            if (name_2 == "specifyVehicleOthers") {
                // 配送車両指定のその他が入力されたとき... 自動的に その他を選択する
                this.destination.specifyVehicle = RADIO_VALUE_OTHERS;
            }
            else if (name_2 == "upstairsDetailOthers") {
                // 2F上げ その他が入力された場合 ...  自動的に その他を選択する
                this.destination.upstairs = true;
                this.destination.upstairsDetail = RADIO_VALUE_OTHERS;
            }
        }
    };
    /**
     * 届け先を保存
     */
    SFN040281ShippingDestinationPage.prototype.save = function () {
        var _this = this;
        this.service.sfn040215SaveShippingDestinationDetail(this.customer.customerCode, this.destination.id, this.destination)
            .then(function () {
            $.notify({ message: message_1.MSG.SFN0402.INF005 }, { type: 'success' });
            // 変更フラグを解除
            _this.changed = false;
        }).catch(function () {
            swal(constants_1.Constants.BLANK, message_1.MSG.COM.ERR002, "error");
        });
    };
    /**
     * 届け先カルテ出力
     */
    SFN040281ShippingDestinationPage.prototype.exportShippingDestinationKarte = function () {
        return this.service.sfn040217ExportShippingDestinationKartePdf(this.customer.customerCode, this.destination.id)
            .then(function (result) { window.open(result.filePath, '_blank'); })
            .catch(function (err) { swal(constants_1.Constants.BLANK, message_1.MSG.SFN0402.ERR003, "error"); });
    };
    // ファイルアップロード関連
    // ===================================================================
    /**
     * ファイルアップロード域を初期化
     */
    SFN040281ShippingDestinationPage.prototype.initDropzone = function () {
        var self = this;
        var dropzone = this.dropzone.nativeElement;
        var $dropzone = $(dropzone).dropzone({
            url: "/CM0010101",
            uploadMultiple: false,
            parallelUploads: 1,
            dictDefaultMessage: "画像を追加するにはこちらにファイルをドロップしてください。",
            dictFileTooBig: "fileTooBig",
            maxFiles: 1,
            maxFilesize: 10,
            thumbnailWidth: constants_1.Constants.THUMBNAIL_WIDTH,
            thumbnailHeight: constants_1.Constants.THUMBNAIL_HEIGHT,
            init: function () {
                this.on("addedfile", function (file) {
                    if (this.getQueuedFiles().length > 0 || this.getUploadingFiles().length > 0) {
                        this.removeAllFiles(true); // ... and cancel uploading files
                        this.addFile(file);
                    }
                });
                this.on("success", function (file, response) {
                    var res = JSON.parse(response + '').res;
                    var messageCode = res && res.messageCode || undefined;
                    if (messageCode == "CC00101_INF001" && res.data && res.data.fileName) {
                        // アップロード成功
                        url_util_1.blobToDataURL(file, function (imageUrl) {
                            // フォームに項目を追加する
                            var image = new ShippingDestinationImage_model_1.ShippingDestinationImage();
                            image.memo = "";
                            image.image = imageUrl;
                            image.temporaryFileName = res.data.fileName;
                            self.destination.imageList.push(image);
                        });
                        // 変更フラグを立てる
                        self.changed = true;
                    }
                    else if (messageCode == "CC00101_ERR002" || messageCode == "CC00101_ERR003") {
                        // サーバ側ファイル保存エラー
                        // MEMO CC00101_ERR003 は PDF サムネイル保存エラーなのでここでは発生しない
                        swal(constants_1.Constants.BLANK, message_2.default.get(message_1.MSG.SFN0402.ERR005), "error");
                    }
                    else {
                        // その他のエラー
                        swal(constants_1.Constants.BLANK, message_2.default.get(message_1.MSG.COM.ERR001), "error");
                    }
                    // ドロップ域からファイルを削除
                    this.removeAllFiles();
                });
                this.on("maxfilesexceeded", function (file) {
                    // check file accept file then update file
                    if (isImageFile(file)) {
                        this.removeAllFiles(true); // ... and cancel uploading files
                        this.addFile(file);
                    }
                });
                this.on("error", function (file, errorMessage) {
                    if (errorMessage === "fileTooBig") {
                        swal(constants_1.Constants.BLANK, message_2.default.get(message_1.MSG.SFN0402.INF007), "error");
                        this.removeFile(file);
                        return;
                    }
                    if (!isImageFile(file)) {
                        swal(constants_1.Constants.BLANK, message_2.default.get(message_1.MSG.SFN0402.INF006), "error");
                        this.removeFile(file);
                        return;
                    }
                });
            },
            accept: function (file, done) {
                if (!isImageFile(file)) {
                    this.removeFile(file);
                    swal(constants_1.Constants.BLANK, message_2.default.get(message_1.MSG.SFN0402.INF006), "error");
                }
                done();
            }
        });
    };
    /**
     * 画像を削除する
     *
     * @param image 画像
     */
    SFN040281ShippingDestinationPage.prototype.removeImage = function (image) {
        var _this = this;
        // 画像削除処理
        var doRemove = function () {
            var index = _this.destination.imageList.indexOf(image);
            if (index >= 0) {
                _this.destination.imageList.splice(index, 1);
            }
            // 変更フラグを設定
            _this.changed = true;
        };
        // DB 未登録かつメモ欄が空欄の場合は即座に削除
        if (!image.id && !image.memo.length) {
            doRemove();
        }
        else {
            // それ以外の場合は確認して削除
            this.showConfirmModal(doRemove, message_1.MSG.SFN0402.WRN003);
        }
    };
    Object.defineProperty(SFN040281ShippingDestinationPage.prototype, "limitQuantityOptions", {
        // フォームの選択オプション
        // ===================================================================
        /**
         * 数量制限のオプション
         */
        get: function () {
            return LIMIT_QUANITITY_OPTIONS;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SFN040281ShippingDestinationPage.prototype, "memo", {
        // フォーム - モデル間の変換
        // ===================================================================
        /**
         * @return 備考欄
         */
        get: function () {
            return this.destination.memo1 + this.destination.memo2;
        },
        /**
         * @param memo 備考欄
         */
        set: function (memo) {
            this.destination.memo1 = memo.substring(0, 30);
            this.destination.memo2 = memo.substring(30);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SFN040281ShippingDestinationPage.prototype, "district", {
        /**
         * @return 地区
         */
        get: function () {
            var code = this.destination.districtCode;
            var displayName = mst_data_type_1.DISTRICT_NAME[code] || '';
            if (displayName.length) {
                return code + ":" + displayName;
            }
            else {
                return '';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SFN040281ShippingDestinationPage.prototype, "extraMethod", {
        /**
         * @return 専用伝票
         */
        get: function () {
            return mst_data_type_1.EXTRA_METHOD_NAME[this.destination.extraMethod] || '';
        },
        enumerable: true,
        configurable: true
    });
    // 確認モーダル
    // ===================================================================
    /**
     * 確認モーダルを表示する
     *
     * @param callback Ok ボタンが押されたときに実行される処理内容
     * @param message メッセージ
     */
    SFN040281ShippingDestinationPage.prototype.showConfirmModal = function (callback, message) {
        if (message === void 0) { message = message_1.MSG.SFN0402.WRN001; }
        swal({
            title: "",
            text: message,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d26a5c",
            confirmButtonText: message_1.MSG.SFN0402.WRN002,
            closeOnConfirm: true
        }, callback);
    };
    __decorate([
        core_1.ViewChild("dropzone"), 
        __metadata('design:type', core_1.ElementRef)
    ], SFN040281ShippingDestinationPage.prototype, "dropzone", void 0);
    SFN040281ShippingDestinationPage = __decorate([
        core_1.Component({
            templateUrl: "SFN040281.ShippingDestination.page.html",
            providers: [SFN0402_service_1.SFN0402Service]
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, Header_provider_1.HeaderProvider, SFN0402_service_1.SFN0402Service])
    ], SFN040281ShippingDestinationPage);
    return SFN040281ShippingDestinationPage;
}(common_page_1.CommonPage));
exports.SFN040281ShippingDestinationPage = SFN040281ShippingDestinationPage;
/**
 * 画像ファイルかどうか判定する
 *
 * @param file dropzone ファイル
 * @returns true: 画像, false: 画像ファイルではない
 */
function isImageFile(file) {
    var ext = file.name.split(".").pop().toUpperCase();
    return IMAGE_EXTENSIONS.find(function (el) { return el == ext; }) != null;
}
/**
 * 届け先のラジオボタンかどうか判定する
 *
 * @param target イベントターゲット
 * @returns true: ラジオボタン, false: ラジオボタンではない
 */
function isNamedRadio(target, self) {
    var element = event.target;
    return element.nodeName == "INPUT" && element.type == "radio"
        && element.name && element.name in self.destination;
}
/**
 * 届け先のテキストボックスかどうか判定する
 *
 * @param target イベントターゲット
 * @returns true: テキストボックス, false: テキストボックスではない
 */
function isNamedTextbox(target, self) {
    var element = event.target;
    return element.nodeName == "INPUT" && element.type == "text"
        && element.name && element.name in self.destination;
}
//# sourceMappingURL=SFN040281.ShippingDestination.page.js.map