package vn.vnext.sefuri.sf.module.export.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.annotation.Nonnull;
import javax.inject.Inject;

import com.auth0.jwt.internal.org.apache.commons.lang3.StringUtils;
import com.google.common.base.Strings;
import com.google.common.collect.Lists;

import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.common.Enums.CartonPacking;
import vn.vnext.sefuri.sf.common.Enums.ProcessOtherMethod;
import vn.vnext.sefuri.sf.common.Enums.WaterRepellent;
import vn.vnext.sefuri.sf.common.enums.SurfaceTreatment;
import vn.vnext.sefuri.sf.dao.MstSheetSizeDao;
import vn.vnext.sefuri.sf.dto.MstSheetSizeDto;
import vn.vnext.sefuri.sf.dto.ProductDto;
import vn.vnext.sefuri.sf.module.export.UpperLower;
import vn.vnext.sefuri.sf.module.export.helper.EnumsPDF;
import vn.vnext.sefuri.sf.module.export.helper.ProductSizeHelper;
import vn.vnext.sefuri.sf.module.export.model.Step;
import vn.vnext.sefuri.sf.module.export.model.r007.ExtraStepModel;

/**
 * Helper help export r007 pdf
 * <p>
 * Created by NgocNM on 9/1/2017.
 */
public class StepsHelper {
    @Inject
    private MstSheetSizeDao mstSheetSizeDao;

    /** 商品に関するヘルパー */
    @Inject
    private ProductHelper productHelper;

    /** 商品寸法に関するヘルパー */
    @Inject
    private ProductSizeHelper productSizeHelper;


    /**
     * get list data step for export r007 pdf
     *
     * @param productDto
     * @return list of steps
     */
    public List<Step> getListStepData(ProductDto productDto) {
        // get list id of step
        List<Integer> listStepId = this.getListSaleFrontStepForShapeAndDecorative(productDto);
        /*if (this.isEqualDennoSteps(productDto)) {
            listStepId = this.getListSaleFrontStepForShapeAndDecorative(productDto);
        } else {
            listStepId = this.getListDennoStep(productDto.getStepDenno());
        }*/


        List<Step> steps = Lists.newArrayList();
        for (Integer stepId : listStepId) {
            Step step = null;
            if (productDto.getProductType() == 0) {
                step = this.getStepDataEachStepForShapeAndDecorative(stepId, productDto);
            }
            if (step != null) {
                steps.add(step);
            }
        }
        return steps;
    }

    /**
     * get data for each step
     *
     * @param stepId
     * @return step
     */
    public Step getStepDataEachStepForShapeAndDecorative(Integer stepId, ProductDto productDto) {
        Step stepTemp = null;
        boolean isPrintMethodTmp = false;
        if (stepId == EnumsPDF.ShapeStep.CUTTING.getValue()) {

            stepTemp = this.get_Data_Cutting_Shape_Decorative(productDto);

        } else if (stepId == EnumsPDF.ShapeStep.ANCHOR_COAT.getValue()) {

            stepTemp = this.get_Data_Anchor_Coat_Shape_Decorative(productDto);

        } else if (stepId == EnumsPDF.ShapeStep.PRINT_METHOD_FRONT.getValue()) {

            if (productDto.getPrintMethod() == 0 && productDto.getSurfaceTreatmentIdF() != null && (productDto.getSurfaceTreatmentIdF() > 18 || productDto.getSurfaceTreatmentIdF() == 17 || productDto.getSurfaceTreatmentIdF() == 8)) {
                isPrintMethodTmp = true;
                productDto.setPrintMethod(1);
            }

            stepTemp = this.get_Data_Print_Method_Shape_Decorative(productDto);

            if (isPrintMethodTmp) {
                productDto.setPrintMethod(0);
            }
        } else if (stepId == EnumsPDF.ShapeStep.PRINT_METHOD_BACK.getValue()) {

            if (productDto.getPrintMethod() == 0 && productDto.getSurfaceTreatmentIdB() != null && (productDto.getSurfaceTreatmentIdB() > 18 || productDto.getSurfaceTreatmentIdB() == 17 || productDto.getSurfaceTreatmentIdB() == 8)) {
                isPrintMethodTmp = true;
                productDto.setPrintMethod(1);
            }

            stepTemp = this.get_Data_Print_Method_Shape_Decorative(productDto);

            if (isPrintMethodTmp) {
                productDto.setPrintMethod(0);
            }
        } else if (stepId == EnumsPDF.ShapeStep.PP_SURFACE_TREATMENT_FRONT.getValue()) {

            stepTemp = this.get_Data_2PP_Surface_Treatment_Front_Shape_Decorative(productDto);

        } else if (stepId == EnumsPDF.ShapeStep.PUNCHING_FRONT.getValue()) {

            stepTemp = this.get_Data_Punching_Shape_Decorative(productDto);

        } else if (stepId == EnumsPDF.ShapeStep.SURFACE_TREATMENT_FRONT.getValue()) {

            stepTemp = this.get_Data_Surface_Treatment_Shape_Decorative(productDto, false);

        } else if (stepId == EnumsPDF.ShapeStep.PP_SURFACE_TREATMENT_BACK.getValue()) {

            stepTemp = this.get_Data_2PP_Surface_Treatment_Back_Shape_Decorative(productDto.getSurfaceTreatmentIdF());

        } else if (stepId == EnumsPDF.ShapeStep.PUNCHING_BACK.getValue()) {

            stepTemp = this.get_Data_Punching_Shape_Decorative(productDto);

        } else if (stepId == EnumsPDF.ShapeStep.SURFACE_TREATMENT_BACK.getValue()) {

            stepTemp = this.get_Data_Surface_Treatment_Shape_Decorative(productDto, true);

        } else if (stepId == EnumsPDF.ShapeStep.EMBOSSING.getValue()) {

            stepTemp = this.get_Data_Surface_Embossing_Shape_Decorative(productDto);

        } else if (stepId == EnumsPDF.ShapeStep.ONE_STAGE.getValue()) {

            stepTemp = this.get_Data_One_Stage_Shape_Decorative(productDto);

        } else if (stepId == EnumsPDF.ShapeStep.LAMINATE.getValue()) {

            stepTemp = this.get_Data_Laminate_Shape_Decorative(productDto);

        } else if (stepId == EnumsPDF.ShapeStep.PUNCHING.getValue()) {

            stepTemp = this.get_Data_Punching_Shape_Decorative(productDto);

        } else if (stepId == EnumsPDF.ShapeStep.STAMPING.getValue()) {

            stepTemp = this.get_Data_Stamping_Shape_Decorative(productDto);

        } else if (stepId == EnumsPDF.ShapeStep.WINDOW_STICKING.getValue()) {

            stepTemp = this.get_Data_Window_Sticking_Shape_Decorative(productDto);

        } else if (stepId == EnumsPDF.ShapeStep.PASTING.getValue()) {

            stepTemp = this.get_Data_Pasting_Shape_Decorative(productDto);

        } else if (stepId == EnumsPDF.ShapeStep.CHECKING.getValue()) {

            stepTemp = this.get_Data_Checking_Shape_Decorative(productDto);

        } else if (stepId == EnumsPDF.ShapeStep.PACKING.getValue()) {

            stepTemp = this.get_Data_Packing_Shape_Decorative(productDto);
        }
        return stepTemp;
    }

    /**
     * steps are different with denno return false
     * steps is same with denno or null return true;
     * default return true
     *
     * @param productDto
     * @return
     */
    public boolean isEqualDennoSteps(ProductDto productDto) {
        if (Strings.isNullOrEmpty(productDto.getStepDenno())) {
            return true;
        } else {
            List<Integer> saleFrontSteps = getListSaleFrontStepForShapeAndDecorative(productDto);
            List<Integer> dennoSteps = getListDennoStep(productDto.getStepDenno());
            if (saleFrontSteps.size() != dennoSteps.size()) {
                return false;
            }
            for (int i = 0; i < saleFrontSteps.size(); i++) {
                if (saleFrontSteps.get(i) != dennoSteps.get(i)) {
                    return false;
                }
            }
            return true;
        }
    }

    /**
     * get list step denno
     *
     * @param listDennoStepString
     * @return
     */
    public List<Integer> getListDennoStep(String listDennoStepString) {
        List<Integer> dennoStepModels = Lists.newArrayList();
        String[] regexsStep = listDennoStepString.split(Constants.SLASH);
        if (regexsStep.length > 0) {
            for (String stepString : regexsStep) {
                if (!"null".equals(stepString))
                    dennoStepModels.add(Integer.parseInt(stepString));
            }
        }
        return dennoStepModels;
    }

    /**
     * Get list step from data sale front for carton case
     *
     * @param productDto
     * @return list step
     */
    public List<Integer> getListSaleFrontStepForCartonCase(ProductDto productDto) {
        List<Integer> saleFrontStepModels = Lists.newArrayList();
        // TODO:
        return saleFrontStepModels;
    }

    /**
     * Get list step from data sale front  for carton sheet
     *
     * @param productDto
     * @return list step
     */
    public List<Integer> getListSaleFrontStepForCartonSheet(ProductDto productDto) {
        List<Integer> saleFrontStepModels = Lists.newArrayList();
        // TODO:
        return saleFrontStepModels;
    }

    /**
     * Get list step from data sale front
     *
     * @param productDto
     * @return list step
     */
    public List<Integer> getListSaleFrontStepForShapeAndDecorative(ProductDto productDto) {
        List<Integer> saleFrontStepModels = Lists.newArrayList();
        // 1. 断裁/ Cutting
        boolean isDifference = false;
        if (productDto.getCutPaperSizeW() != null && productDto.getCutPaperSizeW() != productDto.getBlankPaperSizeW()) {
            isDifference = true;
        }

        if (!isDifference && productDto.getCutPaperSizeH() != null && productDto.getCutPaperSizeH() != productDto.getBlankPaperSizeH()) {
            isDifference = true;
        }

        if (isDifference) {
            saleFrontStepModels.add(EnumsPDF.ShapeStep.CUTTING.getValue());
        }

        // 2. アンカーコート/ Anchor Coat
        if (productDto.getPrintMethod() != null && productDto.getPrintMethod() == 2 && !checkPaperStartWithA(productDto)) {
            saleFrontStepModels.add(EnumsPDF.ShapeStep.ANCHOR_COAT.getValue());
        }

        // 3. 印刷方法/ Phương pháp in front
        if (hasFrontPrintProcess(productDto)) {
            saleFrontStepModels.add(EnumsPDF.ShapeStep.PRINT_METHOD_FRONT.getValue());
        }

        // 4. 印刷方法/ Phương pháp in back
        if (hasBackPrintProcess(productDto)) {
            saleFrontStepModels.add(EnumsPDF.ShapeStep.PRINT_METHOD_BACK.getValue());
        }

        // 5. 2PP_表面加工 Front/ Gia công bề mặt Front
        SurfaceTreatment surfaceTreatmentFront = SurfaceTreatment.valueOf(productDto.getSurfaceTreatmentIdF());
        if (surfaceTreatmentFront != null && surfaceTreatmentFront.isPp()) {
            // 印刷工程ありの場合のみ SS0(印刷保護) 工程を追加する
            if (hasFrontPrintProcess(productDto)) {
                saleFrontStepModels.add(EnumsPDF.ShapeStep.PP_SURFACE_TREATMENT_FRONT.getValue());
            }

            // PPベタ窓, PP20μベタ窓 の場合のみ打抜き工程を追加する
            if (surfaceTreatmentFront == SurfaceTreatment.PP_SOLID_WINDOW || surfaceTreatmentFront == SurfaceTreatment.PP_20u_SOLID_WINDOW) {
                // 6. 打ち抜き/ Bế front
                saleFrontStepModels.add(EnumsPDF.ShapeStep.PUNCHING_FRONT.getValue());
            }
        }

        // 7. 表面加工 Front/ Gia công bề mặt Front
        if (productDto.getSurfaceTreatmentIdF() != null && productDto.getSurfaceTreatmentIdF() != 8/*UVOPニス*/ && productDto.getSurfaceTreatmentIdF() != 17/*UVOPマット*/) {
            saleFrontStepModels.add(EnumsPDF.ShapeStep.SURFACE_TREATMENT_FRONT.getValue());
        }

        // 8. 2PP 表面加工 Back/ Gia công bề mặt Back
        SurfaceTreatment surfaceTreatmentBack = SurfaceTreatment.valueOf(productDto.getSurfaceTreatmentIdB());
        if (surfaceTreatmentBack != null && surfaceTreatmentBack.isPp()) {
            // 印刷工程ありの場合のみ SS0(印刷保護) 工程を追加する
            if (hasBackPrintProcess(productDto)) {
                saleFrontStepModels.add(EnumsPDF.ShapeStep.PP_SURFACE_TREATMENT_BACK.getValue());
            }

            // PPベタ窓, PP20μベタ窓 の場合のみ打抜き工程を追加する
            if (surfaceTreatmentBack == SurfaceTreatment.PP_SOLID_WINDOW || surfaceTreatmentBack == SurfaceTreatment.PP_20u_SOLID_WINDOW) {
                // 9. 打ち抜き/ Bế back
                saleFrontStepModels.add(EnumsPDF.ShapeStep.PUNCHING_BACK.getValue());
            }
        }

        // 10. 表面加工 Back/ Gia công bề mặt Back
        if (productDto.getSurfaceTreatmentIdB() != null && productDto.getSurfaceTreatmentIdB() != 8/*UVOPニス*/ && productDto.getSurfaceTreatmentIdB() != 17/*UVOPマット*/) {
            saleFrontStepModels.add(EnumsPDF.ShapeStep.SURFACE_TREATMENT_BACK.getValue());
        }

        // 11. エンボス加工/ Gia công in nổi(emboss)
        if (productDto.getEmbossingCode() != null && !"0".equals(productDto.getEmbossingCode())) {
            saleFrontStepModels.add(EnumsPDF.ShapeStep.EMBOSSING.getValue());
        }

        // 12. 片段（貼合の場合）/ 片段 (Trường hợp dán ghép)
        // 13.ラミネート（貼合の場合）/ Laminate (Trường hợp dán ghép)
        if (productDto.getLaminationFlute() != null
                && (productDto.getLaminationFlute() == 2 || productDto.getLaminationFlute() == 3 || productDto.getLaminationFlute() == 4)) {
            saleFrontStepModels.add(EnumsPDF.ShapeStep.ONE_STAGE.getValue());
            saleFrontStepModels.add(EnumsPDF.ShapeStep.LAMINATE.getValue());
        }

        // 14. 打ち抜き/ Bế
        if (Integer.valueOf(1/*打抜きあり*/).equals(productDto.getDieCuttingFlag())) {
        		saleFrontStepModels.add(EnumsPDF.ShapeStep.PUNCHING.getValue());
        }

        // 15. 箔押し/ Mạ
        if (productDto.getStampingId() != null && (productDto.getStampingId() == 1 || productDto.getStampingId() == 2 || productDto.getStampingId() == 3)) {
            saleFrontStepModels.add(EnumsPDF.ShapeStep.STAMPING.getValue());
        }

        // 16. 窓貼り/ Dán cửa sổ
        if (productDto.getWindowSizeH() != null && productDto.getWindowSizeH() != 0 && productDto.getWindowSizeW() != null && productDto.getWindowSizeW() != 0) {
            saleFrontStepModels.add(EnumsPDF.ShapeStep.WINDOW_STICKING.getValue());
        }

        // 17. 貼り/ Dán
        if (productDto.getPasteId() != null) {
            saleFrontStepModels.add(EnumsPDF.ShapeStep.PASTING.getValue());
        }

        // 18. 検品/ Kiểm tra
        if (productDto.getInspectionId() != null && productDto.getInspectionId() != 1) {
            saleFrontStepModels.add(EnumsPDF.ShapeStep.CHECKING.getValue());
        }

        // 19. 梱包/ Đóng gói
        if (productDto.getPackingId() != null) {
            saleFrontStepModels.add(EnumsPDF.ShapeStep.PACKING.getValue());
        }

        return saleFrontStepModels;
    }


    /**
     * 1. 断裁/ Cutting Implement
     * get data cutting step for shape and decorative.
     * If not have cutting step return null.
     *
     * @param productDto
     * @return step
     */
    public Step get_Data_Cutting_Shape_Decorative(ProductDto productDto) {
        String stepString = Constants.BLANK;
        Step stepTemp;
        // Xử lý cho trường hợp nếu cuttingSize = 0 thì vẫn có công đoạn DS999
        if ((productDto.getShapeId() != null && productDto.getShapeId() != 98) || productDto.getShapeId() == null) {
            boolean isDifference = false;
            if (productDto.getCutPaperSizeW() != null && productDto.getCutPaperSizeW().compareTo(BigDecimal.ZERO) != 0 && productDto.getCutPaperSizeW().compareTo(productDto.getPaperSizeW()) != 0) {
                isDifference = true;
            }

            if (!isDifference && productDto.getCutPaperSizeH() != null && !BigDecimal.ZERO.equals(productDto.getCutPaperSizeH()) && !Objects.equals(productDto.getCutPaperSizeH(), productDto.getPaperSizeH())) {
                isDifference = true;
            }
            if (isDifference) {
                stepString = "紙断";
            } else {
                stepString = "出庫・断裁";
            }
        } else if (productDto.getShapeId() != null && productDto.getShapeId() == 98) { // mỹ phẩm
            stepString = "美粧コルゲーター";
        }

        if (StringUtils.isNotEmpty(stepString)) {
            stepTemp = new Step();
            stepTemp.setStep1(stepString);
            return stepTemp;
        }
        return null;
    }

    /**
     * 2. アンカーコート: Anchor Coat
     * get data anchor coat step for shape and decorative.
     * If not have anchor coat step return null.
     *
     * @param productDto
     * @return step
     */
    public Step get_Data_Anchor_Coat_Shape_Decorative(ProductDto productDto) {
        String stepString = Constants.BLANK;
        Step stepTemp;
        if ((productDto.getShapeId() != null && productDto.getShapeId() != 98) || productDto.getShapeId() == null) { //hộp giấy
            if (productDto.getPrintMethod() != null && productDto.getPrintMethod() == 2 && !checkPaperStartWithA(productDto)) {
                stepString = "アンカーコート";
            }
        } else if (productDto.getShapeId() != null && productDto.getShapeId() == 98) { // mỹ phẩm
            //TODO
        }


        if (StringUtils.isNotEmpty(stepString)) {
            stepTemp = new Step();
            stepTemp.setStep1(stepString);
            return stepTemp;
        }
        return null;
    }

    /**
     * 印刷方法/ Phương pháp in
     * get data printing step for shape and decorative
     * if not have printing step return null
     *
     * @param productDto
     * @return step
     */
    public Step get_Data_Print_Method_Shape_Decorative(ProductDto productDto) {
        String stepString = Constants.BLANK;
        Step stepTemp;
        if ((productDto.getShapeId() != null && productDto.getShapeId() != 98) || productDto.getShapeId() == null) { //hộp giấy
            if (productDto.getPrintMethod() == 1) {
                stepString = "オフセット(ＵＶ)";
            } else if (productDto.getPrintMethod() == 2) {
                Integer colorIdF = productDto.getColorIdF();
                Integer colorIdB = productDto.getColorIdB();

                if ((colorIdF == 10 && colorIdB == 1) || (colorIdF == 1 && colorIdB == 10)) {
                    // ﾃﾞｼﾞﾀﾙ片面(ｶﾗｰ4C)
                    stepString = " ﾃﾞｼﾞﾀﾙ片面(ｶﾗｰ4C)";
                } else if ((colorIdF == 11 && colorIdB == 1) || (colorIdF == 1 && colorIdB == 11)) {
                    // ﾃﾞｼﾞﾀﾙ片面(ｶﾗｰ7C)
                    stepString = "ﾃﾞｼﾞﾀﾙ片面(ｶﾗｰ7C)";
                } else if ((colorIdF == 9 && colorIdB == 1) || (colorIdF == 1 && colorIdB == 9)) {
                    // ﾃﾞｼﾞﾀﾙ片面(ﾓﾉｸﾛ)
                    stepString = "ﾃﾞｼﾞﾀﾙ片面(ﾓﾉｸﾛ)";
                } else if ((colorIdF == 10 && colorIdB == 10)) {
                    // ﾃﾞｼﾞﾀﾙ両面(ｶﾗｰ4C)
                    stepString = "ﾃﾞｼﾞﾀﾙ両面(ｶﾗｰ4C)";
                } else if ((colorIdF == 10 && colorIdB == 9) || (colorIdF == 9 && colorIdB == 10)) {
                    // ﾃﾞｼﾞﾀﾙ両面(ｶﾗｰ4C+ﾓﾉｸﾛ)
                    stepString = "ﾃﾞｼﾞﾀﾙ両面(ｶﾗｰ4C+ﾓﾉｸﾛ)";
                } else if ((colorIdF == 11 && colorIdB == 10) || (colorIdF == 10 && colorIdB == 11)) {
                    // ﾃﾞｼﾞﾀﾙ両面(ｶﾗｰ7C+ｶﾗｰ4C)
                    stepString = "ﾃﾞｼﾞﾀﾙ両面(ｶﾗｰ7C+ｶﾗｰ4C)";
                } else if ((colorIdF == 11 && colorIdB == 11)) {
                    // ﾃﾞｼﾞﾀﾙ両面(ｶﾗｰ7C+ｶﾗｰ7C)
                    stepString = "ﾃﾞｼﾞﾀﾙ両面(ｶﾗｰ7C+ｶﾗｰ7C)";
                } else if ((colorIdF == 11 && colorIdB == 9) || (colorIdF == 9 && colorIdB == 11)) {
                    // ﾃﾞｼﾞﾀﾙ両面(ｶﾗｰ7C+ﾓﾉｸﾛ)
                    stepString = "ﾃﾞｼﾞﾀﾙ両面(ｶﾗｰ7C+ﾓﾉｸﾛ)";
                } else if ((colorIdF == 9 && colorIdB == 9)) {
                    // ﾃﾞｼﾞﾀﾙ両面(ﾓﾉｸﾛ)
                    stepString = "ﾃﾞｼﾞﾀﾙ両面(ﾓﾉｸﾛ)";
                }
            }
        } else if (productDto.getShapeId() != null && productDto.getShapeId() == 98) { // mỹ phẩm
            if (productDto.getPrintMethod() == 1) {
                stepString = "オフセット(ＵＶ)";
            }
            if (productDto.getPrintMethod() == 2) {
                if ((productDto.getColorIdF() == 10 && productDto.getColorIdB() == 1) || (productDto.getColorIdF() == 1 && productDto.getColorIdB() == 10)) {
                    // ﾃﾞｼﾞﾀﾙ片面(ｶﾗｰ4C)
                    stepString = "ﾃﾞｼﾞﾀﾙ片面(ｶﾗｰ4C)";
                } else if ((productDto.getColorIdF() == 11 && productDto.getColorIdB() == 1) || (productDto.getColorIdF() == 1 && productDto.getColorIdB() == 11)) {
                    // ﾃﾞｼﾞﾀﾙ片面(ｶﾗｰ7C)
                    stepString = "ﾃﾞｼﾞﾀﾙ片面(ｶﾗｰ7C)";
                } else if ((productDto.getColorIdF() == 9 && productDto.getColorIdB() == 1) || (productDto.getColorIdF() == 1 && productDto.getColorIdB() == 9)) {
                    // ﾃﾞｼﾞﾀﾙ片面(ﾓﾉｸﾛ)
                    stepString = "ﾃﾞｼﾞﾀﾙ片面(ﾓﾉｸﾛ)";
                } else if ((productDto.getColorIdF() == 10 && productDto.getColorIdB() == 10)) {
                    // ﾃﾞｼﾞﾀﾙ両面(ｶﾗｰ4C)
                    stepString = "ﾃﾞｼﾞﾀﾙ両面(ｶﾗｰ4C)";
                } else if ((productDto.getColorIdF() == 10 && productDto.getColorIdB() == 9) || (productDto.getColorIdF() == 9 && productDto.getColorIdB() == 10)) {
                    // ﾃﾞｼﾞﾀﾙ両面(ｶﾗｰ4C+ﾓﾉｸﾛ)
                    stepString = "ﾃﾞｼﾞﾀﾙ両面(ｶﾗｰ4C+ﾓﾉｸﾛ)";
                } else if ((productDto.getColorIdF() == 11 && productDto.getColorIdB() == 10) || (productDto.getColorIdF() == 10 && productDto.getColorIdB() == 11)) {
                    // ﾃﾞｼﾞﾀﾙ両面(ｶﾗｰ7C+ｶﾗｰ4C)
                    stepString = "ﾃﾞｼﾞﾀﾙ両面(ｶﾗｰ7C+ｶﾗｰ4C)";
                } else if ((productDto.getColorIdF() == 11 && productDto.getColorIdB() == 11)) {
                    // ﾃﾞｼﾞﾀﾙ両面(ｶﾗｰ7C+ｶﾗｰ7C)
                    stepString = "ﾃﾞｼﾞﾀﾙ両面(ｶﾗｰ7C+ｶﾗｰ7C)";
                } else if ((productDto.getColorIdF() == 11 && productDto.getColorIdB() == 9) || (productDto.getColorIdF() == 9 && productDto.getColorIdB() == 11)) {
                    // ﾃﾞｼﾞﾀﾙ両面(ｶﾗｰ7C+ﾓﾉｸﾛ)
                    stepString = "ﾃﾞｼﾞﾀﾙ両面(ｶﾗｰ7C+ﾓﾉｸﾛ)";
                } else if ((productDto.getColorIdF() == 9 && productDto.getColorIdB() == 9)) {
                    // ﾃﾞｼﾞﾀﾙ両面(ﾓﾉｸﾛ)
                    stepString = "ﾃﾞｼﾞﾀﾙ両面(ﾓﾉｸﾛ)";
                }
            }
            if (productDto.getPrintMethod() == 3 && hasBishoFlexographyStep(productDto) ) {
                stepString = "ＦＤ（印刷のみ）";
            }
        }
        if (StringUtils.isNotEmpty(stepString)) {
            stepTemp = new Step();
            stepTemp.setStep1(stepString);
            return stepTemp;
        }

        return null;
    }

    /**
     * 美粧 FD(印刷のみ) 工程ありかどうかを判定する
     *
     * @param productDto 商品情報
     * @return true: FD(印刷のみ) あり, false: FD(印刷のみ) なし
     */
    private static boolean hasBishoFlexographyStep(ProductDto productDto) {
    		// Assert productDto.shapeId = 98 // 美粧
    		// Assert productDto.printMethod = 3 // フレキソ印刷

    		// 使用色数が空欄もしくは 0 色の場合は印刷工程なし
    		Integer colorIdF = productDto.getColorIdF();
    		return colorIdF != null && colorIdF != 0/*空欄*/ && colorIdF != 1/*0色*/;
    }

    /**
     * 2PP 表面加工 Front/ Gia công bề mặt Front - 表面加工 Back/ Gia công bề mặt Back
     * get data 2pp surface treatment step for shape and decorative
     * if not have 2pp surface treatment step return null
     *
     * @param productDto
     * @return step
     */
    public Step get_Data_2PP_Surface_Treatment_Front_Shape_Decorative(ProductDto productDto) {
        String stepString = Constants.BLANK;
        Step stepTemp;

        if ((productDto.getShapeId() != null && productDto.getShapeId() != 98) || productDto.getShapeId() == null) { //hộp giấy
            stepString = "ＳＳ０";
        } else if (productDto.getShapeId() != null && productDto.getShapeId() == 98) { // mỹ phẩm
            //TODO
        }


        if (StringUtils.isNotEmpty(stepString)) {
            stepTemp = new Step();
            stepTemp.setStep1(stepString);
            return stepTemp;
        }
        return null;
    }

    /**
     * 2PP 表面加工 Back/ Gia công bề mặt Back
     * get data 2pp surface treatment step for shape and decorative
     * if not have 2pp surface treatment step return null
     *
     * @param surfaceTreatmentBackId
     * @return step
     */
    public Step get_Data_2PP_Surface_Treatment_Back_Shape_Decorative(Integer surfaceTreatmentBackId) {
        String stepString = Constants.BLANK;
        Step stepTemp;
        if (surfaceTreatmentBackId != null) {
            if (surfaceTreatmentBackId == 4 || surfaceTreatmentBackId == 12 || surfaceTreatmentBackId == 13 || surfaceTreatmentBackId == 18) {
                stepString = "ＳＳ０";
            }
        }
        if (StringUtils.isNotEmpty(stepString)) {
            stepTemp = new Step();
            stepTemp.setStep1(stepString);
            return stepTemp;
        }
        return null;
    }

    /**
     * 表面加工 Front/ Gia công bề mặt Front - 表面加工 Back/ Gia công bề mặt Back
     * get data surface treatment step for shape and decorative
     * if not have surface treatment step return null
     *
     * @param productDto 商品情報
     * @param back false: 表, true: 裏
     * @return step 生産工程
     */
    public Step get_Data_Surface_Treatment_Shape_Decorative(ProductDto productDto, boolean back) {
        String stepString = Constants.BLANK;
        Step stepTemp;
        if ((productDto.getShapeId() != null && productDto.getShapeId() != 98) || productDto.getShapeId() == null) { //hộp giấy
            Integer surfaceTreatmentId = back ? productDto.getSurfaceTreatmentIdB() : productDto.getSurfaceTreatmentIdF();

            if (surfaceTreatmentId != null) {
                stepString = getSurfacestepString(surfaceTreatmentId);
            }
            if (productDto.getPrintMethod() != null && productDto.getPrintMethod() == 2
                    && (surfaceTreatmentId == 8/*UVOPニス*/ || surfaceTreatmentId == 17/*UVOPマット*/ || surfaceTreatmentId > 18)) {
                stepString = "オフセット(ＵＶ)";
            }

        } else if (productDto.getShapeId() != null && productDto.getShapeId() == 98) { // mỹ phẩm
            //TODO
        }


        if (StringUtils.isNotEmpty(stepString)) {
            stepTemp = new Step();
            stepTemp.setStep1(stepString);
            return stepTemp;
        }
        return null;
    }

    /**
     * エンボス加工/ Gia công in nổi(emboss)
     * get data surface embossing step for shape and decorative
     * if not have surface embossing step return null
     *
     * @param productDto
     * @return step
     */
    public Step get_Data_Surface_Embossing_Shape_Decorative(ProductDto productDto) {
        String stepString = Constants.BLANK;
        Step stepTemp;
        if ((productDto.getShapeId() != null && productDto.getShapeId() != 98) || productDto.getShapeId() == null) { //hộp giấy
            if (productDto.getEmbossingCode() != null && !"0".equals(productDto.getEmbossingCode())) {
                switch (productDto.getEmbossingCode()) {
                    case "EB005":
                        stepString = "エンボス キャンバス布目";
                        break;
                    case "EB004":
                        stepString = "エンボス つむぎ";
                        break;
                    case "EB006":
                        stepString = "エンボス ヘアーカール";
                        break;
                    case "EB007":
                        stepString = "エンボス ヘアーライン";
                        break;
                    case "EB002":
                        stepString = "エンボス 絹目";
                        break;
                    case "EB003":
                        stepString = "エンボス 絹目格子";
                        break;
                    case "EB008":
                        stepString = "エンボス 皮絞";
                        break;
                    case "EB009":
                        stepString = "エンボス 布目";
                        break;
                    case "EB001":
                        stepString = "エンボス 梨地";
                        break;
                    default:
                        stepString = Constants.BLANK;
                        break;
                }
            }
        } else if (productDto.getShapeId() != null && productDto.getShapeId() == 98) { // mỹ phẩm
            //TODO none
        }

        if (StringUtils.isNotEmpty(stepString)) {
            stepTemp = new Step();
            stepTemp.setStep1(stepString);
            return stepTemp;
        }
        return null;
    }

    /**
     * 片段（貼合の場合）/ 片段 (Trường hợp dán ghép)
     * get data one stage step for shape and decorative
     * if not have one stage step return null
     *
     * @param productDto
     * @return step
     */
    public Step get_Data_One_Stage_Shape_Decorative(ProductDto productDto) {
        String stepString = Constants.BLANK;
        Step stepTemp;
        Integer laminationFlute = productDto.getLaminationFlute();
        if (productDto.getProductType() == 0 && laminationFlute != null && (productDto.getShapeId() != null && productDto.getShapeId() != 98) || productDto.getShapeId() == null) {
            if (laminationFlute == 2 || laminationFlute == 3 || laminationFlute == 4) {
                stepString = "片段";
            }
        }
        if (StringUtils.isNotEmpty(stepString)) {
            stepTemp = new Step();
            stepTemp.setStep1(stepString);
            return stepTemp;
        }
        return null;
    }

    /**
     * ラミネート（貼合の場合）/ Laminate (Trường hợp dán ghép)
     * get data laminate step for shape and decorative
     * if not have laminate step return null
     *
     * @param productDto
     * @return step
     */
    public Step get_Data_Laminate_Shape_Decorative(ProductDto productDto) {
        String stepString = Constants.BLANK;
        Step stepTemp;
        Integer laminationFlute = productDto.getLaminationFlute();
        if (productDto.getProductType() == 0 && laminationFlute != null && (productDto.getShapeId() != null && (productDto.getShapeId() != 98) || productDto.getShapeId() == null) || productDto.getShapeId() == null) {
            if (laminationFlute == 2 || laminationFlute == 3 || laminationFlute == 4) {
                stepString = "ラミネート";
            }
        }
        if (StringUtils.isNotEmpty(stepString)) {
            stepTemp = new Step();
            stepTemp.setStep1(stepString);
            return stepTemp;
        }
        return null;
    }


    /**
     * 打ち抜き/ Bế
     * get data punching step for shape and decorative
     * if not have punching step return null
     *
     * @param productDto
     * @return step
     * <p>
     * http://fridaynight.vnext.vn/issues/3426
     */
    public Step get_Data_Punching_Shape_Decorative(ProductDto productDto) {
        String stepString = Constants.BLANK;
        Step stepTemp;

        if ((productDto.getShapeId() != null && productDto.getShapeId() != 98) || productDto.getShapeId() == null) { //hộp giấy
            if (productDto.getLaminationFlute() != null) {
                if (productDto.getLaminationFlute() == 3) {
                    //Trường hợp dán ghép BF: U003
                    stepString = "打抜き（EF･GF片段/BF貼合）";
                } else if (productDto.getLaminationFlute() == 2 || productDto.getLaminationFlute() == 4) {
                    //Trường hợp dán ghép khác: U002
                    stepString = "打抜き（EF･GFｼｰﾄ/貼合）";
                } else {
                    //Ngoài ra: U001
                    stepString = "打抜き（板紙）";
                }
            } else {
                //Ngoài ra: U001
                stepString = "打抜き（板紙）";
            }
        } else if (productDto.getShapeId() != null && productDto.getShapeId() == 98) { // mỹ phẩm
            if (productDto.getLaminationFlute() != null) {
                if ((productDto.getLaminationFlute() == 3 && productDto.getProductType() == 0)
                        || (productDto.getLaminationFlute() == 2 && productDto.getProductType() == 1)) {
                    //Trường hợp dán ghép BF: U003
                    stepString = "打抜き（EF･GF片段/BF貼合）";
                } else if ((productDto.getProductType() == 1 && (productDto.getLaminationFlute() == 1
                        || productDto.getLaminationFlute() == 3))
                        || (productDto.getProductType() == 0 && (productDto.getLaminationFlute() == 2
                        || productDto.getLaminationFlute() == 4))) {
                    //Trường hợp dán ghép khác: U002
                    stepString = "打抜き（EF･GFｼｰﾄ/貼合）";
                } else {
                    //Ngoài ra: U001
                    stepString = "打抜き（板紙）";
                }
            } else {
                //Ngoài ra: U001
                stepString = "打抜き（板紙）";
            }
        }
        if (StringUtils.isNotEmpty(stepString)) {
            stepTemp = new Step();
            stepTemp.setStep1(stepString);
            return stepTemp;
        }
        return null;
    }

    /**
     * 貼り/ Dán
     * get data pasting step for shape and decorative
     * if not have pasting step return null
     *
     * @param productDto
     * @return step
     */
    public Step get_Data_Pasting_Shape_Decorative(ProductDto productDto) {
        String stepString = Constants.BLANK;
        Step stepTemp;
        Integer pasteId = productDto.getPasteId();
        Integer laminationFlute = productDto.getLaminationFlute();

        // 紙器・貼合・片段
        if ((productDto.getShapeId() != null && productDto.getShapeId() != 98) || productDto.getShapeId() == null) { //hộp giấy
            if (pasteId != null && pasteId != 0) {
                if (pasteId == 1) {
                    if (laminationFlute == 3) {
                        stepString = "サック AF･BF（胴貼）";
                    } else if (laminationFlute == 2 || laminationFlute == 4) {
                        stepString = "サック ＥＦ（胴貼）";
                    } else if (laminationFlute == 1) {
                        stepString = "サック 紙器（胴貼）";
                    }
                } else if (pasteId == 2) {
                    if (laminationFlute == 3) {
                        stepString = "サック AF･BF（両サイド貼）";
                    } else if (laminationFlute == 2 || laminationFlute == 4) {
                        stepString = "サック ＥＦ（両サイド）";
                    } else if (laminationFlute == 1) {
                        stepString = "サック 紙器（両サイド貼）";
                    }
                } else if (pasteId == 3) {
                    if (laminationFlute == 3) {
                        stepString = "サック AF･BF（ワンタッチ貼）";
                    } else if (laminationFlute == 2 || laminationFlute == 4) {
                        stepString = "サック ＥＦ（ワンタッチ貼）";
                    } else if (laminationFlute == 1) {
                        stepString = "サック 紙器（ワンタッチ貼）";
                    }
                } else if (pasteId == 4) {
                    if (laminationFlute == 2 || laminationFlute == 3) {
                        stepString = "サック ＥＦ（2点貼）";
                    } else if (laminationFlute == 4) {
                        stepString = "サック ＧＦ（2点貼）";
                    } else if (laminationFlute == 1) {
                        stepString = "サック 紙器（8点貼)";
                    }
                } else if (pasteId == 5) {
                    if (laminationFlute == 2 || laminationFlute == 3 || laminationFlute == 4) {
                        stepString = "サック ＥＦ（4コーナー貼）";
                    } else if (laminationFlute == 1) {
                        stepString = "サック 紙器（4コーナー貼）";
                    }
                } else if (pasteId == 6) {
                    if (laminationFlute == 2 || laminationFlute == 3 || laminationFlute == 4) {
                        stepString = "サック ＥＦ（6コーナー貼）";
                    } else if (laminationFlute == 1) {
                        stepString = "サック 紙器（6コーナー貼）";
                    }
                } else {
                    stepString = "手貼り";
                }
            }

        // 美粧の場合
        } else if (productDto.getShapeId() != null && productDto.getShapeId() == 98) { //mỹ phẩm
            if (pasteId != null && pasteId != 0) {
                if (pasteId == 1) {
                    if (laminationFlute == 3) {
                        stepString = "サック AF･BF（胴貼）";
                    } else if (laminationFlute == 2) {
                        stepString = "サック ＥＦ（胴貼）";
                    }
                } else if (pasteId == 2) {
                    if (laminationFlute == 3) {
                        stepString = "サック AF･BF（両サイド貼）";
                    } else if (laminationFlute == 2) {
                        stepString = "サック ＥＦ（両サイド）";
                    }
                } else if (pasteId == 3) {
                    if (laminationFlute == 3) {
                        stepString = "サック AF･BF（ワンタッチ貼）";
                    } else if (laminationFlute == 2) {
                        stepString = "サック ＥＦ（ワンタッチ貼）";
                    }
                } else if (pasteId == 4) {
                    if (laminationFlute == 2 || laminationFlute == 3) {
                        stepString = "サック ＥＦ（2点貼）";
                    }
                } else if (pasteId == 5) {
                    if (laminationFlute == 2|| laminationFlute == 3) {
                        stepString = "サック ＥＦ（4コーナー貼）";
                    }
                } else if (pasteId == 6) {
                    if (laminationFlute == 2 || laminationFlute == 3) {
                        stepString = "サック ＥＦ（6コーナー貼）";
                    }
                } else {
                    stepString = "手貼り";
                }
            }
        }


        if (StringUtils.isNotEmpty(stepString)) {
            stepTemp = new Step();
            stepTemp.setStep1(stepString);
            return stepTemp;
        }
        return null;
    }


    /**
     * 検品/ Kiểm tra
     * get data checking step for shape and decorative
     * if not have checking step return null
     *
     * @param productDto
     * @return step
     */
    public Step get_Data_Checking_Shape_Decorative(ProductDto productDto) {
        String stepString = "検品";
        Step stepTemp;

        if (StringUtils.isNotEmpty(stepString)) {
            stepTemp = new Step();
            stepTemp.setStep1(stepString);
            return stepTemp;
        } else
            return null;
    }

    /**
     * 検品/ Đóng gói
     * get_Data_Packing_Shape_Decorative
     *
     * @param productDto
     * @return step
     */

    public Step get_Data_Packing_Shape_Decorative(ProductDto productDto) {
        String stepString = StringUtils.EMPTY;
        Step stepTemp;

        if ((productDto.getShapeId() != null && productDto.getShapeId() != 98) || productDto.getShapeId() == null) { //hộp giấy
            if (productDto.getPackingId() != null) {
                if (productDto.getPackingId() == 1) {
                    //結束: "04"
                    stepString = "結束梱包";
                } else if ((productDto.getPackingId() == 2 || productDto.getPackingId() == 3)
                        && (productDto.getPasteId() == null || (productDto.getPasteId()) != null && (productDto.getPasteId() == 0 || productDto.getPasteId() == 7))) {
                    //社用通函（ダンボール梱包）
                    // Carton: 社用通函（ダンボール梱包）
                    stepString = "段ボール梱包";
                } else if (productDto.getPackingId() == 4) {
                    //シュリンク梱包
                    stepString = "シュリンク梱包";
                } else if (productDto.getPackingId() == 5) {
                    //シュリンク梱包
                    stepString = "クラフト梱包";
                } else if (productDto.getPackingId() == 6 || productDto.getPackingId() == 7
                        || productDto.getPackingId() == 8 || productDto.getPackingId() == 9) {
                    //複合梱包（シュリンク＋ダンボール胴巻）
                    // K2: 複合梱包（シュリンク＋ダンボール胴巻）
                    stepString = "複数梱包 ";
                }
            }
        } else if (productDto.getShapeId() != null && productDto.getShapeId() == 98) { // mỹ phẩm
            if (productDto.getPackingId() != null) {
                if (productDto.getPackingId() == 1) {
                    //結束: "04"
                    stepString = "結束梱包";
                } else if (productDto.getPackingId() == 2 || productDto.getPackingId() == 3) {
                    //社用通函（ダンボール梱包）
                    // Carton: 社用通函（ダンボール梱包）
                    stepString = "段ボール梱包";
                } else if (productDto.getPackingId() == 4) {
                    //シュリンク梱包
                    stepString = "シュリンク梱包";
                } else if (productDto.getPackingId() == 5) {
                    //シュリンク梱包
                    stepString = "クラフト梱包";
                } else if (productDto.getPackingId() == 6 || productDto.getPackingId() == 7
                        || productDto.getPackingId() == 8 || productDto.getPackingId() == 9) {
                    //複合梱包（シュリンク＋ダンボール胴巻）
                    // K2: 複合梱包（シュリンク＋ダンボール胴巻）
                    stepString = "複数梱包";
                }
            }
        }

        if (StringUtils.isNotEmpty(stepString)) {
            stepTemp = new Step();
            stepTemp.setStep1(stepString);
            return stepTemp;
        }
        return null;
    }


    /**
     * 箔押し/ Mạ
     * get_Data_Stamping_Shape_Decorative
     *
     * @param productDto
     * @return step
     */

    public Step get_Data_Stamping_Shape_Decorative(ProductDto productDto) {
        String stepString = StringUtils.EMPTY;
        Step stepTemp;
        if (productDto.getStampingId() != null) {
            if (productDto.getStampingId() == 1) {
                stepString = "箔押";
            } else if (productDto.getStampingId() == 2) {
                stepString = "箔押（型押し）";
            } else if (productDto.getStampingId() == 3) {
                stepString = "箔押（浮き出し）";
            }
        }

        if (StringUtils.isNotEmpty(stepString)) {
            stepTemp = new Step();
            stepTemp.setStep1(stepString);
            return stepTemp;
        }
        return null;
    }


    /**
     * 窓貼り/ Dán cửa sổ
     * get_Data_Window_Sticking_Shape_Decorative
     *
     * @param productDto
     * @return step
     */

    public Step get_Data_Window_Sticking_Shape_Decorative(ProductDto productDto) {
        String stepString = "窓貼り";
        Step stepTemp;
        if (StringUtils.isNotEmpty(stepString)) {
            stepTemp = new Step();
            stepTemp.setStep1(stepString);
            return stepTemp;
        }
        return null;
    }

    /**
     * Use for check if paper code start with A or not
     *
     * @param productDto
     * @return true if paper code start with A
     */
    private boolean checkPaperStartWithA(ProductDto productDto) {
        //Get Correct Paper Code for Product
        List<MstSheetSizeDto> mstSheetSizeDtos = mstSheetSizeDao.findSheetSizeByPaperIdAndSize(productDto.getPaperId(), productDto.getPaperSizeW(), productDto.getPaperSizeH());
        // Check Condition
        if (!mstSheetSizeDtos.isEmpty()) {
            MstSheetSizeDto mstSheetSizeDto = mstSheetSizeDtos.get(0);
            if (mstSheetSizeDto != null && mstSheetSizeDto.getPaperCode().startsWith("A")) {
                return true;
            }
        }
        return false;
    }

    private String getSurfacestepString(int id) {
        String result = org.apache.commons.lang3.StringUtils.EMPTY;
        switch (id) {
            case 6:
                //UVクリアニス インライン
                result = "ＵＶクリアニス(インライン)";
                break;
            case 7:
                //UVマットニス インライン
                result = "ＵＶマットニス（インライン）";
                break;
            case 9:
                //水性ニス
                result = "水性ニス";
                break;
            case 2:
                //ビニール引き（インライン）：ビニール（インライン）
                result = "ビニール(インライン)";
                break;
            case 3:
                //ビニール引き（オフライン）：ビニール（オフライン）
                result = "ビニール(オフライン)";
                break;
            case 10:
                //ビニール引き（マット・インライン）：マットビニール（インライン）(BN003)
                result = "マットビニール(インライン)";
                break;
            case 11:
                //ビニール引き（マット・オフライン）：マットビニール（オフライン）(BN004)
                result = "マットビニール(オフライン)";
                break;
            case 1:
                //水性プレス
                result = "プレスコート";
                break;
            case 14:
                //プレスコート（またはクリスタルP）
                result = "プレスコート";
                break;
            case 4:
                //PP貼り
                result = "ＰＰ貼り(15μ)";
                break;
            case 12:
                //PPベタ窓
                result = "ＰＰ貼り(15μ)ベタ窓有り";
                break;
            case 13:
                //PP20
                result = "ＰＰ貼り(20μ)";
                break;
            case 18:
                //PP20μベタ窓
                result = "ＰＰ貼り(20μ)ベタ窓有り";
                break;
            case 19:
                //擬似エンボス（ハード/クリア）
                result = "ＵＶクリアニス(インライン)";
                break;
            case 20:
                //擬似エンボス（ライト/クリア）
                result = "ＵＶクリアニス(インライン)";
                break;
            case 21:
                //擬似エンボス（ハード/マット）
                result = "ＵＶクリアニス(インライン)";
                break;
            case 22:
                //擬似エンボス（ライト/マット）
                result = "ＵＶクリアニス(インライン)";
                break;

        }
        return result;
    }

    /**
     * 段ボール 別加工(+梱包) 情報を元に追加加工欄用のリストを生成する
     *
     * @param productDto 商品情報
     * @return 追加加工欄用のリスト
     */
    public List<ExtraStepModel> cartonExtraStepList(@Nonnull ProductDto productDto) {
        // Assert productDto.productType = 1  // 段ボール
        List<ExtraStepModel> extraStepList = new ArrayList<>(8);  // 8: 欄の最大数

        ProcessOtherMethod method1 = ProcessOtherMethod.valueOf(productDto.getOtherMethod1());
        ProcessOtherMethod method2 = ProcessOtherMethod.valueOf(productDto.getOtherMethod2());

        // カットテープ
        BigDecimal cartonTapeCutting = productDto.getCartonTapeCutting();
        if (cartonTapeCutting != null && cartonTapeCutting.doubleValue() > 0) {
            extraStepList.add(new ExtraStepModel("カットテープ"));
        }

        // 撥水加工
        WaterRepellent waterRepellent = WaterRepellent.valueOf(productDto.getWaterRepellentFlag());
        if (waterRepellent == WaterRepellent.FRONT) {
            extraStepList.add(new ExtraStepModel("表撥水"));
        } else if (waterRepellent == WaterRepellent.BACK) {
            extraStepList.add(new ExtraStepModel("裏撥水"));
        } else if (waterRepellent == WaterRepellent.FRONT_BACK) {
            extraStepList.add(new ExtraStepModel("両面撥水"));
        }

        // 変形フラップ
        if (method1 == ProcessOtherMethod.FLAP_MODIFICATION || method2 == ProcessOtherMethod.FLAP_MODIFICATION) {
            UpperLower upperLower = productSizeHelper.calcRelativeFlap(productDto);
            String displayString = String.format("変形ﾌﾗｯﾌﾟ 上%+.0fmm 下%+.0fmm", upperLower.getUpper(), upperLower.getLower());
            extraStepList.add(new ExtraStepModel(displayString));
        }

        // 梱包
        CartonPacking cartonPacking = CartonPacking.valueOf(productDto.getPackingId());
        if (cartonPacking == CartonPacking.CRAFT_KODAMA) {
            extraStepList.add(new ExtraStepModel("ｺﾀﾞﾏｼｷ外注　ｸﾗﾌﾄ梱包"));
        } else if (cartonPacking == CartonPacking.CRAFT_WORKPIA_TENZAN) {
            extraStepList.add(new ExtraStepModel("ﾜｰｸﾋﾟｱ天山　ｸﾗﾌﾄ梱包"));
        } else if (productHelper.isCartonSheet(productDto) && cartonPacking == CartonPacking.BAND) {
            extraStepList.add(new ExtraStepModel("結束"));
        }

        // その他加工
        String processOtherMethod;
        processOtherMethod = specificationProcessOtherMethod(method1);
        if (processOtherMethod != null) {
            extraStepList.add(new ExtraStepModel(processOtherMethod));
        }
        processOtherMethod = specificationProcessOtherMethod(method2);
        if (processOtherMethod != null) {
            extraStepList.add(new ExtraStepModel(processOtherMethod));
        }

        //
        return extraStepList;
    }

    /**
     * 段ボール 別加工 その他加工を製造仕様書出力形式に変換する
     *
     * @param processOtherMethod その他加工
     * @return 出力文字列 (null: その他加工なし)
     */
    private static String specificationProcessOtherMethod(ProcessOtherMethod processOtherMethod) {
        if (processOtherMethod == ProcessOtherMethod.OUTSOURCING_KODAMA) {
            return "ｺﾀﾞﾏｼｷ外注";
        } else if (processOtherMethod == ProcessOtherMethod.DIE_CUTTING_KODAMA) {
            return "ｺﾀﾞﾏｼｷ打抜外注";
        } else if (processOtherMethod == ProcessOtherMethod.NIBUNGIRI_SHIKIRI) {
            return "連立二分切り";
        } else if (processOtherMethod == ProcessOtherMethod.SHIPPING_CARTON_SAGA) {
            return "佐賀工場通函";
        } else if (processOtherMethod == ProcessOtherMethod.SHIPPING_CARTON_TAKU) {
            return "多久工場通函";
        } else {
            return null;
        }
    }

    /**
     * 表面印刷工程ありかどうか判定する
     *
     * @param product 製品
     * @return true: あり, false: なし
     */
    private static boolean hasFrontPrintProcess(ProductDto product) {
        Integer printMethod = product.getPrintMethod();
        return printMethod != null && (printMethod == 1 || printMethod == 2 || printMethod == 3)
                && product.getColorIdF() != null && product.getColorIdF() > 1;
    }

    /**
     * 裏面印刷工程ありかどうか判定する
     *
     * @param product 製品
     * @return true: あり, false: なし
     */
    private static boolean hasBackPrintProcess(ProductDto product) {
        return product.getPrintMethod() != null && product.getPrintMethod() == 1 && product.getColorIdB() != null && product.getColorIdB() > 1;
    }

}
