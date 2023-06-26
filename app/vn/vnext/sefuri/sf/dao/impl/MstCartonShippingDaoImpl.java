package vn.vnext.sefuri.sf.dao.impl;

import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.dao.GenericDao;
import vn.vnext.sefuri.sf.dao.MstCartonShippingDao;
import vn.vnext.sefuri.sf.dto.MstCartonDto;
import vn.vnext.sefuri.sf.dto.MstCartonShippingDto;

import java.util.List;

/**
 * Created by VuPT on 5/11/2017.
 */
public class MstCartonShippingDaoImpl extends GenericDaoImpl<MstCartonShippingDto> implements MstCartonShippingDao{
    public MstCartonShippingDaoImpl(){
        super(MstCartonShippingDto.class);
    }

    @Override
    public List<MstCartonShippingDto> findAll() {
        return JPA.em().createQuery("SELECT mstCarton FROM MstCartonShippingDto mstCarton", MstCartonShippingDto.class)
                .getResultList();
    }
}
