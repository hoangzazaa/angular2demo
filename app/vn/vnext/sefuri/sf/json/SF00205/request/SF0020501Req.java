package vn.vnext.sefuri.sf.json.SF00205.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

/**
 * Created by manhnv on 6/15/2017.
 */
public class SF0020501Req extends AbstractJson {
    @JsonProperty("indexFrom")
    private Integer indexFrom = Constants.ZERO;

    @JsonProperty("indexTo")
    private Integer indexTo = Constants.PAGE_SIZE;

    @JsonProperty("filter")
    private SF00205Filter filter = new SF00205Filter();

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

    public SF00205Filter getFilter() {
        return filter;
    }

    public void setFilter(final SF00205Filter filter) {
        this.filter = filter;
    }
}
