package vn.vnext.sefuri.sf.json.common;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.dto.CommentDto;

public class ActivityJson extends BaseJson<CommentDto> {
    @JsonProperty("value")
    private String value;

    @JsonProperty("userId")
    private Integer userId;

    @JsonProperty("dealId")
    private Integer dealId;

    @JsonProperty("username")
    private String username;

    @JsonProperty("departmentName")
    private String departmentName;

    public String getValue() {
        return value;
    }

    public void setValue(final String value) {
        this.value = value;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(final Integer userId) {
        this.userId = userId;
    }

    public Integer getDealId() {
        return dealId;
    }

    public void setDealId(final Integer dealId) {
        this.dealId = dealId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(final String username) {
        this.username = username;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(final String departmentName) {
        this.departmentName = departmentName;
    }

    @Override
    public CommentDto getModel() {
        return null;
    }

    @Override
    public void setModel(final CommentDto dto) {
        setData(dto);
        if (dto != null) {
            this.value = dto.getValue();
            this.userId = dto.getUserId();
            this.dealId = dto.getDealId();
        }
    }
}
