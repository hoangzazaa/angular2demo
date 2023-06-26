package vn.vnext.sefuri.sf.dao.impl;

import vn.vnext.sefuri.sf.dao.BalanceOfStockDao;
import vn.vnext.sefuri.sf.dto.BalanceOfStockDto;

/**
 * Created by TungNT on 3/6/2017.
 */
public class BalanceOfStockDaoImpl extends GenericDaoImpl<BalanceOfStockDto> implements BalanceOfStockDao {
    public BalanceOfStockDaoImpl() {
        super(BalanceOfStockDto.class);
    }
}
