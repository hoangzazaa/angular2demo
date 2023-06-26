package vn.vnext.sefuri.sf.json.SF00100.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SF00100.model.DealJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;
import vn.vnext.sefuri.sf.json.core.DepartmentJson;
import vn.vnext.sefuri.sf.json.core.MstLaminationJson;

import java.util.List;

/**
 * Created by DungTQ on 6/5/2017.
 */
public class SF0010001Res extends AbstractJson {

    @JsonProperty("departments")
    private List<DepartmentJson> departments;

    @JsonProperty("inprogressDeals")
    private List<DealJson> inprogressDeals;

    @JsonProperty("totalRecords")
    private long totalRecords = 0;

    @JsonProperty("laminationJsons")
    private List<MstLaminationJson> laminationJsons;

    @JsonProperty("systemDate")
    private String systemDate;

    public List<DealJson> getInprogressDeals() {
        return inprogressDeals;
    }

    public void setInprogressDeals(List<DealJson> inprogressDeals) {
        this.inprogressDeals = inprogressDeals;
    }

    public long getTotalRecords() {
        return totalRecords;
    }

    public void setTotalRecords(long totalRecords) {
        this.totalRecords = totalRecords;
    }

    public List<DepartmentJson> getDepartments() {
        return departments;
    }

    public void setDepartments(List<DepartmentJson> departments) {
        this.departments = departments;
    }

    public List<MstLaminationJson> getLaminationJsons() {
        return laminationJsons;
    }

    public void setLaminationJsons(List<MstLaminationJson> laminationJsons) {
        this.laminationJsons = laminationJsons;
    }

    public String getSystemDate() {
        return systemDate;
    }

    public void setSystemDate(String systemDate) {
        this.systemDate = systemDate;
    }
}
