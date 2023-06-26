package vn.vnext.sefuri.sf.module.export.model.r007;

/**
 * Created by username on 9/1/2017.
 */
public class StepModel {
    private Integer id;
    private String code;
    private Integer type;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return id + "," + code + "," + type;
    }
}
