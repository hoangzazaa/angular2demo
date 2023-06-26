package vn.vnext.sefuri.sf.dao.impl;

import org.apache.commons.collections.CollectionUtils;
import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.dao.CommentDao;
import vn.vnext.sefuri.sf.dto.CommentDto;

import java.util.List;

public class CommentDaoImpl extends GenericDaoImpl<CommentDto> implements CommentDao {

    public CommentDaoImpl() {
        super(CommentDto.class);
    }

    @Override
    public List<CommentDto> getComments(Integer idx, Integer dealId) {
        String query = "SELECT c FROM CommentDto c WHERE c.dealId =:dealId ORDER BY c.id DESC";
        return JPA.em()
                .createQuery(query, CommentDto.class)
                .setParameter("dealId", dealId)
                .setFirstResult(idx)
                .setMaxResults(Constants.PAGE_SIZE_COMMENT)
                .getResultList();
    }

    @Override
    public int deleteAllDealComment(Integer dealId) {
        String query = "DELETE FROM  CommentDto c WHERE c.dealId = :dealId";
        return JPA.em()
                .createQuery(query)
                .setParameter("dealId", dealId)
                .executeUpdate();
    }

    @Override
    public Long getTotalCommentsByDealId(final Integer dealId) {
        return JPA.em()
                .createQuery("SELECT COUNT(c) FROM CommentDto c WHERE c.dealId =:dealId", Long.class)
                .setParameter("dealId", dealId)
                .getSingleResult();
    }

    @Override
    public CommentDto getLatestCommentByDealId(final Integer dealId) {
        String query = "SELECT c FROM CommentDto c WHERE c.dealId =:dealId ORDER BY c.updatedDate DESC";
        List<CommentDto> comments = JPA.em().createQuery(query, CommentDto.class).setParameter("dealId", dealId).setMaxResults(1).getResultList();
        if (CollectionUtils.isNotEmpty(comments))
            return comments.get(0);

        return null;
    }

}
