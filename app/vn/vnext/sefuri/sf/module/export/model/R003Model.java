package vn.vnext.sefuri.sf.module.export.model;

import java.util.List;

/**
 * Created by NguyenPK on 15/05/2017.
 */
public class R003Model {

    /* 年月日/ Ngày tháng năm.*/
    String fDate;

    /* 案件番号/ Mã deal.*/
    String fDeal;

    /*得意先名/ Customer name.*/
    String fCus;

    /* 品名/ Product name.*/
    String fPro;

    /* 納期（納期）/ Delivery date .*/
    String fDeli;

    /* 数量/ Quantity.*/
    String fQuan;

    /* 同時依頼/ Request đồng thời.*/
    String fReq;

    /* 形状責任者/ Người chịu trách nhiệm hình dạng*/
    String fNh;

    /* 形状担当/ Phụ trách hình dạng.*/
    String fH;

    /*営業責任者/ Người chịu trách sale .*/
    String fN;

    /* 営業担当/Phụ trách sale.*/
    String fSale;

    /* 中身商品は？/ Sản phẩm bên trong?.*/
    String fSpb;

    /* 保存方法は？/ Phương pháp bảo quản?.*/
    String fPp;

    /* 中身重量は/ Trọng lượng bên trong.*/
    String fTl;

    /* 年間販売個数予測/ Dự đoán số lượng bán ra 1 năm.*/
    String fDd;

    /* 材料/ Vật liệu.*/
    String fVatLieu;

    /* 形式/ Định dạng.*/
    String fDinhDang;

    /* 材質/ Chất liệu.*/
    String fChatLieu;

    /* サイズ/ Size.*/
    String fSize;

    /* Blank().*/
    String fMemo;

    /* 直送先/ Nơi gửi trực tiếp.*/
    String fNoigui;

    /* 改定日/ Ngày chỉnh sửa.*/
    String fNgayUpdate;

    List<R003ItemModel> r003ItemModelList;

    public List<R003ItemModel> getR003ItemModelList() {
        return r003ItemModelList;
    }

    public void setR003ItemModelList(List<R003ItemModel> r003ItemModelList) {
        this.r003ItemModelList = r003ItemModelList;
    }

    public String getfDate() {
        return fDate;
    }

    public void setfDate(String fDate) {
        this.fDate = fDate;
    }

    public String getfDeal() {
        return fDeal;
    }

    public void setfDeal(String fDeal) {
        this.fDeal = fDeal;
    }

    public String getfCus() {
        return fCus;
    }

    public void setfCus(String fCus) {
        this.fCus = fCus;
    }

    public String getfPro() {
        return fPro;
    }

    public void setfPro(String fPro) {
        this.fPro = fPro;
    }

    public String getfDeli() {
        return fDeli;
    }

    public void setfDeli(String fDeli) {
        this.fDeli = fDeli;
    }

    public String getfQuan() {
        return fQuan;
    }

    public void setfQuan(String fQuan) {
        this.fQuan = fQuan;
    }

    public String getfReq() {
        return fReq;
    }

    public void setfReq(String fReq) {
        this.fReq = fReq;
    }

    public String getfNh() {
        return fNh;
    }

    public void setfNh(String fNh) {
        this.fNh = fNh;
    }

    public String getfH() {
        return fH;
    }

    public void setfH(String fH) {
        this.fH = fH;
    }

    public String getfN() {
        return fN;
    }

    public void setfN(String fN) {
        this.fN = fN;
    }

    public String getfSale() {
        return fSale;
    }

    public void setfSale(String fSale) {
        this.fSale = fSale;
    }

    public String getfSpb() {
        return fSpb;
    }

    public void setfSpb(String fSpb) {
        this.fSpb = fSpb;
    }

    public String getfPp() {
        return fPp;
    }

    public void setfPp(String fPp) {
        this.fPp = fPp;
    }

    public String getfTl() {
        return fTl;
    }

    public void setfTl(String fTl) {
        this.fTl = fTl;
    }

    public String getfDd() {
        return fDd;
    }

    public void setfDd(String fDd) {
        this.fDd = fDd;
    }

    public String getfVatLieu() {
        return fVatLieu;
    }

    public void setfVatLieu(String fVatLieu) {
        this.fVatLieu = fVatLieu;
    }

    public String getfDinhDang() {
        return fDinhDang;
    }

    public void setfDinhDang(String fDinhDang) {
        this.fDinhDang = fDinhDang;
    }

    public String getfChatLieu() {
        return fChatLieu;
    }

    public void setfChatLieu(String fChatLieu) {
        this.fChatLieu = fChatLieu;
    }

    public String getfSize() {
        return fSize;
    }

    public void setfSize(String fSize) {
        this.fSize = fSize;
    }

    public String getfMemo() {
        return fMemo;
    }

    public void setfMemo(String fMemo) {
        this.fMemo = fMemo;
    }

    public String getfNoigui() {
        return fNoigui;
    }

    public void setfNoigui(String fNoigui) {
        this.fNoigui = fNoigui;
    }

    public String getfNgayUpdate() {
        return fNgayUpdate;
    }

    public void setfNgayUpdate(String fNgayUpdate) {
        this.fNgayUpdate = fNgayUpdate;
    }
}
