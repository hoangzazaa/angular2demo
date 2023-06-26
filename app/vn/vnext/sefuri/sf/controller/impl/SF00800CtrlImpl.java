package vn.vnext.sefuri.sf.controller.impl;

import com.google.common.base.Strings;
import com.google.inject.Inject;
import org.apache.commons.io.FilenameUtils;
import play.mvc.Result;
import vn.vnext.sefuri.sf.common.CommonCtrl;
import vn.vnext.sefuri.sf.common.Enums;
import vn.vnext.sefuri.sf.controller.SF00800Ctrl;
import vn.vnext.sefuri.sf.dto.*;
import vn.vnext.sefuri.sf.json.core.*;
import vn.vnext.sefuri.sf.json.request.SF0080102Req;
import vn.vnext.sefuri.sf.json.request.SF0080103Req;
import vn.vnext.sefuri.sf.json.request.SF0080104Req;
import vn.vnext.sefuri.sf.json.response.*;
import vn.vnext.sefuri.sf.service.*;
import vn.vnext.sefuri.sf.util.CollectionUtil;
import vn.vnext.sefuri.sf.util.DateUtil;
import vn.vnext.sefuri.sf.util.JsonUtil;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.math.BigDecimal;
import java.util.*;

import static java.util.Collections.EMPTY_LIST;

/**
 * Created by DungTQ on 2/2/2017.
 */

public class SF00800CtrlImpl extends CommonCtrl implements SF00800Ctrl {
    static final Integer ERROR = 0;
    static final Integer NORMAL = 1;
    @Inject
    private SV005CustomerService sv005CustomerService;
    @Inject
    private SV008ProductService sv008ProductService;
    @Inject
    private SV006FileService sv006FileService;
    @Inject
    private SV013MstDataService sv013MstDataService;
    @Inject
    private SV003DealService sv003DealService;

    @Override
    public Result sf0080101Init(Integer productId) {
        SF0080101Res sf0080101Res = new SF0080101Res();

        // 1.0 Set Status
        sf0080101Res.setStatus(NORMAL);
        ProductDto productDto = sv008ProductService.sv00810GetProductById(productId);
        // productId = 0 mean we access from side bar
        if (productDto == null && productId != 0) {
            sf0080101Res.setStatus(ERROR);
        }

        // 2.0 Set Messages
        sf0080101Res.setMessages(new ArrayList<String>() {{
            /*add("Message 1");
            add("Message 2");
            add("Message 3");*/
        }});

        // 3.0 Set Result
        SF0080101ResultJson sf0080101ResultJson = new SF0080101ResultJson();
        if (productDto != null) {
            // 3.1 Set productInfo
            sf0080101ResultJson.setProduct_name(productDto.getProductName());
            sf0080101ResultJson.setProduct_id(productId);
            // Deal-Product: 1-1 at the moment
            List<DealDto> dealDtos = sv003DealService.sv00318GetDealByProductId(productId);

            if (dealDtos.size() > 0) {
                CustomerDto customerDto = sv005CustomerService.sv00501GetCustomerByCustomerId(dealDtos.get(0)
                        .getCustomerId());
                if (customerDto != null) {
                    sf0080101ResultJson.setCustomer_name(customerDto.getName());
                }
            }

            sf0080101ResultJson.setSelected_paper(productDto.getPaperNameId());
            sf0080101ResultJson.setSelected_shape(productDto.getShapeId());
            sf0080101ResultJson.setSelected_basis_weight(productDto.getPaperId());
            sf0080101ResultJson.setSelected_sheet_size(productDto.getSheetSizeId());

            // 3.2 Set sheet_size
            MstSheetSizeJson mstSheetSizeJson = new MstSheetSizeJson();
            mstSheetSizeJson.setWidth(productDto.getPaperSizeW());
            mstSheetSizeJson.setHeight(productDto.getPaperSizeH());
            mstSheetSizeJson.setGrain(productDto.getSheetSizeGrain());
            sf0080101ResultJson.setOriginal_sheet_size(mstSheetSizeJson);

            sf0080101ResultJson.setImposition(productDto.getImpositionNumber());

            // 3.3 Set objects
            List<DrawingImageJson> drawingImageJsons = new ArrayList<>();
            List<DrawingImageDto> drawingImageDtos = sv008ProductService.sv00816GetListDrawingImage(productId);
            if (CollectionUtil.isNotEmpty(drawingImageDtos)) {
                for (DrawingImageDto drawingImageDto : drawingImageDtos) {
                    DrawingImageJson drawingImageJson = new DrawingImageJson();
                    drawingImageJson.setId(drawingImageDto.getId());
                    drawingImageJson.setX(drawingImageDto.getX());
                    drawingImageJson.setY(drawingImageDto.getY());
                    drawingImageJson.setRotate(drawingImageDto.getRotate());
                    drawingImageJsons.add(drawingImageJson);
                }
            }
            sf0080101ResultJson.setObjects(drawingImageJsons);

            // 3.4 Set original_shape_params
            OriginalShapeParamsJson originalShapeParamsJson = new OriginalShapeParamsJson();
            List<FileDto> fileDtos = sv006FileService.sv00616GetFileByModuleTypeAndProductId(productId, Enums.ModuleType.DEAL_FILE);
            if (fileDtos.size() > 0) {
                //TODO - mapping image file template to node
                String imagePath = sv006FileService.sv00615GetFileURI(fileDtos.get(0).getFileCode());
                originalShapeParamsJson.setImage(imagePath);
            }
            originalShapeParamsJson.setDevelopment_width(productDto.getBlankPaperSizeW());
            originalShapeParamsJson.setDevelopment_height(productDto.getBlankPaperSizeH());
            originalShapeParamsJson.setWidth(productDto.getSizeW());

            originalShapeParamsJson.setHeight(productDto.getSizeH());
            originalShapeParamsJson.setDepth(productDto.getSizeD());
            originalShapeParamsJson.setFlap(productDto.getUpperFlap());
            originalShapeParamsJson.setInsertion(productDto.getInsertion());
            originalShapeParamsJson.setGrain(productDto.getGrain());
            // Task: 2007
            originalShapeParamsJson.setGluing_part(productDto.getGluingPart());
            originalShapeParamsJson.setGroove(productDto.getGroove());

            // Task 2072
            ProductCommonFeeDto productCommonFeeDto = sv008ProductService.sv00813getProductCommonFreeByProductId(productId);
            if (productCommonFeeDto != null) {
                originalShapeParamsJson.setWooden_fee(productCommonFeeDto.getWoodenFee());
            }
            sf0080101ResultJson.setOriginal_shape_params(originalShapeParamsJson);
        } else {
            sf0080101ResultJson.setObjects(EMPTY_LIST);
        }

        // 3.5 Set shapes
        List<MstShapeJson> mstShapeJsonList = new ArrayList<>();
        List<MstShapeDto> mstShapeDtos = sv013MstDataService.sv01311GetMstShape();
        if (CollectionUtil.isEmpty(mstShapeDtos)) {
            sf0080101Res.setStatus(ERROR);
        } else {
            for (MstShapeDto mstShapeDto : mstShapeDtos) {
                MstShapeJson mstShapeJson = new MstShapeJson();
                mstShapeJson.setId(mstShapeDto.getId());
                mstShapeJson.setName(mstShapeDto.getName());
                mstShapeJson.setNote(mstShapeDto.getNote());

                FileDto fileDto = sv006FileService.sv00609GetFileInfo(mstShapeDto.getFileId());
                //TODO - mapping image file template to node
                mstShapeJson.setImage(fileDto.getFilePath());

                ShapeDefaultParamsJson shapeDefaultParamsJson = new ShapeDefaultParamsJson();
                shapeDefaultParamsJson.setWidth(mstShapeDto.getWidth());
                shapeDefaultParamsJson.setDepth(mstShapeDto.getDepth());
                shapeDefaultParamsJson.setHeight(mstShapeDto.getHeight());
                shapeDefaultParamsJson.setFlap(mstShapeDto.getFlap());
                shapeDefaultParamsJson.setInsertion(mstShapeDto.getInsertion());
                shapeDefaultParamsJson.setGrain(mstShapeDto.getGrain());
                shapeDefaultParamsJson.setDevelopment_height(mstShapeDto.getDevelopmentHeight());
                shapeDefaultParamsJson.setDevelopment_width(mstShapeDto.getDevelopmentWidth());
                shapeDefaultParamsJson.setMin_width(mstShapeDto.getMinWidth());
                shapeDefaultParamsJson.setMax_width(mstShapeDto.getMaxWidth());
                shapeDefaultParamsJson.setMin_depth(mstShapeDto.getMinDepth());
                shapeDefaultParamsJson.setMax_depth(mstShapeDto.getMaxDepth());
                shapeDefaultParamsJson.setMin_height(mstShapeDto.getMinHeight());
                shapeDefaultParamsJson.setMax_height(mstShapeDto.getMaxHeight());
                // Task: 2007
                shapeDefaultParamsJson.setGluing_part(mstShapeDto.getGluingPart());

                mstShapeJson.setDefault_params(shapeDefaultParamsJson);
                mstShapeJsonList.add(mstShapeJson);
            }
        }
        sf0080101ResultJson.setShapes(mstShapeJsonList);


        // 3.6 Set papers
        List<CustomPaperJson> customPaperJsonList = new ArrayList<>();
        HashMap<Integer, String> idAndNameMapping = getPaperNameMap();

        List<MstPaperDto> mstPaperDtos = sv013MstDataService.sv01312GetCommonPaper();
        HashMap<Integer, List<PaperJson>> customPaperMap = new HashMap<>();
        if (CollectionUtil.isNotEmpty(mstPaperDtos)) {
            // put the paper which has the same NameId in to a group
            Integer paperName = null;

            // currently, paper and sheetsize relationship is 1: 1
            List<String> paperNameList = new ArrayList<>();
            for (MstPaperDto mstPaperDto : mstPaperDtos) {
                if (productDto != null && productDto.getPaperId() != null && mstPaperDto.getId() == productDto
                        .getPaperId()) {
                    paperName = mstPaperDto.getPaperId();
                }
                Integer paperType = mstPaperDto.getPaperId();

                if (!paperNameList.contains(mstPaperDto.getMaterialName())
                        && !customPaperMap.containsKey(paperType)) {
                    List<PaperJson> mstPaperJsons = new ArrayList<>();
                    PaperJson paperJson = new PaperJson();
                    paperJson.setId(mstPaperDto.getId());
                    paperJson.setValue(mstPaperDto.getWeight());
                    paperJson.setPrice(getPrice(productDto, mstPaperDto));
                    mstPaperJsons.add(paperJson);
                    customPaperMap.put(paperType, mstPaperJsons);
                    paperNameList.add(mstPaperDto.getMaterialName());
                } else if (!paperNameList.contains(mstPaperDto.getMaterialName())) {
                    List<PaperJson> list = customPaperMap.get(paperType);
                    PaperJson paperJson = new PaperJson();
                    paperJson.setId(mstPaperDto.getId());
                    paperJson.setValue(mstPaperDto.getWeight());
                    paperJson.setPrice(getPrice(productDto, mstPaperDto));
                    list.add(paperJson);
                    customPaperMap.put(paperType, list);
                    paperNameList.add(mstPaperDto.getMaterialName());
                }
            }
            // create a list paper with PaperType -> paperName
            Iterator<Integer> iterator = customPaperMap.keySet().iterator();
            while (iterator.hasNext()) {
                Integer nameId = (Integer) iterator.next();
                // filter (hardcode) by papername
                String paperMstName = idAndNameMapping.get(nameId);

                if (paperMstName != null) {
                    List<PaperJson> paperJsonList = customPaperMap.get(nameId);
                    paperJsonList.sort((o1, o2) -> o1.getValue().compareTo(o2.getValue()));

                    CustomPaperJson customPaperJson = new CustomPaperJson();
                    customPaperJson.setId(nameId);
                    customPaperJson.setName(paperMstName);
                    customPaperJson.setBasisWeights(paperJsonList);
                    customPaperJsonList.add(customPaperJson);

                    if (paperName != null && paperName == nameId) {
                        sf0080101ResultJson.setSelected_paper(nameId);
                    }
                }
            }
        }
        sf0080101ResultJson.setPapers(customPaperJsonList);

        // 3.7 Set popular sheet_sizes
        List<MstSheetSizeDto> mstSheetSizeDtos = sv013MstDataService.sv01313GetPopularSheetSize();
        List<MstSheetSizeJson> sheetSizeJsons = new ArrayList<>();
        if (CollectionUtil.isNotEmpty(mstSheetSizeDtos)) {
            for (MstSheetSizeDto mstSheetSizeDto : mstSheetSizeDtos) {
                MstSheetSizeJson sheetJson = new MstSheetSizeJson();
                sheetJson.setId(mstSheetSizeDto.getId());
                sheetJson.setName(mstSheetSizeDto.getName());
                sheetJson.setWidth(mstSheetSizeDto.getWidth());
                sheetJson.setHeight(mstSheetSizeDto.getHeight());
                sheetJson.setGrain(mstSheetSizeDto.getGrain());
                sheetJson.setPopular(mstSheetSizeDto.getPopular());
                sheetSizeJsons.add(sheetJson);
            }
        }
        sf0080101ResultJson.setSheet_sizes(sheetSizeJsons);

        sf0080101Res.setResult(sf0080101ResultJson);
        return ok(JsonUtil.toJsonString(sf0080101Res));
    }

    private BigDecimal getPrice(ProductDto productDto, MstPaperDto mstPaperDto) {
        // Get Role from Current user
        Integer factoryId = 1;
        if (productDto != null && productDto.getFactoryId() != null) {
            factoryId = productDto.getFactoryId();
        }
        Integer roleId = 1;
        if (productDto != null && productDto.getPaperHeadApprovalFlag() == 1) {
            roleId = 2;
        }

        if (factoryId == 1) {
            // Saga
            if (roleId == 1) {
                return mstPaperDto.getSagaNormValue();
            } else {
                return mstPaperDto.getSagaHeadValue();
            }
        } else if (factoryId == 2) {
            // Ono
            if (roleId == 1) {
                return mstPaperDto.getOnoNormValue();
            } else {
                return mstPaperDto.getOnoHeadValue();
            }
        } else if (factoryId == 3) {
            // Taku
            if (roleId == 1) {
                return mstPaperDto.getTakuNormValue();
            } else {
                return mstPaperDto.getTakuHeadValue();
            }
        }
        return null;
    }

    @Override
    public Result sf0080102Save() {
        SF0080102Req sf0080102Req = requestJson(SF0080102Req.class);
        Integer productId = sf0080102Req.getProduct_id();

        // 1.0 Get product info
        ProductDto productDto = sv008ProductService.sv00810GetProductById(productId);
        if (productDto != null) {
            // 2.0 Update product
            productDto.setShapeId(sf0080102Req.getSelected_shape());
            productDto.setPaperNameId(sf0080102Req.getSelected_paper());
            productDto.setPaperId(sf0080102Req.getSelected_basis_weight());
            productDto.setSheetSizeId(sf0080102Req.getSelected_sheet_size());
            MstSheetSizeJson mstSheetSizeJson = sf0080102Req.getSheet_size();
            // Bug 1346. Task 2172
            productDto.setCutPaperSizeW(mstSheetSizeJson.getWidth());
            productDto.setCutPaperSizeH(mstSheetSizeJson.getHeight());
            productDto.setSheetSizeGrain(mstSheetSizeJson.getGrain());

            // SF00302
            if (sf0080102Req.getSelected_basis_weight() != null) {
                MstPaperDto paperDto = sv013MstDataService.sv01314GetMstPaperById(sf0080102Req
                        .getSelected_basis_weight());
                productDto.setPaperWeight(paperDto.getWeight());
            }

            productDto.setImpositionNumber(sf0080102Req.getImposition());

            // Bug 1567: change requirement
            if (productDto.getTakenNumber() == null || productDto.getTakenNumber() == 0) {
                productDto.setTakenNumber(sf0080102Req.getImposition());
            }

            if ((productDto.getPaperSizeH() == null || productDto.getPaperSizeH().compareTo(BigDecimal.ZERO) == 0)
                    && (productDto.getPaperSizeW() == null || productDto.getPaperSizeW().compareTo(BigDecimal.ZERO) == 0)) {
                MstSheetSizeJson sheetSizeJson = sf0080102Req.getSheet_size();
                if (sheetSizeJson != null) {
                    productDto.setPaperSizeH(sheetSizeJson.getHeight());
                    productDto.setPaperSizeW(sheetSizeJson.getWidth());
                }
            }

            if (productDto.getSpecialDieCuttingNumberFlag() == 0) {
                productDto.setDieCuttingThroughNumber(sf0080102Req.getImposition());
            }

            List<DrawingImageJson> drawingImageJsons = sf0080102Req.getObjects();

            // 2.1 Delete DrawingImage using PRoductId
            sv008ProductService.sv00821DeleteDrawingImageByProductId(productId);

            if (CollectionUtil.isNotEmpty(drawingImageJsons)) {
                for (DrawingImageJson drawingImageJson : drawingImageJsons) {
                    // 2.1 Find old data
                    DrawingImageDto drawingImageDto;
                    // 2.3 Create new
                    drawingImageDto = new DrawingImageDto();
                    drawingImageDto.setX(drawingImageJson.getX());
                    drawingImageDto.setY(drawingImageJson.getY());
                    drawingImageDto.setRotate(drawingImageJson.getRotate());
                    drawingImageDto.setProductId(productId);
                    drawingImageDto.setUpdatedDate(DateUtil.getSysDate());
                    drawingImageDto.setUpdatedUser(getUserId());
                    sv008ProductService.sv00815CreateDrawingImage(drawingImageDto);
                }
            }

            OriginalShapeParamsJson originalShapeParamsJson = sf0080102Req.getOriginal_shape_params();
            if (originalShapeParamsJson != null) {
                productDto.setSizeW(originalShapeParamsJson.getWidth());
                productDto.setSizeD(originalShapeParamsJson.getDepth());
                productDto.setSizeH(originalShapeParamsJson.getHeight());
                productDto.setUpperFlap(originalShapeParamsJson.getFlap());
                productDto.setInsertion(originalShapeParamsJson.getInsertion());
                // Task 2007
                productDto.setGluingPart(originalShapeParamsJson.getGluing_part());
                productDto.setGrain(originalShapeParamsJson.getGrain());
                productDto.setBlankPaperSizeH(originalShapeParamsJson.getDevelopment_height());
                productDto.setBlankPaperSizeW(originalShapeParamsJson.getDevelopment_width());
                productDto.setGroove(originalShapeParamsJson.getGroove());

                // Task: 2072. Update wooden fee
                BigDecimal woodenFee = originalShapeParamsJson.getWooden_fee();
                ProductCommonFeeDto productCommonFeeDto = sv008ProductService.sv00813getProductCommonFreeByProductId(productId);
                if (productCommonFeeDto != null) {
                    productCommonFeeDto.setWoodenFee(woodenFee);
                    productCommonFeeDto.setUpdatedDate(DateUtil.getSysDate());
                    productCommonFeeDto.setUpdatedUser(getUserId());
                    sv008ProductService.sv00809UpdateProductCommonFee(productCommonFeeDto);
                } else {
                    // Create new
                    productCommonFeeDto = new ProductCommonFeeDto();
                    productCommonFeeDto.setWoodenFee(woodenFee);
                    productCommonFeeDto.setProductId(productId);
                    productCommonFeeDto.setCreatedUser(getUserId());
                    productCommonFeeDto.setUpdatedUser(getUserId());
                    productCommonFeeDto.setCreatedDate(DateUtil.getSysDate());
                    productCommonFeeDto.setUpdatedDate(DateUtil.getSysDate());
                    sv008ProductService.sv00837CreateProductCommonFee(productCommonFeeDto);
                }

                // Task 1870
                if (sf0080102Req.getSelected_sheet_size() == 99) {
                    BigDecimal height = mstSheetSizeJson.getHeight();
                    BigDecimal width = mstSheetSizeJson.getWidth();
                    productDto.setPaperSizeH(height);
                    productDto.setPaperSizeW(width);

                    productDto.setCutPaperSizeH(height);
                    productDto.setCutPaperSizeW(width);

                    productDto.setTakenNumber(sf0080102Req.getImposition());
                    productDto.setImpositionNumber(sf0080102Req.getImposition());
                }

                // TODO: File type = 0 (is .png file). Need to confirm
                List<ProductFileDto> productFileDtos = sv008ProductService
                        .sv00820GetProductFileByModuleTypeAndProductId(productId, Enums.ModuleType.DEAL_FILE);
                String imagePath = originalShapeParamsJson.getImage();

                if (imagePath != null) {
                    String fileName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.length());
                    if (productFileDtos.size() > 0) {
                        // update
                        ProductFileDto productFileDto = productFileDtos.get(0);
                        productFileDto.setOriginalName(fileName);
                        productFileDto.setType(0);
                        productFileDto.setUpdatedDate(DateUtil.getSysDate());
                        productFileDto.setUpdatedUser(getUserId());

                        String fileCode = FilenameUtils.removeExtension(fileName);
                        FileDto fileDto = sv006FileService.sv00610GetFileInfoByFileCode(fileCode);
                        if (fileDto != null) {
                            productFileDto.setFileId(fileDto.getId());
                        } else {
                            fileDto = sv006FileService.sv00604SaveTempFile(fileName, Enums.ModuleType.PRODUCT_FILE);
                            productFileDto.setFileId(fileDto.getId());
                        }
                        sv008ProductService.sv00806UpdateProductFile(productFileDto);
                    } else {
                        // insert new
                        // move image file from temp file to ProductFile folder
                        ProductFileDto productFileDto = new ProductFileDto();
                        productFileDto.setProductId(productId);
                        productFileDto.setType(0);
                        productFileDto.setCreatedDate(DateUtil.getSysDate());
                        productFileDto.setUpdatedDate(DateUtil.getSysDate());
                        productFileDto.setCreatedUser(getUserId());
                        productFileDto.setUpdatedUser(getUserId());
                        productFileDto.setOriginalName(fileName);
                        sv008ProductService.sv00805CreateProductFile(productFileDto, fileName);
                    }
                }
            }
            productDto.setUpdatedDate(DateUtil.getSysDate());
            productDto.setUpdatedUser(getUserId());
            sv008ProductService.sv00803UpdateProduct(productDto);
        }

        SF0080102Res sf0080102Res = new SF0080102Res();
        sf0080102Res.setStatus(NORMAL);
        return ok(JsonUtil.toJsonString(sf0080102Res));
    }

    @Override
    public Result sf0080103SaveDrawings() {

        SF0080103Req req = requestJson(SF0080103Req.class);

        String canvasData = req.getImage();
        byte[] decodedImage = Base64.getDecoder().decode(canvasData.getBytes());
        InputStream decodedImageStream = new ByteArrayInputStream(decodedImage);

        String fileCode = sv006FileService.sv00601SaveTempFile(decodedImageStream, "png");

        SF0080103Res res = new SF0080103Res();
        res.setStatus(NORMAL);
        res.setResult(new SF0080103ResultJson());
        res.getResult().setImage(fileCode);

        return ok(JsonUtil.toJsonString(res));
    }

    @Override
    public Result sf0080104GetTrimmingSizeList() {
        SF0080104Req sf0080104Req = requestJson(SF0080104Req.class);
        SF0080104Res sf0080104Res = new SF0080104Res();
        SF0080104ResultJson sf0080104ResultJson = new SF0080104ResultJson();
        String paperId = sf0080104Req.getBasis_weights_id();
        if (Strings.isNullOrEmpty(paperId)) {
            sf0080104Res.setStatus(ERROR);
            sf0080104Res.setMessages(Arrays.asList("ERROR: PaperId is blank!"));
            return ok(JsonUtil.toJsonString(sf0080104Res));
        }

        Integer paperIdValue;
        List<MstSheetSizeDto> mstSheetSizeDtos = new ArrayList<>();
        try {
            paperIdValue = Integer.parseInt(paperId);
            MstPaperDto mstPaperDto = sv013MstDataService.sv01314GetMstPaperById(paperIdValue);
            // do not get popular sheetsize for サンコート. Issue 1810
            if(mstPaperDto != null && mstPaperDto.getPaperId() != 3) {
                mstSheetSizeDtos = sv013MstDataService.sv01313GetPopularSheetSize();
            } else if(mstPaperDto != null && mstPaperDto.getPaperId() == 3) {
                mstSheetSizeDtos = sv013MstDataService.sv01319GetSheetSizeByPaperId(paperIdValue);
            }
        } catch (NumberFormatException e) {
            sf0080104Res.setStatus(ERROR);
            sf0080104Res.setMessages(Arrays.asList("ERROR: PaperId is not a number!"));
            return ok(JsonUtil.toJsonString(sf0080104Res));
        }

        // if sheetSize list is empty -> return default sheetSize list
        if (mstSheetSizeDtos.size() == 0) {
            mstSheetSizeDtos = sv013MstDataService.sv01313GetPopularSheetSize();
        }
        List<MstSheetSizeJson> mstSheetSizeJsons = new ArrayList<>();
        if (mstSheetSizeDtos.size() > 0) {
            for (MstSheetSizeDto mstSheetSizeDto : mstSheetSizeDtos) {
                MstSheetSizeJson mstSheetSizeJson = new MstSheetSizeJson();
                mstSheetSizeJson.setData(mstSheetSizeDto);

                mstSheetSizeJsons.add(mstSheetSizeJson);
            }
        }
        sf0080104ResultJson.setSheet_sizes(mstSheetSizeJsons);

        sf0080104Res.setMessages(Arrays.asList("Process OK"));
        sf0080104Res.setStatus(NORMAL);
        sf0080104Res.setResultJson(sf0080104ResultJson);
        return ok(JsonUtil.toJsonString(sf0080104Res));
    }

    private HashMap<Integer, String> getPaperNameMap() {
        HashMap<Integer, String> map = new HashMap<>();
        // map.put(0, "なし");
        map.put(1, "MCFコート");
        map.put(2, "NSコート");
        map.put(3, "サンコート");
        map.put(5, "SQカード");
        map.put(7, "JETエースW");
        map.put(12, "TitanBoard");
        map.put(13, "SCコート");
        map.put(20, "NEWピジョン");
        return map;
    }
}