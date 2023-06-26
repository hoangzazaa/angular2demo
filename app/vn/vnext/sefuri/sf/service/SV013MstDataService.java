package vn.vnext.sefuri.sf.service;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dto.*;
import vn.vnext.sefuri.sf.json.SF00302.model.MstLaminationJson;
import vn.vnext.sefuri.sf.json.SF00302.model.MstPaperJson;
import vn.vnext.sefuri.sf.json.SF00302.model.MstPaperPrc;
import vn.vnext.sefuri.sf.json.SF00302.model.PaperModalJson;
import vn.vnext.sefuri.sf.service.impl.SV013MstDataServiceImpl;

import java.util.List;

/**
 * Created by DungTQ on 1/4/2017.
 */
@ImplementedBy(SV013MstDataServiceImpl.class)
public interface SV013MstDataService {
    /**
     * Get list MstColor
     *
     * @return List<MstColorDto>
     */
    List<MstColorDto> sv01301GetMstColor();

    /**
     * Get list MstDieCutting
     *
     * @return List<MstDieCuttingDto>
     */
    List<MstDieCuttingDto> sv01302GetMstDieCutting();

    /**
     * Get list MstPacking
     *
     * @return List<MstPackingDto>
     */
    List<MstPackingDto> sv01303GetMstPacking();

    /**
     * Get list MstPaste
     *
     * @return List<MstPasteDto>
     */
    List<MstPasteDto> sv01305GetMstPaste();

    /**
     * Get list MstStamping
     *
     * @return List<MstStampingDto>
     */
    List<MstStampingDto> sv01306GetMstStamping();

    /**
     * Get list MstSurfaceTreatment
     *
     * @return List<MstSurfaceTreatmentDto>
     */
    List<MstSurfaceTreatmentDto> sv01307GetMstSurfaceTreatment();

    /**
     * Get list MstWindow
     *
     * @return List<MstWindowDto>
     */
    List<MstWindowDto> sv01308GetMstWindow();

    /**
     * Get lisr MstShippingCompany
     *
     * @return List<MstShippingCompanyDto>
     */
    List<MstShippingCompanyDto> sv01309GetMstShippingCompany();

    /**
     * Get list ShippingCost
     *
     * @return List<MstShippingCostDto>
     */
    List<MstShippingCostDto> sv01310GetMstShippingCost();

    List<MstShapeDto> sv01311GetMstShape();

    List<MstPaperDto> sv01312GetCommonPaper();

    List<MstSheetSizeDto> sv01313GetPopularSheetSize();

    MstPaperDto sv01314GetMstPaperById(Integer paperID);

    MstLaminationDto sv01314GetMstLaminationById(Integer paperID);

    MstSurfaceTreatmentDto sv01315GetSurfaceById(Integer surfaceId);

    List<MstDecorativeDto> sv01318GetMasterDecorative();

    List<MstSheetSizeDto> sv01319GetSheetSizeByPaperId(Integer paperId);

    List<MstSheetSizeDto> sv013136GetMstSheetSize();

    String sv01329GetPaperNameHaveId100(ProductDto productDto);

    List<MstCartonDto> sv01330GetMasterCarton();

    List<MstCartonShippingDto> sv01331GetMasterCartonShipping();

    List<MstLaminationDto> sv01332GetMasterLamination();

    List<MstPaperDto> sv01333GetAllMstPaper();

    List<MstLaminationJson> sv01334SaveNewLamination(List<PaperModalJson> inputLists);

    List<MstPaperJson> sv01335SaveNewPaper(List<PaperModalJson> paperModals);

    List<MstPaperPrc> sv01337GetMstPaper2903Tab1();

    List<MstPaperPrc> sv01337GetMstPaper2903Tab2();

    MstLaminationDto sv01336GetMstLaminationById(Integer laminationId);

    MstPaperDto sv01337GetMstPaperByIdAndSheetSizeId(Integer paperID, Integer sheetSizeId);
}
