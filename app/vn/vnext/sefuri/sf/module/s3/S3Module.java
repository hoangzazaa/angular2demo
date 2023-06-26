package vn.vnext.sefuri.sf.module.s3;

import com.google.inject.AbstractModule;
import play.Application;
import vn.vnext.sefuri.sf.module.s3.impl.S3ApiImpl;

import javax.inject.Inject;

/**
 * Created by haipt on 1/9/2017.
 */
public class S3Module extends AbstractModule {

    @Override
    protected void configure() {
        bind(S3Api.class).to(S3ApiImpl.class).asEagerSingleton();
    }
}
