package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.dto.ChecksheetDto;
import vn.vnext.sefuri.sf.dto.DealDto;

import java.math.BigDecimal;
import java.util.List;

/**
 * Contain checklist for a deal 
 * @author vupt
 */
public class ChecksheetJson  extends BaseJson<ChecksheetDto> {

	/* questionCode */
	@JsonProperty("questionCode")
	private Integer questionCode;

	@JsonProperty("textArea1")
	private String textArea1;

	@JsonProperty("textArea2")
	private String textArea2;

	@JsonProperty("radioButton")
	private Integer radioButton;

	@JsonProperty("selectBox1")
	private Integer selectBox1;

	@JsonProperty("selectBox2")
	private Integer selectBox2;

	@JsonProperty("selectBox3")
	private Integer selectBox3;

	/* dealId */
	@JsonProperty("dealId")
	private Integer dealId;
    /* answerText */



	//dealRsChecksheet
	@JsonProperty("deal")
	private DealJson deal;


	/**
	 * Get questionCode
	 *
	 * @return questionCode
	 */
	public Integer getQuestionCode(){
		return questionCode;
	}

	/**
	 * Set questionCode
	 *
	 * @param questionCode Integer
	 */
	public void setQuestionCode(Integer questionCode) {
		this.questionCode = questionCode;
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
	 * Create ChecksheetJson
	 *
	 * @param dto ChecksheetDto
	 */

	public void setData(ChecksheetDto dto){
		this.id = dto.getId();
		this.createdUser = dto.getCreatedUser();
		this.updatedUser = dto.getUpdatedUser();
		this.createdDate = dto.getCreatedDate();
		this.updatedDate = dto.getUpdatedDate();
		this.questionCode = dto.getQuestionCode();
		this.textArea1=dto.getTextArea1();
		this.textArea2=dto.getTextArea2();
		this.selectBox1=dto.getSelectBox1();
		this.selectBox2=dto.getSelectBox2();
		this.selectBox3=dto.getSelectBox3();
		this.radioButton=dto.getRadioButton();
		this.dealId = dto.getDealId();
		this.deal = new DealJson();
		this.deal.setId(dto.getDealId());
	}

	/**
	 * Create ChecksheetDto
	 *
	 * @return ChecksheetDto
	 */

	public ChecksheetDto getData(){
		ChecksheetDto dto = new ChecksheetDto();
		dto.setId(id);
		dto.setCreatedUser(createdUser);
		dto.setUpdatedUser(updatedUser);
		dto.setCreatedDate(createdDate);
		dto.setUpdatedDate(updatedDate);
		dto.setQuestionCode(questionCode);
		dto.setDealId(dealId);
		dto.setTextArea1(textArea1);
		dto.setTextArea2(textArea2);
		dto.setSelectBox1(selectBox1);
		dto.setSelectBox2(selectBox2);
		dto.setSelectBox3(selectBox3);
		dto.setRadioButton(radioButton);
		return dto;
	}
}
