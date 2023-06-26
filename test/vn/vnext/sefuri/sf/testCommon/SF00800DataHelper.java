package vn.vnext.sefuri.sf.testCommon;

import com.fasterxml.jackson.databind.JsonNode;
import play.libs.Json;
import play.mvc.Result;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

/**
 * Created by DungTQ on 2/10/2017.
 */
public class SF00800DataHelper<T extends AbstractJson> {
    private String status;

    public void parseData(final Class<T> clazz, Result result) {
        String body = play.test.Helpers.contentAsString(result);
        JsonNode jsonRes = Json.parse(body);
        this.status = jsonRes.path("status").asText();
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
