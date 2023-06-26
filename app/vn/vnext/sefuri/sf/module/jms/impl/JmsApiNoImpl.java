package vn.vnext.sefuri.sf.module.jms.impl;

import vn.vnext.sefuri.sf.module.jms.JmsApi;
import vn.vnext.sefuri.sf.module.jms.json.if0111.IF0111Json;
import vn.vnext.sefuri.sf.module.jms.json.if0121.IF0121Json;
import vn.vnext.sefuri.sf.module.jms.json.if0131.IF0131Json;

/**
 * Created by VuPT on 3/16/2017.
 */
public class JmsApiNoImpl implements JmsApi {

    @Override
    public int callIF0111(IF0111Json json) {
        return RESULT_OK;
    }

    @Override
    public int callIF0121(IF0121Json json) {
        return RESULT_OK;
    }

    @Override
    public int callIF0131(IF0131Json json) {
        return RESULT_OK;
    }
}
