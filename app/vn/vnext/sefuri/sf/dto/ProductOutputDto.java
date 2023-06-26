package vn.vnext.sefuri.sf.dto;

import javax.persistence.*;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.dto.BaseDto;
import java.util.List;
import java.math.BigDecimal;
import vn.vnext.sefuri.sf.dto.DealProductDto;
import vn.vnext.sefuri.sf.dto.OfferDto;

/**
 * Contain products output in deal. 
 * @author vupt 
 */
@Entity
@Table(name = "sfr_sf_product_output")
public class ProductOutputDto extends BaseDto {

	/* 紙器用板紙代 - 連量 */
	private BigDecimal paperActualWeight;
	/* 紙器用板紙代 - 枚単価 */
	private BigDecimal paperUnitPrice;
	/* 紙器用板紙代 - 板紙代計 */
	private BigDecimal paperTotalCost;
	/* 印刷代　- 刷版代 Front */
	private BigDecimal colorPlateCostF;
	/* 印刷代　- 刷版代 Back */
	private BigDecimal colorPlateCostB;
	/* 印刷代 - 印刷ロス Front */
	private BigDecimal colorPrintLossF;
	/* 印刷代 - 印刷ロス Back */
	private BigDecimal colorPrintLossB;
	/* 印刷代 - 一律 Front */
	private BigDecimal colorPrintPerPacketCostF;
	/* 印刷代 - 一律 Back */
	private BigDecimal colorPrintPerPacketCostB;
	/* 印刷代 - 基本料 Front */
	private BigDecimal colorPrintBasicCostF;
	/* 印刷代 - 基本料 Back */
	private BigDecimal colorPrintBasicCostB;
	/* 印刷代 - 色通工賃 Front */
	private BigDecimal colorPrintThroughWageF;
	/* 印刷代 - 色通工賃 Back */
	private BigDecimal colorPrintThroughWageB;
	/* 印刷代 - 印刷割増（色） Front */
	private BigDecimal colorPrintSpecialCostF;
	/* 印刷代 - 印刷割増（色） Back */
	private BigDecimal colorPrintSpecialCostB;
	/* 印刷代 - 印刷代計 Front */
	private BigDecimal colorPrintTotalCostF;
	/* 印刷代 - 印刷代計 Back */
	private BigDecimal colorPrintTotalCostB;
	/* 表面加工 - 基本料 Front */
	private String surfaceTreatmentBasicCostF;
	/* 表面加工 - 基本料 Back */
	private String surfaceTreatmentBasicCostB;
	/* 表面加工 - 通工賃 Front */
	private String surfaceTreatmentThroughWageF;
	/* 表面加工 - 通工賃 Back */
	private String surfaceTreatmentThroughWageB;
	/* 表面加工  - 表面加工代計 Front */
	private BigDecimal surfaceTreatmentTotalCostF;
	/* 表面加工  - 表面加工代計 Back */
	private BigDecimal surfaceTreatmentTotalCostB;
	/* エンボス - 基本料 */
	private BigDecimal embossingBasicCost;
	/* エンボス - 通工賃 */
	private BigDecimal embossingThroughWage;
	/* エンボス - エンボス代計 */
	private BigDecimal embossingTotalCost;
	/* 片段ラミネート - 紙代㎡＠ */
	private BigDecimal laminationUnitPrice;
	/* 片段ラミネート - シート代 */
	private BigDecimal laminationSheetCost;
	/* 片段ラミネート - ラミネート代計 */
	private BigDecimal laminationTotalCost;
	/* 打抜き - 打抜ロス */
	private BigDecimal dieCuttingLoss;
	/* 打抜き - 基本料 */
	private BigDecimal dieCuttingBasicCost;
	/* 打抜き - 通工賃 */
	private BigDecimal dieCuttingThroughWage;
	/* 打抜き - 打抜代計 */
	private BigDecimal dieCuttingTotalCost;
	/* 箔押し代 - 基本料 */
	private BigDecimal stampingBasicCost;
	/* 箔押し代 - 工賃 */
	private BigDecimal stampingThroughWage;
	/* 箔押し代 - 箔押し代 */
	private BigDecimal stampingTotalCost;
	/* 窓貼り代 - 材料代 */
	private BigDecimal windowMaterialFee;
	/* 窓貼り代 - 窓貼代計 */
	private BigDecimal windowTotalCost;
	/* 貼り - 貼ロス */
	private BigDecimal pasteLoss;
	/* 貼り - 基本料 */
	private BigDecimal pasteBasicCost;
	/* 貼り - 工賃 */
	private BigDecimal pasteThroughWage;
	/* 貼り - 貼り代計 */
	private BigDecimal pasteTotalCost;
	/* 小計 */
	private BigDecimal subtotal;
	/* 販管・配送 - 販売管理費 */
	private BigDecimal managementCost;
	/* 販管・配送 - 運賃 */
	private BigDecimal fareCost;
	/* 販管・配送 - 運賃（路線便） */
	private BigDecimal fareLineService;
	/* 見積額 - 合計 */
	private BigDecimal estimatedTotal;
	/* 見積額 - 見積単価 */
	private BigDecimal estimatedUnitPrice;
	/* 検品 */
	private BigDecimal inspection;
	/* 梱包 */
	private BigDecimal packing;
	/* lot */
	private Integer lot;
	/* primaryFlag */
	private Integer primaryFlag = 0;

	private BigDecimal pasteStepWage;

	private BigDecimal laminationSize;

	private BigDecimal cartonMaterialCost;
	private BigDecimal cartonMaterialLoss;
	private BigDecimal cartonMaterialLamination;
	private BigDecimal cartonMaterialUnitPrice;
	private BigDecimal cartonMaterialTotalCost;

	private BigDecimal cartonShipFare;
	private BigDecimal cartonShipTotal;

	private BigDecimal cartonUsageColorCost;
	private BigDecimal cartonTapeCut;
	private BigDecimal cartonLinerCut;
	private BigDecimal cartonHandProcessing;
	private BigDecimal cartonWaterRepellent;
	private BigDecimal cartonProcessingUnitPrice;
	private BigDecimal cartonProcessingTotalCost;
	private BigDecimal dimension;
	private BigDecimal surcharge;
	private BigDecimal digitalBasicCost;
	private BigDecimal digitalThroughWage;
	private BigDecimal digitalTotalCost;
	private Integer supplierLot;
	private BigDecimal cartonLotGap;
	private BigDecimal cartonSpecialFare;
	/* dealProductId */

	private Integer dealProductId;
	/* dealProductRsProductOutput */
	private DealProductDto dealProduct;
	/* productOutputRsOfffer */
	private OfferDto offer;

	/**
	 * Get paperActualWeight
	 *
	 * @return paperActualWeight
	 */
	@Basic
	@Column(name = "paper_actual_weight")
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
	@Basic
	@Column(name = "paper_unit_price")
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
	@Basic
	@Column(name = "paper_total_cost")
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
	@Basic
	@Column(name = "color_plate_cost_f")
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
	@Basic
	@Column(name = "color_plate_cost_b")
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
	@Basic
	@Column(name = "color_print_loss_f")
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
	@Basic
	@Column(name = "color_print_loss_b")
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
	@Basic
	@Column(name = "color_print_per_packet_cost_f")
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
	@Basic
	@Column(name = "color_print_per_packet_cost_b")
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
	@Basic
	@Column(name = "color_print_basic_cost_f")
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
	@Basic
	@Column(name = "color_print_basic_cost_b")
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
	@Basic
	@Column(name = "color_print_through_wage_f")
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
	@Basic
	@Column(name = "color_print_through_wage_b")
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
	@Basic
	@Column(name = "color_print_special_cost_f")
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
	@Basic
	@Column(name = "color_print_special_cost_b")
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
	@Basic
	@Column(name = "color_print_total_cost_f")
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
	@Basic
	@Column(name = "color_print_total_cost_b")
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
	@Basic
	@Column(name = "surface_treatment_basic_cost_f")
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
	@Basic
	@Column(name = "surface_treatment_basic_cost_b")
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
	@Basic
	@Column(name = "surface_treatment_through_wage_f")
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
	@Basic
	@Column(name = "surface_treatment_through_wage_b")
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
	@Basic
	@Column(name = "surface_treatment_total_cost_f")
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
	@Basic
	@Column(name = "surface_treatment_total_cost_b")
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
	@Basic
	@Column(name = "embossing_basic_cost")
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
	@Basic
	@Column(name = "embossing_through_wage")
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
	@Basic
	@Column(name = "embossing_total_cost")
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
	@Basic
	@Column(name = "lamination_unit_price")
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
	@Basic
	@Column(name = "lamination_sheet_cost")
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
	@Basic
	@Column(name = "lamination_total_cost")
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
	@Basic
	@Column(name = "die_cutting_loss")
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
	@Basic
	@Column(name = "die_cutting_basic_cost")
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
	@Basic
	@Column(name = "die_cutting_through_wage")
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
	@Basic
	@Column(name = "die_cutting_total_cost")
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
	@Basic
	@Column(name = "stamping_basic_cost")
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
	@Basic
	@Column(name = "stamping_through_wage")
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
	@Basic
	@Column(name = "stamping_total_cost")
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
	@Basic
	@Column(name = "window_material_fee")
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
	@Basic
	@Column(name = "window_total_cost")
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
	@Basic
	@Column(name = "paste_loss")
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
	@Basic
	@Column(name = "paste_basic_cost")
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
	@Basic
	@Column(name = "paste_through_wage")
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
	@Basic
	@Column(name = "paste_total_cost")
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
	@Basic
	@Column(name = "subtotal")
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
	@Basic
	@Column(name = "management_cost")
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
	@Basic
	@Column(name = "fare_cost")
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
	@Basic
	@Column(name = "fare_line_service")
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
	@Basic
	@Column(name = "estimated_total")
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
	@Basic
	@Column(name = "estimated_unit_price")
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
	 * Get inspection
	 *
	 * @return inspection
	 */
	@Basic
	@Column(name = "inspection")
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
	@Basic
	@Column(name = "packing")
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
	@Basic
	@Column(name = "lot")
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
	@Basic
	@Column(name = "primary_flag")
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
	 * Get dealProductId
	 *
	 * @return dealProductId
	 */
	@Basic
	@Column(name = "deal_product_id")
	public Integer getDealProductId(){
		return dealProductId;
	}

	/**
	 * Set dealProductId
	 *
	 * @param dealProductId Integer
	 */
	public void setDealProductId(Integer dealProductId) {
		this.dealProductId = dealProductId;
	}

	/**
	 * Get dealProduct
	 *
	 * @return dealProduct
	 */
	@Transient
	public DealProductDto getDealProduct(){
		return dealProduct;
	}

	/**
	 * Set dealProduct
	 *
	 * @param dealProduct DealProductDto
	 */
	public void setDealProduct(DealProductDto dealProduct) {
		this.dealProduct = dealProduct;
	}

	/**
	 * Get offer
	 *
	 * @return offer
	 */
	@Transient
	public OfferDto getOffer(){
		return offer;
	}

	/**
	 * Set offer
	 *
	 * @param offer OfferDto
	 */
	public void setOffer(OfferDto offer) {
		this.offer = offer;
	}

	@Basic
	@Column(name = "paste_step_wage")
	public BigDecimal getPasteStepWage() {
		return pasteStepWage;
	}

	public void setPasteStepWage(BigDecimal pasteStepWage) {
		this.pasteStepWage = pasteStepWage;
	}

	@Basic
	@Column(name = "lamination_size")
	public BigDecimal getLaminationSize() {
		return laminationSize;
	}

	public void setLaminationSize(BigDecimal laminationSize) {
		this.laminationSize = laminationSize;
	}

	@Basic
	@Column(name = "carton_material_cost")
	public BigDecimal getCartonMaterialCost() {
		return cartonMaterialCost;
	}

	public void setCartonMaterialCost(BigDecimal cartonMaterialCost) {
		this.cartonMaterialCost = cartonMaterialCost;
	}

	@Basic
	@Column(name = "carton_material_loss")
	public BigDecimal getCartonMaterialLoss() {
		return cartonMaterialLoss;
	}

	public void setCartonMaterialLoss(BigDecimal cartonMaterialLoss) {
		this.cartonMaterialLoss = cartonMaterialLoss;
	}

	@Basic
	@Column(name = "carton_material_lamination")
	public BigDecimal getCartonMaterialLamination() {
		return cartonMaterialLamination;
	}

	public void setCartonMaterialLamination(BigDecimal cartonMaterialLamination) {
		this.cartonMaterialLamination = cartonMaterialLamination;
	}

	@Basic
	@Column(name = "carton_material_unit_price")
	public BigDecimal getCartonMaterialUnitPrice() {
		return cartonMaterialUnitPrice;
	}

	public void setCartonMaterialUnitPrice(BigDecimal cartonMaterialUnitPrice) {
		this.cartonMaterialUnitPrice = cartonMaterialUnitPrice;
	}

	@Basic
	@Column(name = "carton_material_total_cost")
	public BigDecimal getCartonMaterialTotalCost() {
		return cartonMaterialTotalCost;
	}

	public void setCartonMaterialTotalCost(BigDecimal cartonMaterialTotalCost) {
		this.cartonMaterialTotalCost = cartonMaterialTotalCost;
	}

	@Basic
	@Column(name = "carton_ship_fare")
	public BigDecimal getCartonShipFare() {
		return cartonShipFare;
	}

	public void setCartonShipFare(BigDecimal cartonShipFare) {
		this.cartonShipFare = cartonShipFare;
	}

	@Basic
	@Column(name = "carton_ship_total")
	public BigDecimal getCartonShipTotal() {
		return cartonShipTotal;
	}

	public void setCartonShipTotal(BigDecimal cartonShipTotal) {
		this.cartonShipTotal = cartonShipTotal;
	}

	@Basic
	@Column(name = "carton_usage_color_cost")
	public BigDecimal getCartonUsageColorCost() {
		return cartonUsageColorCost;
	}

	public void setCartonUsageColorCost(BigDecimal cartonUsageColorCost) {
		this.cartonUsageColorCost = cartonUsageColorCost;
	}

	@Basic
	@Column(name = "carton_tape_cut")
	public BigDecimal getCartonTapeCut() {
		return cartonTapeCut;
	}

	public void setCartonTapeCut(BigDecimal cartonTapeCut) {
		this.cartonTapeCut = cartonTapeCut;
	}

	@Basic
	@Column(name = "carton_liner_cut")
	public BigDecimal getCartonLinerCut() {
		return cartonLinerCut;
	}

	public void setCartonLinerCut(BigDecimal cartonLinerCut) {
		this.cartonLinerCut = cartonLinerCut;
	}

	@Basic
	@Column(name = "carton_hand_processing")
	public BigDecimal getCartonHandProcessing() {
		return cartonHandProcessing;
	}

	public void setCartonHandProcessing(BigDecimal cartonHandProcessing) {
		this.cartonHandProcessing = cartonHandProcessing;
	}

	@Basic
	@Column(name = "carton_water_repellent")
	public BigDecimal getCartonWaterRepellent() {
		return cartonWaterRepellent;
	}

	public void setCartonWaterRepellent(BigDecimal cartonWaterRepellent) {
		this.cartonWaterRepellent = cartonWaterRepellent;
	}

	@Basic
	@Column(name = "carton_processing_unit_price")
	public BigDecimal getCartonProcessingUnitPrice() {
		return cartonProcessingUnitPrice;
	}

	public void setCartonProcessingUnitPrice(BigDecimal cartonProcessingUnitPrice) {
		this.cartonProcessingUnitPrice = cartonProcessingUnitPrice;
	}

	@Basic
	@Column(name = "carton_processing_total_cost")
	public BigDecimal getCartonProcessingTotalCost() {
		return cartonProcessingTotalCost;
	}

	public void setCartonProcessingTotalCost(BigDecimal cartonProcessingTotalCost) {
		this.cartonProcessingTotalCost = cartonProcessingTotalCost;
	}

	@Basic
	@Column(name = "dimension")
	public BigDecimal getDimension() {
		return dimension;
	}

	public void setDimension(BigDecimal dimension) {
		this.dimension = dimension;
	}

	@Basic
	@Column(name = "surcharge")
	public BigDecimal getSurcharge() {
		return surcharge;
	}

	public void setSurcharge(BigDecimal surcharge) {
		this.surcharge = surcharge;
	}

	@Basic
	@Column(name = "supplier_lot")
	public Integer getSupplierLot() {
		return supplierLot;
	}

	public void setSupplierLot(Integer supplierLot) {
		this.supplierLot = supplierLot;
	}

	@Basic
	@Column(name = "digital_basic_cost")
	public BigDecimal getDigitalBasicCost() {
		return digitalBasicCost;
	}

	public void setDigitalBasicCost(BigDecimal digitalBasicCost) {
		this.digitalBasicCost = digitalBasicCost;
	}

	@Basic
	@Column(name = "digital_through_wage")
	public BigDecimal getDigitalThroughWage() {
		return digitalThroughWage;
	}

	public void setDigitalThroughWage(BigDecimal digitalThroughWage) {
		this.digitalThroughWage = digitalThroughWage;
	}

	@Basic
	@Column(name = "digital_total_cost")
	public BigDecimal getDigitalTotalCost() {
		return digitalTotalCost;
	}

	public void setDigitalTotalCost(BigDecimal digitalTotalCost) {
		this.digitalTotalCost = digitalTotalCost;
	}


	@Basic
	@Column(name = "carton_lot_gap")
	public BigDecimal getCartonLotGap() {
		return cartonLotGap;
	}

	public void setCartonLotGap(BigDecimal cartonLotGap) {
		this.cartonLotGap = cartonLotGap;
	}

	@Basic
	@Column(name = "carton_special_fare")
	public BigDecimal getCartonSpecialFare() {
		return cartonSpecialFare;
	}

	public void setCartonSpecialFare(BigDecimal cartonSpecialFare) {
		this.cartonSpecialFare = cartonSpecialFare;
	}
}