package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dao.impl.MstShapeDaoImpl;
import vn.vnext.sefuri.sf.dto.MstShapeDto;

import java.util.List;

/**
 * Created by TungNT on 2/8/2017.
 */
@ImplementedBy(MstShapeDaoImpl.class)
public interface MstShapeDao extends GenericDao<MstShapeDto> {
    List<MstShapeDto> getAllMstShape();

}
