package vn.vnext.sefuri.sf.dao.impl;

import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.dao.MstStampingDao;
import vn.vnext.sefuri.sf.dto.MstStampingDto;

import java.util.List;

/**
 * Created by VuPT on 10/27/2016.
 */
public class MstStampingDaoImpl extends GenericDaoImpl<MstStampingDto> implements MstStampingDao {
    public MstStampingDaoImpl() {
        super(MstStampingDto.class);
    }

    public List<MstStampingDto> findAll() {
        return JPA.em().createQuery("SELECT mstStamping FROM MstStampingDto mstStamping", MstStampingDto.class)
                .getResultList();
    }
}
