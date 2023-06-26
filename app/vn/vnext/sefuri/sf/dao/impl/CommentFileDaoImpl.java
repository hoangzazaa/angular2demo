package vn.vnext.sefuri.sf.dao.impl;

import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.dao.CommentFileDao;
import vn.vnext.sefuri.sf.dto.CommentFileDto;

import java.util.List;

public class CommentFileDaoImpl extends GenericDaoImpl<CommentFileDto> implements CommentFileDao {
  public CommentFileDaoImpl() {
    super(CommentFileDto.class);
  }

  @Override
  public List<CommentFileDto> getCommentFileByCommentId(Integer commentId) {
    String query = "SELECT DISTINCT cf FROM CommentFileDto cf " + "WHERE cf.commentId=:commentId "
        + "ORDER BY cf.createdDate DESC";
    return JPA.em().createQuery(query, CommentFileDto.class).setParameter("commentId", commentId).getResultList();
  }

  @Override
  public CommentFileDto getCommentFile(final Integer commentId, final Integer fileId) {
    String query = "SELECT DISTINCT cf FROM CommentFileDto cf WHERE cf.commentId=:commentId AND cf.fileId=:fileId";
    return JPA.em().createQuery(query, CommentFileDto.class).setParameter("commentId", commentId).setParameter("fileId", fileId)
        .setMaxResults(1).getSingleResult();
  }
}
