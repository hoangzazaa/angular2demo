package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dao.impl.BalanceOfStockDaoImpl;
import vn.vnext.sefuri.sf.dto.BalanceOfStockDto;

/**
 * Created by TungNT on 3/6/2017.
 */
@ImplementedBy(BalanceOfStockDaoImpl.class)
public interface BalanceOfStockDao extends GenericDao<BalanceOfStockDto> {
}
