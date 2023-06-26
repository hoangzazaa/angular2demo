package vn.vnext.sefuri.sf.dao.impl;

import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.dao.MstCartonDao;
import vn.vnext.sefuri.sf.dto.MstCartonDto;

import java.util.List;

/**
 * Created by VuPT on 5/11/2017.
 */
public class MstCartonDaoImpl extends GenericDaoImpl<MstCartonDto> implements MstCartonDao {
    public MstCartonDaoImpl() {
        super(MstCartonDto.class);
    }

    @Override
    public List<MstCartonDto> findAll() {
        return JPA.em().createQuery("SELECT mstCarton FROM MstCartonDto mstCarton", MstCartonDto.class)
                .getResultList();
    }
}
