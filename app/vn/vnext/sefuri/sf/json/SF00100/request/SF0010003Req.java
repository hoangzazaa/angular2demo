package vn.vnext.sefuri.sf.json.SF00100.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

/**
 * Created by manhnv on 07/07/2017.
 */
public class SF0010003Req extends AbstractJson {
    @JsonProperty("departmentId")
    private Integer departmentId;

    @JsonProperty("picId")
    private Integer picId;

    @JsonProperty("indexFrom")
    private Integer indexFrom = Constants.ZERO;

    @JsonProperty("indexTo")
    private Integer indexTo = Constants.PAGE_SIZE;

    public Integer getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(final Integer departmentId) {
        this.departmentId = departmentId;
    }

    public Integer getPicId() {
        return picId;
    }

    public void setPicId(final Integer picId) {
        this.picId = picId;
    }

    public Integer getIndexFrom() {
        return indexFrom;
    }

    public void setIndexFrom(final Integer indexFrom) {
        this.indexFrom = indexFrom;
    }

    public Integer getIndexTo() {
        return indexTo;
    }

    public void setIndexTo(final Integer indexTo) {
        this.indexTo = indexTo;
    }
}
