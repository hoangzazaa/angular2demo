package vn.vnext.sefuri.sf.json.SF00301.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.dto.CustomerDto;
import vn.vnext.sefuri.sf.json.common.BaseJson;

public class SF00301_CustomerJson extends BaseJson<CustomerDto> {
    @JsonProperty("customerName")
    private String customerName;

    @JsonProperty("customerCode")
    private String customerCode;

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(final String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerCode() {
        return customerCode;
    }

    public void setCustomerCode(final String customerCode) {
        this.customerCode = customerCode;
    }

    @Override
    public CustomerDto getModel() {
        CustomerDto customerDto = new CustomerDto();
        customerDto.setId(id);
        customerDto.setCreatedDate(createdDate);
        customerDto.setUpdatedDate(updatedDate);
        customerDto.setCustomerCode(customerCode);
        customerDto.setName(customerName);
        return customerDto;
    }

    @Override
    public void setModel(final CustomerDto dto) {
        if (dto != null) {
            setData(dto);
            this.customerName = dto.getName();
            this.customerCode = dto.getCustomerCode();
        }
    }

}
