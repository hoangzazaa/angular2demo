import { Component, OnInit, ViewChild, Inject, AfterViewInit, ElementRef } from '@angular/core';
import { SFN0402Service } from './SFN0402.service';
import { CommonPage } from '../COMMON/common.page';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderProvider } from '../SF00100/Header.provider';
import { Constants } from '../../../helper/constants';
import { PartnerModel } from '../SFN0401/model/SFN0401_Partner.model';
import { SFN0402Data } from './SFN0402.data';
import { MSG } from '../../../helper/message';
import { SFN0402Constants } from './SFN0402.constants';
import { ShippingDestinationModel } from '../SFN0307/model/ShippingDestination.model';
import { ShippingDestination } from '../../../model/core/ShippingDestination.model';
import { ScreenUrl } from '../../../helper/screen-url';
import { Customer } from '../../../model/core/Customer.model';
import { CommonHelper, Option } from '../../../helper/common-helper';
import { DISTRICT_NAME, VEHICLE_SIZE, VEHICLE_SIZE_CODE_LIST, EXTRA_METHOD_NAME, LIMIT_QUANTITY, LIMIT_QUANTITY_CODE_LIST } from '../../../helper/mst-data-type';
import { SpecifyTimeModalModel } from '../../../component/specify-time-modal/SpecifyTimeModal.model';
import { SpecifyTimeModalHelper } from '../../../component/specify-time-modal/SpecifyTimeModal.helper';
import Messages from '../../../helper/message';
import { ResponseJson, DataJson } from '../../../response/ResponseJson';
import { ShippingDestinationImage } from '../../../model/core/ShippingDestinationImage.model';
import { blobToDataURL } from '../../../util/url-util';

/** 届け先担当者の最大数 */
const MAX_PIC_LENGTH = 5;
/** 画像ファイル受付拡張子 */
const IMAGE_EXTENSIONS = ["JPG", "JPEG", "PNG"];
/** その他ラジオボタンの値 */
const RADIO_VALUE_OTHERS = 9999;

/** 届け先文字列項目のキー名 */
const SHIPPING_DESTINATION_STRING_KEYS: string/*keyof ShippingDestination*/[] = [
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
const SHIPPING_DESTINATION_NUMBER_KEYS: string/*keyof ShippingDestination*/[] = [
    'specifyVehicle',
    'upstairsDetail',
    'limitQuantity',
    'liftUserInUnloading'
];
/** 届け先論理型項目のキー名 */
const SHIPPING_DESTINATION_BOOLEAN_KEYS: string/*keyof ShippingDestination*/[] = [
    'telBeforeDelivery',
    'attachmentEbo',
    'deliveryInCaseOfBadWeather',
    'stretchFilm',
    'upstairs',
    'paletteDelivery',
    'paletteTakeBack'
];

/** 数量制限の選択リスト */
const LIMIT_QUANITITY_OPTIONS = CommonHelper.getList(LIMIT_QUANTITY_CODE_LIST, LIMIT_QUANTITY);


/**
 * TOP &gt; 取引先検索 &gt; 取引先照会 &gt; 届け先 ページ
 *
 * @export
 * @class SFN040281ShippingDestinationPage
 * @extends {CommonPage}
 */
@Component({
    templateUrl: "SFN040281.ShippingDestination.page.html",
    providers: [SFN0402Service]
})
export class SFN040281ShippingDestinationPage extends CommonPage implements OnInit, AfterViewInit {

    /** 得意先 */
    customer: Customer;
    /** 届け先 */
    destination: ShippingDestination;
    /** 届け先一覧 */
    shippingDestinationList: ShippingDestination[];
    /** 変更フラグ true: 変更あり, false: 変更なし */
    changed: boolean;
    /** 現在選択中の届け先 ID */
    currentId: number;

    /** ファイルアップロードエリア */
    @ViewChild("dropzone") dropzone: ElementRef;


    /**
     * コンストラクタ
     *
     * @param router ルーター
     * @param route 現在のルート
     * @param headerProvider
     * @param service 得意先・取引先に関するサービス
     */
    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public headerProvider: HeaderProvider,
        private service: SFN0402Service
    ) {
        super(router, route);
    }

    /**
     * パンくず生成
     */
    protected initBreadcrumb(): void {
        let self = this;

        self.headerProvider.reset();
        self.headerProvider.pageName = "取引先照会";
        self.headerProvider.addBreadCrumb(Constants.TOP, [Constants.SLASH]); //Dashboard
        self.headerProvider.addBreadCrumb("取引先検索", [ScreenUrl.SFN0401]); //SF003-01
        self.headerProvider.addBreadCrumb("取引先照会", [ScreenUrl.SFN0402, this.customer.customerCode]);
        self.headerProvider.addBreadCrumb("届け先引き継ぎ入力");
    }

    /**
     * 初期化処理
     */
    ngOnInit(): void {

        this.service.navigateTo("届け先引き継ぎ入力", this.router.url);

        // 解決結果を記入
        this.setShippingDestination(this.route.snapshot.data['shippingDestination']);
        this.shippingDestinationList = this.route.snapshot.data['shippingDestinationList'];

        // パンくず生成
        this.initBreadcrumb();
    }

    /**
     * ビュー表示後の処理
     */
    ngAfterViewInit(): void {
        // 画像アップロードフォームを初期化
        this.initDropzone()

        // ギャラリーの初期化
        OneUI.initHelpers(['magnific-popup']);
    }

    /**
     * 編集対象届け先を設定
     *
     * null な項目を空文字列に変換する。
     *
     * @param destination 届け先 (破壊的)
     */
    private setShippingDestination(destination: ShippingDestination): void {
        // null, undefined を空文字に変換する
        for (let key of SHIPPING_DESTINATION_STRING_KEYS) {
            destination[key] = normalize(destination[key], String, '');
        }
        for (let key of SHIPPING_DESTINATION_NUMBER_KEYS) {
            destination[key] = normalize(destination[key], Number);
        }
        for (let key of SHIPPING_DESTINATION_BOOLEAN_KEYS) {
            destination[key] = normalize(destination[key], Boolean);
        }

        // 編集対象変更
        this.destination = destination;
        this.customer = destination.customer;
        this.currentId = destination.id;

        // 正規化する (null, undefined を空文字列に変換する)
        function normalize<T>(value: T|null|undefined, ctor: (T) => T, defaultValue: T|null = null): T|null {
            return value != null ? ctor(value) : defaultValue;
        }

        // 変更フラグを戻す
        this.changed = false;
    }

    /**
     * 届け先を移動
     *
     * @param shippingDestinationId 表示する届け先 ID
     */
    moveTo(shippingDestinationId: number): void {
        let self: this = this;
        let previousId = this.destination.id;

        // 変更チェック
        if (this.changed) {
            // 確認画面を表示する   ↓ こうしないとなぜかキャンセルコールバックが呼ばれない
            this.showConfirmModal((isConfirm) => showForm(isConfirm));
        } else {
            // 変更されていないので普通に移動
            showForm(true);
        }

        // 届け先画面遷移処理
        function showForm(isConfirm: boolean) {
            if (!isConfirm) {
                // キャンセルが押された ... もとに戻す
                self.currentId = previousId;
                return;
            }

            // History 変更
            self.router.navigate(
                [ScreenUrl.SFN0402, self.customer.customerCode, 'shipping-destination', shippingDestinationId],
                {replaceUrl: true}
            );

            // 届け先情報を取得
            self.service.sfn040214GetShippingDestinationDetail(self.customer.customerCode, shippingDestinationId)
                .then(destination => {
                    self.setShippingDestination(destination);
                });
        }
    }

    /**
     * キャンセル (得意先画面へ移動)
     */
    cancel(event: Event): void {
        let self = this;

        // 変更チェック
        if (this.changed) {
            this.showConfirmModal(showCustomer);
        } else {
            showCustomer();
        }

        // 得意先画面へ移動
        function showCustomer() {
            self.router.navigate([ScreenUrl.SFN0402, self.customer.customerCode]);
        }
    }

    /**
     * フォームの変更通知 (input, change)
     *
     * @param event イベント
     */
    onFormChange(event: Event): void {
        this.changed = true;

        // ラジオボタンの場合
        if (event.type == 'change' && isNamedRadio(event.target, this)) {
            let input = event.target;
            let name = input.name; // as keyof ShippingDestination

            // this.destination に反映させる
            let value: boolean|number|null;
            if (input.value == "true") {
                value = true;
            } else if (input.value == "false") {
                value = false;
            } else {
                value = parseInt(input.value, 10);
                value = isNaN(value) ? null : value;
            }
            this.destination[name] = value;

            if (name == "upstairsDetail") {
                // 2F 上げ 詳細が変更されたとき ... 自動的に 2F 上げを選択する
                this.destination.upstairs = true;
            } else if (name == "specifyVehicle" && value != RADIO_VALUE_OTHERS) {
                // 配送車両指定 (その他以外) が選択されたとき ... 自動的にその他を空欄にする
                this.destination.specifyVehicleOthers = '';
            } else if (name == "upstairsDetail" && value != RADIO_VALUE_OTHERS) {
                // 2F 上げ (その他以外) が選択されたとき ... 自動的にその他を空欄にする
                this.destination.upstairsDetailOthers = '';
            } else if (name == "upstairs" && value == false) {
                // 2F 上げ 無 が選択されたとき ... 自動的に詳細を空欄にする
                this.destination.upstairsDetail = null;
                this.destination.upstairsDetailOthers = '';
            }
        }

        // テキストボックスの場合
        if (event.type == 'input' && isNamedTextbox(event.target, this)) {
            let input = event.target;
            let name = input.name; // as keyof ShippingDestination
            if (name == "specifyVehicleOthers") {
                // 配送車両指定のその他が入力されたとき... 自動的に その他を選択する
                this.destination.specifyVehicle = RADIO_VALUE_OTHERS;
            } else if (name == "upstairsDetailOthers") {
                // 2F上げ その他が入力された場合 ...  自動的に その他を選択する
                this.destination.upstairs = true;
                this.destination.upstairsDetail = RADIO_VALUE_OTHERS;
            }
        }
    }

    /**
     * 届け先を保存
     */
    save(): void {
        this.service.sfn040215SaveShippingDestinationDetail(this.customer.customerCode, this.destination.id, this.destination)
            .then(() => {
                $.notify({message: MSG.SFN0402.INF005}, {type: 'success'});

                // 変更フラグを解除
                this.changed = false;
            }).catch(() => {
                swal(Constants.BLANK, MSG.COM.ERR002, "error");
            });
    }

    /**
     * 届け先カルテ出力
     */
    exportShippingDestinationKarte(): Promise<void> {
        return this.service.sfn040217ExportShippingDestinationKartePdf(this.customer.customerCode, this.destination.id)
            .then(result => { window.open(result.filePath, '_blank'); })
            .catch(err => { swal(Constants.BLANK, MSG.SFN0402.ERR003, "error"); });
    }


    // ファイルアップロード関連
    // ===================================================================
    /**
     * ファイルアップロード域を初期化
     */
    private initDropzone(): void {
        let self = this;
        let dropzone = this.dropzone.nativeElement as HTMLFormElement;
        let $dropzone = $(dropzone).dropzone({
            url: "/CM0010101",
            uploadMultiple: false,
            parallelUploads: 1,
            dictDefaultMessage: "画像を追加するにはこちらにファイルをドロップしてください。",
            dictFileTooBig: "fileTooBig",
            maxFiles: 1,
            maxFilesize: 10, // up to 10MB
            thumbnailWidth: Constants.THUMBNAIL_WIDTH,
            thumbnailHeight: Constants.THUMBNAIL_HEIGHT,
            init: function (this: Dropzone): void {
                this.on("addedfile", function (this: Dropzone, file): void {
                    if (this.getQueuedFiles().length > 0 || this.getUploadingFiles().length > 0) {
                        this.removeAllFiles(true); // ... and cancel uploading files
                        this.addFile(file);
                    }
                });

                this.on("success", function (this: Dropzone, file: DropzoneFile, response: string): void {
                    let res = JSON.parse(response + '').res as DataJson<any>;
                    let messageCode = res && res.messageCode || undefined;

                    if (messageCode == "CC00101_INF001" && res.data && res.data.fileName) {
                        // アップロード成功
                        blobToDataURL(file, (imageUrl) => {
                            // フォームに項目を追加する
                            let image = new ShippingDestinationImage();
                            image.memo = "";
                            image.image = imageUrl;
                            image.temporaryFileName = res.data.fileName;
                            self.destination.imageList.push(image);
                        });

                        // 変更フラグを立てる
                        self.changed = true;
                    } else if (messageCode == "CC00101_ERR002" || messageCode == "CC00101_ERR003") {
                        // サーバ側ファイル保存エラー
                        // MEMO CC00101_ERR003 は PDF サムネイル保存エラーなのでここでは発生しない
                        swal(Constants.BLANK, Messages.get(MSG.SFN0402.ERR005), "error");
                    } else {
                        // その他のエラー
                        swal(Constants.BLANK, Messages.get(MSG.COM.ERR001), "error");
                    }

                    // ドロップ域からファイルを削除
                    this.removeAllFiles();
                });

                this.on("maxfilesexceeded", function (this: Dropzone, file): void {
                    // check file accept file then update file
                    if (isImageFile(file)) {
                        this.removeAllFiles(true); // ... and cancel uploading files
                        this.addFile(file);
                    }
                });

                this.on("error", function (this: Dropzone, file, errorMessage): void {
                    if (errorMessage === "fileTooBig") {
                        swal(Constants.BLANK, Messages.get(MSG.SFN0402.INF007), "error");
                        this.removeFile(file);
                        return;
                    }
                    if (!isImageFile(file)) {
                        swal(Constants.BLANK, Messages.get(MSG.SFN0402.INF006), "error");
                        this.removeFile(file);
                        return;
                    }
                });
            },
            accept: function (this: Dropzone, file, done): void {
                if (!isImageFile(file)) {
                    this.removeFile(file);
                    swal(Constants.BLANK, Messages.get(MSG.SFN0402.INF006), "error");
                }
                done();
            }
        });
    }

    /**
     * 画像を削除する
     *
     * @param image 画像
     */
    removeImage(image: ShippingDestinationImage): void {
        // 画像削除処理
        let doRemove = () => {
            let index = this.destination.imageList.indexOf(image);
            if (index >= 0) {
                this.destination.imageList.splice(index, 1);
            }

            // 変更フラグを設定
            this.changed = true;
        }

        // DB 未登録かつメモ欄が空欄の場合は即座に削除
        if (!image.id && !image.memo.length) {
            doRemove();
        } else {
            // それ以外の場合は確認して削除
            this.showConfirmModal(doRemove, MSG.SFN0402.WRN003);
        }
    }


    // フォームの選択オプション
    // ===================================================================
    /**
     * 数量制限のオプション
     */
    get limitQuantityOptions(): Option[] {
        return LIMIT_QUANITITY_OPTIONS;
    }


    // フォーム - モデル間の変換
    // ===================================================================
    /**
     * @return 備考欄
     */
    get memo(): string {
        return this.destination.memo1 + this.destination.memo2;
    }

    /**
     * @param memo 備考欄
     */
    set memo(memo: string) {
        this.destination.memo1 = memo.substring(0, 30);
        this.destination.memo2 = memo.substring(30);
    }

    /**
     * @return 地区
     */
    get district(): string {
        let code = this.destination.districtCode;
        let displayName = DISTRICT_NAME[code] || '';
        if (displayName.length) {
            return `${code}:${displayName}`;
        } else {
            return '';
        }
    }

    /**
     * @return 専用伝票
     */
    get extraMethod(): string {
        return EXTRA_METHOD_NAME[this.destination.extraMethod] || '';
    }


    // 確認モーダル
    // ===================================================================
    /**
     * 確認モーダルを表示する
     *
     * @param callback Ok ボタンが押されたときに実行される処理内容
     * @param message メッセージ
     */
    private showConfirmModal(callback: (isConfirm: boolean) => void, message: string = MSG.SFN0402.WRN001): void {
        swal({
            title: "",
            text: message,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d26a5c",
            confirmButtonText: MSG.SFN0402.WRN002,
            closeOnConfirm: true
        }, callback);
    }
}


/**
 * 画像ファイルかどうか判定する
 *
 * @param file dropzone ファイル
 * @returns true: 画像, false: 画像ファイルではない
 */
function isImageFile(file: DropzoneFile): boolean {
    let ext = file.name.split(".").pop().toUpperCase();
    return IMAGE_EXTENSIONS.find(el => el == ext) != null;
}


/**
 * 届け先のラジオボタンかどうか判定する
 *
 * @param target イベントターゲット
 * @returns true: ラジオボタン, false: ラジオボタンではない
 */
function isNamedRadio(target: EventTarget, self: SFN040281ShippingDestinationPage): target is HTMLInputElement {
    let element = event.target as HTMLInputElement;
    return element.nodeName == "INPUT" && element.type == "radio"
        && element.name && element.name in self.destination;
}

/**
 * 届け先のテキストボックスかどうか判定する
 *
 * @param target イベントターゲット
 * @returns true: テキストボックス, false: テキストボックスではない
 */
function isNamedTextbox(target: EventTarget, self: SFN040281ShippingDestinationPage): target is HTMLInputElement {
    let element = event.target as HTMLInputElement;
    return element.nodeName == "INPUT" && element.type == "text"
        && element.name && element.name in self.destination;
}
