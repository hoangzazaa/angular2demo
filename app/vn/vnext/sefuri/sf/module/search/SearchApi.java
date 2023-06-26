package vn.vnext.sefuri.sf.module.search;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.json.SF00202.request.SF0020204Req;
import vn.vnext.sefuri.sf.json.SF00204.request.SF0020402Req;
import vn.vnext.sefuri.sf.json.SFN0401.request.SFN040101Req;
import vn.vnext.sefuri.sf.json.SFN0401.request.SFN040102Req;
import vn.vnext.sefuri.sf.module.search.impl.SearchApiNoImpl;

/**
 * Created by VuPT on 3/15/2017.
 */
@ImplementedBy(SearchApiNoImpl.class)
public interface SearchApi {

    String SETTING = "search";
    String SETTING_INDEX = "index";
    String SETTING_SERVER = "server";
    int PAGE_SIZE = 10;

    SearchResult searchDeal(SF0020204Req req);

    SearchResult searchProduct(SF0020402Req req);

    SearchResult sfn040101(SFN040101Req req);

    SearchResult sfn040102(SFN040102Req req);
}
