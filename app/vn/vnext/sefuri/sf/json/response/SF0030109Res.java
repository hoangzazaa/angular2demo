package vn.vnext.sefuri.sf.json.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;
import vn.vnext.sefuri.sf.json.core.CommentJson;

/**
 * Created by ngocnm on 1/10/2017.
 */
public class SF0030109Res extends AbstractJson {
    @JsonProperty("comment")
    private CommentJson comment;


    public CommentJson getComment() {
        return comment;
    }

    public void setComment(CommentJson comment) {
        this.comment = comment;
    }
}
