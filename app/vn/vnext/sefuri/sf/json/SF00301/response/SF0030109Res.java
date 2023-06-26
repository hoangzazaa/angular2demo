package vn.vnext.sefuri.sf.json.SF00301.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SF00301.model.SF00301_CommentJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

/**
 * Created by VuPT on 2/27/2017.
 */
public class SF0030109Res extends AbstractJson {
    @JsonProperty("comment")
    private SF00301_CommentJson comment;

    @JsonProperty("numberOfComment")
    private Integer numberOfComment;

    public Integer getNumberOfComment() {
        return numberOfComment;
    }

    public void setNumberOfComment(Integer numberOfComment) {
        this.numberOfComment = numberOfComment;
    }

    public SF00301_CommentJson getComment() {
        return comment;
    }

    public void setComment(SF00301_CommentJson comment) {
        this.comment = comment;
    }
}
