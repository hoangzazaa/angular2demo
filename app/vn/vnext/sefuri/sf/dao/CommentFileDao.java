package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dao.impl.CommentFileDaoImpl;
import vn.vnext.sefuri.sf.dto.CommentFileDto;
import java.util.List;

@ImplementedBy(CommentFileDaoImpl.class)
public interface CommentFileDao extends GenericDao<CommentFileDto> {
  /**
   * get DealFile by dealId
   *
   * @param dealId
   * @return List DealFileDto
   */
  List<CommentFileDto> getCommentFileByCommentId(Integer commentId);

  CommentFileDto getCommentFile(Integer commentId, Integer fileId);
}