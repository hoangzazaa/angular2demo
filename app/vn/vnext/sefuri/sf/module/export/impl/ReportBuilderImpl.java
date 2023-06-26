package vn.vnext.sefuri.sf.module.export.impl;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

import javax.annotation.Nonnull;
import javax.inject.Inject;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.ArrayUtils;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.auth0.jwt.internal.org.apache.commons.lang3.StringUtils;
import com.google.common.base.Strings;
import com.google.common.collect.Lists;

import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.common.Enums;
import vn.vnext.sefuri.sf.common.Enums.CartonPacking;
import vn.vnext.sefuri.sf.common.Enums.ProcessOtherMethod;
import vn.vnext.sefuri.sf.dao.CheckSheetDao;
import vn.vnext.sefuri.sf.dao.CustomerDao;
import vn.vnext.sefuri.sf.dao.DealDao;
import vn.vnext.sefuri.sf.dao.DealProductDao;
import vn.vnext.sefuri.sf.dao.DepartmentDao;
import vn.vnext.sefuri.sf.dao.MstLaminationDao;
import vn.vnext.sefuri.sf.dao.MstPaperDao;
import vn.vnext.sefuri.sf.dao.MstSheetSizeDao;
import vn.vnext.sefuri.sf.dao.OfferDao;
import vn.vnext.sefuri.sf.dao.OrderDao;
import vn.vnext.sefuri.sf.dao.OrderItemDao;
import vn.vnext.sefuri.sf.dao.ProductDao;
import vn.vnext.sefuri.sf.dao.ProductOutputDao;
import vn.vnext.sefuri.sf.dao.QuotationDao;
import vn.vnext.sefuri.sf.dao.QuotationItemDao;
import vn.vnext.sefuri.sf.dao.UserDao;
import vn.vnext.sefuri.sf.dto.ChecksheetDto;
import vn.vnext.sefuri.sf.dto.CustomerDto;
import vn.vnext.sefuri.sf.dto.DealDto;
import vn.vnext.sefuri.sf.dto.DealProductDto;
import vn.vnext.sefuri.sf.dto.DepartmentDto;
import vn.vnext.sefuri.sf.dto.FileDto;
import vn.vnext.sefuri.sf.dto.InventoryDto;
import vn.vnext.sefuri.sf.dto.MstLaminationDto;
import vn.vnext.sefuri.sf.dto.MstPaperDto;
import vn.vnext.sefuri.sf.dto.MstSheetSizeDto;
import vn.vnext.sefuri.sf.dto.MstWoodenDto;
import vn.vnext.sefuri.sf.dto.OfferDto;
import vn.vnext.sefuri.sf.dto.OrderItemDto;
import vn.vnext.sefuri.sf.dto.ProductDto;
import vn.vnext.sefuri.sf.dto.ProductFileDto;
import vn.vnext.sefuri.sf.dto.ProductOutputDto;
import vn.vnext.sefuri.sf.dto.QuotationDto;
import vn.vnext.sefuri.sf.dto.QuotationItemDto;
import vn.vnext.sefuri.sf.dto.UserDto;
import vn.vnext.sefuri.sf.json.SF00309.model.SF003090_ParsedProductInfoJson;
import vn.vnext.sefuri.sf.json.SF00309.model.SF00309_RequestModelJson;
import vn.vnext.sefuri.sf.json.SF00310.model.SF00310_DealJson;
import vn.vnext.sefuri.sf.json.SF00310.model.SF00310_ParsedProductInfoJson;
import vn.vnext.sefuri.sf.json.SF00310.model.SF00310_RequestModel;
import vn.vnext.sefuri.sf.module.export.Paper;
import vn.vnext.sefuri.sf.module.export.ReportBuilder;
import vn.vnext.sefuri.sf.module.export.conf.ReportConf;
import vn.vnext.sefuri.sf.module.export.helper.BarcodeHelper;
import vn.vnext.sefuri.sf.module.export.helper.EnumsPDF;
import vn.vnext.sefuri.sf.module.export.helper.PaperHelper;
import vn.vnext.sefuri.sf.module.export.helper.ProductSizeHelper;
import vn.vnext.sefuri.sf.module.export.model.BarcodeField;
import vn.vnext.sefuri.sf.module.export.model.ProductModel;
import vn.vnext.sefuri.sf.module.export.model.QuotationModel;
import vn.vnext.sefuri.sf.module.export.model.R003Model;
import vn.vnext.sefuri.sf.module.export.model.R004Model;
import vn.vnext.sefuri.sf.module.export.model.R005Model;
import vn.vnext.sefuri.sf.module.export.model.Step;
import vn.vnext.sefuri.sf.module.export.model.r007.R007OrderHistoryC;
import vn.vnext.sefuri.sf.module.export.model.r007.R007ProductModelC;
import vn.vnext.sefuri.sf.module.export.model.r007.R007QuotationInfoC;
import vn.vnext.sefuri.sf.module.export.model.r009.R009ListProduct;
import vn.vnext.sefuri.sf.module.export.model.r009.R009Model;
import vn.vnext.sefuri.sf.module.export.model.r010.R010Model;
import vn.vnext.sefuri.sf.module.export.model.r010.R010ProductItemModel;
import vn.vnext.sefuri.sf.service.SV001AuthService;
import vn.vnext.sefuri.sf.service.SV006FileService;
import vn.vnext.sefuri.sf.service.SV008ProductService;
import vn.vnext.sefuri.sf.util.CollectionUtil;
import vn.vnext.sefuri.sf.util.DateUtil;
import vn.vnext.sefuri.sf.util.FormatUtil;

/**
 * Created by DungTQ on 5/19/2017.
 */
public class ReportBuilderImpl implements ReportBuilder {
    Logger logger = LoggerFactory.getLogger(ReportBuilderImpl.class);

    @Inject
    private CustomerDao customerDao;

    @Inject
    private SV008ProductService sv008ProductService;

    @Inject
    private SV006FileService sv006FileService;

    @Inject
    private SV001AuthService authService;

    @Inject
    private QuotationDao quotationDao;

    @Inject
    private DealDao dealDao;

    @Inject
    private UserDao userDao;

    @Inject
    private DepartmentDao departmentDao;

    @Inject
    private QuotationItemDao quotationItemDao;

    @Inject
    private ProductOutputDao productOutputDao;

    @Inject
    private OfferDao offerDao;

    @Inject
    private ProductDao productDao;

    @Inject
    private DealProductDao dealProductDao;

    @Inject
    private OrderDao orderDao;

    @Inject
    private OrderItemDao orderItemDao;

    @Inject
    private MstPaperDao mstPaperDao;

    @Inject
    private MstLaminationDao mstLaminationDao;

    @Inject
    private CheckSheetDao checkSheetDao;

    @Inject
    private MstSheetSizeDao sheetSizeDao;

    @Inject
    private StepsHelper helper;

    @Inject
    private ProductSizeHelper productSizeHelper;

    @Inject
    private PackingHelper packingHelper;

    /** バーコードに関するヘルパー */
    @Inject
    private BarcodeHelper barcodeHelper;

    /** 原紙に関するヘルパー */
    @Inject
    private PaperHelper paperHelper;

    private String dateTimeFormatter1 = "MM月dd日";
    private String dateTimeFormatter2 = "yyyy/MM/dd";
    private String dateTimeFormatter3 = "yyyyMMdd";
    private static final String X_MULTI = " × ";
    private static final String CHECK_CIRCLE = "◯";
    private static final String PATTERN_FORMAT_DECIMAL = "#,000";
    private static final String COLOR_UNIT = "C";
    private int wastePaperFlag;
    private static final String CHECK_SLASH = "/";

    @Override
    public QuotationModel createQuotationModel(String quotationCode, int option) throws IOException {
        QuotationDto quotationDto = quotationDao.getQuotationByQuotationCode(quotationCode);
        quotationDto.setPrintTemplateId(option);
        // update quotation save option
        quotationDao.update(quotationDto);
        DealDto dealDto = dealDao.find(quotationDto.getDealId());

        List<QuotationItemDto> quotationItemDtos = new ArrayList<>();

        for (QuotationItemDto quotationItemDto : quotationItemDao.getQuotationItemsByQuotationId(quotationDto.getId())) {
            if (quotationItemDto.getDealProductId() != null && quotationItemDto.getItemType() == 3 ) {
                List<ProductOutputDto> productOutputDtos = productOutputDao.getProductOutputByDealProductId(quotationItemDto.getDealProductId());
                productOutputDtos.sort((o1, o2) -> {
                    if (o1.getLot() == null) {
                        o1.setLot(0);
                    }
                    if (o2.getLot() == null) {
                        o2.setLot(0);
                    }
                    if (o1.getLot() > o2.getLot()) {
                        return 1;
                    }
                    if (o1.getLot() < o2.getLot()) {
                        return -1;
                    }
                    return 0;
                });
                OfferDto tempOffer = new OfferDto();
                tempOffer.setUnitPrice(new BigDecimal(0));
                for (ProductOutputDto productOutputDto : productOutputDtos) {
                    // TODO: fix lot and quantity
                    if (quotationItemDto.getQuantity() == null) {
                        quotationItemDto.setQuantity(new BigDecimal(0));
                    }

                    if (productOutputDto.getLot() == null) {
                        productOutputDto.setLot(0);
                    }
                    if (quotationItemDto.getQuantity().compareTo(new BigDecimal(productOutputDto.getLot())) == 1
                            || quotationItemDto.getQuantity().compareTo(new BigDecimal(productOutputDto.getLot())) == 0) {
                        tempOffer = offerDao.getOfferByProductOutputId(productOutputDto.getId());
                        if (tempOffer != null) {
                            quotationItemDto.setSubmittedPrice(tempOffer.getUnitPrice());
                        } else {
                            quotationItemDto.setSubmittedPrice(new BigDecimal(0));
                        }
                    }
                }
                DealProductDto dealProductDto = dealProductDao.find(quotationItemDto.getDealProductId());
                ProductDto productDto = productDao.find(dealProductDto.getProductId());
                dealProductDto.setProduct(productDto);
                quotationItemDto.setDealProduct(dealProductDto);
            }
            quotationItemDtos.add(quotationItemDto);
        }
        quotationDto.setQuotationItems(quotationItemDtos);
        quotationDto.setDeal(dealDto);

        // get pic user and department
        UserDto picUser = null;
        if (dealDto.getCustomerId() != null) {
            CustomerDto customerDto = customerDao.findCustomerById(dealDto.getCustomerId());
            dealDto.setCustomer(customerDto);
        }
        if (dealDto.getSalesId() != null) {
            picUser = userDao.find(dealDto.getSalesId());
            if (picUser != null && picUser.getDepartmentId() != null) {
                DepartmentDto departmentDto = departmentDao.find(picUser.getDepartmentId());
                picUser.setDepartment(departmentDto);
            }
        }

        QuotationModel quotationModel = new QuotationModel(quotationDto, picUser);

        File file = ReportConf.getSealPath(option);
        InputStream fileInputStream = new FileInputStream(file);
        quotationModel.setfConDau1(fileInputStream);
        return quotationModel;
    }

    @Override
    public R003Model createR003Model(SF00309_RequestModelJson requestModel, SF003090_ParsedProductInfoJson product, DealDto deal) {
        R003Model model = new R003Model();
        CustomerDto customer = customerDao.findCustomerById(deal.getCustomerId());
        if (customer != null) {
            model.setfCus(customer.getName());
        } else {
            model.setfCus(deal.getCustomerName());
        }
        model.setfDate(DateUtil.formatDateJp(DateUtil.getSysDate()));
        model.setfDeal(deal.getDealCode());
        model.setfPro(product.getProductName());
        model.setfDeli(DateUtil.formatDateJp(requestModel.getDeliveryDate()) + Constants.SPACE + Strings.nullToEmpty(requestModel.getDesired()));
        model.setfQuan(requestModel.getDesiredNumber() != null ? String.valueOf("点" + requestModel.getDesiredNumber() + " セット") : "点   セット");
        if (CollectionUtil.isNotEmpty(requestModel.getSimultaneousRequest())) {
            model.setfReq(FormatUtil.concatItem(" ・", requestModel.getSimultaneousRequest().toArray(
                    new String[requestModel.getSimultaneousRequest().size()])));
        }
        model.setfNh("");//No description
        model.setfH("");//No description
        model.setfN("");//No description
        model.setfSale(authService.getCurrentUser().getUsername());

        model.setfSpb(requestModel.getInclusionText());
        model.setfPp(requestModel.getPreservationMethod());
        model.setfTl(requestModel.getIncludedWeightPerUnit() != null ? ("(" + requestModel.getIncludedWeightPerUnit() + "g)x(" +
                (requestModel.getIncludedCount() != null ? requestModel.getIncludedCount() + "個)" : Constants.BLANK)) : null);
        model.setfDd(requestModel.getSalesEstimate());
        model.setfVatLieu(Strings.nullToEmpty(requestModel.getMaterial()) != "その他" ? Strings.nullToEmpty(requestModel.getMaterial())
                : (Strings.nullToEmpty(requestModel.getMaterial()) + Constants.SPACE + "(" + Strings.nullToEmpty(requestModel.getMaterialOther()) + ")"));
        // 3067: [SF003-06/09/10 SF003-10] Hiển thị lỗi 500 sau khi request design, sample
        for (Enums.ProductType type : Enums.ProductType.values()) {
            if (type.getType() == product.getProductType()) {
                model.setfDinhDang(type.getName());
            }
        }
        model.setfChatLieu(product.getMaterial());
        model.setfSize(FormatUtil.formatDimension(null, product.getSizeW(), product.getSizeD(), product.getSizeH()));
        model.setfMemo(requestModel.getMemo());
        model.setfNoigui(requestModel.getDirectDestination());
        model.setfNgayUpdate("年       月    日改定");
        return model;
    }

    @Override
    public R004Model createR004Model(SF00309_RequestModelJson requestModel, SF003090_ParsedProductInfoJson product, DealDto deal) {
        R004Model model = new R004Model();
        CustomerDto customer = customerDao.findCustomerById(deal.getCustomerId());
        if (customer != null) {
            model.setfCus(customer.getName());
        } else {
            model.setfCus(deal.getCustomerName());
        }
        model.setfDate(DateUtil.formatDateJp(DateUtil.getSysDate()));
        model.setF1("");//No description
        model.setF2("");//No description
        model.setF3("");//No description
        model.setF4("");//No description
        model.setF5("");//No description
        model.setF6(authService.getCurrentUser().getUsername());
        model.setfSpbt(Strings.nullToEmpty(requestModel.getInclusion()) != "その他" ? Strings.nullToEmpty(requestModel.getInclusion())
                : (Strings.nullToEmpty(requestModel.getInclusion()) + Constants.SPACE + "(" + Strings.nullToEmpty(requestModel.getOther()) + ")"));
        model.setfTttx(requestModel.getContactState());
        model.setfEndUser(requestModel.getEndUser());
        model.setfPhamVipp(requestModel.getDistributionRange());
        model.setfSoluongSx(requestModel.getSalesEstimate());//TODO CHECK_CIRCLE data send
        model.setfDeal(deal.getDealCode());
        model.setfPro(product.getProductName());
        model.setfDeli(DateUtil.formatDateJp(requestModel.getDeliveryDate()) + Constants.SPACE + Strings.nullToEmpty(requestModel.getDesired()));
        model.setfQuan(requestModel.getDesiredNumber() != null ? String.valueOf("点" + requestModel.getDesiredNumber() + " セット") : "点   セット");

        model.setfVatLieu(Strings.nullToEmpty(requestModel.getMaterial()) != "その他" ? Strings.nullToEmpty(requestModel.getMaterial())
                : (Strings.nullToEmpty(requestModel.getMaterial()) + Constants.SPACE + "(" + Strings.nullToEmpty(requestModel.getMaterialOther()) + ")"));
        model.setfNoigui(requestModel.getDirectDestination());
        model.setfNgayUpdate("年       月    日改定");
        model.setfChatlieu("");//No description
        model.setfPp(requestModel.getPreservationMethod());
        model.setfTl(requestModel.getIncludedWeightPerUnit() != null ? ("(" + requestModel.getIncludedWeightPerUnit() + "g)x(" +
                (requestModel.getIncludedCount() != null ? requestModel.getIncludedCount() + "個)" : Constants.BLANK)) : null);
        model.setfFill(requestModel.getFillingMethod());
        if (CollectionUtil.isNotEmpty(requestModel.getSimultaneousRequest())) {
            model.setfReq(FormatUtil.concatItem(" ・", requestModel.getSimultaneousRequest().toArray(
                    new String[requestModel.getSimultaneousRequest().size()])));
        }

        model.setfThamKhao("");//No description
        model.setfPaper(product.getMaterial());
        model.setfKichthuoc(FormatUtil.formatDimension(null, product.getSizeW(), product.getSizeD(), product.getSizeH()));
        // 3067: [SF003-06/09/10 SF003-10] Hiển thị lỗi 500 sau khi request design, sample
        for (Enums.ProductType type : Enums.ProductType.values()) {
            if (type.getType() == product.getProductType()) {
                model.setfDinhdang(type.getName());
            }
        }
        model.setfNotes(requestModel.getMemo());
        return model;
    }

    @Override
    public ProductModel createProductModel(final DealDto deal, final ProductDto productDto) throws FileNotFoundException {
        wastePaperFlag = 0;
        final String color = "  色";

        // Get customer info
        CustomerDto customer = null;
        if (deal.getCustomerId() != null) {
            customer = customerDao.findCustomerById(deal.getCustomerId());
        }

        //get checksheet
        List<ChecksheetDto> checksheets = checkSheetDao.getCheckSheetsByDealId(deal.getId());
        Map<Integer, ChecksheetDto> checkSheetMap = new HashMap<>();
        if (!CollectionUtils.isEmpty(checksheets)) {
            for (ChecksheetDto checksheetDto : checksheets) {
                checkSheetMap.put(checksheetDto.getQuestionCode(), checksheetDto);
            }
        }

        // Generate model
        ProductModel model = new ProductModel();

        //I. Phần header

        //1.2. 初回作成日/ Ngày tạo lần đầu
        String fcreateDate = StringUtils.EMPTY;
        if (productDto.getCreateRequestDesignDate() != null) {
            fcreateDate = DateUtil.formatDate(productDto.getCreateRequestDesignDate(), dateTimeFormatter2);
        }
        model.setfCreateDate(fcreateDate);
        //1.3. 改定日/ Ngày chỉnh sửa

        // 11.2 Updated Date
        String updatedDate = StringUtils.EMPTY;
        if (productDto.getUpdateRequestDesignDate() != null) {
            updatedDate = DateUtil.formatDate(productDto.getUpdateRequestDesignDate(), dateTimeFormatter2);
        }
        model.setfUpdateDate(updatedDate);

        //1.1. 登録No./ No. đăng ký
        model.setfProductId(productDto.getItemCode());

        if (customer != null) {
            //1.4.  得意先コード/ Customer code
            model.setfCusCode(customer.getCustomerCode());

            //1.5. 得意先名/ Customer name
            model.setfCusName(customer.getName());
        }
        //1.6. 品名/ Product name
        model.setfProName(productDto.getProductName());

        //II. Các loại code

        //2.1. フィルムNo./ Film No.【Cùng độ lớn CTP】
        model.setfFilmNo(productDto.getFilmCode());

        //2.2. コーター版管理No./ No. quản lý bản coater
        model.setfBlank1(Constants.BLANK);

        model.setfBlank2(Constants.BLANK);
        model.setfCoater1(Constants.BLANK);
        model.setfCoater2(Constants.BLANK);

        //2.3. 木型No./ No. khuôn gỗ
        //wooden_code_2 varchar(20) get
        // check on share_wooden_flag1 int(1);share_wooden_flag2 int(1); flag 2 chỉ hộp giấy mới được chọn

/* TODO case check wooden input join table master data wooden
        Integer count = 0;
        Integer count_1 = 0;
        if (productDto.getWoodenCode() != null) {
            count = sv008ProductService.sv00841coutGoodenCodeCommon(productDto.getWoodenCode());
        }
        if (productDto.getWoodenCode2() != null) {
            count_1 = sv008ProductService.sv00841coutGoodenCodeCommon(productDto.getWoodenCode2());
        }
        if (count >= 1) {
            model.setfKhuonGo(productDto.getWoodenCode());
        }
        if (count_1>=1) {
            model.setfKhuonGo(productDto.getWoodenCode2());
        }
        if (count >= 1 && count_1>= 1) {
            model.setfKhuonGo(productDto.getWoodenCode()+ CHECK_SLASH + productDto.getWoodenCode2());
        }
        //兼用/ Dùng chung
        if ((productDto.getShareWoodenFlag1() != null && productDto.getShareWoodenFlag1() == 1 && count >= 1) ||
                (productDto.getShareWoodenFlag2() != null && productDto.getShareWoodenFlag2() == 2 && count_1 >= 1)) {
            model.setCommonGCode("兼用");
        } else
            model.setCommonGCode("");
*/
        if (!Strings.isNullOrEmpty(productDto.getWoodenCode()) && !Strings.isNullOrEmpty(productDto.getWoodenCode2())) {
            model.setfKhuonGo(productDto.getWoodenCode());
            model.setfBlank2(productDto.getWoodenCode2());
        } else if (!Strings.isNullOrEmpty(productDto.getWoodenCode()) && Strings.isNullOrEmpty(productDto.getWoodenCode2())) {
            model.setfKhuonGo(productDto.getWoodenCode());
        } else if (!Strings.isNullOrEmpty(productDto.getWoodenCode2()) && Strings.isNullOrEmpty(productDto.getWoodenCode())) {
            model.setfKhuonGo(productDto.getWoodenCode2());
        } else model.setfKhuonGo(Constants.BLANK);

        if ((productDto.getShareWoodenFlag1() != null && productDto.getShareWoodenFlag1() == 1) ||
                (productDto.getShareWoodenFlag2() != null && productDto.getShareWoodenFlag2() == 1)) {
            model.setCommonGCode("兼用");
        }
        if ((productDto.getShareWoodenFlag1() != null && productDto.getShareWoodenFlag1() == 1) &&
                (productDto.getShareWoodenFlag2() != null && productDto.getShareWoodenFlag2() == 1)) {
            model.setCommonGCode("兼用");
            model.setCommonGCode2("兼用");
        }

        //2.4. 金型No./ No. khuôn
        model.setfKhuon(Constants.BLANK);

        //2.5. ゴム版外注先/ Nơi order bên ngoài bản cao su
        model.setfNoiOrder(Constants.BLANK);

        // refer to sv00836GetMemoProduct
        //2.6. 特記事項/ Mục ghi chú
        // Start: Fix bug 3444
        if (productDto.getMemo1() != null) {
            model.setfMemo1(productDto.getMemo1());
        } else {
            model.setfMemo1(Constants.BLANK);
        }

        if (productDto.getMemo2() != null) {
            model.setfMemo2(productDto.getMemo2());
        } else {
            model.setfMemo2(Constants.BLANK);
        }

        if (productDto.getMemo3() != null) {
            model.setfMemo3(productDto.getMemo3());
        } else {
            model.setfMemo3(Constants.BLANK);
        }
        // End: Fix bug 3444

        //2.7. サンプルNo./ Sample No.
        if (productDto.getSampleNo() != null) {
            model.setfSample(productDto.getSampleNo());
        } else {
            model.setfSample(Constants.BLANK);
        }

        //2.8. 包装区分/ Phân loại đóng gói.
        ChecksheetDto checksheetDto0 = checkSheetMap.get(1003);
        if (checksheetDto0 != null) {
            if (checksheetDto0.getRadioButton() != null && checksheetDto0.getRadioButton() == 1) {
                model.setfLoaiGoi("対象");
            }
            if (checksheetDto0.getRadioButton() != null && checksheetDto0.getRadioButton() == 2) {
                model.setfLoaiGoi("対象外");
            }
        }

        //2.9-10-11 バーコード
        if (!productDto.hasBarcode()) {
            // 製品情報にバーコードがなければチェックシートのものを使用する
            productDto.fillBarcodeFromChecksheet(checksheets);
        }
        BarcodeField[] barcodeFields = barcodeHelper.createBarcodeFields(productDto);
        model.setBarcode1(barcodeFields[0]);
        model.setBarcode2(barcodeFields[1]);
        model.setBarcode3(barcodeFields[2]);


        List<OrderItemDto> orderItemDtos = orderItemDao.getOrderItemsByDealId(deal.getId());
        if (orderItemDtos.size() > 0) {
            for (OrderItemDto orderItemDto : orderItemDtos) {
                if (orderItemDto.getProductId().equals(productDto.getId())) {

                    //9.4. 数量/ Quantity
                    // 数量 = ロット数 + 各種サンプル数
                    Integer quantity = orderItemDto.getQuantity();
                    Integer sampleLift = orderItemDto.getSampleLift();
                    Integer sampleSales = orderItemDto.getSampleSales();
                    Integer sampleCustomer = orderItemDto.getSampleCustomer();
                    Integer sampleItem = orderItemDto.getSampleItem();
                    Integer sampleProduct = orderItemDto.getSampleProduct();
                    if(quantity == null) quantity = 0;
                    if(sampleLift == null) sampleLift = 0;
                    if(sampleSales == null) sampleSales = 0;
                    if(sampleCustomer == null) sampleCustomer = 0;
                    if(sampleItem == null) sampleItem = 0;
                    if(sampleProduct == null) sampleProduct = 0;
                    Integer summary = quantity + sampleLift + sampleSales + sampleCustomer + sampleItem + sampleProduct;
                    model.setQuantity(String.valueOf(summary));

                    //9.5. 納品日/ Ngày delivery
                    String createDate = StringUtils.EMPTY;
                    if (productDto.getCreatedDate() != null) {
                        createDate = DateUtil.formatDate(orderItemDto.getCreatedDate(), dateTimeFormatter1);
                    }
                    model.setDeliveryDate(createDate);

                    //2.12. 抜上りサンプル
                    model.setfExtrac((orderItemDto.getSampleLift() == null || orderItemDto.getSampleLift() == 0) ? Constants.BLANK : String.valueOf(orderItemDto.getSampleLift()));
                    //2.13. 営業サンプル/ Sales sample
                    model.setfSales((orderItemDto.getSampleSales() == null || orderItemDto.getSampleSales() == 0) ? Constants.BLANK : String.valueOf(orderItemDto.getSampleSales()));
                    //2.14. 得意先サンプル/ Customer sample
                    model.setfCus((orderItemDto.getSampleCustomer() == null || orderItemDto.getSampleCustomer() == 0) ? Constants.BLANK : String.valueOf(orderItemDto.getSampleCustomer()));
                    // 6. 製造仕様書/  Production specs
                    if (orderItemDto.getProductionSpecs() != null) {
                        if (orderItemDto.getProductionSpecs() == 1) {
                            model.setProductionSpecs("新");
                        } else if (orderItemDto.getProductionSpecs() == 2) {
                            model.setProductionSpecs("改");
                        } else if (orderItemDto.getProductionSpecs() == 3) {
                            model.setProductionSpecs("修");
                        } else if (orderItemDto.getProductionSpecs() == 4) {
                            model.setProductionSpecs("有");
                        } else {
                            model.setProductionSpecs(StringUtils.EMPTY);
                        }
                    } else {
                        model.setProductionSpecs(StringUtils.EMPTY);
                    }

                    // 7. 印刷版/ Bản in
                    if (orderItemDto.getProductionSpecs() != null) {
                        if (orderItemDto.getPrintVersion() == 1) {
                            model.setPrintingVersion("なし");
                        } else if (orderItemDto.getPrintVersion() == 2) {
                            model.setPrintingVersion("新");
                        } else if (orderItemDto.getPrintVersion() == 3) {
                            model.setPrintingVersion("修");
                        } else if (orderItemDto.getPrintVersion() == 4) {
                            model.setPrintingVersion("有");
                        } else {
                            model.setPrintingVersion(StringUtils.EMPTY);
                        }
                    } else {
                        model.setPrintingVersion(StringUtils.EMPTY);
                    }

                    // 8. 木型/ Khuôn gỗ
                    if (orderItemDto.getWooden() != null) {
                        if (orderItemDto.getWooden() == 1) {
                            model.setWooden("なし");
                        } else if (orderItemDto.getWooden() == 2) {
                            model.setWooden("新");
                        } else if (orderItemDto.getWooden() == 3) {
                            model.setWooden("修");
                        } else if (orderItemDto.getWooden() == 4) {
                            model.setWooden("有");
                        } else {
                            model.setWooden(StringUtils.EMPTY);
                        }
                    } else {
                        model.setWooden(StringUtils.EMPTY);
                    }

                    // 9. 金型/ Khuôn
                    String mold = "新・有";
                    if (orderItemDto.getMold() != null) {
                        if (orderItemDto.getMold() == 1) {
                            model.setMold("なし");
                        } else if (orderItemDto.getMold() == 2) {
                            model.setMold("新");
                        } else if (orderItemDto.getMold() == 4) {
                            model.setMold("有");
                        } else {
                            model.setMold(StringUtils.EMPTY);
                        }
                    } else {
                        model.setMold(StringUtils.EMPTY);
                    }
                    //通函受注No.  http://fridaynight.vnext.vn/issues/3440
                    //http://fridaynight.vnext.vn/issues/3464
                    if (deal.getDealStatus() == null || deal.getDealStatus() < 4) {
                        model.setPassageOrder(Constants.BLANK);
                    } else
                        model.setPassageOrder(orderItemDto.getPassageOrder() == null ? "" : String.valueOf(orderItemDto.getPassageOrder()));


                    //特記事項/ Mục ghi chú
                    model.setSpecialNote(orderItemDto.getSpecialNote());

                }
            }
        }
        //III. 数量制限/ Hạn chế số lượng
        // 3.1
        ChecksheetDto checksheetDto;
        checksheetDto = checkSheetMap.get(1008);
        if (checksheetDto != null) {
            if (checksheetDto.getSelectBox1() != null) {
                Integer limitQuantity = checksheetDto.getSelectBox1();
                switch (limitQuantity) {
                    case 1:
                        model.setfColorT("◯");
                        model.setfColorS("◯");
                        model.setCheckColorT(1);
                        model.setCheckColorS(1);
                        break;
                    case 2:
                        model.setfColorT("◯");
                        model.setfColorS("×");
                        model.setCheckColorT(1);
                        model.setCheckColorS(2);
                        break;
                    case 3:
                        model.setfColorT("×");
                        model.setfColorS("◯");
                        model.setCheckColorT(2);
                        model.setCheckColorS(1);
                        break;
                    case 4:
                        model.setfColorT("×");
                        model.setfColorS("×");
                        model.setCheckColorT(2);
                        model.setCheckColorS(2);
                        break;
                    case 5:
                        model.setfColorT("＃");
                        model.setfColorS("◯");
                        model.setCheckColorT(3);
                        model.setCheckColorS(1);
                        break;
                    case 6:
                        model.setfColorT("◯");
                        model.setfColorS("＃");
                        model.setCheckColorT(1);
                        model.setCheckColorS(3);
                        break;
                    case 7:
                        model.setfColorT("＃");
                        model.setfColorS("×");
                        model.setCheckColorT(3);
                        model.setCheckColorS(2);
                        break;
                    case 8:
                        model.setfColorT("×");
                        model.setfColorS("＃");
                        model.setCheckColorT(2);
                        model.setCheckColorS(3);
                        break;
                    case 9:
                        model.setfColorT("＃");
                        model.setfColorS("＃");
                        model.setCheckColorT(3);
                        model.setCheckColorS(3);
                        break;
                    default:
                        model.setfColorT(Constants.BLANK);
                        model.setfColorS(Constants.BLANK);
                        break;
                }
            }
            String numIm = (checksheetDto.getTextArea1() == null || checksheetDto.getTextArea1().equals("0")) ? "" : checksheetDto.getTextArea1();
            String unit;
            Integer valueUnit = checksheetDto.getSelectBox2() == null ? 0 : checksheetDto.getSelectBox2();
            switch (valueUnit) {
                case 1:
                    unit = "％";
                    break;
                case 2:
                    unit = "枚";
                    break;
                case 3:
                    unit = "箱";
                    break;
                case 4:
                    unit = "梱包";
                    break;
                case 5:
                    unit = "結束";
                    break;
                case 6:
                    unit = "全数";
                    break;
                default:
                    unit = "";
                    break;
            }
            Integer valueClassify = checksheetDto.getSelectBox3() == null ? 0 : checksheetDto.getSelectBox3();
            String classify = StringUtils.EMPTY;
            switch (valueClassify) {
                case 1:
                    classify = "以上";
                    break;
                case 2:
                    classify = "以内";
                    break;
                case 3:
                    classify = "未満";
                    break;
                case 4:
                    classify = "全数";
                    break;
                default:
                    classify = "";
                    break;
            }
            //3.2
            model.setfNumber(numIm + " " + unit + " " + classify);
        }

        //IV. START - 生産工程/ Công đoạn sản xuất

        List<Step> listStep1;
        List<Step> listStep2 = new ArrayList<>();
        listStep1 = helper.getListStepData(productDto);

        if (listStep1.size() >= 6) {
            listStep2 = listStep1.subList(6, listStep1.size());
            listStep1 = listStep1.subList(0, 6);
        }
        model.setListstep1(listStep1);
        model.setListstep2(listStep2);

        //IV. END - 生産工程/ Công đoạn sản xuất

        //V. 箔押/ Mạ http://fridaynight.vnext.vn/issues/2981
        model.setfMa1(productDto.getFoilColor1());
        model.setfMa2(productDto.getFoilColor2());
        model.setfMa3(productDto.getFoilColor3());

        //VI. 梱包/ Đóng gói
        if (productDto.getPackingId() != null) {
            if (productDto.getPackingId() == 2 || productDto.getPackingId() == 6 || productDto.getPackingId() == 7) {
                // 社用通函
                model.setDG1(CHECK_CIRCLE);
            }
            if (productDto.getPackingId() == 3 || productDto.getPackingId() == 6 || productDto.getPackingId() == 7) {
                // 専用通函
                model.setDG2(CHECK_CIRCLE);
            }
            if (productDto.getPackingId() == 9 || productDto.getPackingId() == 5 || productDto.getPackingId() == 7) {
                // クラフト梱包
                model.setDG3(CHECK_CIRCLE);
            }
            if (productDto.getPackingId() == 9 || productDto.getPackingId() == 8) {
                // クラフト胴巻
                model.setDG4(CHECK_CIRCLE);

            }
            if (productDto.getPackingId() == 4 || productDto.getPackingId() == 6 || productDto.getPackingId() == 8) {
                // シュリンク梱包
                model.setDG5(CHECK_CIRCLE);
            }
            if (productDto.getPackingId() == 1) {
                // 結束/ Buộc
                model.setDG6(CHECK_CIRCLE);
            }
        }
        //メモ/ Memo fix bug 3316
        if (productDto.getPackingNote() != null) {
            model.setMemoDG(productDto.getPackingNote());
        } else {
            model.setMemoDG(Constants.BLANK);
        }
        //No. 通函No
        model.setPassageNo(productDto.getPassageNo());
        //入. "入り数/ Số lượng cho vào"
        model.setPackingInputNumber(productDto.getPackingInputNumber() == null || productDto.getPackingInputNumber() == 0 ? "" : String.valueOf(productDto.getPackingInputNumber()));

        //VII. 色表/ Màu mặt trước + sau
        //http://fridaynight.vnext.vn/issues/3481
        ColorAndSurfaceTreatment frontColorAndSurfaceTreatment = frontColorAndSurfaceTreatment(productDto);

        // 色数 (表)
        model.setfSoTr(this.formatColorsViaPrintMethod(productDto.getPrintMethod(), frontColorAndSurfaceTreatment));

        // 使用色 (表)
        List<String> frontColorNames = getColorDisplayNames(frontColorAndSurfaceTreatment(productDto));
        model.setfT1(frontColorNames.size() >= 1 ? frontColorNames.get(0) : Constants.BLANK);
        model.setfT2(frontColorNames.size() >= 2 ? frontColorNames.get(1) : Constants.BLANK);
        model.setfT3(frontColorNames.size() >= 3 ? frontColorNames.get(2) : Constants.BLANK);
        model.setfT4(frontColorNames.size() >= 4 ? frontColorNames.get(3) : Constants.BLANK);
        model.setfT5(frontColorNames.size() >= 5 ? frontColorNames.get(4) : Constants.BLANK);
        model.setfT6(frontColorNames.size() >= 6 ? frontColorNames.get(5) : Constants.BLANK);
        model.setfT7(frontColorNames.size() >= 7 ? frontColorNames.get(6) : Constants.BLANK);
        model.setfT8(frontColorNames.size() >= 8 ? frontColorNames.get(7) : Constants.BLANK);

        if ((productDto.getShapeId() != null && (productDto.getShapeId() != 98) || productDto.getShapeId() == null)) {
            ColorAndSurfaceTreatment backColorAndSurfaceTreatment = backColorAndSurfaceTreatment(productDto);

            // 色数 (裏)
            model.setfSoS(this.formatColorsViaPrintMethod(productDto.getPrintMethod(), backColorAndSurfaceTreatment));

            // 使用色 (裏)
            List<String> backColorNames = getColorDisplayNames(backColorAndSurfaceTreatment);
            model.setfS1(backColorNames.size() >= 1 ? backColorNames.get(0) : Constants.BLANK);
            model.setfS2(backColorNames.size() >= 2 ? backColorNames.get(1) : Constants.BLANK);
            model.setfS3(backColorNames.size() >= 3 ? backColorNames.get(2) : Constants.BLANK);
            model.setfS4(backColorNames.size() >= 4 ? backColorNames.get(3) : Constants.BLANK);
        }

        //IX.  受注内容/ Nội dung order
        //9.1. 生産工場/ Nhà máy sản xuất
        Integer factoryId = productDto.getFactoryId() == null ? 0 : productDto.getFactoryId();

        switch (factoryId) {
            case 1:
                model.setFactory("佐賀工場");
                break;
            case 2:
                model.setFactory("小野工場");
                break;
            case 3:
                model.setFactory("多久工場");
                break;
            case 4:
                model.setFactory("他社工場（商事）");
                break;
            default:
                model.setFactory(Constants.BLANK);
        }

        String orderDate;
        List<OrderItemDto> orderItemDtosSample = orderItemDao.getOrderItemsByDealId(deal.getId());
        if (!orderItemDtosSample.isEmpty()) {
            for (OrderItemDto orderItemDto : orderItemDtosSample) {
                if (orderItemDto.getProductId().equals(productDto.getId())) {
                    orderDate = orderItemDto.getCreatedDate().toString(dateTimeFormatter1);
                    //9.2. 受注月日/ Ngày tháng order
                    model.setOrderDate(orderDate);
                    //9.3. 受注番号/ Order No
                    model.setOrderNo(orderItemDto.getOrderCode());
                }
            }
        }
        String quantity = "0";
        if (productDto.getRequestLot() != null) {
            quantity = productDto.getRequestLot().toString();
        }

        // II. Back
        // II. Back
        // 1. 受注履歴/ Order history
        List<R007OrderHistoryC> listOrderHistory1 = new ArrayList<>();
        List<R007OrderHistoryC> listOrderHistory2 = new ArrayList<>();
        List<OrderItemDto> orderItemDtosHistory = orderItemDao.getOrderItemsByProductId(productDto.getId());
        if (!orderItemDtosHistory.isEmpty()) {
            for (OrderItemDto item : orderItemDtosHistory) {
                R007OrderHistoryC r007OrderHistoryC = new R007OrderHistoryC();
                // 1.1. 受注日/ Ngày order
                r007OrderHistoryC.setOrderHistory(DateUtil.formatDate(item.getCreatedDate(), dateTimeFormatter3));

                // 1.2. 数量/ Quantity
                if (item.getQuantity() != null) {
                    r007OrderHistoryC.setQuantityHistory(String.valueOf(item.getQuantity()));
                } else {
                    r007OrderHistoryC.setQuantityHistory(StringUtils.EMPTY);
                }

                // 1.3. 単価/ Unit price
                if (item.getSubmittedPrice() != null) {
                    r007OrderHistoryC.setUnitPriceHistory(String.valueOf(item.getSubmittedPrice()));
                } else {
                    r007OrderHistoryC.setUnitPriceHistory(StringUtils.EMPTY);
                }

                // 1.4. 納期/ Delivery date
                DealDto dealDtoHistory = dealDao.getDealDtoByOrderId(item.getOrderId());
                if (dealDtoHistory != null) {
                    if (dealDtoHistory.getDeliveryDate() != null) {
                        r007OrderHistoryC.setDeliveryDateHistory(DateUtil.formatDate(dealDtoHistory.getDeliveryDate(), dateTimeFormatter3));
                    } else {
                        r007OrderHistoryC.setDeliveryDateHistory(StringUtils.EMPTY);
                    }
                } else {
                    r007OrderHistoryC.setDeliveryDateHistory(StringUtils.EMPTY);
                }

                if (listOrderHistory1.size() < 24) {
                    listOrderHistory1.add(r007OrderHistoryC);
                } else {
                    listOrderHistory2.add(r007OrderHistoryC);
                }
            }
            model.setOrderhistoryLists1(listOrderHistory1);
            model.setOrderhistoryLists2(listOrderHistory2);
        }
        // 2. 見積情報/ Thông tin QTN
        // 2.1. ロット/ Lot
        // 2.2. 単価/ Unit price
        DealProductDto dealProductDto = dealProductDao.getDealProductByDealIdAndProductId(deal.getId(), productDto.getId());
        if (dealProductDto != null) {
            List<QuotationItemDto> quotationItemDtos = quotationItemDao.getQuotationItemsByDealProductId(dealProductDto.getId());
            if (!quotationItemDtos.isEmpty()) {
                List<R007QuotationInfoC> r007QuotationInfoCS = new ArrayList<>();
                for (QuotationItemDto quotationItemDto : quotationItemDtos) {
                    R007QuotationInfoC r007QuotationInfoC = new R007QuotationInfoC();
                    if (quotationItemDto.getQuantity() != null) {
                        r007QuotationInfoC.setLot(String.valueOf(quotationItemDto.getQuantity()));
                    }
                    if (quotationItemDto.getSubmittedPrice() != null) {
                        r007QuotationInfoC.setUnitPrice(String.valueOf(quotationItemDto.getSubmittedPrice()));
                    }
                    r007QuotationInfoCS.add(r007QuotationInfoC);
                }
                model.setQtnLists(r007QuotationInfoCS);
            }
        }

        // 3. マスタ項目/ Item master
        // 3.1. 末端業種区分/ Phân loại end business type
        checksheetDto = checkSheetMap.get(1010);
        if (checksheetDto != null) {
            if (checksheetDto.getSelectBox1() != null) {
                if (checksheetDto.getSelectBox1() == 1) {
                    model.setClassificationEndIndustry("食料品製造業");
                } else if (checksheetDto.getSelectBox1() == 2) {
                    model.setClassificationEndIndustry("清涼飲料製造業及び茶");
                } else if (checksheetDto.getSelectBox1() == 3) {
                    model.setClassificationEndIndustry("酒類製造業");
                } else if (checksheetDto.getSelectBox1() == 4) {
                    model.setClassificationEndIndustry("油脂加工製品・石鹸");
                } else if (checksheetDto.getSelectBox1() == 5) {
                    model.setClassificationEndIndustry("医薬品製造業");
                } else if (checksheetDto.getSelectBox1() == 6) {
                    model.setClassificationEndIndustry("化粧品・歯磨・その他");
                } else if (checksheetDto.getSelectBox1() == 7) {
                    model.setClassificationEndIndustry("小売業");
                } else if (checksheetDto.getSelectBox1() == 8) {
                    model.setClassificationEndIndustry("その他の業種");
                } else {
                    model.setClassificationEndIndustry(StringUtils.EMPTY);
                }
            } else {
                model.setClassificationEndIndustry(StringUtils.EMPTY);
            }
        } else {
            model.setClassificationEndIndustry(StringUtils.EMPTY);
        }

        // 3.2. 容器包装区分/ Phân loại đóng gói bao bì đồ đựng
        // 3.3. 費用負担有無/ Có - không chịu chi phí
        // 3.4. 廃棄種別/ Phân loại hủy
        checksheetDto = checkSheetMap.get(1011);
        if (checksheetDto != null) {
            if (checksheetDto.getSelectBox1() != null) {
                if (checksheetDto.getSelectBox1() == 111) {
                    model.setClassificationPackagingContainer("段ｼｰﾄ（容器包装以外)");
                } else if (checksheetDto.getSelectBox1() == 112) {
                    model.setClassificationPackagingContainer("段ｹｰｽ (容器包装)");
                } else if (checksheetDto.getSelectBox1() == 221) {
                    model.setClassificationPackagingContainer("紙器 紙器製品");
                } else if (checksheetDto.getSelectBox1() == 223) {
                    model.setClassificationPackagingContainer("紙器 美粧シート");
                } else if (checksheetDto.getSelectBox1() == 224) {
                    model.setClassificationPackagingContainer("紙器 美粧ケース");
                } else if (checksheetDto.getSelectBox1() == 225) {
                    model.setClassificationPackagingContainer("紙器 貼合シート");
                } else if (checksheetDto.getSelectBox1() == 226) {
                    model.setClassificationPackagingContainer("紙器 貼合ケース");
                } else if (checksheetDto.getSelectBox1() == 331) {
                    model.setClassificationPackagingContainer("商事 段ボール");
                } else if (checksheetDto.getSelectBox1() == 332) {
                    model.setClassificationPackagingContainer("商事 紙器");
                } else if (checksheetDto.getSelectBox1() == 333) {
                    model.setClassificationPackagingContainer("商事 美粧ケース");
                } else if (checksheetDto.getSelectBox1() == 334) {
                    model.setClassificationPackagingContainer("商事 貼合ケース");
                } else if (checksheetDto.getSelectBox1() == 341) {
                    model.setClassificationPackagingContainer("商事 ガラスビン");
                } else if (checksheetDto.getSelectBox1() == 342) {
                    model.setClassificationPackagingContainer("商事 ＰＥＴボトル");
                } else if (checksheetDto.getSelectBox1() == 343) {
                    model.setClassificationPackagingContainer("商事 その他紙製容器");
                } else if (checksheetDto.getSelectBox1() == 344) {
                    model.setClassificationPackagingContainer("商事 その他プラ容器");
                } else if (checksheetDto.getSelectBox1() == 351) {
                    model.setClassificationPackagingContainer("商事 容器包装以外");
                } else if (checksheetDto.getSelectBox1() == 999) {
                    model.setClassificationPackagingContainer("容器以外及び対象外");
                } else {
                    model.setClassificationPackagingContainer(StringUtils.EMPTY);
                }
            }

            if (checksheetDto.getRadioButton() != null) {
                if (checksheetDto.getRadioButton() == 1) {
                    model.setIsExpenseBurden("あり");
                } else if (checksheetDto.getRadioButton() == 2) {
                    model.setIsExpenseBurden("なし");
                } else if (checksheetDto.getRadioButton() == 3) {
                    model.setIsExpenseBurden("容器以外及び対象外");
                } else {
                    model.setIsExpenseBurden(StringUtils.EMPTY);
                }
            }

            if (checksheetDto.getSelectBox2() != null) {
                if (checksheetDto.getSelectBox2() == 1) {
                    model.setDecompositionType("一般廃棄物");
                } else if (checksheetDto.getSelectBox2() == 2) {
                    model.setDecompositionType("事業系廃棄物");
                } else if (checksheetDto.getSelectBox2() == 3) {
                    model.setDecompositionType("海外廃棄物");
                } else if (checksheetDto.getSelectBox2() == 9) {
                    model.setDecompositionType("容器以外及び対象外");
                } else {
                    model.setDecompositionType(StringUtils.EMPTY);
                }
            }
        } else {
            model.setClassificationPackagingContainer(StringUtils.EMPTY);
            model.setIsExpenseBurden(StringUtils.EMPTY);
            model.setDecompositionType(StringUtils.EMPTY);
        }

        //1. get productDto file
        ProductFileDto productFile = sv008ProductService.sv00829GetPrimaryProductFile(productDto.getId());
        if (productFile != null) {
            //2. get file dto
            FileDto fileDto = sv006FileService.sv00609GetFileInfo(productFile.getFileId());
            if (fileDto != null) {
                //3. get actual file
                File file;
                //http://fridaynight.vnext.vn/issues/3491
                if ("pdf".equals(fileDto.getFileExtension().toLowerCase())) { // pdf file - get thumbnail
                    file = sv006FileService.sv00622GetThumbnail(fileDto.getFileCode());
                } else { // images file
                    file = sv006FileService.sv00606GetFile(fileDto.getFileCode());
                }

                //4. fill file stream to model
                if (file != null)
                    model.setfImagine(new FileInputStream(file));
            }
        }

        //TODO VŨ http://fridaynight.vnext.vn/issues/3446  line 77 to 80 tài liệu R007

        // Implement follow 2982
        Integer laminationWidth = productDto.getLaminationWidth() == null ? 0 : productDto.getLaminationWidth();
        Integer laminationNumber = productDto.getLaminationNumber() == null ? 0 : productDto.getLaminationNumber();

        // if shape id 98 get paperSizeW
        Integer cutPaperSizeW = 0;
        if (productDto.getShapeId() != null && productDto.getShapeId() == 98) {
            cutPaperSizeW = productDto.getCutPaperSizeW() != null ? productDto.getCutPaperSizeW().intValue() : 0;
        } else {
            cutPaperSizeW = productDto.getCutPaperSizeW() == null ? 0 : Integer.parseInt(productDto.getCutPaperSizeW().setScale(0, BigDecimal.ROUND_HALF_UP).toString());
        }
        Integer takenNumber = productDto.getTakenNumber() == null ? 0 : productDto.getTakenNumber();

        // 原紙巾（表）/ Paper width (mặt trước) mỹ phẩm
        String paperValue = null;
        BigDecimal paperWidth = null;
        if (productDto.getProductType() == 0 && productDto.getShapeId() != null && productDto.getShapeId() == 98) {  // 美粧
        		final int keshoDachiMm = 10;		// 美粧の化粧断ちサイズ
            paperWidth = BigDecimal.valueOf(cutPaperSizeW * takenNumber + keshoDachiMm);
            List<MstSheetSizeDto> mstSheetSizeFrontDtos = Lists.newArrayList();
            List<MstSheetSizeDto> mstSheetSizeMediumDtos = Lists.newArrayList();
            List<MstSheetSizeDto> mstSheetSizeBackDtos = Lists.newArrayList();

            if (productDto.getLaminationPaperTypeFront() != null && productDto.getLaminationPaperTypeFront() != 100) {
                mstSheetSizeFrontDtos = sheetSizeDao.getSheetSizeByLaminationTypeAndWeight(productDto.getLaminationPaperTypeFront(), productDto.getLaminationFrontBasicWeight());
            } else {
                if (productDto.getLaminationFrontId() != null) {
                    mstSheetSizeFrontDtos = sheetSizeDao.getSheetSizeByLaminationId(productDto.getLaminationFrontId());
                }
            }

            if (productDto.getLaminationPaperTypeMedium() != null && productDto.getLaminationPaperTypeMedium() != 102) {
                mstSheetSizeMediumDtos = sheetSizeDao.getSheetSizeByLaminationTypeAndWeight(productDto.getLaminationPaperTypeMedium(), productDto.getLaminationMediumBasicWeight());
            } else {
                if (productDto.getLaminationMediumId() != null) {
                    mstSheetSizeMediumDtos = sheetSizeDao.getSheetSizeByLaminationId(productDto.getLaminationMediumId());
                }
            }
            if (productDto.getLaminationPaperTypeBack() != null && productDto.getLaminationPaperTypeBack() != 104) {
                mstSheetSizeBackDtos = sheetSizeDao.getSheetSizeByLaminationTypeAndWeight(productDto.getLaminationPaperTypeBack(), productDto.getLaminationBackBasicWeight());
            } else {
                if (productDto.getLaminationBackId() != null) {
                    mstSheetSizeBackDtos = sheetSizeDao.getSheetSizeByLaminationId(productDto.getLaminationBackId());
                }
            }

            if (Integer.parseInt(paperWidth.toString()) >= 0) {
                @SuppressWarnings("unchecked")
				MstSheetSizeDto mstSheetSizeDto = this.bestSheetSize(paperWidth, mstSheetSizeFrontDtos, mstSheetSizeMediumDtos, mstSheetSizeBackDtos);

                Integer paperWidth1 = null;
                if (mstSheetSizeDto != null) {
                    paperWidth1 = mstSheetSizeDto.getWidth().intValue();
                }
                if (paperWidth1 != null) {
                    if (paperWidth1 > 999) {
                        paperValue = new DecimalFormat(PATTERN_FORMAT_DECIMAL).format(paperWidth1);
                    } else {
                        paperValue = String.valueOf(paperWidth1);
                    }
                    paperWidth = BigDecimal.valueOf(paperWidth1);
                }
                model.setPaperwidthB(paperValue == null ? Constants.BLANK : paperValue);
                model.setPaperwidthF(paperValue == null ? Constants.BLANK : paperValue);
            }

        } else {

            // 原紙巾（中裏）/ Paper width (Giữa và mặt sau) trừ trường hợp hộp giấy thường
            if (productDto.getLaminationFlute() != null) {
                paperWidth = BigDecimal.valueOf(laminationWidth * laminationNumber + 7);
                List<MstSheetSizeDto> mstSheetSizeMediumDtos = Lists.newArrayList();
                List<MstSheetSizeDto> mstSheetSizeBackDtos = Lists.newArrayList();


                if (productDto.getLaminationPaperTypeMedium() != null && productDto.getLaminationPaperTypeMedium() != 102) {
                    mstSheetSizeMediumDtos = sheetSizeDao.getSheetSizeByLaminationTypeAndWeight(productDto.getLaminationPaperTypeMedium(), productDto.getLaminationMediumBasicWeight());
                } else {
                    if (productDto.getLaminationMediumId() != null) {
                        mstSheetSizeMediumDtos = sheetSizeDao.getSheetSizeByLaminationId(productDto.getLaminationMediumId());
                    }
                }
                if (productDto.getLaminationPaperTypeBack() != null && productDto.getLaminationPaperTypeBack() != 104) {
                    mstSheetSizeBackDtos = sheetSizeDao.getSheetSizeByLaminationTypeAndWeight(productDto.getLaminationPaperTypeBack(), productDto.getLaminationBackBasicWeight());
                } else {
                    if (productDto.getLaminationBackId() != null) {
                        mstSheetSizeBackDtos = sheetSizeDao.getSheetSizeByLaminationId(productDto.getLaminationBackId());
                    }
                }


                if (Integer.parseInt(paperWidth.toString()) >= 7) {
                    MstSheetSizeDto mstSheetSizeDto = this.getFilterListShapeAndDecorative(paperWidth, mstSheetSizeMediumDtos, mstSheetSizeBackDtos);
                    Integer paperWidth1 = null;
                    if (mstSheetSizeDto != null) {
                        paperWidth1 = mstSheetSizeDto.getWidth().intValue();
                    }

                    if (paperWidth1 != null) {
                        if (paperWidth1 > 999) {
                            paperValue = new DecimalFormat(PATTERN_FORMAT_DECIMAL).format(paperWidth1);
                        } else {
                            paperValue = String.valueOf(paperWidth1);
                        }
                        paperWidth = BigDecimal.valueOf(paperWidth1);
                    }
                    model.setPaperwidthB(paperValue == null ? Constants.BLANK : paperValue);
                }
            }
        }

        //VIII. 構成/ Cấu tạo
        //8.1. フルート/ Flute

        if (productDto.getShapeId() != null && productDto.getShapeId() == 98) {
            // Flute of Decorative
            if (productDto.getLaminationFlute() != null) {
                if (productDto.getLaminationFlute() == 2) {
                    model.setfFlute("EF");
                } else if (productDto.getLaminationFlute() == 3) {
                    model.setfFlute("BF");
                }
            }
        }

        // 原紙, シートサイズ解決
        Paper paper = paperHelper.paper(productDto);
        Integer wastePaperFlag = paper.getSheetSizeDto() != null ? paper.getSheetSizeDto().getWastePaperFlag() : null;
        wastePaperFlag = wastePaperFlag != null ? wastePaperFlag : 0;

        String paperCuttingH = productDto.getCutPaperSizeH() != null ? String.valueOf(productDto.getCutPaperSizeH().setScale(0, BigDecimal.ROUND_HALF_UP)) : "0";
        String paperCuttingW = productDto.getCutPaperSizeW() != null ? String.valueOf(productDto.getCutPaperSizeW().setScale(0, BigDecimal.ROUND_HALF_UP)) : "0";

        //8.6 原紙（サイズ）/ Paper (size)/ 寸法/ Kích thước
        if ((productDto.getShapeId() != null && productDto.getShapeId() != 98) || productDto.getShapeId() == null) {
            model.setfSize(paper.getWidth().toString());
            model.setfSize2(paper.getHeight().toString());
        }

        //8.2. 材料/ Vật liệu
        if (productDto.getShapeId() != null && productDto.getShapeId() == 98) {
            String materialPaperFront = getMaterialName(productDto.getLaminationPaperTypeFront(), productDto.getLaminationFrontId(), 100, productDto.getLaminationFrontBasicWeight(), paperWidth, wastePaperFlag);
            model.setfW(materialPaperFront);
        }
        String materialPaperMedium = getMaterialName(productDto.getLaminationPaperTypeMedium(), productDto.getLaminationMediumId(), 102, productDto.getLaminationMediumBasicWeight(), paperWidth, wastePaperFlag);
        String materialPaperBack = getMaterialName(productDto.getLaminationPaperTypeBack(), productDto.getLaminationBackId(), 104, productDto.getLaminationBackBasicWeight(), paperWidth, wastePaperFlag);

        if (productDto.getShapeId() != null && productDto.getShapeId() == 98) {
            model.setfD(materialPaperBack);
            model.setfH(materialPaperMedium);
        }
        //8.3. 原紙コード/ Paper code

        //8.4材料名/ Tên vật liệu x 材料サイズ/ Size vật liệu
        if ((productDto.getShapeId() != null && productDto.getShapeId() != 98) || productDto.getShapeId() == null) {
            // サイズ手入力の場合は空欄にする
            boolean specialSize = Objects.equals(productDto.getSpecialSizeFlag(), 1);
            model.setfPaperName(specialSize ? "" : paper.getDisplayName());
        }

        //8.5. 坪量/ Định lượng
        if ((productDto.getShapeId() != null && productDto.getShapeId() != 98) || productDto.getShapeId() == null) {
            model.setfPGam(paper.getBasisWeight().toString());
        }

        //8.6 原紙（サイズ）/ Paper (size)/ 寸法/ Kích thước / 連量
        if ((productDto.getShapeId() != null && productDto.getShapeId() != 98) || productDto.getShapeId() == null) {
            // 連量 (kg/㎡) を 100 倍して製造仕様書に表示する。小数点以下四捨五入
            BigDecimal reamWeight = paper.getReamWeight().multiply(BigDecimal.valueOf(100)).setScale(0, RoundingMode.HALF_UP);
            model.setfSizeTotal(reamWeight.toString());
        }

        //8.7. 取数/ Cavity
        model.setfKT(productDto.getTakenNumber() == null ? "" : String.valueOf(productDto.getTakenNumber()));

        //8.8. 原紙断寸/ Kích thước cắt paper --- シート寸法/ Kích thước sheet
        //http://fridaynight.vnext.vn/issues/3484
        model.setfSheet(paperCuttingW);
        model.setfSheetH(paperCuttingH);

        String imporsition = productDto.getImpositionNumber() != null ? String.valueOf(productDto.getImpositionNumber()) : StringUtils.EMPTY;
        //8.9. 面付数/ Số lượng Imposition
        model.setfIm(imporsition);

        //IXXXXX. 片段/ dán ghép - 1 lớp
        if ((((productDto.getShapeId() != null && productDto.getShapeId() != 98) || productDto.getShapeId() == null) && productDto.getLaminationFlute() != null && productDto.getLaminationFlute() != 1)
                || (productDto.getShapeId() != null && productDto.getShapeId() == 100)) {
            // フルート/ Flute
            if (productDto.getLaminationFlute() != null) {
                if (productDto.getLaminationFlute() == 2) {
                    model.setfFlute1L("EF");
                } else if (productDto.getLaminationFlute() == 3) {
                    model.setfFlute1L("BF");
                } else if (productDto.getLaminationFlute() == 4) {
                    model.setfFlute1L("GF");
                }
            }

            //      21.1 Paper front
            String materialPaperFront = getMaterialName(productDto.getLaminationPaperTypeFront(), productDto.getLaminationFrontId(), 100, productDto.getLaminationFrontBasicWeight(), paperWidth, wastePaperFlag);
            //      21.1 Paper medium
            materialPaperMedium = getMaterialName(productDto.getLaminationPaperTypeMedium(), productDto.getLaminationMediumId(), 102, productDto.getLaminationMediumBasicWeight(), paperWidth, wastePaperFlag);
            //      21.1 Paper back
            materialPaperBack = getMaterialName(productDto.getLaminationPaperTypeBack(), productDto.getLaminationBackId(), 104, productDto.getLaminationBackBasicWeight(), paperWidth, wastePaperFlag);

            model.setfMaterial1L(materialPaperFront + " " + materialPaperMedium);
            model.setFmaterial1LBack(materialPaperBack);
            // 片段断寸 dán ghép - 1 lớp
            model.setLongwidth1L(productDto.getLaminationWidth() == null ? "" : String.valueOf(productDto.getLaminationWidth()));
            model.setLongwidth1LW(productDto.getLaminationCuttingFlow() == null ? "" : String.valueOf(productDto.getLaminationCuttingFlow()));
        }

        if (productDto.getSurfaceTreatmentIdF() != null
                && (productDto.getSurfaceTreatmentIdF() == 4
                || productDto.getSurfaceTreatmentIdF() == 12
                || productDto.getSurfaceTreatmentIdF() == 13
                || productDto.getSurfaceTreatmentIdF() == 18) && wastePaperFlag != 1) {
            wastePaperFlag = 2;
        }
        if (productDto.getSurfaceTreatmentIdB() != null
                && (productDto.getSurfaceTreatmentIdB() == 4
                || productDto.getSurfaceTreatmentIdB() == 12
                || productDto.getSurfaceTreatmentIdB() == 13
                || productDto.getSurfaceTreatmentIdB() == 18) && wastePaperFlag != 1) {
            wastePaperFlag = 2;
        }
        //禁故紙・難故紙 http://fridaynight.vnext.vn/issues/3319
        if (wastePaperFlag == 1) {
            model.setfBlank3("禁");
        } else if (wastePaperFlag == 2) {
            model.setfBlank3("難");
        } else {
            model.setfBlank3(Constants.BLANK);
        }

        return model;
    }

    @Override
    public R005Model createR005Model(SF00310_RequestModel requestModel, SF00310_ParsedProductInfoJson product,
                                     final SF00310_DealJson deal) {
        R005Model model = new R005Model();
        CustomerDto customer = customerDao.findCustomerById(deal.getCustomerId());

        model.setExportDate(DateUtil.formatDateJp(DateUtil.getSysDate()));

        if (customer != null) {
            model.setCustomerName(customer.getName());
        } else {
            model.setCustomerName(deal.getCustomerName());
        }
        model.setSaleName(authService.getCurrentUser().getUsername());
        model.setProductName(product.getProductName());
        model.setRank(requestModel.getRank());
        model.setDeliveryDate(DateUtil.formatDateJp(requestModel.getDesiredDeliveryDate()));
        model.setOrderTimes("追加一回目");
        model.setStereoscopicDummy(requestModel.getMethodStereoscopicDummy());
        model.setFlatDummy(requestModel.getFlatOutput());
        model.setSampleNo(Constants.BLANK);
        model.setFilmNo(Constants.BLANK);
        model.setForecastRevenue(String.valueOf(deal.getEstTotalDeal()));
        model.setSubmissionDeadline(DateUtil.formatDateJp(requestModel.getSubmissionDeadline()));
        model.setProductDeliveryDateSched(DateUtil.formatDateJp(deal.getDeliveryDate()));
        model.setfTarget(requestModel.getTarget());
        model.setfPlaceOfSale(requestModel.getDepartment());
        model.setfApp(requestModel.getRse());
        model.setfMemo(requestModel.getMemo());
        model.setDesignConcept(requestModel.getDesignConcept());
        return model;
    }

    /**
     * export R007-PDF for carton - ngocnm
     *
     * @param dealDto
     * @param productDto
     * @return
     */
    @Override
    public R007ProductModelC createR007ProductCartonModel(final DealDto dealDto, final ProductDto productDto) {
        // Asseert productDto.productType = 1

        wastePaperFlag = 0;
        R007ProductModelC r007ProductModelC = new R007ProductModelC();
        // I. Front PDF

        // 1. 受注月日/ Ngày tháng order
        String orderDate;

        // 3. 納品日/ Ngày delivery
        String deliveryDate = StringUtils.EMPTY;
        if (dealDto.getDeliveryDate() != null) {
            deliveryDate = dealDto.getDeliveryDate().toString(dateTimeFormatter1);
        }
        r007ProductModelC.setDeliveryDate(deliveryDate);

        // 10. 品目C/ Hạng mục C
        r007ProductModelC.setItemC(productDto.getItemCode());

        // 11.1 作成日/ Ngày tạo
        String createDate = StringUtils.EMPTY;
        if (productDto.getCreateRequestDesignDate() != null) {
            createDate = DateUtil.formatDate(productDto.getCreateRequestDesignDate(), dateTimeFormatter2);
        }
        r007ProductModelC.setCreateDate(createDate);

        // 11.2 Updated Date
        String updatedDate = StringUtils.EMPTY;
        if (productDto.getUpdateRequestDesignDate() != null) {
            updatedDate = DateUtil.formatDate(productDto.getUpdateRequestDesignDate(), dateTimeFormatter2);
        }
        r007ProductModelC.setUpdateDate(updatedDate);

        // 12. 得意先コード/ Customer code
        // 13. 得意先名/ Customer name
        String customerCode = StringUtils.EMPTY;
        String customerName = StringUtils.EMPTY;
        if (dealDto.getCustomerId() != null) {
            CustomerDto customerDto = customerDao.findCustomerById(dealDto.getCustomerId());
            if (customerDto != null) {
                customerCode = customerDto.getCustomerCode();
                customerName = customerDto.getName();
            }
        }
        r007ProductModelC.setCustomerCode(customerCode);
        r007ProductModelC.setCustomerName(customerName);

        // 14. 品名/ Product name
        r007ProductModelC.setProductName(productDto.getProductName());

        // 15. "外寸法/ Kích thước ngoài"
        if (productDto.getCartonShippingType() == 2) {
            // 15.1. 縦/ Dọc
            String sizeH = StringUtils.EMPTY;
            if (productDto.getSizeH() != null) {
                sizeH = String.valueOf(productDto.getSizeH().setScale(0, BigDecimal.ROUND_HALF_UP));
            }
            // 15.2. 横/ Ngang
            String sizeW = StringUtils.EMPTY;
            if (productDto.getSizeW() != null) {
                sizeW = String.valueOf(productDto.getSizeW().setScale(0, BigDecimal.ROUND_HALF_UP));
            }
            // 15.3. 高さ/ Chiều cao
            String sizeD = StringUtils.EMPTY;
            if (productDto.getSizeD() != null) {
                sizeD = String.valueOf(productDto.getSizeD().setScale(0, BigDecimal.ROUND_HALF_UP));
            }

            // implement issue 3304
            r007ProductModelC.setSizeH(sizeH);
            r007ProductModelC.setSizeD(sizeD);
            r007ProductModelC.setSizeW(sizeW);
        }


        // 16. 展開寸/ Kích thước triển khai
        StringBuilder paperSize = new StringBuilder();
        String paperSizeW = StringUtils.EMPTY;
        String paperSizeH = StringUtils.EMPTY;
        BigDecimal lowerFlap;
        BigDecimal upperFlap;
        if (productDto.getCartonShippingType() == EnumsPDF.CartonType.CARTON_CASE.getType()) {
            lowerFlap = productDto.getLowerFlap() != null ? productDto.getLowerFlap() : calcDefaulFlap(productDto);
            upperFlap = productDto.getUpperFlap() != null ? productDto.getUpperFlap() : calcDefaulFlap(productDto);
        } else {
            lowerFlap = productDto.getLowerFlap() != null ? productDto.getLowerFlap() : BigDecimal.ZERO;
            upperFlap = productDto.getUpperFlap() != null ? productDto.getUpperFlap() : BigDecimal.ZERO;
        }

        BigDecimal sizeH = productDto.getSizeH() != null ? productDto.getSizeH() : BigDecimal.ZERO;
        BigDecimal sizeW = productDto.getSizeD() != null ? productDto.getSizeD() : BigDecimal.ZERO;
        BigDecimal sizeD = productDto.getSizeW() != null ? productDto.getSizeW() : BigDecimal.ZERO;
        BigDecimal customFlap = BigDecimal.ZERO;
        if (productDto.getUpperFlap() != null && productDto.getLowerFlap() != null) {
            customFlap = productDto.getUpperFlap().add(productDto.getLowerFlap()).subtract(calcDefaulFlap(productDto).multiply(BigDecimal.valueOf(2)));
        }
        BigDecimal blankSizeWCounting;
        BigDecimal blankSizeHCounting;





        // blank size of sheet
        if (productDto.getCartonShippingType() == 1) {
            // 16.1. 巾/ Chiều rộng
            if (productDto.getBlankPaperSizeW() != null) {
                paperSizeW = String.valueOf(productDto.getBlankPaperSizeW().setScale(0, BigDecimal.ROUND_HALF_UP));
            }
            // 16.2. 流れ/ Chiều dài
            if (productDto.getBlankPaperSizeH() != null) {
                paperSizeH = String.valueOf(productDto.getBlankPaperSizeH().setScale(0, BigDecimal.ROUND_HALF_UP));
            }
        } else if (productDto.getCartonShippingType() == 2) {
            // blank size of case
            // 16.1. 巾/ Chiều rộng
            blankSizeWCounting = sizeH.add(sizeW);
            if (productDto.getLaminationFlute() == 1) {
                blankSizeWCounting = blankSizeWCounting.add(BigDecimal.valueOf(6));
            } else if (productDto.getLaminationFlute() == 2) {
                blankSizeWCounting = blankSizeWCounting.add(BigDecimal.valueOf(4));
            } else {
                blankSizeWCounting = blankSizeWCounting.add(BigDecimal.valueOf(10));
            }
            blankSizeWCounting = blankSizeWCounting.add(customFlap);
            paperSizeW = String.valueOf(blankSizeWCounting.setScale(0, BigDecimal.ROUND_HALF_UP));

            // 16.2. 流れ/ Chiều dài

            blankSizeHCounting = ((sizeW.multiply(BigDecimal.valueOf(2))).add(sizeD.multiply(BigDecimal.valueOf(2))));
            if (productDto.getLaminationFlute() == 1) {
                blankSizeHCounting = blankSizeHCounting.add(BigDecimal.valueOf(35));
            } else if (productDto.getLaminationFlute() == 2) {
                blankSizeHCounting = blankSizeHCounting.add(BigDecimal.valueOf(30));
            } else {
                blankSizeHCounting = blankSizeHCounting.add(BigDecimal.valueOf(40));
            }
            paperSizeH = String.valueOf(blankSizeHCounting.setScale(0, BigDecimal.ROUND_HALF_UP));
        }

        r007ProductModelC.setPaperSizeH(paperSizeH);
        r007ProductModelC.setPaperSizeW(paperSizeW);

        // 17. 木型No/ No khuôn gỗ
        // case dùng chung  http://fridaynight.vnext.vn/issues/3480
        String woodenNo;
        if (!Strings.isNullOrEmpty(productDto.getWoodenCode())) {
            woodenNo = (productDto.getWoodenCode());
            if (productDto.getShareWoodenFlag1() != null && productDto.getShareWoodenFlag1() == 1) {
                woodenNo += " 兼用";
            }
        } else {
            woodenNo = StringUtils.EMPTY;
        }

        r007ProductModelC.setWoodenNo(woodenNo);

        // 18. TODO: 金型No/ No khuôn
        String moldNo = StringUtils.EMPTY;
        r007ProductModelC.setMoldNo(moldNo);

        // 19. フルート/ Flute
        String laminationFlute = StringUtils.EMPTY;
        if (productDto.getLaminationFlute() != null) {
            if (productDto.getLaminationFlute() == EnumsPDF.LaminationFluteCarton.AF.getValue()) {
                laminationFlute = "AF";
            } else if (productDto.getLaminationFlute() == EnumsPDF.LaminationFluteCarton.BF.getValue()) {
                laminationFlute = "BF";
            } else if (productDto.getLaminationFlute() == EnumsPDF.LaminationFluteCarton.WF.getValue()) {
                laminationFlute = "WF";
            } else if (productDto.getLaminationFlute() == EnumsPDF.LaminationFluteCarton.CF.getValue()) {
                laminationFlute = "CF";
            }
        }
        r007ProductModelC.setLaminationFlute(laminationFlute);

        // 20. 紙巾/ Chiều rộng paper
        String laminationSizeW = Constants.BLANK;

        // 22.2. 巾/ Chiều rộng
        BigDecimal corrugatorCuttingWCounting = BigDecimal.ZERO;
        if (productDto.getCorrugatorCuttingW() != null) {
            corrugatorCuttingWCounting = productDto.getCorrugatorCuttingW();
        } else {
            if (productDto.getCartonShippingType() == EnumsPDF.CartonType.CARTON_CASE.getType()) {
                corrugatorCuttingWCounting = upperFlap.add(sizeH).add(lowerFlap);
            } else if (productDto.getCartonShippingType() == EnumsPDF.CartonType.CARTON_SHEET.getType()) {
                corrugatorCuttingWCounting = productDto.getBlankPaperSizeW() != null ? productDto.getBlankPaperSizeW() : BigDecimal.ZERO;
            }
        }
        BigDecimal paperWidthNeeded = (corrugatorCuttingWCounting.multiply(new BigDecimal(productDto.getTakenNumber()))).add(new BigDecimal(10));

        List<MstSheetSizeDto> mstSheetSizeFrontDtos = Lists.newArrayList();
        List<MstSheetSizeDto> mstSheetSizeADtos = Lists.newArrayList();
        List<MstSheetSizeDto> mstSheetSizeMediumDtos = Lists.newArrayList();
        List<MstSheetSizeDto> mstSheetSizeBDtos = Lists.newArrayList();
        List<MstSheetSizeDto> mstSheetSizeBackDtos = Lists.newArrayList();

        if (productDto.getLaminationPaperTypeFront() != null && productDto.getLaminationPaperTypeFront() != 100) {
            mstSheetSizeFrontDtos = sheetSizeDao.getSheetSizeByLaminationTypeAndWeight(productDto.getLaminationPaperTypeFront(), productDto.getLaminationFrontBasicWeight());
        } else {
            if (productDto.getLaminationFrontId() != null) {
                mstSheetSizeFrontDtos = sheetSizeDao.getSheetSizeByLaminationId(productDto.getLaminationFrontId());
            }
        }

        if (productDto.getLaminationPaperTypeA() != null && productDto.getLaminationPaperTypeA() != 103) {
            mstSheetSizeADtos = sheetSizeDao.getSheetSizeByLaminationTypeAndWeight(productDto.getLaminationPaperTypeA(), productDto.getLaminationABasicWeight());
        } else {
            if (productDto.getLaminationAId() != null) {
                mstSheetSizeADtos = sheetSizeDao.getSheetSizeByLaminationId(productDto.getLaminationAId());
            }
        }

        if (productDto.getLaminationPaperTypeMedium() != null && productDto.getLaminationPaperTypeMedium() != 102) {
            mstSheetSizeMediumDtos = sheetSizeDao.getSheetSizeByLaminationTypeAndWeight(productDto.getLaminationPaperTypeMedium(), productDto.getLaminationMediumBasicWeight());
        } else {
            if (productDto.getLaminationMediumId() != null) {
                mstSheetSizeMediumDtos = sheetSizeDao.getSheetSizeByLaminationId(productDto.getLaminationMediumId());
            }
        }

        if (productDto.getLaminationPaperTypeB() != null && productDto.getLaminationPaperTypeB() != 101) {
            mstSheetSizeBDtos = sheetSizeDao.getSheetSizeByLaminationTypeAndWeight(productDto.getLaminationPaperTypeB(), productDto.getLaminationBBasicWeight());
        } else {
            if (productDto.getLaminationBId() != null) {
                mstSheetSizeBDtos = sheetSizeDao.getSheetSizeByLaminationId(productDto.getLaminationBId());
            }
        }


        if (productDto.getLaminationPaperTypeBack() != null && productDto.getLaminationPaperTypeBack() != 104) {
            mstSheetSizeBackDtos = sheetSizeDao.getSheetSizeByLaminationTypeAndWeight(productDto.getLaminationPaperTypeBack(), productDto.getLaminationBackBasicWeight());
        } else {
            if (productDto.getLaminationBackId() != null) {
                mstSheetSizeBackDtos = sheetSizeDao.getSheetSizeByLaminationId(productDto.getLaminationBackId());
            }
        }
        MstSheetSizeDto mstSheetSizeDto;

        if (productDto.getLaminationFlute() == EnumsPDF.LaminationFluteCarton.BF.getValue()) {

            mstSheetSizeDto = this.getFilterListCarton(paperWidthNeeded, mstSheetSizeFrontDtos, mstSheetSizeMediumDtos, mstSheetSizeBackDtos);
        } else if (productDto.getLaminationFlute() == EnumsPDF.LaminationFluteCarton.WF.getValue()) {

            mstSheetSizeDto = this.getFilterListCarton(paperWidthNeeded, mstSheetSizeFrontDtos, mstSheetSizeBDtos, mstSheetSizeMediumDtos, mstSheetSizeADtos, mstSheetSizeBackDtos);
        } else {

            mstSheetSizeDto = this.getFilterListCarton(paperWidthNeeded, mstSheetSizeFrontDtos, mstSheetSizeMediumDtos, mstSheetSizeBackDtos);
        }

        BigDecimal laminationSizeWCounting = null;
        if (mstSheetSizeDto != null) {
            laminationSizeWCounting = mstSheetSizeDto.getWidth();
        }

        if (laminationSizeWCounting != null) {
            if (laminationSizeWCounting.intValue() > 999) {
                laminationSizeW = new DecimalFormat(PATTERN_FORMAT_DECIMAL).format(laminationSizeWCounting.intValue());
            } else {
                laminationSizeW = String.valueOf(laminationSizeWCounting.intValue());
            }
        }
        r007ProductModelC.setLaminationSizeW(laminationSizeW);


        if(laminationSizeWCounting != null) {

            //      21.1 Paper front
            String materialPaperFront = getMaterialName(productDto.getLaminationPaperTypeFront(), productDto.getLaminationFrontId(), 100, productDto.getLaminationFrontBasicWeight(), laminationSizeWCounting.setScale(0, BigDecimal.ROUND_HALF_UP), wastePaperFlag);

            //      21.1 Paper B
            String materialPaperB = getMaterialName(productDto.getLaminationPaperTypeB(), productDto.getLaminationBId(), 101, productDto.getLaminationBBasicWeight(), laminationSizeWCounting.setScale(0, BigDecimal.ROUND_HALF_UP), wastePaperFlag);

            //      21.1 Paper medium
            String materialPaperMedium = getMaterialName(productDto.getLaminationPaperTypeMedium(), productDto.getLaminationMediumId(), 102, productDto.getLaminationMediumBasicWeight(), laminationSizeWCounting.setScale(0, BigDecimal.ROUND_HALF_UP), wastePaperFlag);

            //      21.1 Paper A
            String materialPaperA = getMaterialName(productDto.getLaminationPaperTypeA(), productDto.getLaminationAId(), 103, productDto.getLaminationABasicWeight(), laminationSizeWCounting.setScale(0, BigDecimal.ROUND_HALF_UP), wastePaperFlag);

            //      21.1 Paper back
            String materialPaperBack = getMaterialName(productDto.getLaminationPaperTypeBack(), productDto.getLaminationBackId(), 104, productDto.getLaminationBackBasicWeight(), laminationSizeWCounting.setScale(0, BigDecimal.ROUND_HALF_UP), wastePaperFlag);

            // implement follow issue 3303
            if (productDto.getLaminationFlute() == EnumsPDF.LaminationFluteCarton.AF.getValue()) {
                // AF
                // front
                r007ProductModelC.setMaterialPaper1(materialPaperFront);
                // medium A
                r007ProductModelC.setMaterialPaper4(materialPaperMedium);
                // back
                r007ProductModelC.setMaterialPaper5(materialPaperBack);
            } else if (productDto.getLaminationFlute() == EnumsPDF.LaminationFluteCarton.BF.getValue()) {
                // BF
                // front
                r007ProductModelC.setMaterialPaper1(materialPaperFront);
                // medium B
                r007ProductModelC.setMaterialPaper2(materialPaperMedium);
                // back
                r007ProductModelC.setMaterialPaper5(materialPaperBack);
            } else if (productDto.getLaminationFlute() == EnumsPDF.LaminationFluteCarton.CF.getValue()) {
                // CF
                // front
                r007ProductModelC.setMaterialPaper1(materialPaperFront);
                // medium
                r007ProductModelC.setMaterialPaper4(materialPaperMedium);
                // back
                r007ProductModelC.setMaterialPaper5(materialPaperBack);
            } else if (productDto.getLaminationFlute() == EnumsPDF.LaminationFluteCarton.WF.getValue()) {
                // WF
                // front
                r007ProductModelC.setMaterialPaper1(materialPaperFront);
                // medium B
                r007ProductModelC.setMaterialPaper2(materialPaperB);
                // medium
                r007ProductModelC.setMaterialPaper3(materialPaperMedium);
                // medium A
                r007ProductModelC.setMaterialPaper4(materialPaperA);
                // back
                r007ProductModelC.setMaterialPaper5(materialPaperBack);
            }
        }
        // 22. コルゲータ断裁
        // 22.2. 流れ/ Chiều dài
        BigDecimal corrugatorCuttingHCounting = BigDecimal.ZERO;

        // case: product is carton case

        if (productDto.getCorrugatorCuttingH() != null) {
            corrugatorCuttingHCounting = productDto.getCorrugatorCuttingH();
        } else {
            if (productDto.getCartonShippingType() == EnumsPDF.CartonType.CARTON_CASE.getType()) {

                //      Aフルート <=> LaminationFlute = 1
                if (productDto.getLaminationFlute() != null && productDto.getLaminationFlute() == 1) {
                    //      Aフルート =>ｺﾙｹﾞｰﾀ断裁流 = 外寸法巾<sizeW> + 外寸法巾<sizeW> -3 + 外寸法流れ<sizeD> + 外寸法流れ<sizeD> -3 +35mm
                    corrugatorCuttingHCounting = sizeW.add(sizeW.subtract(BigDecimal.valueOf(3))).add(sizeD)
                            .add(sizeD.subtract(BigDecimal.valueOf(3))).add(BigDecimal.valueOf(35));
                }
                //      Bフルート <=> LaminationFlute = 2
                if (productDto.getLaminationFlute() != null && productDto.getLaminationFlute() == 2) {
                    //      Bフルート => 外寸法巾 + 外寸法巾 -2 + 外寸法流れ + 外寸法流れ -3 +35mm
                    corrugatorCuttingHCounting = sizeW.add(sizeW.subtract(BigDecimal.valueOf(2))).add(sizeD)
                            .add(sizeD.subtract(BigDecimal.valueOf(3))).add(BigDecimal.valueOf(30));
                }
                //      Wフルート <=> LaminationFlute = 3
                if (productDto.getLaminationFlute() != null && productDto.getLaminationFlute() == 3) {
                    //      Wフルート => 外寸法巾 + 外寸法巾 -4 + 外寸法流れ + 外寸法流れ -3 +35mm
                    corrugatorCuttingHCounting = sizeW.add(sizeW.subtract(BigDecimal.valueOf(4))).add(sizeD)
                            .add(sizeD.subtract(BigDecimal.valueOf(3))).add(BigDecimal.valueOf(40));
                }
                //      Cフルート <=> LaminationFlute = 4
                if (productDto.getLaminationFlute() != null && productDto.getLaminationFlute() == 4) {
                    //      Wフルート => 外寸法巾 + 外寸法巾 -4 + 外寸法流れ + 外寸法流れ -3 +35mm
                    corrugatorCuttingHCounting = sizeW.add(sizeW.subtract(BigDecimal.valueOf(3))).add(sizeD).add(sizeD.subtract(BigDecimal.valueOf(3))).add(BigDecimal.valueOf(35));
                }
            } else if (productDto.getCartonShippingType() == EnumsPDF.CartonType.CARTON_SHEET.getType()) {

                BigDecimal blankPaperSizeH = productDto.getBlankPaperSizeH() != null ? productDto.getBlankPaperSizeH() : BigDecimal.ZERO;
                int flowNumber = calcFlowNumber(blankPaperSizeH);
                if (flowNumber == 1) {
                    corrugatorCuttingHCounting = blankPaperSizeH.multiply(BigDecimal.valueOf(flowNumber));
                } else {
                    if (flowNumber >= 4) {
                        corrugatorCuttingHCounting = blankPaperSizeH.multiply(BigDecimal.valueOf(flowNumber)).add(BigDecimal.valueOf(15 * flowNumber / 4));
                    } else {
                        corrugatorCuttingHCounting = blankPaperSizeH.multiply(BigDecimal.valueOf(flowNumber)).add(BigDecimal.valueOf(15));
                    }
                    if (corrugatorCuttingHCounting.compareTo(BigDecimal.valueOf(9999.999)) > 0) {
                        corrugatorCuttingHCounting = BigDecimal.valueOf(9999.999);
                    }
                }
            }

        }

        r007ProductModelC.setCorrugatorCuttingW(String.valueOf(corrugatorCuttingWCounting.setScale(0, BigDecimal.ROUND_HALF_UP)));
        r007ProductModelC.setCorrugatorCuttingH(String.valueOf(corrugatorCuttingHCounting.setScale(0, BigDecimal.ROUND_HALF_UP)));


        // 23. ｽﾘｯﾀｰ断裁流/ Chiều dài cắt bằng slitter
        SlitterCuttingMethod slitterCuttingMethod = SlitterCuttingMethod.cartonSlitterCuttingMethod(productDto);

        //      23.1. 巾/ Chiều rộng
        if (productDto.getSlitterCuttingFlowW() != null) {
            // implement follow #3179
            if (productDto.getSlitterCuttingFlowW().compareTo(BigDecimal.ZERO) != 0) {
                r007ProductModelC.setSlitterCuttingFlowW(String.valueOf(productDto.getSlitterCuttingFlowW()));
            }
        }
        //      23.2. 流れ/ Chiều dài
        if (productDto.getSlitterCuttingFlowH() != null) {
            // implement follow #3179
            if (productDto.getSlitterCuttingFlowH().compareTo(BigDecimal.ZERO) != 0) {
                r007ProductModelC.setSlitterCuttingFlowH(String.valueOf(productDto.getSlitterCuttingFlowH()));
            }
        }
        // スリッター断裁欄にシート寸法を記入する (スリッター断裁ありの場合のみ)
        if (productDto.getSlitterCuttingFlowW() == null && productDto.getSlitterCuttingFlowH() == null && slitterCuttingMethod.isUsingSlitter()) {
            // 巾
            if (productDto.getCutPaperSizeW() != null) {
                BigDecimal value = productDto.getCutPaperSizeW().setScale(0, BigDecimal.ROUND_HALF_UP);
                r007ProductModelC.setSlitterCuttingFlowW(value.toString());
            }

            // 流れ
            if (productDto.getCutPaperSizeH() != null) {
                BigDecimal value = productDto.getCutPaperSizeH().setScale(0, BigDecimal.ROUND_HALF_UP);
                r007ProductModelC.setSlitterCuttingFlowH(value.toString());
            }
        }

        // 24. 面付/ Imposition
        if (productDto.getCartonShippingType() == 2) {
            r007ProductModelC.setImposition("1");
        } else {
            String imposition;
            if (getSheetType(productDto) == 1) {
                imposition = "1";
            } else {
                imposition = calcFlowNumber(productDto.getBlankPaperSizeH() != null ? productDto.getBlankPaperSizeH() : BigDecimal.ZERO) + "";
            }
            r007ProductModelC.setImposition(imposition);
        }


        // 25. 才数/ volume
        BigDecimal blankPaperSizeW = productDto.getBlankPaperSizeW() != null ? productDto.getBlankPaperSizeW() : BigDecimal.ZERO;
        BigDecimal blankPaperSizeH = productDto.getBlankPaperSizeH() != null ? productDto.getBlankPaperSizeH() : BigDecimal.ZERO;
        BigDecimal volumeCounting;
        // follow 3308.
        if (productDto.getCartonShippingType() == EnumsPDF.CartonType.CARTON_SHEET.getType()) {
            // round( (コルゲータ断裁巾/1000) * (コルゲータ断裁流れ/1000), 3)
            volumeCounting = (blankPaperSizeW.divide(new BigDecimal(1000))).multiply(blankPaperSizeH.divide(new BigDecimal(1000)));
            volumeCounting = volumeCounting.setScale(3, BigDecimal.ROUND_HALF_UP);
            if (productDto.getLaminationFlute() != null && productDto.getLaminationFlute() == 3) {
                volumeCounting = volumeCounting.multiply(BigDecimal.valueOf(1.5));
                volumeCounting = volumeCounting.setScale(3, BigDecimal.ROUND_HALF_UP);
            }
        } else {
            if (productDto.getLaminationFlute() != 3) {
                // round( (コルゲータ断裁巾/1000) * (コルゲータ断裁流れ/1000), 3)
                volumeCounting = (corrugatorCuttingWCounting.divide(new BigDecimal(1000)))
                        .multiply(corrugatorCuttingHCounting.divide(new BigDecimal(1000)));
                volumeCounting = volumeCounting.setScale(3, BigDecimal.ROUND_HALF_UP);
            } else {
                volumeCounting = ((corrugatorCuttingWCounting.divide(new BigDecimal(1000)))
                        .multiply(corrugatorCuttingHCounting.divide(new BigDecimal(1000))))
                        .multiply(new BigDecimal(1.5));
                volumeCounting = volumeCounting.setScale(3, BigDecimal.ROUND_HALF_UP);
            }
        }

        if (volumeCounting.compareTo(BigDecimal.ZERO) == 0) {
            r007ProductModelC.setVolume("0");
        } else {
            r007ProductModelC.setVolume(String.valueOf(volumeCounting));
        }

        // 26. 印刷/ In
        // 26.1. 印刷数/ Số lượng in
        if (productDto.getColorIdF() != null) {
            if (productDto.getColorIdF() == 2) {
                r007ProductModelC.setNumberOfColor("1");
            } else if (productDto.getColorIdF() == 3) {
                r007ProductModelC.setNumberOfColor("2");
            } else if (productDto.getColorIdF() == 4) {
                r007ProductModelC.setNumberOfColor("3");
            } else if (productDto.getColorIdF() == 5) {
                r007ProductModelC.setNumberOfColor("4");
            } else {
                r007ProductModelC.setNumberOfColor(StringUtils.EMPTY);
            }

            if (productDto.getColorIdF() > 1) {
                // 26.2. 使用色１/ Màu sử dụng 1
                if (productDto.getColorFText1() != null) {
                    r007ProductModelC.setColorMemo1(productDto.getColorFText1());
                } else {
                    r007ProductModelC.setColorMemo1(Constants.BLANK);
                }
                // 26.3. 使用色２/ Màu sử dụng 2
                if (productDto.getColorFText2() != null) {
                    r007ProductModelC.setColorMemo2(productDto.getColorFText2());
                } else {
                    r007ProductModelC.setColorMemo2(Constants.BLANK);
                }
                // 26.4. 使用色３/ Màu sử dụng 3
                if (productDto.getColorFText3() != null) {
                    r007ProductModelC.setColorMemo3(productDto.getColorFText3());
                } else {
                    r007ProductModelC.setColorMemo3(Constants.BLANK);
                }
            }
        }


        // 27. "手穴指示/Chỉ thị lỗ tay cầm" // 加工種類/ Phân loại gia công
        if (productDto.getHandProcessingFlag() != null) {
            if (productDto.getHandProcessingFlag() == 1) {
                // Cắt đứt rời
                if (productDto.getHandType() != null && productDto.getHandType() == 1) {
                    r007ProductModelC.setHandProcessingDataA("切落し");
                    if (productDto.getHandSize() != null) {
                        if (productDto.getHandSize() == 5) {
                            r007ProductModelC.setHandProcessingDataD("80x30");
                        } else if (productDto.getHandSize() == 1) {
                            r007ProductModelC.setHandProcessingDataD("80x25");
                        } else if (productDto.getHandSize() == 6) {
                            r007ProductModelC.setHandProcessingDataD("60x25");
                        } else if (productDto.getHandSize() == 4) {
                            r007ProductModelC.setHandProcessingDataD("50x20");
                        } else if (productDto.getHandSize() == 7) {
                            r007ProductModelC.setHandProcessingDataD("40x20");
                        } else {
                            r007ProductModelC.setHandProcessingDataD(Constants.BLANK);
                        }
                    }
                } else if (productDto.getHandType() != null && productDto.getHandType() == 2) {
                    // Cắt còn để lại
                    r007ProductModelC.setHandProcessingDataA("切残し");
                    if (productDto.getHandSize() != null) {
                        if (productDto.getHandSize() == 1) {
                            r007ProductModelC.setHandProcessingDataC("80x25");
                        } else if (productDto.getHandSize() == 2) {
                            r007ProductModelC.setHandProcessingDataC("60x30");
                        } else if (productDto.getHandSize() == 3) {
                            r007ProductModelC.setHandProcessingDataC("60x20");
                        } else if (productDto.getHandSize() == 4) {
                            r007ProductModelC.setHandProcessingDataC("50x20");
                        } else {
                            r007ProductModelC.setHandProcessingDataC(Constants.BLANK);
                        }
                    }
                } else {
                    r007ProductModelC.setHandProcessingDataA(Constants.BLANK);
                    r007ProductModelC.setHandProcessingDataC(Constants.BLANK);
                    r007ProductModelC.setHandProcessingDataD(Constants.BLANK);
                }

                if (productDto.getHandPosition() != null && productDto.getHandPosition() != 0) {
                    r007ProductModelC.setHandProcessingDataB(String.valueOf(productDto.getHandPosition()));
                } else {
                    r007ProductModelC.setHandProcessingDataB(Constants.BLANK);
                }
            }
        }


        // 28. "数量制限/Hạn chế số lượng"	数量制限/ Hạn chế số lượng
        List<ChecksheetDto> checksheetDtos = checkSheetDao.getCheckSheetsByDealId(dealDto.getId());
        Map<Integer, ChecksheetDto> checkSheetMap = new HashMap<>();
        if (!CollectionUtils.isEmpty(checksheetDtos)) {
            for (ChecksheetDto checksheetDto : checksheetDtos) {
                checkSheetMap.put(checksheetDto.getQuestionCode(), checksheetDto);
            }
        }

        ChecksheetDto checksheetDto = checkSheetMap.get(1008);
        if (checksheetDto != null) {
            if (checksheetDto.getSelectBox1() != null) {
                Integer unitQuantityLimited = checksheetDto.getSelectBox1();
                switch (unitQuantityLimited) {
                    case 1:
                        r007ProductModelC.setColorT("◯");
                        r007ProductModelC.setColorS("◯");
                        r007ProductModelC.setCheckColorT(1);
                        r007ProductModelC.setCheckColorS(1);
                        break;
                    case 2:
                        r007ProductModelC.setColorT("◯");
                        r007ProductModelC.setColorS("×");

                        r007ProductModelC.setCheckColorT(1);
                        r007ProductModelC.setCheckColorS(2);
                        break;
                    case 3:
                        r007ProductModelC.setColorT("×");
                        r007ProductModelC.setColorS("◯");

                        r007ProductModelC.setCheckColorT(2);
                        r007ProductModelC.setCheckColorS(1);
                        break;
                    case 4:
                        r007ProductModelC.setColorT("×");
                        r007ProductModelC.setColorS("×");

                        r007ProductModelC.setCheckColorT(2);
                        r007ProductModelC.setCheckColorS(2);
                        break;
                    case 5:
                        r007ProductModelC.setColorT("＃");
                        r007ProductModelC.setColorS("◯");

                        r007ProductModelC.setCheckColorT(3);
                        r007ProductModelC.setCheckColorS(1);
                        break;
                    case 6:
                        r007ProductModelC.setColorT("◯");
                        r007ProductModelC.setColorS("＃");

                        r007ProductModelC.setCheckColorT(1);
                        r007ProductModelC.setCheckColorS(3);
                        break;
                    case 7:
                        r007ProductModelC.setColorT("＃");
                        r007ProductModelC.setColorS("×");

                        r007ProductModelC.setCheckColorT(3);
                        r007ProductModelC.setCheckColorS(2);
                        break;
                    case 8:
                        r007ProductModelC.setColorT("×");
                        r007ProductModelC.setColorS("＃");

                        r007ProductModelC.setCheckColorT(2);
                        r007ProductModelC.setCheckColorS(3);
                        break;
                    case 9:
                        r007ProductModelC.setColorT("＃");
                        r007ProductModelC.setColorS("＃");

                        r007ProductModelC.setCheckColorT(3);
                        r007ProductModelC.setCheckColorS(3);
                        break;
                    default:
                        r007ProductModelC.setColorT(StringUtils.EMPTY);
                        r007ProductModelC.setColorS(StringUtils.EMPTY);
                        break;
                }
            } else {
                r007ProductModelC.setColorT(StringUtils.EMPTY);
                r007ProductModelC.setColorS(StringUtils.EMPTY);
            }

            StringBuilder unitQuantity = new StringBuilder();
            if (checksheetDto.getTextArea1() != null && Integer.parseInt(checksheetDto.getTextArea1()) != 0) {
                unitQuantity.append(checksheetDto.getTextArea1());

                unitQuantity.append(" ");
                if (checksheetDto.getSelectBox2() != null) {
                    if (checksheetDto.getSelectBox2() == 1) {
                        unitQuantity.append("％");
                    } else if (checksheetDto.getSelectBox2() == 2) {
                        unitQuantity.append("枚");
                    } else if (checksheetDto.getSelectBox2() == 3) {
                        unitQuantity.append("箱");
                    } else if (checksheetDto.getSelectBox2() == 4) {
                        unitQuantity.append("梱包");
                    } else if (checksheetDto.getSelectBox2() == 5) {
                        unitQuantity.append("結束");
                    } else if (checksheetDto.getSelectBox2() == 6) {
                        unitQuantity.append("全数");
                    }
                }
                unitQuantity.append(" ");
                if (checksheetDto.getSelectBox3() != null) {
                    if (checksheetDto.getSelectBox3() == 1) {
                        unitQuantity.append("以上");
                    } else if (checksheetDto.getSelectBox3() == 2) {
                        unitQuantity.append("以内");
                    } else if (checksheetDto.getSelectBox3() == 3) {
                        unitQuantity.append("未満");
                    } else if (checksheetDto.getSelectBox3() == 4) {
                        unitQuantity.append("全数");
                    }
                }
                r007ProductModelC.setUnitQuantity(unitQuantity.toString());
            } else {
                r007ProductModelC.setUnitQuantity(Constants.BLANK);
            }
        }

        // 30. 結束形態/ Hình dạng buộc
        if (productDto.getBindingMethod() != null) {
            if (productDto.getBindingMethod() == 1) {
                r007ProductModelC.setBidingMethod("二");
            } else if (productDto.getBindingMethod() == 2) {
                r007ProductModelC.setBidingMethod("キ");
            } else if (productDto.getBindingMethod() == 3) {
                r007ProductModelC.setBidingMethod("十");
            } else if (productDto.getBindingMethod() == 4) {
                r007ProductModelC.setBidingMethod("ー");
            } else {
                r007ProductModelC.setBidingMethod(StringUtils.EMPTY);
            }
        }

        // 31. 結束枚数/ Số tấm buộc
        if (productDto.getBindingNumber() != null && productDto.getBindingNumber() != 0) {
            r007ProductModelC.setBidingNumber(String.valueOf(productDto.getBindingNumber()));
        } else {
            r007ProductModelC.setBidingNumber(Constants.BLANK);
        }

        // 32. ヒモ/ Dây
        if (productDto.getStringNumber() != null && productDto.getStringNumber() != 0) {
            r007ProductModelC.setString(String.valueOf(productDto.getStringNumber()));
        } else {
            r007ProductModelC.setString(Constants.BLANK);
        }

        // 33. ヒモ色/ Màu dây
        String stringColor = StringUtils.EMPTY;
        if (productDto.getStringColor() != null) {
            if (productDto.getStringColor() == 1) {
                stringColor = "白";
            } else if (productDto.getStringColor() == 2) {
                stringColor = "赤";
            } else if (productDto.getStringColor() == 3) {
                stringColor = "青";
            } else if (productDto.getStringColor() == 4) {
                stringColor = "黄";
            } else {
                stringColor = StringUtils.EMPTY;
            }
        }
        r007ProductModelC.setStringColor(stringColor);

        // 34. 営業サンプル/ Sales sample
        // 35. 得意先サンプル/ Customer sample
        // 36. 商品開発/ Phát triển sản phẩm
        // 37. 展示用/ Dành cho trưng bày

        List<OrderItemDto> orderItemDtosSample = orderItemDao.getOrderItemsByDealId(dealDto.getId());
        if (!orderItemDtosSample.isEmpty()) {
            for (OrderItemDto orderItemDto : orderItemDtosSample) {
                if (orderItemDto.getProductId().equals(productDto.getId())) {
                    // 37. 抜上り
                    if (orderItemDto.getSampleProduct() != null && orderItemDto.getSampleLift() != 0) {
                        r007ProductModelC.setLiftSample(String.valueOf(orderItemDto.getSampleLift()));
                    } else {
                        r007ProductModelC.setLiftSample(Constants.BLANK);
                    }
                    // 34. 営業サンプル/ Sales sample
                    if (orderItemDto.getSampleSales() != null && orderItemDto.getSampleSales() != 0) {
                        r007ProductModelC.setSaleSample(String.valueOf(orderItemDto.getSampleSales()));
                    } else {
                        r007ProductModelC.setSaleSample(Constants.BLANK);
                    }
                    // 35. 得意先サンプル/ Customer sample
                    if (orderItemDto.getSampleCustomer() != null && orderItemDto.getSampleCustomer() != 0) {
                        r007ProductModelC.setCustomerSample(String.valueOf(orderItemDto.getSampleCustomer()));
                    } else {
                        r007ProductModelC.setCustomerSample(Constants.BLANK);
                    }
                    // order date
                    orderDate = DateUtil.formatDate(orderItemDto.getCreatedDate(), dateTimeFormatter1);
                    r007ProductModelC.setOrderDate(orderDate);

                    // 製番/ Production number
                    if (dealDto.getDealStatus() == null || dealDto.getDealStatus() < Enums.DealStatus.ORDER_CONFIRMATION.getStatus()) {
                        r007ProductModelC.setOrderNo(StringUtils.EMPTY);
                        r007ProductModelC.setProductionNumber(StringUtils.EMPTY);
                    } else {
                        r007ProductModelC.setOrderNo(orderItemDto.getOrderCode2() == null ? "" : orderItemDto.getOrderCode2());
//                        r007ProductModelC.setProductionNumber(orderItemDto.getOrderCode() == null ? "" : orderItemDto.getOrderCode() + "01");
                        r007ProductModelC.setProductionNumber(orderItemDto.getOrderCode() == null ? "" : orderItemDto.getOrderCode());
                    }

                    // 2. 数量/ Quantity

                    //9.4. 数量/ Quantity
                    // 数量 = ロット数 + 各種サンプル数
                    Integer quantity = orderItemDto.getQuantity();
                    Integer sampleLift = orderItemDto.getSampleLift();
                    Integer sampleSales = orderItemDto.getSampleSales();
                    Integer sampleCustomer = orderItemDto.getSampleCustomer();
                    Integer sampleItem = orderItemDto.getSampleItem();
                    Integer sampleProduct = orderItemDto.getSampleProduct();
                    if(quantity == null) quantity = 0;
                    if(sampleLift == null) sampleLift = 0;
                    if(sampleSales == null) sampleSales = 0;
                    if(sampleCustomer == null) sampleCustomer = 0;
                    if(sampleItem == null) sampleItem = 0;
                    if(sampleProduct == null) sampleProduct = 0;
                    Integer summary = quantity + sampleLift + sampleSales + sampleCustomer + sampleItem + sampleProduct;
                    r007ProductModelC.setQuantity(String.valueOf(summary));

                    // 6. 製造仕様書/  Production specs
                    if (orderItemDto.getProductionSpecs() != null) {
                        if (orderItemDto.getProductionSpecs() == 1) {
                            r007ProductModelC.setProductionSpecs("新");
                        } else if (orderItemDto.getProductionSpecs() == 2) {
                            r007ProductModelC.setProductionSpecs("改");
                        } else if (orderItemDto.getProductionSpecs() == 3) {
                            r007ProductModelC.setProductionSpecs("修");
                        } else if (orderItemDto.getProductionSpecs() == 4) {
                            r007ProductModelC.setProductionSpecs("有");
                        } else {
                            r007ProductModelC.setProductionSpecs(StringUtils.EMPTY);
                        }
                    } else {
                        r007ProductModelC.setProductionSpecs(StringUtils.EMPTY);
                    }

                    // 7. 印刷版/ Bản in
                    if (orderItemDto.getProductionSpecs() != null) {
                        if (orderItemDto.getPrintVersion() == 1) {
                            r007ProductModelC.setPrintingVersion("なし");
                        } else if (orderItemDto.getPrintVersion() == 2) {
                            r007ProductModelC.setPrintingVersion("新");
                        } else if (orderItemDto.getPrintVersion() == 3) {
                            r007ProductModelC.setPrintingVersion("修");
                        } else if (orderItemDto.getPrintVersion() == 4) {
                            r007ProductModelC.setPrintingVersion("有");
                        } else {
                            r007ProductModelC.setPrintingVersion(StringUtils.EMPTY);
                        }
                    } else {
                        r007ProductModelC.setPrintingVersion(StringUtils.EMPTY);
                    }

                    // 8. 木型/ Khuôn gỗ
                    if (orderItemDto.getWooden() != null) {
                        if (orderItemDto.getWooden() == 1) {
                            r007ProductModelC.setWooden("なし");
                        } else if (orderItemDto.getWooden() == 2) {
                            r007ProductModelC.setWooden("新");
                        } else if (orderItemDto.getWooden() == 3) {
                            r007ProductModelC.setWooden("修");
                        } else if (orderItemDto.getWooden() == 4) {
                            r007ProductModelC.setWooden("有");
                        } else {
                            r007ProductModelC.setWooden(StringUtils.EMPTY);
                        }
                    } else {
                        r007ProductModelC.setWooden(StringUtils.EMPTY);
                    }

                    // 9. 金型/ Khuôn
                    String mold = "新・有";
                    if (orderItemDto.getMold() != null) {
                        if (orderItemDto.getMold() == 1) {
                            r007ProductModelC.setMold("なし");
                        } else if (orderItemDto.getMold() == 2) {
                            r007ProductModelC.setMold("新");
                        } else if (orderItemDto.getMold() == 4) {
                            r007ProductModelC.setMold("有");
                        } else {
                            r007ProductModelC.setMold(StringUtils.EMPTY);
                        }
                    } else {
                        r007ProductModelC.setMold(StringUtils.EMPTY);
                    }
                    r007ProductModelC.setMold(mold);

                    // fix bug 3408
                    // 10. 特記事項
                    String specialNote = Constants.BLANK;
                    if (orderItemDto.getSpecialNote() != null) {
                        specialNote = orderItemDto.getSpecialNote();
                    }
                    r007ProductModelC.setNotices(specialNote);
                }
            }
        }

        // 38. 備考（注意事項）/ Notes (Mục chú ý)
        r007ProductModelC.setNote1(productDto.getMemo1() != null ? productDto.getMemo1() : Constants.BLANK);
        r007ProductModelC.setNote2(productDto.getMemo2() != null ? productDto.getMemo2() : Constants.BLANK);
        r007ProductModelC.setNote3(productDto.getMemo3() != null ? productDto.getMemo3() : Constants.BLANK);

        // Update follow #3179: 印版外注コード/ Code order bên ngoài bản in
        if (StringUtils.isNotEmpty(productDto.getSealVersionSubcontractingCode())) {
            r007ProductModelC.setSealVersionSubcontractingCode(productDto.getSealVersionSubcontractingCode());
        } else {
            r007ProductModelC.setSealVersionSubcontractingCode(Constants.BLANK);
        }

        // 39. T
        if (productDto.getT() != null) {
            // fix bug 3179
            if (productDto.getT().compareTo(BigDecimal.ZERO) != 0) {
                r007ProductModelC.setT(String.valueOf(productDto.getT()));
            } else {
                r007ProductModelC.setT(Constants.BLANK);
            }
        } else {
            if (productDto.getTakenNumber() != null && productDto.getTakenNumber() != 0) {
                r007ProductModelC.setT(productDto.getTakenNumber().toString());
            } else {
                r007ProductModelC.setT(Constants.BLANK);
            }
        }

        // 40. SL
        if (productDto.getSl() != null) {
            // fix bug 3179
            if (productDto.getSl().compareTo(BigDecimal.ZERO) != 0) {
                r007ProductModelC.setSl(String.valueOf(productDto.getSl()));
            } else {
                r007ProductModelC.setSl(Constants.BLANK);
            }

        } else {
            if (productDto.getCartonShippingType() == EnumsPDF.CartonType.CARTON_SHEET.getType()) {
                if (blankPaperSizeW.compareTo(BigDecimal.ZERO) != 0) {
                    r007ProductModelC.setSl(String.valueOf(blankPaperSizeW.setScale(0, BigDecimal.ROUND_HALF_UP)));
                } else {
                    r007ProductModelC.setSl(Constants.BLANK);
                }
            } else {
                if (corrugatorCuttingWCounting.compareTo(BigDecimal.ZERO) != 0) {
                    r007ProductModelC.setSl(String.valueOf(corrugatorCuttingWCounting.setScale(0, BigDecimal.ROUND_HALF_UP)));
                } else {
                    r007ProductModelC.setSl(Constants.BLANK);
                }
            }
        }

        // 41. SC1
        if (productDto.getSc1() != null) {
            // fix bug 3179
            r007ProductModelC.setSc1(String.valueOf(productDto.getSc1()));
        } else {
            if (upperFlap.compareTo(BigDecimal.ZERO) != 0) {
                r007ProductModelC.setSc1(String.valueOf(upperFlap.setScale(0, BigDecimal.ROUND_HALF_UP)));
            } else {
                r007ProductModelC.setSc1(Constants.BLANK);
            }
        }

        // 42. SC2
        if (productDto.getSc2() != null) {
            // fix bug 3179
            r007ProductModelC.setSc2(String.valueOf(productDto.getSc2()));
        } else {
            if (sizeH.compareTo(BigDecimal.ZERO) != 0) {
                r007ProductModelC.setSc2(String.valueOf(sizeH.setScale(0, BigDecimal.ROUND_HALF_UP)));
            } else {
                r007ProductModelC.setSc2(Constants.BLANK);
            }
        }

        // 43. SC3
        if (productDto.getSc3() != null) {
            // fix bug 3179
            r007ProductModelC.setSc3(String.valueOf(productDto.getSc3()));
        } else {
            if (lowerFlap.compareTo(BigDecimal.ZERO) != 0) {
                r007ProductModelC.setSc3(String.valueOf(lowerFlap.setScale(0, BigDecimal.ROUND_HALF_UP)));
            } else {
                r007ProductModelC.setSc3(Constants.BLANK);
            }
        }

        // Implement follow #3179
        // 44. SC4
        if (productDto.getSc4() != null && productDto.getSc4().compareTo(BigDecimal.ZERO) != 0) {
            r007ProductModelC.setSc4(String.valueOf(productDto.getSc4()));
        } else {
            r007ProductModelC.setSc4(Constants.BLANK);
        }
        // 45. SC5
        if (productDto.getSc5() != null && productDto.getSc5().compareTo(BigDecimal.ZERO) != 0) {
            r007ProductModelC.setSc5(String.valueOf(productDto.getSc5()));
        } else {
            r007ProductModelC.setSc5(Constants.BLANK);
        }

        // 46. SC6
        if (productDto.getSc6() != null && productDto.getSc6().compareTo(BigDecimal.ZERO) != 0) {
            r007ProductModelC.setSc6(String.valueOf(productDto.getSc6()));
        } else {
            r007ProductModelC.setSc6(Constants.BLANK);
        }


        // Start Fix bug 3419
        r007ProductModelC.setCorrugatorContent("コルゲータ");
        r007ProductModelC.setSriskoContent("スリスコ");
        r007ProductModelC.setSlitterContent("スリッター");

        // a. コルゲータ/ Corrugator - default set all
        r007ProductModelC.setCorrugator("◯");

        // b. スリスコ/ Slitter scorer'
        if (slitterCuttingMethod.isUsingSrisko()) {
            r007ProductModelC.setSlitterScore("◯");
        }

        // c. スリッター/ Slitter
        if (slitterCuttingMethod.isUsingSlitter()) {
            r007ProductModelC.setSlitter("◯");
        }

        // d. Phương pháp in
        if (productDto.getShapeId() == null || (productDto.getShapeId() != null && productDto.getShapeId() != 100)) {
            if (productDto.getCartonShippingType() == EnumsPDF.CartonType.CARTON_CASE.getType()) {
                // Cố định default là 「FFG」
                r007ProductModelC.setFfg("◯");
                r007ProductModelC.setFfgContent("FFG");
            } else if (EnumsPDF.CartonType.CARTON_SHEET.getType().equals(productDto.getCartonShippingType())) {
                // Trường hợp không có in thì để  blank
                // Trường hợp có in ở  ”スリスコ製造/ Sản xuất bằng slitter scorer" thì set là 「FFG」
                // Trường hợp "スリスコ＋スリッター製造/ Sản xuất bằng slitter + slitter scorer" hoặc "スリッター製造/ Sản xuất bằng slitter" thì set là 「FD（印刷のみ/ Chỉ in）」
                if (productDto.getColorIdF() > 1) {
                    /*if (getSheetType(productDto) == 2) {
                        r007ProductModelC.setFfg("◯");
                        r007ProductModelC.setFfgContent("FFG");
                    } else {
                        r007ProductModelC.setFfg("◯");
                        r007ProductModelC.setFfgContent("FD（印刷のみ）");
                    }*/
                    if (slitterCuttingMethod == SlitterCuttingMethod.SRISKO) {
                        r007ProductModelC.setFfg("◯");
                        r007ProductModelC.setFfgContent("FFG");
                    } else if (slitterCuttingMethod.isUsingSlitter()) {
                        r007ProductModelC.setFfg("◯");
                        r007ProductModelC.setFfgContent("FD（印刷のみ）");
                    } else {
                        r007ProductModelC.setFfg(Constants.BLANK);
                        r007ProductModelC.setFfgContent(Constants.BLANK);
                    }
                } else {
                    r007ProductModelC.setFfg(Constants.BLANK);
                    r007ProductModelC.setFfgContent(Constants.BLANK);
                }
            }

        } else if (productDto.getShapeId() != null && productDto.getShapeId() == 100) {
            // Trường hợp không có in thì để  blank
            // Trường hợp có in ở  ”スリスコ製造/ Sản xuất bằng slitter scorer" thì set là 「FFG」
            // Trường hợp "スリスコ＋スリッター製造/ Sản xuất bằng slitter + slitter scorer" hoặc "スリッター製造/ Sản xuất bằng slitter" thì set là 「FD（印刷のみ/ Chỉ in）」
            if (productDto.getColorIdF() > 1) {
                if (getSheetType(productDto) == 2) {
                    r007ProductModelC.setFfg("◯");
                    r007ProductModelC.setFfgContent("FFG");
                } else {
                    r007ProductModelC.setFfg("◯");
                    r007ProductModelC.setFfgContent("FD（印刷のみ）");
                }
            } else {
                r007ProductModelC.setFfg(Constants.BLANK);
                r007ProductModelC.setFfgContent(Constants.BLANK);
            }
        }

        // e. 打抜き/ Bế
        // MEMO: こんなに条件分岐が必要かどうかは不明
        if (productDto.getShapeId() == null || (productDto.getShapeId() != null && productDto.getShapeId() != 100)) {
            if (productDto.getCartonShippingType() == EnumsPDF.CartonType.CARTON_CASE.getType()) {
                // Cố định default là 「Blank」
                r007ProductModelC.setPunching(Constants.BLANK);
            } else if (productDto.getCartonShippingType() == EnumsPDF.CartonType.CARTON_SHEET.getType()) {
                // A式以外
                if (productDto.getDieCuttingFlag() != null && productDto.getDieCuttingFlag() == 1) {
                    r007ProductModelC.setPunching("◯");
                }
                else {
                    r007ProductModelC.setPunching(Constants.BLANK);
                }
            }

        } else if (productDto.getShapeId() != null && productDto.getShapeId() == 100) {
            // Trường hợp công đoạn bế là 「あり/ Có」 thì set là 「○」
            if (productDto.getDieCuttingFlag() != null && productDto.getDieCuttingFlag() == 1) {
                r007ProductModelC.setPunching("◯");
            } else {
                r007ProductModelC.setPunching(Constants.BLANK);
            }
        }

        // f.サックマシン/ Sack machine
        // MEMO: こんなに条件分岐が必要かどうかは不明

        /*
        * A式: product_type = 1 && shape_id = null
        * 美粧: product_type = 0 && shape_id = 98
        * 片段: product_type = 0 && shape_id = 100
        * A式以外: product_type = 1
        * 紙器: product_type = 0 && shape_id in (0-16, 99)
        */

        // 片段以外
        if (productDto.getShapeId() == null || (productDto.getShapeId() != null && productDto.getShapeId() != 100)) {


            if (productDto.getCartonShippingType() == EnumsPDF.CartonType.CARTON_CASE.getType()) {
                // Cố định default là 「Blank」
                r007ProductModelC.setSackMachine(Constants.BLANK);
            } else if (productDto.getCartonShippingType() == EnumsPDF.CartonType.CARTON_SHEET.getType()) {
                // A式以外
                if (productDto.getPasteId() != null && productDto.getPasteId() != 0) {
                    r007ProductModelC.setSackMachine("◯");
                } else {
                    r007ProductModelC.setSackMachine(Constants.BLANK);
                }
            }

        } else if (productDto.getShapeId() != null && productDto.getShapeId() == 100) {

            if (productDto.getPasteId() != null && productDto.getPasteId() == 1) {
                r007ProductModelC.setSackMachine("◯");
            } else {
                r007ProductModelC.setSackMachine(Constants.BLANK);
            }
        }



        r007ProductModelC.setOtherStep1(Constants.BLANK);
        r007ProductModelC.setOtherStep2(Constants.BLANK);
        r007ProductModelC.setOtherStep3(Constants.BLANK);
        r007ProductModelC.setOtherStep4(Constants.BLANK);
        r007ProductModelC.setOtherStep5(Constants.BLANK);
        r007ProductModelC.setOtherStep6(Constants.BLANK);
        r007ProductModelC.setOtherStepCheck1(Constants.BLANK);
        r007ProductModelC.setOtherStepCheck2(Constants.BLANK);
        r007ProductModelC.setOtherStepCheck3(Constants.BLANK);
        r007ProductModelC.setOtherStepCheck4(Constants.BLANK);
        r007ProductModelC.setOtherStepCheck5(Constants.BLANK);
        r007ProductModelC.setOtherStepCheck6(Constants.BLANK);

        ProcessOtherMethod method1 = ProcessOtherMethod.valueOf(productDto.getOtherMethod1());
        ProcessOtherMethod method2 = ProcessOtherMethod.valueOf(productDto.getOtherMethod2());
        CartonPacking cartonPacking = CartonPacking.valueOf(productDto.getPackingId());

        // Other step 1
        if (method1 == ProcessOtherMethod.DIE_CUTTING_KODAMA || method2 == ProcessOtherMethod.DIE_CUTTING_KODAMA) {
            r007ProductModelC.setOtherStep1("ｺﾀﾞﾏ打抜外注");
            r007ProductModelC.setOtherStepCheck1("◯");
        } else if (method1 == ProcessOtherMethod.OUTSOURCING_KODAMA || method2 == ProcessOtherMethod.OUTSOURCING_KODAMA) {
            r007ProductModelC.setOtherStep1("ｺﾀﾞﾏｼｷ外注");
            r007ProductModelC.setOtherStepCheck1("◯");
        }

        // Other step 2
        if (cartonPacking == CartonPacking.CRAFT_WORKPIA_TENZAN) {
            r007ProductModelC.setOtherStep2("ﾜｰｸﾋﾟｱ天山");
            r007ProductModelC.setOtherStepCheck2("◯");
        }

        // Other step 3
        if (method1 == ProcessOtherMethod.SHIKIRI_KUMITATE || method2 == ProcessOtherMethod.SHIKIRI_KUMITATE) {
            r007ProductModelC.setOtherStep3("仕切");
            r007ProductModelC.setOtherStepCheck3("◯");
        }

        // Other step 5
        if (method1 == ProcessOtherMethod.SHIPPING_CARTON_SAGA || method2 == ProcessOtherMethod.SHIPPING_CARTON_SAGA) {
            r007ProductModelC.setOtherStep5("佐賀工場通函");
            r007ProductModelC.setOtherStepCheck5("◯");
        } else if (method1 == ProcessOtherMethod.SHIPPING_CARTON_TAKU || method2 == ProcessOtherMethod.SHIPPING_CARTON_TAKU) {
            r007ProductModelC.setOtherStep5("多久工場通函");
            r007ProductModelC.setOtherStepCheck5("◯");
        } else if (method1 == ProcessOtherMethod.NIBUNGIRI_SHIKIRI || method2 == ProcessOtherMethod.NIBUNGIRI_SHIKIRI) {
            r007ProductModelC.setOtherStep5("二分切り");
            r007ProductModelC.setOtherStepCheck5("◯");
        }

        // Other step 6
        String packingDisplayName = packingHelper.cartonPackingStepDisplayName(productDto);
        if (packingDisplayName != null) {
            r007ProductModelC.setOtherStep6(packingDisplayName);
            r007ProductModelC.setOtherStepCheck6("◯");
        }

        // End Fix bug 3419

        // 追加加工
        r007ProductModelC.setExtraStepList(helper.cartonExtraStepList(productDto));


        // 54. バーコード / Barcode
        if (!productDto.hasBarcode()) {
            // 製品情報にバーコードがなければチェックシートのものを使用する
            productDto.fillBarcodeFromChecksheet(checksheetDtos);
        }
        BarcodeField[] barcodeFields = barcodeHelper.createBarcodeFields(productDto);
        r007ProductModelC.setBarcode1(barcodeFields[0]);
        r007ProductModelC.setBarcode2(barcodeFields[1]);
        r007ProductModelC.setBarcode3(barcodeFields[2]);


        // 55. 1次包装区分/ Phân loại đóng gói sơ cấp
        checksheetDto = checkSheetMap.get(1003);
        if (checksheetDto != null) {
            if (checksheetDto.getRadioButton() != null && checksheetDto.getRadioButton() != null && checksheetDto.getRadioButton() == 1) {
                r007ProductModelC.setClassificationPackaging("対象");
            } else if (checksheetDto.getRadioButton() != null && checksheetDto.getRadioButton() != null && checksheetDto.getRadioButton() == 2) {
                r007ProductModelC.setClassificationPackaging("対象外");
            } else {
                r007ProductModelC.setClassificationPackaging(StringUtils.EMPTY);
            }

        } else {
            r007ProductModelC.setClassificationPackaging(StringUtils.EMPTY);
        }
        // 56. 図面/ Bản vẽ
        //1. get product file
        ProductFileDto productFile = sv008ProductService.sv00829GetPrimaryProductFile(productDto.getId());
        if (productFile != null) {
            //2. get file dto
            FileDto fileDto = sv006FileService.sv00609GetFileInfo(productFile.getFileId());
            if (fileDto != null) {
                //3. get actual file
                File file;

                //http://fridaynight.vnext.vn/issues/3491
                if ("pdf".equals(fileDto.getFileExtension().toLowerCase())) { // pdf file - get thumbnail
                    file = sv006FileService.sv00622GetThumbnail(fileDto.getFileCode());
                } else { // images file
                    file = sv006FileService.sv00606GetFile(fileDto.getFileCode());
                }

                //4. fill file stream to model
                if (file != null) {
                    try {
                        r007ProductModelC.setDrawingImg(new FileInputStream(file));
                    } catch (FileNotFoundException e) {
                        e.printStackTrace();
                        logger.error("*** File not found ***");
                    }
                }
            }
        }


        // II. Back
        // II. Back
        // 1. 受注履歴/ Order history
        List<R007OrderHistoryC> listOrderHistory1 = new ArrayList<>();
        List<R007OrderHistoryC> listOrderHistory2 = new ArrayList<>();
        List<OrderItemDto> orderItemDtosHistory = orderItemDao.getOrderItemsByProductId(productDto.getId());
        if (!orderItemDtosHistory.isEmpty()) {
            for (OrderItemDto item : orderItemDtosHistory) {
                R007OrderHistoryC r007OrderHistoryC = new R007OrderHistoryC();
                // 1.1. 受注日/ Ngày order
                r007OrderHistoryC.setOrderHistory(DateUtil.formatDate(item.getCreatedDate(), dateTimeFormatter2));

                // 1.2. 数量/ Quantity
                if (item.getQuantity() != null) {
                    r007OrderHistoryC.setQuantityHistory(String.valueOf(item.getQuantity()));
                } else {
                    r007OrderHistoryC.setQuantityHistory(StringUtils.EMPTY);
                }

                // 1.3. 単価/ Unit price
                if (item.getSubmittedPrice() != null) {
                    r007OrderHistoryC.setUnitPriceHistory(String.valueOf(item.getSubmittedPrice()));
                } else {
                    r007OrderHistoryC.setUnitPriceHistory(StringUtils.EMPTY);
                }

                // 1.4. 納期/ Delivery date
                DealDto dealDtoHistory = dealDao.getDealDtoByOrderId(item.getOrderId());
                if (dealDtoHistory != null) {
                    if (dealDtoHistory.getDeliveryDate() != null) {
                        r007OrderHistoryC.setDeliveryDateHistory(DateUtil.formatDate(dealDtoHistory.getDeliveryDate(), dateTimeFormatter2));
                    } else {
                        r007OrderHistoryC.setDeliveryDateHistory(StringUtils.EMPTY);
                    }
                } else {
                    r007OrderHistoryC.setDeliveryDateHistory(StringUtils.EMPTY);
                }

                if (listOrderHistory1.size() < 25) {
                    listOrderHistory1.add(r007OrderHistoryC);
                } else {
                    listOrderHistory2.add(r007OrderHistoryC);
                }
            }
            r007ProductModelC.setListOrderHistory1(listOrderHistory1);
            r007ProductModelC.setListOrderHistory2(listOrderHistory2);
        }
        // 2. 見積情報/ Thông tin QTN
        // 2.1. ロット/ Lot
        // 2.2. 単価/ Unit price
        DealProductDto dealProductDto = dealProductDao.getDealProductByDealIdAndProductId(dealDto.getId(), productDto.getId());
        if (dealProductDto != null) {
            List<QuotationItemDto> quotationItemDtos = quotationItemDao.getQuotationItemsByDealProductId(dealProductDto.getId());
            if (!quotationItemDtos.isEmpty()) {
                List<R007QuotationInfoC> r007QuotationInfoCS = new ArrayList<>();
                for (QuotationItemDto quotationItemDto : quotationItemDtos) {
                    R007QuotationInfoC r007QuotationInfoC = new R007QuotationInfoC();
                    if (quotationItemDto.getQuantity() != null) {
                        r007QuotationInfoC.setLot(String.valueOf(quotationItemDto.getQuantity()));
                    }
                    if (quotationItemDto.getSubmittedPrice() != null) {
                        r007QuotationInfoC.setUnitPrice(String.valueOf(quotationItemDto.getSubmittedPrice()));
                    }
                    r007QuotationInfoCS.add(r007QuotationInfoC);
                }
                r007ProductModelC.setR007QuotationInfoCS(r007QuotationInfoCS);
            }
        }

        // 3. マスタ項目/ Item master
        // 3.1. 末端業種区分/ Phân loại end business type
        checksheetDto = checkSheetMap.get(1010);
        if (checksheetDto != null) {
            if (checksheetDto.getSelectBox1() != null) {
                if (checksheetDto.getSelectBox1() == 1) {
                    r007ProductModelC.setClassificationEndIndustry("食料品製造業");
                } else if (checksheetDto.getSelectBox1() == 2) {
                    r007ProductModelC.setClassificationEndIndustry("清涼飲料製造業及び茶");
                } else if (checksheetDto.getSelectBox1() == 3) {
                    r007ProductModelC.setClassificationEndIndustry("酒類製造業");
                } else if (checksheetDto.getSelectBox1() == 4) {
                    r007ProductModelC.setClassificationEndIndustry("油脂加工製品・石鹸");
                } else if (checksheetDto.getSelectBox1() == 5) {
                    r007ProductModelC.setClassificationEndIndustry("医薬品製造業");
                } else if (checksheetDto.getSelectBox1() == 6) {
                    r007ProductModelC.setClassificationEndIndustry("化粧品・歯磨・その他");
                } else if (checksheetDto.getSelectBox1() == 7) {
                    r007ProductModelC.setClassificationEndIndustry("小売業");
                } else if (checksheetDto.getSelectBox1() == 8) {
                    r007ProductModelC.setClassificationEndIndustry("その他の業種");
                } else {
                    r007ProductModelC.setClassificationEndIndustry(StringUtils.EMPTY);
                }
            } else {
                r007ProductModelC.setClassificationEndIndustry(StringUtils.EMPTY);
            }
        } else {
            r007ProductModelC.setClassificationEndIndustry(StringUtils.EMPTY);
        }

        // 3.2. 容器包装区分/ Phân loại đóng gói bao bì đồ đựng
        // 3.3. 費用負担有無/ Có - không chịu chi phí
        // 3.4. 廃棄種別/ Phân loại hủy
        checksheetDto = checkSheetMap.get(1011);
        if (checksheetDto != null) {
            if (checksheetDto.getSelectBox1() != null) {
                if (checksheetDto.getSelectBox1() == 111) {
                    r007ProductModelC.setClassificationPackagingContainer("段ｼｰﾄ（容器包装以外)");
                } else if (checksheetDto.getSelectBox1() == 112) {
                    r007ProductModelC.setClassificationPackagingContainer("段ｹｰｽ (容器包装)");
                } else if (checksheetDto.getSelectBox1() == 221) {
                    r007ProductModelC.setClassificationPackagingContainer("紙器 紙器製品");
                } else if (checksheetDto.getSelectBox1() == 223) {
                    r007ProductModelC.setClassificationPackagingContainer("紙器 美粧シート");
                } else if (checksheetDto.getSelectBox1() == 224) {
                    r007ProductModelC.setClassificationPackagingContainer("紙器 美粧ケース");
                } else if (checksheetDto.getSelectBox1() == 225) {
                    r007ProductModelC.setClassificationPackagingContainer("紙器 貼合シート");
                } else if (checksheetDto.getSelectBox1() == 226) {
                    r007ProductModelC.setClassificationPackagingContainer("紙器 貼合ケース");
                } else if (checksheetDto.getSelectBox1() == 331) {
                    r007ProductModelC.setClassificationPackagingContainer("商事 段ボール");
                } else if (checksheetDto.getSelectBox1() == 332) {
                    r007ProductModelC.setClassificationPackagingContainer("商事 紙器");
                } else if (checksheetDto.getSelectBox1() == 333) {
                    r007ProductModelC.setClassificationPackagingContainer("商事 美粧ケース");
                } else if (checksheetDto.getSelectBox1() == 334) {
                    r007ProductModelC.setClassificationPackagingContainer("商事 貼合ケース");
                } else if (checksheetDto.getSelectBox1() == 341) {
                    r007ProductModelC.setClassificationPackagingContainer("商事 ガラスビン");
                } else if (checksheetDto.getSelectBox1() == 342) {
                    r007ProductModelC.setClassificationPackagingContainer("商事 ＰＥＴボトル");
                } else if (checksheetDto.getSelectBox1() == 343) {
                    r007ProductModelC.setClassificationPackagingContainer("商事 その他紙製容器");
                } else if (checksheetDto.getSelectBox1() == 344) {
                    r007ProductModelC.setClassificationPackagingContainer("商事 その他プラ容器");
                } else if (checksheetDto.getSelectBox1() == 351) {
                    r007ProductModelC.setClassificationPackagingContainer("商事 容器包装以外");
                } else if (checksheetDto.getSelectBox1() == 999) {
                    r007ProductModelC.setClassificationPackagingContainer("容器以外及び対象外");
                } else {
                    r007ProductModelC.setClassificationPackagingContainer(StringUtils.EMPTY);
                }
            }

            if (checksheetDto.getRadioButton() != null) {
                if (checksheetDto.getRadioButton() == 1) {
                    r007ProductModelC.setIsExpenseBurden("あり");
                } else if (checksheetDto.getRadioButton() == 2) {
                    r007ProductModelC.setIsExpenseBurden("なし");
                } else if (checksheetDto.getRadioButton() == 3) {
                    r007ProductModelC.setIsExpenseBurden("容器以外及び対象外");
                } else {
                    r007ProductModelC.setIsExpenseBurden(StringUtils.EMPTY);
                }
            }

            if (checksheetDto.getSelectBox2() != null) {
                if (checksheetDto.getSelectBox2() == 1) {
                    r007ProductModelC.setDecompositionType("一般廃棄物");
                } else if (checksheetDto.getSelectBox2() == 2) {
                    r007ProductModelC.setDecompositionType("事業系廃棄物");
                } else if (checksheetDto.getSelectBox2() == 3) {
                    r007ProductModelC.setDecompositionType("海外廃棄物");
                } else if (checksheetDto.getSelectBox2() == 9) {
                    r007ProductModelC.setDecompositionType("容器以外及び対象外");
                } else {
                    r007ProductModelC.setDecompositionType(StringUtils.EMPTY);
                }
            }
        } else {
            r007ProductModelC.setClassificationPackagingContainer(StringUtils.EMPTY);
            r007ProductModelC.setIsExpenseBurden(StringUtils.EMPTY);
            r007ProductModelC.setDecompositionType(StringUtils.EMPTY);
        }

        return r007ProductModelC;
    }

    /**
     * create model for R009
     *
     * @param inventoryDtos
     * @param customerDto
     * @return R009Model
     */
    @Override
    public R009Model createR009Model(List<InventoryDto> inventoryDtos, CustomerDto customerDto) throws
            IOException {
        R009Model r009Model = new R009Model();

        /* ---Start Header--- */
        // 1. 得意先名/ Customer name
        if (StringUtils.isNotEmpty(customerDto.getName())) {
            r009Model.setCustomerName(customerDto.getName() + "　御中");
        }

        // 2. 得意先担当者名/ Tên người phụ trách customer
        if (customerDto.getCustomerRep() != null) {
            r009Model.setCustomerPicName(customerDto.getCustomerRep());
        }

        // 3. 営業担当名/ Tên phụ trách sales
        // Format「部門・グループ名/ Tên bộ phận・group」＋「担当者名/ Tên PIC」
        StringBuilder salerPicName = new StringBuilder();
        if (customerDto.getSalerName() != null) {
            UserDto salerPic = userDao.findUserByUserCode(customerDto.getPicCode());
            if (salerPic != null) {
                if (salerPic.getDepartmentId() != null) {
                    DepartmentDto departmentDto = departmentDao.find(salerPic.getDepartmentId());
                    if (departmentDto != null) {
                        salerPicName.append(departmentDto.getDepartment());
                        salerPicName.append(Constants.SLASH_JP);
                    }
                }
                salerPicName.append(salerPic.getUsername());
            }
        }
        r009Model.setSalePicName(salerPicName.toString());

        UserDto currentUser = authService.getCurrentUser();
        DepartmentDto departmentDto = departmentDao.find(currentUser.getDepartmentId());
        if (departmentDto != null) {
            // 4. 電話番号/ Số điện thoại
            if (departmentDto.getTel() != null) {
                r009Model.setPhoneNumber(departmentDto.getTel());
            }

            // 5. FAX番号/ Số FAX
            if (departmentDto.getFax() != null) {
                r009Model.setFaxNumber(departmentDto.getFax());
            }
        }

        // 6. ご報告日/ Ngày báo cáo
        String reportedDate = DateUtil.formatDate(DateUtil.getSysDate(), "yyyyMMdd");
        r009Model.setDateReport(reportedDate);

        // 7. ページ数／総ページ数 / Số page/ Tổng số page
        // Code implement in Jasper File

        /* ---End Header--- */

        /* ---Start List--- */
        List<R009ListProduct> r009ListProducts = new ArrayList<>();

        Integer size = inventoryDtos.size();

        if (size < 16) {
            r009ListProducts = this.getR009ListProducts(r009ListProducts, inventoryDtos);
            for (int i = 0; i < 16 - size; i++) {
                R009ListProduct item = new R009ListProduct();
                r009ListProducts.add(item);
            }
        } else {
            r009ListProducts = this.getR009ListProducts(r009ListProducts, inventoryDtos);
        }
        /* ---END List--- */
        r009Model.setR009ListProducts(r009ListProducts);

        File file = ReportConf.getLogoSagasikiPath();
        InputStream fileInputStream = new FileInputStream(file);
        r009Model.setLogoSagasiki(fileInputStream);
        return r009Model;
    }

    /**
     * @param orderItemDtos
     * @param customerDto
     * @return R10 List product SF00402
     * @author nguyenpk
     */
    @Override
    public R010Model createR010Model(final List<OrderItemDto> orderItemDtos, final CustomerDto customerDto) throws
            IOException {
        R010Model model = new R010Model();
        /* ---Start Header--- */
        // 1. 得意先名/ Customer name
        if (StringUtils.isNotEmpty(customerDto.getName())) {
            model.setCustomerName(customerDto.getName() + "　御中");
        }

        // 2. 得意先担当者名/ Tên người phụ trách customer
        if (customerDto.getCustomerRep() != null) {
            model.setCustomerPicName(customerDto.getCustomerRep());
        }

        // 3. 営業担当名/ Tên phụ trách sales
        // Format「部門・グループ名/ Tên bộ phận・group」＋「担当者名/ Tên PIC」
        StringBuilder salerPicName = new StringBuilder();
        if (customerDto.getSalerName() != null) {
            UserDto salerPic = userDao.findUserByUserCode(customerDto.getPicCode());
            if (salerPic != null) {
                if (salerPic.getDepartmentId() != null) {
                    DepartmentDto departmentDto = departmentDao.find(salerPic.getDepartmentId());
                    if (departmentDto != null) {
                        salerPicName.append(departmentDto.getDepartment());
                        salerPicName.append(Constants.SLASH_JP);
                    }
                }
                salerPicName.append(salerPic.getUsername());
            }
        }
        model.setSalePicName(salerPicName.toString());

        UserDto currentUser = authService.getCurrentUser();
        DepartmentDto departmentDto = departmentDao.find(currentUser.getDepartmentId());
        if (departmentDto != null) {
            // 4. 電話番号/ Số điện thoại
            if (departmentDto.getTel() != null) {
                model.setPhoneNumber(departmentDto.getTel());
            }

            // 5. FAX番号/ Số FAX
            if (departmentDto.getFax() != null) {
                model.setFaxNumber(departmentDto.getFax());
            }
        }

        // 6. ご報告日/ Ngày báo cáo
        String reportedDate = DateUtil.formatDate(DateUtil.getSysDate(), "yyyyMMdd");
        model.setDateReport(reportedDate);

        // 7. ページ数／総ページ数 / Số page/ Tổng số page
        // Code implement in Jasper File

        /* ---End Header--- */
        /* ---Start List--- */
        List<R010ProductItemModel> listProduct = new ArrayList<>();

        Integer size = orderItemDtos.size();
        if (size < 16) {
            listProduct = this.getR010ListProducts(listProduct, orderItemDtos);
            for (int i = 0; i < 16 - size; i++) {
                R010ProductItemModel itemModel = new R010ProductItemModel();
                listProduct.add(itemModel);
            }
        } else {
            listProduct = this.getR010ListProducts(listProduct, orderItemDtos);
        }
        /* ---END List--- */

        model.setListProduct(listProduct);
        File file = ReportConf.getLogoSagasikiPath();
        InputStream fileInputStream = new FileInputStream(file);
        model.setLogoSagasiki(fileInputStream);
        return model;
    }

    /**
     * calculate day
     *
     * @param updatedDate
     * @return day
     */

    private Integer calculateNoOfDays(final DateTime updatedDate) {
        if (updatedDate != null) {
            long millisecondsPerDay = 24 * 60 * 60 * 1000;
            return Math.round(Math.abs((DateUtil.getSysDate().getMillis() - updatedDate.getMillis()) / (millisecondsPerDay))) + 1;
        }
        return null;
    }

    private String getPackingMethod(Integer packingId) {
        if (packingId != null) {
            switch (packingId) {
                case 1:
                    return "ｸﾗﾌﾄ梱包（多久）";
                case 2:
                    return "ｸﾗﾌﾄ梱包（コダマ）";
                case 3:
                    return "ｸﾗﾌﾄ梱包（佐賀）";
                case 4:
                    return "ｼｭﾘﾝｸ梱包（佐賀）";
                case 5:
                    return "段ﾎﾞｰﾙ梱包（社用）";
                case 6:
                    return "段ﾎﾞｰﾙ梱包（専用）";
                case 7:
                    return "パレット板締め";
                default:
                    return StringUtils.EMPTY;
            }
        }
        return StringUtils.EMPTY;
    }

    /**
     * get sheet type
     *
     * @param productDto
     * @return
     */
    public int getSheetType(ProductDto productDto) {
        int type; //1: Slitter スリッター, 2: Srisko スリスコ, 3: Slitter + Srisko
        if (productDto.getBlankPaperSizeW().intValue() < 190) {
            return 1;
        } else {
            if (productDto.getBlankPaperSizeW().intValue() < 600) {
                return 3;
            } else {
                return 2;
            }
        }
    }

    public int calcFlowNumber(BigDecimal blankSizeH) {
        int floorValue = 600;
        int ceilValue = 1450;
        int x = 0;
        int result = blankSizeH.intValue();
        if (result >= floorValue && result <= 1450) {
            return 1;
        } else if (result <= floorValue) {
            x++;
            while (x < 42) {
                result = blankSizeH.intValue() * 4 * x + 15 * x;
                if (result >= floorValue && result <= 1450) {
                    return x * 4;
                } else if (x == 1 && result > 1450) {
                    return (int) Math.floor(1450 / blankSizeH.intValue());
                } else {
                    x++;
                }
            }
            return 164;
        } else {
            return 1;
        }
    }

    /**
     * get material name
     *
     * @param laminationType
     * @param laminationId
     * @param constType
     * @return
     */
    private String getMaterialName(Integer laminationType, Integer laminationId, Integer constType, BigDecimal weight, BigDecimal width, int wastePaperFlag) {
        if (weight != null) {
            weight = weight.setScale(0, BigDecimal.ROUND_HALF_UP);
        }
        MstLaminationDto mstLaminationDto;
        if (laminationType != null && laminationType.equals(constType)) {
            mstLaminationDto = mstLaminationDao.find(laminationId);
            if (mstLaminationDto != null) {
                List<MstSheetSizeDto> mstSheetSizeDtos = sheetSizeDao.findSheetSizeByLaminationAndSize(laminationId, width);
                if (mstSheetSizeDtos.size() > 0) {
                    MstSheetSizeDto mstSheetSizeDto = mstSheetSizeDtos.get(0);
                    if (mstSheetSizeDto.getWastePaperFlag() != null && mstSheetSizeDto.getWastePaperFlag() == 1) {
                        this.wastePaperFlag = 1;
                    }
                    if (mstSheetSizeDto.getWastePaperFlag() != null && mstSheetSizeDto.getWastePaperFlag() == 2 && wastePaperFlag != 1) {
                        this.wastePaperFlag = 2;
                    }
                    return mstSheetSizeDto.getName();
                } else {
                    return mstLaminationDto.getMaterialName();
                }
            }
        } else if (laminationType != null && laminationType > 0) {
            if (laminationType == 16) {
                return "K" + weight.setScale(0, BigDecimal.ROUND_HALF_UP);
            } else if (laminationType == 5) {
                return "K(NRK)" + weight.setScale(0, BigDecimal.ROUND_HALF_UP);
            } else if (laminationType == 6) {
                return "CWF" + weight.setScale(0, BigDecimal.ROUND_HALF_UP);
            } else if (laminationType == 9) {
                return "BWF" + weight.setScale(0, BigDecimal.ROUND_HALF_UP);
            } else if (laminationType == 3) {
                return "C" + weight.setScale(0, BigDecimal.ROUND_HALF_UP);
            } else if (laminationType == 1) {
                return "SCP" + weight.setScale(0, BigDecimal.ROUND_HALF_UP);
            } else if (laminationType == 14) {
                return "SAM-S" + weight.setScale(0, BigDecimal.ROUND_HALF_UP);
            }
            return StringUtils.EMPTY;
        }
        return StringUtils.EMPTY;
    }

    /**
     * get material name
     *
     * @param laminationType
     * @param laminationId
     * @param constType
     * @return
     */
    private String getMaterialNameR10(Integer laminationType, Integer laminationId, Integer constType, BigDecimal weight) {
        if (weight != null) {
            weight = weight.setScale(0, BigDecimal.ROUND_HALF_UP);
        }
        MstLaminationDto mstLaminationDto;
        if (laminationType != null && laminationType.equals(constType)) {
            mstLaminationDto = mstLaminationDao.find(laminationId);
            if (mstLaminationDto != null) {
                return mstLaminationDto.getMaterialName();
            }
        } else if (laminationType != null && laminationType > 0) {
            if (laminationType == 16) {
                return "K" + weight.setScale(0, BigDecimal.ROUND_HALF_UP);
            } else if (laminationType == 5) {
                return "K(NRK)" + weight;
            } else if (laminationType == 6) {
                return "CWF" + weight;
            } else if (laminationType == 9) {
                return "BWF" + weight;
            } else if (laminationType == 3) {
                return "C" + weight;
            } else if (laminationType == 1) {
                return "SCP" + weight;
            } else if (laminationType == 14) {
                return "SAM-S" + weight;
            }
            return StringUtils.EMPTY;
        }
        return StringUtils.EMPTY;
    }

    /**
     * @deprecated Use vn.vnext.sefuri.sf.module.export.helper.ProductSizeHelper.calcDefaulFlap(ProductDto)
     */
    @Deprecated
    public BigDecimal calcDefaulFlap(ProductDto productDto) {
        return productSizeHelper.calcDefaulFlap(productDto);
    }

    /**
     * @param offsetColor
     * @return offsetColorToValue
     * @author nguyenpk
     */
    public Integer offsetColorToValue(Integer offsetColor) {
        return ((offsetColor == null || offsetColor == 0) ? 0 : (offsetColor - 1));
    }

    public Integer offsetColorCount(Integer preValue, Integer curValue) {
        return this.offsetColorToValue(preValue) + this.offsetColorToValue(curValue);
    }

    /**
     * @param digitalColor
     * @return
     * @author nguyenpk
     */
    public Integer digitalColorToValue(Integer digitalColor) {
        Integer value = null;
        if (digitalColor == null || digitalColor == 1)
            value = 0;
        else if (digitalColor == 9)
            value = 1;
        else if (digitalColor == 10)
            value = 4;
        else if (digitalColor == 11)
            value = 7;
        return value;
    }

    public String formatColorsViaPrintMethod(ProductDto productDto) {
        final String UNSPECIFIED = "印刷なし";
        final String symbol = "モノクロ";
        //carton
        if (productDto.getProductType() != null && productDto.getProductType() == 1) {
            if (productDto.getColorIdF() == null || productDto.getColorIdF() == 0) {
                return UNSPECIFIED;
            } else {
                Integer colors = productDto.getColorIdF() - 1;
                return colors + COLOR_UNIT;
            }
        }

        if (productDto.getPrintMethod() != null) {
            //OFFSET_PRINTING
            if (productDto.getPrintMethod() == 1) {
//                Integer colorsF = this.offsetColorCount(new Integer[]{productDto.getColorIdF(), productDto.getSpecialColorF()});
//                Integer colorsB = this.offsetColorCount(new Integer[]{productDto.getColorIdB(), productDto.getSpecialColorB()});
                Integer colorsF = productDto.getColorIdF();
                Integer colorsB = productDto.getColorIdB();

                if (colorsB == 0 && colorsF == 0) {
                    return UNSPECIFIED;
                } else {
                    return colorsF + COLOR_UNIT + Constants.SLASH_JP + colorsB + COLOR_UNIT;
                }
            }

            //DIGITAL_PRINTING
            if (productDto.getPrintMethod() == 2) {
                Integer colorsF = this.digitalColorToValue(productDto.getColorIdF());
                Integer colorsB = this.digitalColorToValue(productDto.getColorIdB());
                if (colorsB == 0 && colorsF == 0) {
                    return UNSPECIFIED;
                }
                String readColorsF = colorsF == 1 ? symbol : colorsF + COLOR_UNIT;
                String readColorsB = colorsB == 1 ? symbol : colorsB + COLOR_UNIT;
                return readColorsF + Constants.SLASH_JP + readColorsB;
            }
        } else {
            return UNSPECIFIED;
        }
        return null;
    }

    /**
     * @param r009ListProducts
     * @param inventoryDtos
     * @return List<R009ListProduct> r009ListProducts
     */
    private List<R009ListProduct> getR009ListProducts(List<R009ListProduct> r009ListProducts, List<InventoryDto> inventoryDtos) {
        for (InventoryDto inventoryDto : inventoryDtos) {
            R009ListProduct item = new R009ListProduct();


            OrderItemDto orderItemDto = inventoryDto.getOrderItemDto();

            // 18. 仕掛かり数/ Số lượng in-process follow Q&A 2977
            Integer numberInProcess = 0;
            // 18.1 Get list order item using product
            List<OrderItemDto> orderItemDtos = orderItemDao.getOrderItemsByProductId(orderItemDto.getProductId());
            for (OrderItemDto orderItemProduct : orderItemDtos) {
                DealDto dealDto = dealDao.getDealDtoByOrderId(orderItemProduct.getOrderId());
                if (dealDto != null) {
                    // Deal has been ordered but not yet produced [deal.deal_status == 4]
                    if (dealDto.getDealStatus() == 4) {
                        numberInProcess += orderItemProduct.getQuantity();
                    }
                }
            }
            item.setNumberOfInProcess(String.valueOf(numberInProcess));

            if (orderItemDto != null) {
                ProductDto productDto = orderItemDto.getProductDto();
                if (productDto != null) {
                    // 8. 商品コード/ Product code
                    if (productDto.getCustomerProductCode() != null) {
                        item.setProductCode(productDto.getCustomerProductCode());
                    }

                    // 9. 商品名/ Product name
                    item.setProductName(productDto.getProductName());

                    // 19. 備考/ Notes
                    String memo = FormatUtil.concatItem(" ／ ", productDto.getMemo1(), productDto.getMemo2(), productDto.getMemo3());
                    if (memo.length() > 30) {
                        memo = memo.substring(0, 30);
                    }
                    item.setNote(memo);
                }

                // 10. 受注番号/ Order No
                if (orderItemDto.getOrderCode() != null) {
                    item.setOrderNo(orderItemDto.getOrderCode());
                }

                // 11. 注文数/ Số lượng order
                if (orderItemDto.getQuantity() != null) {
                    String quantityOrder;
                    if (orderItemDto.getQuantity() > 999) {
                        quantityOrder = new DecimalFormat(PATTERN_FORMAT_DECIMAL).format(orderItemDto.getQuantity());
                    } else {
                        quantityOrder = String.valueOf(orderItemDto.getQuantity());
                    }
                    item.setNumberOfOrder(quantityOrder);
                }

                // 12. 単価/ Unit price
                if (orderItemDto.getSubmittedPrice() != null) {
                    item.setUnitPrice(String.valueOf(orderItemDto.getSubmittedPrice()));
                }

                // 13. 仕上予定日/ Ngày dự định finish
                //http://fridaynight.vnext.vn/issues/3134
                if (numberInProcess > 0) {
                    DealDto dealDto = dealDao.getDealDtoByOrderId(orderItemDto.getOrderId());
                    if (dealDto != null) {
                        if (dealDto.getDeliveryDate() != null) {
                            item.setExpectedFinishDate(DateUtil.formatDate(dealDto.getDeliveryDate(), "yyyyMMdd"));
                        }
                    }
                }
            }

            // 14. 在庫数/ Số lượng stock
            String numberOfStock;
            if (inventoryDto.getQuantity() > 999) {
                numberOfStock = new DecimalFormat(PATTERN_FORMAT_DECIMAL).format(inventoryDto.getQuantity());
            } else {
                numberOfStock = String.valueOf(inventoryDto.getQuantity());
            }
            item.setNumberOfStock(numberOfStock);

            // 15. 在庫金額/ Số tiền stock
            if (StringUtils.isNotEmpty(item.getUnitPrice())) {
                BigDecimal unitPrice = new BigDecimal(item.getUnitPrice());
                BigDecimal quantity = BigDecimal.valueOf(inventoryDto.getQuantity());
                BigDecimal stockValue = unitPrice.multiply(quantity);
                String stockValueS;
                if (stockValue.compareTo(BigDecimal.valueOf(999)) > 0) {
                    stockValueS = new DecimalFormat(PATTERN_FORMAT_DECIMAL).format(stockValue);
                } else {
                    stockValueS = String.valueOf(stockValue);
                }
                if (StringUtils.isNotEmpty(stockValueS)) {
                    stockValueS = "¥" + stockValueS;
                }
                item.setStockValue(stockValueS);
            }

            // 16. 製造完了日/ Ngày hoàn thành sản xuất
            if (inventoryDto.getRegistrationDate() != null) {
                item.setCompletedDate(DateUtil.formatDate(inventoryDto.getRegistrationDate(), "yyyyMMdd"));
            }

            // 17. 在庫日数/ Số ngày stock
            if (inventoryDto.getRegistrationDate() != null) {
                Integer daysOfStock = calculateNoOfDays(inventoryDto.getRegistrationDate());
                item.setDayOfStock(String.valueOf(daysOfStock));
            }

            r009ListProducts.add(item);
        }
        return r009ListProducts;
    }

    /**
     * @param listProduct
     * @param orderItemDtos
     * @return List<R010ProductItemModel>
     */
    private List<R010ProductItemModel> getR010ListProducts(List<R010ProductItemModel> listProduct, List<OrderItemDto> orderItemDtos) {
        for (OrderItemDto orderItemDto : orderItemDtos) {
            R010ProductItemModel itemModel = new R010ProductItemModel();
            ProductDto productDto = orderItemDto.getProductDto();
            MstWoodenDto mstWoodenDto = new MstWoodenDto();
            if (productDto.getWoodenCode() != null) {
                mstWoodenDto = sv008ProductService.sv00843getWoodenByProductId(productDto.getWoodenCode());
            }
            //商品コード/Product code http://fridaynight.vnext.vn/issues/3296
            if (StringUtils.isEmpty(productDto.getCustomerProductCode())) {
                itemModel.setProductCode(productDto.getItemCode());
            } else {
                itemModel.setProductCode(productDto.getCustomerProductCode());
            }
            //商品名/Product name
            itemModel.setProductName(productDto.getProductName());
            //寸法/Kích thước
            itemModel.setSize((productDto.getSizeW() == null ? "" : String.valueOf(productDto.getSizeW().setScale(0, BigDecimal.ROUND_HALF_UP)) + X_MULTI) +
                    (productDto.getSizeH() == null ? "" : String.valueOf(productDto.getSizeH().setScale(0, BigDecimal.ROUND_HALF_UP)) + X_MULTI) +
                    (productDto.getSizeD() == null ? "" : String.valueOf(productDto.getSizeD().setScale(0, BigDecimal.ROUND_HALF_UP))));

            //材質/ Chất liệu
            String paperWeight = productDto.getPaperWeight() != null ? String.valueOf(productDto.getPaperWeight().setScale(0, BigDecimal.ROUND_HALF_UP)) : "0";
            String paperBoardName = StringUtils.EMPTY;
            if (productDto.getPaperId() == null) {
                if (productDto.getPaperNameId() != null) {
                    if (productDto.getPaperNameId() == 5) {
                        paperBoardName = "SQカード";
                    } else if (productDto.getPaperNameId() == 7) {
                        paperBoardName = "JETエースW";
                    } else if (productDto.getPaperNameId() == 20) {
                        paperBoardName = "NEWピジョン";
                    } else if (productDto.getPaperNameId() == 12) {
                        paperBoardName = "TitanBoard";
                    } else if (productDto.getPaperNameId() == 1) {
                        paperBoardName = "MCFコート";
                    } else if (productDto.getPaperNameId() == 2) {
                        paperBoardName = "NSコート";
                    } else if (productDto.getPaperNameId() == 13) {
                        paperBoardName = "SCコート";
                    } else if (productDto.getPaperNameId() == 3) {
                        paperBoardName = "サンコート";
                    } else if (productDto.getPaperNameId() == 22) {
                        paperBoardName = "CRC";
                    }
                    if (StringUtils.isNotEmpty(paperBoardName)) {
                        paperBoardName = paperBoardName + paperWeight + Constants.GRAM;
                    }
                }
            } else {
                MstPaperDto mstPaperDto = mstPaperDao.find(productDto.getPaperId());
                if (productDto.getPaperNameId() != null && productDto.getPaperNameId() != 100) {
                    paperBoardName = (mstPaperDto.getPaperName() == null ? "" : mstPaperDto.getPaperName()) + Constants.SPACE + paperWeight + Constants.GRAM;
                } else {
                    paperBoardName = mstPaperDto.getPaperName() == null ? mstPaperDto.getPaperName() : "";
                }
            }
            itemModel.setMaterial(paperBoardName);

            //check for carton
            if (productDto.getProductType() == 1) {
                // 21. 材質/ Chất liệu
                StringBuilder material = new StringBuilder();

                //      21.1 Paper front
                String materialPaperFront = getMaterialNameR10(productDto.getLaminationPaperTypeFront(), productDto.getLaminationFrontId(), 100, productDto.getLaminationFrontBasicWeight());

                //      21.1 Paper B
                String materialPaperB = getMaterialNameR10(productDto.getLaminationPaperTypeB(), productDto.getLaminationBId(), 101, productDto.getLaminationBBasicWeight());

                //      21.1 Paper medium
                String materialPaperMedium = getMaterialNameR10(productDto.getLaminationPaperTypeMedium(), productDto.getLaminationMediumId(), 102, productDto.getLaminationMediumBasicWeight());

                //      21.1 Paper A
                String materialPaperA = getMaterialNameR10(productDto.getLaminationPaperTypeA(), productDto.getLaminationAId(), 103, productDto.getLaminationABasicWeight());

                //      21.1 Paper back
                String materialPaperBack = getMaterialNameR10(productDto.getLaminationPaperTypeBack(), productDto.getLaminationBackId(), 104, productDto.getLaminationBackBasicWeight());

                material.append(StringUtils.isNotEmpty(materialPaperFront) ? materialPaperFront + CHECK_SLASH : "");
                material.append(StringUtils.isNotEmpty(materialPaperB) ? materialPaperB + CHECK_SLASH : "");
                material.append(StringUtils.isNotEmpty(materialPaperMedium) ? materialPaperMedium + CHECK_SLASH : "");
                material.append(StringUtils.isNotEmpty(materialPaperA) ? materialPaperA + CHECK_SLASH : "");
                material.append(StringUtils.isNotEmpty(materialPaperBack) ? materialPaperBack : "");
                itemModel.setMaterial(String.valueOf(material));
            }

            //印刷/In
            itemModel.setPrint(this.formatColorsViaPrintMethod(productDto)); //TODO


            //単価/Unit price
            itemModel.setUnitPrice(orderItemDto.getSubmittedPrice() == null ? "" : String.valueOf(orderItemDto.getSubmittedPrice()));

            //ロット/Lot
            if (orderItemDto.getQuantity() != null && orderItemDto.getQuantity() > 999) {
                itemModel.setLot(new DecimalFormat(PATTERN_FORMAT_DECIMAL).format(orderItemDto.getQuantity()));
            } else
                itemModel.setLot(orderItemDto.getQuantity() == null ? "" : String.valueOf(orderItemDto.getQuantity()));

            //木型/Khuôn gỗ
            if (productDto.getWoodenCode() != null) {
                itemModel.setWoodenCode(productDto.getWoodenCode());
            }

            //木型有効期限/ Thời hạn có hiệu lực của khuôn gỗ
            Integer year = null, month = null, day = null;
            // #3253
            if (mstWoodenDto != null && mstWoodenDto.getLastUse() != null) {
                DateTime lastUser = mstWoodenDto.getLastUse().plusYears(3);
                itemModel.setWoodenExpiredDate((DateUtil.formatDate(lastUser, dateTimeFormatter3)));
            }
            // 19. 備考/ Notes
            String memo = FormatUtil.concatItem(" ／ ", productDto.getMemo1(), productDto.getMemo2(), productDto.getMemo3());
            if (memo.length() > 30) {
                memo = memo.substring(0, 30);
            }
            itemModel.setNote(memo);
            listProduct.add(itemModel);
        }

        return listProduct;

    }

    public MstSheetSizeDto getFilterListCarton(BigDecimal valueCheck, List<MstSheetSizeDto>... lists) {
        if (lists == null || lists.length == 0)
            return null;

        //Remove data with value like xx50


        List<List<MstSheetSizeDto>> tmpList = Lists.newArrayList();
        for (int i = 0; i < lists.length; i++) {
            tmpList.add(lists[i]);
        }

        //process tmpList
        List<MstSheetSizeDto> filterList = Lists.newArrayList(tmpList.get(0));
        tmpList.remove(0);

        for (int i = 0; i < tmpList.size(); i++) {//4
            filterList.retainAll(Lists.newArrayList(tmpList.get(i)));
        }

        // FIXME - filterList must order by asc
        Collections.sort(filterList, new Comparator<MstSheetSizeDto>() {
            @Override
            public int compare(MstSheetSizeDto o1, MstSheetSizeDto o2) {
                return o1.getWidth().intValue() - o2.getWidth().intValue();
            }
        });
        for (Iterator<MstSheetSizeDto> iterator = filterList.iterator(); iterator.hasNext(); ) {
            MstSheetSizeDto value = iterator.next();
            if (value.getWidth().intValue() % 100 != 0) {
                iterator.remove();
            }
        }
        return filterList.stream().filter(dto -> dto.getWidth().compareTo(valueCheck) >= 0).findFirst().orElse(null);
    }

    public MstSheetSizeDto getFilterListShapeAndDecorative(BigDecimal valueCheck, List<MstSheetSizeDto>... lists) {
        if (lists == null || lists.length == 0)
            return null;

        //Remove data with value like xx50


        List<List<MstSheetSizeDto>> tmpList = Lists.newArrayList();
        for (int i = 0; i < lists.length; i++) {
            tmpList.add(lists[i]);
        }

        //process tmpList
        List<MstSheetSizeDto> filterList = Lists.newArrayList(tmpList.get(0));
        tmpList.remove(0);

        for (int i = 0; i < tmpList.size(); i++) {//4
            filterList.retainAll(Lists.newArrayList(tmpList.get(i)));
        }

        // FIXME - filterList must order by asc
        Collections.sort(filterList, new Comparator<MstSheetSizeDto>() {
            @Override
            public int compare(MstSheetSizeDto o1, MstSheetSizeDto o2) {
                return o1.getWidth().intValue() - o2.getWidth().intValue();
            }
        });
        return filterList.stream().filter(dto -> dto.getWidth().compareTo(valueCheck) >= 0).findFirst().orElse(null);
    }

    /**
     * 色数(表示形式) を取得する
     *
     * @param printMethod 印刷方法
     * @param productoDto 商品情報 (色と表面加工取得インターフェース)
     * @return 色数(表示形式)
     */
    public String formatColorsViaPrintMethod(Integer printMethod, @Nonnull ColorAndSurfaceTreatment productDto) {
	int colorCount = 0;

	// 印刷方法が指定されている場合
	if (Integer.valueOf(1).equals(printMethod) || Integer.valueOf(3).equals(printMethod)) {
	    // オフセット印刷, フレキソ印刷
	    colorCount += this.offsetColorToValue(productDto.getColorId());
	} else if (Integer.valueOf(2).equals(printMethod)) {
	    // デジタル印刷
	    colorCount += this.digitalColorToValue(productDto.getColorId());
	}

	// 表面加工分の色数を追加する
	colorCount += extraColorCounts(productDto);

	// 文字列に変換
	return colorCount > 0 ? Integer.toString(colorCount) : Constants.BLANK;
    }

    /**
     * 原紙検索を行う
     *
     * valueCheck 以上の巾を持つ原紙を検索します。
     *
     * @param valueCheck 要求する巾(mm)
     * @param lists 表、中、裏それぞれの原紙サイズリストのリスト
     * @return lists[0] の中で条件を満たす最小の原紙サイズ (null: 見つからない)
     */
    public MstSheetSizeDto bestSheetSize(@Nonnull BigDecimal valueCheck, Collection<? extends MstSheetSizeDto>... lists) {
    		if (ArrayUtils.isEmpty(lists)) {
    			return null;
    		}

    		// 最初のリストを width でソート済みの Map 化
    		// 巾の条件を満たすもののみ抽出する
    		Map<BigDecimal, MstSheetSizeDto> firstSheetMap = lists[0].stream()
					.filter(sheet -> sheet.getWidth() != null && sheet.getWidth().compareTo(valueCheck) >= 0)
					.sorted(Comparator.comparing(MstSheetSizeDto::getWidth))
					.collect(Collectors.toMap(
							MstSheetSizeDto::getWidth,				// 添字
							Function.<MstSheetSizeDto>identity(),	// 値
							(sheet1, sheet2) -> sheet1,				// 最初のもの優先
							LinkedHashMap::new));					// 順序付きのマップ

    		// すべてのリストに含まれる巾のみ残す
    		for (int i = 1; i < lists.length; ++i) {
    			firstSheetMap.keySet().retainAll(lists[i].stream()
    					.map(MstSheetSizeDto::getWidth)
    					.collect(Collectors.toSet()));
    		}

    		// 条件にマッチするシートを返却 (ソート済みなので最初の要素を返却しています。)
    		return !firstSheetMap.isEmpty() ? firstSheetMap.values().iterator().next() : null;

    		// 注記: マスタテーブルには 50mm 単位でのデータしかないため、 Java 上では 丸め処理を行いません
    }

    /** 表面加工: UVOPニス */
    private static final Integer SURFACE_TREATMENT_UVOP_NISH = 8; // 裏表共通値
    /** 表面加工: UVOPマット */
    private static final Integer SURFACE_TREATMENT_UVOP_MATTE = 17; // 裏表共通値
    /** 表面加工: 疑似エンボスソフト */
    private static final Integer SURFACE_TREATMENT_FAKE_EMBOSS_SOFT = 21; // 裏表共通値
    /** 表面加工: 疑似エンボスハード */
    private static final Integer SURFACE_TREATMENT_FAKE_EMBOSS_HARD = 22; // 裏表共通値
    /** 表面加工: 印刷(UVOPニス)が必要な表面加工の集合 */
    private static final Set<Integer> SURFACE_TREATMENT_UVOP_NISH_SET
    	= Collections.unmodifiableSet(new HashSet<>(Arrays.asList(
    		SURFACE_TREATMENT_UVOP_NISH,
		SURFACE_TREATMENT_FAKE_EMBOSS_SOFT,
		SURFACE_TREATMENT_FAKE_EMBOSS_HARD)));
    /** 表面加工: 印刷(UVOPマット)が必要な表面加工の集合 */
    private static final Set<Integer> SURFACE_TREATMENT_UVOP_MATTE_SET
    	= Collections.singleton(SURFACE_TREATMENT_UVOP_MATTE);

    /**
     * 印刷工程の色リストを取得する
     *
     * @param productoDto 商品情報 (色と表面加工取得インターフェース)
     * @return 色(帳票表示形式)のリスト
     */
    private static List<String> getColorDisplayNames(@Nonnull ColorAndSurfaceTreatment productDto) {
	List<String> colorNames = new ArrayList<>(8); // 8: 表示上の最大値

	// 画面入力値
	for (int i = 1; i <= 8; ++i) {  // 1 to 8: 色名の添字
	    String colorText = productDto.colorText(i);
	    if (colorText != null) {
		colorNames.add(colorText);
	    }
	}

	// 疑似エンボス, UVOP ニス
	if (SURFACE_TREATMENT_UVOP_NISH_SET.contains(productDto.getSurfaceTreatmentId())) {
	    colorNames.add("UVOPﾆｽ");
	}

	// UVOP マットニス
	if (SURFACE_TREATMENT_UVOP_MATTE_SET.contains(productDto.getSurfaceTreatmentId())) {
	    colorNames.add("UVOPﾏｯﾄ");
	}

	return colorNames;
    }

    /**
     * UVOP ニス, UVOP マット, 疑似エンボス加工用に印刷の色数への追加数を取得する
     *
     * @param productoDto 商品情報 (色と表面加工取得インターフェース)
     * @return 追加色数
     */
    private static int extraColorCounts(@Nonnull ColorAndSurfaceTreatment productDto) {
	int extraColors = 0;

	if (SURFACE_TREATMENT_UVOP_NISH_SET.contains(productDto.getSurfaceTreatmentId())) {
	    // 疑似エンボス, UVOP ニス
	    ++extraColors;
	} else if (SURFACE_TREATMENT_UVOP_MATTE_SET.contains(productDto.getSurfaceTreatmentId())) {
	    // UVOP マットニス
	    ++extraColors;
	}

	return extraColors;
    }

    /**
     * 色と表面加工取得インターフェース
     */
    private static interface ColorAndSurfaceTreatment {
	/**
	 * 表面加工
	 *
	 * @return 表面加工 (null: 入力なし)
	 */
	Integer getSurfaceTreatmentId();

	/**
	 * 色 ID
	 *
	 * @return 色 ID (null: 入力なし)
	 */
	Integer getColorId();

	/**
	 * 色詳細
	 *
	 * @param index 添字番号 (1-8)
	 * @return 色 (null: 入力なし/添字不正)
	 */
	String colorText(int index);
    }

    /**
     * 表面用の色と表面加工取得インターフェースを生成する
     *
     * @param productDto
     *            商品情報
     * @return 表面用の色と表面加工取得インターフェース
     */
    private static ColorAndSurfaceTreatment frontColorAndSurfaceTreatment(@Nonnull ProductDto productDto) {
	return new ColorAndSurfaceTreatment() {
	    @Override
	    public Integer getSurfaceTreatmentId() {
		return productDto.getSurfaceTreatmentIdF();
	    }

	    @Override
	    public Integer getColorId() {
		return productDto.getColorIdF();
	    }

	    @Override
	    public String colorText(int index) {
		switch (index) {
		case 1:
		    return productDto.getColorFText1();
		case 2:
		    return productDto.getColorFText2();
		case 3:
		    return productDto.getColorFText3();
		case 4:
		    return productDto.getColorFText4();
		case 5:
		    return productDto.getColorFText5();
		case 6:
		    return productDto.getColorFText6();
		case 7:
		    return productDto.getColorFText7();
		case 8:
		    return productDto.getColorFText8();
		default:
		    return null;
		}
	    }
	};
    }

    /**
     * 裏面用の色と表面加工取得インターフェースを生成する
     *
     * @param productDto
     *            商品情報
     * @return 裏面用の色と表面加工取得インターフェース
     */
    private static ColorAndSurfaceTreatment backColorAndSurfaceTreatment(@Nonnull ProductDto productDto) {
	return new ColorAndSurfaceTreatment() {
	    @Override
	    public Integer getSurfaceTreatmentId() {
		return productDto.getSurfaceTreatmentIdB();
	    }

	    @Override
	    public Integer getColorId() {
		return productDto.getColorIdB();
	    }

	    @Override
	    public String colorText(int index) {
		// 未入力が全角スペースx2で登録されるので、正規化する。
		switch (index) {
		case 1:
		    return normalizeBackColorText(productDto.getColorBText1());
		case 2:
		    return normalizeBackColorText(productDto.getColorBText2());
		case 3:
		    return normalizeBackColorText(productDto.getColorBText3());
		case 4:
		    return normalizeBackColorText(productDto.getColorBText4());
		default:
		    return null;
		}
	    }
	};
    }

    /**
     * 裏面の色名を正規化する
     *
     * @param text 入力値
     * @return 正規化した入力値
     */
    private static String normalizeBackColorText(String text) {
	return "　　".equals(text) ? null : text;
    }

    /**
     * 段ボール スリッター, スリスコ断裁工程
     */
    private enum SlitterCuttingMethod {
        /** スリスコ製造 */
        SRISKO,
        /** スリスコ＋スリッター製造 */
        SRISKO_SLITTER,
        /** スリッター製造 */
        SLITTER;

        /**
         * スリスコ断裁工程ありか
         *
         * @return true: スリスコあり, false: スリスコなし
         */
        public boolean isUsingSrisko() {
            return this == SRISKO || this == SRISKO_SLITTER;
        }

        /**
         * スリッター断裁工程ありか
         *
         * @return true: スリッターあり, false: スリッターなし
         */
        public boolean isUsingSlitter() {
            return this == SRISKO_SLITTER || this == SLITTER;
        }

        /**
         * 製品情報より段ボール断裁工程を判定する
         *
         * @param productDto 製品情報
         * @return 断裁工程
         */
        public static SlitterCuttingMethod cartonSlitterCuttingMethod(ProductDto productDto) {
            // Assert dto.productType = 1 // 段ボール

            /*
             * A式(ケース)
             *   常にスリスコ製造
             *
             * A式以外(シート)の場合は、シート寸法流れ方向の長さによって作り方が変わります。
             *   600mm以上：スリスコ製造
             *   190mm〜599mm：スリスコ＋スリッター製造
             *   190mm未満：スリッター製造
             */

            if (!EnumsPDF.CartonType.CARTON_SHEET.getType().equals(productDto.getCartonShippingType())) {
                return SlitterCuttingMethod.SRISKO;     // A 式 or 不正な値
            }

            // シート寸法流れ方向の値を取得
            BigDecimal cutPaperSizeHeight = productDto.getCutPaperSizeH();
            if (cutPaperSizeHeight == null) {
                return SlitterCuttingMethod.SRISKO;     // シート寸法がない
            }
            double height = cutPaperSizeHeight.doubleValue();

            // シート寸法流れ方向の値によって断裁工程を決定
            if (height >= 600.0) {
                return SlitterCuttingMethod.SRISKO;
            } else if (height >= 190) {
                return SlitterCuttingMethod.SRISKO_SLITTER;
            } else {
                return SlitterCuttingMethod.SLITTER;
            }
        }
    }
}
