package vn.vnext.sefuri.sf.dao.impl;

import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.dao.MstPackingDao;
import vn.vnext.sefuri.sf.dto.MstPackingDto;

import java.util.List;

/**
 * Created by VuPT on 10/27/2016.
 */
public class MstPackingDaoImpl extends GenericDaoImpl<MstPackingDto> implements MstPackingDao {
    public MstPackingDaoImpl() {
        super(MstPackingDto.class);
    }

    public List<MstPackingDto> findAll() {
        return JPA.em().createQuery("SELECT mstPacking FROM MstPackingDto mstPacking", MstPackingDto.class)
                .getResultList();
    }
}
