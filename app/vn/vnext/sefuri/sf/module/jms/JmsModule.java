package vn.vnext.sefuri.sf.module.jms;

import com.google.inject.AbstractModule;
import vn.vnext.sefuri.sf.module.jms.impl.JmsApiImpl;

/**
 * Created by VuPT on 3/15/2017.
 */
public class JmsModule extends AbstractModule {


    @Override
    protected void configure() {
        bind(JmsApi.class).to(JmsApiImpl.class).asEagerSingleton();
    }
}
