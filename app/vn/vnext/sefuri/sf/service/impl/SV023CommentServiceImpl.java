package vn.vnext.sefuri.sf.service.impl;

import com.google.inject.Inject;
import vn.vnext.sefuri.sf.dao.CommentDao;
import vn.vnext.sefuri.sf.dto.CommentDto;
import vn.vnext.sefuri.sf.service.SV023CommentService;

import java.util.List;

public class SV023CommentServiceImpl implements SV023CommentService {

    @Inject
    private CommentDao commentDao;

    @Override
    public CommentDto createComment(CommentDto commentDto) {
        return commentDao.create(commentDto);
    }

    @Override
    public void deleteAllDealComment(Integer dealId) {
        commentDao.deleteAllDealComment(dealId);
    }

    @Override
    public List<CommentDto> getMoreComment(Integer dealId, Integer index) {
        return commentDao.getComments(dealId, index);
    }

    @Override
    public Long GetTotalCommentsByDealId(Integer dealId) {
        return commentDao.getTotalCommentsByDealId(dealId);
    }

    @Override
    public CommentDto getLatestCommentByDealId(Integer dealId) {
        return commentDao.getLatestCommentByDealId(dealId);
    }
}
