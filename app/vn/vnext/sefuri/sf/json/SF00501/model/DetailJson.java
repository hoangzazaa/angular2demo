package vn.vnext.sefuri.sf.json.SF00501.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class DetailJson {

    @JsonProperty("id")
    private Integer id;

    @JsonProperty("amounts")
    private List<AmountJson> amounts;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public List<AmountJson> getAmounts() {
        return amounts;
    }

    public void setAmounts(List<AmountJson> amounts) {
        this.amounts = amounts;
    }

}
