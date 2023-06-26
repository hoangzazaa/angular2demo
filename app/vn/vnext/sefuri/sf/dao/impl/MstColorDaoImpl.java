package vn.vnext.sefuri.sf.dao.impl;

import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.dao.MstColorDao;
import vn.vnext.sefuri.sf.dto.MstColorDto;

import java.util.List;

/**
 * Created by VuPT on 10/27/2016.
 */
public class MstColorDaoImpl extends GenericDaoImpl<MstColorDto> implements MstColorDao {
    public MstColorDaoImpl() {
        super(MstColorDto.class);
    }

    public List<MstColorDto> findAll() {
        return JPA.em().createQuery("SELECT mstColor FROM MstColorDto mstColor", MstColorDto.class)
                .getResultList();
    }
}
