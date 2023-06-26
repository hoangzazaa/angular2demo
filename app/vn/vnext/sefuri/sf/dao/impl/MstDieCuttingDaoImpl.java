package vn.vnext.sefuri.sf.dao.impl;

import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.dao.MstDieCuttingDao;
import vn.vnext.sefuri.sf.dto.MstDieCuttingDto;

import java.util.List;

/**
 * Created by VuPT on 10/27/2016.
 */
public class MstDieCuttingDaoImpl extends GenericDaoImpl<MstDieCuttingDto> implements MstDieCuttingDao {
    public MstDieCuttingDaoImpl() {
        super(MstDieCuttingDto.class);
    }

    public List<MstDieCuttingDto> findAll() {
        return JPA.em().createQuery("SELECT mstDieCutting FROM MstDieCuttingDto mstDieCutting", MstDieCuttingDto.class)
                .getResultList();
    }
}

