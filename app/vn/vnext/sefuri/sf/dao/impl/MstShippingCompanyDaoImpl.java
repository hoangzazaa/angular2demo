package vn.vnext.sefuri.sf.dao.impl;

import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.dao.MstShippingCompanyDao;
import vn.vnext.sefuri.sf.dto.MstShippingCompanyDto;

import java.util.List;

/**
 * Created by DungTQ on 1/5/2017.
 */
public class MstShippingCompanyDaoImpl extends GenericDaoImpl<MstShippingCompanyDto> implements MstShippingCompanyDao {
    public MstShippingCompanyDaoImpl() {
        super(MstShippingCompanyDto.class);
    }

    @Override
    public List<MstShippingCompanyDto> findAll() {
        return JPA.em().createQuery("SELECT mstShipping FROM MstShippingCompanyDto mstShipping",
                MstShippingCompanyDto.class)
                .getResultList();
    }
}
