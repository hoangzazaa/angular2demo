package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dao.impl.MstSheetSizeDaoImpl;
import vn.vnext.sefuri.sf.dto.MstSheetSizeDto;

import java.math.BigDecimal;
import java.util.List;

/**
 * Created by TungNT on 2/8/2017.
 */
@ImplementedBy(MstSheetSizeDaoImpl.class)
public interface MstSheetSizeDao extends GenericDao<MstSheetSizeDto> {

    List<MstSheetSizeDto> findAll();

    List<MstSheetSizeDto> getPopularSheetSize();

    List<MstSheetSizeDto> getSheetSizeByPaperId(Integer paperId);

    Integer getWidthCondition(BigDecimal width);

    List<MstSheetSizeDto> findSheetSizeByPaperIdAndSize(Integer paperId,BigDecimal width,BigDecimal height);

    List<MstSheetSizeDto> findSheetSizeByLaminationAndSize(Integer laminationId,BigDecimal width);

    List<MstSheetSizeDto> getSheetSizeByLaminationId(Integer laminationId);

    List<MstSheetSizeDto> getSheetSizeByLaminationTypeAndWeight(Integer laminationType, BigDecimal weight);

}
