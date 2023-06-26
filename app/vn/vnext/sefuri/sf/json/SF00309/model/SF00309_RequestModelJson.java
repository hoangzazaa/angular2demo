package vn.vnext.sefuri.sf.json.SF00309.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.collect.Lists;
import org.joda.time.DateTime;

import java.io.Serializable;
import java.util.List;

public class SF00309_RequestModelJson implements Serializable {
    /*一次包装区分*/
    @JsonProperty("packagingClassification")
    private String packagingClassification;

    /*内包物*/
    @JsonProperty("inclusion")
    private String inclusion;

    /*内包物*/
    @JsonProperty("inclusionText")
    private String inclusionText;

    /*その他*/
    @JsonProperty("other")
    private String other;

    /*末端ユーザ*/
    @JsonProperty("endUser")
    private String endUser;

    /*保存方法*/
    @JsonProperty("preservationMethod")
    private String preservationMethod;

    /*流通範囲*/
    @JsonProperty("distributionRange")
    private String distributionRange;

    /*内包物重量*/
    @JsonProperty("includedCount")
    private Integer includedCount;

    /*年間販売個数予測*/
    @JsonProperty("includedWeightPerUnit")
    private Integer includedWeightPerUnit;

    @JsonProperty("salesEstimate")
    private String salesEstimate;

    /*接触状態*/
    @JsonProperty("contactState")
    private String contactState;

    /*材料*/
    @JsonProperty("material")
    private String material;

    /*材料*/
    @JsonProperty("materialOther")
    private String materialOther;

    /*充填方法*/
    @JsonProperty("fillingMethod")
    private String fillingMethod;

    /*材料（その他）*/
    /*同時依頼*/
    @JsonProperty("simultaneousRequest")
    private List<String> simultaneousRequest = Lists.newArrayList();

    /*納期*/
    @JsonProperty("deliveryDate")
    private DateTime deliveryDate;

    /*希望|指定*/
    /*希望数*/
    @JsonProperty("desired")
    private String desired;

    /*希望|指定*/
    /*希望数*/
    @JsonProperty("desiredNumber")
    private Integer desiredNumber;

    /*メモ*/
    @JsonProperty("memo")
    private String memo;

    /*直送先*/
    @JsonProperty("directDestination")
    private String directDestination;

    public String getPackagingClassification() {
        return packagingClassification;
    }

    public void setPackagingClassification(String packagingClassification) {
        this.packagingClassification = packagingClassification;
    }

    public String getInclusion() {
        return inclusion;
    }

    public void setInclusion(String inclusion) {
        this.inclusion = inclusion;
    }

    public String getInclusionText() {
        return inclusionText;
    }

    public void setInclusionText(String inclusionText) {
        this.inclusionText = inclusionText;
    }

    public String getOther() {
        return other;
    }

    public void setOther(String other) {
        this.other = other;
    }

    public String getEndUser() {
        return endUser;
    }

    public void setEndUser(String endUser) {
        this.endUser = endUser;
    }

    public String getPreservationMethod() {
        return preservationMethod;
    }

    public void setPreservationMethod(String preservationMethod) {
        this.preservationMethod = preservationMethod;
    }

    public String getDistributionRange() {
        return distributionRange;
    }

    public void setDistributionRange(String distributionRange) {
        this.distributionRange = distributionRange;
    }

    public Integer getIncludedCount() {
        return includedCount;
    }

    public void setIncludedCount(Integer includedCount) {
        this.includedCount = includedCount;
    }

    public Integer getIncludedWeightPerUnit() {
        return includedWeightPerUnit;
    }

    public void setIncludedWeightPerUnit(Integer includedWeightPerUnit) {
        this.includedWeightPerUnit = includedWeightPerUnit;
    }

    public String getSalesEstimate() {
        return salesEstimate;
    }

    public void setSalesEstimate(String salesEstimate) {
        this.salesEstimate = salesEstimate;
    }

    public String getContactState() {
        return contactState;
    }

    public void setContactState(String contactState) {
        this.contactState = contactState;
    }

    public String getMaterial() {
        return material;
    }

    public void setMaterial(String material) {
        this.material = material;
    }

    public String getMaterialOther() {
        return materialOther;
    }

    public void setMaterialOther(String materialOther) {
        this.materialOther = materialOther;
    }

    public String getFillingMethod() {
        return fillingMethod;
    }

    public void setFillingMethod(String fillingMethod) {
        this.fillingMethod = fillingMethod;
    }

    public List<String> getSimultaneousRequest() {
        return simultaneousRequest;
    }

    public void setSimultaneousRequest(List<String> simultaneousRequest) {
        this.simultaneousRequest = simultaneousRequest;
    }

    public DateTime getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(DateTime deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    public String getDesired() {
        return desired;
    }

    public void setDesired(String desired) {
        this.desired = desired;
    }

    public Integer getDesiredNumber() {
        return desiredNumber;
    }

    public void setDesiredNumber(Integer desiredNumber) {
        this.desiredNumber = desiredNumber;
    }

    public String getMemo() {
        return memo;
    }

    public void setMemo(String memo) {
        this.memo = memo;
    }

    public String getDirectDestination() {
        return directDestination;
    }

    public void setDirectDestination(String directDestination) {
        this.directDestination = directDestination;
    }
}
