package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dao.impl.CommentDaoImpl;
import vn.vnext.sefuri.sf.dto.CommentDto;

import java.util.List;

@ImplementedBy(CommentDaoImpl.class)
public interface CommentDao extends GenericDao<CommentDto> {

    List<CommentDto> getComments(Integer index, Integer dealId);

    int deleteAllDealComment(Integer dealId);

    Long getTotalCommentsByDealId(Integer dealId);

    CommentDto getLatestCommentByDealId(Integer dealId);
}
