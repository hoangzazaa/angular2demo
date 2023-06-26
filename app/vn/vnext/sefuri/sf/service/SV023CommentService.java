package vn.vnext.sefuri.sf.service;

import com.google.inject.ImplementedBy;
import com.google.inject.Inject;
import vn.vnext.sefuri.sf.dao.CommentDao;
import vn.vnext.sefuri.sf.dto.CommentDto;
import vn.vnext.sefuri.sf.service.impl.SV023CommentServiceImpl;

import java.util.List;

@ImplementedBy(SV023CommentServiceImpl.class)
public interface SV023CommentService {

    CommentDto createComment(CommentDto commentDto);

    void deleteAllDealComment(Integer dealId);

    List<CommentDto> getMoreComment(Integer dealId, Integer index);

    Long GetTotalCommentsByDealId(Integer dealId);

    CommentDto getLatestCommentByDealId(Integer dealId);
}
