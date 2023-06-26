package vn.vnext.sefuri.sf.module.export.model.r007;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.annotation.Nonnull;

import vn.vnext.sefuri.sf.module.export.model.BarcodeField;

/**
 * Created by NgocNM on 7/20/2017.
 */
public class R007ProductModelC {

    /* I. Front*/

    // a. 受注内容/Nội dung order
    // a.1. 受注月日/ Ngày tháng order
    private String orderDate;
    // a.2. 数量/ Quantity
    private String quantity;
    // a.3. 納品日/ Ngày delivery
    private String deliveryDate;
    // a.4. 製番/ Production number
    // SalesFrontの受注番号のこと
    private String productionNumber;
    // a.5. 受注NO/ Order NO
    // "多久工場専用" の受注番号のこと
    private String orderNo;
    // a.6. 製造仕様書/  Production specs
    private String productionSpecs;
    // a.7. 印刷版/ Bản in
    private String printingVersion;
    // a.8. 木型/ Khuôn gỗ
    private String wooden;
    // a.9. 金型/ Khuôn
    private String mold;

    // b. Phần header
    // b.1. 品目C/ Hạng mục C
    private String itemC;
    // b.2. 作成日/ Ngày tạo
    private String createDate;
    // b.3. 改定日/ Ngày chỉnh sửa
    private String updateDate;
    // b.4. 得意先コード/ Customer code
    private String customerCode;
    // b.5. 得意先名/ Customer name
    private String customerName;
    // b.6. 品名/ Product name
    private String productName;

    // c. 外寸法/Kích thước ngoài
    // c.1. 縦/ Dọc
    private String sizeH;
    // c.1. 横/ Ngang
    private String sizeW;
    // c.1. 高さ/ Chiều cao
    private String sizeD;

    // d. 展開寸/Kích thước triển khai
    // d.1. 巾/ Chiều rộng
    // d.1. 流れ/ Chiều dài
    private String paperSizeW;
    private String paperSizeH;

    // 木型No/ No khuôn gỗ
    private String woodenNo;
    // 金型No/ No khuôn
    private String moldNo;
    // フルート/ Flute
    private String laminationFlute;
    // 紙巾/ Chiều rộng paper
    private String laminationSizeW;

    // e. 材質/Chất liệu
    // e.1. 項目１/ Item 1
    // e.1. 項目２/ Item 2
    // e.1. 項目３/ Item 3
    // e.1. 項目４/ Item 4
    // e.1. 項目５/ Item 5
    private String materialPaper1;
    private String materialPaper2;
    private String materialPaper3;
    private String materialPaper4;
    private String materialPaper5;

    // f. コルゲータ断裁
    // f.1. 巾/ Chiều rộng
    // f.1. 流れ/ Chiều dài
    private String corrugatorCuttingW;
    private String corrugatorCuttingH;

    // g. ｽﾘｯﾀｰ断裁流/Chiều dài cắt bằng slitter
    // g.1. 巾/ Chiều rộng
    // g.1. 流れ/ Chiều dài
    private String slitterCuttingFlowW;
    private String slitterCuttingFlowH;

    // 面付/ Imposition
    private String imposition;
    // 木型面付/ Imposition khuôn gỗ
    private String impositionWooden;
    // 才数
    private String volume;

    // h. 印刷/ In
    // h.1. 印刷数/ Số lượng in
    private String numberOfColor;
    // h.2. 使用色１/ Màu sử dụng 1
    // h.2. 使用色２/ Màu sử dụng 2
    // h.2. 使用色３/ Màu sử dụng 3
    private String colorMemo1;
    private String colorMemo2;
    private String colorMemo3;

    // i. "手穴指示/Chỉ thị lỗ tay cầm"
    // 加工種類/ Phân loại gia công
    private String handProcessingDataA;
    private String handProcessingDataB;
    private String handProcessingDataC;
    private String handProcessingDataD;
    // k. "数量制限/Hạn chế số lượng"
    // k.1. 数量制限/ Hạn chế số lượng
    private String unitQuantityLimited;
    private String colorT;
    private Integer checkColorT;
    private Integer checkColorS;
    private String colorS;

    private String unitQuantity;

    // 結束形態/ Hình dạng buộc
    private String bidingMethod;
    // 結束枚数/ Số tấm buộc
    private String bidingNumber;
    // ヒモ/ Dây
    private String string;
    // ヒモ色/ Màu dây
    private String stringColor;

    // l. "サンプル/Sample"
    // l.4. 抜上り
    private String liftSample;
    // l.1. 営業サンプル/ Sales sample
    private String saleSample;
    // l.2. 得意先サンプル/ Customer sample
    private String customerSample;

    // 備考（注意事項）/ Notes (Mục chú ý)
    private String note1;
    private String note2;
    private String note3;

    // 印版外注コード/ Code order bên ngoài bản in
    private String sealVersionSubcontractingCode;

    // m. "生産工程/Công đoạn sản xuất"
    // m.1. T
    private String t;
    // m.2. SL
    private String sl;
    // m.3. SC1
    private String sc1;
    // m.4. SC2
    private String sc2;
    // m.5. SC3
    private String sc3;
    // m.6. SC4
    private String sc4;
    // m.7. SC5
    private String sc5;
    // m.8. SC6
    private String sc6;
    // m.9. コルゲータ/ Corrugator
    private String corrugator;
    // m.10. スリスコ/ Slitter scorer
    private String slitterScore;
    // m.11. スリッター/ Slitter
    private String slitter;
    // m.12. FFG
    private String ffg;
    private String ffgContent;

    // m.13. 打抜き/ Bế
    private String punching;
    // m.14. Sack machine
    private String sackMachine;
    // m.15. その他工程（６箇所）/ Gia công khác (6 chỗ)
    private String otherStep1;
    private String otherStep2;
    private String otherStep3;
    private String otherStep4;
    private String otherStep5;
    private String otherStep6;
    private String otherStepCheck1;
    private String otherStepCheck2;
    private String otherStepCheck3;
    private String otherStepCheck4;
    private String otherStepCheck5;
    private String otherStepCheck6;

    /** 追加加工 */
    List<ExtraStepModel> extraStepList;

    // n. バーコード/ Barcode
    /** バーコード欄1 */
    private BarcodeField barcode1;
    /** バーコード欄2 */
    private BarcodeField barcode2;
    /** バーコード欄3 */
    private BarcodeField barcode3;

    // 1次包装区分/ Phân loại đóng gói sơ cấp
    private String classificationPackaging;
    // 図面/ Bản vẽ
    private InputStream drawingImg;

    /* II. Back*/

    // a. "受注履歴/Order history"
    // a.1. 受注日/ Ngày order
    // a.2. 数量/ Quantity
    // a.3. 単価/ Unit price
    // a.4. 納期/ Delivery date
    private List<R007OrderHistoryC> listOrderHistory1;
    private List<R007OrderHistoryC> listOrderHistory2;

    // b. 見積情報/Thông tin QTN
    // b.1. ロット/ Lot
    // b.2. 単価/ Unit price
    private List<R007QuotationInfoC> r007QuotationInfoCS;

    // c. "マスタ項目/Item master"
    // c.1. 末端業種区分/ Phân loại end business type
    private String classificationEndIndustry;
    // c.2.容器包装区分/ Phân loại đóng gói bao bì đồ đựng
    private String classificationPackagingContainer;
    // c.3.費用負担有無/ Có - không chịu chi phí
    private String isExpenseBurden;
    // c.4.廃棄種別/ Phân loại hủy
    private String decompositionType;

    // corrugatorContent
    private String corrugatorContent;
    private String sriskoContent;
    private String slitterContent;

    // fix bug 3408
    // 特記事項
    private String notices;

    public R007ProductModelC() {
        this.listOrderHistory1 = new ArrayList<>();
        this.listOrderHistory2 = new ArrayList<>();
        this.r007QuotationInfoCS = new ArrayList<>();
    }

    /*Start getter and setter*/
    public String getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(String orderDate) {
        this.orderDate = orderDate;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    public String getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(String deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    public String getProductionNumber() {
        return productionNumber;
    }

    public void setProductionNumber(String productionNumber) {
        this.productionNumber = productionNumber;
    }

    public String getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
    }

    public String getProductionSpecs() {
        return productionSpecs;
    }

    public void setProductionSpecs(String productionSpecs) {
        this.productionSpecs = productionSpecs;
    }

    public String getPrintingVersion() {
        return printingVersion;
    }

    public void setPrintingVersion(String printingVersion) {
        this.printingVersion = printingVersion;
    }

    public String getWooden() {
        return wooden;
    }

    public void setWooden(String wooden) {
        this.wooden = wooden;
    }

    public String getMold() {
        return mold;
    }

    public void setMold(String mold) {
        this.mold = mold;
    }

    public String getItemC() {
        return itemC;
    }

    public void setItemC(String itemC) {
        this.itemC = itemC;
    }

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    public String getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(String updateDate) {
        this.updateDate = updateDate;
    }

    public String getCustomerCode() {
        return customerCode;
    }

    public void setCustomerCode(String customerCode) {
        this.customerCode = customerCode;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getSizeH() {
        return sizeH;
    }

    public void setSizeH(String sizeH) {
        this.sizeH = sizeH;
    }

    public String getSizeW() {
        return sizeW;
    }

    public void setSizeW(String sizeW) {
        this.sizeW = sizeW;
    }

    public String getSizeD() {
        return sizeD;
    }

    public void setSizeD(String sizeD) {
        this.sizeD = sizeD;
    }

    public String getPaperSizeW() {
        return paperSizeW;
    }

    public void setPaperSizeW(String paperSizeW) {
        this.paperSizeW = paperSizeW;
    }

    public String getPaperSizeH() {
        return paperSizeH;
    }

    public void setPaperSizeH(String paperSizeH) {
        this.paperSizeH = paperSizeH;
    }

    public String getWoodenNo() {
        return woodenNo;
    }

    public void setWoodenNo(String woodenNo) {
        this.woodenNo = woodenNo;
    }

    public String getMoldNo() {
        return moldNo;
    }

    public void setMoldNo(String moldNo) {
        this.moldNo = moldNo;
    }

    public String getLaminationFlute() {
        return laminationFlute;
    }

    public void setLaminationFlute(String laminationFlute) {
        this.laminationFlute = laminationFlute;
    }

    public String getLaminationSizeW() {
        return laminationSizeW;
    }

    public void setLaminationSizeW(String laminationSizeW) {
        this.laminationSizeW = laminationSizeW;
    }

    public String getMaterialPaper1() {
        return materialPaper1;
    }

    public void setMaterialPaper1(String materialPaper1) {
        this.materialPaper1 = materialPaper1;
    }

    public String getMaterialPaper2() {
        return materialPaper2;
    }

    public void setMaterialPaper2(String materialPaper2) {
        this.materialPaper2 = materialPaper2;
    }

    public String getMaterialPaper3() {
        return materialPaper3;
    }

    public void setMaterialPaper3(String materialPaper3) {
        this.materialPaper3 = materialPaper3;
    }

    public String getMaterialPaper4() {
        return materialPaper4;
    }

    public void setMaterialPaper4(String materialPaper4) {
        this.materialPaper4 = materialPaper4;
    }

    public String getMaterialPaper5() {
        return materialPaper5;
    }

    public void setMaterialPaper5(String materialPaper5) {
        this.materialPaper5 = materialPaper5;
    }

    public String getCorrugatorCuttingW() {
        return corrugatorCuttingW;
    }

    public void setCorrugatorCuttingW(String corrugatorCuttingW) {
        this.corrugatorCuttingW = corrugatorCuttingW;
    }

    public String getCorrugatorCuttingH() {
        return corrugatorCuttingH;
    }

    public void setCorrugatorCuttingH(String corrugatorCuttingH) {
        this.corrugatorCuttingH = corrugatorCuttingH;
    }

    public String getSlitterCuttingFlowW() {
        return slitterCuttingFlowW;
    }

    public void setSlitterCuttingFlowW(String slitterCuttingFlowW) {
        this.slitterCuttingFlowW = slitterCuttingFlowW;
    }

    public String getSlitterCuttingFlowH() {
        return slitterCuttingFlowH;
    }

    public void setSlitterCuttingFlowH(String slitterCuttingFlowH) {
        this.slitterCuttingFlowH = slitterCuttingFlowH;
    }

    public String getImposition() {
        return imposition;
    }

    public void setImposition(String imposition) {
        this.imposition = imposition;
    }

    public String getImpositionWooden() {
        return impositionWooden;
    }

    public void setImpositionWooden(String impositionWooden) {
        this.impositionWooden = impositionWooden;
    }

    public String getVolume() {
        return volume;
    }

    public void setVolume(String volume) {
        this.volume = volume;
    }

    public String getNumberOfColor() {
        return numberOfColor;
    }

    public void setNumberOfColor(String numberOfColor) {
        this.numberOfColor = numberOfColor;
    }

    public String getColorMemo1() {
        return colorMemo1;
    }

    public void setColorMemo1(String colorMemo1) {
        this.colorMemo1 = colorMemo1;
    }

    public String getColorMemo2() {
        return colorMemo2;
    }

    public void setColorMemo2(String colorMemo2) {
        this.colorMemo2 = colorMemo2;
    }

    public String getColorMemo3() {
        return colorMemo3;
    }

    public void setColorMemo3(String colorMemo3) {
        this.colorMemo3 = colorMemo3;
    }

    public String getHandProcessingDataA() {
        return handProcessingDataA;
    }

    public void setHandProcessingDataA(String handProcessingDataA) {
        this.handProcessingDataA = handProcessingDataA;
    }

    public String getHandProcessingDataB() {
        return handProcessingDataB;
    }

    public void setHandProcessingDataB(String handProcessingDataB) {
        this.handProcessingDataB = handProcessingDataB;
    }

    public String getHandProcessingDataC() {
        return handProcessingDataC;
    }

    public void setHandProcessingDataC(String handProcessingDataC) {
        this.handProcessingDataC = handProcessingDataC;
    }

    public String getHandProcessingDataD() {
        return handProcessingDataD;
    }

    public void setHandProcessingDataD(String handProcessingDataD) {
        this.handProcessingDataD = handProcessingDataD;
    }

    public String getUnitQuantityLimited() {
        return unitQuantityLimited;
    }

    public void setUnitQuantityLimited(String unitQuantityLimited) {
        this.unitQuantityLimited = unitQuantityLimited;
    }

    public String getUnitQuantity() {
        return unitQuantity;
    }

    public void setUnitQuantity(String unitQuantity) {
        this.unitQuantity = unitQuantity;
    }

    public String getBidingMethod() {
        return bidingMethod;
    }

    public void setBidingMethod(String bidingMethod) {
        this.bidingMethod = bidingMethod;
    }

    public String getBidingNumber() {
        return bidingNumber;
    }

    public void setBidingNumber(String bidingNumber) {
        this.bidingNumber = bidingNumber;
    }

    public String getString() {
        return string;
    }

    public void setString(String string) {
        this.string = string;
    }

    public String getStringColor() {
        return stringColor;
    }

    public void setStringColor(String stringColor) {
        this.stringColor = stringColor;
    }

    /**
     * @return 抜上りサンプル
     */
    public String getSaleSample() {
        return saleSample;
    }

    /**
     * @return 抜上りサンプル
     */
    public String getLiftSample() {
        return liftSample;
    }

    public void setLiftSample(String liftSample) {
        this.liftSample = liftSample;
    }

    public void setSaleSample(String saleSample) {
        this.saleSample = saleSample;
    }

    public String getCustomerSample() {
        return customerSample;
    }

    public void setCustomerSample(String customerSample) {
        this.customerSample = customerSample;
    }

    public String getNote1() {
        return note1;
    }

    public void setNote1(String note1) {
        this.note1 = note1;
    }

    public String getNote2() {
        return note2;
    }

    public void setNote2(String note2) {
        this.note2 = note2;
    }

    public String getNote3() {
        return note3;
    }

    public void setNote3(String note3) {
        this.note3 = note3;
    }

    public String getSealVersionSubcontractingCode() {
        return sealVersionSubcontractingCode;
    }

    public void setSealVersionSubcontractingCode(String sealVersionSubcontractingCode) {
        this.sealVersionSubcontractingCode = sealVersionSubcontractingCode;
    }

    public String getT() {
        return t;
    }

    public void setT(String t) {
        this.t = t;
    }

    public String getSl() {
        return sl;
    }

    public void setSl(String sl) {
        this.sl = sl;
    }

    public String getSc1() {
        return sc1;
    }

    public void setSc1(String sc1) {
        this.sc1 = sc1;
    }

    public String getSc2() {
        return sc2;
    }

    public void setSc2(String sc2) {
        this.sc2 = sc2;
    }

    public String getSc3() {
        return sc3;
    }

    public void setSc3(String sc3) {
        this.sc3 = sc3;
    }

    public String getSc4() {
        return sc4;
    }

    public void setSc4(String sc4) {
        this.sc4 = sc4;
    }

    public String getSc5() {
        return sc5;
    }

    public void setSc5(String sc5) {
        this.sc5 = sc5;
    }

    public String getSc6() {
        return sc6;
    }

    public void setSc6(String sc6) {
        this.sc6 = sc6;
    }

    public String getCorrugator() {
        return corrugator;
    }

    public void setCorrugator(String corrugator) {
        this.corrugator = corrugator;
    }

    public String getSlitterScore() {
        return slitterScore;
    }

    public void setSlitterScore(String slitterScore) {
        this.slitterScore = slitterScore;
    }

    public String getSlitter() {
        return slitter;
    }

    public void setSlitter(String slitter) {
        this.slitter = slitter;
    }

    public String getFfg() {
        return ffg;
    }

    public void setFfg(String ffg) {
        this.ffg = ffg;
    }

    public String getPunching() {
        return punching;
    }

    public void setPunching(String punching) {
        this.punching = punching;
    }

    public String getSackMachine() {
        return sackMachine;
    }

    public void setSackMachine(String sackMachine) {
        this.sackMachine = sackMachine;
    }

    public String getOtherStep1() {
        return otherStep1;
    }

    public void setOtherStep1(String otherStep1) {
        this.otherStep1 = otherStep1;
    }

    public String getOtherStep2() {
        return otherStep2;
    }

    public void setOtherStep2(String otherStep2) {
        this.otherStep2 = otherStep2;
    }

    public String getOtherStep3() {
        return otherStep3;
    }

    public void setOtherStep3(String otherStep3) {
        this.otherStep3 = otherStep3;
    }

    public String getOtherStep4() {
        return otherStep4;
    }

    public void setOtherStep4(String otherStep4) {
        this.otherStep4 = otherStep4;
    }

    public String getOtherStep5() {
        return otherStep5;
    }

    public void setOtherStep5(String otherStep5) {
        this.otherStep5 = otherStep5;
    }

    public String getOtherStep6() {
        return otherStep6;
    }

    public void setOtherStep6(String otherStep6) {
        this.otherStep6 = otherStep6;
    }

    public String getOtherStepCheck5() {
        return otherStepCheck5;
    }

    public void setOtherStepCheck5(String otherStepCheck5) {
        this.otherStepCheck5 = otherStepCheck5;
    }

    public String getOtherStepCheck6() {
        return otherStepCheck6;
    }

    public void setOtherStepCheck6(String otherStepCheck6) {
        this.otherStepCheck6 = otherStepCheck6;
    }

    public String getOtherStepCheck1() {
        return otherStepCheck1;
    }

    public void setOtherStepCheck1(String otherStepCheck1) {
        this.otherStepCheck1 = otherStepCheck1;
    }

    public String getOtherStepCheck2() {
        return otherStepCheck2;
    }

    public void setOtherStepCheck2(String otherStepCheck2) {
        this.otherStepCheck2 = otherStepCheck2;
    }

    public String getOtherStepCheck3() {
        return otherStepCheck3;
    }

    public void setOtherStepCheck3(String otherStepCheck3) {
        this.otherStepCheck3 = otherStepCheck3;
    }

    public String getOtherStepCheck4() {
        return otherStepCheck4;
    }

    public void setOtherStepCheck4(String otherStepCheck4) {
        this.otherStepCheck4 = otherStepCheck4;
    }

    /**
     * @return 追加加工のリスト
     */
    public @Nonnull List<ExtraStepModel> getExtraStepList() {
        return extraStepList != null ? extraStepList : Collections.emptyList();
    }

    /**
     * 追加加工のリストを設定する
     *
     * @param extraStepList 追加加工のリスト
     */
    public void setExtraStepList(List<ExtraStepModel> extraStepList) {
        this.extraStepList = extraStepList;
    }

    /**
     * @return バーコード欄1
     */
    public BarcodeField getBarcode1() {
        return barcode1;
    }

    /**
     * @param barcode1 バーコード欄1
     */
    public void setBarcode1(BarcodeField barcode1) {
        this.barcode1 = barcode1;
    }

    /**
     * @return バーコード欄2
     */
    public BarcodeField getBarcode2() {
        return barcode2;
    }

    /**
     * @param barcode2 バーコード欄2
     */
    public void setBarcode2(BarcodeField barcode2) {
        this.barcode2 = barcode2;
    }

    /**
     * @return バーコード欄3
     */
    public BarcodeField getBarcode3() {
        return barcode3;
    }

    /**
     * @param barcode3 バーコード欄3
     */
    public void setBarcode3(BarcodeField barcode3) {
        this.barcode3 = barcode3;
    }

    public String getClassificationPackaging() {
        return classificationPackaging;
    }

    public void setClassificationPackaging(String classificationPackaging) {
        this.classificationPackaging = classificationPackaging;
    }

    public InputStream getDrawingImg() {
        return drawingImg;
    }

    public void setDrawingImg(InputStream drawingImg) {
        this.drawingImg = drawingImg;
    }

    public List<R007OrderHistoryC> getListOrderHistory1() {
        return listOrderHistory1;
    }

    public void setListOrderHistory1(List<R007OrderHistoryC> listOrderHistory1) {
        this.listOrderHistory1 = listOrderHistory1;
    }

    public List<R007OrderHistoryC> getListOrderHistory2() {
        return listOrderHistory2;
    }

    public void setListOrderHistory2(List<R007OrderHistoryC> listOrderHistory2) {
        this.listOrderHistory2 = listOrderHistory2;
    }

    public List<R007QuotationInfoC> getR007QuotationInfoCS() {
        return r007QuotationInfoCS;
    }

    public void setR007QuotationInfoCS(List<R007QuotationInfoC> r007QuotationInfoCS) {
        this.r007QuotationInfoCS = r007QuotationInfoCS;
    }

    public String getClassificationEndIndustry() {
        return classificationEndIndustry;
    }

    public void setClassificationEndIndustry(String classificationEndIndustry) {
        this.classificationEndIndustry = classificationEndIndustry;
    }

    public String getClassificationPackagingContainer() {
        return classificationPackagingContainer;
    }

    public void setClassificationPackagingContainer(String classificationPackagingContainer) {
        this.classificationPackagingContainer = classificationPackagingContainer;
    }

    public String getIsExpenseBurden() {
        return isExpenseBurden;
    }

    public void setIsExpenseBurden(String isExpenseBurden) {
        this.isExpenseBurden = isExpenseBurden;
    }

    public String getDecompositionType() {
        return decompositionType;
    }

    public void setDecompositionType(String decompositionType) {
        this.decompositionType = decompositionType;
    }

    public String getColorT() {
        return colorT;
    }

    public void setColorT(String colorT) {
        this.colorT = colorT;
    }

    public String getColorS() {
        return colorS;
    }

    public void setColorS(String colorS) {
        this.colorS = colorS;
    }

    public Integer getCheckColorT() {
        return checkColorT;
    }

    public void setCheckColorT(Integer checkColorT) {
        this.checkColorT = checkColorT;
    }

    public Integer getCheckColorS() {
        return checkColorS;
    }

    public void setCheckColorS(Integer checkColorS) {
        this.checkColorS = checkColorS;
    }

    public String getFfgContent() {
        return ffgContent;
    }

    public void setFfgContent(String ffgContent) {
        this.ffgContent = ffgContent;
    }

    public String getCorrugatorContent() {
        return corrugatorContent;
    }

    public void setCorrugatorContent(String corrugatorContent) {
        this.corrugatorContent = corrugatorContent;
    }

    public String getSriskoContent() {
        return sriskoContent;
    }

    public void setSriskoContent(String sriskoContent) {
        this.sriskoContent = sriskoContent;
    }

    public String getSlitterContent() {
        return slitterContent;
    }

    public void setSlitterContent(String slitterContent) {
        this.slitterContent = slitterContent;
    }

    public String getNotices() {
        return notices;
    }

    public void setNotices(String notices) {
        this.notices = notices;
    }

    /*End getter and setter*/
}
