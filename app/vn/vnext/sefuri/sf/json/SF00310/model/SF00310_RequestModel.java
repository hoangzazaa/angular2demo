package vn.vnext.sefuri.sf.json.SF00310.model;

import com.auth0.jwt.internal.com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;

public class SF00310_RequestModel {
    @JsonProperty("rank")
    private String rank;

    @JsonProperty("target")
    private String target;

    @JsonProperty("rse")
    private String rse;

    @JsonProperty("department")
    private String department;

    @JsonProperty("designConcept")
    private String designConcept;

    @JsonProperty("methodStereoscopicDummy")
    private String methodStereoscopicDummy;

    @JsonProperty("flatOutput")
    private String flatOutput;

    @JsonProperty("desiredDeliveryDate")
    private DateTime desiredDeliveryDate;

    @JsonProperty("submissionDeadline")
    private DateTime submissionDeadline;

    @JsonProperty("memo")
    private String memo;

    public String getRank() {
        return rank;
    }

    public void setRank(String rank) {
        this.rank = rank;
    }

    public String getTarget() {
        return target;
    }

    public void setTarget(String target) {
        this.target = target;
    }

    public String getRse() {
        return rse;
    }

    public void setRse(String rse) {
        this.rse = rse;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getDesignConcept() {
        return designConcept;
    }

    public void setDesignConcept(String designConcept) {
        this.designConcept = designConcept;
    }

    public String getMethodStereoscopicDummy() {
        return methodStereoscopicDummy;
    }

    public void setMethodStereoscopicDummy(String methodStereoscopicDummy) {
        this.methodStereoscopicDummy = methodStereoscopicDummy;
    }

    public String getFlatOutput() {
        return flatOutput;
    }

    public void setFlatOutput(String flatOutput) {
        this.flatOutput = flatOutput;
    }

    public DateTime getDesiredDeliveryDate() {
        return desiredDeliveryDate;
    }

    public void setDesiredDeliveryDate(DateTime desiredDeliveryDate) {
        this.desiredDeliveryDate = desiredDeliveryDate;
    }

    public DateTime getSubmissionDeadline() {
        return submissionDeadline;
    }

    public void setSubmissionDeadline(DateTime submissionDeadline) {
        this.submissionDeadline = submissionDeadline;
    }

    public String getMemo() {
        return memo;
    }

    public void setMemo(String memo) {
        this.memo = memo;
    }

}
