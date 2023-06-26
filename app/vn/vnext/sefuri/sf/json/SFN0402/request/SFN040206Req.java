package vn.vnext.sefuri.sf.json.SFN0402.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import vn.vnext.sefuri.sf.json.common.AbstractJson;

public class SFN040206Req extends AbstractJson {

    @JsonProperty("type")
    private int type;
    @JsonProperty("code")
    private String code;
    /** 得意先の場合は 備考(営業カルテ), 仕入先の場合は営業(カルテ) */
    @JsonProperty("memo")
    private String memo;
    /** 備考(出荷部門用カルテ)  得意先の場合のみ */
    @JsonProperty("remarksForShipping")
    private String remarksForShipping;

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    /**
     * @return 得意先の場合は 備考(営業カルテ), 仕入先の場合は営業(カルテ)
     */
    public String getMemo() {
        return memo;
    }

    /**
     * @param memo 得意先の場合は 備考(営業カルテ), 仕入先の場合は営業(カルテ)
     */
    public void setMemo(String memo) {
        this.memo = memo;
    }

    /**
     * @return 備考(出荷部門用カルテ)  得意先の場合のみ
     */
    public String getRemarksForShipping() {
        return remarksForShipping;
    }

    /**
     * @param remarksForShipping 備考(出荷部門用カルテ)  得意先の場合のみ
     */
    public void setRemarksForShipping(String remarksForShipping) {
        this.remarksForShipping = remarksForShipping;
    }
}
