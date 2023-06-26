package vn.vnext.sefuri.sf.dao.impl;

import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.dao.WoodenDao;
import vn.vnext.sefuri.sf.dto.MstWoodenDto;
import vn.vnext.sefuri.sf.util.CollectionUtil;

import java.util.List;

/**
 * Created by DELL-VOSTRO on 1/3/2017.
 */
public class WoodenDaoImpl extends GenericDaoImpl<MstWoodenDto> implements WoodenDao {
    public WoodenDaoImpl() {
        super(MstWoodenDto.class);
    }

    @Override
    public MstWoodenDto getWoodenByWoodenCode(String woodenCode) {
        List<MstWoodenDto> mstWoodenDtos = JPA.em()
                .createQuery("SELECT wooden FROM MstWoodenDto wooden " +
                        "WHERE wooden.woodenCode=:woodenCode")
                .setParameter("woodenCode", woodenCode)
                .getResultList();
        if (CollectionUtil.isNotEmpty(mstWoodenDtos)) {
            return mstWoodenDtos.get(0);
        }
        return null;
    }

}
