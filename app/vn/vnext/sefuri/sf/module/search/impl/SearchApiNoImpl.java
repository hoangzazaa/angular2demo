package vn.vnext.sefuri.sf.module.search.impl;

import vn.vnext.sefuri.sf.json.SF00202.request.SF0020204Req;
import vn.vnext.sefuri.sf.json.SF00204.request.SF0020402Req;
import vn.vnext.sefuri.sf.json.SFN0401.request.SFN040101Req;
import vn.vnext.sefuri.sf.json.SFN0401.request.SFN040102Req;
import vn.vnext.sefuri.sf.module.search.SearchApi;
import vn.vnext.sefuri.sf.module.search.SearchResult;

import java.util.Arrays;
import java.util.Collections;

/**
 * Created by Teddy on 3/31/2017.
 */
public class SearchApiNoImpl implements SearchApi {

    private static final SearchResult searchResult = new SearchResult(0, Collections.EMPTY_LIST);

    @Override
    public SearchResult searchDeal(SF0020204Req req) {
        return searchResult;
    }

    @Override
    public SearchResult searchProduct(SF0020402Req req) {
        return searchResult;
    }

    @Override
    public SearchResult sfn040101(SFN040101Req req) {
        SearchResult searchResult = new SearchResult();
        searchResult.setCount(1);
        searchResult.setIds(Arrays.asList(559));

        return searchResult;
    }

    @Override
    public SearchResult sfn040102(SFN040102Req req) {
        return searchResult;
    }
}
