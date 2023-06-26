package vn.vnext.sefuri.sf.service.impl;

import com.google.common.collect.Lists;
import com.google.inject.Inject;
import org.apache.commons.beanutils.BeanUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.common.Enums;
import vn.vnext.sefuri.sf.dao.*;
import vn.vnext.sefuri.sf.dto.*;
import vn.vnext.sefuri.sf.helper.type.QuotationItemType;
import vn.vnext.sefuri.sf.module.export.ReportGenerator;
import vn.vnext.sefuri.sf.service.SV004QuotationService;
import vn.vnext.sefuri.sf.service.SV006FileService;
import vn.vnext.sefuri.sf.util.CollectionUtil;
import vn.vnext.sefuri.sf.util.GenerateUtil;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Quotation service create api
 */
public class SV004QuotationServiceImpl implements SV004QuotationService {
    private static Logger logger = LoggerFactory.getLogger(SV004QuotationServiceImpl.class);

    @Inject
    private QuotationDao quotationDao;

    @Inject
    private QuotationItemDao quotationItemDao;

    @Inject
    private DealDao dealDao;

    @Inject
    private DealProductDao dealProductDao;

    @Inject
    private ProductDao productDao;

    @Inject
    private OfferDao offerDao;

    @Inject
    private ProductOutputDao productOutputDao;

    @Inject
    private ProductCommonFeeDao productCommonFeeDao;

    @Inject
    private CustomerDao customerDao;

    @Inject
    private UserDao userDao;

    @Inject
    private SV006FileService sv006FileService;

    @Inject
    private ReportGenerator reportGenerator;

    /**
     * {@inheritDoc}
     */
    @Override
    public List<QuotationItemDto> sv00401GetQuotationItemsByQuotationId(Integer quotationId) {
        List<QuotationItemDto> quotationItemDtos = quotationItemDao.getQuotationItemsByQuotationId(quotationId);

        if (CollectionUtil.isNotEmpty(quotationItemDtos)) {
            quotationItemDtos.forEach(quotationItemDto -> {
                // get deal product
                Integer dealProductId = quotationItemDto.getDealProductId();
                if (dealProductId != null) {
                    DealProductDto dealProductDto = dealProductDao.find(dealProductId);
                    // get product
                    ProductDto productDto = productDao.find(dealProductDto.getProductId());
                    // get product common fee
                    ProductCommonFeeDto productCommonFeeDto = productCommonFeeDao.getProductCommonFee(productDto
                            .getId());
                    // set product commonfee to product
                    productDto.setProductCommon(productCommonFeeDto);
                    // get list productOutput - offer
                    List<ProductOutputDto> productOutputDtos = productOutputDao.getProductOutputByDealProductId
                            (dealProductId);
                    if (CollectionUtil.isNotEmpty(productOutputDtos)) {
                        productOutputDtos.forEach(productOutputDto -> {
                            OfferDto offerDto = offerDao.getOfferByProductOutputId(productOutputDto.getId());
                            productOutputDto.setOffer(offerDto);
                        });
                    }
                    // set productOutput to dealProduct
                    dealProductDto.setProductOutputs(productOutputDtos);
                    // set product to deal product
                    dealProductDto.setProduct(productDto);
                    // set deal product to quotationItem
                    quotationItemDto.setDealProduct(dealProductDto);
                }
            });
        }
        return quotationItemDtos;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<QuotationDto> sv00402GetQuotationsByDealId(Integer dealId) {
        return quotationDao.getQuotationByDealId(dealId);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public QuotationDto sv00403GetQuotationByQuotationCode(String quotationCode) {
        QuotationDto quotationDto = quotationDao.getQuotationByQuotationCode(quotationCode);
        if (quotationDto != null) {
            // get quotation items
            List<QuotationItemDto> quotationItemDtos = sv00401GetQuotationItemsByQuotationId(quotationDto.getId());
            // set list quotation items to quotation dto
            quotationDto.setQuotationItems(quotationItemDtos);
            // set deal
            DealDto dealDto = dealDao.find(quotationDto.getDealId());
            // set sale to deal
            UserDto sales = userDao.findUserById(dealDto.getSalesId());
            dealDto.setSales(sales);
            // set customer to deal
            CustomerDto customerDto = customerDao.findCustomerById(dealDto.getCustomerId());
            dealDto.setCustomer(customerDto);
            // set deal to quotation
            quotationDto.setDeal(dealDto);
            // return quotation data
            return quotationDto;
        }
        return null;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean sv00404DeleteQuotation(Integer quotationId) {
        QuotationDto quotationDto = quotationDao.find(quotationId);
        return this.sv00404DeleteQuotation(quotationDto);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean sv00404DeleteQuotation(QuotationDto quotationDto) {
        if (quotationDto == null)
            return false;
        // get quotation items
        quotationItemDao.deleteQuotationItem(quotationDto.getId());
        // delete quotation
        quotationDao.delete(quotationDto.getId());
        return true;
    }


    /**
     * {@inheritDoc}
     */
    @Override
    public QuotationDto sv00405SaveQuotation(QuotationDto quotationDto) {
        // check getHighlightFlag
        if (quotationDto.getHighlightFlag() == null) {
            quotationDto.setHighlightFlag(Enums.Status.HIGHLIGHT_FLAG_OFF.getStatus());
        }

        if (quotationDto.getQuotationItems() != null) {
            List<Integer> dealProductIds = quotationDto.getQuotationItems().stream().filter(
                    item -> item.getDealProductId() != null && item.getId() == null)
                    .map(item -> item.getDealProductId())
                    .collect(Collectors.toList());

            if (!CollectionUtil.isEmpty(dealProductIds)) {
                dealProductIds.forEach(item -> {
                    productDao.updateHighlightFlagById(item, Enums.Status.HIGHLIGHT_FLAG_ON.getStatus());
                });
            }
        }

        // check create or update quotation
        if (quotationDto.getId() != null) {
            // update quotation
            return this.sv00406UpdateQuotation(quotationDto);
        }
        // create quotation
        return this.sv00407AddNewQuotation(quotationDto);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public QuotationDto sv00406CopyAndSaveQuotation(QuotationDto quotationDto) {
        // 1. Get data quotation
        QuotationDto quotationCopy = new QuotationDto();
        try {
            BeanUtils.copyProperties(quotationCopy, quotationDto);
            quotationCopy.setId(null);
        } catch (Exception e) {
            quotationCopy = new QuotationDto();
            logger.error("sv00406CopyAndSaveQuotation: " + quotationDto.getId(), e);
        }

        // 2. Create new Quotation
        quotationCopy.setCreatedUser(quotationDto.getUpdatedUser());
        quotationCopy.setUpdatedUser(quotationDto.getUpdatedUser());

        quotationDao.create(quotationCopy);
        // update quotation code
        DealDto dealDto = dealDao.find(quotationDto.getDealId());
        quotationCopy.setQuotationCode(GenerateUtil.generateQuotationCode(
                dealDto.getDealCode(), quotationCopy.getId()));

        // 3. Update Quotation code
        quotationDao.update(quotationCopy);

        // 4. Copy and save quotation item
        Map<Integer, Integer> setIdMapping = new HashMap<>();
        List<QuotationItemDto> quotationItems = new ArrayList<>();
        for (QuotationItemDto quotationItemDto : quotationDto.getQuotationItems()) {
            QuotationItemDto quotationItemCopy = new QuotationItemDto();
            try {
                BeanUtils.copyProperties(quotationItemCopy, quotationItemDto);
                quotationItemCopy.setId(null);
            } catch (Exception e) {
                quotationItemCopy = new QuotationItemDto();
                logger.error("sv00406CopyAndSaveQuotation: " + quotationItemDto.getId(), e);
            }

            // set user update
            quotationItemCopy.setUpdatedUser(quotationDto.getUpdatedUser());

            quotationItemCopy.setQuotationId(quotationCopy.getId());
            Integer oldParentId = -1;
            if (QuotationItemType.SET == quotationItemCopy.getItemType()) {
                oldParentId = quotationItemDto.getId();
            } else if (QuotationItemType.PRODUCT <= quotationItemCopy.getItemType()) {
                // check item type: product and product common fee
                quotationItemCopy.setParentId(setIdMapping.get(quotationItemCopy.getParentId()));
            }
            // create quotationItem
            quotationItemCopy.setUpdatedUser(quotationDto.getUpdatedUser());

            quotationItemCopy = quotationItemDao.create(quotationItemCopy);
            // set value key oldParentId
            if (QuotationItemType.SET == quotationItemDto.getItemType()) {
                setIdMapping.put(oldParentId, quotationItemCopy.getId());
            }

            quotationItems.add(quotationItemCopy);
        }

        quotationCopy.setQuotationItems(quotationItems);

        return quotationCopy;
    }

    @Override
    public List<Object[]> sv00407GetQuotationItemByMaxLot(List<Integer> quotationItemIds) {
        return quotationItemDao.getQuotationItemByMaxLot(quotationItemIds);
    }

    @Override
    public QuotationDto sv00410GetQuotationById(Integer quotationId) {
        return quotationDao.find(quotationId);
    }

    @Override
    public Object[] sv00408GetQuotationAndDealByQuotationCode(String quotationCode) {
        return quotationDao.getQuotationAndDealByQuotationCode(quotationCode);
    }

    @Override
    public List<QuotationItemDto> sv00409GetQuotationItemsByDealIdAndProductId(Integer dealId, List<Integer> productIds) {
        return quotationItemDao.getQuotationItemsByDealIdAndProductId(dealId, productIds);
    }

    @Override
    public QuotationItemDto sv00410GetDefaultQuotationItem(List<QuotationItemDto> quotationItems, boolean isAsc, Integer dealId, DealProductDto dealProduct) {
        if (CollectionUtil.isEmpty(quotationItems))
            return null;

        List<QuotationItemDto> retList = Lists.newArrayList();
        for (QuotationItemDto qi : quotationItems) {
            Integer currentDealProductId = qi.getDealProductId();
            // except quotation item default, only get quotation related to actual product
            if (currentDealProductId == null)
                continue;

            if (currentDealProductId.compareTo(dealProduct.getId()) == 0 && dealProduct.getDealId().compareTo(dealId) == 0)
                retList.add(qi);
        }

        if (CollectionUtil.isEmpty(retList))
            return null;

        // Always order by updated_date as descending order.
        Collections.sort(retList, new Comparator<QuotationItemDto>() {
            @Override
            public int compare(QuotationItemDto o1, QuotationItemDto o2) {
                if (o2.getQuantity() == null)
                    o2.setQuantity(new BigDecimal(0));
                if (o1.getQuantity() == null)
                    o1.setQuantity(new BigDecimal(0));

                if (isAsc) // ascending order by quantity
                    return o1.getQuantity().compareTo(o2.getQuantity());
                else // descending order by quantity
                    return o2.getQuantity().compareTo(o1.getQuantity());
            }
        });

        return retList.get(0);
    }

    @Override
    public String sv00411GetQuotationThumbnail(String quotationCode) throws IOException {
        String fileName = String.format("見積書%s", quotationCode);
        String image = sv006FileService.sv00623GetQuotationThumbUri(fileName + Constants.UNDERSCORE + 3);

        if (image == null) {
            String folerName = reportGenerator.exportQuotationFile(quotationCode, 3, fileName);
            return sv006FileService.sv00622GetJasperQuotationReportURI(folerName, fileName);
        }
        return image;
    }

    /**
     * {@inheritDoc}
     */
    private QuotationDto sv00407AddNewQuotation(QuotationDto quotationDto) {
        List<QuotationItemDto> quotationItemDtos = quotationDto.getQuotationItems();

        quotationDto.setQuotationItems(null);
        quotationDto.setDeal(null);
        quotationDto.setHighlightFlag(Enums.Status.HIGHLIGHT_FLAG_ON.getStatus());
        quotationDao.create(quotationDto);

        // update quotation code
        DealDto dealDto = dealDao.find(quotationDto.getDealId());
        quotationDto.setQuotationCode(GenerateUtil.generateQuotationCode(
                dealDto.getDealCode(), quotationDto.getId()));
        if (quotationDto.getQuotationStatus() == null) {
            // Default is 1, means 未提出
            quotationDto.setQuotationStatus(1);
        }

        quotationDao.update(quotationDto);

        // create quotation item
        Map<Integer, Integer> setIdMapping = new HashMap<>();
        if (quotationItemDtos != null) {
            // merge set item
            quotationItemDtos.forEach(quotationItemDto -> {
                // set quotationId to quotation
                quotationItemDto.setQuotationId(quotationDto.getId());
                if (QuotationItemType.SET == quotationItemDto.getItemType()) {
                    Integer tempId = quotationItemDto.getId();
                    if (tempId < 0) {
                        // new set, save new
                        quotationItemDto.setId(null);
                        quotationDto.setCreatedUser(quotationDto.getUpdatedUser());
                        quotationDto.setUpdatedUser(quotationDto.getUpdatedUser());

                        quotationItemDao.create(quotationItemDto);
                        // add mapping
                        setIdMapping.put(tempId, quotationItemDto.getId());
                    }
                } else {
                    // update set
                    quotationItemDto.setId(null);
                    quotationItemDao.create(quotationItemDto);
                }
            });
            // update product item parentId
            quotationItemDtos.forEach(quotationItemDto -> {
                // check set parent children
                if (QuotationItemType.PRODUCT <= quotationItemDto.getItemType()) {
                    // if get parent id
                    if (quotationItemDto.getParentId() != null) {
                        Integer parentId = quotationItemDto.getParentId();
                        if (parentId < 0) {
                            // update real parentId
                            quotationItemDto.setDealProduct(null);
                            quotationItemDto.setParentId(setIdMapping.get(parentId));
                            // update parent quotation item
                            quotationItemDto.setUpdatedUser(quotationDto.getUpdatedUser());
                            quotationItemDao.update(quotationItemDto);
                        }
                    }
                }
            });
            quotationDto.setQuotationItems(quotationItemDtos);
        }
        return quotationDto;
    }

    /**
     * {@inheritDoc}
     */
    private QuotationDto sv00406UpdateQuotation(QuotationDto quotationDto) {
        // update deal item
        Collection<QuotationItemDto> quotationItems = quotationDto.getQuotationItems();
        quotationDto.setDeal(null);
        quotationDto.setQuotationItems(null);

        // merge set item
        Integer quotationItemId = null;
        Integer tempId = 0;
        List<QuotationItemDto> newQuotationItems = Lists.newArrayList();
        List<Integer> quotationIds = Lists.newArrayList();
        if (quotationItems != null) {
            Map<Integer, Integer> setIdMapping = new HashMap<>();
            for (QuotationItemDto quotationItemDto : quotationItems) {
                quotationItemDto.setQuotationId(quotationDto.getId());
                // set user update
                quotationItemDto.setUpdatedUser(quotationDto.getUpdatedUser());
                if (quotationItemDto.getItemType() == QuotationItemType.SET) {
                    Integer idQuotationItem = quotationItemDto.getId();
                    if (idQuotationItem < 0) {
                        tempId = idQuotationItem;
                    }
                    if (tempId < 0 && idQuotationItem < 0) {
                        // new set, save new
                        quotationItemDto.setId(null);

                        quotationItemDao.create(quotationItemDto);
                        quotationItemId = quotationItemDto.getId();
                        setIdMapping.put(tempId, quotationItemDto.getId());
                    } else if (quotationItemDto.getParentId() == tempId) {
                        quotationItemDto.setParentId(quotationItemId);
                        // set user create or update
                        quotationItemDto.setCreatedUser(quotationDto.getUpdatedUser());
                        quotationItemDao.create(quotationItemDto);
                    } else {
                        // update set
                        quotationItemDto.setDealProduct(null);
                        quotationItemDto.setQuotation(null);

                        quotationItemDao.update(quotationItemDto);
                    }
                } else {
                    // merge product and line item
                    // set data parent id
                    if (QuotationItemType.PRODUCT <= quotationItemDto.getItemType()
                            && quotationItemDto.getParentId() != null) {
                        Integer parentId = quotationItemDto.getParentId();
                        if (parentId < 0) {
                            quotationItemDto.setParentId(setIdMapping.get(parentId));
                        }
                    }
                    if (quotationItemDto.getId() != null) {
                        // update product
                        quotationItemDto.setDealProduct(null);
                        quotationItemDto.setQuotation(null);

                        quotationItemDao.update(quotationItemDto);
                    } else {
                        quotationItemDto.setId(null);
                        quotationItemDto.setQuotationId(quotationDto.getId());
                        // set user create or update
                        quotationItemDto.setCreatedUser(quotationDto.getUpdatedUser());

                        quotationItemDao.create(quotationItemDto);
                    }
                }
                newQuotationItems.add(quotationItemDto);
                quotationIds.add(quotationItemDto.getId());
            }

            // remove deleted quotationItems
            if (quotationDto != null) {
                List<QuotationItemDto> quotationItmDtos = quotationItemDao.getQuotationItemsByQuotationId
                        (quotationDto.getId());
                if (CollectionUtil.isNotEmpty(quotationItmDtos)) {
                    quotationItmDtos.forEach(quotationItemDto -> {
                        if (!quotationIds.contains(quotationItemDto.getId())) {
                            quotationItemDao.delete(quotationItemDto.getId());
                        }
                    });
                }
            }
        }
        // return quotation dto
        quotationDto = quotationDao.update(quotationDto);
        quotationDto.setQuotationItems(newQuotationItems);

        return quotationDto;
    }

}
