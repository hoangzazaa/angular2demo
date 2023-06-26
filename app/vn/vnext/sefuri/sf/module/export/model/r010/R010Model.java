package vn.vnext.sefuri.sf.module.export.model.r010;

import java.io.InputStream;
import java.util.List;

/**
 * Created by Nguyenpk on 8/2/2017.
 */
public class R010Model {
    private String customerName;
    private String customerPicName;
    private String salePicName;
    private String phoneNumber;
    private String faxNumber;
    private String dateReport;
    private String currentPage;
    private String totalPage;
    List<R010ProductItemModel> listProduct;

    private InputStream logoSagasiki;

    public InputStream getLogoSagasiki() {
        return logoSagasiki;
    }

    public void setLogoSagasiki(InputStream logoSagasiki) {
        this.logoSagasiki = logoSagasiki;
    }

    public List<R010ProductItemModel> getListProduct() {
        return listProduct;
    }

    public void setListProduct(List<R010ProductItemModel> listProduct) {
        this.listProduct = listProduct;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerPicName() {
        return customerPicName;
    }

    public void setCustomerPicName(String customerPicName) {
        this.customerPicName = customerPicName;
    }

    public String getSalePicName() {
        return salePicName;
    }

    public void setSalePicName(String salePicName) {
        this.salePicName = salePicName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getFaxNumber() {
        return faxNumber;
    }

    public void setFaxNumber(String faxNumber) {
        this.faxNumber = faxNumber;
    }

    public String getDateReport() {
        return dateReport;
    }

    public void setDateReport(String dateReport) {
        this.dateReport = dateReport;
    }

    public String getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(String currentPage) {
        this.currentPage = currentPage;
    }

    public String getTotalPage() {
        return totalPage;
    }

    public void setTotalPage(String totalPage) {
        this.totalPage = totalPage;
    }
}
