package vn.vnext.sefuri.sf.dao.impl;

import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.dao.MstDecorativeDao;
import vn.vnext.sefuri.sf.dto.MstDecorativeDto;

import java.util.List;

/**
 * Created by admin on 3/18/2017.
 */
public class MstDecorativeDaoImpl extends GenericDaoImpl<MstDecorativeDto> implements MstDecorativeDao {
    public MstDecorativeDaoImpl() {
        super(MstDecorativeDto.class);
    }

    public List<MstDecorativeDto> findAll() {
        return JPA.em().createQuery("SELECT mstDecorative FROM MstDecorativeDto mstDecorative", MstDecorativeDto.class)
                .getResultList();
    }
}
