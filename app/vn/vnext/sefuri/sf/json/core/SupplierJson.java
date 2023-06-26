package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.dto.SupplierDto;

public class SupplierJson extends BaseJson<SupplierDto> {

    @JsonProperty("supplierCode")
    String supplierCode;

    @JsonProperty("name")
    String name;

    @JsonProperty("abbreviation")
    String abbreviation;

    @JsonProperty("postalCode")
    String postalCode;

    @JsonProperty("address1")
    String address1;

    @JsonProperty("address2")
    String address2;

    @JsonProperty("tel")
    String tel;

    @JsonProperty("fax")
    String fax;

    @JsonProperty("contactName")
    String contactName;

    @JsonProperty("memo1")
    String memo1;

    @JsonProperty("memo2")
    String memo2;

    @JsonProperty("memo")
    String memo;

    public String getSupplierCode() {
        return supplierCode;
    }

    public void setSupplierCode(String supplierCode) {
        this.supplierCode = supplierCode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAbbreviation() {
        return abbreviation;
    }

    public void setAbbreviation(String abbreviation) {
        this.abbreviation = abbreviation;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getAddress1() {
        return address1;
    }

    public void setAddress1(String address1) {
        this.address1 = address1;
    }

    public String getAddress2() {
        return address2;
    }

    public void setAddress2(String address2) {
        this.address2 = address2;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getFax() {
        return fax;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public String getContactName() {
        return contactName;
    }

    public void setContactName(String contactName) {
        this.contactName = contactName;
    }

    public String getMemo1() {
        return memo1;
    }

    public void setMemo1(String memo1) {
        this.memo1 = memo1;
    }

    public String getMemo2() {
        return memo2;
    }

    public void setMemo2(String memo2) {
        this.memo2 = memo2;
    }

    public String getMemo() {
        return memo;
    }

    public void setMemo(String memo) {
        this.memo = memo;
    }

    @Override
    public void setData(SupplierDto dto) {
        this.supplierCode = dto.getSupplierCode();
        this.name = dto.getName();
        this.abbreviation = dto.getAbbreviation();
        this.postalCode = dto.getPostalCode();
        this.address1 = dto.getAddress1();
        this.address2 = dto.getAddress2();
        this.tel = dto.getTel();
        this.fax = dto.getFax();
        this.contactName = dto.getContactName();
        this.memo1 = dto.getMemo1();
        this.memo2 = dto.getMemo2();
        this.memo = dto.getMemo();
    }

    @Override
    public SupplierDto getData() {
        SupplierDto dto = new SupplierDto();
        dto.setId(id);
        dto.setCreatedUser(createdUser);
        dto.setUpdatedUser(updatedUser);
        dto.setCreatedDate(createdDate);
        dto.setUpdatedDate(updatedDate);
        dto.setSupplierCode(supplierCode);
        dto.setName(name);
        dto.setAbbreviation(abbreviation);
        dto.setPostalCode(postalCode);
        dto.setAddress1(address1);
        dto.setAddress2(address2);
        dto.setTel(tel);
        dto.setFax(fax);
        dto.setContactName(contactName);
        dto.setMemo1(memo1);
        dto.setMemo2(memo2);
        dto.setMemo(memo);
        return dto;
    }
}
