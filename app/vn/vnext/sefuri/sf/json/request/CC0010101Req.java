package vn.vnext.sefuri.sf.json.request;

import vn.vnext.sefuri.sf.json.common.AbstractJson;

/**
 * ボタン操作ログ情報
 */
public class CC0010101Req extends AbstractJson {

    private String function;

    private String buttonName;

    public String getFunction() {
        return function;
    }

    public void setFunction(String function) {
        this.function = function;
    }

    public String getButtonName() {
        return buttonName;
    }

    public void setButtonName(String buttonName) {
        this.buttonName = buttonName;
    }
}
