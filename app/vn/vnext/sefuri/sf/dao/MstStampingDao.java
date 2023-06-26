package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dao.impl.MstStampingDaoImpl;
import vn.vnext.sefuri.sf.dto.MstStampingDto;

import java.util.List;

/**
 * Created by VuPT on 10/27/2016.
 */
@ImplementedBy(MstStampingDaoImpl.class)
public interface MstStampingDao extends GenericDao<MstStampingDto> {
    /**
     * find All MstStampingDto
     *
     * @return list MstStampingDto
     */
    List<MstStampingDto> findAll();
}
