package vn.vnext.sefuri.sf.service.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.apache.commons.beanutils.BeanUtils;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.common.collect.Lists;
import com.google.inject.Inject;

import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.common.Enums;
import vn.vnext.sefuri.sf.dao.CheckSheetDao;
import vn.vnext.sefuri.sf.dao.CommentDao;
import vn.vnext.sefuri.sf.dao.DealDao;
import vn.vnext.sefuri.sf.dao.DealFileDao;
import vn.vnext.sefuri.sf.dao.DealProductDao;
import vn.vnext.sefuri.sf.dao.DrawingImageDao;
import vn.vnext.sefuri.sf.dao.MyboxItemDao;
import vn.vnext.sefuri.sf.dao.OfferDao;
import vn.vnext.sefuri.sf.dao.ProductCommonFeeDao;
import vn.vnext.sefuri.sf.dao.ProductDao;
import vn.vnext.sefuri.sf.dao.ProductFileDao;
import vn.vnext.sefuri.sf.dao.ProductOutputDao;
import vn.vnext.sefuri.sf.dao.QuotationDao;
import vn.vnext.sefuri.sf.dao.QuotationItemDao;
import vn.vnext.sefuri.sf.dao.WoodenDao;
import vn.vnext.sefuri.sf.dto.ChecksheetDto;
import vn.vnext.sefuri.sf.dto.CommentDto;
import vn.vnext.sefuri.sf.dto.DealDto;
import vn.vnext.sefuri.sf.dto.DealFileDto;
import vn.vnext.sefuri.sf.dto.DealProductDto;
import vn.vnext.sefuri.sf.dto.FileDto;
import vn.vnext.sefuri.sf.dto.MstWoodenDto;
import vn.vnext.sefuri.sf.dto.OfferDto;
import vn.vnext.sefuri.sf.dto.ProductCommonFeeDto;
import vn.vnext.sefuri.sf.dto.ProductDto;
import vn.vnext.sefuri.sf.dto.ProductFileDto;
import vn.vnext.sefuri.sf.dto.ProductOutputDto;
import vn.vnext.sefuri.sf.dto.QuotationDto;
import vn.vnext.sefuri.sf.dto.QuotationItemDto;
import vn.vnext.sefuri.sf.dto.UserDto;
import vn.vnext.sefuri.sf.json.SF00100.model.DealInfoJson;
import vn.vnext.sefuri.sf.json.SF00205.request.SF00205Filter;
import vn.vnext.sefuri.sf.json.SF00302.model.ProductJson;
import vn.vnext.sefuri.sf.json.SF00302.model.ProductOutputJson;
import vn.vnext.sefuri.sf.json.core.ProductCommonFeeJson;
import vn.vnext.sefuri.sf.service.SV001AuthService;
import vn.vnext.sefuri.sf.service.SV003DealService;
import vn.vnext.sefuri.sf.service.SV004QuotationService;
import vn.vnext.sefuri.sf.service.SV006FileService;
import vn.vnext.sefuri.sf.service.SV014DealProductService;
import vn.vnext.sefuri.sf.util.CollectionUtil;
import vn.vnext.sefuri.sf.util.GenerateUtil;

/**
 * Created by TungNT on 11/17/2016.
 */
public class SV003DealServiceImpl implements SV003DealService {
    private static Logger logger = LoggerFactory.getLogger(SV003DealServiceImpl.class);
    private final static Integer DEAL_CLOSED = 1;

    @Inject
    private DealDao dealDao;

    @Inject
    private DealProductDao dealProductDao;

    @Inject
    private QuotationItemDao quotationItemDao;

    @Inject
    private ProductOutputDao productOutputDao;

    @Inject
    private ProductCommonFeeDao productCommonFeeDao;

    @Inject
    private ProductDao productDao;

    @Inject
    private WoodenDao woodenDao;

    @Inject
    private OfferDao offerDao;

    @Inject
    private CommentDao commentDao;

    @Inject
    private CommentDao commentFileDao;

    @Inject
    private SV006FileService sv006FileService;

    @Inject
    private DealFileDao dealFileDao;

    @Inject
    private ProductFileDao productFileDao;

    @Inject
    private QuotationDao quotationDao;

    @Inject
    private CheckSheetDao checkSheetDao;

    @Inject
    private MyboxItemDao myboxItemDao;

    @Inject
    private SV001AuthService sv001AuthService;

    @Inject
    private SV014DealProductService dealProductService;

    @Inject
    private SV004QuotationService quotationService;

    @Inject
    private DrawingImageDao drawingImageDao;

    @Override
    public DealDto sv00301GetDealById(Integer dealId) {
        return dealDao.find(dealId);
    }

    @Override
    public DealDto getSourceDealById(int dealId) {
        DealDto deal = sv00301GetDealById(dealId);
        if (deal != null && deal.getSourceDealId() != null) {
            deal = sv00301GetDealById(deal.getSourceDealId());
        }
        return deal;
    }

    @Override
    public DealProductDto sv00302GetDealProductByDealCodeAndProductCode(String dealCode, String productCode) {
        return dealProductDao.getDealProduct(dealCode, productCode);
    }

    @Override
    public DealProductDto sv00303CreateDealProduct(Integer dealId, ProductJson productJson, Integer copyType) {
        return sv0030301createDealProduct(dealId, productJson, copyType);
    }

    private DealProductDto sv0030301createDealProduct(Integer dealId, ProductJson productJson, Integer copyType) {
        ProductDto productDto = productJson.getData();
        final Integer currentProductId = productDto.getId();

        productDto.setId(null);
        productDto.setDenno(0);
        if (productDto.getSpecialSizeFlag() == null) {
            productDto.setSpecialSizeFlag(0);
        }
        if (productDto.getSpecialDieCuttingNumberFlag() == null) {
            productDto.setSpecialDieCuttingNumberFlag(0);
        }
        if (productDto.getPaperHeadApprovalFlag() == null) {
            productDto.setPaperHeadApprovalFlag(0);
        }

        ProductDto newProductDto = productDao.create(productDto);
        newProductDto.setProductCode(GenerateUtil.generateProductCode(newProductDto.getId()));

        // 3.0 Create Deal Product
        DealProductDto dealProductDto = new DealProductDto();
        // always set highlight flag is ON {0-OFF, 1-ON}
        dealProductDto.setHighlightFlag(Enums.Status.HIGHLIGHT_FLAG_ON.getStatus());

        dealProductDto.setDealId(dealId);
        dealProductDto.setCreatedUser(productDto.getCreatedUser());
        dealProductDto.setUpdatedUser(productDto.getUpdatedUser());
        dealProductDto.setProductId(newProductDto.getId());
        dealProductDto = dealProductDao.create(dealProductDto);

        // 3.1 Create Wooden
        if (copyType == 1 || copyType == 2) {
            newProductDto.setCopyType(copyType);

            if (copyType == 1) {
                if (productDto.getWoodenCode() != null) {
                    MstWoodenDto woodenDto = woodenDao.getWoodenByWoodenCode(productDto.getWoodenCode());
                    if (woodenDto != null) {
                        // 3.1.1 Set wooden to ProductDto
                        newProductDto.setWoodenCode(woodenDto.getWoodenCode());
                    }
                }

                // reset item_code
                newProductDto.setItemCode(productDto.getItemCode());
            } else { // copyType == 2
                newProductDto.setWoodenCode(null);
                newProductDto.setFilmCode(null);

                // keep item_code
                newProductDto.setItemCode(null);
            }

            // clone Product Files
            cloneProductFiles(currentProductId, newProductDto.getId());
        }

        /**
         * Notes: any business case {Create new, Save as revision, Save as new version}, need to be reset request
         * request_design_flag & request_production_flag.
         */
        newProductDto.setRequestDesignFlag(Enums.ProductStatus.NEW_EDITION.getStatus());
        newProductDto.setRequestProductionFlag(0);

        // 3.2 Create ProductOutput
        Collection<ProductOutputJson> productOutputJsons = productJson.getProductOutputs();
        List<ProductOutputDto> productOutputDtos = new ArrayList<>();
        if (CollectionUtil.isNotEmpty(productOutputJsons)) {
            List<OfferDto> offerDtos = new ArrayList<>();
            for (ProductOutputJson productOutputJson : productOutputJsons) {
                ProductOutputDto productOutputDto = productOutputJson.getData();
                productOutputDto.setDealProductId(dealProductDto.getId());
                productOutputDto.setCreatedUser(newProductDto.getCreatedUser());
                productOutputDto.setUpdatedUser(newProductDto.getUpdatedUser());
                productOutputDto.setPrimaryFlag(Enums.Status.PRIMARY_FLAG_OFF.getStatus());
                productOutputDto.setId(null);
                productOutputDao.create(productOutputDto);

                // Create Offers
                OfferDto offerDto = new OfferDto();
                offerDto.setUpdatedUser(productDto.getUpdatedUser());
                offerDto.setCreatedUser(productDto.getUpdatedUser());
                offerDto.setProductOutputId(productOutputDto.getId());
                if (productOutputJson.getOffers() != null && productOutputJson.getOffers().size() > 0) {
                    offerDto.setUnitPrice(productOutputJson.getOffers().get(0).getUnitPrice());
                    offerDto.setTotal(productOutputJson.getOffers().get(0).getTotal());
                    offerDto.setProfitRate(productOutputJson.getOffers().get(0).getProfitRate());
                }
                offerDao.create(offerDto);
                offerDtos.add(offerDto);
                productOutputDto.setOffer(offerDto);
                productOutputDtos.add(productOutputDto);
            }

        }

        dealProductDto.setProductOutputs(productOutputDtos);

        // 3.3 Create PRoductCommonFee
        ProductCommonFeeJson productCommonFeeJson = productJson.getProductCommon();
        if (productCommonFeeJson != null) {
            ProductCommonFeeDto productCommonFeeDto = productCommonFeeJson.getData();
            productCommonFeeDto.setProductId(newProductDto.getId());
            productCommonFeeDto.setCreatedUser(productDto.getCreatedUser());
            productCommonFeeDto.setUpdatedUser(productDto.getUpdatedUser());
            productCommonFeeDto.setId(null);
            productCommonFeeDto = productCommonFeeDao.create(productCommonFeeDto);
            newProductDto.setProductCommon(productCommonFeeDto);
        } else {
            ProductCommonFeeDto productCommonFeeDto = new ProductCommonFeeDto();
            productCommonFeeDto.setProductId(newProductDto.getId());
            productCommonFeeDto.setCreatedUser(newProductDto.getCreatedUser());
            productCommonFeeDto.setUpdatedUser(newProductDto.getUpdatedUser());
            productCommonFeeDto.setCreatedDate(DateTime.now());
            productCommonFeeDto.setUpdatedDate(DateTime.now());
            productCommonFeeDto = productCommonFeeDao.create(productCommonFeeDto);
            newProductDto.setProductCommon(productCommonFeeDto);
        }

        productDao.update(newProductDto);

        productCommonFeeDao.flush();
        offerDao.flush();
        productOutputDao.flush();
        woodenDao.flush();
        dealProductDao.flush();
        productDao.flush();

        dealProductDto.setProduct(productDto);
        return dealProductDto;
    }

    @Override
    public DealProductDto sv00304CopyAndSaveDealProduct(Integer dealId, ProductJson productJson, Integer copyType) {
        return this.sv00303CreateDealProduct(dealId, productJson, copyType);
    }

    @Override
    public boolean sv00305DeleteDealProductById(Integer dealProductId) {
        List<QuotationItemDto> quotationItemDtos = quotationItemDao.getQuotationItemsByDealProductId(dealProductId);

        // 1. Check DealPRoduct & quotationItem
        if (CollectionUtil.isNotEmpty(quotationItemDtos)) {
            return false;
        }

        DealProductDto dealProductDto = dealProductDao.find(dealProductId);

        // 2. Delete deal product
        // 2.1 delete offer
        List<ProductOutputDto> productOutputDtos = productOutputDao.getProductOutputByDealProductId(dealProductId);
        productOutputDtos.forEach(productOutputDto -> {
            // 2.1.1 delete offer
            offerDao.deleteOfferByProductOutputId(productOutputDto.getId());
        });

        // 2.2 remove all productOutput by dealProductId
        productOutputDao.deleteProductOutputByDealProductId(dealProductId);
        // 2.3. Delete dealProduct
        dealProductDao.delete(dealProductDto.getId());
        dealProductDao.flush();

        // 3. Delete Product
        // check product 1:n with Deal product
        boolean isProductInUsed = dealProductDao.isProductInUsed(dealProductDto.getProductId());
        // return false not delete product because deal using product
        if (!isProductInUsed) {
            // delete product and deal product because product using one deal
            ProductDto productDto = productDao.find(dealProductDto.getProductId());

            // 1.0 delete ProductCommonFee
            List<ProductFileDto> productFileDtos = productFileDao.getListProductFileByProductId(dealProductDto
                    .getProductId());
            for (ProductFileDto productFileDto : productFileDtos) {
                Integer fileId = productFileDto.getFileId();
                // delete product file
                productFileDao.delete(productFileDto.getId());
                // delete file
                sv006FileService.sv00607DeleteFile(fileId);
            }
            drawingImageDao.deleteDrawingImageByProductId(productDto.getId());

            productCommonFeeDao.deleteProductCommonFeeByProductId(dealProductDto.getProductId());
            // delete product
            productDao.delete(productDto.getId());

            productDao.flush();
        }
        return true;
    }

    @Override
    public DealDto sv00306GetDealByDealCode(String dealCode) {
        return dealDao.findDealInfoByDealCode(dealCode);
    }

    @Override
    public DealDto sv00307SaveDeal(DealDto dealDto) {
        return sv0030701SaveDeal(dealDto);
    }

    private DealDto sv0030701SaveDeal(DealDto dealDto) {
        if (dealDto.getId() != null) {
            DealDto newDto = dealDao.update(dealDto);
            dealDao.flush();
            return newDto;

        }
        // set sale id
        dealDto.setSalesId(dealDto.getCreatedUser());
        // create deal
        dealDao.create(dealDto);
        // update deal code
        dealDto.setDealCode(GenerateUtil.generateDealCode(dealDto.getId()));
        dealDao.update(dealDto);

        dealDao.flush();
        return dealDto;
    }

    @Override
    public CommentDto sv00308SaveComment(CommentDto commentDto) {
        return commentDao.create(commentDto);
    }

    @Override
    public boolean sv00309DeleteDealByDealCode(String dealCode) {
        DealDto deal = dealDao.findDealInfoByDealCode(dealCode);

        if (deal == null
                || (!Enums.DealStatus.IN_PROGRESS.getStatus().equals(deal.getDealStatus()))
                && !DEAL_CLOSED.equals(deal.getClosedFlag())) {
            return false;
        }

        // delete deal files
        List<DealFileDto> dealFiles = this.sv00313GetDealFileByDealId(deal.getId());
        dealFiles.forEach(this::sv00311DeleteDealFile);

        // delete quotations
        List<QuotationDto> quotations = quotationService.sv00402GetQuotationsByDealId(deal.getId());
        quotations.forEach(quotationService::sv00404DeleteQuotation);

        // delete deal product
        List<DealProductDto> dealProducts = dealProductService.sv01401GetDealProductByDealId(deal.getId());
        dealProducts.forEach(dp -> this.sv00305DeleteDealProductById(dp.getId()));

        // delete all comment
        commentDao.deleteAllDealComment(deal.getId());

        // delete checksheet
        List<ChecksheetDto> checksheets = this.sv00326GetCheckSheetsByDealId(deal.getId());
        checksheets.forEach(cs -> this.checkSheetDao.delete(cs.getId()));

        // delete from mybox of all users
        myboxItemDao.deleteDealFromAllBox(deal.getId());

        // because deals can not be deleted when its finished request design, means when an order was created for a
        // specificated deal, that deal can not be deleted. so we not mention order anymore in this method.

        this.dealDao.deleteDealInfo(deal.getDealCode());

        return true;

    }

    @Override
    public DealFileDto sv00310SaveDealFile(DealFileDto dealFileDto) {
        // check id
        if (dealFileDto.getId() != null) {
            dealFileDao.update(dealFileDto);
        } else {
            dealFileDao.create(dealFileDto);
        }
        dealFileDao.flush();
        return dealFileDto;
    }

    @Override
    public void sv00311DeleteDealFile(Integer dealFileId) {
        DealFileDto dealFile = dealFileDao.find(dealFileId);
        this.sv00311DeleteDealFile(dealFile);
    }

    @Override
    public void sv00311DeleteDealFile(DealFileDto dealFile) {
        Integer fileId = dealFile.getFileId();
        // delete product file
        dealFileDao.delete(dealFile.getId());
        // delete file
        sv006FileService.sv00607DeleteFile(fileId);
    }

    @Override
    public List<ProductFileDto> sv00312GetProductFileByProductId(Integer productId) {
        return productFileDao.getListProductFileByProductId(productId);
    }

    @Override
    public List<DealFileDto> sv00313GetDealFileByDealId(Integer dealId) {
        return dealFileDao.getDealFileByDealId(dealId);
    }

    @Override
    public List<DealDto> sv00318GetDealByProductId(Integer productId) {
        return dealDao.findDealByProductId(productId);
    }

    @Override
    public boolean sv00314CheckDealAndProductRelationship(String dealCode, String productCode) {
        DealDto dealDto = dealDao.findDealByDealCodeAndProductCode(dealCode, productCode);
        if (dealDto != null) {
            return true;
        }
        return false;
    }

    public List<CommentDto> sv00315ShowMoreComment(Integer dealId, Integer index) {
        return commentDao.getComments(index, dealId);
    }

    @Override
    public DealFileDto sv00316CreateDealFile(DealFileDto dealFileDto, String fileCode) {
        FileDto fileDto = sv006FileService.sv00604SaveTempFile(fileCode, Enums.ModuleType.DEAL_FILE);

        UserDto currentUser = sv001AuthService.getCurrentUser();
        DateTime now = DateTime.now();

        // create deal file record
        DealFileDto dealFile = new DealFileDto();
        dealFile.setDealFileId(dealFileDto.getDealFileId());
        dealFile.setFileId(fileDto.getId());
        dealFile.setOriginalName(dealFileDto.getOriginalName());
        dealFile.setDealId(dealFileDto.getDealId());
        dealFile.setDealFileName(dealFileDto.getDealFileName());
        dealFile.setMemo(dealFileDto.getMemo());
        dealFile.setHighlightFlag(dealFileDto.getHighlightFlag());
        // set common fields
        dealFile.setUpdatedUser(currentUser.getId());
        dealFile.setUpdatedDate(now);
        dealFile.setCreatedUser(currentUser.getId());
        dealFile.setCreatedDate(now);

        dealFile = dealFileDao.create(dealFile);
        return dealFile;
    }

    @Override
    public List<DealDto> sv00319ShowMoreTemplate(Integer offset, Integer limit) {
        return dealDao.loadMoreData(offset, limit);
    }

    @Override
    public Long sv00320GetTotalTemplates() {
        return dealDao.getTotal();
    }

    @Override
    public List<DealDto> sv00324GetAllBookmarkDeals(int userId, int startPosition, int maxResult) {
        return dealDao.getAllBookmarkDeals(userId, startPosition, maxResult);
    }

    @Override
    public List<DealDto> sv00326FilterExistingDealById(List<Integer> ids) {
        return dealDao.filterExistingDealsInList(ids);
    }

    @Override
    public List<ChecksheetDto> sv00326GetCheckSheetsByDealId(Integer dealId) {
        return checkSheetDao.getCheckSheetsByDealId(dealId);
    }

    @Override
    public ChecksheetDto sv00327SaveCheckSheet(ChecksheetDto checksheetDto) {
        if (checksheetDto.getId() != null) {
            ChecksheetDto oldData = checkSheetDao.find(checksheetDto.getId());
            checksheetDto.setCreatedDate(oldData.getCreatedDate());
            checksheetDto.setCreatedUser(oldData.getCreatedUser());
            checkSheetDao.update(checksheetDto);
            return checksheetDto;
        }

        checksheetDto.setCreatedDate(checksheetDto.getUpdatedDate());
        checksheetDto.setCreatedUser(checksheetDto.getUpdatedUser());

        return checkSheetDao.create(checksheetDto);
    }

    @Override
    public DealDto sv00330CreateDeal(DealDto dealDto) {
        DealDto newDeal = new DealDto();
        try {
            BeanUtils.copyProperties(newDeal, dealDto);
            newDeal.setId(null);
        } catch (Exception e) {
            newDeal = new DealDto();
            logger.error("sv00330CreateDeal: " + dealDto.getId(), e);
        }
        newDeal.setDealCode(null);
        newDeal.setTemplateFlag(Constants.DEAL);
        newDeal.setCustomerId(dealDto.getCustomerId());
        newDeal.setCustomerName(dealDto.getCustomerName());
        newDeal.setSalesId(dealDto.getSalesId());
        newDeal.setDealType(dealDto.getDealType());
        newDeal.setDealStatus(Enums.DealStatus.IN_PROGRESS.getStatus());
        newDeal.setClosedFlag(0);
        dealDao.create(newDeal);

        // generate deal code
        newDeal.setDealCode(GenerateUtil.generateDealCode(newDeal.getId()));
        dealDao.update(newDeal);
        //dealDao.flush();

        return newDeal;
    }

    @Override
    public Integer sv00328UpdateHighlightFlag(Integer itemId, Integer status, String itemType) {
        //1. Check itemType
        switch (itemType) {

            case Constants.ITEM_QUOTATION:
                quotationDao.updateHighlightFlagById(itemId, status);
                break;

            case Constants.ITEM_PRODUCT:
                productDao.updateHighlightFlagById(itemId, status);
                break;

            default:
                break;
        }

        return status;
    }

    @Override
    public Integer sv00329UpdateDealStatus(final Integer dealId) {
        DealDto deal = dealDao.find(dealId);
        final Integer currentDealStatus = deal.getDealStatus();
        Integer newDealStatus = currentDealStatus;
        if (Enums.DealStatus.IN_PROGRESS.getStatus().equals(currentDealStatus)
                || Enums.DealStatus.DESIGN_REQUEST_IN_PROGRESS.getStatus().equals(currentDealStatus)
                || Enums.DealStatus.DESIGN_COMPLETE.getStatus().equals(currentDealStatus)) {
            newDealStatus = getDealStatus(dealId);
        }

        // Update deal's status by 'nextDealStatus'
        if (!newDealStatus.equals(currentDealStatus)) {
            deal.setDealStatus(newDealStatus);
            dealDao.update(deal);
        }

        return newDealStatus;
    }

    /**
     * Method use to process deal's status based on product's status.
     *
     * @param dealId current deal id will be set status
     * @return new deal's status after updated
     */
    private Integer getDealStatus(final Integer dealId) {
        Integer newStatus = Enums.DealStatus.IN_PROGRESS.getStatus();

        //#2223: only includes product was set highlight_flag is on, excludes highlight_flag is off
        List<ProductDto> products = productDao.getProductsByDealId(dealId);
        if (CollectionUtil.isEmpty(products))
            return newStatus;

        /**
         * Notes: 1. At least 1 product have request design in progress then deal's status is 'design_request_in_progress'
         * 2. At least 1 product already designed then deal's status is 'design_complete'
         */
        boolean hasDesignInProgress = false;
        boolean hasDesignComplete = false;
        for (ProductDto productDto : products) {
            if (productDto.getRequestDesignFlag() == null) {
                continue;
            } else if (Enums.ProductStatus.DESIGN_REQUEST_IN_PROGRESS.getStatus().equals(productDto.getRequestDesignFlag())) {
                hasDesignInProgress = true;
            } else if (Enums.ProductStatus.DESIGN_COMPLETE.getStatus().equals(productDto.getRequestDesignFlag())) {
                hasDesignComplete = true;
            }
        }

        if (hasDesignInProgress) {
            newStatus = Enums.DealStatus.DESIGN_REQUEST_IN_PROGRESS.getStatus();
        }
        if (hasDesignComplete) {
            newStatus = Enums.DealStatus.DESIGN_COMPLETE.getStatus();
        }

        return newStatus;
    }

    @Override
    public DealProductDto sv00330UsingProductFromDeal(DealProductDto dealProductDtoBefore, Integer dealId, ProductDto productDto) {
        DealProductDto dealProductDto = usingProductFromDeal(dealProductDtoBefore, dealId, productDto);

        return dealProductDto;
    }

    @Override
    public List<DealDto> sv00322GetAllDealLazy(final Integer index, final Integer limit, final Integer userId, final Integer departmentId) {
        return dealDao.getAllDealLazy(index, limit, userId, departmentId);
    }

    @Override
    public Long sv00331CountDeals(Integer userId, Integer departmentId) {
        return dealDao.countDeals(userId, departmentId);
    }

    @Override
    public DealDto sv00329GetDealByDealCode(String dealCode, Integer dealStatus) {
        return dealDao.findDealInfoByDealCodeAndStatus(dealCode, dealStatus);
    }

    @Override
    public DealDto sv00325CopyAndSaveDeal(DealDto newDealInfo, String copyFrom) {
        // 1.0 Get old Deal
        DealDto oldDeal = dealDao.findDealInfoByDealCode(copyFrom);

        DealDto newDeal = new DealDto();
        try {
            BeanUtils.copyProperties(newDeal, oldDeal);
            newDeal.setId(null);
        } catch (Exception e) {
            newDeal = new DealDto();
            logger.error("sv00325CopyAndSaveDeal: " + oldDeal.getId(), e);
        }
        Integer oldDealId = oldDeal.getId();
        newDeal.setDealStatus(Enums.DealStatus.IN_PROGRESS.getStatus());
        newDeal.setTemplateFlag(Constants.DEAL);
        newDeal.setDealCode(null);
        newDeal.setId(null);
        newDeal.setDealName(newDealInfo.getDealName());
        newDeal.setDeliveryDate(newDealInfo.getDeliveryDate());
        newDeal.setEstTotalDeal(newDealInfo.getEstTotalDeal());
        newDeal.setCustomerId(newDealInfo.getCustomerId());
        newDeal.setCustomerName(newDealInfo.getCustomerName());
        newDeal.setSalesId(newDealInfo.getSalesId());
        // set duplicate deal type = new
        newDeal.setDealType(newDealInfo.getDealType());
        newDeal.setClosedFlag(0);
        newDeal.setDealLockFlag(Enums.Status.DEAL_LOCK_FLAG_OFF.getStatus());
        //3120
        newDeal.setJobInprocess(0);

        // 2.0 Create new Deal
        dealDao.create(newDeal);

        // generate deal code
        newDeal.setDealCode(GenerateUtil.generateDealCode(newDeal.getId()));
        dealDao.update(newDeal);

        // clone Deal Files
        this.applyDealFilesFromSource(newDeal, oldDealId);

        // 2.1 Clone Product and DealProduct
        List<DealProductDto> oldDealProducts = dealProductDao.getDealProductByDealId(oldDealId);
        List<DealProductDto> cloneDealProductDtos = Lists.newArrayList();
        if (CollectionUtil.isNotEmpty(oldDealProducts)) {
            for (DealProductDto dealProductDto : oldDealProducts) {
                ProductDto productDto = productDao.find(dealProductDto.getProductId());
                ProductDto newProductDto = new ProductDto();
                try {
                    BeanUtils.copyProperties(newProductDto, productDto);
                    newProductDto.setId(null);
                } catch (Exception e) {
                    newProductDto = new ProductDto();
                    logger.error("Copy productDto error: " + productDto.getId(), e);
                }

                // 2.1.1 Clone product
                /*reset state of {request_design_flag is null, request_production_flag = 0, reset item_code is null}*/
                newProductDto.setRequestDesignFlag(null);
                newProductDto.setRequestProductionFlag(0);
                newProductDto.setItemCode(null);
                newProductDto.setDenno(0);

                productDao.create(newProductDto);

                // generate product code
                newProductDto.setProductCode(GenerateUtil.generateProductCode(newProductDto.getId()));

                // clone Product Files
                cloneProductFiles(productDto.getId(), newProductDto.getId());

                productDao.update(newProductDto);

                // Clone ProductCommonFeeDto
                ProductCommonFeeDto productCommonFeeDto = productCommonFeeDao.getProductCommonFee(productDto.getId());
                if (productCommonFeeDto != null) {
                    ProductCommonFeeDto newProductCommonFree = new ProductCommonFeeDto();
                    try {
                        BeanUtils.copyProperties(newProductCommonFree, productCommonFeeDto);
                        newProductCommonFree.setId(null);
                    } catch (Exception e) {
                        productCommonFeeDto = new ProductCommonFeeDto();
                        logger.error("sv00325CopyAndSaveDeal: productCommonFeeDto: " + productCommonFeeDto.getId(), e);
                    }
                    newProductCommonFree.setProductId(newProductDto.getId());
                    productCommonFeeDao.create(newProductCommonFree);
                    newProductDto.setProductCommon(newProductCommonFree);
                }

                // Clone new DealProduct
                DealProductDto newDealProductDto = new DealProductDto();
                try {
                    BeanUtils.copyProperties(newDealProductDto, dealProductDto);
                    newDealProductDto.setId(null);
                } catch (Exception e) {
                    newDealProductDto = new DealProductDto();
                    logger.error("sv00325CopyAndSaveDeal: dealProductDto: " + dealProductDto.getId(), e);
                }
                newDealProductDto.setDealId(newDeal.getId());
                newDealProductDto.setProductId(newProductDto.getId());
                // Implement follow #2878
                newDealProductDto.setHighlightFlag(Enums.Status.HIGHLIGHT_FLAG_ON.getStatus());

                dealProductDao.create(newDealProductDto);
                newDealProductDto.setProduct(newProductDto);

                // 2.1.2 Clone PRoductOutput + Offer
                List<ProductOutputDto> productOutputDtos = productOutputDao.getProductOutputByDealProductId(
                        dealProductDto.getId());
                List<ProductOutputDto> productOutputDtoList = new ArrayList<>();
                if (productOutputDtos.size() > 0) {
                    for (ProductOutputDto productOutputDto : productOutputDtos) {
                        List<OfferDto> offerDtos = offerDao.getOfferDtoByProductOutputId(productOutputDto.getId());
                        // Clone productOutput
                        ProductOutputDto newProductOutputDto = new ProductOutputDto();
                        try {
                            BeanUtils.copyProperties(newProductOutputDto, productOutputDto);
                            newProductOutputDto.setId(null);
                        } catch (Exception e) {
                            newProductOutputDto = new ProductOutputDto();
                            logger.error("sv00325CopyAndSaveDeal: productOutputDto: " + productOutputDto.getId(), e);
                        }
                        newProductOutputDto.setDealProductId(newDealProductDto.getId());
                        productOutputDao.create(newProductOutputDto);

                        // Clone Offer
                        for (OfferDto offerDto : offerDtos) {
                            OfferDto newOfferDto = new OfferDto();
                            try {
                                BeanUtils.copyProperties(newOfferDto, offerDto);
                                newOfferDto.setId(null);
                            } catch (Exception e) {
                                newOfferDto = new OfferDto();
                                logger.error("sv00325CopyAndSaveDeal: offerDto: " + offerDto.getId(), e);
                            }
                            newOfferDto.setProductOutputId(newProductOutputDto.getId());
                            offerDao.create(newOfferDto);

                            newProductOutputDto.setOffer(newOfferDto);
                        }
                        productOutputDtoList.add(newProductOutputDto);
                    }
                }

                newDealProductDto.setProductOutputs(productOutputDtoList);
                // add to clone list
                cloneDealProductDtos.add(newDealProductDto);
            }
        }
        // update to clone deal
        newDeal.setDealProducts(cloneDealProductDtos);

        // 2.2 Clone Quotation
        List<QuotationDto> quotationDtos = quotationDao.getQuotationByDealId(oldDealId);
        List<QuotationDto> quotationDtoList = new ArrayList<>();
        if (quotationDtos.size() > 0) {
            for (QuotationDto quotationDto : quotationDtos) {
                QuotationDto newQuotationDto = new QuotationDto();
                try {
                    BeanUtils.copyProperties(newQuotationDto, quotationDto);
                    newQuotationDto.setId(null);
                } catch (Exception e) {
                    newQuotationDto = new QuotationDto();
                    logger.error("sv00325CopyAndSaveDeal: quotationDto: " + quotationDto.getId(), e);
                }
                newQuotationDto.setDealId(newDeal.getId());
                // get list quotation items
                List<QuotationItemDto> quotationItemDtos = quotationItemDao.getQuotationItemsByQuotationId(
                        quotationDto.getId());

                // Implement follow #2878
                newQuotationDto.setHighlightFlag(Enums.Status.HIGHLIGHT_FLAG_ON.getStatus());

                quotationDao.create(newQuotationDto);

                //Fix #1779, must update for clone quotation
                newQuotationDto.setQuotationCode(GenerateUtil.generateQuotationCode(
                        newDeal.getDealCode(), newQuotationDto.getId()));
                quotationDao.update(newQuotationDto);

                // Clone QuotationItem
                List<QuotationItemDto> quotationItemDtoList = new ArrayList<>();
                if (quotationItemDtos.size() > 0) {
                    for (QuotationItemDto quotationItemDto : quotationItemDtos) {
                        QuotationItemDto newQuotationItemDto = new QuotationItemDto();
                        try {
                            BeanUtils.copyProperties(newQuotationItemDto, quotationItemDto);
                            newQuotationItemDto.setId(null);
                        } catch (Exception e) {
                            newQuotationItemDto = new QuotationItemDto();
                            logger.error("sv00325CopyAndSaveDeal: quotationItemDto: " + quotationItemDto.getId(), e);
                        }
                        // set id deal product to quotation item
                        if(newQuotationItemDto.getDealProductId() != null){
                            for(int i = 0; i< cloneDealProductDtos.size();i++){
                                //1. tim id trong list deal product cũ
                                if(newQuotationItemDto.getDealProductId().equals(oldDealProducts.get(i).getId())){
                                    //2. set id deal product tương ứng với list mới
                                    newQuotationItemDto.setDealProductId(cloneDealProductDtos.get(i).getId());
                                    break;
                                }
                            }
                        }
                        // set quotation id
                        newQuotationItemDto.setQuotationId(newQuotationDto.getId());
                        quotationItemDao.create(newQuotationItemDto);
                        quotationItemDtoList.add(newQuotationItemDto);
                    }
                }
                newQuotationDto.setQuotationItems(quotationItemDtoList);
                quotationDtoList.add(newQuotationDto);
            }
        }
        newDeal.setQuotations(quotationDtoList);

        // 2.3 Clone CheckSheet
        this.applyCheckSheetFromSource(newDeal, oldDealId);

        return newDeal;
    }

    private DealProductDto usingProductFromDeal(DealProductDto dealProductDtoBefore, Integer dealId, ProductDto productDto) {
        // 1.0 Create Deal Product
        DealProductDto dealProductDto = new DealProductDto();
        // always set highlight flag is ON {0-OFF, 1-ON}
        dealProductDto.setHighlightFlag(Enums.Status.HIGHLIGHT_FLAG_ON.getStatus());

        dealProductDto.setDealId(dealId);
        dealProductDto.setCreatedUser(productDto.getCreatedUser());
        dealProductDto.setUpdatedUser(productDto.getUpdatedUser());
        dealProductDto.setProductId(productDto.getId());
        dealProductDto = dealProductDao.create(dealProductDto);
        List<ProductOutputDto> productOutputDtos = productOutputDao.getProductOutputByDealProductId(dealProductDtoBefore.getId());

        // 1.2 Create ProductOutput
        List<OfferDto> offerDtos = new ArrayList<>();
        for (ProductOutputDto productOutputDtoBefore : productOutputDtos) {
            ProductOutputDto productOutputDto = new ProductOutputDto();
            try {
                BeanUtils.copyProperties(productOutputDto, productOutputDtoBefore);
                productOutputDto.setId(null);
            } catch (Exception e) {
                productOutputDto = new ProductOutputDto();
                logger.error("sv00325CopyAndSaveDeal: productOutputDtoBefore: " + productOutputDtoBefore.getId(), e);
            }
            productOutputDto.setDealProductId(dealProductDto.getId());
            productOutputDto.setCreatedUser(productDto.getCreatedUser());
            productOutputDto.setUpdatedUser(productDto.getUpdatedUser());
            productOutputDto.setPrimaryFlag(0);

            productOutputDao.create(productOutputDto);

            // Create Offers
            OfferDto offerDtoBefore = offerDao.getOfferByProductOutputId(productOutputDtoBefore.getId());
            OfferDto offerDto = new OfferDto();
            try {
                BeanUtils.copyProperties(offerDto, offerDtoBefore);
                offerDto.setId(null);
            } catch (Exception e) {
                offerDto = new OfferDto();
                logger.error("usingProductFromDeal: offerDtoBefore: " + offerDtoBefore.getId(), e);
            }

            offerDto.setUpdatedUser(productDto.getUpdatedUser());
            offerDto.setCreatedUser(productDto.getUpdatedUser());
            offerDto.setProductOutputId(productOutputDto.getId());

            offerDao.create(offerDto);
            offerDtos.add(offerDto);

            productOutputDto.setOffer(offerDto);
        }

        dealProductDto.setProduct(productDto);

        return dealProductDto;
    }

    /**
     * Method use to clone product files based on source product id.
     *
     * @param srcProductId the id of product will be cloned.
     * @param desProductId the id of product already cloned.
     */
    private void cloneProductFiles(final Integer srcProductId, final Integer desProductId) {
        List<ProductFileDto> productFiles = productFileDao.getListProductFileByProductId(srcProductId);
        if (CollectionUtil.isNotEmpty(productFiles)) {
            productFiles.stream().forEach(productFile -> {
                ProductFileDto cloneableProductFile = new ProductFileDto();
                try {
                    BeanUtils.copyProperties(cloneableProductFile, productFile);
                    cloneableProductFile.setId(null);
                } catch (Exception e) {
                    cloneableProductFile = new ProductFileDto();
                    logger.error("cloneProductFiles: productFile: " + productFile.getId(), e);
                }
                cloneableProductFile.setProductId(desProductId);

                FileDto cloneableFile = sv006FileService.sv00611DuplicateFile(cloneableProductFile.getFileId());
                // Bug 3017
                if(cloneableFile != null) {
                    cloneableProductFile.setFileId(cloneableFile.getId());
                    productFileDao.create(cloneableProductFile);
                }
            });
        }
    }

    public DealDto sv00332RepeatDeal(DealDto source) {
        // clone deal
        DealDto newDeal = this.sv00330CreateDeal(source);

        // set type and status
        newDeal.setDealType(Enums.DealType.REPEAT.getType());
        newDeal.setDealStatus(source.getDealStatus());
        newDeal = this.sv00307SaveDeal(newDeal);

        // apply files from old deal
        this.applyDealFilesFromSource(newDeal, source.getId());

        // apply products from old deal
        this.applyDealProductsAndQuotationsFromSource(newDeal, source.getId());

        // apply checksheet from old deal
        this.applyCheckSheetFromSource(newDeal, source.getId());

        return newDeal;
    }

    @Override
    public void sv003033RemoveDealById(int dealId) {
        dealDao.delete(dealId);
    }

    @Override
    public List<DealInfoJson> sv003035GetDeal(Integer departmentId, Integer picId, String startDate, String endDate) {

        List<Object[]> result = dealDao.getDeal(departmentId, picId, endDate, startDate);
        List<DealInfoJson> dealInfoJsons = new ArrayList<>();
        if (CollectionUtil.isNotEmpty(result)) {
            for (Object[] obj : result) {
                DealInfoJson dealInfoJson = new DealInfoJson();
                dealInfoJson.setInvoiceDate(String.valueOf(obj[0]));
                dealInfoJson.setDealCode(String.valueOf(obj[1]));
                dealInfoJson.setDealName(String.valueOf(obj[2]));
                dealInfoJson.setProductType(Integer.valueOf(obj[3].toString()));
                dealInfoJson.setAmountOfMoney(new BigDecimal(obj[4].toString()));
                dealInfoJson.setNumberOfOrder(new BigDecimal(obj[5].toString()));
                dealInfoJson.setUnitPrice(new BigDecimal(obj[6].toString()));

                dealInfoJsons.add(dealInfoJson);
            }
        }
        return dealInfoJsons;
    }

    @Override
    public List<DealDto> sv00336GetDealInProcess(Integer userId, Integer departmentId, Integer offset, Integer limit) {
        return dealDao.getAllDealsInProcess(userId, departmentId, offset, limit);
    }

    @Override
    public long sv00337CountDealInProcess(final Integer userId, final Integer departmentId) {
        return dealDao.countDealInProcess(userId, departmentId);
    }

    @Override
    public void sv0030307CloseDeal(Integer dealId) {
        DealDto deal = dealDao.find(dealId);
        deal.setClosedFlag(1);
        dealDao.update(deal);
    }

    @Override
    public List<DealDto> sv0020501GetDeals(final SF00205Filter filter, final Integer offset, final Integer limit) {
        return dealDao.getDealFromTo(filter, offset, limit);
    }

    @Override
    public long sv0020502CountDeal(final SF00205Filter filter) {
        return dealDao.countDealByFilter(filter);
    }

    @Override
    public DealFileDto sv00338GetDealFile(final Integer dealId, final Integer fileId) {
        return dealFileDao.getDealFile(dealId, fileId);
    }

    @Override
    public Long sv003034GetTotalCommentsByDealId(final Integer dealId) {
        return commentDao.getTotalCommentsByDealId(dealId);
    }

    @Override
    public CommentDto sv003035GetLatestCommentByDealId(final Integer dealId) {
        return commentDao.getLatestCommentByDealId(dealId);
    }

    @Override
    public Integer sv003036DealLock(Integer dealId) {
        DealDto dealDto = dealDao.find(dealId);
        // check lock
        if (dealDto.getDealLockFlag() != null && dealDto.getDealLockFlag() == Enums.Status.DEAL_LOCK_FLAG_ON.getStatus()) {
            // unlock
            dealDto.setDealLockFlag(Enums.Status.DEAL_LOCK_FLAG_OFF.getStatus());
        }
        //lock
        else {
            dealDto.setDealLockFlag(Enums.Status.DEAL_LOCK_FLAG_ON.getStatus());
        }
        // update deal
        dealDao.update(dealDto);

        return dealDto.getDealLockFlag();
    }

    @Override
    public List<DealDto> sv0020201GetDealInProcessOfSales(Integer offset, Integer limit) {
        return dealDao.getAllDealSales(offset, limit);
    }

    @Override
    public long sv0020202CountDealInProcessOfSales() {
        return dealDao.countDealsSales();
    }

    /**
     * Method use to clone deal files based on source deal id.
     */
    private void applyDealFilesFromSource(DealDto target, Integer sourceDealid) {
        List<DealFileDto> dealFiles = sv00313GetDealFileByDealId(sourceDealid);
        List<DealFileDto> newDealFiles = new ArrayList<>();
        for (DealFileDto dealFile: dealFiles) {
            DealFileDto newDealFile = new DealFileDto();
            try {
                BeanUtils.copyProperties(newDealFile, dealFile);
                newDealFile.setId(null);
            } catch (Exception e) {
                newDealFile = new DealFileDto();
                logger.error("applyDealFilesFromSource: dealFile: " + dealFile.getId(), e);
            }
            newDealFile.setDealId(target.getId());

            FileDto file = sv006FileService.sv00611DuplicateFile(newDealFile.getFileId());
            if(file != null) {
                newDealFile.setFileId(file.getId());

                dealFileDao.create(newDealFile);
                newDealFiles.add(newDealFile);
            }
        }
        target.setDealFiles(newDealFiles);
    }

    /**
     * Method use to clone deal products and quotations based on source deal id.
     */
    private void applyDealProductsAndQuotationsFromSource(DealDto target, Integer sourceDealId) {
        List<DealProductDto> dealProducts = dealProductService.sv01401GetDealProductByDealId(sourceDealId);
        Map<Integer, Integer> dealProductsMapping = new HashMap<>();
        List<DealProductDto> newDealProducts = dealProducts.stream().map(dp -> {
            // create new dealProduct
            DealProductDto ndp = new DealProductDto();
            ndp.setDealId(target.getId());
            ndp.setProductId(dp.getProductId());
            dealProductDao.create(ndp);
            Integer ndpId = ndp.getId();
            dealProductsMapping.put(dp.getId(), ndpId);

            // copy deal products
            dp.getProductOutputs().forEach(po -> {
                // create new product output
                ProductOutputDto npo = new ProductOutputDto();
                try {
                    BeanUtils.copyProperties(npo, po);
                    npo.setId(null);
                    npo.setDealProductId(ndpId);
                    productOutputDao.create(npo);

                    OfferDto no = new OfferDto();
                    BeanUtils.copyProperties(no, po.getOffer());
                    no.setId(null);
                    no.setProductOutputId(npo.getId());
                    offerDao.create(no);
                } catch (Exception e) {
                    npo = new ProductOutputDto();
                    logger.error("applyDealProductsAndQuotationsFromSource: po: " + po.getId(), e);
                }
            });

            return ndp;
        }).collect(Collectors.toList());
        target.setDealProducts(newDealProducts);

        List<QuotationDto> quotations = quotationService.sv00402GetQuotationsByDealId(sourceDealId);
        List<QuotationDto> newQuotations = quotations.stream().map(quotation -> {
            // create quotation
            QuotationDto newQuotation = new QuotationDto();
            try {
                BeanUtils.copyProperties(newQuotation, quotation);
                newQuotation.setId(null);
            } catch (Exception e) {
                newQuotation = new QuotationDto();
                logger.error("applyDealProductsAndQuotationsFromSource: quotation: " + quotation.getId(), e);
            }
            newQuotation.setDealId(target.getId());
            quotationDao.create(newQuotation);
            newQuotation.setQuotationCode(GenerateUtil.generateQuotationCode(target.getDealCode(), newQuotation.getId()));
            quotationDao.update(newQuotation);
            Integer newQuotationId = newQuotation.getId();

            // copy quotation items
            List<QuotationItemDto> items = quotationService.sv00401GetQuotationItemsByQuotationId(quotation.getId());
            List<QuotationItemDto> newItems = items.stream().map(item -> {
                QuotationItemDto newItem = new QuotationItemDto();
                try {
                    BeanUtils.copyProperties(newItem, item);
                    newItem.setId(null);
                } catch (Exception e) {
                    newItem = new QuotationItemDto();
                    logger.error("applyDealProductsAndQuotationsFromSource: item: " + item.getId(), e);
                }
                newItem.setDealProductId(dealProductsMapping.get(item.getDealProductId()));
                newItem.setQuotationId(newQuotationId);
                quotationItemDao.create(newItem);
                return newItem;
            }).collect(Collectors.toList());
            newQuotation.setQuotationItems(newItems);

            return newQuotation;
        }).collect(Collectors.toList());

        target.setQuotations(newQuotations);
    }

    /**
     * Method use to clone deal products and quotations based on source deal id.
     */
    private void applyCheckSheetFromSource(DealDto target, Integer sourceDealId) {
        List<ChecksheetDto> sheets = checkSheetDao.getCheckSheetsByDealId(sourceDealId);

        List<ChecksheetDto> newSheets = sheets.stream().map(sheet -> {
            ChecksheetDto newSheet = new ChecksheetDto();
            newSheet.setDealId(target.getId());
            newSheet.setCheckBox3(sheet.getCheckBox3());
            newSheet.setCheckBox2(sheet.getCheckBox2());
            newSheet.setCheckBox1(sheet.getCheckBox1());
            newSheet.setQuestionCode(sheet.getQuestionCode());
            newSheet.setRadioButton(sheet.getRadioButton());
            newSheet.setSelectBox1(sheet.getSelectBox1());
            newSheet.setSelectBox2(sheet.getSelectBox2());
            newSheet.setSelectBox3(sheet.getSelectBox3());
            newSheet.setTextArea1(sheet.getTextArea1());
            newSheet.setTextArea2(sheet.getTextArea2());

            checkSheetDao.create(newSheet);

            return newSheet;
        }).collect(Collectors.toList());

        target.setChecksheet(newSheets);
    }

    @Override
    public List<DealDto> findReleatedDeals(DealDto deal) {
        int sourceDealId = deal.getSourceDealId() != null ? deal.getSourceDealId() : deal.getId();

        DealDto sourceDeal = dealDao.findDealAndOrderByDealId(sourceDealId);            // 元案件
        List<DealDto> repeatDeals = dealDao.getRepeatDealsAndOrders(sourceDealId);      // リピート案件

        if (sourceDeal == null) {
            // 元案件が見つからない ... データベース不整合
            return Collections.emptyList();
        }
        List<DealDto> result = new ArrayList<>(repeatDeals.size() + 1);
        result.addAll(repeatDeals);       // リピート案件
        result.add(sourceDeal);           // 元案件
        return result;
    }
}
