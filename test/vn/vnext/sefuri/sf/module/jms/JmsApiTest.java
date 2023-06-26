package vn.vnext.sefuri.sf.module.jms;

import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;
import vn.vnext.sefuri.sf.module.jms.impl.JmsApiImpl;

/**
 * Created by haipt on 4/13/2017.
 */
public class JmsApiTest {

    private static JmsApi jmsApi;

    @BeforeClass
    public static void setupOnlyOnce() {
        jmsApi = new JmsApiImpl();
    }

//    @Test
//    public void callIF0111() throws Exception {
//        int result = jmsApi.callIF0111(null);
//        Assert.assertEquals(99, result);
//    }

    @Test
    public void callIF0121() throws Exception {
        int result = jmsApi.callIF0121(null);
        Assert.assertEquals(99, result);
    }

    @Test
    public void callIF0131() throws Exception {
        int result = jmsApi.callIF0131(null);
        Assert.assertEquals(99, result);
    }

}