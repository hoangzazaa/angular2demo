package vn.vnext.sefuri.sf.module.search;

import com.google.inject.AbstractModule;
import vn.vnext.sefuri.sf.module.search.impl.SearchApiImpl;

/**
 * Created by VuPT on 3/15/2017.
 */
public class SearchModule extends AbstractModule {


    @Override
    protected void configure() {
        bind(SearchApi.class).to(SearchApiImpl.class).asEagerSingleton();
    }
}
