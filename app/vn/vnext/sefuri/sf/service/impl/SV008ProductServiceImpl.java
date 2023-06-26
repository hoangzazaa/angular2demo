package vn.vnext.sefuri.sf.service.impl;

import com.auth0.jwt.internal.org.apache.commons.lang3.StringUtils;
import com.google.common.collect.Lists;
import com.google.inject.Inject;
import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang3.ObjectUtils;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.common.Enums;
import vn.vnext.sefuri.sf.common.Enums.CartonType;
import vn.vnext.sefuri.sf.common.Enums.ProductType;
import vn.vnext.sefuri.sf.dao.*;
import vn.vnext.sefuri.sf.dao.impl.GenericDaoImpl;
import vn.vnext.sefuri.sf.dto.*;
import vn.vnext.sefuri.sf.service.SV006FileService;
import vn.vnext.sefuri.sf.service.SV008ProductService;
import vn.vnext.sefuri.sf.service.SV011WoodenService;
import vn.vnext.sefuri.sf.service.SV014DealProductService;
import vn.vnext.sefuri.sf.util.CollectionUtil;
import vn.vnext.sefuri.sf.util.FormatUtil;

import java.util.*;
import java.util.stream.Collectors;

import javax.annotation.Nonnull;

/**
 * Created by DungTQ on 1/4/2017.
 */
public class SV008ProductServiceImpl extends GenericDaoImpl<ProductDto> implements SV008ProductService {
    Logger logger = LoggerFactory.getLogger(SV008ProductServiceImpl.class);

    @Inject
    private ProductDao productDao;

    @Inject
    private ProductFileDao productFileDao;

    @Inject
    private ProductOutputDao productOutputDao;

    @Inject
    private ProductCommonFeeDao productCommonFeeDao;

    @Inject
    private SV006FileService sv006FileService;

    @Inject
    private OfferDao offerDao;

    @Inject
    private DealDao dealDao;

    @Inject
    private DrawingImageDao drawingImageDao;

    @Inject
    private OrderItemDao orderItemDao;

    @Inject
    private ShippingDestinationDao shippingDestinationDao;

    @Inject
    private SV014DealProductService dealProductService;

    /** 木型に関するサービス */
    @Inject
    private SV011WoodenService woodenService;

    public SV008ProductServiceImpl() {
        super(ProductDto.class);
    }

    @Override
    public ProductOutputDto sv00814GetProductOutputById(Integer productOutputId) {
        return productOutputDao.find(productOutputId);
    }

    @Override
    public DrawingImageDto sv00815CreateDrawingImage(DrawingImageDto drawingImageDto) {
        DrawingImageDto image = drawingImageDao.create(drawingImageDto);
        drawingImageDao.flush();
        return image;
    }

    @Override
    public List<DrawingImageDto> sv00816GetListDrawingImage(Integer productId) {
        return drawingImageDao.getListDrawingImageByProductId(productId);
    }

    @Override
    public List<ProductFileDto> sv00820GetProductFileByModuleTypeAndProductId(Integer productId, Enums.ModuleType
            moduleType) {
        return productFileDao.getProductFileByFileTypeAndProductId(productId, moduleType.getCode());
    }

    @Override
    public int sv00821DeleteDrawingImageByProductId(Integer productId) {
        int delete = drawingImageDao.deleteDrawingImageByProductId(productId);
        drawingImageDao.flush();
        return delete;
    }

    @Override
    public List<ProductOutputDto> sv00822GetProductOutputByDealProductId(Integer dealProductId) {
        return productOutputDao.getProductOutputByDealProductId(dealProductId);
    }

    @Override
    public ProductDto sv00825UpdateProductInput(ProductDto productDto) {
        return productDao.update(productDto);
    }

    @Override
    public ProductDto sv00803UpdateProduct(ProductDto productDto) {
        ProductDto productDtoTmp = sv0080301UpdateProduct(productDto);
        return productDtoTmp;
    }

    private ProductDto sv0080301UpdateProduct(ProductDto productDto) {
        List<DealProductDto> dealProducts = productDto.getDealProducts();
        List<Integer> ids = new ArrayList<>();
        if (CollectionUtil.isNotEmpty(dealProducts)) {
            List<ProductOutputDto> productOutputs = Lists.newArrayList();
            dealProducts.forEach(dp -> {
                List<ProductOutputDto> productOutputList = dp.getProductOutputs();
                if (CollectionUtil.isNotEmpty(productOutputList))
                    productOutputs.addAll(productOutputList);
                ids.add(dp.getId());
            });

            // 1.0 Update ProductOutputDto
            if (CollectionUtil.isNotEmpty(productOutputs)) {
                productOutputs.stream().filter(po -> po != null).forEach(po -> {
                    // update product output
                    productOutputDao.update(po);
                    //productOutputDao.flush();

                    // update product offer
                    if (po.getOffer() != null && po.getOffer().getId() != null) {
                        offerDao.update(po.getOffer());
                        //offerDao.flush();
                    }
                });
            }

            productDto.setDealProducts(dealProducts);
        }

        if (productDto.getProductCommon() != null) {
            productCommonFeeDao.update(productDto.getProductCommon());
            //productCommonFeeDao.flush();
        }

        productDto = productDao.update(productDto);
        productDto.setProductCommon(productCommonFeeDao.getProductCommonFee(productDto.getId()));

        //productDao.flush();
        return productDto;
    }

    @Override
    public ProductDto sv00823UpdateProductAll(ProductDto productDto, List<ProductOutputDto> productOutputDtos) {
        // 1.0 Update ProductOutputDto
        ProductDto result = sv0082301UpdateProductAll(productDto, productOutputDtos);

        return result;
    }

    private ProductDto sv0082301UpdateProductAll(ProductDto productDto, List<ProductOutputDto> productOutputDtos) {

        if (CollectionUtil.isNotEmpty(productOutputDtos)) {
            for (ProductOutputDto productOutputDto : productOutputDtos) {
                // update product output
                productOutputDto.setDealProductId(productOutputDao.find(productOutputDto.getId()).getDealProductId());

                productOutputDao.update(productOutputDto);

                // update product offer
                OfferDto offerDto = productOutputDto.getOffer();
                if (offerDto != null) {
                    offerDto.setProductOutputId(offerDao.find(offerDto.getId()).getProductOutputId());
                    offerDao.update(offerDto);
                }
            }
        }

        if (productDto.getProductCommon() != null) {
            productCommonFeeDao.update(productDto.getProductCommon());
        }
        productDto = productDao.update(productDto);

        productDto.setProductCommon(productCommonFeeDao.getProductCommonFee(productDto.getId()));

        return productDto;
    }

    @Override
    public ProductFileDto sv00805CreateProductFile(ProductFileDto productFileDto, String fileCode) {
        FileDto fileDto = sv006FileService.sv00604SaveTempFile(fileCode, Enums.ModuleType.PRODUCT_FILE);
        // set update user and create user
        productFileDto.setFileId(fileDto.getId());

        ProductFileDto newProductFileDto = new ProductFileDto();
        try {
            BeanUtils.copyProperties(newProductFileDto, productFileDto);
            newProductFileDto.setId(null);
        } catch (Exception e) {
            newProductFileDto = new ProductFileDto();
            logger.error("sv00805CreateProductFile: " + productFileDto.getId(), e);
        }
        newProductFileDto.setCreatedUser(productFileDto.getUpdatedUser());
        newProductFileDto.setUpdatedUser(productFileDto.getUpdatedUser());

        productFileDao.create(newProductFileDto);

        // if current product file is set primary_flag = 1 then reset all another product file to 0
        if (Enums.Status.PRIMARY_FLAG_ON.getStatus() == newProductFileDto.getPrimaryFlag())
            sv00830ResetPrimaryFlagExceptCurrent(newProductFileDto);

        return newProductFileDto;
    }

    @Override
    public ProductFileDto sv00806UpdateProductFile(ProductFileDto productFileDto) {
        productFileDto.setProduct(null);
        productFileDto.setUpdatedUser(productFileDto.getUpdatedUser());
        if (productFileDto.getId() == null) {
            productFileDao.create(productFileDto);
            productFileDao.flush();
        } else {
            productFileDao.update(productFileDto);
        }

        // if current product file is set primary_flag = 1 then reset all another product file to 0
        if (Enums.Status.PRIMARY_FLAG_ON.getStatus() == productFileDto.getPrimaryFlag())
            sv00830ResetPrimaryFlagExceptCurrent(productFileDto);

        return productFileDto;
    }

    @Override
    public Boolean sv00807DeleteProductFile(Integer productFileId) {
        try {
            ProductFileDto productFileDto = productFileDao.find(productFileId);
            Integer fileId = productFileDto.getFileId();
            // delete product file
            productFileDao.delete(productFileId);
            // delete file
            sv006FileService.sv00607DeleteFile(fileId);
            return true;
        } catch (Exception e) {
            logger.error("sv00807DeleteProductFile: productFileId: " + productFileId + "Problem: " + e.toString());
            return false;
        }
    }

    @Override
    public void sv00808UpdateProductOutput(ProductOutputDto productOutputDto) {
        Collection<ProductOutputDto> productOutputDtos = productOutputDao.getProductOutputByDealProductId
                (productOutputDto.getDealProductId());
        if (CollectionUtil.isNotEmpty(productOutputDtos)) {
            for (ProductOutputDto productOutputDtoTmp : productOutputDtos) {
                productOutputDtoTmp.setPrimaryFlag(0);
                productOutputDao.update(productOutputDtoTmp);
            }
//            if (productOutputDto.getLot() == null) {
//                productOutputDto = new ProductOutputDto();
//            }
            productOutputDao.update(productOutputDto);
        }
    }

    @Override
    public void sv00809UpdateProductCommonFee(ProductCommonFeeDto productCommonFeeDto) {
        productCommonFeeDao.update(productCommonFeeDto);
    }

    @Override
    public ProductDto sv00810GetProductById(final Integer productId) {
        return productDao.find(productId);
    }

    @Override
    public List<ProductFileDto> sv00811GetProductFileByProductId(final Integer productId) {
        return productFileDao.getListProductFileByProductId(productId);
    }

    @Override
    public List<ProductOutputDto> sv00812GetProductOutputByDealProductId(Integer dealProductId) {
        return productOutputDao.getProductOutputByDealProductId(dealProductId);
    }

    @Override
    public ProductCommonFeeDto sv00813getProductCommonFreeByProductId(final Integer productId) {
        return productCommonFeeDao.getProductCommonFee(productId);
    }


    @Override
    public ProductDto sv00826UpdateProductImposition(ProductDto productDto) {
        // verify input
        ProductDto result = sv0082601UpdateProductImposition(productDto);
        return result;
    }

    private ProductDto sv0082601UpdateProductImposition(ProductDto productDto) {
        if (productDto == null || productDto.getId() == null) {
            return null;
        }
        // find product
        ProductDto product = productDao.find(productDto.getId());
        // verify product exists
        if (product == null) {
            return null;
        }
        // update product data
        // 紙器タイプ
        product.setShapeId(productDto.getShapeId());
        // 製品寸法
        product.setSizeD(productDto.getSizeD());
        product.setSizeH(productDto.getSizeH());
        product.setSizeW(productDto.getSizeW());
        // 展開寸法
        product.setBlankPaperSizeH(productDto.getBlankPaperSizeH());
        product.setBlankPaperSizeW(productDto.getBlankPaperSizeW());
        // 原紙名
        product.setPaperNameId(productDto.getPaperNameId());
        // 坪量
        product.setPaperWeight(productDto.getPaperWeight());
        product.setPaperId(productDto.getPaperId());
        product.setPaperHeadApprovalFlag(productDto.getPaperHeadApprovalFlag());
        product.setPaperSizeH(productDto.getPaperSizeH());
        product.setPaperSizeW(productDto.getPaperSizeW());
        product.setFactoryId(productDto.getFactoryId());

        product = productDao.update(product);
        return product;
    }

    @Override
    public ProductOutputDto sv00827GetProductOutPutSelected(Integer dealProductId) {
        return productOutputDao.getProductOutputSelected(dealProductId);
    }

    @Override
    public List<ProductDto> sv00828GetProductsByDealIds(List<Integer> dealIds) {
        return productDao.getProductsBydealIds(dealIds);
    }

    /**
     * Method use to get single product file by latest update_date.
     *
     * @param productId the product id
     * @return {@link ProductFileDto}
     */
    @Override
    public ProductFileDto sv00829GetPrimaryProductFile(final Integer productId) {
        if (productId == null)
            return null;

        List<ProductFileDto> productFiles = sv00811GetProductFileByProductId(productId);
        if (CollectionUtil.isEmpty(productFiles)) return null;

        // filter by list is on (primary_flag = 1)
        List<ProductFileDto> checkedProductFiles = productFiles.stream().filter(productFile -> productFile
                .getPrimaryFlag() == 1).collect(Collectors.toList());

        // If there is no item was (primary_flag = 1) then checked list default list.
        if (CollectionUtil.isEmpty(checkedProductFiles))
            checkedProductFiles = Lists.newArrayList(productFiles);

        //Can multi product files set 'primary_flag = 1' there for always get latest image of product.
        //sort list based on updated_date to get single product file by latest updated_date
        Collections.sort(checkedProductFiles, new Comparator<ProductFileDto>() {
            @Override
            public int compare(final ProductFileDto o1, final ProductFileDto o2) {
                // descending order by updated_date
                return o2.getUpdatedDate().compareTo(o1.getUpdatedDate());
            }
        });

        return checkedProductFiles.get(0);
    }

    /**
     * Method use to set all primary_flag to 0 if current {@link ProductFileDto} was setting primary_flag = 1, exclude
     * itself.
     *
     * @param productFile the current {@link ProductFileDto} will be ignore
     */
    @Override
    public void sv00830ResetPrimaryFlagExceptCurrent(final ProductFileDto productFile) {
        if (productFile == null)
            return;

        // if current ProductFileDto is setting primary_flag = 1 then execute update for all another
        if (Enums.Status.PRIMARY_FLAG_ON.getStatus() == productFile.getPrimaryFlag())
            productDao.resetOthersPrimaryFlag(productFile);
    }

    /**
     * Method use to get default {@link ProductDto}.
     * <pre>
     * <code>1.</code>{@link ProductDto} if only one item was set highlight_flag = 1 then got it.
     * <code>2.</code>{@link ProductDto} if more than one item was set highlight_flag = 1 then got single item has
     * latest
     * updated_date in theirs.
     * <code>3.</code>{@link ProductDto} if there was not item was set highlight_flag = 1 then got single item has
     * latest
     * updated_date in theirs.
     * </pre>
     * updated_date if not item was set highlight_flag = 1
     *
     * @param dealId
     * @return
     */
    @Override
    public ProductDto sv00831GetDefaultProduct(final Integer dealId) {
        if (dealId == null)
            return null;

        // filter by list is on (highlight_flag = 1)
        List<ProductDto> selectedProducts = sv00832GetProductsOrderByUpdatedDate(dealId, false, Enums.Status
                .HIGHLIGHT_FLAG_ON.getStatus());

        // if there was no item has highlight_flag = 1 then get all
        if (CollectionUtil.isEmpty(selectedProducts))
            selectedProducts = sv00832GetProductsOrderByUpdatedDate(dealId, false, Enums.Status
                    .HIGHLIGHT_FLAG_OFF.getStatus());

        // select first item after sorted and filter by condition
        if (CollectionUtil.isNotEmpty(selectedProducts))
            return selectedProducts.get(0);

        return null;
    }

    @Override
    public List<ProductDto> sv00832GetProductsOrderByUpdatedDate(Integer dealId, boolean isAsc, int highlightFlag) {
        if (dealId == null) return null;

        // get list deal products by deal id
        List<DealProductDto> dealProducts = dealProductService.sv01401GetDealProductByDealId(dealId);
        if (CollectionUtil.isEmpty(dealProducts)) return null;

        List<DealProductDto> highlightDealProducts = null;
        if (Enums.Status.HIGHLIGHT_FLAG_ON.getStatus() == highlightFlag) {
            // filter by list is on (highlight_flag = 1)
            highlightDealProducts = dealProducts.stream().filter(dealProduct -> dealProduct
                    .getHighlightFlag() == Enums.Status.HIGHLIGHT_FLAG_ON.getStatus()).collect(Collectors.toList());
        } else {
            // If there is no item was (highlight_flag = 1) then highlight list is set equals to default list.
            highlightDealProducts = Lists.newArrayList(dealProducts);
        }

        List<ProductDto> selectedProducts = Lists.newArrayList();
        highlightDealProducts.forEach(dp -> {
            ProductDto product = sv00810GetProductById(dp.getProductId());
            if (product != null)
                selectedProducts.add(product);
        });

        // Always order by updated_date as descending order.
        Collections.sort(selectedProducts, new Comparator<ProductDto>() {
            @Override
            public int compare(final ProductDto o1, final ProductDto o2) {
                if (isAsc) // ascending order by updated_date
                    return o1.getUpdatedDate().compareTo(o2.getUpdatedDate());
                else // descending order by updated_date
                    return o2.getUpdatedDate().compareTo(o1.getUpdatedDate());
            }
        });

        return selectedProducts;
    }

    /**
     * Find all {@link ProductDto} by current list product ids.
     *
     * @param productIds list selected product ids
     * @return list {@link ProductDto}
     */
    @Override
    public List<ProductDto> sv00834GetProductsByIds(List<Integer> productIds) {
        return productDao.getProductsByIds(productIds);
    }

    @Override
    public void sv00837RequestOrder(final OrderDto orderDto, final ShippingDestinationDto shippingDto, final Integer
            saveToDennoFlag, final Integer defaultFlag, List<Integer> productIds) {
        // always create new order item
        List<OrderItemDto> orderItems = orderDto.getOrderItems();

        orderItems.stream().forEach(ot -> {
            ot.setCreatedDate(DateTime.now());
            orderItemDao.update(ot);
        });


        // update shipping destination
        // 新しい納入先場所として追加 checkbox is checked then create new shipping destination
        if (saveToDennoFlag == 1) {
            // check memo 1/2
            String memo = shippingDto.getMemo1();
            if (memo.length() > 30) {
                shippingDto.setMemo1(memo.substring(0, 30));
                shippingDto.setMemo2(memo.substring(30));
            }
            shippingDestinationDao.create(shippingDto);
        }

        // finally, update 'requestProductionFlag'
        productIds.stream().forEach(productId -> {
            sv00835UpdateStatusProduct(Constants.REQUEST_PRODUCTION, productId);
        });

        DealDto dealDto = dealDao.find(orderDto.getDealId());
        if (dealDto.getDealStatus().equals(Enums.DealStatus.ORDER_CONFIRMATION.getStatus())) {
            //1.1 update type deal  -> deal repeat
            dealDto.setDealType(Constants.DEAL_COPY);
        }
        //1.2 update deal status
        dealDto.setDealStatus(Enums.DealStatus.ORDER_CONFIRMATION.getStatus());
        //1.5 update data deal
        dealDao.update(dealDto);
    }

    @Override
    public void sv00835UpdateStatusProduct(Integer typeStatus, Integer productId) {
        //1. get product
        ProductDto productDto = productDao.find(productId);
        //2. update typeStatus by status = 1
        // typeStatus == 0 -> request product design
        // typeStatus ==1 -> request production
        if (typeStatus == Constants.REQUEST_DESIGN && productDto.getRequestDesignFlag() == null) {
            productDto.setRequestDesignFlag(0);
        } else if (typeStatus == Constants.REQUEST_PRODUCTION) {
            productDto.setRequestProductionFlag(1);
        }
        //3. update product
        productDao.update(productDto);
    }

    @Override
    public String sv00836GetMemoProduct(final ProductDto productDto) {
        //Change belong to #1888
        return FormatUtil.concatItem(Constants.COMMA, productDto.getMemo1(), productDto.getMemo2(), productDto.getMemo3());
    }

    @Override
    public Long getTotalRecords() {
        return productDao.getTotalRecords();
    }

    @Override
    public ProductCommonFeeDto sv00837CreateProductCommonFee(ProductCommonFeeDto productCommonFeeDto) {
        return productCommonFeeDao.create(productCommonFeeDto);
    }

    @Override
    public List<ProductDto> sv00838GetProductsInDealProduct(int startPosition, int maxResult) {
        return productDao.getProductsInDealProduct(startPosition, maxResult);
    }

    @Override
    public void sv00840UpdateRequestLot(final Integer productId, final Integer newRequestLot) {
        ProductDto productDto = productDao.find(productId);
        productDto.setRequestLot(newRequestLot);
        productDao.update(productDto);
    }

    @Override
    public ProductFileDto sv00841GetProductFile(final Integer productId, final Integer fileId) {
        return productFileDao.getProductFile(productId, fileId);
    }

    @Override
    public void sv00838UpdateDesignRequested(Integer productId, Integer requestLot) {
        ProductDto productDto = productDao.find(productId);
        productDto.setRequestDesignFlag(Enums.ProductStatus.DESIGN_REQUEST_IN_PROGRESS.getStatus());
        productDto.setRequestLot(requestLot);

        productDao.update(productDto);
    }

    @Override
    public  MstWoodenDto sv00843getWoodenByProductId(String woodenCode) {
        return productDao.getWoodenByProductid(woodenCode);
    }


    @Override
    public Integer sv00841coutGoodenCodeCommon(String woodenCode) {
        return productDao.coutGoodenCodeCommon(woodenCode);
    }

    @Override
    public boolean needsToDieCutting(@Nonnull ProductDto product) {
        ProductType productType = ProductType.valueOf(product.getProductType());
        CartonType cartonType = CartonType.valueOf(product.getCartonShippingType());
        if (productType == ProductType.PAPER
                || productType == ProductType.CARTON && cartonType == CartonType.CARTON_SHEET) {
            // 紙器, 美粧, 片段, 段ボール(A式以外の場合)
            return Integer.valueOf(1/*打抜きあり*/).equals(product.getDieCuttingFlag());
        }

        return false;
    }


    @Override
    public boolean hasWooden(@Nonnull ProductDto product) {
        return !StringUtils.isEmpty(product.getWoodenCode()) || !StringUtils.isEmpty(product.getWoodenCode2());
    }

    @Override
    public DateTime woodenExpireDate(@Nonnull ProductDto product) {
        if (!hasWooden(product)) {
            return null;                // 木型なし
        }

        DateTime expireDate1 = null;            // 木型 1 の有効期限
        DateTime expireDate2 = null;            // 木型 2 の有効期限

        // 木型 1 の有効期限を取得
        if (!StringUtils.isEmpty(product.getWoodenCode())) {
            expireDate1 = woodenExpireDateByWoodenCode(product.getWoodenCode());
            if (expireDate1 == null) {
                return null;    // 木型があるが、情報取得ができない (or 利用実績がない) ため null 応答
            }
        }

        // 木型 2 の有効期限を取得
        if (!StringUtils.isEmpty(product.getWoodenCode2())) {
            expireDate2 = woodenExpireDateByWoodenCode(product.getWoodenCode2());
            if (expireDate2 == null) {
                return null;    // 木型があるが、情報取得ができない (or 利用実績がない) ため null 応答
            }
        }

        // 木型 1, 2 の有効期限で近い方を応答する
        return ObjectUtils.min(expireDate1, expireDate2);
    }

    /**
     * 木型の有効期限を取得
     *
     * @param code 木型コード
     * @return 有効期限 (null: 有効期限取得できず or 利用実績なし)
     */
    private DateTime woodenExpireDateByWoodenCode(String code) {
        MstWoodenDto mstWoodenDto = woodenService.sv01102GetMstWoodenByCode(code);
        return mstWoodenDto != null ? mstWoodenDto.getWoodenExpiredDate() : null;
    }

}
