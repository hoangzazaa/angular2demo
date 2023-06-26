package vn.vnext.sefuri.sf.json.SFN0402.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class PaperJson {

    @JsonProperty("id")
    private int id;

    @JsonProperty("paperName")
    private String paperName;

    @JsonProperty("name")
    private String name;

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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
