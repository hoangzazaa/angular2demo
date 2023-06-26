package vn.vnext.sefuri.sf.module.export.helper;

import com.auth0.jwt.internal.org.apache.commons.lang3.StringUtils;
import com.google.common.base.Strings;
import vn.vnext.sefuri.sf.dao.CustomerDao;
import vn.vnext.sefuri.sf.dto.CustomerDto;
import vn.vnext.sefuri.sf.dto.DealDto;
import vn.vnext.sefuri.sf.dto.ProductDto;
import vn.vnext.sefuri.sf.module.export.model.r007.R007OrderHistoryC;
import vn.vnext.sefuri.sf.module.export.model.r007.R007QuotationInfoC;
import vn.vnext.sefuri.sf.util.DateUtil;

import java.io.InputStream;
import java.math.BigDecimal;
import java.util.List;

/**
 * 既存情報をProductModelCの値へ変換するクラス
 * 各値の変換を1変数毎に定義する。
 * TODO リファクタリング方針として作成した。ReportBuilderクラスにてこのクラスを使用するよう変更すること。
 */
public class ProductModelCDataConverter {

    private static String DATETIME_FORMAT_1 = "MM月dd日";
    private static String DATETIME_FORMAT_2 = "yyyy/MM/dd";
    private static String dateTimeFormatter3 = "yyyyMMdd";
    private static final String X_MULTI = " × ";
    private static final String CHECK_CIRCLE = "◯";
    private static final String PATTERN_FORMAT_DECIMAL = "#,000";
    private static final String COLOR_UNIT = "C";
    private static int wastePaperFlag;
    private static final String CHECK_SLASH = "/";


    private DealDto dealDto;
    private ProductDto productDto;
    private CustomerDto customerDto;

    public ProductModelCDataConverter(final DealDto dealDto, final ProductDto productDto, final CustomerDao customerDao){
        this.dealDto = dealDto;
        this.productDto = productDto;
        this.customerDto = customerDao.findCustomerById(dealDto.getCustomerId());
    }


    public String getOrderDate() {
        return null;
    }

    public String getQuantity() {
        return null;
//        return quantity;
    }

    public String getDeliveryDate() {
        return dealDto.getDeliveryDate().toString(DATETIME_FORMAT_1);
    }

    public String getProductionNumber() {
        return null;
//        return productionNumber;
    }

    public String getOrderNo() {
        return null;
//        return orderNo;
    }

    public String getProductionSpecs() {
        return null;
//        return productionSpecs;
    }

    public String getPrintingVersion() {
        return null;
//        return printingVersion;
    }

    public String getWooden() {
        return null;
//        return wooden;
    }

    public String getMold() {
        return null;
//        return mold;
    }

    public String getItemC() {
        return productDto.getItemCode();
    }

    public String getCreateDate() {
        return (productDto.getCreateRequestDesignDate() == null) ?
                StringUtils.EMPTY :
                DateUtil.formatDate(productDto.getCreateRequestDesignDate(), DATETIME_FORMAT_2);
    }

    public String getUpdateDate() {
        return productDto.getUpdateRequestDesignDate() == null ?
                StringUtils.EMPTY :
                DateUtil.formatDate(productDto.getUpdateRequestDesignDate(), DATETIME_FORMAT_2);
    }

    public String getCustomerCode() {
        return getNonNullString(customerDto.getCustomerCode());
    }

    public String getCustomerName() {
        return getNonNullString(customerDto.getName());
    }

    public String getProductName() {
        return getNonNullString(productDto.getProductName());
    }

    public String getSizeH() {
        return getNonNullString(productDto.getSizeH().setScale(0, BigDecimal.ROUND_HALF_UP));
    }

    public String getSizeW() {
        return getNonNullString(productDto.getSizeW().setScale(0, BigDecimal.ROUND_HALF_UP));
    }

    public String getSizeD() {
        return getNonNullString(productDto.getSizeD().setScale(0, BigDecimal.ROUND_HALF_UP));
    }

    public String getPaperSizeW() {
        // 16. 展開寸/ Kích thước triển khai
        StringBuilder paperSize = new StringBuilder();
        String paperSizeW = StringUtils.EMPTY;
        BigDecimal sizeH = productDto.getSizeH() != null ? productDto.getSizeH() : BigDecimal.ZERO;
        BigDecimal sizeW = productDto.getSizeD() != null ? productDto.getSizeD() : BigDecimal.ZERO;
        BigDecimal customFlap = BigDecimal.ZERO;
        if (productDto.getUpperFlap() != null && productDto.getLowerFlap() != null) {
            customFlap = productDto.getUpperFlap().add(productDto.getLowerFlap()).subtract(calcDefaulFlap(productDto).multiply(BigDecimal.valueOf(2)));
        }
        BigDecimal blankSizeWCounting;
        // blank size of sheet
        if (productDto.getCartonShippingType() == 1) {
            // 16.1. 巾/ Chiều rộng
            if (productDto.getBlankPaperSizeW() != null) {
                paperSizeW = String.valueOf(productDto.getBlankPaperSizeW().setScale(0, BigDecimal.ROUND_HALF_UP));
            }
        } else if (productDto.getCartonShippingType() == 2) {
            blankSizeWCounting = sizeH.add(sizeW);
            if (productDto.getLaminationFlute() == 1) {
                blankSizeWCounting = blankSizeWCounting.add(BigDecimal.valueOf(6));
            } else if (productDto.getLaminationFlute() == 2) {
                blankSizeWCounting = blankSizeWCounting.add(BigDecimal.valueOf(4));
            } else {
                blankSizeWCounting = blankSizeWCounting.add(BigDecimal.valueOf(10));
            }
            blankSizeWCounting = blankSizeWCounting.add(customFlap);
            paperSizeW = String.valueOf(blankSizeWCounting.setScale(0, BigDecimal.ROUND_HALF_UP));
        }

        return paperSizeW;
    }

    public String getPaperSizeH() {
        // 16. 展開寸/ Kích thước triển khai
        StringBuilder paperSize = new StringBuilder();
        String paperSizeH = StringUtils.EMPTY;
        BigDecimal sizeW = productDto.getSizeD() != null ? productDto.getSizeD() : BigDecimal.ZERO;
        BigDecimal sizeD = productDto.getSizeW() != null ? productDto.getSizeW() : BigDecimal.ZERO;
        BigDecimal blankSizeHCounting;
        // blank size of sheet
        if (productDto.getCartonShippingType() == 1) {
            // 16.2. 流れ/ Chiều dài
            if (productDto.getBlankPaperSizeH() != null) {
                paperSizeH = String.valueOf(productDto.getBlankPaperSizeH().setScale(0, BigDecimal.ROUND_HALF_UP));
            }
        } else if (productDto.getCartonShippingType() == 2) {
            // 16.2. 流れ/ Chiều dài
            blankSizeHCounting = ((sizeW.multiply(BigDecimal.valueOf(2))).add(sizeD.multiply(BigDecimal.valueOf(2))));
            if (productDto.getLaminationFlute() == 1) {
                blankSizeHCounting = blankSizeHCounting.add(BigDecimal.valueOf(35));
            } else if (productDto.getLaminationFlute() == 2) {
                blankSizeHCounting = blankSizeHCounting.add(BigDecimal.valueOf(30));
            } else {
                blankSizeHCounting = blankSizeHCounting.add(BigDecimal.valueOf(40));
            }
            paperSizeH = String.valueOf(blankSizeHCounting.setScale(0, BigDecimal.ROUND_HALF_UP));
        }
        return paperSizeH;
    }

    public String getWoodenNo() {
        String woodenNo = StringUtils.EMPTY;
        if (!Strings.isNullOrEmpty(productDto.getWoodenCode())) {
            woodenNo = productDto.getWoodenCode();
            if (productDto.getShareWoodenFlag1() != null && productDto.getShareWoodenFlag1() == 1) {
                woodenNo += " 兼用";
            }
        }
        return woodenNo;
    }

    public String getMoldNo() {
        return StringUtils.EMPTY;
    }

    public String getLaminationFlute() {
        return null;
//        return laminationFlute;
    }

    public String getLaminationSizeW() {
        return null;
//        return laminationSizeW;
    }

    public String getMaterialPaper1() {
        return null;
//        return materialPaper1;
    }

    public String getMaterialPaper2() {
        return null;
//        return materialPaper2;
    }

    public String getMaterialPaper3() {
        return null;
//        return materialPaper3;
    }

    public String getMaterialPaper4() {
        return null;
//        return materialPaper4;
    }

    public String getMaterialPaper5() {
        return null;
//        return materialPaper5;
    }

    public String getCorrugatorCuttingW() {
        return null;
//        return corrugatorCuttingW;
    }

    public String getCorrugatorCuttingH() {
        return null;
//        return corrugatorCuttingH;
    }

    public String getSlitterCuttingFlowW() {
        return null;
//        return slitterCuttingFlowW;
    }

    public String getSlitterCuttingFlowH() {
        return null;
//        return slitterCuttingFlowH;
    }

    public String getImposition() {
        return null;
//        return imposition;
    }

    public String getImpositionWooden() {
        return null;
//        return impositionWooden;
    }

    public String getVolume() {
        return null;
//        return volume;
    }

    public String getNumberOfColor() {
        return null;
//        return numberOfColor;
    }

    public String getColorMemo1() {
        return null;
//        return colorMemo1;
    }

    public String getColorMemo2() {
        return null;
//        return colorMemo2;
    }

    public String getColorMemo3() {
        return null;
//        return colorMemo3;
    }

    public String getHandProcessingDataA() {
        return null;
//        return handProcessingDataA;
    }

    public String getHandProcessingDataB() {
        return null;
//        return handProcessingDataB;
    }

    public String getHandProcessingDataC() {
        return null;
//        return handProcessingDataC;
    }

    public String getHandProcessingDataD() {
        return null;
//        return handProcessingDataD;
    }

    public String getUnitQuantityLimited() {
        return null;
//        return unitQuantityLimited;
    }

    public String getColorT() {
        return null;
//        return colorT;
    }

    public Integer getCheckColorT() {
        return null;
//        return checkColorT;
    }

    public Integer getCheckColorS() {
        return null;
//        return checkColorS;
    }

    public String getColorS() {
        return null;
//        return colorS;
    }

    public String getUnitQuantity() {
        return null;
//        return unitQuantity;
    }

    public String getBidingMethod() {
        return null;
//        return bidingMethod;
    }

    public String getBidingNumber() {
        return null;
//        return bidingNumber;
    }

    public String getString() {
        return null;
//        return string;
    }

    public String getStringColor() {
        return null;
//        return stringColor;
    }

    public String getSaleSample() {
        return null;
//        return saleSample;
    }

    public String getCustomerSample() {
        return null;
//        return customerSample;
    }

    public String getProductDevelopment() {
        return null;
//        return productDevelopment;
    }

    public String getForDisplay() {
        return null;
//        return forDisplay;
    }

    public String getNote1() {
        return null;
//        return note1;
    }

    public String getNote2() {
        return null;
//        return note2;
    }

    public String getNote3() {
        return null;
//        return note3;
    }

    public String getSealVersionSubcontractingCode() {
        return null;
//        return sealVersionSubcontractingCode;
    }

    public String getT() {
        return null;
//        return t;
    }

    public String getSl() {
        return null;
//        return sl;
    }

    public String getSc1() {
        return null;
//        return sc1;
    }

    public String getSc2() {
        return null;
//        return sc2;
    }

    public String getSc3() {
        return null;
//        return sc3;
    }

    public String getSc4() {
        return null;
//        return sc4;
    }

    public String getSc5() {
        return null;
//        return sc5;
    }

    public String getSc6() {
        return null;
//        return sc6;
    }

    public String getCorrugator() {
        return null;
//        return corrugator;
    }

    public String getSlitterScore() {
        return null;
//        return slitterScore;
    }

    public String getSlitter() {
        return null;
//        return slitter;
    }

    public String getFfg() {
        return null;
//        return ffg;
    }

    public String getFfgContent() {
        return null;
//        return ffgContent;
    }

    public String getPunching() {
        return null;
//        return punching;
    }

    public String getSackMachine() {
        return null;
//        return sackMachine;
    }

    public String getOtherStep1() {
        return null;
//        return otherStep1;
    }

    public String getOtherStep2() {
        return null;
//        return otherStep2;
    }

    public String getOtherStep3() {
        return null;
//        return otherStep3;
    }

    public String getOtherStep4() {
        return null;
//        return otherStep4;
    }

    public String getOtherStep5() {
        return null;
//        return otherStep5;
    }

    public String getOtherStep6() {
        return null;
//        return otherStep6;
    }

    public String getOtherStepCheck1() {
        return null;
//        return otherStepCheck1;
    }

    public String getOtherStepCheck2() {
        return null;
//        return otherStepCheck2;
    }

    public String getOtherStepCheck3() {
        return null;
//        return otherStepCheck3;
    }

    public String getOtherStepCheck4() {
        return null;
//        return otherStepCheck4;
    }

    public String getOtherStepCheck5() {
        return null;
//        return otherStepCheck5;
    }

    public String getOtherStepCheck6() {
        return null;
//        return otherStepCheck6;
    }

    public String getBarcodeJan() {
        return null;
//        return barcodeJan;
    }

    public String getBarcodeItf() {
        return null;
//        return barcodeItf;
    }

    public String getBarcodeGtin() {
        return null;
//        return barcodeGtin;
    }

    public String getClassificationPackaging() {
        return null;
//        return classificationPackaging;
    }

    public InputStream getDrawingImg() {
        return null;
//        return drawingImg;
    }

    public List<R007OrderHistoryC> getListOrderHistory1() {
        return null;
//        return listOrderHistory1;
    }

    public List<R007OrderHistoryC> getListOrderHistory2() {
        return null;
//        return listOrderHistory2;
    }

    public List<R007QuotationInfoC> getR007QuotationInfoCS() {
        return null;
//        return r007QuotationInfoCS;
    }

    public String getClassificationEndIndustry() {
        return null;
//        return classificationEndIndustry;
    }

    public String getClassificationPackagingContainer() {
        return null;
//        return classificationPackagingContainer;
    }

    public String getIsExpenseBurden() {
        return null;
//        return isExpenseBurden;
    }

    public String getDecompositionType() {
        return null;
//        return decompositionType;
    }

    public String getCorrugatorContent() {
        return null;
//        return corrugatorContent;
    }

    public String getSriskoContent() {
        return null;
//        return sriskoContent;
    }

    public String getSlitterContent() {
        return null;
//        return slitterContent;
    }

    public String getNotices() {
        return null;
//        return notices;
    }

    private <T> String getNonNullString(T object){
        return object == null ? StringUtils.EMPTY : String.valueOf(object);
    }

    public BigDecimal calcDefaulFlap(ProductDto productDto) {
        if(productDto.getSizeD() == null) return BigDecimal.ZERO;
        BigDecimal result = productDto.getSizeD().divide(new BigDecimal(2));
        if (productDto.getLaminationFlute() == 1) {
            result = result.add(BigDecimal.valueOf(2));
        } else if (productDto.getLaminationFlute() == 2) {
            result = result.add(BigDecimal.valueOf(1.5));
        } else {
            result = result.add(BigDecimal.valueOf(3));
        }
        return result.setScale(0, BigDecimal.ROUND_FLOOR);
    }

}
