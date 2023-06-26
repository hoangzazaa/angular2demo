package vn.vnext.sefuri.sf.json.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;
import vn.vnext.sefuri.sf.json.core.*;

import java.util.List;

/**
 * Created by DungTQ on 1/4/2017.
 */
public class SF0030201Res extends AbstractJson {
    @JsonProperty("dealProduct")
    private DealProductJson dealProduct;

    @JsonProperty("mstColor")
    private List<MstColorJson> mstColor;

    @JsonProperty("mstDieCutting")
    private List<MstDieCuttingJson> mstDieCutting;

    @JsonProperty("mstPacking")
    private List<MstPackingJson> mstPacking;

    @JsonProperty("mstPaper")
    private List<MstPaperJson> mstPaper;

    @JsonProperty("mstPaste")
    private List<MstPasteJson> mstPaste;

    @JsonProperty("mstShippingCompany")
    private List<MstShippingCompanyJson> mstShippingCompany;

    @JsonProperty("mstShippingCost")
    private List<MstShippingCostJson> mstShippingCost;

    @JsonProperty("mstStamping")
    private List<MstStampingJson> mstStamping;

    @JsonProperty("mstSurfaceTreatment")
    private List<MstSurfaceTreatmentJson> mstSurfaceTreatment;

    @JsonProperty("mstWindow")
    private List<MstWindowJson> mstWindow;

    public DealProductJson getDealProduct() {
        return dealProduct;
    }

    public void setDealProduct(DealProductJson dealProduct) {
        this.dealProduct = dealProduct;
    }

    public List<MstColorJson> getMstColor() {
        return mstColor;
    }

    public void setMstColor(List<MstColorJson> mstColor) {
        this.mstColor = mstColor;
    }

    public List<MstDieCuttingJson> getMstDieCutting() {
        return mstDieCutting;
    }

    public void setMstDieCutting(List<MstDieCuttingJson> mstDieCutting) {
        this.mstDieCutting = mstDieCutting;
    }

    public List<MstPackingJson> getMstPacking() {
        return mstPacking;
    }

    public void setMstPacking(List<MstPackingJson> mstPacking) {
        this.mstPacking = mstPacking;
    }

    public List<MstPaperJson> getMstPaper() {
        return mstPaper;
    }

    public void setMstPaper(List<MstPaperJson> mstPaper) {
        this.mstPaper = mstPaper;
    }

    public List<MstPasteJson> getMstPaste() {
        return mstPaste;
    }

    public void setMstPaste(List<MstPasteJson> mstPaste) {
        this.mstPaste = mstPaste;
    }

    public List<MstShippingCompanyJson> getMstShippingCompany() {
        return mstShippingCompany;
    }

    public void setMstShippingCompany(List<MstShippingCompanyJson> mstShippingCompany) {
        this.mstShippingCompany = mstShippingCompany;
    }

    public List<MstStampingJson> getMstStamping() {
        return mstStamping;
    }

    public void setMstStamping(List<MstStampingJson> mstStamping) {
        this.mstStamping = mstStamping;
    }

    public List<MstSurfaceTreatmentJson> getMstSurfaceTreatment() {
        return mstSurfaceTreatment;
    }

    public void setMstSurfaceTreatment(List<MstSurfaceTreatmentJson> mstSurfaceTreatment) {
        this.mstSurfaceTreatment = mstSurfaceTreatment;
    }

    public List<MstShippingCostJson> getMstShippingCost() {
        return mstShippingCost;
    }

    public void setMstShippingCost(List<MstShippingCostJson> mstShippingCost) {
        this.mstShippingCost = mstShippingCost;
    }

    public List<MstWindowJson> getMstWindow() {
        return mstWindow;
    }

    public void setMstWindow(List<MstWindowJson> mstWindow) {
        this.mstWindow = mstWindow;
    }
}
