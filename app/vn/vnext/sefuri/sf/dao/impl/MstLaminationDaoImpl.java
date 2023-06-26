package vn.vnext.sefuri.sf.dao.impl;

import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.dao.MstLaminationDao;
import vn.vnext.sefuri.sf.dto.MstLaminationDto;

import java.util.List;

/**
 * Created by VuPT on 5/11/2017.
 */
public class MstLaminationDaoImpl extends GenericDaoImpl<MstLaminationDto> implements MstLaminationDao {
    public MstLaminationDaoImpl() {
        super(MstLaminationDto.class);
    }

    @Override
    public List<MstLaminationDto> findAll() {
        return JPA.em().createQuery("SELECT mstLamination FROM MstLaminationDto mstLamination", MstLaminationDto.class)
                .getResultList();
    }

    @Override
    public MstLaminationDto getLaminationByPaperId(Integer paperId) {
        return JPA.em().createQuery("SELECT mstLamination FROM MstLaminationDto mstLamination WHERE mstLamination.paperId = :paperId", MstLaminationDto.class)
                .setParameter("paperId", paperId).getSingleResult();
    }
}
