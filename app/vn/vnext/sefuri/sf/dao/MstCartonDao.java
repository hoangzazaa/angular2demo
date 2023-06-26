package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dao.impl.MstCartonDaoImpl;
import vn.vnext.sefuri.sf.dto.MstCartonDto;

import java.util.List;

/**
 * Created by VuPT on 5/11/2017.
 */
@ImplementedBy(MstCartonDaoImpl.class)
public interface MstCartonDao extends GenericDao<MstCartonDto> {

    List<MstCartonDto> findAll();
}
