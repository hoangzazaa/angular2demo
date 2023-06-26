package vn.vnext.sefuri.sf.json.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;
import vn.vnext.sefuri.sf.json.core.MyboxItemJson;

/**
 * Created by ngocnm on 1/12/2017.
 */
public class SF0030113Res extends AbstractJson {
    @JsonProperty("myBoxItem")
    private MyboxItemJson myboxItem;

    public MyboxItemJson getMyboxItem() {
        return myboxItem;
    }

    public void setMyboxItem(MyboxItemJson myboxItem) {
        this.myboxItem = myboxItem;
    }
}
