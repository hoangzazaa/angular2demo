package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.dto.DealFileDto;
import java.math.BigDecimal;
import java.util.List;

/**
 * Contain information of file of deal 
 * @author vupt
 */
public class DealFileJson  extends BaseJson<DealFileDto> {

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

	//dealFileName
	@JsonProperty("dealFileName")
	private String dealFileName;

	//メモ
	@JsonProperty("memo")
	private String memo;

	//highlightFlag
	@JsonProperty("highlightFlag")
	private Integer highlightFlag;

	//dealRsDealFile
	@JsonProperty("deal")
	private DealJson deal;

	//fileRsDealFile
	@JsonProperty("file")
	private FileJson file;


	/**
	 * Get fileId
	 *
	 * @return fileId
	 */
	public Integer getFileId(){
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
	public String getOriginalName(){
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
	public Integer getDealId(){
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
	public String getDealFileId(){
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
	public String getDealFileName(){
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
	public String getMemo(){
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
	public Integer getHighlightFlag(){
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
	public DealJson getDeal(){
		return deal;
	}

	/**
	 * Set deal
	 *
	 * @param deal DealJson
	 */
	public void setDeal(DealJson deal) {
		this.deal = deal;
	}

	/**
	 * Get file
	 *
	 * @return file
	 */
	public FileJson getFile(){
		return file;
	}

	/**
	 * Set file
	 *
	 * @param file FileJson
	 */
	public void setFile(FileJson file) {
		this.file = file;
	}

	/**
	 * Create DealFileJson
	 *
	 * @param dto DealFileDto
	 */

	public void setData(DealFileDto dto){
		this.id = dto.getId();
		this.createdUser = dto.getCreatedUser();
		this.updatedUser = dto.getUpdatedUser();
		this.createdDate = dto.getCreatedDate();
		this.updatedDate = dto.getUpdatedDate();
		this.fileId = dto.getFileId();
		this.originalName = dto.getOriginalName();
		this.dealId = dto.getDealId();
		this.dealFileId = dto.getDealFileId();
		this.dealFileName = dto.getDealFileName();
		this.memo = dto.getMemo();
		this.highlightFlag = dto.getHighlightFlag();
		this.deal = new DealJson();
		this.deal.setId(dto.getDealId());
		this.file = new FileJson();
		this.file.setId(dto.getFileId());
	}

	/**
	 * Create DealFileDto
	 *
	 * @return DealFileDto
	 */

	public DealFileDto getData(){
		DealFileDto dto = new DealFileDto();
		dto.setId(id);
		dto.setCreatedUser(createdUser);
		dto.setUpdatedUser(updatedUser);
		dto.setCreatedDate(createdDate);
		dto.setUpdatedDate(updatedDate);
		dto.setFileId(fileId);
		dto.setOriginalName(originalName);
		dto.setDealId(dealId);
		dto.setDealFileId(dealFileId);
		dto.setDealFileName(dealFileName);
		dto.setMemo(memo);
		dto.setHighlightFlag(highlightFlag);
		return dto;
	}
}
