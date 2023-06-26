package vn.vnext.sefuri.sf.service.impl;

import com.google.inject.Inject;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import vn.vnext.sefuri.sf.common.enums.Level;
import vn.vnext.sefuri.sf.common.enums.MessageType;
import vn.vnext.sefuri.sf.dao.EventLogDao;
import vn.vnext.sefuri.sf.dto.EventLogDto;
import vn.vnext.sefuri.sf.dto.UserDto;
import vn.vnext.sefuri.sf.service.SV001AuthService;
import vn.vnext.sefuri.sf.service.SV901DBLoggingService;

public class SV901DBLoggingServiceImpl implements SV901DBLoggingService {
    private static Integer SYSTEM_USER_ID = 273;

    private static final Logger logger = LoggerFactory.getLogger(SV901DBLoggingServiceImpl.class);


    @Inject
    private SV001AuthService authService;

    @Inject
    private EventLogDao logDao;

    public void sv90101ErrorMessage(String function, String message){
        try {
            // TODO テスト未完了
            EventLogDto dto = getEventLogDto(
                    Level.ERROR,
                    MessageType.MESSAGE,
                    function,
                    message
            );
            logDao.create(dto);
        }catch(Exception e){
            logger.error(" DBLog error.", e);
        }
    }

    public void sv90102WarningMessage(String function, String message){
        try {
            // TODO テスト未完了
            EventLogDto dto = getEventLogDto(
                    Level.WARN,
                    MessageType.MESSAGE,
                    function,
                    message
            );
            logDao.create(dto);
        }catch(Exception e){
            logger.error(" DBLog error.", e);
        }
    }

    public void sv90103InfoMessage(String function, String message){
        try {
            // TODO テスト未完了
            EventLogDto dto = getEventLogDto(
                    Level.INFO,
                    MessageType.MESSAGE,
                    function,
                    message
            );
            logDao.create(dto);
        }catch(Exception e){
            logger.error(" DBLog error.", e);
        }
    }

    public void sv90104DebugMessage(String function, String message){
        try {
            // TODO テスト未完了
            EventLogDto dto = getEventLogDto(
                    Level.DEBUG,
                    MessageType.MESSAGE,
                    function,
                    message
            );
            logDao.create(dto);
        }catch(Exception e){
            logger.error(" DBLog error.", e);
        }
    }

    public void sv90105TraceMessage(String function, String message){
        try {
            // TODO テスト未完了
            EventLogDto dto = getEventLogDto(
                    Level.TRACE,
                    MessageType.MESSAGE,
                    function,
                    message
            );
            logDao.create(dto);
        }catch(Exception e){
            logger.error(" DBLog error.", e);
        }
    }

    public void sv90106ButtonOperation(String function, String buttonName){
        try {
            EventLogDto dto = getEventLogDto(
                    Level.DEBUG,
                    MessageType.BUTTON,
                    function,
                    "Pushed '" + buttonName + "' button."
            );
            logDao.create(dto);
        }catch(Exception e){
            logger.error(" DBLog error.", e);
        }
    }

    public void sv90107Transition(String function, String transitionPath){
        try {
            // TODO テスト未完了
            EventLogDto dto = getEventLogDto(
                    Level.INFO,
                    MessageType.TRANSITION,
                    function,
                    "Transition to '" + transitionPath + "'."
            );
            logDao.create(dto);
        }catch(Exception e){
            logger.error(" DBLog error.", e);
        }
    }

    public void sv90110Transition50xPage(){
        try {
            // TODO テスト未完了
            EventLogDto dto = getEventLogDto(
                    Level.ERROR,
                    MessageType.ERROR_PAGE,
                    "50x",
                    "Transition to '500 Internal Server Error' page."
            );
            logDao.create(dto);
        }catch(Exception e){
            logger.error(" DBLog error.", e);
        }
    }

    private EventLogDto getEventLogDto(Level level, MessageType type, String function, String message){
        EventLogDto dto = getInitializedDto();
        dto.setMessageTypeEnum(type);
        dto.setLevelEnum(level);
        dto.setFunction(function);
        dto.setMessage(message);
        return dto;
    }

    private EventLogDto getInitializedDto(){

        DateTime now = DateTime.now();
        UserDto userDto = authService.getCurrentUser();
        Integer userId = (userDto == null || userDto.getId() == null) ? SYSTEM_USER_ID : userDto.getId();

        EventLogDto dto = new EventLogDto();
        dto.setUserId(userId);
        dto.setCreatedUser(userId);
        dto.setUpdatedUser(userId);
        dto.setEventDate(now);
        dto.setCreatedDate(now);
        dto.setUpdatedDate(now);

        return dto;
    }
}
