package vn.vnext.sefuri.sf.json.common;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.dto.BaseDto;

/**
 * Contain common columns used in all table
 *
 * @author manhnv
 */
public abstract class BaseJson<T extends BaseDto> {
    //id
    @JsonProperty("id")
    protected Integer id;

    //createdUser
    @JsonProperty("createdUser")
    protected Integer createdUser;

    //updatedUser
    @JsonProperty("updatedUser")
    protected Integer updatedUser;

    //createdDate
    @JsonProperty("createdDate")
    protected DateTime createdDate;

    //updatedDate
    @JsonProperty("updatedDate")
    protected DateTime updatedDate;

    public Integer getId() {
        return id;
    }

    public void setId(final Integer id) {
        this.id = id;
    }

    public Integer getCreatedUser() {
        return createdUser;
    }

    public void setCreatedUser(final Integer createdUser) {
        this.createdUser = createdUser;
    }

    public Integer getUpdatedUser() {
        return updatedUser;
    }

    public void setUpdatedUser(final Integer updatedUser) {
        this.updatedUser = updatedUser;
    }

    public DateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(final DateTime createdDate) {
        this.createdDate = createdDate;
    }

    public DateTime getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(final DateTime updatedDate) {
        this.updatedDate = updatedDate;
    }

    @JsonIgnore
    public abstract T getModel();

    public abstract void setModel(final T t);

    // basic info
    public void setData(final T t) {
        if (t != null) {
            this.id = t.getId();
            this.createdUser = t.getCreatedUser();
            this.updatedUser = t.getUpdatedUser();
            this.createdDate = t.getCreatedDate();
            this.updatedDate = t.getUpdatedDate();
        }
    }

}
