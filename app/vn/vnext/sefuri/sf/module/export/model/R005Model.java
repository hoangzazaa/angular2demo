package vn.vnext.sefuri.sf.module.export.model;

import java.util.List;

/**
 * Created by NguyenPK on 22/05/2017.
 */
public class R005Model {

    /* 年月日/ Ngày tháng năm .*/
    String exportDate;

    /*No.*/
    String no;

    /* クライアント/ Client .*/
    String customerName;

    /* 営業担当/ Phụ trách sale .*/
    String saleName;

    /* 品名（タイトル）/ Product name (Title) .*/
    String productName;

    /* ランク/ Rank .*/
    String rank;

    /* 希望納期/ Delivery date mong muốn .*/
    String deliveryDate;

    /* 受注回数/ Số lần order .*/
    String orderTimes;

    /* 立体ダミー/ Dummy lập thể .*/
    String stereoscopicDummy;

    /* 平面出力/ Export theo mặt phẳng .*/
    String flatDummy;

    /* サンプルNo/ Sample No .*/
    String sampleNo;

    /* フィルムNo/ Film No.*/
    String filmNo;

    /* 売り上げ予測/ Dự đoán doanh thu.*/
    String forecastRevenue;

    /* データ入稿期限/ Thời hạn gửi draft data.*/
    String submissionDeadline;

    /* 製品納品予定日/ Ngày dự định delivery product.*/
    String productDeliveryDateSched;

    /* 備考欄/ Cột Notes .*/
    String fMemo;

    /*ターゲット/ Target.*/
    String fTarget;

    /* 売り場/ Nơi bán.*/
    String fPlaceOfSale;

    /*用途/ Ứng dụng.*/
    String fApp;

    String designConcept;

    List<R005ItemModel> r005ItemModels;

    public String getDesignConcept() {
        return designConcept;
    }

    public void setDesignConcept(String designConcept) {
        this.designConcept = designConcept;
    }

    public String getExportDate() {
        return exportDate;
    }

    public void setExportDate(String exportDate) {
        this.exportDate = exportDate;
    }

    public String getNo() {
        return no;
    }

    public void setNo(String no) {
        this.no = no;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getSaleName() {
        return saleName;
    }

    public void setSaleName(String saleName) {
        this.saleName = saleName;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getRank() {
        return rank;
    }

    public void setRank(String rank) {
        this.rank = rank;
    }

    public String getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(String deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    public String getOrderTimes() {
        return orderTimes;
    }

    public void setOrderTimes(String orderTimes) {
        this.orderTimes = orderTimes;
    }

    public String getStereoscopicDummy() {
        return stereoscopicDummy;
    }

    public void setStereoscopicDummy(String stereoscopicDummy) {
        this.stereoscopicDummy = stereoscopicDummy;
    }

    public String getFlatDummy() {
        return flatDummy;
    }

    public void setFlatDummy(String flatDummy) {
        this.flatDummy = flatDummy;
    }

    public String getSampleNo() {
        return sampleNo;
    }

    public void setSampleNo(String sampleNo) {
        this.sampleNo = sampleNo;
    }

    public String getFilmNo() {
        return filmNo;
    }

    public void setFilmNo(String filmNo) {
        this.filmNo = filmNo;
    }

    public String getForecastRevenue() {
        return forecastRevenue;
    }

    public void setForecastRevenue(String forecastRevenue) {
        this.forecastRevenue = forecastRevenue;
    }

    public String getSubmissionDeadline() {
        return submissionDeadline;
    }

    public void setSubmissionDeadline(String submissionDeadline) {
        this.submissionDeadline = submissionDeadline;
    }

    public String getProductDeliveryDateSched() {
        return productDeliveryDateSched;
    }

    public void setProductDeliveryDateSched(String productDeliveryDateSched) {
        this.productDeliveryDateSched = productDeliveryDateSched;
    }

    public String getfMemo() {
        return fMemo;
    }

    public void setfMemo(String fMemo) {
        this.fMemo = fMemo;
    }

    public String getfTarget() {
        return fTarget;
    }

    public void setfTarget(String fTarget) {
        this.fTarget = fTarget;
    }

    public String getfPlaceOfSale() {
        return fPlaceOfSale;
    }

    public void setfPlaceOfSale(String fPlaceOfSale) {
        this.fPlaceOfSale = fPlaceOfSale;
    }

    public String getfApp() {
        return fApp;
    }

    public void setfApp(String fApp) {
        this.fApp = fApp;
    }

    public List<R005ItemModel> getR005ItemModels() {
        return r005ItemModels;
    }

    public void setR005ItemModels(List<R005ItemModel> r005ItemModels) {
        this.r005ItemModels = r005ItemModels;
    }
}
