package vn.vnext.sefuri.sf.module.search.builder;

import com.fasterxml.jackson.databind.node.ObjectNode;
import play.libs.Json;

import java.util.List;

/**
 * Created by Teddy on 7/29/2017.
 */
public class CommonBuilder {

    protected static ObjectNode buildKeywords(List<String> keywords) {
        if (keywords != null && !keywords.isEmpty()) {
            ObjectNode must = Json.newObject();
            //Match
            ObjectNode match = Json.newObject();
            must.set("match", match);
            //Search all
            ObjectNode _all = Json.newObject();
            match.set("_all", _all);
            //_All Query
            _all.put("query", String.join(" ", keywords));
            _all.put("operator", "AND");

            return must;
        } else {
            return null;
        }
    }

    protected static ObjectNode buildRoot() {
        ObjectNode root = Json.newObject();
        // get _ids only
        root.set("fields", Json.newArray());

        return root;
    }
}
