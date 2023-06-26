package vn.vnext.sefuri.sf.controller.impl;

import com.google.inject.Inject;
import play.mvc.Result;
import vn.vnext.sefuri.sf.common.CommonCtrl;
import vn.vnext.sefuri.sf.common.MessageCode;
import vn.vnext.sefuri.sf.controller.SF00201Ctrl;
import vn.vnext.sefuri.sf.dto.*;
import vn.vnext.sefuri.sf.json.SF00201.model.DealJson;
import vn.vnext.sefuri.sf.json.SF00201.model.ProductJson;
import vn.vnext.sefuri.sf.json.SF00201.response.SF0020101Res;
import vn.vnext.sefuri.sf.json.SF00201.response.SF0020102Res;
import vn.vnext.sefuri.sf.service.*;

import java.util.ArrayList;
import java.util.List;

import static vn.vnext.sefuri.sf.util.CollectionUtil.safeList;

/**
 * Created by TungNT on 2/23/2017.
 */
public class SF00201CtrlImpl extends CommonCtrl implements SF00201Ctrl {
    @Inject
    private SV003DealService sv003DealService;
    @Inject
    private SV014DealProductService sv014DealProductService;
    @Inject
    private SV007MyboxService sv007MyboxService;
    @Inject
    private SV008ProductService sv008ProductService;
    @Inject
    private SV013MstDataService sv013MstDataService;
    @Inject
    private SV006FileService fileService;

    @Override
    public Result sf0020101GetTemplates(Integer offset, Integer limit) {
        SF0020101Res sf0020101Res = new SF0020101Res();

        List<DealDto> dealDtos = sv003DealService.sv00319ShowMoreTemplate(limit, offset);
        List<DealJson> dealJsons = new ArrayList<>();
        for (DealDto dealDto : safeList(dealDtos)) {
            DealJson dealJson = new DealJson();
            dealJson.setData(dealDto);

            // find main product show on deal
            ProductDto product = sv008ProductService.sv00831GetDefaultProduct(dealDto.getId());
            //TODO common here


            if (product != null) {
                ProductJson productJson = new ProductJson();
                productJson.setData(product);
                String paperName;
                paperName = sv013MstDataService.sv01329GetPaperNameHaveId100(product);
                productJson.setPaperName(paperName);

                // find product file
                ProductFileDto productFile = sv008ProductService.sv00829GetPrimaryProductFile(product.getId());
                if (productFile != null) {
                    FileDto file = fileService.sv00609GetFileInfo(productFile.getFileId());
                    if (file != null) {
                        productJson.setSrcImg(fileService.sv00618GetThumbnail(file));
                    }
                }

                if (product.getSurfaceTreatmentIdF() != null) {
                    MstSurfaceTreatmentDto mstSurfaceTreatmentDto = sv013MstDataService.sv01315GetSurfaceById
                            (product.getSurfaceTreatmentIdF());
                    if (mstSurfaceTreatmentDto != null) {
                        productJson.setVarnishType(mstSurfaceTreatmentDto.getVarnishType());
                    }
                }

                dealJson.setProductJson(productJson);
            }

            MyboxItemDto myboxItemDto = sv007MyboxService.sv00703GetMyboxItemByDealId(dealDto.getId(), getUserId());
            dealJson.setIsInMybox(myboxItemDto != null);

            dealJsons.add(dealJson);
        }
        sf0020101Res.setTemplates(dealJsons);

        long totalRecords = sv003DealService.sv00320GetTotalTemplates();
        sf0020101Res.setTotalRecords(totalRecords);

        return responseJson(sf0020101Res, MessageCode.SF00201.INF001);

    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Result sf0020102AddTemplateToMyBox(Integer dealId) {

        DealDto dealDto = sv003DealService.sv00301GetDealById(dealId);
        if (dealDto != null) {

            MyboxItemDto myboxItemDto = sv007MyboxService.sv00703GetMyboxItemByDealId(dealDto.getId(), getUserId());
            SF0020102Res sf0020102Res = new SF0020102Res();
            if (myboxItemDto == null) {

                myboxItemDto = sv007MyboxService.sv00701BookmarkDeal(dealId, getUserId());
                sf0020102Res.setMyboxId(myboxItemDto.getId());
            } else {

                sf0020102Res.setMyboxId(myboxItemDto.getId());
            }
            // return myboxJson
            return responseJson(sf0020102Res, MessageCode.SF00201.INF001);
        }
        return responseError(MessageCode.SF00201.ERR002);
    }

}
