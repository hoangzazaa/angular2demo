package vn.vnext.sefuri.sf.json.SFN0307.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class PaperJson {

    @JsonProperty("id")
    private int id;
    @JsonProperty("paperName")
    private String paperName;
    @JsonProperty("abbr")
    private String abbr;
    @JsonProperty("materialName")
    private String materialName;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPaperName() {
        return paperName;
    }

    public void setPaperName(String paperName) {
        this.paperName = paperName;
    }

    public String getAbbr() {
        return abbr;
    }

    public void setAbbr(String abbr) {
        this.abbr = abbr;
    }

    public String getMaterialName() {
        return materialName;
    }

    public void setMaterialName(String materialName) {
        this.materialName = materialName;
    }
}
