package vn.vnext.sefuri.sf.json.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.core.*;

import java.util.List;

/**
 * Created by DungTQ on 2/8/2017.
 */
public class SF0080101ResultJson {

    @JsonProperty("product_id")
    private Integer product_id;

    @JsonProperty("product_name")
    private String product_name;

    @JsonProperty("customer_name")
    private String customer_name;

    @JsonProperty("selected_shape")
    private Integer selected_shape;

    @JsonProperty("selected_paper")
    private Integer selected_paper;

    @JsonProperty("selected_basis_weight")
    private Integer selected_basis_weight;

    @JsonProperty("selected_sheet_size")
    private Integer selected_sheet_size;

    @JsonProperty("original_sheet_size")
    private MstSheetSizeJson original_sheet_size;

    @JsonProperty("imposition")
    private Integer imposition;

    @JsonProperty("objects")
    private List<DrawingImageJson> objects;

    @JsonProperty("original_shape_params")
    private OriginalShapeParamsJson original_shape_params;

    @JsonProperty("shapes")
    private List<MstShapeJson> shapes;

    @JsonProperty("papers")
    private List<CustomPaperJson> papers;

    @JsonProperty("sheet_sizes")
    private List<MstSheetSizeJson> sheet_sizes;

    public Integer getProduct_id() {
        return product_id;
    }

    public void setProduct_id(Integer product_id) {
        this.product_id = product_id;
    }

    public String getProduct_name() {
        return product_name;
    }

    public void setProduct_name(String product_name) {
        this.product_name = product_name;
    }

    public String getCustomer_name() {
        return customer_name;
    }

    public void setCustomer_name(String customer_name) {
        this.customer_name = customer_name;
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

    public MstSheetSizeJson getOriginal_sheet_size() {
        return original_sheet_size;
    }

    public void setOriginal_sheet_size(MstSheetSizeJson original_sheet_size) {
        this.original_sheet_size = original_sheet_size;
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

    public List<MstShapeJson> getShapes() {
        return shapes;
    }

    public void setShapes(List<MstShapeJson> shapes) {
        this.shapes = shapes;
    }

    public List<CustomPaperJson> getPapers() {
        return papers;
    }

    public void setPapers(List<CustomPaperJson> papers) {
        this.papers = papers;
    }

    public List<MstSheetSizeJson> getSheet_sizes() {
        return sheet_sizes;
    }

    public void setSheet_sizes(List<MstSheetSizeJson> sheet_sizes) {
        this.sheet_sizes = sheet_sizes;
    }
}
