package vn.vnext.sefuri.sf.json.SF00205.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.ProductJson;

/**
 * Created by manhnv on 6/15/2017.
 */
public class SF00205_ProductJson extends ProductJson {
    @JsonProperty("srcImg")
    private String srcImg;

    public String getSrcImg() {
        return srcImg;
    }

    public void setSrcImg(final String srcImg) {
        this.srcImg = srcImg;
    }

}
