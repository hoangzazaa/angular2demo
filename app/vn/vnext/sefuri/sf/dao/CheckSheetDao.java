package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dao.impl.CheckSheetDaoImpl;
import vn.vnext.sefuri.sf.dto.ChecksheetDto;

import java.util.List;

/**
 * Created by TungNT on 16/03/2017.
 */
@ImplementedBy(CheckSheetDaoImpl.class)
public interface CheckSheetDao extends GenericDao<ChecksheetDto>{
    List<ChecksheetDto> getCheckSheetsByDealId(Integer dealId);
}
