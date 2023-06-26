package vn.vnext.sefuri.sf.json.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;
import vn.vnext.sefuri.sf.json.core.CommentJson;

import java.util.List;

/**
 * Created by TungNT on 1/11/2017.
 */
public class SF0030110Res extends AbstractJson {
    @JsonProperty("comments")
    private List<CommentJson> commentJsons;

    public List<CommentJson> getCommentJsons() {
        return commentJsons;
    }

    public void setCommentJsons(List<CommentJson> commentJsons) {
        this.commentJsons = commentJsons;
    }
}
