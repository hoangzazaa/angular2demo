package vn.vnext.sefuri.sf.module.export.model;

import java.util.List;

/**
 * Created by DungTQ on 5/19/2017.
 */
public class R004Model {
    /* 年月日/ Ngày tháng năm.*/
    String fDate;

    /*形状担当/ Phụ trách hình dạng.*/
    String f1;

    /*形状責任者/ Người chịu trách nhiệm hình dạng*/
    String f2;

    /*工場長/ Giám đốc nhà máy.*/
    String f3;

    /*設計課/ Phòng thiết kế.*/
    String f4;

    /* 営業責任者/ Người chịu trách sale.*/
    String f5;

    /*営業担当/ Phụ trách sale.*/
    String f6;

    /* 中身商品は？/ Sản phẩm bên trong?*/
    String fSpbt;

    /*接触状態は？/Tình trạng tiếp xúc?.*/
    String fTttx;

    /*末端ユーザは？/End-user?.*/
    String fEndUser;

    /* 流通の範囲は？/Phạm vi phân phối?.*/
    String fPhamVipp;

    /* 生産数量は？/ Số lượng sản xuất ?.*/
    String fSoluongSx;

    /*案件番号/Mã deal.*/
    String fDeal;

    /*得意先名/Customer name.*/
    String fCus;

    /*品名/Product name.*/
    String fPro;

    /* 納期（納期）/Delivery date (delivery date).*/
    String fDeli;

    /* 数量/ Quantity.*/
    String fQuan;

    /* 材料/Vật liệu.*/
    String fVatLieu;

    /* 直送先/Nơi gửi trực tiếp.*/
    String fNoigui;

    /*改定日/ Ngày chỉnh sửa.*/
    String fNgayUpdate;

    /* 材質/ Chất liệu.*/
    String fChatlieu;

    /*保存方法は？/ Phương pháp bảo quản?.*/
    String fPp;

    /* 中身重量は?/ Trọng lượng bên trong?.*/
    String fTl;

    /*充填方法は？/ Phương pháp fill?.*/
    String fFill;

    /* サンプルと同時に依頼したいデータは？/ Data muốn request đồng thời với sample.*/
    String fReq;

    /* 参考商品/ Sản phẩm tham khảo.*/
    String fThamKhao;

    /*原紙/ Paper.*/
    String fPaper;

    /*寸法/ Kích thước.*/
    String fKichthuoc;

    /* 形式/ Định dạng.*/
    String fDinhdang;

    /*備考/Notes.*/
    String fNotes;

    List<R003ItemModel> r003ItemModelList;

    public String getfDate() {
        return fDate;
    }

    public void setfDate(String fDate) {
        this.fDate = fDate;
    }

    public String getF1() {
        return f1;
    }

    public void setF1(String f1) {
        this.f1 = f1;
    }

    public String getF2() {
        return f2;
    }

    public void setF2(String f2) {
        this.f2 = f2;
    }

    public String getF3() {
        return f3;
    }

    public void setF3(String f3) {
        this.f3 = f3;
    }

    public String getF4() {
        return f4;
    }

    public void setF4(String f4) {
        this.f4 = f4;
    }

    public String getF5() {
        return f5;
    }

    public void setF5(String f5) {
        this.f5 = f5;
    }

    public String getF6() {
        return f6;
    }

    public void setF6(String f6) {
        this.f6 = f6;
    }

    public String getfSpbt() {
        return fSpbt;
    }

    public void setfSpbt(String fSpbt) {
        this.fSpbt = fSpbt;
    }

    public String getfTttx() {
        return fTttx;
    }

    public void setfTttx(String fTttx) {
        this.fTttx = fTttx;
    }

    public String getfEndUser() {
        return fEndUser;
    }

    public void setfEndUser(String fEndUser) {
        this.fEndUser = fEndUser;
    }

    public String getfPhamVipp() {
        return fPhamVipp;
    }

    public void setfPhamVipp(String fPhamVipp) {
        this.fPhamVipp = fPhamVipp;
    }

    public String getfSoluongSx() {
        return fSoluongSx;
    }

    public void setfSoluongSx(String fSoluongSx) {
        this.fSoluongSx = fSoluongSx;
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

    public String getfVatLieu() {
        return fVatLieu;
    }

    public void setfVatLieu(String fVatLieu) {
        this.fVatLieu = fVatLieu;
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

    public String getfChatlieu() {
        return fChatlieu;
    }

    public void setfChatlieu(String fChatlieu) {
        this.fChatlieu = fChatlieu;
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

    public String getfFill() {
        return fFill;
    }

    public void setfFill(String fFill) {
        this.fFill = fFill;
    }

    public String getfReq() {
        return fReq;
    }

    public void setfReq(String fReq) {
        this.fReq = fReq;
    }

    public String getfThamKhao() {
        return fThamKhao;
    }

    public void setfThamKhao(String fThamKhao) {
        this.fThamKhao = fThamKhao;
    }

    public String getfPaper() {
        return fPaper;
    }

    public void setfPaper(String fPaper) {
        this.fPaper = fPaper;
    }

    public String getfKichthuoc() {
        return fKichthuoc;
    }

    public void setfKichthuoc(String fKichthuoc) {
        this.fKichthuoc = fKichthuoc;
    }

    public String getfDinhdang() {
        return fDinhdang;
    }

    public void setfDinhdang(String fDinhdang) {
        this.fDinhdang = fDinhdang;
    }

    public String getfNotes() {
        return fNotes;
    }

    public void setfNotes(String fNotes) {
        this.fNotes = fNotes;
    }

    public List<R003ItemModel> getR003ItemModelList() {
        return r003ItemModelList;
    }

    public void setR003ItemModelList(List<R003ItemModel> r003ItemModelList) {
        this.r003ItemModelList = r003ItemModelList;
    }
}
