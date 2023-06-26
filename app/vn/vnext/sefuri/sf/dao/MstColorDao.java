package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dao.impl.MstColorDaoImpl;
import vn.vnext.sefuri.sf.dto.MstColorDto;

import java.util.List;

/**
 * Created by VuPT on 10/27/2016.
 */
@ImplementedBy(MstColorDaoImpl.class)
public interface MstColorDao extends GenericDao<MstColorDto> {

    /**
     * find All MstColorDto
     *
     * @return List MstColorDto
     */
    List<MstColorDto> findAll();
}
