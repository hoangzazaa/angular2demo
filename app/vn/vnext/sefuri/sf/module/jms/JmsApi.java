package vn.vnext.sefuri.sf.module.jms;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.module.jms.impl.JmsApiNoImpl;
import vn.vnext.sefuri.sf.module.jms.json.if0111.IF0111Json;
import vn.vnext.sefuri.sf.module.jms.json.if0121.IF0121Json;
import vn.vnext.sefuri.sf.module.jms.json.if0131.IF0131Json;

/**
 * Created by VuPT on 3/15/2017.
 */
@ImplementedBy(JmsApiNoImpl.class)
public interface JmsApi {

    String SETTING = "jms";
    String BROCKER = "broker";
    long TIMEOUT = 120000;
    int RESULT_OK = 0;
    int RESULT_NG = 99;

    int callIF0111(IF0111Json json);

    int callIF0121(IF0121Json json);

    int callIF0131(IF0131Json json);
}
