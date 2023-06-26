package vn.vnext.sefuri.sf.module.search.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.dto.BaseDto;

/**
 * Created by Teddy on 11/16/2016.
 */
public abstract class BaseModel<T extends BaseDto> {

    @JsonProperty("id")
    private Integer id;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public abstract void setData(T data);
}
