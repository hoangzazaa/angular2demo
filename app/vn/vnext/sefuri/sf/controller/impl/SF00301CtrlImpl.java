package vn.vnext.sefuri.sf.controller.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.common.base.Strings;
import com.google.common.collect.Lists;

import play.mvc.Result;
import vn.vnext.sefuri.sf.common.CommonCtrl;
import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.common.Enums;
import vn.vnext.sefuri.sf.common.MessageCode;
import vn.vnext.sefuri.sf.controller.SF00301Ctrl;
import vn.vnext.sefuri.sf.dao.CommentFileDao;
import vn.vnext.sefuri.sf.dto.ChecksheetDto;
import vn.vnext.sefuri.sf.dto.CommentDto;
import vn.vnext.sefuri.sf.dto.CommentFileDto;
import vn.vnext.sefuri.sf.dto.CurrentStockDto;
import vn.vnext.sefuri.sf.dto.CustomerDto;
import vn.vnext.sefuri.sf.dto.DealDto;
import vn.vnext.sefuri.sf.dto.DealFileDto;
import vn.vnext.sefuri.sf.dto.DealProductDto;
import vn.vnext.sefuri.sf.dto.DepartmentDto;
import vn.vnext.sefuri.sf.dto.FileDto;
import vn.vnext.sefuri.sf.dto.MstLaminationDto;
import vn.vnext.sefuri.sf.dto.MstPaperDto;
import vn.vnext.sefuri.sf.dto.MstWoodenDto;
import vn.vnext.sefuri.sf.dto.MyboxItemDto;
import vn.vnext.sefuri.sf.dto.OrderDto;
import vn.vnext.sefuri.sf.dto.OrderItemDto;
import vn.vnext.sefuri.sf.dto.ProductDto;
import vn.vnext.sefuri.sf.dto.ProductFileDto;
import vn.vnext.sefuri.sf.dto.ProductOutputDto;
import vn.vnext.sefuri.sf.dto.QuotationDto;
import vn.vnext.sefuri.sf.dto.QuotationItemDto;
import vn.vnext.sefuri.sf.dto.UserDto;
import vn.vnext.sefuri.sf.helper.UrlHelper;
import vn.vnext.sefuri.sf.json.SF00301.model.SF00301_CheckSheetJson;
import vn.vnext.sefuri.sf.json.SF00301.model.SF00301_CommentFileJson;
import vn.vnext.sefuri.sf.json.SF00301.model.SF00301_CommentJson;
import vn.vnext.sefuri.sf.json.SF00301.model.SF00301_CustomerJson;
import vn.vnext.sefuri.sf.json.SF00301.model.SF00301_DealFileJson;
import vn.vnext.sefuri.sf.json.SF00301.model.SF00301_DealJson;
import vn.vnext.sefuri.sf.json.SF00301.model.SF00301_DepartmentJson;
import vn.vnext.sefuri.sf.json.SF00301.model.SF00301_OrderItemJson;
import vn.vnext.sefuri.sf.json.SF00301.model.SF00301_ProductFileJson;
import vn.vnext.sefuri.sf.json.SF00301.model.SF00301_ProductJson;
import vn.vnext.sefuri.sf.json.SF00301.model.SF00301_QuotationJson;
import vn.vnext.sefuri.sf.json.SF00301.model.SF00301_UserJson;
import vn.vnext.sefuri.sf.json.SF00301.request.SF0030102Req;
import vn.vnext.sefuri.sf.json.SF00301.request.SF0030103Req;
import vn.vnext.sefuri.sf.json.SF00301.request.SF0030104Req;
import vn.vnext.sefuri.sf.json.SF00301.request.SF0030108Req;
import vn.vnext.sefuri.sf.json.SF00301.request.SF0030109Req;
import vn.vnext.sefuri.sf.json.SF00301.request.SF0030110Req;
import vn.vnext.sefuri.sf.json.SF00301.request.SF0030116Req;
import vn.vnext.sefuri.sf.json.SF00301.request.SF0030117Req;
import vn.vnext.sefuri.sf.json.SF00301.request.SF0030118Req;
import vn.vnext.sefuri.sf.json.SF00301.request.SF0030119Req;
import vn.vnext.sefuri.sf.json.SF00301.request.SF0030120Req;
import vn.vnext.sefuri.sf.json.SF00301.request.SF0030121Req;
import vn.vnext.sefuri.sf.json.SF00301.request.SF0030122Req;
import vn.vnext.sefuri.sf.json.SF00301.response.SF0030101Res;
import vn.vnext.sefuri.sf.json.SF00301.response.SF0030103Res;
import vn.vnext.sefuri.sf.json.SF00301.response.SF0030104Res;
import vn.vnext.sefuri.sf.json.SF00301.response.SF0030105Res;
import vn.vnext.sefuri.sf.json.SF00301.response.SF0030108Res;
import vn.vnext.sefuri.sf.json.SF00301.response.SF0030109Res;
import vn.vnext.sefuri.sf.json.SF00301.response.SF0030110Res;
import vn.vnext.sefuri.sf.json.SF00301.response.SF0030116Res;
import vn.vnext.sefuri.sf.json.SF00301.response.SF0030117Res;
import vn.vnext.sefuri.sf.json.SF00301.response.SF0030118Res;
import vn.vnext.sefuri.sf.json.SF00301.response.SF0030119Res;
import vn.vnext.sefuri.sf.json.SF00301.response.SF0030120Res;
import vn.vnext.sefuri.sf.json.SF00301.response.SF0030122Res;
import vn.vnext.sefuri.sf.json.core.MstLaminationJson;
import vn.vnext.sefuri.sf.json.core.MstPaperJson;
import vn.vnext.sefuri.sf.json.core.MyboxItemJson;
import vn.vnext.sefuri.sf.json.request.SF0030105Req;
import vn.vnext.sefuri.sf.json.request.SF0030106Req;
import vn.vnext.sefuri.sf.json.request.SF0030107Req;
import vn.vnext.sefuri.sf.json.request.SF0030112Req;
import vn.vnext.sefuri.sf.json.request.SF0030113Req;
import vn.vnext.sefuri.sf.json.request.SF0030114Req;
import vn.vnext.sefuri.sf.json.request.SF0030115Req;
import vn.vnext.sefuri.sf.json.response.SF0030113Res;
import vn.vnext.sefuri.sf.json.response.SF0030115Res;
import vn.vnext.sefuri.sf.module.export.ReportGenerator;
import vn.vnext.sefuri.sf.service.SV001AuthService;
import vn.vnext.sefuri.sf.service.SV002UserService;
import vn.vnext.sefuri.sf.service.SV003DealService;
import vn.vnext.sefuri.sf.service.SV004QuotationService;
import vn.vnext.sefuri.sf.service.SV005CustomerService;
import vn.vnext.sefuri.sf.service.SV006FileService;
import vn.vnext.sefuri.sf.service.SV007MyboxService;
import vn.vnext.sefuri.sf.service.SV008ProductService;
import vn.vnext.sefuri.sf.service.SV009OrderService;
import vn.vnext.sefuri.sf.service.SV011WoodenService;
import vn.vnext.sefuri.sf.service.SV013MstDataService;
import vn.vnext.sefuri.sf.service.SV014DealProductService;
import vn.vnext.sefuri.sf.service.SV015DepartmentService;
import vn.vnext.sefuri.sf.service.SV017MailService;
import vn.vnext.sefuri.sf.util.CollectionUtil;
import vn.vnext.sefuri.sf.util.DateUtil;
import vn.vnext.sefuri.sf.util.MailUtil;
import vn.vnext.sefuri.sf.util.MessagesUtil;

public class SF00301CtrlImpl extends CommonCtrl implements SF00301Ctrl {
    @Inject
    private SV003DealService sv003DealService;

    @Inject
    private SV004QuotationService sv004QuotationService;

    @Inject
    private SV005CustomerService sv005CustomerService;

    @Inject
    private SV006FileService sv006FileService;

    @Inject
    private SV007MyboxService sv007MyboxService;

    @Inject
    private SV008ProductService sv008ProductService;

    @Inject
    private SV009OrderService sv009OrderService;

    @Inject
    private SV011WoodenService sv011WoodenService;

    @Inject
    private SV014DealProductService sv0014DealProductService;

    @Inject
    private SV015DepartmentService sv015DepartmentService;

    @Inject
    private SV002UserService sv002UserService;

    @Inject
    private SV013MstDataService sv013MstDataService;

    @Inject
    private ReportGenerator reportGeneration;

    @Inject
    private SV013MstDataService mstDataService;

    @Inject
    private SV001AuthService authService;

    @Inject
    private SV017MailService sv017MailService;

    @Inject
    private CommentFileDao CommentFileDao;

    private Logger logger = LoggerFactory.getLogger(SF00301CtrlImpl.class);

    @Override
    public Result sf0030101Init(String dealCode) {
        SF0030101Res res = new SF0030101Res();

        List<SF00301_DepartmentJson> departmentJsons = sv015DepartmentService
                .sv01510FindAllSaleDept().stream()
                .map(departmentDto -> {
                    SF00301_DepartmentJson departmentJson = new SF00301_DepartmentJson();
                    departmentJson.setModel(departmentDto);
                    List<SF00301_UserJson> saleJsons = sv002UserService
                            .sv00205GetUsersByDepartmentId(departmentDto.getId()).stream()
                            .map(sale -> {
                                SF00301_UserJson userJson = new SF00301_UserJson();
                                userJson.setModel(sale);
                                return userJson;
                            }).collect(Collectors.toList());

                    departmentJson.setUsers(saleJsons);
                    return departmentJson;
                })
                .collect(Collectors.toList());
        res.setDepartments(departmentJsons);

        UserDto loggingUser = sv001AuthService.getCurrentUser();
        SF00301_UserJson loggingUserJson = new SF00301_UserJson();
        loggingUserJson.setModel(loggingUser);

        DepartmentDto loggingUserDepartment = sv015DepartmentService.sv01509GetDepartmentById(sv001AuthService
                .getCurrentUser().getDepartmentId());
        SF00301_DepartmentJson loggingUserDepartmentJson = new SF00301_DepartmentJson();
        loggingUserDepartmentJson.setModel(loggingUserDepartment);
        loggingUserJson.setDepartment(loggingUserDepartmentJson);

        res.setUser(loggingUserJson);

        if (!Strings.isNullOrEmpty(dealCode)) {
            DealDto deal = sv003DealService.sv00306GetDealByDealCode(dealCode);

            //1. break if deal not found and return response error
            if (deal == null)
                return responseError(MessageCode.SF00300.ERR001);

            //2. init json deal data and parse to response
            SF00301_DealJson dealJson = new SF00301_DealJson();
            dealJson.setModel(deal);
            res.setDeal(dealJson);

            //Check deal is bookmark or not and parse to response
            MyboxItemDto myboxItem = sv007MyboxService.sv00703GetMyboxItemByDealId(deal.getId(), getUserId());
            if (myboxItem != null)
                dealJson.setInMybox(true);
            else
                dealJson.setInMybox(false);

            //3. get saler data and parse to response
            UserDto saler = sv002UserService.sv00204GetUserById(deal.getSalesId());
            if (saler != null) {
                SF00301_UserJson salerJson = new SF00301_UserJson();
                salerJson.setModel(saler);
                // check department
                DepartmentDto department = sv015DepartmentService.sv01509GetDepartmentById(saler.getDepartmentId());
                if (department != null) {
                    SF00301_DepartmentJson departmentJson = new SF00301_DepartmentJson();
                    departmentJson.setModel(department);
                    salerJson.setDepartment(departmentJson);
                }

                res.setSaler(salerJson);
            }

            //4. get customer data and parse to response
            CustomerDto customer = sv005CustomerService.sv00501GetCustomerByCustomerId(deal.getCustomerId());
            if (customer != null) {
                SF00301_CustomerJson customerJson = new SF00301_CustomerJson();
                customerJson.setModel(customer);
                res.setCustomer(customerJson);
            }

            //6. fill check-sheet data and parse to response
            List<ChecksheetDto> checksheets = sv003DealService.sv00326GetCheckSheetsByDealId(deal.getId());
            if (CollectionUtil.isNotEmpty(checksheets)) {
                List<SF00301_CheckSheetJson> checkSheetJsons = Lists.newArrayList();
                checksheets.forEach(dto -> {
                    SF00301_CheckSheetJson checkSheetJson = new SF00301_CheckSheetJson();
                    checkSheetJson.setModel(dto);

                    checkSheetJsons.add(checkSheetJson);
                });

                res.setChecksheets(checkSheetJsons);
            }

            //6. fill deal files data and parse to response
            List<DealFileDto> dealFiles = sv003DealService.sv00313GetDealFileByDealId(deal.getId());
            if (CollectionUtil.isNotEmpty(dealFiles)) {
                List<SF00301_DealFileJson> dealFileJsons = Lists.newArrayList();
                dealFiles.forEach(dto -> {
                    SF00301_DealFileJson dealFileJson = new SF00301_DealFileJson();
                    dealFileJson.setModel(dto);

                    // get file and parse srcImage
                    FileDto fileDto = sv006FileService.sv00609GetFileInfo(dto.getFileId());
                    dealFileJson.setSrcImg(sv006FileService.sv00618GetThumbnail(fileDto));


                    dealFileJsons.add(dealFileJson);
                });

                res.setDealFiles(dealFileJsons);
            }

            //7. fill product data and parse to response
            List<SF00301_ProductJson> productJsons = getProductJsons(deal);
            res.setProducts(productJsons);

            //8. fill quotation data and parse to response
            List<SF00301_QuotationJson> quotationJsons = getQuotationJsons(deal);
            res.setQuotations(quotationJsons);

            //9. fill product file data and parse to response
            List<SF00301_ProductFileJson> productFileJsons = getProductFileJsons(deal);
            res.setProductFiles(productFileJsons);

            //10. fill comment data and parse to response
            List<CommentDto> comments = sv003DealService.sv00315ShowMoreComment(deal.getId(), 0);
            List<SF00301_CommentJson> commentJsons = comments
                    .stream()
                    .map(comment -> {
                        UserDto user = sv002UserService.sv00204GetUserById(comment.getUserId());
                        DepartmentDto department = sv015DepartmentService.sv01509GetDepartmentById(user
                                .getDepartmentId());

                        SF00301_CommentJson json = new SF00301_CommentJson();
                        json.setModel(comment);
                        json.setValue(MailUtil.toHTMLMail(comment.getValue()));
                        json.setUsername(user.getUsername());
                        json.setDepartmentName(department.getDepartment());
                        json.setCommentFiles(this.getCommentFileJsonByCommentId(comment.getId()));
                        return json;
                    })
                    .collect(Collectors.toList());
            res.setComments(commentJsons);

            //11. get stocks infomation
            res.setOrderItems(getStocks(deal));

            //12 get mst lamination
            List<MstLaminationDto> laminationDtos = mstDataService.sv01332GetMasterLamination();
            if (CollectionUtil.isNotEmpty(laminationDtos)) {
                List<MstLaminationJson> laminationJsons = laminationDtos.stream().map(lamination -> {
                    MstLaminationJson mstJson = new MstLaminationJson();

                    mstJson.setData(lamination);

                    return mstJson;
                }).collect(Collectors.toList());
                res.setLaminationJsons(laminationJsons);
            }

            // 13 Get total of comments
            Long totalRows = sv003DealService.sv003034GetTotalCommentsByDealId(deal.getId());
            res.setNumberOfComment(Integer.valueOf(totalRows + ""));

            // 14 関連案件 (元案件、リピート案件を取得)
            List<DealDto> relatedDeals = sv003DealService.findReleatedDeals(deal);
            if (relatedDeals.size() > 1) {
                // リピート案件がある場合のみ応答電文に案件情報を含める
                res.setRelatedDeals(relatedDeals
                        .stream()
                        .map(relatedDeal -> {
                            SF00301_DealJson relatedDealJson = new SF00301_DealJson();
                            relatedDealJson.setModel(relatedDeal);

                            // 注文日を記入する
                            relatedDealJson.setOrderDate(relatedDeal.getOrder().getCreatedDate());

                            return relatedDealJson;
                        })
                        .collect(Collectors.toList()));
            }
        }

        return responseJson(res, MessageCode.SF00301.INF001);
    }

    private List<SF00301_ProductFileJson> getProductFileJsons(final DealDto deal) {
        List<DealProductDto> dealProducts = sv0014DealProductService.sv01401GetDealProductByDealId(deal.getId());
        if (CollectionUtil.isEmpty(dealProducts)) return Collections.emptyList();

        List<SF00301_ProductFileJson> productFileJsons = Lists.newArrayList();
        dealProducts.forEach(dealProduct -> {
            // get product by productId
            ProductDto product = sv008ProductService.sv00810GetProductById(dealProduct.getProductId());
            if (product != null) {
                //get list ProductFile
                List<ProductFileDto> productFiles = sv003DealService.sv00312GetProductFileByProductId(product.getId());
                if (CollectionUtil.isNotEmpty(productFiles)) {
                    productFiles.forEach(productFile -> {
                        SF00301_ProductFileJson productFileJson = new SF00301_ProductFileJson();
                        ProductDto productDto = sv008ProductService.sv00810GetProductById(productFile.getProductId());
                        productFileJson.setModel(productFile);
                        // set productDto to productFile => productCode
                        productFileJson.setProductCode(productDto.getProductCode());
                        // set productName
                        productFileJson.setProductName(productDto.getProductName());

                        // get file and parse srcImage
                        FileDto fileDto = sv006FileService.sv00609GetFileInfo(productFile.getFileId());
                        productFileJson.setSrcImg(sv006FileService.sv00618GetThumbnail(fileDto));

                        productFileJsons.add(productFileJson);
                    });
                }
            }
        });

        return productFileJsons;
    }

    private List<SF00301_QuotationJson> getQuotationJsons(final DealDto deal) {
        List<QuotationDto> quotations = sv004QuotationService.sv00402GetQuotationsByDealId(deal.getId());

        if (CollectionUtil.isEmpty(quotations))
            return Collections.emptyList();

        List<SF00301_QuotationJson> quotationJsons = new ArrayList<>();

        for (QuotationDto quotation : quotations) {
            SF00301_QuotationJson quotationJson = new SF00301_QuotationJson();
            quotationJson.setModel(quotation);

            try {
                String pngUrl = sv004QuotationService.sv00411GetQuotationThumbnail(quotation.getQuotationCode());
                quotationJson.setSrcImg(pngUrl);
            } catch (IOException e) {
                logger.error("getQuotationJsons: could not get export file path!");
            }

            QuotationItemDto maxQuantityItem = sv004QuotationService
                    .sv00401GetQuotationItemsByQuotationId(quotation.getId())
                    .stream()
                    .filter(item -> item.getParentId() == null)
                    .reduce((item1, item2) -> {
                        if (item1.getQuantity() == null || item2.getQuantity() == null) {
                            return item2;
                        }
                        return item1.getQuantity().compareTo(item2.getQuantity()) == 1 ? item1 : item2;
                    })
                    .orElse(null);

            if (maxQuantityItem != null && maxQuantityItem.getQuantity() != null) {
                quotationJson.setLot(maxQuantityItem.getQuantity().intValue());
                quotationJson.setUnitPrice(maxQuantityItem.getSubmittedPrice());
                quotationJson.setTotalCost(maxQuantityItem.getTotal());
            }

            quotationJsons.add(quotationJson);
        }

        return quotationJsons;
    }

    private List<SF00301_ProductJson> getProductJsons(final DealDto deal) {
        List<DealProductDto> dealProducts = sv0014DealProductService.sv01401GetDealProductByDealId(deal.getId());
        if (CollectionUtil.isEmpty(dealProducts)) return Collections.emptyList();

        List<SF00301_ProductJson> productJsons = Lists.newArrayList();
        dealProducts.forEach(dto -> {
            // get product by productId
            ProductDto product = sv008ProductService.sv00810GetProductById(dto.getProductId());
            if (product != null) {
                SF00301_ProductJson productJson = new SF00301_ProductJson();
                productJson.setData(product);
                productJson.setMemo(sv008ProductService.sv00836GetMemoProduct(product));
                productJson.setUpdatedDate(product.getUpdatedDate());
                productJson.setDealProductId(dto.getId());
                productJson.setHighlightFlag(dto.getHighlightFlag());
                productJson.setProductType(product.getProductType());
                productJson.setShapeId(product.getShapeId());

                MstPaperJson mstPaperJson = new MstPaperJson();
                if (product.getPaperId() != null && product.getPaperId() != 0) {
                    MstPaperDto mstPaperDto = mstDataService.sv01337GetMstPaperByIdAndSheetSizeId(product.getPaperId(), product.getSheetSizeId());
                    // parse mst paper
                    mstPaperJson.setData(mstPaperDto);
                    productJson.setPaper(mstPaperJson);
                }

                ProductFileDto productFile = sv008ProductService.sv00829GetPrimaryProductFile(product.getId());
                if (productFile != null) {
                    FileDto fileDto = sv006FileService.sv00609GetFileInfo(productFile.getFileId());
                    productJson.setSrcImg(sv006FileService.sv00618GetThumbnail(fileDto));
                }

                // get woorden data
                if (product.getWoodenCode() != null) {
                    MstWoodenDto woodenDto = sv011WoodenService.sv01102GetMstWoodenByCode(product.getWoodenCode());

                    if (woodenDto != null) {
                        productJson.setWoodenExpiredDate(woodenDto.getWoodenExpiredDate());
                        productJson.setWoodenTotalNumber(woodenDto.getWoodenTotalNumber());
                    }
                }

                //set Lot+Estimated Unit Price
                ProductOutputDto productOutputDto = sv008ProductService.sv00827GetProductOutPutSelected(dto.getId());
                if (productOutputDto != null) {
                    productJson.setLot(productOutputDto.getLot());
                    productJson.setEstimatedUnitPrice(productOutputDto.getEstimatedUnitPrice());
                }

                Integer quantity = null;
                //set Lot+Estimated Unit Price
                ProductOutputDto productOutPutSelected = sv008ProductService.sv00827GetProductOutPutSelected(dto.getId());
                if (productOutPutSelected != null) {
                    quantity = productOutPutSelected.getLot();
                }

                //set quantity Stock
                //26-Apr-17: replace check 'dennoProductCode' by 'itemCode'
                if (product.getItemCode() != null) {
                    CurrentStockDto currentStock = sv009OrderService.sv00904GetCurrentStock(product.getItemCode());
                    if (currentStock != null)
                        quantity = currentStock.getTotal();
                }

                productJson.setQuantityStock(quantity);

                productJsons.add(productJson);
            }
        });

        return productJsons;
    }

    private List<SF00301_OrderItemJson> getStocks(final DealDto deal) {
        List<OrderItemDto> orderItemDtos = sv009OrderService.sv00901GetOrderItemByDealId(deal.getId());
        List<SF00301_OrderItemJson> orderItemJsons = new ArrayList<>();
        if (CollectionUtil.isNotEmpty(orderItemDtos)) {
            for (OrderItemDto orderItemDto : orderItemDtos) {
                SF00301_OrderItemJson orderItemJson = new SF00301_OrderItemJson();
                orderItemJson.setData(orderItemDto);
                //set orderJson
                if (orderItemDto.getOrderId() != null) {
                    OrderDto orderDto = sv009OrderService.sv00902GetOrderById(orderItemDto.getOrderId());
                    orderItemJson.setUpdatedDate(orderDto.getUpdatedDate());
                }
                orderItemJsons.add(orderItemJson);
            }
        }
        return orderItemJsons;
    }

    @Override
    public Result sf0030102SaveDeal() {
        SF0030102Req req = requestJson(SF0030102Req.class);

        DealDto deal = req.getDeal().getModel();
        if (deal.getId() == null)
            return responseJson(null, MessageCode.SF00301.ERR002);

        // customer info
        CustomerDto customer = null;
        if (req.getCustomer() != null && req.getCustomer().getId() != null)
            customer = sv005CustomerService.sv00501GetCustomerByCustomerId(req.getCustomer().getId());

        // saler info
        UserDto saler = null;
        if (req.getSaler() != null && req.getSaler().getId() != null)
            saler = sv002UserService.sv00204GetUserById(req.getSaler().getId());

        DealDto dealOld = sv003DealService.sv00301GetDealById(deal.getId());
        if (dealOld == null)
            return responseJson(null, MessageCode.SF00301.ERR002);

        // update deal info
        dealOld.setDealName(deal.getDealName());
        dealOld.setDeliveryDate(deal.getDeliveryDate());
        dealOld.setEstTotalDeal(deal.getEstTotalDeal());

        SF00301_UserJson salerJson = null;
        if (saler != null) { // update saler info & parse json data
            dealOld.setSalesId(saler.getId());
            salerJson = new SF00301_UserJson();
            salerJson.setModel(saler);
            DepartmentDto department = sv015DepartmentService.sv01509GetDepartmentById(saler.getDepartmentId());
            if (department != null) {
                SF00301_DepartmentJson departmentJson = new SF00301_DepartmentJson();
                departmentJson.setModel(department);
                salerJson.setDepartment(departmentJson);
            }
        } else {
            dealOld.setSalesId(null);
        }

        SF00301_CustomerJson customerJson = null;
        if (customer != null) { // update customer info & parse json data
            dealOld.setCustomerId(customer.getId());
            dealOld.setCustomerName(customer.getName());

            customerJson = new SF00301_CustomerJson();
            customerJson.setModel(customer);
        } else {
            dealOld.setCustomerId(null);
            dealOld.setCustomerName(deal.getCustomerName());
        }

        //Update Deal Type
        dealOld.setDealType(deal.getDealType());
        DealDto updatedDeal = sv003DealService.sv00307SaveDeal(dealOld);

        SF0030105Res res = new SF0030105Res();
        SF00301_DealJson dealJson = new SF00301_DealJson();
        // parse deal data
        dealJson.setModel(updatedDeal);
        res.setDeal(dealJson);

        // parse customer data
        res.setCustomer(customerJson);

        // parse saler data
        res.setSaler(salerJson);

        // update save state
        res.setHasRegisteredCustomer(true);

        return responseJson(res, MessageCode.SF00301.INF001);
    }

    @Override
    public Result sf0030103SaveDealFile() {
        //get request data
        SF0030104Req req = requestJson(SF0030104Req.class);
        SF00301_DealFileJson dealFileJson = req.getDealFile();

        // set user create and user update
        DealFileDto dealFileDto = dealFileJson.getModel();
        // check highlight_flag
        if (dealFileDto.getHighlightFlag() == null)
            dealFileDto.setHighlightFlag(Enums.Status.HIGHLIGHT_FLAG_OFF.getStatus());

        //Save Deal File
        dealFileDto = sv003DealService.sv00316CreateDealFile(dealFileDto, req.getFileCode());

        //set dealFile Json
        SF00301_DealFileJson dealFileJsonTmp = new SF00301_DealFileJson();
        dealFileJsonTmp.setModel(dealFileDto);

        // get file and parse srcImage
        FileDto fileDto = sv006FileService.sv00609GetFileInfo(dealFileDto.getFileId());
        dealFileJsonTmp.setSrcImg(sv006FileService.sv00618GetThumbnail(fileDto));

        //set response data
        SF0030104Res res = new SF0030104Res();
        res.setDealFile(dealFileJsonTmp);

        return responseJson(res, MessageCode.SF00301.INF001);
    }

    @Override
    public Result sf0030104UpdateDealFile() {
        //get request data
        SF0030103Req req = requestJson(SF0030103Req.class);
        SF00301_DealFileJson dealFileJson = req.getDealFile();

        //set user update
        DealFileDto dealFileDto = dealFileJson.getModel();
        dealFileDto.setUpdatedDate(DateUtil.getSysDate());

        SF00301_DealFileJson dealFileJsonTmp = new SF00301_DealFileJson();
        // check fileCode
        if (req.getFileCode() != null) {
            FileDto fileDto = sv006FileService.sv00604SaveTempFile(req.getFileCode(), Enums.ModuleType.DEAL_FILE);
            dealFileJsonTmp.setSrcImg(sv006FileService.sv00618GetThumbnail(fileDto));
            dealFileDto.setFileId(fileDto.getId());
        } else {
            dealFileJsonTmp.setSrcImg(dealFileJson.getSrcImg());
        }
        // update fileId to dealFile
        dealFileDto.setHighlightFlag(Enums.Status.HIGHLIGHT_FLAG_ON.getStatus());
        dealFileDto = sv003DealService.sv00310SaveDealFile(dealFileDto);
        dealFileJsonTmp.setModel(dealFileDto);

        SF0030103Res res = new SF0030103Res();
        res.setDealFile(dealFileJsonTmp);

        return responseJson(res, MessageCode.SF00301.INF001);
    }

    @Override
    public Result sf0030105RemoveDealFile() {
        // get request data
        SF0030105Req req = requestJson(SF0030105Req.class);

        // delete deal file
        sv003DealService.sv00311DeleteDealFile(req.getDealFileId());

        // set response data
        return responseJson(null, MessageCode.SF00301.INF001);
    }

    @Override
    public Result sf0030106RemoveQuotation() {
        // get request data
        SF0030106Req req = requestJson(SF0030106Req.class);

        // delete quotation
        sv004QuotationService.sv00404DeleteQuotation(req.getQuotationId());

        // set response data
        return responseJson(null, MessageCode.SF00301.INF001);
    }

    @Override
    public Result sf0030107RemoveDealProduct() {
        SF0030107Req req = requestJson(SF0030107Req.class);

        DealProductDto dealProductDto = sv003DealService.sv00302GetDealProductByDealCodeAndProductCode(req
                        .getDealCode(),
                req.getProductCode());

        if (dealProductDto == null)
            return responseError(MessageCode.SF00301.ERR004);

        boolean deleted = sv003DealService.sv00305DeleteDealProductById(dealProductDto.getId());
        if (!deleted)
            return responseError(MessageCode.SF00301.ERR004);

        return responseJson(null, MessageCode.SF00301.INF001);
    }

    @Override
    public Result sf0030108RemoveProductFile() {
        SF0030108Req req = requestJson(SF0030108Req.class);

        // delete deal product file
        boolean check = sv008ProductService.sv00807DeleteProductFile(req.getProductFileId());
        if (check) {
            // find next product file indicate on product
            ProductFileDto updatedProductFile = sv008ProductService.sv00829GetPrimaryProductFile(req.getProductId());
            SF0030108Res res = new SF0030108Res();

            if (updatedProductFile != null) {
                // get file and parse srcImage
                FileDto fileDto = sv006FileService.sv00609GetFileInfo(updatedProductFile.getFileId());
                res.setSrcImg(sv006FileService.sv00618GetThumbnail(fileDto));
            }

            return responseJson(res, MessageCode.SF00301.INF001);
        }

        return responseError(MessageCode.SF00301.ERR003);
    }

    @Override
    public Result sf0030109AddComment() {
        // get request data
        SF0030109Req req = requestJson(SF0030109Req.class);
        SF0030109Res res = new SF0030109Res();

        SF00301_CommentJson comment = req.getComment();
        CommentDto commentDto = comment.getModel();
        commentDto.setCommentType(0);
        Integer userId = getUserId();
        commentDto.setUserId(userId);
        commentDto = sv003DealService.sv00308SaveComment(commentDto);
        comment.setModel(commentDto);

        UserDto userDto = sv002UserService.sv00204GetUserById(userId);
        comment.setUsername(userDto.getUsername());

        DepartmentDto department = sv015DepartmentService.sv01509GetDepartmentById(userDto.getDepartmentId());
        comment.setDepartmentName(department.getDepartment());

        sendMail(comment.getDealId(), comment.getValue());
        res.setComment(comment);

        // 13 Get total of comments
        Long totalRows = sv003DealService.sv003034GetTotalCommentsByDealId(comment.getDealId());
        res.setNumberOfComment(Integer.valueOf(totalRows + ""));

        return responseJson(res, MessageCode.SF00301.INF001);
    }

    private void sendMail(Integer dealId, String comment) {
        // 1.0 Get Deal Info
        DealDto dealDto = sv003DealService.sv00301GetDealById(dealId);
        if (dealDto == null) {
            return;
        }

        // 2.0 Get login user
        UserDto loginUser = authService.getCurrentUser();

        // 3.0 Get PIC
        Integer picId = dealDto.getSalesId();
        UserDto pic = sv002UserService.sv00204GetUserById(picId);
        // case a
        String senderName = loginUser.getUsername();
        String senderEmail = loginUser.getEmail();
        List<String> recieved = new ArrayList<>();
        List<String> cc = new ArrayList<>();
        if (loginUser.getId() == pic.getId()) {
            recieved.add(loginUser.getEmail());
        } else {
            // case b
            recieved.add(pic.getEmail());
            cc.add(loginUser.getEmail());
        }
        String subject = MessagesUtil.get("template/mail_template.properties", "SF00301_SUBJECT",
                dealDto.getDealCode(), dealDto.getDealName());

        String content = MessagesUtil.get("template/mail_template.properties", "SF00301_BODY_CONTENT",
                Strings.nullToEmpty(dealDto.getDealCode()),
                Strings.nullToEmpty(dealDto.getDealName()),
                Strings.nullToEmpty(loginUser.getUsername()),
                DateUtil.formatDate(DateUtil.getSysDate(), "yyyy/MM/dd HH:mm"),
                Strings.nullToEmpty(comment),
                UrlHelper.getDealUrl(dealDto.getDealCode()));
        content = content.replaceAll("(\r\n|\n)", "<br />");
        // 4.0 Send mail
        try {
            sv017MailService.sv01704SendMail(senderName, senderEmail, recieved, cc, subject, content);
        } catch (Exception e) {
            logger.debug("Send mail error: ", e.getCause());
        }
    }

    @Override
    public Result sf0030110ShowMoreComment() {
        SF0030110Req req = requestJson(SF0030110Req.class);
        Integer dealId = req.getDealId();
        Integer startPosition = req.getStartPosition();

        List<CommentDto> comments = sv003DealService.sv00315ShowMoreComment(dealId, startPosition);
        List<SF00301_CommentJson> jsons = comments.stream().map(comment -> {
            SF00301_CommentJson json = new SF00301_CommentJson();
            json.setModel(comment);

            UserDto user = sv002UserService.sv00204GetUserById(comment.getUserId());
            json.setUsername(user.getUsername());

            DepartmentDto department = sv015DepartmentService.sv01509GetDepartmentById(user.getDepartmentId());
            json.setDepartmentName(department.getDepartment());
            json.setCommentFiles(this.getCommentFileJsonByCommentId(comment.getId()));

            return json;
        }).collect(Collectors.toList());

        // get total comment by deal
        Long totalRows = sv003DealService.sv003034GetTotalCommentsByDealId(dealId);

        SF0030110Res res = new SF0030110Res();
        res.setComments(jsons);
        res.setTotal(totalRows);

        return responseJson(res, MessageCode.SF00301.INF001);
    }

    @Override
    public Result sf0030112DeleteDeal() {
        SF0030112Req req = requestJson(SF0030112Req.class);

        if (!sv003DealService.sv00309DeleteDealByDealCode(req.getDealCode())) {
            return responseError(MessageCode.SF00301.ERR007);
        }

        return responseJson(null, MessageCode.SF00301.INF001);
    }

    @Override
    public Result sf0030113BookmarkDealInfo() {
        //Get request data
        SF0030113Req req = requestJson(SF0030113Req.class);
        Integer dealId = req.getDealId();

        // check deal exist
        DealDto dealDto = sv003DealService.sv00301GetDealById(dealId);
        if (dealDto == null)
            return responseError(MessageCode.SF00301.ERR002);

        // Add deal to my box
        MyboxItemDto myboxItemDto = sv007MyboxService.sv00701BookmarkDeal(dealId, getUserId());

        // Set response data
        MyboxItemJson myboxItemJson = new MyboxItemJson();
        myboxItemJson.setData(myboxItemDto);

        SF0030113Res res = new SF0030113Res();
        res.setMyboxItem(myboxItemJson);

        return responseJson(res, MessageCode.SF00301.INF001);
    }

    @Override
    public Result sf0030114UnBookmarkDealInfo() {
        //Get request data
        SF0030114Req req = requestJson(SF0030114Req.class);

        //Remove deal from my box
        sv007MyboxService.sv00702UnbookmarkDeal(req.getMyBoxId());

        //Set response data
        SF0030113Res res = new SF0030113Res();
        MyboxItemJson myboxItemJson = new MyboxItemJson();
        res.setMyboxItem(myboxItemJson);

        return responseJson(res, MessageCode.SF00301.INF001);
    }

    @Override
    public Result sf0030115GetDealMybox() {
        SF0030115Req req = requestJson(SF0030115Req.class);
        SF0030115Res res = new SF0030115Res();

        // get myboxItem by dealId and userId
        MyboxItemDto myboxItemDto = sv007MyboxService.sv00703GetMyboxItemByDealId(req.getDealId(), getUserId());
        MyboxItemJson myboxItemJson = new MyboxItemJson();

        // check myboxItem
        if (myboxItemDto != null)
            myboxItemJson.setData(myboxItemDto);

        // set myboxItem to r
        res.setMyboxItem(myboxItemJson);

        return responseJson(res, MessageCode.SF00301.INF001);
    }

    @Override
    public Result sf0030116CreateDeal() {
        SF0030116Req req = requestJson(SF0030116Req.class);

        if (req.getCustomer() != null && sv005CustomerService.sv00501GetCustomerByCustomerId(req.getCustomer().getId
                ()) == null)
            return responseJson(null, MessageCode.SF00301.ERR005);

        if (req.getSaler() != null && sv002UserService.sv00204GetUserById(req.getSaler().getId()) == null)
            return responseJson(null, MessageCode.SF00301.ERR006);

        DealDto newDeal = req.getDeal().getModel();
        newDeal.setCustomerId(req.getCustomer() != null ? req.getCustomer().getId() : null);
        newDeal.setSalesId(req.getSaler() != null ? req.getSaler().getId() : null);

        String copyFrom = req.getCopyFrom();
        if (!Strings.isNullOrEmpty(copyFrom)) {
            newDeal = sv003DealService.sv00325CopyAndSaveDeal(newDeal, copyFrom);
        } else {
            newDeal = sv003DealService.sv00330CreateDeal(newDeal);
        }

        SF0030116Res res = new SF0030116Res();
        res.setDealId(newDeal.getId());
        res.setDealCode(newDeal.getDealCode());

        return responseJson(res, MessageCode.SF00301.INF001);

    }

    @Override
    public Result sf0030117UpdateHighlightFlag() {
        SF0030117Req req = requestJson(SF0030117Req.class);
        //1. update highlightFlag
        Integer newHighlightFlag = sv003DealService.sv00328UpdateHighlightFlag(req.getItemId(), req.getStatus(), req.getItemType());

        //#2223
        Integer newDealStatus = sv003DealService.sv00329UpdateDealStatus(req.getDealId());

        // response status highlightFlag
        SF0030117Res res = new SF0030117Res();
        res.setDealStatus(newDealStatus);
        res.setStatus(newHighlightFlag);

        return responseJson(res, MessageCode.SF00301.INF001);
    }

    @Override
    public Result sf0030118GetCustomers() {
        SF0030118Req req = requestJson(SF0030118Req.class);
        SF0030118Res res = new SF0030118Res();
        res.setCustomers(this.getCustomerJsons(req.getDepartmentId()));
        return responseJson(res, MessageCode.SF00301.INF001);
    }

    /**
     * Update deal status.
     *
     * @return updated deal's status
     */
    @Override
    public Result sf0030119UpdateDealStatus() {
        SF0030119Req req = requestJson(SF0030119Req.class);

        Integer newDealStatus;

        //#2223
        newDealStatus = sv003DealService.sv00329UpdateDealStatus(req.getDealId());

        //result: updated deal status
        SF0030119Res res = new SF0030119Res(newDealStatus);
        return responseJson(res, MessageCode.SF00301.INF001);
    }

    @Override
    public Result sf0030120CloseDeal() {
        SF0030120Req req = requestJson(SF0030120Req.class);

        sv003DealService.sv0030307CloseDeal(req.getDealId());

        return responseJson(null, MessageCode.SF00301.INF001);
    }

    @Override
    // TODO: 404 handling.
    public Result sf0030121Download() {
        SF0030121Req req = requestJson(SF0030121Req.class);
        final Integer fileId = req.getFileId();
        final Integer itemId = req.getItemId(); // can dealId or productId

        String fileName = "";
        if (Constants.ITEM_PRODUCT.equals(req.getCategory())) { // has product file
            ProductFileDto productFileDto = sv008ProductService.sv00841GetProductFile(itemId, fileId);
            if ( productFileDto != null ) {
                fileName = productFileDto.getOriginalName();
            }
        } else if (Constants.ITEM_COMMENT_FILE.equals(req.getCategory())) {
            // comment file
            CommentFileDto commentFileDto = CommentFileDao.getCommentFile(itemId, fileId);
            if ( commentFileDto != null ) {
                fileName = commentFileDto.getOriginalName();
            }
        } else { // has deal file
            DealFileDto dealFileDto = sv003DealService.sv00338GetDealFile(itemId, fileId);
            if ( dealFileDto != null ) {
                fileName = dealFileDto.getOriginalName();
            }
        }

        SF0030120Res res = new SF0030120Res();
        FileDto fileDto = sv006FileService.sv00609GetFileInfo(fileId);
        if (fileDto != null) {
            res.setFileName(fileName);
            res.setFilePath(sv006FileService.sv00619GetFileURI(fileDto.getFileCode(), fileName));
        }

        return responseJson(res, MessageCode.COM.INF001);
    }

    @Override
    public Result sf0030122LockDeal() {
        SF0030122Req req = requestJson(SF0030122Req.class);
        Integer dealId = req.getDealId();

        if(dealId == null){
            responseError("Deal id undefined");
        }

        SF0030122Res res = new SF0030122Res();
        Integer dealLock = sv003DealService.sv003036DealLock(dealId);
        res.setDealLock(dealLock);

        return responseJson(res, MessageCode.COM.INF001);
    }

    private List<SF00301_CustomerJson> getCustomerJsons(final int departmentId) {
        return sv005CustomerService
                .sv00515getCustomersByDepartment(departmentId).stream()
                .map(customerDto -> {
                    SF00301_CustomerJson customer = new SF00301_CustomerJson();
                    customer.setModel(customerDto);
                    return customer;
                }).collect(Collectors.toList());
    }


    private List<SF00301_CommentFileJson> getCommentFileJsonByCommentId (Integer commentId) {
        List<CommentFileDto> commentFiles = CommentFileDao.getCommentFileByCommentId(commentId);
        List<SF00301_CommentFileJson> commentFilesJson = Lists.newArrayList();
        for ( CommentFileDto commentFile : commentFiles ) {
            SF00301_CommentFileJson file_json = new SF00301_CommentFileJson();
            file_json.setModel(commentFile);
            commentFilesJson.add(file_json);
        }
        return commentFilesJson;
    }

}
