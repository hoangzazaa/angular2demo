package vn.vnext.sefuri.sf.module.search;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by haipt on 11/25/2016.
 */
public class SearchResult {

    private int count;
    private List<Integer> ids;

    public SearchResult() {
        count = 0;
        ids = new ArrayList<>();
    }

    public SearchResult(int count, List<Integer> ids) {
        this.count = count;
        this.ids = ids;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public List<Integer> getIds() {
        return ids;
    }

    public void setIds(List<Integer> ids) {
        this.ids = ids;
    }
}
