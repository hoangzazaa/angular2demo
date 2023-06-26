package vn.vnext.sefuri.sf.json.common;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.collect.Lists;

/**
 * エラー JSON
 *
 * 対応する TypeScript ソース client/src/app/response/ResponseJson.ts
 * Created by haipt on 9/16/2016.
 */
public class ErrorJson {
    @JsonProperty("code")
    private String errorCode;

    @JsonProperty("items")
    private List<ItemErrorJson> itemList = Lists.newArrayList();

    public ErrorJson() {

    }

    public ErrorJson(final String errorCode) {
        this.errorCode = errorCode;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

    public List<ItemErrorJson> getItemList() {
        return itemList;
    }

    public void setItemList(List<ItemErrorJson> itemList) {
        this.itemList = itemList;
    }
}
