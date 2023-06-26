package vn.vnext.sefuri.sf.dto;

import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.common.enums.Level;
import vn.vnext.sefuri.sf.common.enums.MessageType;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "sfr_sf_event_logs")
public class EventLogDto extends BaseDto {

    private DateTime eventDate;

    private Integer userId;

    private String function;

    private String level;

    private String messageType;

    private String message;

    @Basic
    @Column(name = "event_date")
    public DateTime getEventDate() {
        return eventDate;
    }

    public void setEventDate(DateTime eventDate) {
        this.eventDate = eventDate;
    }

    @Basic
    @Column(name = "user_id")
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    @Basic
    @Column(name = "function")
    public String getFunction() {
        return function;
    }

    public void setFunction(String function) {
        this.function = function;
    }

    @Basic
    @Column(name = "level")
    public String getLevel() {
        return level;
    }

    public void setLevelEnum(Level level) {
        this.level = level.name();
    }

    public void setLevel(String level) {
        this.level = level;
    }

    @Basic
    @Column(name = "message_type")
    public String getMessageType() {
        return messageType;
    }

    public void setMessageTypeEnum(MessageType type){
        this.messageType = type.name();
    }

    public void setMessageType(String messageType) {
        this.messageType = messageType;
    }

    @Basic
    @Column(name = "message", columnDefinition = "TEXT")
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
