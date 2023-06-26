package vn.vnext.sefuri.sf.json.common;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * エラー JSON の要素
 *
 * 対応する TypeScript ソース client/src/app/response/ResponseJson.ts
 * Created by Teddy on 17/09/2016.
 */
public class ItemErrorJson {
    @JsonProperty("code")
    private String errorCode;

    @JsonProperty("message")
    private String messageId;

    public String getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

    public String getMessageId() {
        return messageId;
    }

    public void setMessageId(String messageId) {
        this.messageId = messageId;
    }
}
