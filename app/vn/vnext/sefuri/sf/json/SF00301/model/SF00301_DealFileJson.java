package vn.vnext.sefuri.sf.json.SF00301.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.dto.DealFileDto;
import vn.vnext.sefuri.sf.json.common.BaseJson;

/**
 * Contain information of file of deal
 *
 * @author vupt
 */
public class SF00301_DealFileJson extends BaseJson<DealFileDto> {
    //ファイルID
    @JsonProperty("fileId")
    private Integer fileId;

    //ファイル名称
    @JsonProperty("originalName")
    private String originalName;

    //dealId
    @JsonProperty("dealId")
    private Integer dealId;

    //dealFileId
    @JsonProperty("dealFileId")
    private String dealFileId;

    //highlightFlag
    @JsonProperty("highlightFlag")
    private Integer highlightFlag;

    //メモ
    @JsonProperty("memo")
    private String memo;

    /* image file path */
    @JsonProperty("srcImg")
    private String srcImg;

    @JsonProperty("dealFileName")
    private String dealFileName;

    public Integer getFileId() {
        return fileId;
    }

    public void setFileId(final Integer fileId) {
        this.fileId = fileId;
    }

    public String getOriginalName() {
        return originalName;
    }

    public void setOriginalName(final String originalName) {
        this.originalName = originalName;
    }

    public Integer getDealId() {
        return dealId;
    }

    public void setDealId(final Integer dealId) {
        this.dealId = dealId;
    }

    public String getDealFileId() {
        return dealFileId;
    }

    public void setDealFileId(final String dealFileId) {
        this.dealFileId = dealFileId;
    }

    public String getDealFileName() {
        return dealFileName;
    }

    public void setDealFileName(final String dealFileName) {
        this.dealFileName = dealFileName;
    }

    public String getMemo() {
        return memo;
    }

    public void setMemo(final String memo) {
        this.memo = memo;
    }

    public String getSrcImg() {
        return srcImg;
    }

    public void setSrcImg(final String srcImg) {
        this.srcImg = srcImg;
    }

    public Integer getHighlightFlag() {
        return highlightFlag;
    }

    public void setHighlightFlag(Integer highlightFlag) {
        this.highlightFlag = highlightFlag;
    }

    @Override
    public DealFileDto getModel() {
        DealFileDto dto = new DealFileDto();
        dto.setId(this.id);
        dto.setFileId(this.fileId);
        dto.setOriginalName(this.originalName);
        dto.setDealId(this.dealId);
        dto.setDealFileId(this.dealFileId);
        dto.setDealFileName(this.dealFileName);
        dto.setUpdatedDate(this.updatedDate);
        dto.setCreatedDate(this.createdDate);
        dto.setMemo(this.memo);
        dto.setHighlightFlag(this.highlightFlag);

        return dto;
    }

    @Override
    public void setModel(final DealFileDto dto) {
        if (dto != null) {
            setData(dto);

            this.fileId = dto.getFileId();
            this.originalName = dto.getOriginalName();
            this.dealId = dto.getDealId();
            this.dealFileId = dto.getDealFileId();
            this.dealFileName = dto.getDealFileName();
            this.memo = dto.getMemo();
            this.highlightFlag = dto.getHighlightFlag();
        }
    }
}
