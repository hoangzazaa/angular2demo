package vn.vnext.sefuri.sf.dao.impl;

import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.dao.MstSheetSizeDao;
import vn.vnext.sefuri.sf.dto.MstSheetSizeDto;

import java.math.BigDecimal;
import java.util.List;

/**
 * Created by TungNT on 2/8/2017.
 */
public class MstSheetSizeDaoImpl extends GenericDaoImpl<MstSheetSizeDto> implements MstSheetSizeDao {
    public MstSheetSizeDaoImpl() {
        super(MstSheetSizeDto.class);
    }

    @Override
    public List<MstSheetSizeDto> findAll() {
        return JPA.em().createQuery("select sheet From MstSheetSizeDto sheet ", MstSheetSizeDto.class)
                .getResultList();
    }

    @Override
    public List<MstSheetSizeDto> getPopularSheetSize() {
        return JPA.em().createQuery("select sheet From MstSheetSizeDto sheet " +
                "where sheet.paperId is null AND sheet.laminationId is null", MstSheetSizeDto.class)
                .getResultList();
    }

    @Override
    public List<MstSheetSizeDto> getSheetSizeByPaperId(Integer paperId) {
        return JPA.em().createQuery("SELECT dto FROM MstSheetSizeDto dto WHERE dto.paperId =:paperId ", MstSheetSizeDto.class)
                .setParameter("paperId", paperId)
                .getResultList();
    }

    @Override
    public Integer getWidthCondition(BigDecimal width) {
        List<BigDecimal> results = JPA.em().createQuery("SELECT DISTINCT ss.width from MstSheetSizeDto ss " +
                " INNER JOIN MstLaminationDto l ON l.id = ss.laminationId " +
                " WHERE ss.width >=:width " +
                " ORDER BY  ss.width ASC", BigDecimal.class)
                .setParameter("width", width)
                .getResultList();
        if (results.size() > 0) {
            BigDecimal result = results.get(0);
            return Integer.parseInt(result.setScale(0).toString());
        }
        return null;
    }

    @Override
    public List<MstSheetSizeDto> findSheetSizeByPaperIdAndSize(Integer paperId, BigDecimal width, BigDecimal height) {
        return JPA.em().createQuery("SELECT u FROM MstSheetSizeDto u WHERE u.paperId =:paperId AND u.width = :width AND u.height = :height", MstSheetSizeDto.class)
                .setParameter("paperId", paperId)
                .setParameter("width", width)
                .setParameter("height", height)
                .getResultList();
    }

    @Override
    public List<MstSheetSizeDto> findSheetSizeByLaminationAndSize(Integer laminationId, BigDecimal width) {
        return JPA.em().createQuery("SELECT u FROM MstSheetSizeDto u WHERE u.laminationId =:laminationId AND u.width = :width", MstSheetSizeDto.class)
                .setParameter("laminationId", laminationId)
                .setParameter("width", width)
                .getResultList();
    }

    @Override
    public List<MstSheetSizeDto> getSheetSizeByLaminationId(Integer laminationId) {
        return JPA.em().createQuery("SELECT dto FROM MstSheetSizeDto dto WHERE dto.laminationId =:laminationId ", MstSheetSizeDto.class)
                .setParameter("laminationId", laminationId)
                .getResultList();
    }

    @Override
    public List<MstSheetSizeDto> getSheetSizeByLaminationTypeAndWeight(Integer laminationType, BigDecimal weight) {
        return JPA.em().createQuery("SELECT dto FROM MstSheetSizeDto dto,MstLaminationDto d WHERE dto.laminationId = d.id AND d.paperId = :laminationType AND d.weight = :weight", MstSheetSizeDto.class)
                .setParameter("laminationType", laminationType)
                .setParameter("weight", weight)
                .getResultList();
    }
}
