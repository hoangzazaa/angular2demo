package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dao.impl.MstWindowDaoImpl;
import vn.vnext.sefuri.sf.dto.MstWindowDto;

import java.util.List;

/**
 * Created by VuPT on 10/27/2016.
 */
@ImplementedBy(MstWindowDaoImpl.class)
public interface MstWindowDao extends GenericDao<MstWindowDto> {

    /**
     * find All MstWindow
     *
     * @return list MstWindowDto
     */
    List<MstWindowDto> findAll();
}
