package vn.vnext.sefuri.sf.json.common;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.dto.ChecksheetDto;

/**
 * Basic checksheet info.
 *
 * @author manhnv
 */
public abstract class CheckSheetInfoJson extends BaseJson<ChecksheetDto> {
    /* questionCode */
    @JsonProperty("questionCode")
    protected Integer questionCode;

    @JsonProperty("textArea1")
    protected String textArea1;

    @JsonProperty("textArea2")
    protected String textArea2;

    @JsonProperty("radioButton")
    protected Integer radioButton;

    @JsonProperty("selectBox1")
    protected Integer selectBox1;

    @JsonProperty("selectBox2")
    protected Integer selectBox2;

    @JsonProperty("selectBox3")
    protected Integer selectBox3;

    @JsonProperty("checkBox1")
    protected Integer checkBox1;

    @JsonProperty("checkBox2")
    protected Integer checkBox2;

    @JsonProperty("checkBox3")
    protected Integer checkBox3;

    @JsonProperty("dealId")
    protected Integer dealId;

    public Integer getQuestionCode() {
        return questionCode;
    }

    public void setQuestionCode(Integer questionCode) {
        this.questionCode = questionCode;
    }

    public String getTextArea1() {
        return textArea1;
    }

    public void setTextArea1(String textArea1) {
        this.textArea1 = textArea1;
    }

    public String getTextArea2() {
        return textArea2;
    }

    public void setTextArea2(String textArea2) {
        this.textArea2 = textArea2;
    }

    public Integer getRadioButton() {
        return radioButton;
    }

    public void setRadioButton(Integer radioButton) {
        this.radioButton = radioButton;
    }

    public Integer getSelectBox1() {
        return selectBox1;
    }

    public void setSelectBox1(Integer selectBox1) {
        this.selectBox1 = selectBox1;
    }

    public Integer getSelectBox2() {
        return selectBox2;
    }

    public void setSelectBox2(Integer selectBox2) {
        this.selectBox2 = selectBox2;
    }

    public Integer getSelectBox3() {
        return selectBox3;
    }

    public void setSelectBox3(Integer selectBox3) {
        this.selectBox3 = selectBox3;
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

    public Integer getDealId() {
        return dealId;
    }

    public void setDealId(Integer dealId) {
        this.dealId = dealId;
    }

    @Override
    public ChecksheetDto getModel() {
        return null;
    }

    @Override
    public void setModel(ChecksheetDto checksheetDto) {
    }

}
