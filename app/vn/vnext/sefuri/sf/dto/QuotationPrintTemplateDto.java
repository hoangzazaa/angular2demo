package vn.vnext.sefuri.sf.dto;

import javax.persistence.*;
import java.util.List;

/**
 * Contain quotation template to export PDF
 *
 * @author vupt
 */
@Entity
@Table(name = "sfr_sf_quotation_print_template")
public class QuotationPrintTemplateDto extends BaseDto {

    /* selectOption */
    private Integer selectOption;
    /* path */
    private String path;
    /* fileName */
    private String fileName;
    /* application */

    private String application;
    /* quotationRsQuotationTemplate */
    private List<QuotationDto> quotation;

    /**
     * Get selectOption
     *
     * @return selectOption
     */
    @Basic
    @Column(name = "select_option")
    public Integer getSelectOption() {
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
    @Basic
    @Column(name = "path")
    public String getPath() {
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
    @Basic
    @Column(name = "file_name")
    public String getFileName() {
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
    @Basic
    @Column(name = "application")
    public String getApplication() {
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
    @Transient
    public List<QuotationDto> getQuotation() {
        return quotation;
    }

    /**
     * Set quotation
     *
     * @param quotation List<QuotationDto>
     */
    public void setQuotation(List<QuotationDto> quotation) {
        this.quotation = quotation;
    }

}