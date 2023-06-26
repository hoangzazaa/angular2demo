package vn.vnext.sefuri.sf.json.SF00301.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.dto.CommentDto;
import vn.vnext.sefuri.sf.json.common.BaseJson;
import java.util.List;

/**
 * Contain comments of user for each deal
 *
 * @author vupt
 */
public class SF00301_CommentJson extends BaseJson<CommentDto> {
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

    @JsonProperty("commentType")
    private Integer commentType;

    @JsonProperty("title")
    private String title;

    @JsonProperty("commentFiles")
    private List<SF00301_CommentFileJson> commentFiles;

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

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public Integer getCommentType() {
        return commentType;
    }

    public void setCommentType(Integer commentType) {
        this.commentType = commentType;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<SF00301_CommentFileJson> getCommentFiles() {
        return commentFiles;
    }

    public void setCommentFiles(List<SF00301_CommentFileJson> commentFiles) {
        this.commentFiles = commentFiles;
    }

    @Override
    public CommentDto getModel() {
        CommentDto dto = new CommentDto();
        dto.setId(this.id);
        dto.setValue(this.value);
        dto.setUserId(this.userId);
        dto.setDealId(this.dealId);
        dto.setCommentType(this.commentType);
        dto.setTitle(this.title);

        return dto;
    }

    @Override
    public void setModel(final CommentDto dto) {
        if (dto != null) {
            setData(dto);
            this.value = dto.getValue();
            this.userId = dto.getUserId();
            this.dealId = dto.getDealId();
            this.commentType = dto.getCommentType();
            this.title = dto.getTitle();
        }
    }
}
