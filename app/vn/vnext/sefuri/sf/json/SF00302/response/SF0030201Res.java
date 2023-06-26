package vn.vnext.sefuri.sf.json.SF00302.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SF00302.model.DealProductJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;
import vn.vnext.sefuri.sf.json.core.*;
import vn.vnext.sefuri.sf.json.SF00302.model.MstPaperJson;
import vn.vnext.sefuri.sf.json.SF00302.model.MstLaminationJson;

import java.util.List;

/**
 * Created by DungTQ on 1/4/2017.
 */
public class SF0030201Res extends AbstractJson {
    @JsonProperty("dealProduct")
    private DealProductJson dealProduct;

    @JsonProperty("shapes")
    private List<MstShapeJson> shapes;

    @JsonProperty("mstColor")
    private List<MstColorJson> mstColor;

    @JsonProperty("mstDieCutting")
    private List<MstDieCuttingJson> mstDieCutting;

    @JsonProperty("mstPacking")
    private List<MstPackingJson> mstPacking;

    @JsonProperty("mstPaper")
    private List<MstPaperJson> mstPaper;

    @JsonProperty("mstPaperTab1")
    private List<MstPaperJson> mstPaperTab1;

    @JsonProperty("mstPaperTab2")
    private List<MstPaperJson> mstPaperTab2;

    @JsonProperty("mstPaperHead")
    private List<MstPaperJson> mstPaperHead;

    @JsonProperty("mstPaperHeadTab1")
    private List<MstPaperJson> mstPaperHeadTab1;

    @JsonProperty("mstPaperHeadTab2")
    private List<MstPaperJson> mstPaperHeadTab2;

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

    @JsonProperty("mstDecorative")
    private List<MstDecorativeJson> mstDecorative;

    @JsonProperty("mstCartonFlute")
    private List<MstCartonJson> mstCarton;

    @JsonProperty("mstSheetSizes")
    private List<MstSheetSizeJson> mstSheetSizes;

    @JsonProperty("mstCartonShipping")
    private List<MstCartonShippingJson> mstCartonShipping;

    @JsonProperty("mstLamination")
    private List<MstLaminationJson> mstLamination;

    @JsonProperty("mstLaminationHead")
    private List<MstLaminationJson> mstLaminationHead;

    public List<MstShapeJson> getShapes() {
        return shapes;
    }

    public void setShapes(List<MstShapeJson> shapes) {
        this.shapes = shapes;
    }

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

    public List<MstPaperJson> getMstPaperHead() {
        return mstPaperHead;
    }

    public void setMstPaperHead(List<MstPaperJson> mstPaperHead) {
        this.mstPaperHead = mstPaperHead;
    }

    public List<MstDecorativeJson> getMstDecorative() {
        return mstDecorative;
    }

    public void setMstDecorative(List<MstDecorativeJson> mstDecorative) {
        this.mstDecorative = mstDecorative;
    }

    public List<MstCartonJson> getMstCarton() {
        return mstCarton;
    }

    public void setMstCarton(List<MstCartonJson> mstCarton) {
        this.mstCarton = mstCarton;
    }

    public List<MstCartonShippingJson> getMstCartonShipping() {
        return mstCartonShipping;
    }

    public void setMstCartonShipping(List<MstCartonShippingJson> mstCartonShipping) {
        this.mstCartonShipping = mstCartonShipping;
    }

    public List<MstLaminationJson> getMstLamination() {
        return mstLamination;
    }

    public void setMstLamination(List<MstLaminationJson> mstLamination) {
        this.mstLamination = mstLamination;
    }

    public List<MstLaminationJson> getMstLaminationHead() {
        return mstLaminationHead;
    }

    public void setMstLaminationHead(List<MstLaminationJson> mstLaminationHead) {
        this.mstLaminationHead = mstLaminationHead;
    }

    public List<MstSheetSizeJson> getMstSheetSizes() {
        return mstSheetSizes;
    }

    public void setMstSheetSizes(List<MstSheetSizeJson> mstSheetSizes) {
        this.mstSheetSizes = mstSheetSizes;
    }

    public List<MstPaperJson> getMstPaperTab2() {
        return mstPaperTab2;
    }

    public void setMstPaperTab2(List<MstPaperJson> mstPaperTab2) {
        this.mstPaperTab2 = mstPaperTab2;
    }

    public List<MstPaperJson> getMstPaperHeadTab2() {
        return mstPaperHeadTab2;
    }

    public void setMstPaperHeadTab2(List<MstPaperJson> mstPaperHeadTab2) {
        this.mstPaperHeadTab2 = mstPaperHeadTab2;
    }

    public List<MstPaperJson> getMstPaperTab1() {
        return mstPaperTab1;
    }

    public void setMstPaperTab1(List<MstPaperJson> mstPaperTab1) {
        this.mstPaperTab1 = mstPaperTab1;
    }

    public List<MstPaperJson> getMstPaperHeadTab1() {
        return mstPaperHeadTab1;
    }

    public void setMstPaperHeadTab1(List<MstPaperJson> mstPaperHeadTab1) {
        this.mstPaperHeadTab1 = mstPaperHeadTab1;
    }
}
