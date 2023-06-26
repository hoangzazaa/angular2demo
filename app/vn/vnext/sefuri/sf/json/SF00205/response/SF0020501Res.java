package vn.vnext.sefuri.sf.json.SF00205.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.collect.Lists;
import vn.vnext.sefuri.sf.json.common.AbstractJson;
import vn.vnext.sefuri.sf.json.core.DepartmentJson;

import java.util.List;

/**
 * Created by manhnv on 6/15/2017.
 */
public class SF0020501Res extends AbstractJson {
    @JsonProperty("departments")
    private List<DepartmentJson> departments = Lists.newArrayList();

    @JsonProperty("searchResult")
    private SF0020502ResultData searchResult = new SF0020502ResultData();

    public List<DepartmentJson> getDepartments() {
        return departments;
    }

    public void setDepartments(List<DepartmentJson> departments) {
        this.departments = departments;
    }

    public SF0020502ResultData getSearchResult() {
        return searchResult;
    }

    public void setSearchResult(final SF0020502ResultData searchResult) {
        this.searchResult = searchResult;
    }
}
