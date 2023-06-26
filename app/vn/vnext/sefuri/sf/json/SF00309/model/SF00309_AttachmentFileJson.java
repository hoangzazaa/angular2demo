package vn.vnext.sefuri.sf.json.SF00309.model;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Created by hoangtd on 4/14/2017.
 */
public class SF00309_AttachmentFileJson {
    @JsonProperty("name")
    private String name;

    @JsonProperty("size")
    private Integer size;

    @JsonProperty("tmpName")
    private String tmpName;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getSize() {
      return size;
    }

    public void setSize(Integer name) {
      this.size = size;
    }

    public String getTmpName() {
      return tmpName;
    }

    public void setTmpName(String tmpName) {
      this.tmpName = tmpName;
    }


}
