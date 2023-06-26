package vn.vnext.sefuri.sf.dto;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * 届け先画像情報
 *
 * @author vupt
 */
@Entity
@Table(name = "sfr_sf_shipping_destination_image")
public class ShippingDestinationImageDto extends BaseDto {
    /** 届け先 ID (FK: sfr_sf_shipping_destination.id) */
    private Integer shippingDestinationId;
    /** 表示順 */
    private Integer displayOrder;
    /** ファイル ID (FK: sfr_sf_file.id) */
    private Integer fileId;
    /** コメント */
    private String memo;

    /** ファイル */
    private FileDto file;


    /**
     * @return 届け先 ID (FK: sfr_sf_shipping_destination.id)
     */
    @Basic
    @Column(name = "shipping_destination_id")
    public Integer getShippingDestinationId() {
        return shippingDestinationId;
    }

    /**
     * @param shippingDestinationId 届け先 ID (FK: sfr_sf_shipping_destination.id)
     */
    public void setShippingDestinationId(Integer shippingDestinationId) {
        this.shippingDestinationId = shippingDestinationId;
    }

    /**
     * @return 表示順
     */
    @Basic
    @Column(name = "display_order")
    public Integer getDisplayOrder() {
        return displayOrder;
    }

    /**
     * @param displayOrder 表示順
     */
    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }

    /**
     * @return ファイル ID (FK: sfr_sf_file.id)
     */
    @Basic
    @Column(name = "file_id")
    public Integer getFileId() {
        return fileId;
    }

    /**
     * @param fileId ファイル ID (FK: sfr_sf_file.id)
     */
    public void setFileId(Integer fileId) {
        this.fileId = fileId;
    }

    /**
     * @return コメント
     */
    @Basic
    @Column(name = "memo", columnDefinition = "TEXT")
    public String getMemo() {
        return memo;
    }

    /**
     * @param memo コメント
     */
    public void setMemo(String memo) {
        this.memo = memo;
    }

    /**
     * @return ファイル
     */
    @Transient
    public FileDto getFile() {
        return file;
    }

    /**
     * @param file ファイル
     */
    public void setFile(FileDto file) {
        this.file = file;
    }
}
