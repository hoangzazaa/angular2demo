package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dao.impl.MstDieCuttingDaoImpl;
import vn.vnext.sefuri.sf.dto.MstDieCuttingDto;

import java.util.List;

/**
 * Created by VuPT on 10/27/2016.
 */
@ImplementedBy(MstDieCuttingDaoImpl.class)
public interface MstDieCuttingDao extends GenericDao<MstDieCuttingDto> {
    /**
     * find All MstDieCuttingDto
     *
     * @return List MstDieCuttingDto
     */
    List<MstDieCuttingDto> findAll();
}
