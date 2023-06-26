package vn.vnext.sefuri.sf.json.SF00301.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.dto.CommentFileDto;
import vn.vnext.sefuri.sf.json.common.BaseJson;

/**
 * Contain information of file of comment
 *
 * @author vupt
 */
public class SF00301_CommentFileJson extends BaseJson<CommentFileDto> {
    //fileId
    @JsonProperty("fileId")
    private Integer fileId;

    @JsonProperty("originalName")
    private String originalName;

    @JsonProperty("commentId")
    private Integer commentId;


    public Integer getFileId() {
        return fileId;
    }

    public void setFileId(final Integer fileId) {
        this.fileId = fileId;
    }

    public String getOriginalName() {
      return originalName;
    }

    public void setOriginalName(final String originalName) {
      this.originalName = originalName;
    }

    public Integer getCommentId() {
      return commentId;
    }

    public void setCommentId(final Integer commentId) {
      this.commentId = commentId;
    }


    @Override
    public CommentFileDto getModel() {
        return null;
    }

    @Override
    public void setModel(final CommentFileDto dto) {
        if (dto != null) {
            setData(dto);

            this.fileId = dto.getFileId();
            this.originalName = dto.getOriginalName();
            this.commentId = dto.getCommentId();
        }
    }
}
