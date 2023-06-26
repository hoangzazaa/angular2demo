package vn.vnext.sefuri.sf.json.request;

import com.auth0.jwt.internal.com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;
import vn.vnext.sefuri.sf.json.core.DrawingImageJson;
import vn.vnext.sefuri.sf.json.core.MstSheetSizeJson;
import vn.vnext.sefuri.sf.json.core.OriginalShapeParamsJson;

import java.util.List;

/**
 * Created by DungTQ on 2/8/2017.
 */
public class SF0080102Req extends AbstractJson {

    @JsonProperty("product_id")
    private Integer product_id;

    @JsonProperty("selected_shape")
    private Integer selected_shape;

    @JsonProperty("selected_paper")
    private Integer selected_paper;

    @JsonProperty("selected_basis_weight")
    private Integer selected_basis_weight;

    @JsonProperty("selected_sheet_size")
    private Integer selected_sheet_size;

    @JsonProperty("sheet_size")
    private MstSheetSizeJson sheet_size;

    @JsonProperty("imposition")
    private Integer imposition;

    @JsonProperty("objects")
    private List<DrawingImageJson> objects;

    @JsonProperty("original_shape_params")
    private OriginalShapeParamsJson original_shape_params;

    public Integer getProduct_id() {
        return product_id;
    }

    public void setProduct_id(Integer product_id) {
        this.product_id = product_id;
    }

    public Integer getSelected_shape() {
        return selected_shape;
    }

    public void setSelected_shape(Integer selected_shape) {
        this.selected_shape = selected_shape;
    }

    public Integer getSelected_paper() {
        return selected_paper;
    }

    public void setSelected_paper(Integer selected_paper) {
        this.selected_paper = selected_paper;
    }

    public Integer getSelected_basis_weight() {
        return selected_basis_weight;
    }

    public void setSelected_basis_weight(Integer selected_basis_weight) {
        this.selected_basis_weight = selected_basis_weight;
    }

    public Integer getSelected_sheet_size() {
        return selected_sheet_size;
    }

    public void setSelected_sheet_size(Integer selected_sheet_size) {
        this.selected_sheet_size = selected_sheet_size;
    }

    public MstSheetSizeJson getSheet_size() {
        return sheet_size;
    }

    public void setSheet_size(MstSheetSizeJson sheet_size) {
        this.sheet_size = sheet_size;
    }

    public Integer getImposition() {
        return imposition;
    }

    public void setImposition(Integer imposition) {
        this.imposition = imposition;
    }

    public List<DrawingImageJson> getObjects() {
        return objects;
    }

    public void setObjects(List<DrawingImageJson> objects) {
        this.objects = objects;
    }

    public OriginalShapeParamsJson getOriginal_shape_params() {
        return original_shape_params;
    }

    public void setOriginal_shape_params(OriginalShapeParamsJson original_shape_params) {
        this.original_shape_params = original_shape_params;
    }
}
