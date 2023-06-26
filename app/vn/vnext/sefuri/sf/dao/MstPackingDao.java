package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dao.impl.MstPackingDaoImpl;
import vn.vnext.sefuri.sf.dto.MstPackingDto;

import java.util.List;

/**
 * Created by VuPT on 10/27/2016.
 */
@ImplementedBy(MstPackingDaoImpl.class)
public interface MstPackingDao extends GenericDao<MstPackingDto> {

    /**
     * find All MstPackingDto
     *
     * @return List MstPackingDto
     */
    List<MstPackingDto> findAll();
}
