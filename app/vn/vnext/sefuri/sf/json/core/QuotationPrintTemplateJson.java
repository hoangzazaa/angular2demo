package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.dto.QuotationPrintTemplateDto;
import java.math.BigDecimal;
import java.util.List;

/**
 * Contain quotation template to export PDF 
 * @author vupt
 */
public class QuotationPrintTemplateJson  extends BaseJson<QuotationPrintTemplateDto> {

	//selectOption
	@JsonProperty("selectOption")
	private Integer selectOption;

	//path
	@JsonProperty("path")
	private String path;

	//fileName
	@JsonProperty("fileName")
	private String fileName;

	//application
	@JsonProperty("application")
	private String application;

	//quotationRsQuotationTemplate
	@JsonProperty("quotation")
	private List<QuotationJson> quotation;


	/**
	 * Get selectOption
	 *
	 * @return selectOption
	 */
	public Integer getSelectOption(){
		return selectOption;
	}

	/**
	 * Set selectOption
	 *
	 * @param selectOption Integer
	 */
	public void setSelectOption(Integer selectOption) {
		this.selectOption = selectOption;
	}

	/**
	 * Get path
	 *
	 * @return path
	 */
	public String getPath(){
		return path;
	}

	/**
	 * Set path
	 *
	 * @param path String
	 */
	public void setPath(String path) {
		this.path = path;
	}

	/**
	 * Get fileName
	 *
	 * @return fileName
	 */
	public String getFileName(){
		return fileName;
	}

	/**
	 * Set fileName
	 *
	 * @param fileName String
	 */
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	/**
	 * Get application
	 *
	 * @return application
	 */
	public String getApplication(){
		return application;
	}

	/**
	 * Set application
	 *
	 * @param application String
	 */
	public void setApplication(String application) {
		this.application = application;
	}

	/**
	 * Get quotation
	 *
	 * @return quotation
	 */
	public List<QuotationJson> getQuotation(){
		return quotation;
	}

	/**
	 * Set quotation
	 *
	 * @param quotation List<QuotationJson>
	 */
	public void setQuotation(List<QuotationJson> quotation) {
		this.quotation = quotation;
	}

	/**
	 * Create QuotationPrintTemplateJson
	 *
	 * @param dto QuotationPrintTemplateDto
	 */

	public void setData(QuotationPrintTemplateDto dto){
		this.id = dto.getId();
		this.createdUser = dto.getCreatedUser();
		this.updatedUser = dto.getUpdatedUser();
		this.createdDate = dto.getCreatedDate();
		this.updatedDate = dto.getUpdatedDate();
		this.selectOption = dto.getSelectOption();
		this.path = dto.getPath();
		this.fileName = dto.getFileName();
		this.application = dto.getApplication();
	}

	/**
	 * Create QuotationPrintTemplateDto
	 *
	 * @return QuotationPrintTemplateDto
	 */

	public QuotationPrintTemplateDto getData(){
		QuotationPrintTemplateDto dto = new QuotationPrintTemplateDto();
		dto.setId(id);
		dto.setCreatedUser(createdUser);
		dto.setUpdatedUser(updatedUser);
		dto.setCreatedDate(createdDate);
		dto.setUpdatedDate(updatedDate);
		dto.setSelectOption(selectOption);
		dto.setPath(path);
		dto.setFileName(fileName);
		dto.setApplication(application);
		return dto;
	}
}
