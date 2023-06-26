package vn.vnext.sefuri.sf.controller.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.joda.time.DateTime;

import play.mvc.Result;
import vn.vnext.sefuri.sf.common.CommonCtrl;
import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.common.MessageCode;
import vn.vnext.sefuri.sf.controller.SFN0401Ctrl;
import vn.vnext.sefuri.sf.dto.CustomerDto;
import vn.vnext.sefuri.sf.dto.DealDto;
import vn.vnext.sefuri.sf.dto.DepartmentDto;
import vn.vnext.sefuri.sf.dto.InventoryDto;
import vn.vnext.sefuri.sf.dto.MstLaminationDto;
import vn.vnext.sefuri.sf.dto.MstPaperDto;
import vn.vnext.sefuri.sf.dto.MstWoodenDto;
import vn.vnext.sefuri.sf.dto.OrderItemDto;
import vn.vnext.sefuri.sf.dto.ProductDto;
import vn.vnext.sefuri.sf.dto.RevenueDto;
import vn.vnext.sefuri.sf.dto.ShippingDestinationDto;
import vn.vnext.sefuri.sf.dto.SupplierDto;
import vn.vnext.sefuri.sf.dto.SupplyOrderDto;
import vn.vnext.sefuri.sf.dto.UserDto;
import vn.vnext.sefuri.sf.json.SFN0401.model.InventoryJson;
import vn.vnext.sefuri.sf.json.SFN0401.model.OrderJson;
import vn.vnext.sefuri.sf.json.SFN0401.model.PaperJson;
import vn.vnext.sefuri.sf.json.SFN0401.model.PartnerJson;
import vn.vnext.sefuri.sf.json.SFN0401.model.ProductJson;
import vn.vnext.sefuri.sf.json.SFN0401.model.RevenueJson;
import vn.vnext.sefuri.sf.json.SFN0401.model.UserJson;
import vn.vnext.sefuri.sf.json.SFN0401.request.SFN040101Req;
import vn.vnext.sefuri.sf.json.SFN0401.request.SFN040102Req;
import vn.vnext.sefuri.sf.json.SFN0401.response.SFN040101Res;
import vn.vnext.sefuri.sf.json.SFN0401.response.SFN040102Res;
import vn.vnext.sefuri.sf.module.search.SearchApi;
import vn.vnext.sefuri.sf.module.search.SearchResult;
import vn.vnext.sefuri.sf.service.SV002UserService;
import vn.vnext.sefuri.sf.service.SV003DealService;
import vn.vnext.sefuri.sf.service.SV005CustomerService;
import vn.vnext.sefuri.sf.service.SV009OrderService;
import vn.vnext.sefuri.sf.service.SV013MstDataService;
import vn.vnext.sefuri.sf.service.SV015DepartmentService;
import vn.vnext.sefuri.sf.service.SV016RevenueService;
import vn.vnext.sefuri.sf.service.SV021InventoryService;
import vn.vnext.sefuri.sf.service.SV022SupplierService;
import vn.vnext.sefuri.sf.util.DateUtil;
import vn.vnext.sefuri.sf.util.FormatUtil;

/**
 * Created by Teddy on 7/26/2017.
 */
public class SFN0401CtrlImpl extends CommonCtrl implements SFN0401Ctrl {
    private final static Integer PAPER = 1;
    private final static Integer LAMINATION = 2;

    @Inject
    private SV005CustomerService customerService;

    @Inject
    private SV022SupplierService supplierService;

    @Inject
    private SV003DealService dealService;

    @Inject
    private SV016RevenueService revenueService;

    @Inject
    private SV021InventoryService inventoryService;

    @Inject
    private SV009OrderService orderService;

    @Inject
    private SV002UserService userService;

    @Inject
    private SV015DepartmentService departmentService;

    @Inject
    private SearchApi searchApi;

    @Inject
    private SV013MstDataService mstDataService;

    @Override
    public Result sfn040101SearchCustomer() {

        SFN040101Req req = requestJson(SFN040101Req.class);

        // A. do search
        SearchResult searchResult = searchApi.sfn040101(req);

        // get search result
        int hits = searchResult.getCount();
        if (hits == 0) {
            // no result
            return responseJson(null, MessageCode.INF001);
        }

        // B. get result data
        List<Integer> customerIds = searchResult.getIds();
        // 1. customer data
        List<CustomerDto> customerDtos = customerService.getCustomerByIds(customerIds);
        // 2. get customer default address
        Map<Integer, ShippingDestinationDto> addressMap = new HashMap<>();
        for (Integer customerId : customerIds) {
            ShippingDestinationDto destinationDto = customerService.sv00521GetCustomerDefaultAddress(customerId);
            addressMap.put(customerId, destinationDto);
        }
        // 3. get customer revenue
        Map<Integer, List<RevenueDto>> revenueMap = new HashMap<>();
        for (Integer customerId : customerIds) {
            // 3.1 get revenue
            List<RevenueDto> revenueDtos = revenueService.sv001603GetRevenuesByCustomer(customerId, 10);
            revenueMap.put(customerId, revenueDtos);
        }
        // 4. get customer stock
        Map<Integer, List<InventoryDto>> inventoryMap = new HashMap<>();
        for (Integer customerId : customerIds) {
            List<InventoryDto> inventoryDtos = inventoryService.sv02101GetInventoryByCustomer(customerId, 10);
            inventoryMap.put(customerId, inventoryDtos);
        }
        // 5. get customer product
        Map<Integer, List<OrderItemDto>> orderMap = new HashMap<>();
        for (Integer customerId : customerIds) {
            List<OrderItemDto> orderItemDtos = orderService.sv00916getOrderItemByCustomer(customerId, 10);
            orderMap.put(customerId, orderItemDtos);
        }
        // 6. get sales info
        Map<Integer, UserDto> salesMap = new HashMap<>();
        for (CustomerDto customerDto : customerDtos) {
            UserDto userDto = userService.sv00104getUserByUserCode(customerDto.getPicCode());
            if (userDto != null) {
                DepartmentDto departmentDto = departmentService.sv01509GetDepartmentById(userDto.getDepartmentId());
                userDto.setDepartment(departmentDto);
            }
            salesMap.put(customerDto.getId(), userDto);
        }

        // C. prepare response
        SFN040101Res res = new SFN040101Res();
        // hits
        res.setHits(hits);
        // partners
        List<PartnerJson> customerJsons = new ArrayList<>();
        res.setCustomers(customerJsons);
        for (CustomerDto customerDto : customerDtos) {
            PartnerJson customerJson = new PartnerJson();
            customerJsons.add(customerJson);

            // 1. basic info
            Integer customerId = customerDto.getId();
            // code
            customerJson.setCode(customerDto.getCustomerCode());
            // name
            customerJson.setName(customerDto.getName());
            // updateDate
            customerJson.setUpdateDate(customerDto.getUpdatedDate());
            // abbr
            customerJson.setAbbr(customerDto.getAbbreviation());
            // createdDate
            customerJson.setCreatedDate(customerDto.getCreatedDate());
            // startYear
            customerJson.setStartYear(customerDto.getStartYear());
            // contactName
            customerJson.setContactName(customerDto.getCustomerContact());
            // hpInfo
            customerJson.setHpInfo(customerDto.getHpInfo());
            // billingMethod
            customerJson.setBillingMethod(customerDto.getBillingMethod());
            // 備考(営業カルテ)
            customerJson.setMemo(customerDto.getMemo());

            // 2. address info
            ShippingDestinationDto addressDto = addressMap.get(customerId);
            if (addressDto != null) {
                // postalCode
                customerJson.setPostalCode(addressDto.getPostalCode());
                // address1
                customerJson.setAddress1(addressDto.getDeliveryAddress1());
                // address2
                customerJson.setAddress2(addressDto.getDeliveryAddress2());
                // tel
                customerJson.setTel(addressDto.getTel());
                // ext
                customerJson.setExt(addressDto.getExtension());
                // fax
                customerJson.setFax(addressDto.getFax());
                // note1
                customerJson.setNote1(addressDto.getMemo1());
                // note2
                customerJson.setNote2(addressDto.getMemo2());
            }

            // 3. revenue
            List<RevenueJson> revenueJsons = new ArrayList<>();
            customerJson.setRevenues(revenueJsons);
            List<RevenueDto> revenueDtos = revenueMap.get(customerId);
            for (RevenueDto revenueDto : revenueDtos) {
                RevenueJson revenueJson = new RevenueJson();
                revenueJsons.add(revenueJson);

                // 3.1 revenue info
                // salesDate
                revenueJson.setSalesDate(revenueDto.getInvoiceSalesDate());
                // quantity
                revenueJson.setQuantity(revenueDto.getSalesNumber());
                // unitPrice
                revenueJson.setUnitPrice(revenueDto.getSalesUnitPrice());
                // total
                revenueJson.setTotal(revenueDto.getSalesAmount());

                // product
                ProductJson productJson = generateProductJson(revenueDto.getOrderItemDto());
                revenueJson.setProduct(productJson);
            }

            // 4. stock
            List<InventoryJson> inventoryJsons = new ArrayList<>();
            customerJson.setInventories(inventoryJsons);
            List<InventoryDto> inventoryDtos = inventoryMap.get(customerId);
            DateTime now = DateUtil.getSysDate();
            for (InventoryDto inventoryDto : inventoryDtos) {
                InventoryJson inventoryJson = new InventoryJson();
                inventoryJsons.add(inventoryJson);

                // type-在庫
                OrderItemDto orderItemDto = inventoryDto.getOrderItemDto();
                int inventoryType = 1;
                if (orderItemDto != null) {
                    if (Integer.valueOf(1).equals(orderItemDto.getDeposit())) {
                        inventoryType = 2;
                    }
                }
                inventoryJson.setType(inventoryType);
                // quantity
                int quantity = inventoryDto.getQuantity();
                inventoryJson.setQuantity(quantity);
                // unitPrice
                BigDecimal unitPrice = BigDecimal.ZERO;
                if (orderItemDto != null) {
                    unitPrice = orderItemDto.getSubmittedPrice();
                }
                inventoryJson.setUnitPrice(unitPrice);
                // total
                BigDecimal total = BigDecimal.valueOf(quantity).multiply(unitPrice);
                inventoryJson.setTotal(total);
                // manufactureDate
                DateTime registrationDate = inventoryDto.getRegistrationDate();
                inventoryJson.setManufactureDate(registrationDate);
                // storageDays
                int daysDiff = DateUtil.daysDiff(registrationDate, now);
                if (daysDiff < 0) {
                    daysDiff = 0;
                } else {
                    daysDiff = daysDiff + 1;
                }
                inventoryJson.setStorageDays(daysDiff);

                // product
                ProductJson productJson = generateProductJson(orderItemDto);
                inventoryJson.setProduct(productJson);
            }

            // 5. orders
            List<OrderJson> orderJsons = new ArrayList<>();
            customerJson.setOrders(orderJsons);
            List<OrderItemDto> orderItemDtos = orderMap.get(customerId);
            for (OrderItemDto orderItemDto : orderItemDtos) {
                OrderJson orderJson = new OrderJson();
                orderJsons.add(orderJson);

                // quantity
                orderJson.setQuantity(orderItemDto.getQuantity());
                // unitPrice
                orderJson.setUnitPrice(orderItemDto.getSubmittedPrice());
                // total
                orderJson.setTotal(orderItemDto.getTotal());

                // product
                ProductJson productJson = generateProductJson(orderItemDto);
                orderJson.setProduct(productJson);
            }

            // 6. sales
            UserDto userDto = salesMap.get(customerId);
            UserJson sales = new UserJson();
            customerJson.setSales(sales);
            if (userDto != null) {
                sales.setName(userDto.getUsername());
                if (userDto.getDepartment() != null) {
                    sales.setDepartmentName(userDto.getDepartment().getDepartment());
                }
            }
        }

        return responseUsingGzip(res, MessageCode.INF002);
    }

    @Override
    public Result sfn040102SearchSupplier() {

        SFN040102Req req = requestJson(SFN040102Req.class);

        // A. do search
        SearchResult searchResult = searchApi.sfn040102(req);

        // get search result
        int hits = searchResult.getCount();
        if (hits == 0) {
            // no result
            return responseJson(null, MessageCode.INF001);
        }

        // B. get result data
        List<Integer> supplierIds = searchResult.getIds();
        // 1. supplier data
        List<SupplierDto> supplierDtos = supplierService.sv02202GetSupplierByIds(supplierIds);
        // 2. get supplier orders
        Map<Integer, List<SupplyOrderDto>> orderMap = new HashMap<>();
        for (Integer supplierId : supplierIds) {
            // 3.1 get revenue
            List<SupplyOrderDto> orderDtos = supplierService.sv2205GetSupplyOrders(supplierId, 10);
            orderMap.put(supplierId, orderDtos);
        }

        // C. prepare response
        SFN040102Res res = new SFN040102Res();
        // hits
        res.setHits(hits);
        // partners
        List<PartnerJson> supplierJsons = new ArrayList<>();
        res.setSuppliers(supplierJsons);
        for (SupplierDto supplierDto : supplierDtos) {
            PartnerJson supplierJson = new PartnerJson();
            supplierJsons.add(supplierJson);

            // 1. basic info
            Integer supplierId = supplierDto.getId();
            // code
            supplierJson.setCode(supplierDto.getSupplierCode());
            // name
            supplierJson.setName(supplierDto.getName());
            // updateDate
            supplierJson.setUpdateDate(supplierDto.getUpdatedDate());
            // abbr
            supplierJson.setAbbr(supplierDto.getAbbreviation());
            // createdDate
            supplierJson.setCreatedDate(supplierDto.getCreatedDate());
            // contactName
            supplierJson.setContactName(supplierDto.getContactName());
            // postalCode
            supplierJson.setPostalCode(supplierDto.getPostalCode());
            // address1
            supplierJson.setAddress1(supplierDto.getAddress1());
            // address2
            supplierJson.setAddress2(supplierDto.getAddress2());
            // tel
            supplierJson.setTel(supplierDto.getTel());
            // fax
            supplierJson.setFax(supplierDto.getFax());
            // note1
            supplierJson.setNote1(supplierDto.getMemo1());
            // note2
            supplierJson.setNote2(supplierDto.getMemo2());
            // memo
            supplierJson.setMemo(supplierDto.getMemo());

            // 2. revenue
            List<SupplyOrderDto> orderDtos = orderMap.get(supplierId);
            List<RevenueJson> revenueJsons = new ArrayList<>();
            supplierJson.setRevenues(revenueJsons);
            for (SupplyOrderDto orderDto : orderDtos) {
                RevenueJson revenueJson = new RevenueJson();
                revenueJsons.add(revenueJson);

                // 3.1 revenue info
                // salesDate
                revenueJson.setSalesDate(orderDto.getCreatedDate());
                // quantity
                if (orderDto.getQuantity() == null) {
                    revenueJson.setQuantity(BigDecimal.ZERO);
                } else {
                    revenueJson.setQuantity(BigDecimal.valueOf(orderDto.getQuantity()));
                }
                // unitPrice
                revenueJson.setUnitPrice(orderDto.getPrice());
                // total
                revenueJson.setTotal(orderDto.getAmount());

                // product
                ProductJson productJson = generateProductJson(orderDto.getOrderItemDto());
                revenueJson.setProduct(productJson);
            }
        }

        return responseUsingGzip(res, MessageCode.INF002);
    }


    private ProductJson generateProductJson(OrderItemDto orderItemDto) {
        ProductJson productJson = new ProductJson();
        if (orderItemDto != null) {
            ProductDto productDto = orderItemDto.getProductDto();
            if (productDto != null) {

                // dealCode
                DealDto dealDto = orderItemDto.getDealDto();
                if (dealDto != null) {
                    productJson.setDealCode(dealDto.getDealCode());
                }

                // itemCode
                productJson.setItemCode(productDto.getItemCode());
                // code
                productJson.setCode(productDto.getProductCode());
                // type
                productJson.setType(productDto.getProductType());
                // shapeId
                productJson.setShapeId(productDto.getShapeId());
                // name
                productJson.setName(productDto.getProductName());
                // sizeH
                productJson.setSizeH(productDto.getSizeH());
                // sizeD
                productJson.setSizeD(productDto.getSizeD());
                // sizeW
                productJson.setSizeW(productDto.getSizeW());

                //description
                //cartonShippingType
                productJson.setCartonShippingType(productDto.getCartonShippingType());
                //blankPaperSizeH
                productJson.setBlankPaperSizeH(productDto.getBlankPaperSizeH());
                //blankPaperSizeW
                productJson.setBlankPaperSizeW(productDto.getBlankPaperSizeW());
                //paperSizeH
                productJson.setPaperSizeH(productDto.getPaperSizeH());
                //paperSizeW
                productJson.setPaperSizeW(productDto.getPaperSizeW());
                //laminationFlute
                productJson.setLaminationFlute(productDto.getLaminationFlute());
                //paperNameId
                productJson.setPaperNameId(productDto.getPaperNameId());
                //paperWeight
                productJson.setPaperWeight(productDto.getPaperWeight());
                //laminationPaperTypeA
                productJson.setLaminationPaperTypeA(productDto.getLaminationPaperTypeA());
                //laminationABasicWeight
                productJson.setLaminationABasicWeight(productDto.getLaminationABasicWeight());
                //laminationPaperTypeB
                productJson.setLaminationPaperTypeB(productDto.getLaminationPaperTypeB());
                //laminationBBasicWeight
                productJson.setLaminationBBasicWeight(productDto.getLaminationBBasicWeight());
                //laminationPaperTypeFront
                productJson.setLaminationPaperTypeFront(productDto.getLaminationPaperTypeFront());
                //laminationPaperTypeBack
                productJson.setLaminationPaperTypeBack(productDto.getLaminationPaperTypeBack());
                //laminationPaperTypeMedium
                productJson.setLaminationPaperTypeMedium(productDto.getLaminationPaperTypeMedium());
                //laminationFrontBasicWeight
                productJson.setLaminationFrontBasicWeight(productDto.getLaminationFrontBasicWeight());
                //laminationMediumBasicWeight
                productJson.setLaminationMediumBasicWeight(productDto.getLaminationMediumBasicWeight());
                //laminationBackBasicWeight
                productJson.setLaminationBackBasicWeight(productDto.getLaminationBackBasicWeight());
                //printMethod
                productJson.setPrintMethod(productDto.getPrintMethod());
                //colorIdF
                productJson.setColorIdF(productDto.getColorIdF());
                //specialColorF
                productJson.setSpecialColorF(productDto.getSpecialColorF());
                //colorIdB
                productJson.setColorIdB(productDto.getColorIdB());
                //specialColorB
                productJson.setSpecialColorB(productDto.getSpecialColorB());

                //laminationAId
                productJson.setLaminationAId(productDto.getLaminationAId());
                PaperJson laminationA = this.createPaperJson(productDto.getLaminationAId(), LAMINATION);
                List<PaperJson> laminations = new ArrayList<>();
                if (laminationA != null) {
                    laminations.add(laminationA);
                }
                //laminationBId
                productJson.setLaminationBId(productDto.getLaminationBId());
                PaperJson laminationB = this.createPaperJson(productDto.getLaminationBId(), LAMINATION);
                if (laminationB != null) {
                    laminations.add(laminationB);
                }
                //laminationFrontId
                productJson.setLaminationFrontId(productDto.getLaminationFrontId());
                PaperJson laminationFront = this.createPaperJson(productDto.getLaminationFrontId(), LAMINATION);
                if (laminationFront != null) {
                    laminations.add(laminationFront);
                }
                //laminationBackId
                productJson.setLaminationBackId(productDto.getLaminationBackId());
                PaperJson laminationBack = this.createPaperJson(productDto.getLaminationBackId(), LAMINATION);
                if (laminationBack != null) {
                    laminations.add(laminationBack);
                }
                //laminationMediumId
                productJson.setLaminationMediumId(productDto.getLaminationMediumId());
                PaperJson laminationMedium = this.createPaperJson(productDto.getLaminationMediumId(), LAMINATION);
                if (laminationMedium != null) {
                    laminations.add(laminationMedium);
                }
                productJson.setLaminations(laminations);
                //paper
                if (productDto.getPaperId() != null) {
                    PaperJson paperJson = this.createPaperJson(productDto.getPaperId(), PAPER);
                    productJson.setPaper(paperJson);
                }
                // wooden
                productJson.setWooden(FormatUtil.concatItem(Constants.SLASH_JP, productDto.getWoodenCode(),productDto.getWoodenCode2()));
                //woodenDto
                MstWoodenDto woodenDto = productDto.getMstWoodenDto();
                MstWoodenDto woodenDto2 = productDto.getMstWoodenDto2();

                MstWoodenDto woodenUsing = productDto.getMstWoodenDto();
                if(woodenDto2!= null && woodenDto!= null){
                    // woodenExp
                    DateTime lastUse1 = woodenDto.getLastUse();
                    DateTime lastUse2 = woodenDto2.getLastUse();
                    if (lastUse1 == null) {
                        woodenUsing = woodenDto2;
                    } else if (lastUse2 == null) {
                        woodenUsing = woodenDto;
                    } else {
                        woodenUsing = lastUse1.isAfter(lastUse2) ? woodenDto : woodenDto2;
                    }
                }else if(woodenDto!= null){
                    woodenUsing = woodenDto;
                }else if(woodenDto2!= null){
                    woodenUsing = woodenDto2;
                }

                if(woodenUsing != null){
                    Wooden wooden = getWoodenValue(woodenUsing);
                    if(wooden.daysDiff != null){
                        productJson.setWoodenExp(wooden.daysDiff);
                    }
                    // wooden status
                    productJson.setWoodenStatus(wooden.woodenStatus);
                }
            }
        }

        return productJson;
    }

    public Wooden getWoodenValue(MstWoodenDto woodenDto){
        DateTime lastUse = woodenDto.getLastUse();
        Wooden wooden = new Wooden();

        if (lastUse != null) {
            DateTime now = DateUtil.getSysDate();
            int daysDiff = DateUtil.daysDiff(lastUse, now);
            if (daysDiff < 0) {
                daysDiff = 0;
            } else {
                daysDiff = daysDiff + 1;
            }
            wooden.daysDiff = daysDiff;
        }
        // wooden status
        wooden.woodenStatus = woodenDto.getWoodenStatus();

        return wooden;
    }

    private PaperJson createPaperJson(Integer paperId, Integer type) {
        if (paperId != null) {
            Integer id;
            String name;
            if (type == PAPER) {
                MstPaperDto mstPaperDto = mstDataService.sv01314GetMstPaperById(paperId);
                id = mstPaperDto.getId();
                name = mstPaperDto.getPaperName() == null ?
                        mstPaperDto.getMaterialName() : mstPaperDto.getPaperName();
            } else {
                MstLaminationDto mstLaminationDto = mstDataService.sv01336GetMstLaminationById(paperId);
                id = mstLaminationDto.getId();
                name = mstLaminationDto.getPaperName() == null ?
                        mstLaminationDto.getMaterialName() : mstLaminationDto.getPaperName();
            }

            PaperJson paperJson = new PaperJson();
            // id
            paperJson.setId(id);
            // paperName
            paperJson.setPaperName(name);



            return paperJson;
        }

        return null;
    }

    public class Wooden{
        private Integer daysDiff;
        private String woodenStatus;
    }
}


