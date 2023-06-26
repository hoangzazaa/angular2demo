package vn.vnext.sefuri.sf.json.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;
import vn.vnext.sefuri.sf.json.core.MstSheetSizeJson;

import java.util.List;

/**
 * Created by DungTQ on 4/20/2017.
 */
public class SF0080104ResultJson extends AbstractJson {
    @JsonProperty("sheet_sizes")
    List<MstSheetSizeJson> sheet_sizes;

    public List<MstSheetSizeJson> getSheet_sizes() {
        return sheet_sizes;
    }

    public void setSheet_sizes(List<MstSheetSizeJson> sheet_sizes) {
        this.sheet_sizes = sheet_sizes;
    }
}
