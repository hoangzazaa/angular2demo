package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.dto.ProductOutputDto;
import java.math.BigDecimal;
import java.util.List;

/**
 * Contain products output in deal. 
 * @author vupt
 */
public class ProductOutputJson  extends BaseJson<ProductOutputDto> {

	//紙器用板紙代 - 連量
	@JsonProperty("paperActualWeight")
	private BigDecimal paperActualWeight;

	//紙器用板紙代 - 枚単価
	@JsonProperty("paperUnitPrice")
	private BigDecimal paperUnitPrice;

	//紙器用板紙代 - 板紙代計
	@JsonProperty("paperTotalCost")
	private BigDecimal paperTotalCost;

	//印刷代　- 刷版代 Front
	@JsonProperty("colorPlateCostF")
	private BigDecimal colorPlateCostF;

	//印刷代　- 刷版代 Back
	@JsonProperty("colorPlateCostB")
	private BigDecimal colorPlateCostB;

	//印刷代 - 印刷ロス Front
	@JsonProperty("colorPrintLossF")
	private BigDecimal colorPrintLossF;

	//印刷代 - 印刷ロス Back
	@JsonProperty("colorPrintLossB")
	private BigDecimal colorPrintLossB;

	//印刷代 - 一律 Front
	@JsonProperty("colorPrintPerPacketCostF")
	private BigDecimal colorPrintPerPacketCostF;

	//印刷代 - 一律 Back
	@JsonProperty("colorPrintPerPacketCostB")
	private BigDecimal colorPrintPerPacketCostB;

	//印刷代 - 基本料 Front
	@JsonProperty("colorPrintBasicCostF")
	private BigDecimal colorPrintBasicCostF;

	//印刷代 - 基本料 Back
	@JsonProperty("colorPrintBasicCostB")
	private BigDecimal colorPrintBasicCostB;

	//印刷代 - 色通工賃 Front
	@JsonProperty("colorPrintThroughWageF")
	private BigDecimal colorPrintThroughWageF;

	//印刷代 - 色通工賃 Back
	@JsonProperty("colorPrintThroughWageB")
	private BigDecimal colorPrintThroughWageB;

	//印刷代 - 印刷割増（色） Front
	@JsonProperty("colorPrintSpecialCostF")
	private BigDecimal colorPrintSpecialCostF;

	//印刷代 - 印刷割増（色） Back
	@JsonProperty("colorPrintSpecialCostB")
	private BigDecimal colorPrintSpecialCostB;

	//印刷代 - 印刷代計 Front
	@JsonProperty("colorPrintTotalCostF")
	private BigDecimal colorPrintTotalCostF;

	//印刷代 - 印刷代計 Back
	@JsonProperty("colorPrintTotalCostB")
	private BigDecimal colorPrintTotalCostB;

	//表面加工 - 基本料 Front
	@JsonProperty("surfaceTreatmentBasicCostF")
	private String surfaceTreatmentBasicCostF;

	//表面加工 - 基本料 Back
	@JsonProperty("surfaceTreatmentBasicCostB")
	private String surfaceTreatmentBasicCostB;

	//表面加工 - 通工賃 Front
	@JsonProperty("surfaceTreatmentThroughWageF")
	private String surfaceTreatmentThroughWageF;

	//表面加工 - 通工賃 Back
	@JsonProperty("surfaceTreatmentThroughWageB")
	private String surfaceTreatmentThroughWageB;

	//表面加工  - 表面加工代計 Front
	@JsonProperty("surfaceTreatmentTotalCostF")
	private BigDecimal surfaceTreatmentTotalCostF;

	//表面加工  - 表面加工代計 Back
	@JsonProperty("surfaceTreatmentTotalCostB")
	private BigDecimal surfaceTreatmentTotalCostB;

	//エンボス - 基本料
	@JsonProperty("embossingBasicCost")
	private BigDecimal embossingBasicCost;

	//エンボス - 通工賃
	@JsonProperty("embossingThroughWage")
	private BigDecimal embossingThroughWage;

	//エンボス - エンボス代計
	@JsonProperty("embossingTotalCost")
	private BigDecimal embossingTotalCost;

	//片段ラミネート - 紙代㎡＠
	@JsonProperty("laminationUnitPrice")
	private BigDecimal laminationUnitPrice;

	//片段ラミネート - シート代
	@JsonProperty("laminationSheetCost")
	private BigDecimal laminationSheetCost;

	//片段ラミネート - ラミネート代計
	@JsonProperty("laminationTotalCost")
	private BigDecimal laminationTotalCost;

	//打抜き - 打抜ロス
	@JsonProperty("dieCuttingLoss")
	private BigDecimal dieCuttingLoss;

	//打抜き - 基本料
	@JsonProperty("dieCuttingBasicCost")
	private BigDecimal dieCuttingBasicCost;

	//打抜き - 通工賃
	@JsonProperty("dieCuttingThroughWage")
	private BigDecimal dieCuttingThroughWage;

	//打抜き - 打抜代計
	@JsonProperty("dieCuttingTotalCost")
	private BigDecimal dieCuttingTotalCost;

	//箔押し代 - 基本料
	@JsonProperty("stampingBasicCost")
	private BigDecimal stampingBasicCost;

	//箔押し代 - 工賃
	@JsonProperty("stampingThroughWage")
	private BigDecimal stampingThroughWage;

	//箔押し代 - 箔押し代
	@JsonProperty("stampingTotalCost")
	private BigDecimal stampingTotalCost;

	//窓貼り代 - 材料代
	@JsonProperty("windowMaterialFee")
	private BigDecimal windowMaterialFee;

	//窓貼り代 - 窓貼代計
	@JsonProperty("windowTotalCost")
	private BigDecimal windowTotalCost;

	//貼り - 貼ロス
	@JsonProperty("pasteLoss")
	private BigDecimal pasteLoss;

	//貼り - 基本料
	@JsonProperty("pasteBasicCost")
	private BigDecimal pasteBasicCost;

	//貼り - 工賃
	@JsonProperty("pasteThroughWage")
	private BigDecimal pasteThroughWage;

	//貼り - 貼り代計
	@JsonProperty("pasteTotalCost")
	private BigDecimal pasteTotalCost;

	//小計
	@JsonProperty("subtotal")
	private BigDecimal subtotal;

	//販管・配送 - 販売管理費
	@JsonProperty("managementCost")
	private BigDecimal managementCost;

	//販管・配送 - 運賃
	@JsonProperty("fareCost")
	private BigDecimal fareCost;

	//販管・配送 - 運賃（路線便）
	@JsonProperty("fareLineService")
	private BigDecimal fareLineService;

	//見積額 - 合計
	@JsonProperty("estimatedTotal")
	private BigDecimal estimatedTotal;

	//見積額 - 見積単価
	@JsonProperty("estimatedUnitPrice")
	private BigDecimal estimatedUnitPrice;

	//productId
	@JsonProperty("productId")
	private Integer productId;

	//検品
	@JsonProperty("inspection")
	private BigDecimal inspection;

	//梱包
	@JsonProperty("packing")
	private BigDecimal packing;

	//lot
	@JsonProperty("lot")
	private Integer lot;

	//primaryFlag
	@JsonProperty("primaryFlag")
	private Integer primaryFlag;
	@JsonProperty("cartonMaterialCost")
	private BigDecimal cartonMaterialCost;
	@JsonProperty("cartonMaterialLoss")
	private BigDecimal cartonMaterialLoss;
	@JsonProperty("cartonMaterialLamination")
	private BigDecimal cartonMaterialLamination;
	@JsonProperty("cartonMaterialUnitPrice")
	private BigDecimal cartonMaterialUnitPrice;
	@JsonProperty("cartonMaterialTotalCost")
	private BigDecimal cartonMaterialTotalCost;
	@JsonProperty("cartonShipFare")
	private BigDecimal cartonShipFare;
	@JsonProperty("cartonShipTotal")
	private BigDecimal cartonShipTotal;
	@JsonProperty("cartonUsageColorCost")
	private BigDecimal cartonUsageColorCost;
	@JsonProperty("cartonTapeCut")
	private BigDecimal cartonTapeCut;
	@JsonProperty("cartonLinerCut")
	private BigDecimal cartonLinerCut;
	@JsonProperty("cartonHandProcessing")
	private BigDecimal cartonHandProcessing;
	@JsonProperty("cartonWaterRepellent")
	private BigDecimal cartonWaterRepellent;
	@JsonProperty("cartonProcessingUnitPrice")
	private BigDecimal cartonProcessingUnitPrice;
	@JsonProperty("cartonProcessingTotalCost")
	private BigDecimal cartonProcessingTotalCost;
	@JsonProperty("supplierLot")
	private Integer supplierLot;
	@JsonProperty("digitalBasicCost")
	private BigDecimal digitalBasicCost;
	@JsonProperty("digitalThroughWage")
	private BigDecimal digitalThroughWage;
	@JsonProperty("digitalTotalCost")
	private BigDecimal digitalTotalCost;
	//productRsProductOutput
	@JsonProperty("product")
	private ProductJson product;
	//productOutputRsOfffer
	@JsonProperty("offers")
	private List<OfferJson> offers;


	/**
	 * Get paperActualWeight
	 *
	 * @return paperActualWeight
	 */
	public BigDecimal getPaperActualWeight(){
		return paperActualWeight;
	}

	/**
	 * Set paperActualWeight
	 *
	 * @param paperActualWeight BigDecimal
	 */
	public void setPaperActualWeight(BigDecimal paperActualWeight) {
		this.paperActualWeight = paperActualWeight;
	}

	/**
	 * Get paperUnitPrice
	 *
	 * @return paperUnitPrice
	 */
	public BigDecimal getPaperUnitPrice(){
		return paperUnitPrice;
	}

	/**
	 * Set paperUnitPrice
	 *
	 * @param paperUnitPrice BigDecimal
	 */
	public void setPaperUnitPrice(BigDecimal paperUnitPrice) {
		this.paperUnitPrice = paperUnitPrice;
	}

	/**
	 * Get paperTotalCost
	 *
	 * @return paperTotalCost
	 */
	public BigDecimal getPaperTotalCost(){
		return paperTotalCost;
	}

	/**
	 * Set paperTotalCost
	 *
	 * @param paperTotalCost BigDecimal
	 */
	public void setPaperTotalCost(BigDecimal paperTotalCost) {
		this.paperTotalCost = paperTotalCost;
	}

	/**
	 * Get colorPlateCostF
	 *
	 * @return colorPlateCostF
	 */
	public BigDecimal getColorPlateCostF(){
		return colorPlateCostF;
	}

	/**
	 * Set colorPlateCostF
	 *
	 * @param colorPlateCostF BigDecimal
	 */
	public void setColorPlateCostF(BigDecimal colorPlateCostF) {
		this.colorPlateCostF = colorPlateCostF;
	}

	/**
	 * Get colorPlateCostB
	 *
	 * @return colorPlateCostB
	 */
	public BigDecimal getColorPlateCostB(){
		return colorPlateCostB;
	}

	/**
	 * Set colorPlateCostB
	 *
	 * @param colorPlateCostB BigDecimal
	 */
	public void setColorPlateCostB(BigDecimal colorPlateCostB) {
		this.colorPlateCostB = colorPlateCostB;
	}

	/**
	 * Get colorPrintLossF
	 *
	 * @return colorPrintLossF
	 */
	public BigDecimal getColorPrintLossF(){
		return colorPrintLossF;
	}

	/**
	 * Set colorPrintLossF
	 *
	 * @param colorPrintLossF BigDecimal
	 */
	public void setColorPrintLossF(BigDecimal colorPrintLossF) {
		this.colorPrintLossF = colorPrintLossF;
	}

	/**
	 * Get colorPrintLossB
	 *
	 * @return colorPrintLossB
	 */
	public BigDecimal getColorPrintLossB(){
		return colorPrintLossB;
	}

	/**
	 * Set colorPrintLossB
	 *
	 * @param colorPrintLossB BigDecimal
	 */
	public void setColorPrintLossB(BigDecimal colorPrintLossB) {
		this.colorPrintLossB = colorPrintLossB;
	}

	/**
	 * Get colorPrintPerPacketCostF
	 *
	 * @return colorPrintPerPacketCostF
	 */
	public BigDecimal getColorPrintPerPacketCostF(){
		return colorPrintPerPacketCostF;
	}

	/**
	 * Set colorPrintPerPacketCostF
	 *
	 * @param colorPrintPerPacketCostF BigDecimal
	 */
	public void setColorPrintPerPacketCostF(BigDecimal colorPrintPerPacketCostF) {
		this.colorPrintPerPacketCostF = colorPrintPerPacketCostF;
	}

	/**
	 * Get colorPrintPerPacketCostB
	 *
	 * @return colorPrintPerPacketCostB
	 */
	public BigDecimal getColorPrintPerPacketCostB(){
		return colorPrintPerPacketCostB;
	}

	/**
	 * Set colorPrintPerPacketCostB
	 *
	 * @param colorPrintPerPacketCostB BigDecimal
	 */
	public void setColorPrintPerPacketCostB(BigDecimal colorPrintPerPacketCostB) {
		this.colorPrintPerPacketCostB = colorPrintPerPacketCostB;
	}

	/**
	 * Get colorPrintBasicCostF
	 *
	 * @return colorPrintBasicCostF
	 */
	public BigDecimal getColorPrintBasicCostF(){
		return colorPrintBasicCostF;
	}

	/**
	 * Set colorPrintBasicCostF
	 *
	 * @param colorPrintBasicCostF BigDecimal
	 */
	public void setColorPrintBasicCostF(BigDecimal colorPrintBasicCostF) {
		this.colorPrintBasicCostF = colorPrintBasicCostF;
	}

	/**
	 * Get colorPrintBasicCostB
	 *
	 * @return colorPrintBasicCostB
	 */
	public BigDecimal getColorPrintBasicCostB(){
		return colorPrintBasicCostB;
	}

	/**
	 * Set colorPrintBasicCostB
	 *
	 * @param colorPrintBasicCostB BigDecimal
	 */
	public void setColorPrintBasicCostB(BigDecimal colorPrintBasicCostB) {
		this.colorPrintBasicCostB = colorPrintBasicCostB;
	}

	/**
	 * Get colorPrintThroughWageF
	 *
	 * @return colorPrintThroughWageF
	 */
	public BigDecimal getColorPrintThroughWageF(){
		return colorPrintThroughWageF;
	}

	/**
	 * Set colorPrintThroughWageF
	 *
	 * @param colorPrintThroughWageF BigDecimal
	 */
	public void setColorPrintThroughWageF(BigDecimal colorPrintThroughWageF) {
		this.colorPrintThroughWageF = colorPrintThroughWageF;
	}

	/**
	 * Get colorPrintThroughWageB
	 *
	 * @return colorPrintThroughWageB
	 */
	public BigDecimal getColorPrintThroughWageB(){
		return colorPrintThroughWageB;
	}

	/**
	 * Set colorPrintThroughWageB
	 *
	 * @param colorPrintThroughWageB BigDecimal
	 */
	public void setColorPrintThroughWageB(BigDecimal colorPrintThroughWageB) {
		this.colorPrintThroughWageB = colorPrintThroughWageB;
	}

	/**
	 * Get colorPrintSpecialCostF
	 *
	 * @return colorPrintSpecialCostF
	 */
	public BigDecimal getColorPrintSpecialCostF(){
		return colorPrintSpecialCostF;
	}

	/**
	 * Set colorPrintSpecialCostF
	 *
	 * @param colorPrintSpecialCostF BigDecimal
	 */
	public void setColorPrintSpecialCostF(BigDecimal colorPrintSpecialCostF) {
		this.colorPrintSpecialCostF = colorPrintSpecialCostF;
	}

	/**
	 * Get colorPrintSpecialCostB
	 *
	 * @return colorPrintSpecialCostB
	 */
	public BigDecimal getColorPrintSpecialCostB(){
		return colorPrintSpecialCostB;
	}

	/**
	 * Set colorPrintSpecialCostB
	 *
	 * @param colorPrintSpecialCostB BigDecimal
	 */
	public void setColorPrintSpecialCostB(BigDecimal colorPrintSpecialCostB) {
		this.colorPrintSpecialCostB = colorPrintSpecialCostB;
	}

	/**
	 * Get colorPrintTotalCostF
	 *
	 * @return colorPrintTotalCostF
	 */
	public BigDecimal getColorPrintTotalCostF(){
		return colorPrintTotalCostF;
	}

	/**
	 * Set colorPrintTotalCostF
	 *
	 * @param colorPrintTotalCostF BigDecimal
	 */
	public void setColorPrintTotalCostF(BigDecimal colorPrintTotalCostF) {
		this.colorPrintTotalCostF = colorPrintTotalCostF;
	}

	/**
	 * Get colorPrintTotalCostB
	 *
	 * @return colorPrintTotalCostB
	 */
	public BigDecimal getColorPrintTotalCostB(){
		return colorPrintTotalCostB;
	}

	/**
	 * Set colorPrintTotalCostB
	 *
	 * @param colorPrintTotalCostB BigDecimal
	 */
	public void setColorPrintTotalCostB(BigDecimal colorPrintTotalCostB) {
		this.colorPrintTotalCostB = colorPrintTotalCostB;
	}

	/**
	 * Get surfaceTreatmentBasicCostF
	 *
	 * @return surfaceTreatmentBasicCostF
	 */
	public String getSurfaceTreatmentBasicCostF(){
		return surfaceTreatmentBasicCostF;
	}

	/**
	 * Set surfaceTreatmentBasicCostF
	 *
	 * @param surfaceTreatmentBasicCostF String
	 */
	public void setSurfaceTreatmentBasicCostF(String surfaceTreatmentBasicCostF) {
		this.surfaceTreatmentBasicCostF = surfaceTreatmentBasicCostF;
	}

	/**
	 * Get surfaceTreatmentBasicCostB
	 *
	 * @return surfaceTreatmentBasicCostB
	 */
	public String getSurfaceTreatmentBasicCostB(){
		return surfaceTreatmentBasicCostB;
	}

	/**
	 * Set surfaceTreatmentBasicCostB
	 *
	 * @param surfaceTreatmentBasicCostB String
	 */
	public void setSurfaceTreatmentBasicCostB(String surfaceTreatmentBasicCostB) {
		this.surfaceTreatmentBasicCostB = surfaceTreatmentBasicCostB;
	}

	/**
	 * Get surfaceTreatmentThroughWageF
	 *
	 * @return surfaceTreatmentThroughWageF
	 */
	public String getSurfaceTreatmentThroughWageF(){
		return surfaceTreatmentThroughWageF;
	}

	/**
	 * Set surfaceTreatmentThroughWageF
	 *
	 * @param surfaceTreatmentThroughWageF String
	 */
	public void setSurfaceTreatmentThroughWageF(String surfaceTreatmentThroughWageF) {
		this.surfaceTreatmentThroughWageF = surfaceTreatmentThroughWageF;
	}

	/**
	 * Get surfaceTreatmentThroughWageB
	 *
	 * @return surfaceTreatmentThroughWageB
	 */
	public String getSurfaceTreatmentThroughWageB(){
		return surfaceTreatmentThroughWageB;
	}

	/**
	 * Set surfaceTreatmentThroughWageB
	 *
	 * @param surfaceTreatmentThroughWageB String
	 */
	public void setSurfaceTreatmentThroughWageB(String surfaceTreatmentThroughWageB) {
		this.surfaceTreatmentThroughWageB = surfaceTreatmentThroughWageB;
	}

	/**
	 * Get surfaceTreatmentTotalCostF
	 *
	 * @return surfaceTreatmentTotalCostF
	 */
	public BigDecimal getSurfaceTreatmentTotalCostF(){
		return surfaceTreatmentTotalCostF;
	}

	/**
	 * Set surfaceTreatmentTotalCostF
	 *
	 * @param surfaceTreatmentTotalCostF BigDecimal
	 */
	public void setSurfaceTreatmentTotalCostF(BigDecimal surfaceTreatmentTotalCostF) {
		this.surfaceTreatmentTotalCostF = surfaceTreatmentTotalCostF;
	}

	/**
	 * Get surfaceTreatmentTotalCostB
	 *
	 * @return surfaceTreatmentTotalCostB
	 */
	public BigDecimal getSurfaceTreatmentTotalCostB(){
		return surfaceTreatmentTotalCostB;
	}

	/**
	 * Set surfaceTreatmentTotalCostB
	 *
	 * @param surfaceTreatmentTotalCostB BigDecimal
	 */
	public void setSurfaceTreatmentTotalCostB(BigDecimal surfaceTreatmentTotalCostB) {
		this.surfaceTreatmentTotalCostB = surfaceTreatmentTotalCostB;
	}

	/**
	 * Get embossingBasicCost
	 *
	 * @return embossingBasicCost
	 */
	public BigDecimal getEmbossingBasicCost(){
		return embossingBasicCost;
	}

	/**
	 * Set embossingBasicCost
	 *
	 * @param embossingBasicCost BigDecimal
	 */
	public void setEmbossingBasicCost(BigDecimal embossingBasicCost) {
		this.embossingBasicCost = embossingBasicCost;
	}

	/**
	 * Get embossingThroughWage
	 *
	 * @return embossingThroughWage
	 */
	public BigDecimal getEmbossingThroughWage(){
		return embossingThroughWage;
	}

	/**
	 * Set embossingThroughWage
	 *
	 * @param embossingThroughWage BigDecimal
	 */
	public void setEmbossingThroughWage(BigDecimal embossingThroughWage) {
		this.embossingThroughWage = embossingThroughWage;
	}

	/**
	 * Get embossingTotalCost
	 *
	 * @return embossingTotalCost
	 */
	public BigDecimal getEmbossingTotalCost(){
		return embossingTotalCost;
	}

	/**
	 * Set embossingTotalCost
	 *
	 * @param embossingTotalCost BigDecimal
	 */
	public void setEmbossingTotalCost(BigDecimal embossingTotalCost) {
		this.embossingTotalCost = embossingTotalCost;
	}

	/**
	 * Get laminationUnitPrice
	 *
	 * @return laminationUnitPrice
	 */
	public BigDecimal getLaminationUnitPrice(){
		return laminationUnitPrice;
	}

	/**
	 * Set laminationUnitPrice
	 *
	 * @param laminationUnitPrice BigDecimal
	 */
	public void setLaminationUnitPrice(BigDecimal laminationUnitPrice) {
		this.laminationUnitPrice = laminationUnitPrice;
	}

	/**
	 * Get laminationSheetCost
	 *
	 * @return laminationSheetCost
	 */
	public BigDecimal getLaminationSheetCost(){
		return laminationSheetCost;
	}

	/**
	 * Set laminationSheetCost
	 *
	 * @param laminationSheetCost BigDecimal
	 */
	public void setLaminationSheetCost(BigDecimal laminationSheetCost) {
		this.laminationSheetCost = laminationSheetCost;
	}

	/**
	 * Get laminationTotalCost
	 *
	 * @return laminationTotalCost
	 */
	public BigDecimal getLaminationTotalCost(){
		return laminationTotalCost;
	}

	/**
	 * Set laminationTotalCost
	 *
	 * @param laminationTotalCost BigDecimal
	 */
	public void setLaminationTotalCost(BigDecimal laminationTotalCost) {
		this.laminationTotalCost = laminationTotalCost;
	}

	/**
	 * Get dieCuttingLoss
	 *
	 * @return dieCuttingLoss
	 */
	public BigDecimal getDieCuttingLoss(){
		return dieCuttingLoss;
	}

	/**
	 * Set dieCuttingLoss
	 *
	 * @param dieCuttingLoss BigDecimal
	 */
	public void setDieCuttingLoss(BigDecimal dieCuttingLoss) {
		this.dieCuttingLoss = dieCuttingLoss;
	}

	/**
	 * Get dieCuttingBasicCost
	 *
	 * @return dieCuttingBasicCost
	 */
	public BigDecimal getDieCuttingBasicCost(){
		return dieCuttingBasicCost;
	}

	/**
	 * Set dieCuttingBasicCost
	 *
	 * @param dieCuttingBasicCost BigDecimal
	 */
	public void setDieCuttingBasicCost(BigDecimal dieCuttingBasicCost) {
		this.dieCuttingBasicCost = dieCuttingBasicCost;
	}

	/**
	 * Get dieCuttingThroughWage
	 *
	 * @return dieCuttingThroughWage
	 */
	public BigDecimal getDieCuttingThroughWage(){
		return dieCuttingThroughWage;
	}

	/**
	 * Set dieCuttingThroughWage
	 *
	 * @param dieCuttingThroughWage BigDecimal
	 */
	public void setDieCuttingThroughWage(BigDecimal dieCuttingThroughWage) {
		this.dieCuttingThroughWage = dieCuttingThroughWage;
	}

	/**
	 * Get dieCuttingTotalCost
	 *
	 * @return dieCuttingTotalCost
	 */
	public BigDecimal getDieCuttingTotalCost(){
		return dieCuttingTotalCost;
	}

	/**
	 * Set dieCuttingTotalCost
	 *
	 * @param dieCuttingTotalCost BigDecimal
	 */
	public void setDieCuttingTotalCost(BigDecimal dieCuttingTotalCost) {
		this.dieCuttingTotalCost = dieCuttingTotalCost;
	}

	/**
	 * Get stampingBasicCost
	 *
	 * @return stampingBasicCost
	 */
	public BigDecimal getStampingBasicCost(){
		return stampingBasicCost;
	}

	/**
	 * Set stampingBasicCost
	 *
	 * @param stampingBasicCost BigDecimal
	 */
	public void setStampingBasicCost(BigDecimal stampingBasicCost) {
		this.stampingBasicCost = stampingBasicCost;
	}

	/**
	 * Get stampingThroughWage
	 *
	 * @return stampingThroughWage
	 */
	public BigDecimal getStampingThroughWage(){
		return stampingThroughWage;
	}

	/**
	 * Set stampingThroughWage
	 *
	 * @param stampingThroughWage BigDecimal
	 */
	public void setStampingThroughWage(BigDecimal stampingThroughWage) {
		this.stampingThroughWage = stampingThroughWage;
	}

	/**
	 * Get stampingTotalCost
	 *
	 * @return stampingTotalCost
	 */
	public BigDecimal getStampingTotalCost(){
		return stampingTotalCost;
	}

	/**
	 * Set stampingTotalCost
	 *
	 * @param stampingTotalCost BigDecimal
	 */
	public void setStampingTotalCost(BigDecimal stampingTotalCost) {
		this.stampingTotalCost = stampingTotalCost;
	}

	/**
	 * Get windowMaterialFee
	 *
	 * @return windowMaterialFee
	 */
	public BigDecimal getWindowMaterialFee(){
		return windowMaterialFee;
	}

	/**
	 * Set windowMaterialFee
	 *
	 * @param windowMaterialFee BigDecimal
	 */
	public void setWindowMaterialFee(BigDecimal windowMaterialFee) {
		this.windowMaterialFee = windowMaterialFee;
	}

	/**
	 * Get windowTotalCost
	 *
	 * @return windowTotalCost
	 */
	public BigDecimal getWindowTotalCost(){
		return windowTotalCost;
	}

	/**
	 * Set windowTotalCost
	 *
	 * @param windowTotalCost BigDecimal
	 */
	public void setWindowTotalCost(BigDecimal windowTotalCost) {
		this.windowTotalCost = windowTotalCost;
	}

	/**
	 * Get pasteLoss
	 *
	 * @return pasteLoss
	 */
	public BigDecimal getPasteLoss(){
		return pasteLoss;
	}

	/**
	 * Set pasteLoss
	 *
	 * @param pasteLoss BigDecimal
	 */
	public void setPasteLoss(BigDecimal pasteLoss) {
		this.pasteLoss = pasteLoss;
	}

	/**
	 * Get pasteBasicCost
	 *
	 * @return pasteBasicCost
	 */
	public BigDecimal getPasteBasicCost(){
		return pasteBasicCost;
	}

	/**
	 * Set pasteBasicCost
	 *
	 * @param pasteBasicCost BigDecimal
	 */
	public void setPasteBasicCost(BigDecimal pasteBasicCost) {
		this.pasteBasicCost = pasteBasicCost;
	}

	/**
	 * Get pasteThroughWage
	 *
	 * @return pasteThroughWage
	 */
	public BigDecimal getPasteThroughWage(){
		return pasteThroughWage;
	}

	/**
	 * Set pasteThroughWage
	 *
	 * @param pasteThroughWage BigDecimal
	 */
	public void setPasteThroughWage(BigDecimal pasteThroughWage) {
		this.pasteThroughWage = pasteThroughWage;
	}

	/**
	 * Get pasteTotalCost
	 *
	 * @return pasteTotalCost
	 */
	public BigDecimal getPasteTotalCost(){
		return pasteTotalCost;
	}

	/**
	 * Set pasteTotalCost
	 *
	 * @param pasteTotalCost BigDecimal
	 */
	public void setPasteTotalCost(BigDecimal pasteTotalCost) {
		this.pasteTotalCost = pasteTotalCost;
	}

	/**
	 * Get subtotal
	 *
	 * @return subtotal
	 */
	public BigDecimal getSubtotal(){
		return subtotal;
	}

	/**
	 * Set subtotal
	 *
	 * @param subtotal BigDecimal
	 */
	public void setSubtotal(BigDecimal subtotal) {
		this.subtotal = subtotal;
	}

	/**
	 * Get managementCost
	 *
	 * @return managementCost
	 */
	public BigDecimal getManagementCost(){
		return managementCost;
	}

	/**
	 * Set managementCost
	 *
	 * @param managementCost BigDecimal
	 */
	public void setManagementCost(BigDecimal managementCost) {
		this.managementCost = managementCost;
	}

	/**
	 * Get fareCost
	 *
	 * @return fareCost
	 */
	public BigDecimal getFareCost(){
		return fareCost;
	}

	/**
	 * Set fareCost
	 *
	 * @param fareCost BigDecimal
	 */
	public void setFareCost(BigDecimal fareCost) {
		this.fareCost = fareCost;
	}

	/**
	 * Get fareLineService
	 *
	 * @return fareLineService
	 */
	public BigDecimal getFareLineService(){
		return fareLineService;
	}

	/**
	 * Set fareLineService
	 *
	 * @param fareLineService BigDecimal
	 */
	public void setFareLineService(BigDecimal fareLineService) {
		this.fareLineService = fareLineService;
	}

	/**
	 * Get estimatedTotal
	 *
	 * @return estimatedTotal
	 */
	public BigDecimal getEstimatedTotal(){
		return estimatedTotal;
	}

	/**
	 * Set estimatedTotal
	 *
	 * @param estimatedTotal BigDecimal
	 */
	public void setEstimatedTotal(BigDecimal estimatedTotal) {
		this.estimatedTotal = estimatedTotal;
	}

	/**
	 * Get estimatedUnitPrice
	 *
	 * @return estimatedUnitPrice
	 */
	public BigDecimal getEstimatedUnitPrice(){
		return estimatedUnitPrice;
	}

	/**
	 * Set estimatedUnitPrice
	 *
	 * @param estimatedUnitPrice BigDecimal
	 */
	public void setEstimatedUnitPrice(BigDecimal estimatedUnitPrice) {
		this.estimatedUnitPrice = estimatedUnitPrice;
	}

	/**
	 * Get productId
	 *
	 * @return productId
	 */
	public Integer getProductId(){
		return productId;
	}

	/**
	 * Set productId
	 *
	 * @param productId Integer
	 */
	public void setProductId(Integer productId) {
		this.productId = productId;
	}

	/**
	 * Get inspection
	 *
	 * @return inspection
	 */
	public BigDecimal getInspection(){
		return inspection;
	}

	/**
	 * Set inspection
	 *
	 * @param inspection BigDecimal
	 */
	public void setInspection(BigDecimal inspection) {
		this.inspection = inspection;
	}

	/**
	 * Get packing
	 *
	 * @return packing
	 */
	public BigDecimal getPacking(){
		return packing;
	}

	/**
	 * Set packing
	 *
	 * @param packing BigDecimal
	 */
	public void setPacking(BigDecimal packing) {
		this.packing = packing;
	}

	/**
	 * Get lot
	 *
	 * @return lot
	 */
	public Integer getLot(){
		return lot;
	}

	/**
	 * Set lot
	 *
	 * @param lot Integer
	 */
	public void setLot(Integer lot) {
		this.lot = lot;
	}

	/**
	 * Get primaryFlag
	 *
	 * @return primaryFlag
	 */
	public Integer getPrimaryFlag(){
		return primaryFlag;
	}

	/**
	 * Set primaryFlag
	 *
	 * @param primaryFlag Integer
	 */
	public void setPrimaryFlag(Integer primaryFlag) {
		this.primaryFlag = primaryFlag;
	}

	/**
	 * Get product
	 *
	 * @return product
	 */
	public ProductJson getProduct(){
		return product;
	}

	/**
	 * Set product
	 *
	 * @param product ProductJson
	 */
	public void setProduct(ProductJson product) {
		this.product = product;
	}

	/**
	 * Get offers
	 *
	 * @return offers
	 */
	public List<OfferJson> getOffers(){
		return offers;
	}

	/**
	 * Set offers
	 *
	 * @param offers List<OfferJson>
	 */
	public void setOffers(List<OfferJson> offers) {
		this.offers = offers;
	}

	public BigDecimal getCartonMaterialCost() {
		return cartonMaterialCost;
	}

	public void setCartonMaterialCost(BigDecimal cartonMaterialCost) {
		this.cartonMaterialCost = cartonMaterialCost;
	}

	public BigDecimal getCartonMaterialLoss() {
		return cartonMaterialLoss;
	}

	public void setCartonMaterialLoss(BigDecimal cartonMaterialLoss) {
		this.cartonMaterialLoss = cartonMaterialLoss;
	}

	public BigDecimal getCartonMaterialLamination() {
		return cartonMaterialLamination;
	}

	public void setCartonMaterialLamination(BigDecimal cartonMaterialLamination) {
		this.cartonMaterialLamination = cartonMaterialLamination;
	}

	public BigDecimal getCartonMaterialUnitPrice() {
		return cartonMaterialUnitPrice;
	}

	public void setCartonMaterialUnitPrice(BigDecimal cartonMaterialUnitPrice) {
		this.cartonMaterialUnitPrice = cartonMaterialUnitPrice;
	}

	public BigDecimal getCartonMaterialTotalCost() {
		return cartonMaterialTotalCost;
	}

	public void setCartonMaterialTotalCost(BigDecimal cartonMaterialTotalCost) {
		this.cartonMaterialTotalCost = cartonMaterialTotalCost;
	}

	public BigDecimal getCartonShipFare() {
		return cartonShipFare;
	}

	public void setCartonShipFare(BigDecimal cartonShipFare) {
		this.cartonShipFare = cartonShipFare;
	}

	public BigDecimal getCartonShipTotal() {
		return cartonShipTotal;
	}

	public void setCartonShipTotal(BigDecimal cartonShipTotal) {
		this.cartonShipTotal = cartonShipTotal;
	}

	public BigDecimal getCartonUsageColorCost() {
		return cartonUsageColorCost;
	}

	public void setCartonUsageColorCost(BigDecimal cartonUsageColorCost) {
		this.cartonUsageColorCost = cartonUsageColorCost;
	}

	public BigDecimal getCartonTapeCut() {
		return cartonTapeCut;
	}

	public void setCartonTapeCut(BigDecimal cartonTapeCut) {
		this.cartonTapeCut = cartonTapeCut;
	}

	public BigDecimal getCartonLinerCut() {
		return cartonLinerCut;
	}

	public void setCartonLinerCut(BigDecimal cartonLinerCut) {
		this.cartonLinerCut = cartonLinerCut;
	}

	public BigDecimal getCartonHandProcessing() {
		return cartonHandProcessing;
	}

	public void setCartonHandProcessing(BigDecimal cartonHandProcessing) {
		this.cartonHandProcessing = cartonHandProcessing;
	}

	public BigDecimal getCartonWaterRepellent() {
		return cartonWaterRepellent;
	}

	public void setCartonWaterRepellent(BigDecimal cartonWaterRepellent) {
		this.cartonWaterRepellent = cartonWaterRepellent;
	}

	public BigDecimal getCartonProcessingUnitPrice() {
		return cartonProcessingUnitPrice;
	}

	public void setCartonProcessingUnitPrice(BigDecimal cartonProcessingUnitPrice) {
		this.cartonProcessingUnitPrice = cartonProcessingUnitPrice;
	}

	public BigDecimal getCartonProcessingTotalCost() {
		return cartonProcessingTotalCost;
	}

	public void setCartonProcessingTotalCost(BigDecimal cartonProcessingTotalCost) {
		this.cartonProcessingTotalCost = cartonProcessingTotalCost;
	}

	public Integer getSupplierLot() {
		return supplierLot;
	}

	public void setSupplierLot(Integer supplierLot) {
		this.supplierLot = supplierLot;
	}

	public BigDecimal getDigitalBasicCost() {
		return digitalBasicCost;
	}

	public void setDigitalBasicCost(BigDecimal digitalBasicCost) {
		this.digitalBasicCost = digitalBasicCost;
	}

	public BigDecimal getDigitalThroughWage() {
		return digitalThroughWage;
	}

	public void setDigitalThroughWage(BigDecimal digitalThroughWage) {
		this.digitalThroughWage = digitalThroughWage;
	}

	public BigDecimal getDigitalTotalCost() {
		return digitalTotalCost;
	}

	public void setDigitalTotalCost(BigDecimal digitalTotalCost) {
		this.digitalTotalCost = digitalTotalCost;
	}

	/**
	 * Create ProductOutputJson
	 *
	 * @param dto ProductOutputDto
	 */


	public void setData(ProductOutputDto dto){
		this.id = dto.getId();
		this.createdUser = dto.getCreatedUser();
		this.updatedUser = dto.getUpdatedUser();
		this.createdDate = dto.getCreatedDate();
		this.updatedDate = dto.getUpdatedDate();
		this.paperActualWeight = dto.getPaperActualWeight();
		this.paperUnitPrice = dto.getPaperUnitPrice();
		this.paperTotalCost = dto.getPaperTotalCost();
		this.colorPlateCostF = dto.getColorPlateCostF();
		this.colorPlateCostB = dto.getColorPlateCostB();
		this.colorPrintLossF = dto.getColorPrintLossF();
		this.colorPrintLossB = dto.getColorPrintLossB();
		this.colorPrintPerPacketCostF = dto.getColorPrintPerPacketCostF();
		this.colorPrintPerPacketCostB = dto.getColorPrintPerPacketCostB();
		this.colorPrintBasicCostF = dto.getColorPrintBasicCostF();
		this.colorPrintBasicCostB = dto.getColorPrintBasicCostB();
		this.colorPrintThroughWageF = dto.getColorPrintThroughWageF();
		this.colorPrintThroughWageB = dto.getColorPrintThroughWageB();
		this.colorPrintSpecialCostF = dto.getColorPrintSpecialCostF();
		this.colorPrintSpecialCostB = dto.getColorPrintSpecialCostB();
		this.colorPrintTotalCostF = dto.getColorPrintTotalCostF();
		this.colorPrintTotalCostB = dto.getColorPrintTotalCostB();
		this.surfaceTreatmentBasicCostF = dto.getSurfaceTreatmentBasicCostF();
		this.surfaceTreatmentBasicCostB = dto.getSurfaceTreatmentBasicCostB();
		this.surfaceTreatmentThroughWageF = dto.getSurfaceTreatmentThroughWageF();
		this.surfaceTreatmentThroughWageB = dto.getSurfaceTreatmentThroughWageB();
		this.surfaceTreatmentTotalCostF = dto.getSurfaceTreatmentTotalCostF();
		this.surfaceTreatmentTotalCostB = dto.getSurfaceTreatmentTotalCostB();
		this.embossingBasicCost = dto.getEmbossingBasicCost();
		this.embossingThroughWage = dto.getEmbossingThroughWage();
		this.embossingTotalCost = dto.getEmbossingTotalCost();
		this.laminationUnitPrice = dto.getLaminationUnitPrice();
		this.laminationSheetCost = dto.getLaminationSheetCost();
		this.laminationTotalCost = dto.getLaminationTotalCost();
		this.dieCuttingLoss = dto.getDieCuttingLoss();
		this.dieCuttingBasicCost = dto.getDieCuttingBasicCost();
		this.dieCuttingThroughWage = dto.getDieCuttingThroughWage();
		this.dieCuttingTotalCost = dto.getDieCuttingTotalCost();
		this.stampingBasicCost = dto.getStampingBasicCost();
		this.stampingThroughWage = dto.getStampingThroughWage();
		this.stampingTotalCost = dto.getStampingTotalCost();
		this.windowMaterialFee = dto.getWindowMaterialFee();
		this.windowTotalCost = dto.getWindowTotalCost();
		this.pasteLoss = dto.getPasteLoss();
		this.pasteBasicCost = dto.getPasteBasicCost();
		this.pasteThroughWage = dto.getPasteThroughWage();
		this.pasteTotalCost = dto.getPasteTotalCost();
		this.subtotal = dto.getSubtotal();
		this.managementCost = dto.getManagementCost();
		this.fareCost = dto.getFareCost();
		this.fareLineService = dto.getFareLineService();
		this.estimatedTotal = dto.getEstimatedTotal();
		this.estimatedUnitPrice = dto.getEstimatedUnitPrice();
		//FIXME: Change to use new Json
//		this.productId = dto.getProductId();
		this.inspection = dto.getInspection();
		this.packing = dto.getPacking();
		this.lot = dto.getLot();
		this.primaryFlag = dto.getPrimaryFlag();
		this.product = new ProductJson();
//		this.product.setId(dto.getProductId());\
		this.cartonMaterialCost = dto.getCartonMaterialCost();
		this.cartonMaterialLoss = dto.getCartonMaterialLoss();
		this.cartonMaterialLamination = dto.getCartonMaterialLamination();
		this.cartonMaterialUnitPrice = dto.getCartonMaterialUnitPrice();
		this.cartonMaterialTotalCost = dto.getCartonMaterialTotalCost();
		this.cartonShipFare = dto.getCartonShipFare();
		this.cartonShipTotal = dto.getCartonShipTotal();
		this.cartonUsageColorCost = dto.getCartonUsageColorCost();
		this.cartonTapeCut = dto.getCartonTapeCut();
		this.cartonLinerCut = dto.getCartonLinerCut();
		this.cartonHandProcessing = dto.getCartonHandProcessing();
		this.cartonWaterRepellent = dto.getCartonWaterRepellent();
		this.cartonProcessingUnitPrice = dto.getCartonProcessingUnitPrice();
		this.cartonProcessingTotalCost = dto.getCartonProcessingTotalCost();
		this.supplierLot = dto.getSupplierLot();
		this.digitalBasicCost = dto.getDigitalBasicCost();
		this.digitalThroughWage = dto.getDigitalThroughWage();
		this.digitalTotalCost = dto.getDigitalTotalCost();
	}

	/**
	 * Create ProductOutputDto
	 *
	 * @return ProductOutputDto
	 */

	public ProductOutputDto getData(){
		ProductOutputDto dto = new ProductOutputDto();
		dto.setId(id);
		dto.setCreatedUser(createdUser);
		dto.setUpdatedUser(updatedUser);
		dto.setCreatedDate(createdDate);
		dto.setUpdatedDate(updatedDate);
		dto.setPaperActualWeight(paperActualWeight);
		dto.setPaperUnitPrice(paperUnitPrice);
		dto.setPaperTotalCost(paperTotalCost);
		dto.setColorPlateCostF(colorPlateCostF);
		dto.setColorPlateCostB(colorPlateCostB);
		dto.setColorPrintLossF(colorPrintLossF);
		dto.setColorPrintLossB(colorPrintLossB);
		dto.setColorPrintPerPacketCostF(colorPrintPerPacketCostF);
		dto.setColorPrintPerPacketCostB(colorPrintPerPacketCostB);
		dto.setColorPrintBasicCostF(colorPrintBasicCostF);
		dto.setColorPrintBasicCostB(colorPrintBasicCostB);
		dto.setColorPrintThroughWageF(colorPrintThroughWageF);
		dto.setColorPrintThroughWageB(colorPrintThroughWageB);
		dto.setColorPrintSpecialCostF(colorPrintSpecialCostF);
		dto.setColorPrintSpecialCostB(colorPrintSpecialCostB);
		dto.setColorPrintTotalCostF(colorPrintTotalCostF);
		dto.setColorPrintTotalCostB(colorPrintTotalCostB);
		dto.setSurfaceTreatmentBasicCostF(surfaceTreatmentBasicCostF);
		dto.setSurfaceTreatmentBasicCostB(surfaceTreatmentBasicCostB);
		dto.setSurfaceTreatmentThroughWageF(surfaceTreatmentThroughWageF);
		dto.setSurfaceTreatmentThroughWageB(surfaceTreatmentThroughWageB);
		dto.setSurfaceTreatmentTotalCostF(surfaceTreatmentTotalCostF);
		dto.setSurfaceTreatmentTotalCostB(surfaceTreatmentTotalCostB);
		dto.setEmbossingBasicCost(embossingBasicCost);
		dto.setEmbossingThroughWage(embossingThroughWage);
		dto.setEmbossingTotalCost(embossingTotalCost);
		dto.setLaminationUnitPrice(laminationUnitPrice);
		dto.setLaminationSheetCost(laminationSheetCost);
		dto.setLaminationTotalCost(laminationTotalCost);
		dto.setDieCuttingLoss(dieCuttingLoss);
		dto.setDieCuttingBasicCost(dieCuttingBasicCost);
		dto.setDieCuttingThroughWage(dieCuttingThroughWage);
		dto.setDieCuttingTotalCost(dieCuttingTotalCost);
		dto.setStampingBasicCost(stampingBasicCost);
		dto.setStampingThroughWage(stampingThroughWage);
		dto.setStampingTotalCost(stampingTotalCost);
		dto.setWindowMaterialFee(windowMaterialFee);
		dto.setWindowTotalCost(windowTotalCost);
		dto.setPasteLoss(pasteLoss);
		dto.setPasteBasicCost(pasteBasicCost);
		dto.setPasteThroughWage(pasteThroughWage);
		dto.setPasteTotalCost(pasteTotalCost);
		dto.setSubtotal(subtotal);
		dto.setManagementCost(managementCost);
		dto.setFareCost(fareCost);
		dto.setFareLineService(fareLineService);
		dto.setEstimatedTotal(estimatedTotal);
		dto.setEstimatedUnitPrice(estimatedUnitPrice);
		//FIXME: change to use new Json
//		dto.setProductId(productId);
		dto.setInspection(inspection);
		dto.setPacking(packing);
		dto.setLot(lot);
		dto.setPrimaryFlag(primaryFlag);
		dto.setCartonMaterialCost(cartonMaterialCost);
		dto.setCartonMaterialLoss(cartonMaterialLoss);
		dto.setCartonMaterialLamination(cartonMaterialLamination);
		dto.setCartonMaterialUnitPrice(cartonMaterialUnitPrice);
		dto.setCartonMaterialTotalCost(cartonMaterialTotalCost);
		dto.setCartonShipFare(cartonShipFare);
		dto.setCartonShipTotal(cartonShipTotal);
		dto.setCartonUsageColorCost(cartonUsageColorCost);
		dto.setCartonTapeCut(cartonTapeCut);
		dto.setCartonLinerCut(cartonLinerCut);
		dto.setCartonHandProcessing(cartonHandProcessing);
		dto.setCartonWaterRepellent(cartonWaterRepellent);
		dto.setCartonProcessingUnitPrice(cartonProcessingUnitPrice);
		dto.setCartonProcessingTotalCost(cartonProcessingTotalCost);
		dto.setSupplierLot(supplierLot);
		dto.setDigitalBasicCost(digitalBasicCost);
		dto.setDigitalThroughWage(digitalThroughWage);
		dto.setDigitalTotalCost(digitalTotalCost);
		return dto;
	}
}
