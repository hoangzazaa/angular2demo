package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

/**
 * Created by DungTQ on 2/8/2017.
 */
public class CustomPaperJson {

    @JsonProperty("id")
    private Integer id;

    @JsonProperty("name")
    private String name;

    @JsonProperty("basis_weights")
    private List<PaperJson> basisWeights;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<PaperJson> getBasisWeights() {
        return basisWeights;
    }

    public void setBasisWeights(List<PaperJson> basisWeights) {
        this.basisWeights = basisWeights;
    }
}
