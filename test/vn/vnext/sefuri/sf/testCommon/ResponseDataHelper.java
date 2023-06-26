package vn.vnext.sefuri.sf.testCommon;

import com.fasterxml.jackson.databind.JsonNode;
import play.libs.Json;
import play.mvc.Result;
import vn.vnext.sefuri.sf.json.common.AbstractJson;
import vn.vnext.sefuri.sf.json.common.DataJson;
import vn.vnext.sefuri.sf.json.common.ErrorJson;
import vn.vnext.sefuri.sf.util.JsonUtil;

/**
 * Created by DungTQ on 1/11/2017.
 */
public class ResponseDataHelper<T extends AbstractJson> {
    private DataJson<T> res = new DataJson<>();
    private ErrorJson error = new ErrorJson();

    public void parseData(final Class<T> clazz, Result result) {
        String body = play.test.Helpers.contentAsString(result);
        JsonNode jsonRes = Json.parse(body);
        this.res.setData(parseData(clazz, jsonRes));
        this.res.setMessageCode(parseMessageCode(jsonRes));

        this.error.setErrorCode(parseErrorCode(jsonRes));
    }

    public T getData() {
        return this.res.getData();
    }

    public String getMessageCode() {
        return this.res.getMessageCode();
    }

    public String getErrorCode() {
        return this.error.getErrorCode();
    }

    private <T extends AbstractJson> T parseData(final Class<T> clazz, JsonNode jsonRes) {
        JsonNode res = jsonRes.get("res");
        if(res != null) {
            res = res.get("data");
            if(res != null) {
                return JsonUtil.fromJson(res.toString(), clazz);
            }
        }
        return null;
    }

    private String parseMessageCode(JsonNode jsonRes) {
        JsonNode res = jsonRes.get("res");
        if(res != null) {
            res = res.get("messageCode");
            if(res != null) {
                return JsonUtil.fromJson(res.toString(), String.class);
            }
        }
        return null;
    }

    private String parseErrorCode(JsonNode jsonRes) {
        JsonNode res = jsonRes.get("error");
        if(res != null) {
            res = res.get("code");
            if(res != null) {
                return JsonUtil.fromJson(res.toString(), String.class);
            }
        }
        return null;
    }
}
