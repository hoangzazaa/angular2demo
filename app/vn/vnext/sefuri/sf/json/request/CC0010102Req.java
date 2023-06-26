package vn.vnext.sefuri.sf.json.request;

import vn.vnext.sefuri.sf.json.common.AbstractJson;

public class CC0010102Req extends AbstractJson {

    private String function;

    private String transitionPath;

    public String getFunction() {
        return function;
    }

    public void setFunction(String function) {
        this.function = function;
    }

    public String getTransitionPath() {
        return transitionPath;
    }

    public void setTransitionPath(String transitionPath) {
        this.transitionPath = transitionPath;
    }
}
