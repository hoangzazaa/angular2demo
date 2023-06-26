"use strict";
/**
 * Created by VuPT on 5/15/2017.
 */
var ProductRequiredItem = (function () {
    function ProductRequiredItem() {
        //製品名
        this.isSaveProductName = false;
        //製造依頼先
        this.isSaveFactoryId = false;
        //ロット
        this.isSaveLot = false;
        //提出単価
        this.isSaveSubmittedUnitPrice = false;
        //原紙名/坪量
        this.isSavePaperName = false;
        this.isSavePaperWeight = false;
        //原紙サイズ
        this.isSaveBlankSizeW = false;
        this.isSaveBlankSizeH = false;
        //断裁サイズ
        this.isSaveCutSizeW = false;
        this.isSaveCutSizeH = false;
        //取数
        this.isSaveTakenNumber = false;
        //面付数
        this.isSaveImpositionNumber = false;
        //フルート
        this.isSaveFlute = false;
        //シート寸法
        this.isSavePaperSizeW = false;
        this.isSavePaperSizeH = false;
        //表ライナー
        this.isSaveLaminationPaperTypeFront = false;
        this.isSaveLaminationFrontBasicWeight = false;
        this.isSaveLaminationFrontThroughWage = false;
        //中芯
        this.isSaveLaminationPaperTypeMedium = false;
        this.isSaveLaminationMediumBasicWeight = false;
        this.isSaveLaminationMediumThroughWage = false;
        //裏ライナー
        this.isSaveLaminationPaperTypeBack = false;
        this.isSaveLaminationBackBasicWeight = false;
        this.isSaveLaminationBackThroughWage = false;
        //フルート
        this.isSaveCartonFlute = false;
        //納入形式
        this.isSaveCartonShippingType = false;
        //製品寸法
        this.isSaveSizeH = false;
        this.isSaveSizeD = false;
        this.isSaveSizeW = false;
        //展開寸法
        //isSaveBlankSizeW: boolean=false;
        //isSaveBlankSizeH: boolean=false;
        //納入先距離
        this.isSaveCartonShippingCost = false;
    }
    return ProductRequiredItem;
}());
exports.ProductRequiredItem = ProductRequiredItem;
//# sourceMappingURL=product-required-item.js.map