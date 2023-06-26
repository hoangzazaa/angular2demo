package vn.vnext.sefuri.sf.service;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.common.Enums;
import vn.vnext.sefuri.sf.dto.*;
import vn.vnext.sefuri.sf.service.impl.SV008ProductServiceImpl;

import java.util.List;

import javax.annotation.Nonnull;

import org.joda.time.DateTime;

/**
 * Created by DungTQ on 1/4/2017.
 */

@ImplementedBy(SV008ProductServiceImpl.class)
public interface SV008ProductService {

    /**
     * Update product
     *
     * @param productDto
     * @return ProductDto
     */
    ProductDto sv00803UpdateProduct(ProductDto productDto);

    /**
     * Update product
     *
     * @param productDto
     * @return ProductDto
     */
    ProductDto sv00823UpdateProductAll(ProductDto productDto, List<ProductOutputDto> productOutputDtos);

    /**
     * Create product file
     *
     * @param productFileDto
     * @param fileCode
     * @return ProductFileDto
     */
    ProductFileDto sv00805CreateProductFile(ProductFileDto productFileDto, String fileCode);

    /**
     * Update product file
     *
     * @param productFileDto
     * @return ProductFileDto
     */
    ProductFileDto sv00806UpdateProductFile(ProductFileDto productFileDto);

    /**
     * Delete product file
     *
     * @param productFileId
     * @return Boolean
     */
    Boolean sv00807DeleteProductFile(Integer productFileId);

    /**
     * Update product output
     *
     * @param productOutputDto
     */
    void sv00808UpdateProductOutput(ProductOutputDto productOutputDto);

    /**
     * Update product common fee
     *
     * @param productCommonFeeDto
     */
    void sv00809UpdateProductCommonFee(ProductCommonFeeDto productCommonFeeDto);

    /**
     * Get product output by dealProductId
     *
     * @param dealProductId
     * @return List<ProductOutputDto>
     */
    List<ProductOutputDto> sv00812GetProductOutputByDealProductId(Integer dealProductId);

    /**
     * Get product common fee by productId
     *
     * @param productId
     * @return ProductCommonFeeDto
     */
    ProductCommonFeeDto sv00813getProductCommonFreeByProductId(Integer productId);

    /**
     * get ProductDto by productId
     * get ProductCommonFeeDto by productId
     *
     * @param productId
     * @return ProductDto
     */
    ProductDto sv00810GetProductById(Integer productId);

    /**
     * Get product file by productCode
     *
     * @param productId
     * @return List<ProductFileDto>
     */
    List<ProductFileDto> sv00811GetProductFileByProductId(Integer productId);

    ProductOutputDto sv00814GetProductOutputById(Integer productOutputId);

    DrawingImageDto sv00815CreateDrawingImage(DrawingImageDto drawingImageDto);

    List<DrawingImageDto> sv00816GetListDrawingImage(Integer productId);

    List<ProductFileDto> sv00820GetProductFileByModuleTypeAndProductId(Integer productId, Enums.ModuleType moduleType);

    int sv00821DeleteDrawingImageByProductId(Integer productId);

    List<ProductOutputDto> sv00822GetProductOutputByDealProductId(Integer dealProductId);

    /**
     * Update product
     *
     * @param productDto
     * @return ProductDto
     */
    ProductDto sv00825UpdateProductInput(ProductDto productDto);

    /**
     * Update product imposition only
     *
     * @param productDto
     * @return ProductDto
     */
    ProductDto sv00826UpdateProductImposition(ProductDto productDto);

    ProductOutputDto sv00827GetProductOutPutSelected(Integer dealProductId);

    List<ProductDto> sv00828GetProductsByDealIds(List<Integer> dealIds);

    /**
     * Method use to get single product file by latest update_date.
     *
     * @param productId the product id
     * @return {@link ProductFileDto}
     */
    ProductFileDto sv00829GetPrimaryProductFile(Integer productId);

    /**
     * Method use to set all primary_flag to 0 if current {@link ProductFileDto} was set primary_flag = 1, exclude
     * itself.
     *
     * @param productFile the current {@link ProductFileDto} will be ignore
     */
    void sv00830ResetPrimaryFlagExceptCurrent(ProductFileDto productFile);

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
    ProductDto sv00831GetDefaultProduct(Integer dealId);

    /**
     * Order list product belong to highlight_flag is set or not by updated_date with order flag.
     *
     * @param dealId        the current deal id
     * @param isAsc         the order flag
     * @param highlightFlag the condition to get by highlight_flag set on|off
     * @return order list <code>isAsc - true then ascending, else descending</code>
     */
    List<ProductDto> sv00832GetProductsOrderByUpdatedDate(Integer dealId, boolean isAsc, int highlightFlag);

    /**
     * Find all {@link ProductDto} by current list product ids.
     *
     * @param productIds list selected product ids
     * @return list {@link ProductDto}
     */
    List<ProductDto> sv00834GetProductsByIds(List<Integer> productIds);

    /**
     * Method use to create request order.
     *
     * @param orderDto
     * @param shippingDto
     * @return
     */
    void sv00837RequestOrder(OrderDto orderDto, ShippingDestinationDto shippingDto, Integer saveToDennoFlag, Integer
            defaultFlag, List<Integer> productIds);

    void sv00835UpdateStatusProduct(Integer updateStatus, Integer productId);

    String sv00836GetMemoProduct(ProductDto productDto);

    Long getTotalRecords();

    ProductCommonFeeDto sv00837CreateProductCommonFee(ProductCommonFeeDto productCommonFeeDto);

    void sv00838UpdateDesignRequested(Integer productId, Integer requestLot);

    List<ProductDto> sv00838GetProductsInDealProduct(int startPosition, int maxResult);

    void sv00840UpdateRequestLot(Integer productId, Integer newRequestLot);

    ProductFileDto sv00841GetProductFile(Integer productId, Integer fileId);

    Integer sv00841coutGoodenCodeCommon(String woodenCode);

    MstWoodenDto sv00843getWoodenByProductId(String woodenCode);

    /**
     * 商品が打ち抜き工程有りかどうか判定する
     *
     * @param product 判定対象商品
     * @return true: 打抜き工程有り, false: 打抜き工程なし
     */
    boolean needsToDieCutting(@Nonnull ProductDto product);

    /**
     * 商品が木型を持つかどうか判定する
     *
     * @param product 判定対象商品
     * @return true: 木型有り, false: 木型なし
     */
    boolean hasWooden(@Nonnull ProductDto product);

    /**
     * 木型の有効期限を取得する
     *
     * @param product 判定対象商品
     * @return 有効期限 (null: 情報取得できず)
     */
    DateTime woodenExpireDate(@Nonnull ProductDto product);

}
