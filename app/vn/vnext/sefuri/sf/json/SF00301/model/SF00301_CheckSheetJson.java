package vn.vnext.sefuri.sf.json.SF00301.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.dto.ChecksheetDto;
import vn.vnext.sefuri.sf.json.common.BaseJson;

/**
 * Contain checklist for a deal
 *
 * @author vupt
 */
public class SF00301_CheckSheetJson extends BaseJson<ChecksheetDto> {
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

    @JsonProperty("checkBox1")
    private Integer checkBox1;

    @JsonProperty("checkBox2")
    private Integer checkBox2;

    @JsonProperty("checkBox3")
    private Integer checkBox3;
    /* dealId */
    @JsonProperty("dealId")
    private Integer dealId;


    public Integer getQuestionCode() {
        return questionCode;
    }

    public void setQuestionCode(final Integer questionCode) {
        this.questionCode = questionCode;
    }

    public String getTextArea1() {
        return textArea1;
    }

    public void setTextArea1(final String textArea1) {
        this.textArea1 = textArea1;
    }

    public String getTextArea2() {
        return textArea2;
    }

    public void setTextArea2(final String textArea2) {
        this.textArea2 = textArea2;
    }

    public Integer getRadioButton() {
        return radioButton;
    }

    public void setRadioButton(final Integer radioButton) {
        this.radioButton = radioButton;
    }

    public Integer getSelectBox1() {
        return selectBox1;
    }

    public void setSelectBox1(final Integer selectBox1) {
        this.selectBox1 = selectBox1;
    }

    public Integer getSelectBox2() {
        return selectBox2;
    }

    public void setSelectBox2(final Integer selectBox2) {
        this.selectBox2 = selectBox2;
    }

    public Integer getSelectBox3() {
        return selectBox3;
    }

    public void setSelectBox3(final Integer selectBox3) {
        this.selectBox3 = selectBox3;
    }

    public Integer getDealId() {
        return dealId;
    }

    public void setDealId(final Integer dealId) {
        this.dealId = dealId;
    }

    public Integer getCheckBox1() {
        return checkBox1;
    }

    public void setCheckBox1(Integer checkBox1) {
        this.checkBox1 = checkBox1;
    }

    public Integer getCheckBox2() {
        return checkBox2;
    }

    public void setCheckBox2(Integer checkBox2) {
        this.checkBox2 = checkBox2;
    }

    public Integer getCheckBox3() {
        return checkBox3;
    }

    public void setCheckBox3(Integer checkBox3) {
        this.checkBox3 = checkBox3;
    }

    @Override
    public ChecksheetDto getModel() {
        ChecksheetDto dto = new ChecksheetDto();
        dto.setRadioButton(this.radioButton);
        dto.setTextArea1(this.textArea1);
        dto.setTextArea2(this.textArea2);
        dto.setSelectBox1(this.selectBox1);
        dto.setSelectBox2(this.selectBox2);
        dto.setSelectBox3(this.selectBox3);
        dto.setCheckBox1(this.checkBox1);
        dto.setCheckBox2(this.checkBox2);
        dto.setCheckBox3(this.checkBox3);
        dto.setDealId(this.dealId);
        return dto;
    }

    @Override
    public void setModel(final ChecksheetDto dto) {
        if (dto != null) {
            setData(dto);
            this.questionCode = dto.getQuestionCode();
            this.textArea1 = dto.getTextArea1();
            this.textArea2 = dto.getTextArea2();
            this.selectBox1 = dto.getSelectBox1();
            this.selectBox2 = dto.getSelectBox2();
            this.selectBox3 = dto.getSelectBox3();
            this.checkBox1 = dto.getCheckBox1();
            this.checkBox2 = dto.getCheckBox2();
            this.checkBox3 = dto.getCheckBox3();
            this.radioButton = dto.getRadioButton();
            this.dealId = dto.getDealId();
        }
    }
}
