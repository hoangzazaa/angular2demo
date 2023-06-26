package vn.vnext.sefuri.sf.dao.impl;

import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.dao.CheckSheetDao;
import vn.vnext.sefuri.sf.dto.ChecksheetDto;

import java.util.List;

/**
 * Created by TungNT on 16/03/2017.
 */
public class CheckSheetDaoImpl extends GenericDaoImpl<ChecksheetDto> implements CheckSheetDao {
    public CheckSheetDaoImpl() {
        super(ChecksheetDto.class);
    }

    @Override
    public List<ChecksheetDto> getCheckSheetsByDealId(Integer dealId) {
        return JPA.em().createQuery("SELECT cs From ChecksheetDto cs WHERE cs.dealId=:dealId", ChecksheetDto.class)
                .setParameter("dealId", dealId)
                .getResultList();
    }

}
