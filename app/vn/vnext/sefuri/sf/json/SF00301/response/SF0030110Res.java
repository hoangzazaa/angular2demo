package vn.vnext.sefuri.sf.json.SF00301.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SF00301.model.SF00301_CommentJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

import java.util.List;

/**
 * Created by VuPT on 2/27/2017.
 */
public class SF0030110Res extends AbstractJson {
    @JsonProperty("comments")
    private List<SF00301_CommentJson> comments;

    @JsonProperty("total")
    private Long total;

    public List<SF00301_CommentJson> getComments() {
        return comments;
    }

    public void setComments(final List<SF00301_CommentJson> comments) {
        this.comments = comments;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(final Long total) {
        this.total = total;
    }
}
