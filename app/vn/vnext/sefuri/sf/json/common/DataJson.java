package vn.vnext.sefuri.sf.json.common;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * 応答本文 JSON
 *
 * 対応する TypeScript ソース client/src/app/response/ResponseJson.ts
 * Created by manhnv on 12/30/2016.
 */
public class DataJson<T extends AbstractJson> {
    @JsonProperty("data")
    private T data;

    @JsonProperty("messageCode")
    private String messageCode;

    public DataJson() {
    }

    public DataJson(final T data, final String messageCode) {
        this.data = data;
        this.messageCode = messageCode;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public String getMessageCode() {
        return messageCode;
    }

    public void setMessageCode(String messageCode) {
        this.messageCode = messageCode;
    }
}
