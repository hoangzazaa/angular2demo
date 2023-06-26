package vn.vnext.sefuri.sf.json.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;
import vn.vnext.sefuri.sf.json.core.MyboxItemJson;

/**
 * Created by Hoang Ta Duy on 1/13/2017.
 */
public class SF0030115Res extends AbstractJson {

    @JsonProperty("myBoxItem")
    private MyboxItemJson myboxItem = new MyboxItemJson();

    public MyboxItemJson getMyboxItem() {
        return myboxItem;
    }

    public void setMyboxItem(MyboxItemJson myboxItem) {
        this.myboxItem = myboxItem;
    }
}
