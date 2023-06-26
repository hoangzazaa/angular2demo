package vn.vnext.sefuri.sf.service.impl;

import vn.vnext.sefuri.sf.dao.*;
import vn.vnext.sefuri.sf.dto.*;
import vn.vnext.sefuri.sf.json.SF00302.model.MstLaminationJson;
import vn.vnext.sefuri.sf.json.SF00302.model.MstPaperJson;
import vn.vnext.sefuri.sf.json.SF00302.model.MstPaperPrc;
import vn.vnext.sefuri.sf.json.SF00302.model.PaperModalJson;
import vn.vnext.sefuri.sf.json.core.MstSheetSizeJson;
import vn.vnext.sefuri.sf.service.SV013MstDataService;

import javax.inject.Inject;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;

/**
 * Created by DungTQ on 1/4/2017.
 */
public class SV013MstDataServiceImpl implements SV013MstDataService {

    @Inject
    private MstColorDao mstColorDao;

    @Inject
    private MstDieCuttingDao mstDieCuttingDao;

    @Inject
    private MstPackingDao mstPackingDao;

    @Inject
    private MstPaperDao mstPaperDao;

    @Inject
    private MstPasteDao mstPasteDao;

    @Inject
    private MstStampingDao mstStampingDao;

    @Inject
    private MstSurfaceTreatmentDao mstSurfaceTreatmentDao;

    @Inject
    private MstWindowDao mstWindowDao;

    @Inject
    private MstShippingCompanyDao mstShippingCompanyDao;

    @Inject
    private MstShippingCostDao mstShippingCostDao;

    @Inject
    private UserDao userDao;

    @Inject
    private MstShapeDao mstShapeDao;

    @Inject
    private MstSheetSizeDao mstSheetSizeDao;

    @Inject
    private MstDecorativeDao mstDecorativeDao;

    @Inject
    private MstCartonDao mstCartonDao;

    @Inject
    private MstCartonShippingDao mstCartonShippingDao;

    @Inject
    private MstLaminationDao mstLaminationDao;

    @Override
    public List<MstColorDto> sv01301GetMstColor() {
        return mstColorDao.findAll();
    }

    @Override
    public List<MstDieCuttingDto> sv01302GetMstDieCutting() {
        return mstDieCuttingDao.findAll();
    }

    @Override
    public List<MstPackingDto> sv01303GetMstPacking() {
        return mstPackingDao.findAll();
    }

    @Override
    public List<MstPasteDto> sv01305GetMstPaste() {
        return mstPasteDao.findAll();
    }

    @Override
    public List<MstStampingDto> sv01306GetMstStamping() {
        return mstStampingDao.findAll();
    }

    @Override
    public List<MstSurfaceTreatmentDto> sv01307GetMstSurfaceTreatment() {
        return mstSurfaceTreatmentDao.findAll();
    }

    @Override
    public List<MstWindowDto> sv01308GetMstWindow() {
        return mstWindowDao.findAll();
    }

    @Override
    public List<MstShippingCompanyDto> sv01309GetMstShippingCompany() {
        return mstShippingCompanyDao.findAll();
    }

    @Override
    public List<MstShippingCostDto> sv01310GetMstShippingCost() {
        return mstShippingCostDao.findAll();
    }

    @Override
    public List<MstShapeDto> sv01311GetMstShape() {
        return mstShapeDao.getAllMstShape();
    }

    @Override
    public List<MstPaperDto> sv01312GetCommonPaper() {
        return mstPaperDao.getCommonPaper();
    }

    @Override
    public List<MstSheetSizeDto> sv01313GetPopularSheetSize() {
        return mstSheetSizeDao.getPopularSheetSize();
    }

    @Override
    public MstPaperDto sv01314GetMstPaperById(Integer paperID) {
        return mstPaperDao.find(paperID);
    }

    @Override
    public MstLaminationDto sv01314GetMstLaminationById(Integer paperID) {
        return mstLaminationDao.find(paperID);
    }

    @Override
    public MstSurfaceTreatmentDto sv01315GetSurfaceById(Integer surfaceId) {
        return mstSurfaceTreatmentDao.find(surfaceId);
    }

    @Override
    public List<MstDecorativeDto> sv01318GetMasterDecorative() {
        return mstDecorativeDao.findAll();
    }

    @Override
    public List<MstSheetSizeDto> sv01319GetSheetSizeByPaperId(Integer paperId) {
        return mstSheetSizeDao.getSheetSizeByPaperId(paperId);
    }

    @Override
    public List<MstSheetSizeDto> sv013136GetMstSheetSize() {
        return mstSheetSizeDao.findAll();
    }

    @Override
    public String sv01329GetPaperNameHaveId100(ProductDto productDto) {
        String paperName = null;
        if (productDto.getPaperNameId() != null)
            if (productDto.getPaperNameId().equals(100)) {
                //1. get paperName
                MstPaperDto mstPaperDto = mstPaperDao.find(productDto.getPaperId());

                if (mstPaperDto != null) {
                    paperName = mstPaperDto.getPaperName() == null ? mstPaperDto.getMaterialName() : mstPaperDto.getPaperName();
                }
            }
            // get mst paper
            else {
                HashMap<Integer, String> mstPaperMap = new HashMap<>();
                mstPaperMap.put(12, "TitanBoard");
                mstPaperMap.put(1, "MCFコート");
                mstPaperMap.put(2, "NSコート");
                mstPaperMap.put(13, "SCコート");
                mstPaperMap.put(3, "サンコート");
                mstPaperMap.put(22, "CRC");
                mstPaperMap.put(5, "SQカード");
                mstPaperMap.put(7, "JETエースW");
                mstPaperMap.put(20, "NEWピジョン");
                if (mstPaperMap.containsKey(productDto.getPaperNameId()))
                    paperName = mstPaperMap.get(productDto.getPaperNameId());
            }

        return paperName;
    }

    @Override
    public List<MstCartonDto> sv01330GetMasterCarton() {
        return mstCartonDao.findAll();
    }

    @Override
    public List<MstCartonShippingDto> sv01331GetMasterCartonShipping() {
        return mstCartonShippingDao.findAll();
    }

    @Override
    public List<MstLaminationDto> sv01332GetMasterLamination() {
        return mstLaminationDao.findAll();
    }

    @Override
    public List<MstPaperDto> sv01333GetAllMstPaper() {
        return mstPaperDao.findAll();
    }

    @Override
    public List<MstLaminationJson> sv01334SaveNewLamination(List<PaperModalJson> inputLists) {
        List<MstLaminationJson> mstLaminationJsons = new ArrayList<>();
        for (PaperModalJson paperModal : inputLists) {
            MstLaminationDto newDto = new MstLaminationDto();
            //http://fridaynight.vnext.vn/issues/3090
            if(paperModal.getIsPaperClone() == 1){
                newDto = mstLaminationDao.find(paperModal.getId());

                newDto.setSagaNormValue(paperModal.getNormValue());
                newDto.setSagaHeadValue(paperModal.getNormValue());
                newDto.setOnoNormValue(paperModal.getNormValue());
                newDto.setOnoHeadValue(paperModal.getNormValue());
                newDto.setTakuNormValue(paperModal.getNormValue());
                newDto.setTakuHeadValue(paperModal.getNormValue());
                mstLaminationDao.detach(newDto);
            }else{
                newDto.setMaterialName(paperModal.getPaperName());
                newDto.setWeight(paperModal.getBasicWeight());

                newDto.setSagaNormValue(paperModal.getNormValue());
                newDto.setSagaHeadValue(paperModal.getNormValue());
                newDto.setOnoNormValue(paperModal.getNormValue());
                newDto.setOnoHeadValue(paperModal.getNormValue());
                newDto.setTakuNormValue(paperModal.getNormValue());
                newDto.setTakuHeadValue(paperModal.getNormValue());
            }

            newDto.setId(null);
            newDto = mstLaminationDao.create(newDto);

            MstLaminationJson mstLaminationJson = new MstLaminationJson();
            mstLaminationJson.setData(newDto);

            //save khong theo factoryId
            mstLaminationJson.setFactoryId(paperModal.getFactoryId());
            mstLaminationJsons.add(mstLaminationJson);
        }

        return mstLaminationJsons;
    }

    @Override
    public List<MstPaperJson> sv01335SaveNewPaper(List<PaperModalJson> paperModals) {
        List<MstPaperJson> mstPaperJsons = new ArrayList<>();
        for (PaperModalJson paperModal : paperModals) {
            MstPaperDto newDto = new MstPaperDto();
            //http://fridaynight.vnext.vn/issues/3090
            if(paperModal.getIsPaperClone() == 1){
                newDto.setPaperId(paperModal.getPaperId());
                newDto.setHiddenFlag(paperModal.getHiddenFlag());
                newDto.setWeight(paperModal.getWeight());
                newDto.setPaperMaterialCode(paperModal.getPaperMaterialCode());
                newDto.setPaperCode(paperModal.getPaperCode());
                newDto.setCommonFlag(paperModal.getCommonFlag());
            }

            newDto.setMaterialName(paperModal.getPaperName());
            newDto.setWeight(paperModal.getBasicWeight());

            newDto.setSagaNormValue(paperModal.getNormValue());
            newDto.setSagaHeadValue(paperModal.getNormValue());

            newDto.setOnoNormValue(paperModal.getNormValue());
            newDto.setOnoHeadValue(paperModal.getNormValue());

            newDto.setTakuNormValue(paperModal.getNormValue());
            newDto.setTakuHeadValue(paperModal.getNormValue());

            newDto = mstPaperDao.create(newDto);
            //http://fridaynight.vnext.vn/issues/3090
            //clone sheetSize
            final Integer idPaper = newDto.getId();
            if(paperModal.getIsPaperClone() == 1){
                List<MstSheetSizeJson> mst = paperModal.getSheetSizeClone();
                if(mst != null){
                    mst.forEach(mstSheetSizeJson -> {
                        MstSheetSizeDto mstSheetSizeDto = mstSheetSizeJson.getData();
                        mstSheetSizeDto.setId(null);
                        mstSheetSizeDto.setPaperId(idPaper);

                        mstSheetSizeDao.create(mstSheetSizeDto);
                    });
                }
            }

            MstPaperJson mstPaperJson = new MstPaperJson();
            mstPaperJson.setData(newDto);
            mstPaperJson.setFactoryId(paperModal.getFactoryId());
            mstPaperJson.setNormValue(newDto.getTakuNormValue());

            mstPaperJsons.add(mstPaperJson);
        }

        return mstPaperJsons;
    }

    @Override
    public List<MstPaperPrc> sv01337GetMstPaper2903Tab1() {
        return mstPaperDao.getListPaperNew_2903_Tab1();
    }

    @Override
    public List<MstPaperPrc> sv01337GetMstPaper2903Tab2() {
        return mstPaperDao.getListPaperNew_2903_Tab2();
    }

    @Override
    public MstLaminationDto sv01336GetMstLaminationById(Integer laminationId) {
        return mstLaminationDao.find(laminationId);
    }

    public MstPaperDto sv01337GetMstPaperByIdAndSheetSizeId(Integer paperId, Integer sheetSizeId) {
        MstPaperDto mstPaperDto = mstPaperDao.find(paperId);

        if(sheetSizeId != null && checkMstPaperTab2(mstPaperDto.getId())){
            MstSheetSizeDto sheetSizeDto = mstSheetSizeDao.find(sheetSizeId);

            if(sheetSizeDto!=null){
                mstPaperDao.detach(mstPaperDto);
                mstPaperDto.setPaperName(sheetSizeDto.getName());
            }
        }

        return mstPaperDto;
    }

    // check neu la tab 2 thi lay theo name trong sheetSize
    public boolean checkMstPaperTab2(Integer paperId){
        List<MstPaperPrc> papers = mstPaperDao.getListPaperNew_2903_Tab2();
        for (MstPaperPrc paper : papers) {
            if (Objects.equals(paper.getId(), paperId)) {
                return true;
            }
        }

        return false;
    }
}
