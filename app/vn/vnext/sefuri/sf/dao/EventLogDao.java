package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dao.impl.EventLogDaoImpl;
import vn.vnext.sefuri.sf.dto.ChecksheetDto;
import vn.vnext.sefuri.sf.dto.EventLogDto;

@ImplementedBy(EventLogDaoImpl.class)
public interface EventLogDao extends GenericDao<EventLogDto> {
}
