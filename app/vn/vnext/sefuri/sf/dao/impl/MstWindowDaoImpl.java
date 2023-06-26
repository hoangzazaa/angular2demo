package vn.vnext.sefuri.sf.dao.impl;

import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.dao.MstWindowDao;
import vn.vnext.sefuri.sf.dto.MstWindowDto;

import java.util.List;

/**
 * Created by VuPT on 10/27/2016.
 */
public class MstWindowDaoImpl extends GenericDaoImpl<MstWindowDto> implements MstWindowDao {
    public MstWindowDaoImpl() {
        super(MstWindowDto.class);
    }

    public List<MstWindowDto> findAll() {
        return JPA.em().createQuery("SELECT mstWindow FROM MstWindowDto mstWindow", MstWindowDto.class)
                .getResultList();
    }
}
