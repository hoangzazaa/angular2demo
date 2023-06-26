package vn.vnext.sefuri.sf.module.export.model;

import java.io.InputStream;
import java.util.List;

import vn.vnext.sefuri.sf.module.export.model.r007.R007OrderHistoryC;
import vn.vnext.sefuri.sf.module.export.model.r007.R007QuotationInfoC;

/**
 * Created by DungTQ on 5/19/2017.
 */
public class ProductModel {
    /* 登録No. */
    String fProductId;
    /* 初回作成日*/
    String fCreateDate;
    /*改定日*/
    String fUpdateDate;
    /* */
    String fCusCode;
    /* 得意先名*/
    String fCusName;
    /* 品名*/
    String fProName;
    /* フィルムNo.*/
    String fFilmNo;
    /*unknown */
    String fBlank2;
    /* unknown*/
    String fBlank1;
    /* コーター版管理No.1*/
    String fCoater1;
    /* コーター版管理No.2*/
    String fCoater2;
    /*特記事項 */
    String fMemo1;
    String fMemo2;
    String fMemo3;
    /* 木型No.*/
    String fKhuonGo;
    /* 金型No.*/
    String fKhuon;
    /* ゴム版外注先*/
    String fNoiOrder;
    /* サンプルNo.*/
    String fSample;
    /* 包装区分*/
    String fLoaiGoi;
    /** バーコード欄1 */
    private BarcodeField barcode1;
    /** バーコード欄2 */
    private BarcodeField barcode2;
    /** バーコード欄3 */
    private BarcodeField barcode3;
    /* */
    String fBlank3;
    /* */
    String fExtrac;
    /* */
    String fSales;
    /* */
    String fCus;
    /* */
    String fMa1;
    /* */
    String fMa2;
    /* */
    String fMa3;
    /* */
    String fSoTr;
    /* */
    String fSoS;
    /* */
    String fS1;
    /* */
    String fS2;
    /* */
    String fS3;
    /* */
    String fS4;
    /* */
    String fT1;
    /* */
    String fT2;
    /* */
    String fT3;
    /* */
    String fT4;
    /* */
    String fT5;
    /* */
    String fT6;
    /* */
    String fT7;
    /* */
    String fT8;
    /* */
    String fW;
    /* */
    String fH;
    /* */
    String fD;
    /* */
    String fPaperName;
    /* */
    String fPGam;
    /* */
    String fSize;
    /* */
    String fKT;
    /* */
    String fSheet;
    /* */
    String fIm;

    InputStream fImagine;

    String fColorT;
    Integer checkColorT;
    Integer checkColorS;

    String fColorS;

    String fNumber;

    String fFlute;

    String fFlute1L;

    String fMaterial1L;

    List<Step> Liststep1;

    List<Step> Liststep2;

    String DG1;

    String DG2;

    String DG3;

    String DG4;

    String DG5;

    String DG6;

    String memoDG;

    List<R007OrderHistoryC> orderhistoryLists1;

    List<R007OrderHistoryC> orderhistoryLists2;


    List<R007QuotationInfoC> qtnLists;

    String classificationEndIndustry;

    String classificationPackagingContainer;

    String isExpenseBurden;

    String decompositionType;

    String factory;

    String orderDate;

    String quantity;

    String deliveryDate;

    String orderNo;

    String longwidth1L;

    String paperwidthF;

    String paperwidthB;

    String commonGCode;

    String productionSpecs;

    String printingVersion;

    String wooden;

    String mold;

    String passageOrder;

    String packingInputNumber;

    String passageNo;

    String longwidth1LW;

    String fmaterial1LBack;

    String fSheetH;

    String fSize2;

    String fSizeTotal;

    String specialNote;

    String commonGCode2;

    public String getCommonGCode2() {
        return commonGCode2;
    }

    public void setCommonGCode2(String commonGCode2) {
        this.commonGCode2 = commonGCode2;
    }

    public String getSpecialNote() {
        return specialNote;
    }

    public void setSpecialNote(String specialNote) {
        this.specialNote = specialNote;
    }

    public String getfSize2() {
        return fSize2;
    }

    public void setfSize2(String fSize2) {
        this.fSize2 = fSize2;
    }

    public String getfSizeTotal() {
        return fSizeTotal;
    }

    public void setfSizeTotal(String fSizeTotal) {
        this.fSizeTotal = fSizeTotal;
    }

    public String getfSheetH() {
        return fSheetH;
    }

    public void setfSheetH(String fSheetH) {
        this.fSheetH = fSheetH;
    }

    public String getFmaterial1LBack() {
        return fmaterial1LBack;
    }

    public void setFmaterial1LBack(String fmaterial1LBack) {
        this.fmaterial1LBack = fmaterial1LBack;
    }

    public String getLongwidth1LW() {
        return longwidth1LW;
    }

    public void setLongwidth1LW(String longwidth1LW) {
        this.longwidth1LW = longwidth1LW;
    }

    public String getPackingInputNumber() {
        return packingInputNumber;
    }

    public void setPackingInputNumber(String packingInputNumber) {
        this.packingInputNumber = packingInputNumber;
    }

    public String getPassageNo() {
        return passageNo;
    }

    public void setPassageNo(String passageNo) {
        this.passageNo = passageNo;
    }

    public String getPassageOrder() {
        return passageOrder;
    }

    public void setPassageOrder(String passageOrder) {
        this.passageOrder = passageOrder;
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

    public String getCommonGCode() {
        return commonGCode;
    }

    public void setCommonGCode(String commonGCode) {
        this.commonGCode = commonGCode;
    }

    public String getLongwidth1L() {
        return longwidth1L;
    }

    public void setLongwidth1L(String longwidth1L) {
        this.longwidth1L = longwidth1L;
    }

    public String getPaperwidthF() {
        return paperwidthF;
    }

    public void setPaperwidthF(String paperwidthF) {
        this.paperwidthF = paperwidthF;
    }

    public String getPaperwidthB() {
        return paperwidthB;
    }

    public void setPaperwidthB(String paperwidthB) {
        this.paperwidthB = paperwidthB;
    }

    public String getFactory() {
        return factory;
    }

    public void setFactory(String factory) {
        this.factory = factory;
    }

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

    public String getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
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

    public List<R007OrderHistoryC> getOrderhistoryLists1() {
        return orderhistoryLists1;
    }

    public void setOrderhistoryLists1(List<R007OrderHistoryC> orderhistoryLists1) {
        this.orderhistoryLists1 = orderhistoryLists1;
    }

    public List<R007OrderHistoryC> getOrderhistoryLists2() {
        return orderhistoryLists2;
    }

    public void setOrderhistoryLists2(List<R007OrderHistoryC> orderhistoryLists2) {
        this.orderhistoryLists2 = orderhistoryLists2;
    }

    public List<R007QuotationInfoC> getQtnLists() {
        return qtnLists;
    }

    public void setQtnLists(List<R007QuotationInfoC> qtnLists) {
        this.qtnLists = qtnLists;
    }

    public String getMemoDG() {
        return memoDG;
    }

    public void setMemoDG(String memoDG) {
        this.memoDG = memoDG;
    }

    public String getDG1() {
        return DG1;
    }

    public void setDG1(String DG1) {
        this.DG1 = DG1;
    }

    public String getDG2() {
        return DG2;
    }

    public void setDG2(String DG2) {
        this.DG2 = DG2;
    }

    public String getDG3() {
        return DG3;
    }

    public void setDG3(String DG3) {
        this.DG3 = DG3;
    }

    public String getDG4() {
        return DG4;
    }

    public void setDG4(String DG4) {
        this.DG4 = DG4;
    }

    public String getDG5() {
        return DG5;
    }

    public void setDG5(String DG5) {
        this.DG5 = DG5;
    }

    public String getDG6() {
        return DG6;
    }

    public void setDG6(String DG6) {
        this.DG6 = DG6;
    }

    public List<Step> getListstep1() {
        return Liststep1;
    }

    public void setListstep1(List<Step> liststep1) {
        Liststep1 = liststep1;
    }

    public List<Step> getListstep2() {
        return Liststep2;
    }

    public void setListstep2(List<Step> liststep2) {
        Liststep2 = liststep2;
    }

    public String getfFlute1L() {
        return fFlute1L;
    }

    public void setfFlute1L(String fFlute1L) {
        this.fFlute1L = fFlute1L;
    }

    public String getfMaterial1L() {
        return fMaterial1L;
    }

    public void setfMaterial1L(String fMaterial1L) {
        this.fMaterial1L = fMaterial1L;
    }

    public String getfFlute() {
        return fFlute;
    }

    public void setfFlute(String fFlute) {
        this.fFlute = fFlute;
    }

    public String getfColorT() {
        return fColorT;
    }

    public void setfColorT(String fColorT) {
        this.fColorT = fColorT;
    }

    public String getfColorS() {
        return fColorS;
    }

    public void setfColorS(String fColorS) {
        this.fColorS = fColorS;
    }

    public String getfNumber() {
        return fNumber;
    }

    public void setfNumber(String fNumber) {
        this.fNumber = fNumber;
    }


    public String getfProductId() {
        return fProductId;
    }

    public void setfProductId(String fProductId) {
        this.fProductId = fProductId;
    }

    public String getfCreateDate() {
        return fCreateDate;
    }

    public void setfCreateDate(String fCreateDate) {
        this.fCreateDate = fCreateDate;
    }

    public String getfUpdateDate() {
        return fUpdateDate;
    }

    public void setfUpdateDate(String fUpdateDate) {
        this.fUpdateDate = fUpdateDate;
    }

    public String getfCusCode() {
        return fCusCode;
    }

    public void setfCusCode(String fCusCode) {
        this.fCusCode = fCusCode;
    }

    public String getfCusName() {
        return fCusName;
    }

    public void setfCusName(String fCusName) {
        this.fCusName = fCusName;
    }

    public String getfProName() {
        return fProName;
    }

    public void setfProName(String fProName) {
        this.fProName = fProName;
    }

    public String getfFilmNo() {
        return fFilmNo;
    }

    public void setfFilmNo(String fFilmNo) {
        this.fFilmNo = fFilmNo;
    }

    public String getfBlank2() {
        return fBlank2;
    }

    public void setfBlank2(String fBlank2) {
        this.fBlank2 = fBlank2;
    }

    public String getfBlank1() {
        return fBlank1;
    }

    public void setfBlank1(String fBlank1) {
        this.fBlank1 = fBlank1;
    }

    public String getfCoater1() {
        return fCoater1;
    }

    public void setfCoater1(String fCoater1) {
        this.fCoater1 = fCoater1;
    }

    public String getfCoater2() {
        return fCoater2;
    }

    public void setfCoater2(String fCoater2) {
        this.fCoater2 = fCoater2;
    }

    public String getfKhuonGo() {
        return fKhuonGo;
    }

    public String getfMemo1() {
        return fMemo1;
    }

    public void setfMemo1(String fMemo1) {
        this.fMemo1 = fMemo1;
    }

    public String getfMemo2() {
        return fMemo2;
    }

    public void setfMemo2(String fMemo2) {
        this.fMemo2 = fMemo2;
    }

    public String getfMemo3() {
        return fMemo3;
    }

    public void setfMemo3(String fMemo3) {
        this.fMemo3 = fMemo3;
    }

    public void setfKhuonGo(String fKhuonGo) {
        this.fKhuonGo = fKhuonGo;
    }

    public String getfKhuon() {
        return fKhuon;
    }

    public void setfKhuon(String fKhuon) {
        this.fKhuon = fKhuon;
    }

    public String getfNoiOrder() {
        return fNoiOrder;
    }

    public void setfNoiOrder(String fNoiOrder) {
        this.fNoiOrder = fNoiOrder;
    }

    public String getfSample() {
        return fSample;
    }

    public void setfSample(String fSample) {
        this.fSample = fSample;
    }

    public String getfLoaiGoi() {
        return fLoaiGoi;
    }

    public void setfLoaiGoi(String fLoaiGoi) {
        this.fLoaiGoi = fLoaiGoi;
    }

    /**
     * @return バーコード1
     */
    public BarcodeField getBarcode1() {
        return barcode1;
    }

    /**
     * @param barcode1 バーコード1
     */
    public void setBarcode1(BarcodeField barcode1) {
        this.barcode1 = barcode1;
    }

    /**
     * @return バーコード2
     */
    public BarcodeField getBarcode2() {
        return barcode2;
    }

    /**
     * @param barcode2 バーコード2
     */
    public void setBarcode2(BarcodeField barcode2) {
        this.barcode2 = barcode2;
    }

    /**
     * @return バーコード3
     */
    public BarcodeField getBarcode3() {
        return barcode3;
    }

    /**
     * @param barcode3 バーコード3
     */
    public void setBarcode3(BarcodeField barcode3) {
        this.barcode3 = barcode3;
    }

    public String getfBlank3() {
        return fBlank3;
    }

    public void setfBlank3(String fBlank3) {
        this.fBlank3 = fBlank3;
    }

    public String getfExtrac() {
        return fExtrac;
    }

    public void setfExtrac(String fExtrac) {
        this.fExtrac = fExtrac;
    }

    public String getfSales() {
        return fSales;
    }

    public void setfSales(String fSales) {
        this.fSales = fSales;
    }

    public String getfCus() {
        return fCus;
    }

    public void setfCus(String fCus) {
        this.fCus = fCus;
    }

    public String getfMa1() {
        return fMa1;
    }

    public void setfMa1(String fMa1) {
        this.fMa1 = fMa1;
    }

    public String getfMa2() {
        return fMa2;
    }

    public void setfMa2(String fMa2) {
        this.fMa2 = fMa2;
    }

    public String getfMa3() {
        return fMa3;
    }

    public void setfMa3(String fMa3) {
        this.fMa3 = fMa3;
    }

    public String getfSoTr() {
        return fSoTr;
    }

    public void setfSoTr(String fSoTr) {
        this.fSoTr = fSoTr;
    }

    public String getfSoS() {
        return fSoS;
    }

    public void setfSoS(String fSoS) {
        this.fSoS = fSoS;
    }

    public String getfS1() {
        return fS1;
    }

    public void setfS1(String fS1) {
        this.fS1 = fS1;
    }

    public String getfS2() {
        return fS2;
    }

    public void setfS2(String fS2) {
        this.fS2 = fS2;
    }

    public String getfS3() {
        return fS3;
    }

    public void setfS3(String fS3) {
        this.fS3 = fS3;
    }

    public String getfS4() {
        return fS4;
    }

    public void setfS4(String fS4) {
        this.fS4 = fS4;
    }

    public String getfT1() {
        return fT1;
    }

    public void setfT1(String fT1) {
        this.fT1 = fT1;
    }

    public String getfT2() {
        return fT2;
    }

    public void setfT2(String fT2) {
        this.fT2 = fT2;
    }

    public String getfT3() {
        return fT3;
    }

    public void setfT3(String fT3) {
        this.fT3 = fT3;
    }

    public String getfT4() {
        return fT4;
    }

    public void setfT4(String fT4) {
        this.fT4 = fT4;
    }

    public String getfT5() {
        return fT5;
    }

    public void setfT5(String fT5) {
        this.fT5 = fT5;
    }

    public String getfT6() {
        return fT6;
    }

    public void setfT6(String fT6) {
        this.fT6 = fT6;
    }

    public String getfT7() {
        return fT7;
    }

    public void setfT7(String fT7) {
        this.fT7 = fT7;
    }

    public String getfT8() {
        return fT8;
    }

    public void setfT8(String fT8) {
        this.fT8 = fT8;
    }

    public String getfW() {
        return fW;
    }

    public void setfW(String fW) {
        this.fW = fW;
    }

    public String getfH() {
        return fH;
    }

    public void setfH(String fH) {
        this.fH = fH;
    }

    public String getfD() {
        return fD;
    }

    public void setfD(String fD) {
        this.fD = fD;
    }

    public String getfPaperName() {
        return fPaperName;
    }

    public void setfPaperName(String fPaperName) {
        this.fPaperName = fPaperName;
    }

    public String getfPGam() {
        return fPGam;
    }

    public void setfPGam(String fPGam) {
        this.fPGam = fPGam;
    }

    public String getfSize() {
        return fSize;
    }

    public void setfSize(String fSize) {
        this.fSize = fSize;
    }

    public String getfKT() {
        return fKT;
    }

    public void setfKT(String fKT) {
        this.fKT = fKT;
    }

    public String getfSheet() {
        return fSheet;
    }

    public void setfSheet(String fSheet) {
        this.fSheet = fSheet;
    }

    public String getfIm() {
        return fIm;
    }

    public void setfIm(String fIm) {
        this.fIm = fIm;
    }

    public InputStream getfImagine() {
        return fImagine;
    }

    public void setfImagine(InputStream fImagine) {
        this.fImagine = fImagine;
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
}
