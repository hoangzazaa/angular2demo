package vn.vnext.sefuri.sf.json.SFN0504.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CustomerJson {

    @JsonProperty("name")
    private String name;
    @JsonProperty("code")
    private String code;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
