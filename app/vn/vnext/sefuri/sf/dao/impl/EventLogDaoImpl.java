package vn.vnext.sefuri.sf.dao.impl;

import vn.vnext.sefuri.sf.dao.EventLogDao;
import vn.vnext.sefuri.sf.dto.EventLogDto;

public class EventLogDaoImpl extends GenericDaoImpl<EventLogDto> implements EventLogDao {
    public EventLogDaoImpl() {
        super(EventLogDto.class);
    }
}
