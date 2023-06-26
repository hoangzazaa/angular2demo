package vn.vnext.sefuri.sf.json.common;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * 応答 JSON
 *
 * 対応する TypeScript ソース client/src/app/response/ResponseJson.ts
 * Created by Teddy on 18/09/2016.
 */
public class ResponseJson<T extends AbstractJson> {

    @JsonProperty("res")
    private DataJson<T> res;

    @JsonProperty("error")
    private ErrorJson error;

    public DataJson<T> getRes() {
        return res;
    }

    public void setRes(DataJson<T> res) {
        this.res = res;
    }

    public ErrorJson getError() {
        return error;
    }

    public void setError(ErrorJson error) {
        this.error = error;
    }
}
