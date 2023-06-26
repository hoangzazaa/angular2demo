package vn.vnext.sefuri.sf.play;

import play.http.DefaultHttpFilters;

import javax.inject.Inject;

/**
 * Created by haipt on 3/10/2017.
 */
public class AppFilters extends DefaultHttpFilters {

    @Inject
    public AppFilters(TLSFilter tlsFilter) {
        super(tlsFilter);
    }
}
