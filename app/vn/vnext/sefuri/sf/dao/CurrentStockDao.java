package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dao.impl.CurrentStockDaoImpl;
import vn.vnext.sefuri.sf.dto.CurrentStockDto;

/**
 * Created by TungNT on 15/03/2017.
 */
@ImplementedBy(CurrentStockDaoImpl.class)
public interface CurrentStockDao extends GenericDao<CurrentStockDto> {
    CurrentStockDto getStockByDenoProductCode(String denoProductCode);
}
