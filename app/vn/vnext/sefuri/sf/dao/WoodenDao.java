package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dao.impl.WoodenDaoImpl;
import vn.vnext.sefuri.sf.dto.MstWoodenDto;

/**
 * Created by VuPT on 10/26/2016.
 */
@ImplementedBy(WoodenDaoImpl.class)
public interface WoodenDao extends GenericDao<MstWoodenDto> {
    MstWoodenDto getWoodenByWoodenCode(String woodenCode);
}
