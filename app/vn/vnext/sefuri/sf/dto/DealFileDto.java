package vn.vnext.sefuri.sf.dto;

import javax.persistence.*;

/**
 * Contain information of file of deal
 *
 * @author vupt
 */
@Entity
@Table(name = "sfr_sf_deal_file")
public class DealFileDto extends BaseDto {

    /* ファイルID */
    private Integer fileId;
    /* ファイル名称 */
    private String originalName;
    /* dealId */
    private Integer dealId;
    /* dealFileId */
    private String dealFileId;
    /* dealFileName */
    private String dealFileName;
    /* メモ */
    private String memo;
    /* highlightFlag */

    private Integer highlightFlag = 0;
    /* dealRsDealFile */
    private DealDto deal;
    /* fileRsDealFile */
    private FileDto file;

    /**
     * Get fileId
     *
     * @return fileId
     */
    @Basic
    @Column(name = "file_id")
    public Integer getFileId() {
        return fileId;
    }

    /**
     * Set fileId
     *
     * @param fileId Integer
     */
    public void setFileId(Integer fileId) {
        this.fileId = fileId;
    }

    /**
     * Get originalName
     *
     * @return originalName
     */
    @Basic
    @Column(name = "original_name")
    public String getOriginalName() {
        return originalName;
    }

    /**
     * Set originalName
     *
     * @param originalName String
     */
    public void setOriginalName(String originalName) {
        this.originalName = originalName;
    }

    /**
     * Get dealId
     *
     * @return dealId
     */
    @Basic
    @Column(name = "deal_id")
    public Integer getDealId() {
        return dealId;
    }

    /**
     * Set dealId
     *
     * @param dealId Integer
     */
    public void setDealId(Integer dealId) {
        this.dealId = dealId;
    }

    /**
     * Get dealFileId
     *
     * @return dealFileId
     */
    @Basic
    @Column(name = "deal_file_id")
    public String getDealFileId() {
        return dealFileId;
    }

    /**
     * Set dealFileId
     *
     * @param dealFileId String
     */
    public void setDealFileId(String dealFileId) {
        this.dealFileId = dealFileId;
    }

    /**
     * Get dealFileName
     *
     * @return dealFileName
     */
    @Basic
    @Column(name = "deal_file_name")
    public String getDealFileName() {
        return dealFileName;
    }

    /**
     * Set dealFileName
     *
     * @param dealFileName String
     */
    public void setDealFileName(String dealFileName) {
        this.dealFileName = dealFileName;
    }

    /**
     * Get memo
     *
     * @return memo
     */
    @Basic
    @Column(name = "memo")
    public String getMemo() {
        return memo;
    }

    /**
     * Set memo
     *
     * @param memo String
     */
    public void setMemo(String memo) {
        this.memo = memo;
    }

    /**
     * Get highlightFlag
     *
     * @return highlightFlag
     */
    @Basic
    @Column(name = "highlight_flag")
    public Integer getHighlightFlag() {
        return highlightFlag;
    }

    /**
     * Set highlightFlag
     *
     * @param highlightFlag Integer
     */
    public void setHighlightFlag(Integer highlightFlag) {
        this.highlightFlag = highlightFlag;
    }

    /**
     * Get deal
     *
     * @return deal
     */
    @Transient
    public DealDto getDeal() {
        return deal;
    }

    /**
     * Set deal
     *
     * @param deal DealDto
     */
    public void setDeal(DealDto deal) {
        this.deal = deal;
    }

    /**
     * Get file
     *
     * @return file
     */
    @Transient
    public FileDto getFile() {
        return file;
    }

    /**
     * Set file
     *
     * @param file FileDto
     */
    public void setFile(FileDto file) {
        this.file = file;
    }

}