package vn.vnext.sefuri.sf.dto;

import javax.persistence.*;

import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.dto.BaseDto;

import java.util.List;
import java.math.BigDecimal;

import vn.vnext.sefuri.sf.dto.DealDto;

/**
 * Contain checklist for a deal
 *
 * @author vupt
 */
@Entity
@Table(name = "sfr_sf_checksheet")
public class ChecksheetDto extends BaseDto {

    /* questionCode */
    private Integer questionCode;

    private String textArea1;

    private String textArea2;

    private Integer radioButton;

    private Integer selectBox1;

    private Integer selectBox2;

    private Integer selectBox3;

    private Integer checkBox1;

    private Integer checkBox2;

    private Integer checkBox3;

    /* dealId */
    private Integer dealId;
    /* answerText */

    private DealDto deal;

    @Basic
    @Column(name = "textarea1")
    public String getTextArea1() {
        return textArea1;
    }

    public void setTextArea1(String textArea1) {
        this.textArea1 = textArea1;
    }

    @Basic
    @Column(name = "textarea2")
    public String getTextArea2() {
        return textArea2;
    }

    public void setTextArea2(String textArea2) {
        this.textArea2 = textArea2;
    }

    @Basic
    @Column(name = "radiobutton")
    public Integer getRadioButton() {
        return radioButton;
    }

    public void setRadioButton(Integer radioButton) {
        this.radioButton = radioButton;
    }

    @Basic
    @Column(name = "selectbox1")
    public Integer getSelectBox1() {
        return selectBox1;
    }

    public void setSelectBox1(Integer selectBox1) {
        this.selectBox1 = selectBox1;
    }

    @Basic
    @Column(name = "selectbox2")
    public Integer getSelectBox2() {
        return selectBox2;
    }

    public void setSelectBox2(Integer selectBox2) {
        this.selectBox2 = selectBox2;
    }

    @Basic
    @Column(name = "selectbox3")
    public Integer getSelectBox3() {
        return selectBox3;
    }

    public void setSelectBox3(Integer selectBox3) {
        this.selectBox3 = selectBox3;
    }

    /**
     * Get questionCode
     *
     * @return questionCode
     */
    @Basic
    @Column(name = "question_code")
    public Integer getQuestionCode() {
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

    @Basic
    @Column(name = "checkbox1")
    public Integer getCheckBox1() {
        return checkBox1;
    }

    public void setCheckBox1(Integer checkBox1) {
        this.checkBox1 = checkBox1;
    }

    @Basic
    @Column(name = "checkbox2")
    public Integer getCheckBox2() {
        return checkBox2;
    }

    public void setCheckBox2(Integer checkBox2) {
        this.checkBox2 = checkBox2;
    }

    @Basic
    @Column(name = "checkbox3")
    public Integer getCheckBox3() {
        return checkBox3;
    }

    public void setCheckBox3(Integer checkBox3) {
        this.checkBox3 = checkBox3;
    }
}