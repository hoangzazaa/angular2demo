package vn.vnext.sefuri.sf.module.export.helper;

import com.auth0.jwt.internal.org.apache.commons.lang3.StringUtils;
import com.google.common.base.Strings;
import com.google.common.collect.Lists;
import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.dao.MstSheetSizeDao;
import vn.vnext.sefuri.sf.dto.MstSheetSizeDto;
import vn.vnext.sefuri.sf.dto.ProductDto;
import vn.vnext.sefuri.sf.module.export.model.Step;

import javax.inject.Inject;
import java.util.List;

/**
 * Helper help export r007 pdf
 * <p>
 * Created by NgocNM on 9/1/2017.
 */
public class Helper {
    /*@Inject
    private MstSheetSizeDao mstSheetSizeDao;

    *//**
     * get list data step for export r007 pdf
     *
     * @param productDto
     * @return list of steps
     *//*
    public List<Step> getListStepData(ProductDto productDto) {
        // get list id of step
        List<Integer> listStepId;
        if (this.isEqualDennoSteps(productDto)) {
            listStepId = this.getListSaleFrontStepForShapeAndDecorative(productDto);
        } else {
            listStepId = this.getListDennoStep(productDto.getStepDenno());
        }

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

    *//**
     * get data for each step
     *
     * @param stepId
     * @return step
     *//*
    public Step getStepDataEachStepForShapeAndDecorative(Integer stepId, ProductDto productDto) {
        Step stepTemp = null;
        boolean isPrintMethodTmp = false;
        if (stepId == EnumsPDF.ShapeStep.CUTTING.getValue()) {

            stepTemp = this.get_Data_Cutting_Shape_Decorative(productDto);

        } else if (stepId == EnumsPDF.ShapeStep.ANCHOR_COAT.getValue()) {

            stepTemp = this.get_Data_Anchor_Coat_Shape_Decorative(productDto);

        } else if (stepId == EnumsPDF.ShapeStep.PRINT_METHOD_FRONT.getValue()) {

            if (productDto.getPrintMethod() == 0 && productDto.getSurfaceTreatmentIdB() != null && (productDto.getSurfaceTreatmentIdB() > 18 || productDto.getSurfaceTreatmentIdB() == 17 || productDto.getSurfaceTreatmentIdB() == 8)) {
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

            stepTemp = this.get_Data_2PP_Surface_Treatment_Front_Shape_Decorative(productDto.getSurfaceTreatmentIdF());

        } else if (stepId == EnumsPDF.ShapeStep.PUNCHING_FRONT.getValue()) {

            stepTemp = this.get_Data_Punching_Shape_Decorative(productDto);

        } else if (stepId == EnumsPDF.ShapeStep.SURFACE_TREATMENT_FRONT.getValue()) {

            stepTemp = this.get_Data_Surface_Treatment_Shape_Decorative(productDto.getSurfaceTreatmentIdF());

        } else if (stepId == EnumsPDF.ShapeStep.PP_SURFACE_TREATMENT_BACK.getValue()) {

            stepTemp = this.get_Data_2PP_Surface_Treatment_Front_Shape_Decorative(productDto.getSurfaceTreatmentIdF());

        } else if (stepId == EnumsPDF.ShapeStep.PUNCHING_BACK.getValue()) {

            stepTemp = this.get_Data_Punching_Shape_Decorative(productDto);

        } else if (stepId == EnumsPDF.ShapeStep.SURFACE_TREATMENT_BACK.getValue()) {

            stepTemp = this.get_Data_Surface_Treatment_Shape_Decorative(productDto.getSurfaceTreatmentIdF());

        } else if (stepId == EnumsPDF.ShapeStep.EMBOSSING.getValue()) {

            stepTemp = this.get_Data_Surface_Embossing_Shape_Decorative(productDto);

        } else if (stepId == EnumsPDF.ShapeStep.ONE_STAGE.getValue()) {

            stepTemp = this.get_Data_One_Stage_Shape_Decorative(productDto);

        } else if (stepId == EnumsPDF.ShapeStep.LAMINATE.getValue()) {

            stepTemp = this.get_Data_Laminate_Shape_Decorative(productDto);

        } else if (stepId == EnumsPDF.ShapeStep.PUNCHING.getValue()) {

            stepTemp = this.get_Data_Punching_Shape_Decorative(productDto);

        } else if (stepId == EnumsPDF.ShapeStep.STAMPING.getValue()) {

            // has other area display data

        } else if (stepId == EnumsPDF.ShapeStep.WINDOW_STICKING.getValue()) {

            // has other area display data

        } else if (stepId == EnumsPDF.ShapeStep.PASTING.getValue()) {

            stepTemp = this.get_Data_Pasting_Shape_Decorative(productDto);

        } else if (stepId == EnumsPDF.ShapeStep.CHECKING.getValue()) {

            stepTemp = this.get_Data_Checking_Shape_Decorative(productDto);

        } else if (stepId == EnumsPDF.ShapeStep.PACKING.getValue()) {
            // has other area display data
        }
        return stepTemp;
    }

    *//**
     * steps are different with denno return false
     * steps is same with denno or null return true;
     * default return true
     *
     * @param productDto
     * @return
     *//*
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

    *//**
     * get list step denno
     *
     * @param listDennoStepString
     * @return
     *//*
    public List<Integer> getListDennoStep(String listDennoStepString) {
        List<Integer> dennoStepModels = Lists.newArrayList();
        String[] regexsStep = listDennoStepString.split(Constants.SLASH);
        if (regexsStep.length > 0) {
            for (String stepString : regexsStep) {
                dennoStepModels.add(Integer.parseInt(stepString));
            }
        }
        return dennoStepModels;
    }

    *//**
     * Get list step from data sale front for carton case
     *
     * @param productDto
     * @return list step
     *//*
    public List<Integer> getListSaleFrontStepForCartonCase(ProductDto productDto) {
        List<Integer> saleFrontStepModels = Lists.newArrayList();
        // TODO:
        return saleFrontStepModels;
    }

    *//**
     * Get list step from data sale front  for carton sheet
     *
     * @param productDto
     * @return list step
     *//*
    public List<Integer> getListSaleFrontStepForCartonSheet(ProductDto productDto) {
        List<Integer> saleFrontStepModels = Lists.newArrayList();
        // TODO:
        return saleFrontStepModels;
    }

    *//**
     * Get list step from data sale front
     *
     * @param productDto
     * @return list step
     *//*
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
        if (productDto.getPrintMethod() != null && (productDto.getPrintMethod() == 1 || productDto.getPrintMethod() == 2)) {
            saleFrontStepModels.add(EnumsPDF.ShapeStep.PRINT_METHOD_FRONT.getValue());
        }

        // 3. 印刷方法/ Phương pháp in back
        if (productDto.getPrintMethod() != null && productDto.getPrintMethod() == 1 && productDto.getColorIdB() != null && productDto.getColorIdB() > 1) {
            saleFrontStepModels.add(EnumsPDF.ShapeStep.PRINT_METHOD_BACK.getValue());
        }

        // 4. 2PP_表面加工 Front/ Gia công bề mặt Front
        if (productDto.getSurfaceTreatmentIdF() != null &&
                (productDto.getSurfaceTreatmentIdF() == 4 || productDto.getSurfaceTreatmentIdF() == 12
                        || productDto.getSurfaceTreatmentIdF() == 13 || productDto.getSurfaceTreatmentIdF() == 18)) {
            saleFrontStepModels.add(EnumsPDF.ShapeStep.PP_SURFACE_TREATMENT_FRONT.getValue());
            if (productDto.getSurfaceTreatmentIdF() == 12 || productDto.getSurfaceTreatmentIdF() == 18) {
                saleFrontStepModels.add(EnumsPDF.ShapeStep.PUNCHING_FRONT.getValue());
            }
        }

        // 5. 表面加工 Front/ Gia công bề mặt Front
        if (productDto.getSurfaceTreatmentIdF() != null && productDto.getSurfaceTreatmentIdF() != 8 && productDto.getSurfaceTreatmentIdF() != 17) {
            saleFrontStepModels.add(EnumsPDF.ShapeStep.SURFACE_TREATMENT_FRONT.getValue());
        }

        // 6. 2PP 表面加工 Back/ Gia công bề mặt Back
        if (productDto.getSurfaceTreatmentIdB() != null &&
                (productDto.getSurfaceTreatmentIdB() == 4 || productDto.getSurfaceTreatmentIdB() == 12
                        || productDto.getSurfaceTreatmentIdB() == 13 || productDto.getSurfaceTreatmentIdB() == 18)) {
            saleFrontStepModels.add(EnumsPDF.ShapeStep.PP_SURFACE_TREATMENT_BACK.getValue());
            if (productDto.getSurfaceTreatmentIdB() == 12 || productDto.getSurfaceTreatmentIdB() == 18) {
                saleFrontStepModels.add(EnumsPDF.ShapeStep.PUNCHING_BACK.getValue());
            }
        }

        // 7. 2PP 表面加工 Back/ Gia công bề mặt Back
        if (productDto.getSurfaceTreatmentIdB() != null && productDto.getSurfaceTreatmentIdB() != 8 && productDto.getSurfaceTreatmentIdB() != 17) {
            saleFrontStepModels.add(EnumsPDF.ShapeStep.SURFACE_TREATMENT_BACK.getValue());
        }

        // 8. エンボス加工/ Gia công in nổi(emboss)
        if (productDto.getEmbossingCode() != null && !"0".equals(productDto.getEmbossingCode())) {
            saleFrontStepModels.add(EnumsPDF.ShapeStep.EMBOSSING.getValue());
        }

        // 9. 片段（貼合の場合）/ 片段 (Trường hợp dán ghép)
        // 10.ラミネート（貼合の場合）/ Laminate (Trường hợp dán ghép)
        if (productDto.getLaminationFlute() != null
                && (productDto.getLaminationFlute() == 2 || productDto.getLaminationFlute() == 3 || productDto.getLaminationFlute() == 4)) {
            saleFrontStepModels.add(EnumsPDF.ShapeStep.ONE_STAGE.getValue());
            saleFrontStepModels.add(EnumsPDF.ShapeStep.LAMINATE.getValue());
        }

        // 11. 打ち抜き/ Bế
        if (productDto.getDieCuttingFlag() != null && productDto.getDieCuttingFlag() == 1) {
            saleFrontStepModels.add(EnumsPDF.ShapeStep.PUNCHING.getValue());
        }

        // 12. 箔押し/ Mạ
        if (productDto.getStampingId() != null && (productDto.getStampingId() == 1 || productDto.getStampingId() == 2 || productDto.getStampingId() == 3)) {
            saleFrontStepModels.add(EnumsPDF.ShapeStep.STAMPING.getValue());
        }

        // 13. 窓貼り/ Dán cửa sổ
        if (productDto.getWindowSizeH() != null && productDto.getWindowSizeH() != 0 && productDto.getWindowSizeW() != null && productDto.getWindowSizeW() != 0) {
            saleFrontStepModels.add(EnumsPDF.ShapeStep.WINDOW_STICKING.getValue());
        }

        // 14. 貼り/ Dán
        if (productDto.getPasteId() != null) {
            saleFrontStepModels.add(EnumsPDF.ShapeStep.PASTING.getValue());
        }

        // 15. 検品/ Kiểm tra
        if (productDto.getInspectionId() != null && productDto.getInspectionId() != 1) {
            saleFrontStepModels.add(EnumsPDF.ShapeStep.CHECKING.getValue());
        }

        // 16. 梱包/ Đóng gói
        if (productDto.getPackingId() != null) {
            saleFrontStepModels.add(EnumsPDF.ShapeStep.PACKING.getValue());
        }

        return saleFrontStepModels;
    }


    *//**
     * 1. 断裁/ Cutting Implement
     * get data cutting step for shape and decorative.
     * If not have cutting step return null.
     *
     * @param productDto
     * @return step
     *//*
    public Step get_Data_Cutting_Shape_Decorative(ProductDto productDto) {
        String stepString = Constants.BLANK;
        Step stepTemp;
        boolean isDifference = false;

        if (productDto.getCutPaperSizeW() != null && !productDto.getCutPaperSizeW().equals(productDto.getBlankPaperSizeW())) {
            isDifference = true;
        }
        if (!isDifference && productDto.getCutPaperSizeH() != null && !productDto.getCutPaperSizeH().equals(productDto.getBlankPaperSizeH())) {
            isDifference = true;
        }

        if (isDifference && productDto.getShapeId() != null && productDto.getShapeId() != 98) {

            // cutting for shape
            stepString = "断裁";
        } else if (productDto.getProductType() == 0 && productDto.getShapeId() != null && productDto.getShapeId() == 98) {

            // cutting for decorative
            stepString = "美粧コルゲータ(C002)";
        }

        if (StringUtils.isNotEmpty(stepString)) {
            stepTemp = new Step();
            stepTemp.setStep1(stepString);
            return stepTemp;
        }
        return null;
    }

    *//**
     * 2. アンカーコート: Anchor Coat
     * get data anchor coat step for shape and decorative.
     * If not have anchor coat step return null.
     *
     * @param productDto
     * @return step
     *//*
    public Step get_Data_Anchor_Coat_Shape_Decorative(ProductDto productDto) {
        String stepString = Constants.BLANK;
        Step stepTemp;

        if (productDto.getPrintMethod() != null && productDto.getPrintMethod() == 2 && !checkPaperStartWithA(productDto)) {
            stepString = "アンカーコート";
        }

        if (StringUtils.isNotEmpty(stepString)) {
            stepTemp = new Step();
            stepTemp.setStep1(stepString);
            return stepTemp;
        }
        return null;
    }

    *//**
     * 印刷方法/ Phương pháp in
     * get data printing step for shape and decorative
     * if not have printing step return null
     *
     * @param productDto
     * @return step
     *//*
    public Step get_Data_Print_Method_Shape_Decorative(ProductDto productDto) {
        String stepString = Constants.BLANK;
        Step stepTemp;
        if (productDto.getPrintMethod() != null) {
            if (productDto.getShapeId() != null && productDto.getShapeId() != 98) {
                if (productDto.getPrintMethod() == 1) {
                    stepString = StringUtils.EMPTY;
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
            } else if (productDto.getShapeId() != null && productDto.getShapeId() == 98) {
                if (productDto.getPrintMethod() == 1) {
                    stepString = "オフセット印刷";
                }
                if (productDto.getPrintMethod() == 2) {
                    stepString = "デジタル印刷";
                }
                if (productDto.getPrintMethod() == 3) {
                    stepString = "フレキソ印刷";
                }
            }
            if (StringUtils.isNotEmpty(stepString)) {
                stepTemp = new Step();
                stepTemp.setStep1(stepString);
                return stepTemp;
            }
        }
        return null;
    }

    *//**
     * 2PP 表面加工 Front/ Gia công bề mặt Front - 表面加工 Back/ Gia công bề mặt Back
     * get data 2pp surface treatment step for shape and decorative
     * if not have 2pp surface treatment step return null
     *
     * @param surfaceTreatmentFrontId
     * @return step
     *//*
    public Step get_Data_2PP_Surface_Treatment_Front_Shape_Decorative(Integer surfaceTreatmentFrontId) {
        String stepString = Constants.BLANK;
        Step stepTemp;
        if (surfaceTreatmentFrontId != null) {
            if (surfaceTreatmentFrontId == 4 || surfaceTreatmentFrontId == 12 || surfaceTreatmentFrontId == 13 || surfaceTreatmentFrontId == 18) {
                stepString = "2PP Surface Treatment Front";
            }
        }
        if (StringUtils.isNotEmpty(stepString)) {
            stepTemp = new Step();
            stepTemp.setStep1(stepString);
            return stepTemp;
        }
        return null;
    }

    *//**
     * 2PP 表面加工 Back/ Gia công bề mặt Back
     * get data 2pp surface treatment step for shape and decorative
     * if not have 2pp surface treatment step return null
     *
     * @param surfaceTreatmentBackId
     * @return step
     *//*
    public Step get_Data_2PP_Surface_Treatment_Back_Shape_Decorative(Integer surfaceTreatmentBackId) {
        String stepString = Constants.BLANK;
        Step stepTemp;
        if (surfaceTreatmentBackId != null) {
            if (surfaceTreatmentBackId == 4 || surfaceTreatmentBackId == 12 || surfaceTreatmentBackId == 13 || surfaceTreatmentBackId == 18) {
                stepString = "2PP Surface Treatment Back";
            }
        }
        if (StringUtils.isNotEmpty(stepString)) {
            stepTemp = new Step();
            stepTemp.setStep1(stepString);
            return stepTemp;
        }
        return null;
    }

    *//**
     * 表面加工 Front/ Gia công bề mặt Front - 表面加工 Back/ Gia công bề mặt Back
     * get data surface treatment step for shape and decorative
     * if not have surface treatment step return null
     *
     * @param surfaceTreatmentId
     * @return step
     *//*
    public Step get_Data_Surface_Treatment_Shape_Decorative(Integer surfaceTreatmentId) {
        String stepString = Constants.BLANK;
        Step stepTemp;
        if (surfaceTreatmentId != null) {
            if (surfaceTreatmentId == 6) {
                // UVクリアニス（インライン）
                stepString = "UVクリアニス（インライン）";
            } else if (surfaceTreatmentId == 15) {
                // UVクリアニス（オフライン）
                stepString = "UVクリアニス（オフライン）";
            } else if (surfaceTreatmentId == 7) {
                // UVマットニス（インライン）
                stepString = "UVマットニス（インライン）";
            } else if (surfaceTreatmentId == 16) {
                // UVマットニス（オフライン）
                stepString = "UVマットニス（オフライン）";
            } else if (surfaceTreatmentId == 9) {
                // 水性ニス
                stepString = "水性ニス";
            } else if (surfaceTreatmentId == 1) {
                stepString = "水性プレス";
            } else if (surfaceTreatmentId == 2) {
                // ビニール引き（インライン）
                stepString = "ビニール引き（インライン）";
            } else if (surfaceTreatmentId == 3) {
                // ビニール引き（オフライン）
                stepString = "ビニール引き（オフライン）";
            } else if (surfaceTreatmentId == 10) {
                stepString = "ビニール引き（マット・インライン）";
            } else if (surfaceTreatmentId == 11) {
                stepString = "ビニール引き（マット・オフライン）";
            } else if (surfaceTreatmentId == 4) {
                // PP貼り <=> ＰＰ貼り(15μ)
                stepString = "PP貼り";
            } else if (surfaceTreatmentId == 12) {
                // PPベタ窓
                stepString = "PPベタ窓";
            } else if (surfaceTreatmentId == 13) {
                // PP20 <=> ＰＰ貼り(20μ)
                stepString = "PP20";
            } else if (surfaceTreatmentId == 14) {
                //  プレスコート（またはクリスタルP）
                stepString = "プレスコート（またはクリスタルP）";
            }
        }
        if (StringUtils.isNotEmpty(stepString)) {
            stepTemp = new Step();
            stepTemp.setStep1(stepString);
            return stepTemp;
        }
        return null;
    }

    *//**
     * エンボス加工/ Gia công in nổi(emboss)
     * get data surface embossing step for shape and decorative
     * if not have surface embossing step return null
     *
     * @param productDto
     * @return step
     *//*
    public Step get_Data_Surface_Embossing_Shape_Decorative(ProductDto productDto) {
        String stepString = Constants.BLANK;
        Step stepTemp;
        if (productDto.getEmbossingCode() != null && !"0".equals(productDto.getEmbossingCode())) {
            switch (productDto.getEmbossingCode()) {
                case "EB005":
                    stepString = "キャンパス布目";
                    break;
                case "EB004":
                    stepString = "つむぎ";
                    break;
                case "EB006":
                    stepString = "ヘアーカール";
                    break;
                case "EB007":
                    stepString = "ヘアーライン";
                    break;
                case "EB002":
                    stepString = "絹目";
                    break;
                case "EB003":
                    stepString = "絹目格子";
                    break;
                case "EB008":
                    stepString = "皮紋";
                    break;
                case "EB009":
                    stepString = "布目";
                    break;
                case "EB001":
                    stepString = "梨地";
                    break;
                default:
                    stepString = Constants.BLANK;
                    break;
            }
        }
        if (StringUtils.isNotEmpty(stepString)) {
            stepTemp = new Step();
            stepTemp.setStep1(stepString);
            return stepTemp;
        }
        return null;
    }

    *//**
     * 片段（貼合の場合）/ 片段 (Trường hợp dán ghép)
     * get data one stage step for shape and decorative
     * if not have one stage step return null
     *
     * @param productDto
     * @return step
     *//*
    public Step get_Data_One_Stage_Shape_Decorative(ProductDto productDto) {
        String stepString = Constants.BLANK;
        Step stepTemp;
        Integer laminationFlute = productDto.getLaminationFlute();
        if (productDto.getProductType() == 0 && laminationFlute != null && productDto.getShapeId() != null && productDto.getShapeId() != 98) {
            if (laminationFlute == 2 || laminationFlute == 3 || laminationFlute == 4) {
                stepString = "片段（貼合の場合）";
            }
        }
        if (StringUtils.isNotEmpty(stepString)) {
            stepTemp = new Step();
            stepTemp.setStep1(stepString);
            return stepTemp;
        }
        return null;
    }

    *//**
     * ラミネート（貼合の場合）/ Laminate (Trường hợp dán ghép)
     * get data laminate step for shape and decorative
     * if not have laminate step return null
     *
     * @param productDto
     * @return step
     *//*
    public Step get_Data_Laminate_Shape_Decorative(ProductDto productDto) {
        String stepString = Constants.BLANK;
        Step stepTemp;
        Integer laminationFlute = productDto.getLaminationFlute();
        if (productDto.getProductType() == 0 && laminationFlute != null && productDto.getShapeId() != null && productDto.getShapeId() != 98) {
            if (laminationFlute == 2 || laminationFlute == 3 || laminationFlute == 4) {
                stepString = "ラミネート（貼合の場合）";
            }
        }
        if (StringUtils.isNotEmpty(stepString)) {
            stepTemp = new Step();
            stepTemp.setStep1(stepString);
            return stepTemp;
        }
        return null;
    }


    *//**
     * 打ち抜き/ Bế
     * get data punching step for shape and decorative
     * if not have punching step return null
     *
     * @param productDto
     * @return step
     *//*
    public Step get_Data_Punching_Shape_Decorative(ProductDto productDto) {
        String stepString = Constants.BLANK;
        Step stepTemp;
        Integer laminationFlute = productDto.getLaminationFlute();
        if (laminationFlute != null) {
            if ((laminationFlute == 3 && productDto.getProductType() == 0) || (laminationFlute == 2 && productDto.getProductType() == 1)) {
                //Trường hợp dán ghép BF: U003
                stepString = "打ち抜き";
            } else if ((productDto.getProductType() == 1 && (laminationFlute == 1 || laminationFlute == 3))
                    || (productDto.getProductType() == 0 && (laminationFlute == 2 || laminationFlute == 4))) {
                //Trường hợp dán ghép khác: U002
                stepString = "打ち抜き";
            } else {
                //Ngoài ra: U001
                stepString = "打ち抜き";
            }
        }
        if (StringUtils.isNotEmpty(stepString)) {
            stepTemp = new Step();
            stepTemp.setStep1(stepString);
            return stepTemp;
        }
        return null;
    }

    *//**
     * 貼り/ Dán
     * get data pasting step for shape and decorative
     * if not have pasting step return null
     *
     * @param productDto
     * @return step
     *//*
    public Step get_Data_Pasting_Shape_Decorative(ProductDto productDto) {
        String stepString = Constants.BLANK;
        Step stepTemp;
        Integer pasteId = productDto.getPasteId();
        if (pasteId != null) {
            if (pasteId == 1) {
                stepString = "機械貼り（胴貼り）";
            } else if (pasteId == 2) {
                stepString = "機械貼り（両サイド貼り）";
            } else if (pasteId == 3) {
                stepString = "機械貼り（ワンタッチ貼り）";
            } else if (pasteId == 4) {
                stepString = "機械貼り（四コーナー貼り）";
            } else if (pasteId == 5) {
                stepString = "機械貼り（四コーナー貼り）";
            } else if (pasteId == 6) {
                stepString = "機械貼り（六コーナー貼り）";
            } else if (pasteId == 7) {
                stepString = "手貼り";
            } else {
                stepString = Constants.BLANK;
            }
        }
        if (StringUtils.isNotEmpty(stepString)) {
            stepTemp = new Step();
            stepTemp.setStep1(stepString);
            return stepTemp;
        }
        return null;
    }


    *//**
     * 検品/ Kiểm tra
     * get data checking step for shape and decorative
     * if not have checking step return null
     *
     * @param productDto
     * @return step
     *//*
    public Step get_Data_Checking_Shape_Decorative(ProductDto productDto) {
        String stepString = Constants.BLANK;
        Step stepTemp;
        if (productDto.getInspectionId() != null && productDto.getInspectionId() != 1) {
            switch (productDto.getInspectionId()) {
                case 1:
                    stepString = Constants.BLANK;
                    break;
                case 2:
                    stepString = "1枚検品";
                    break;
                case 3:
                    stepString = "バラ検品";
                    break;
                case 4:
                    stepString = "抜き取り検品";
                    break;
            }
        }
        if (StringUtils.isNotEmpty(stepString)) {
            stepTemp = new Step();
            stepTemp.setStep1(stepString);
            return stepTemp;
        }
        return null;
    }

    *//**
     * Use for check if paper code start with A or not
     *
     * @param productDto
     * @return true if paper code start with A
     *//*
    private boolean checkPaperStartWithA(ProductDto productDto) {
        //Get Correct Paper Code for Product
        MstSheetSizeDto mstSheetSizeDto = mstSheetSizeDao.findSheetSizeByPaperIdAndSize(productDto.getPaperId(), productDto.getPaperSizeW(), productDto.getPaperSizeH());
        // Check Condition
        if (mstSheetSizeDto != null && mstSheetSizeDto.getPaperCode().startsWith("A")) {
            return true;
        }
        return false;
    }*/
}
