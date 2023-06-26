package vn.vnext.sefuri.sf.json.SF00302.model;

import vn.vnext.sefuri.sf.dto.MstPaperDto;

import java.math.BigDecimal;

/**
 * Created by hoangtd on 8/22/2017.
 */
public class MstPaperPrc extends MstPaperDto {

    /** 原紙サイズ ID (sfr_sf_mst_sheet_size.id) 特殊原紙のみ */
    private Integer sheetSizeId;

    private BigDecimal width;

    private BigDecimal height;

    /**
     * @return 原紙サイズ ID (sfr_sf_mst_sheet_size.id) 特殊原紙のみ
     */
    public Integer getSheetSizeId() {
        return sheetSizeId;
    }

    /**
     * @param sheetSizeId 原紙サイズ ID (sfr_sf_mst_sheet_size.id) 特殊原紙のみ
     */
    public void setSheetSizeId(Integer sheetSizeId) {
        this.sheetSizeId = sheetSizeId;
    }

    public BigDecimal getWidth() {
        return width;
    }

    public void setWidth(BigDecimal width) {
        this.width = width;
    }

    public BigDecimal getHeight() {
        return height;
    }

    public void setHeight(BigDecimal height) {
        this.height = height;
    }
}
