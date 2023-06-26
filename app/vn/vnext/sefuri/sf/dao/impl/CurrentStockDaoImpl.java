package vn.vnext.sefuri.sf.dao.impl;

import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.dao.CurrentStockDao;
import vn.vnext.sefuri.sf.dto.CurrentStockDto;
import vn.vnext.sefuri.sf.util.CollectionUtil;

import java.util.List;

/**
 * Created by TungNT on 15/03/2017.
 */
public class CurrentStockDaoImpl extends GenericDaoImpl<CurrentStockDto> implements CurrentStockDao {
    public CurrentStockDaoImpl() {
        super(CurrentStockDto.class);
    }

    @Override
    public CurrentStockDto getStockByDenoProductCode(String denoProductCode) {
        List<CurrentStockDto> currentStockDtos = JPA.em().createQuery("SELECT stock From CurrentStockDto stock WHERE stock.dennoProductCode=:denoProductCode", CurrentStockDto.class)
                .setParameter("denoProductCode", denoProductCode)
                .getResultList();
        if (CollectionUtil.isNotEmpty(currentStockDtos)) {
            return currentStockDtos.get(0);
        }
        return null;
    }
}

