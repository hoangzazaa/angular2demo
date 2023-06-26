package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dao.impl.MstDecorativeDaoImpl;
import vn.vnext.sefuri.sf.dto.MstDecorativeDto;

import java.util.List;

/**
 * Created by admin on 3/18/2017.
 */
@ImplementedBy(MstDecorativeDaoImpl.class)
public interface MstDecorativeDao extends GenericDao<MstDecorativeDto>  {
    /**
     * find All MstColorDto
     *
     * @return List MstColorDto
     */
    List<MstDecorativeDto> findAll();
}
