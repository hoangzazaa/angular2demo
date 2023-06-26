package vn.vnext.sefuri.sf.dao.impl;

import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.dao.MstSurfaceTreatmentDao;
import vn.vnext.sefuri.sf.dto.MstSurfaceTreatmentDto;

import java.util.List;

/**
 * Created by VuPT on 10/27/2016.
 */
public class MstSurfaceTreatmentDaoImpl extends GenericDaoImpl<MstSurfaceTreatmentDto> implements
        MstSurfaceTreatmentDao {
    public MstSurfaceTreatmentDaoImpl() {
        super(MstSurfaceTreatmentDto.class);
    }

    public List<MstSurfaceTreatmentDto> findAll() {
        return JPA.em().createQuery("SELECT mstSurfaceTreatment FROM MstSurfaceTreatmentDto mstSurfaceTreatment",
                MstSurfaceTreatmentDto.class)
                .getResultList();
    }
}
