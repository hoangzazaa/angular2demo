package vn.vnext.sefuri.sf.dto;

import javax.persistence.*;

/**
 * Contain information of file of comment
 *
 * @author 
 */
@Entity
@Table(name = "sfr_sf_comment_file")
public class CommentFileDto extends BaseDto {

  private Integer fileId;
  private String originalName;
  private Integer commentId;
  private String commentFileId;
  private String commentFileName;

  private CommentDto comment;
  private FileDto file;

  /**
   * Get fileId
   *
   * @return fileId
   */
  @Basic
  @Column(name = "file_id")
  public Integer getFileId() {
    return fileId;
  }

  /**
   * Set fileId
   *
   * @param fileId Integer
   */
  public void setFileId(Integer fileId) {
    this.fileId = fileId;
  }

  /**
   * Get originalName
   *
   * @return originalName
   */
  @Basic
  @Column(name = "original_name")
  public String getOriginalName() {
    return originalName;
  }

  /**
   * Set originalName
   *
   * @param originalName String
   */
  public void setOriginalName(String originalName) {
    this.originalName = originalName;
  }

  /**
   * Get commentId
   *
   * @return commentId
   */
  @Basic
  @Column(name = "comment_id")
  public Integer getCommentId() {
    return commentId;
  }

  /**
   * Set dealId
   *
   * @param commentId Integer
   */
  public void setCommentId(Integer commentId) {
    this.commentId = commentId;
  }

  /**
   * Get commentFileId
   *
   * @return commentFileId
   */
  @Basic
  @Column(name = "comment_file_id")
  public String getCommentFileId() {
    return commentFileId;
  }

  /**
   * Set commentFileId
   *
   * @param commentFileId String
   */
  public void setCommentFileId(String commentFileId) {
    this.commentFileId = commentFileId;
  }

  /**
   * Get commentFileName
   *
   * @return commentFileName
   */
  @Basic
  @Column(name = "comment_file_name")
  public String getCommentFileName() {
    return commentFileName;
  }

  /**
   * Set commentFileName
   *
   * @param commentFileName String
   */
  public void setCommentFileName(String commentFileName) {
    this.commentFileName = commentFileName;
  }

  /**
   * Get deal
   *
   * @return deal
   */
  @Transient
  public CommentDto getComment() {
    return comment;
  }

  /**
   * Set comment
   *
   * @param comment CommentDto
   */
  public void setDeal(CommentDto comment) {
    this.comment = comment;
  }

  /**
   * Get file
   *
   * @return file
   */
  @Transient
  public FileDto getFile() {
    return file;
  }

  /**
   * Set file
   *
   * @param file FileDto
   */
  public void setFile(FileDto file) {
    this.file = file;
  }

}