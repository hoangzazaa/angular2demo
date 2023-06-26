package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dao.impl.MstSurfaceTreatmentDaoImpl;
import vn.vnext.sefuri.sf.dto.MstSurfaceTreatmentDto;

import java.util.List;

/**
 * Created by VuPT on 10/27/2016.
 */
@ImplementedBy(MstSurfaceTreatmentDaoImpl.class)
public interface MstSurfaceTreatmentDao extends GenericDao<MstSurfaceTreatmentDto> {
    /**
     * find All MstSurfaceTreatmentDto
     *
     * @return list MstSurfaceTreatmentDto
     */
    List<MstSurfaceTreatmentDto> findAll();
}
