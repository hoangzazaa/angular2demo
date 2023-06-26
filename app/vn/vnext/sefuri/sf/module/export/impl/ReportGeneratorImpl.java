package vn.vnext.sefuri.sf.module.export.impl;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Consumer;
import java.util.stream.Collectors;

import javax.imageio.ImageIO;
import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.auth0.jwt.internal.org.apache.commons.io.FileUtils;
import com.google.common.collect.Maps;

import net.sf.jasperreports.engine.DefaultJasperReportsContext;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperPrintManager;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.util.JRLoader;
import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.common.Enums;
import vn.vnext.sefuri.sf.dao.CheckSheetDao;
import vn.vnext.sefuri.sf.dao.CustomerDao;
import vn.vnext.sefuri.sf.dao.DealDao;
import vn.vnext.sefuri.sf.dao.DealProductDao;
import vn.vnext.sefuri.sf.dao.DepartmentDao;
import vn.vnext.sefuri.sf.dao.OfferDao;
import vn.vnext.sefuri.sf.dao.ProductDao;
import vn.vnext.sefuri.sf.dao.ProductOutputDao;
import vn.vnext.sefuri.sf.dao.QuotationDao;
import vn.vnext.sefuri.sf.dao.QuotationItemDao;
import vn.vnext.sefuri.sf.dao.QuotationPrintTemplateDao;
import vn.vnext.sefuri.sf.dao.UserDao;
import vn.vnext.sefuri.sf.dto.CustomerDto;
import vn.vnext.sefuri.sf.dto.DealDto;
import vn.vnext.sefuri.sf.dto.InventoryDto;
import vn.vnext.sefuri.sf.dto.OrderItemDto;
import vn.vnext.sefuri.sf.dto.ProductDto;
import vn.vnext.sefuri.sf.dto.ShippingDestinationDto;
import vn.vnext.sefuri.sf.dto.UserDto;
import vn.vnext.sefuri.sf.helper.SfrException;
import vn.vnext.sefuri.sf.helper.SfrExceptionCode;
import vn.vnext.sefuri.sf.json.SF00309.model.SF003090_ParsedProductInfoJson;
import vn.vnext.sefuri.sf.json.SF00309.model.SF00309_RequestModelJson;
import vn.vnext.sefuri.sf.json.SF00310.model.SF00310_DealJson;
import vn.vnext.sefuri.sf.json.SF00310.model.SF00310_ParsedProductInfoJson;
import vn.vnext.sefuri.sf.json.SF00310.model.SF00310_RequestModel;
import vn.vnext.sefuri.sf.module.export.JasperUtils;
import vn.vnext.sefuri.sf.module.export.ReportBuilder;
import vn.vnext.sefuri.sf.module.export.ReportGenerator;
import vn.vnext.sefuri.sf.module.export.conf.ReportConf;
import vn.vnext.sefuri.sf.module.export.model.ProductModel;
import vn.vnext.sefuri.sf.module.export.model.QuotationModel;
import vn.vnext.sefuri.sf.module.export.model.R005Model;
import vn.vnext.sefuri.sf.module.export.model.ShippingDestinationKarteImageModel;
import vn.vnext.sefuri.sf.module.export.model.ShippingDestinationKarteModel;
import vn.vnext.sefuri.sf.module.export.model.r007.R007ProductModelC;
import vn.vnext.sefuri.sf.module.export.model.r009.R009Model;
import vn.vnext.sefuri.sf.module.export.model.r010.R010Model;
import vn.vnext.sefuri.sf.service.SV001AuthService;
import vn.vnext.sefuri.sf.service.SV002UserService;
import vn.vnext.sefuri.sf.service.SV005CustomerService;
import vn.vnext.sefuri.sf.service.SV006FileService;
import vn.vnext.sefuri.sf.service.SV008ProductService;
import vn.vnext.sefuri.sf.util.DateUtil;
import vn.vnext.sefuri.sf.util.GenerateUtil;

/**
 * Created by DungTQ on 5/19/2017.
 */
public class ReportGeneratorImpl implements ReportGenerator {
    Logger logger = LoggerFactory.getLogger(ReportGeneratorImpl.class);

    @Inject
    private UserDao userDao;

    @Inject
    private QuotationDao quotationDao;

    @Inject
    private QuotationPrintTemplateDao quotationTemplateDao;

    @Inject
    private QuotationItemDao quotationItemDao;

    @Inject
    private SV001AuthService authService;

    @Inject
    private DealDao dealDao;
    @Inject
    private DealProductDao dealProductDao;

    @Inject
    private ProductDao productDao;

    @Inject
    private DepartmentDao departmentDao;

    @Inject
    private CustomerDao customerDao;

    @Inject
    private ProductOutputDao productOutputDao;

    @Inject
    private OfferDao offerDao;

    @Inject
    private SV006FileService sv006FileService;

    @Inject
    private CheckSheetDao checkSheetDao;

    @Inject
    private SV008ProductService sv008ProductService;

    /** ファイル関連サービス */
    @Inject
    private SV006FileService fileService;

    /** 得意先関連サービス */
    @Inject
    private SV005CustomerService customerService;

    /** ユーザー関連サービス */
    @Inject
    private SV002UserService userService;

    @Inject
    private ReportBuilder reportBuilder;

    private static String encodeFileName(final String fileName) throws UnsupportedEncodingException {
        return new String(fileName.getBytes(StandardCharsets.UTF_8), Constants.UTF_8);
    }

    @Override
    public String exportQuotationFile(String quotationCode, int option, String fileName) {
        String tempPath = sv006FileService.sv00617GetTempPath();
        String jasperOutput = ReportConf.getJasperQuotationReportPath(tempPath);

        try {
            QuotationModel quotationModel = reportBuilder.createQuotationModel(quotationCode, option);
            File jasperReportTemplate = ReportConf.getJasperTemplateForQuotation(option);
            JRBeanCollectionDataSource quotationItemsDataSource = new JRBeanCollectionDataSource(quotationModel
                    .getQuotationItemModelList());

            Map<String, Object> parameters = new HashMap<>();
            parameters.put("quotationItemsDataSource", quotationItemsDataSource);
            String result = exportPdf(Arrays.asList(quotationModel), fileName, jasperReportTemplate, jasperOutput, parameters);

            // create Image
            String randomValue = result.split(Constants.SLASH)[0];
            String imagePath = jasperOutput + randomValue + Constants.SLASH;
            String jrprintName = fileName + Constants.UNDERSCORE + randomValue + Enums.FileType.JRPRINT;
            fileName += Constants.UNDERSCORE + option;

            exportPng(imagePath, fileName, jrprintName, tempPath);

            return randomValue;
        } catch (Exception e) {
            logger.error("exportQuotationFile: ", e);
            return Constants.BLANK;
        }
    }


    @Override
    public String exportRequestCreateSamplePdf(final DealDto deal, final SF003090_ParsedProductInfoJson product,
                                               final SF00309_RequestModelJson requestModel) {
//        try {
//            List beanCollection;
//            File jasperFile;
//            if (Enums.PackagingMethod.ABNORMAL.getValue().equals(requestModel.getPackagingClassification())) {
//                jasperFile = ReportConf.getJasperTemplateRp003();
//
//                R003Model r003Model = reportBuilder.createR003Model(requestModel, product, deal);
//                beanCollection = Lists.newArrayList(r003Model);
//            } else {
//                jasperFile = ReportConf.getJasperTemplateRp004();
//
//                R004Model r004Model = reportBuilder.createR004Model(requestModel, product, deal);
//                beanCollection = Lists.newArrayList(r004Model);
//            }
//
//            // create export file name
//            //#2284: "サンプル作成依頼_"＋"Deal ID"＋"_"＋"Product ID"＋"_"＋"YYYYMMDD"
//            String pdfFileName = new StringBuilder("サンプル作成依頼").append(Constants.UNDERSCORE).append(deal.getDealCode())
//                    .append(Constants.UNDERSCORE).append(product.getProductCode()).append(Constants.UNDERSCORE)
//                    .append(DateUtil.formatDate(DateUtil.getSysDate(), "yyyyMMdd")).toString();
//            String tempPath = sv006FileService.sv00617GetTempPath();
//            String desFolder = ReportConf.getJasperProductReportPath(tempPath);
//            Map<String, Object> parameters = Maps.newHashMap();
//            return exportPdf(beanCollection, pdfFileName, jasperFile, desFolder, parameters);
//        } catch (IOException e) {
//            logger.error("exportRequestCreateSamplePdf: ", e);
//        } catch (JRException e) {
//            logger.error("exportRequestCreateSamplePdf: ", e);
//        }
        return null;
    }

    @Override
    public String sv01208ExportRequestCreateR005Pdf(SF00310_RequestModel requestModel, SF00310_ParsedProductInfoJson product, final SF00310_DealJson deal) {
        try {
            File jasperFile = ReportConf.getJasperTemplateRp005();

            R005Model r005Model = reportBuilder.createR005Model(requestModel, product, deal);

            // create export file name
            //"デザイン作成依頼_Deal_Code Product_Code yyyymmdd"
            String pdfFileName = new StringBuilder("デザイン作成依頼").append(Constants.UNDERSCORE).append(deal.getDealCode())
                    .append(Constants.UNDERSCORE).append(product.getProductCode()).append(Constants.UNDERSCORE)
                    .append(DateUtil.formatDate(DateUtil.getSysDate(), "yyyyMMdd")).toString();
            String tempPath = sv006FileService.sv00617GetTempPath();
            String desFolder = ReportConf.getJasperProductReportPath(tempPath);
            Map<String, Object> parameters = Maps.newHashMap();
            return exportPdf(Arrays.asList(r005Model), pdfFileName, jasperFile, desFolder, parameters);
        } catch (IOException e) {
            logger.error("exportRequestCreateSamplePdf: ", e);
        } catch (JRException e) {
            logger.error("exportRequestCreateSamplePdf: ", e);
        }
        return null;
    }

    @Override
    public String exportProductFile(Integer productId, String dealCode) {
        try {


            String tempPath = sv006FileService.sv00617GetTempPath();
            DealDto deal = dealDao.findDealInfoByDealCode(dealCode);
            ProductDto product = productDao.find(productId);

            if (product.getProductType() == 0) {	// 紙器, 貼合, 美粧, 片段
                ProductModel model = reportBuilder.createProductModel(deal, product);

                String pdfFileName = DateUtil.formatDate(DateUtil.getSysDate(), "yyyyMMdd")
                        + Constants.UNDERSCORE + product.getProductCode();

                File file = ReportConf.getJasperTemplateForProduct(product.getProductType());

                String desFolder = ReportConf.getJasperProductReportPath(tempPath);
                Map<String, Object> parameters = Maps.newHashMap();
                JRBeanCollectionDataSource Liststep1 = new JRBeanCollectionDataSource(model.getListstep1());
                JRBeanCollectionDataSource Liststep2 = new JRBeanCollectionDataSource(model.getListstep2());
                JRBeanCollectionDataSource orderhistoryLists1 = new JRBeanCollectionDataSource(model.getOrderhistoryLists1());
                JRBeanCollectionDataSource orderhistoryLists2 = new JRBeanCollectionDataSource(model.getOrderhistoryLists2());
                JRBeanCollectionDataSource qtnLists = new JRBeanCollectionDataSource(model.getQtnLists());

                parameters.put("Liststep1", Liststep1);
                parameters.put("Liststep2", Liststep2);
                parameters.put("orderhistoryLists1", orderhistoryLists1);
                parameters.put("orderhistoryLists2", orderhistoryLists2);
                parameters.put("qtnLists", qtnLists);

                return exportPdf(Arrays.asList(model), pdfFileName, file, desFolder, parameters);
            } else if (product.getProductType() == 1) {	// ダンボール
                // Export for carton
                R007ProductModelC modelC = reportBuilder.createR007ProductCartonModel(deal, product);

                String pdfFileName = DateUtil.formatDate(DateUtil.getSysDate(), "yyyyMMdd")
                        + Constants.UNDERSCORE + product.getProductCode();

                File file = ReportConf.getJasperTemplateForProduct(product.getProductType());

                String desFolder = ReportConf.getJasperProductCartonReportPath(tempPath);
                Map<String, Object> parameters = new HashMap<>();
                JRBeanCollectionDataSource r007QuotationInfoCS = new JRBeanCollectionDataSource(modelC.getR007QuotationInfoCS());
                JRBeanCollectionDataSource listOrderHistory1 = new JRBeanCollectionDataSource(modelC.getListOrderHistory1());
                JRBeanCollectionDataSource listOrderHistory2 = new JRBeanCollectionDataSource(modelC.getListOrderHistory2());
                JRBeanCollectionDataSource extraStepList = new JRBeanCollectionDataSource(modelC.getExtraStepList());
                parameters.put("r007QuotationInfoCS", r007QuotationInfoCS);
                parameters.put("listOrderHistory1", listOrderHistory1);
                parameters.put("listOrderHistory2", listOrderHistory2);
                parameters.put("extraStepList", extraStepList);

                return exportPdf(Arrays.asList(modelC), pdfFileName, file, desFolder, parameters);
            }


        } catch (Exception e) {
            logger.error("exportProductFile: ", e);
        }
        return null;
    }

    @Override
    public String r009(List<InventoryDto> inventoryDtos, CustomerDto customerDto) {
        final String prefixFileName = "製品在庫表";
        try {

            String tempPath = sv006FileService.sv00617GetTempPath();
            File jasperFile = ReportConf.getJasperTemplateRp009();
            // fill data
            R009Model r009Model = reportBuilder.createR009Model(inventoryDtos, customerDto);

            // format file name follow #3109
            String pdfFileName = prefixFileName + Constants.UNDERSCORE_FULLSIZE + customerDto.getName() + Constants.UNDERSCORE_FULLSIZE + DateUtil.formatDate(DateUtil.getSysDate(), "yyyyMMdd");

            String desFolder = ReportConf.getJasperR009ProductInventoryChartPath(tempPath);

            JRBeanCollectionDataSource r009ListProducts = new JRBeanCollectionDataSource(r009Model.getR009ListProducts());
            Map parameters = new HashMap();
            parameters.put("r009ListProducts", r009ListProducts);

            return exportPdf(Arrays.asList(r009Model), pdfFileName, jasperFile, desFolder, parameters);

        } catch (IOException e) {
            logger.error("exportProductFile: ", e);
            e.printStackTrace();
        } catch (JRException e) {
            logger.error("exportProductFile: ", e);
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public String r010(List<OrderItemDto> orderItemDtos, CustomerDto customerDto) {
        final String prefixFileName = "製品一覧";
        try {
            String tempPath = sv006FileService.sv00617GetTempPath();
            File jasperFile = ReportConf.getJasperTemplateRp010();
            // fill data
            R010Model r010Model = reportBuilder.createR010Model(orderItemDtos, customerDto);

            String pdfFileName = prefixFileName + Constants.UNDERSCORE_FULLSIZE + customerDto.getName() + Constants.UNDERSCORE_FULLSIZE + DateUtil.formatDate(DateUtil.getSysDate(), "yyyyMMdd");

            String desFolder = ReportConf.getJasperR009ProductInventoryChartPath(tempPath);

            JRBeanCollectionDataSource listProduct = new JRBeanCollectionDataSource(r010Model.getListProduct());
            Map parameters = new HashMap();
            parameters.put("listProduct", listProduct);

            return exportPdf(Arrays.asList(r010Model), pdfFileName, jasperFile, desFolder, parameters);

        } catch (IOException e) {
            logger.error("exportProductFile: ", e);
            e.printStackTrace();
        } catch (JRException e) {
            logger.error("exportProductFile: ", e);
            e.printStackTrace();
        }
        return null;

    }

    private void exportPng(String jasperOutput, String fileName, String jrPrint, String tempPath) throws IOException, JRException {
        File imgfile = new File(jasperOutput + fileName + Enums.FileType.PNG);
        FileOutputStream outputStream = new FileOutputStream(imgfile);
        DefaultJasperReportsContext.getInstance();
        JasperPrintManager printManager = JasperPrintManager.getInstance(DefaultJasperReportsContext.getInstance());

        String printPath = ReportConf.getJasperJrprintPath(tempPath) + jrPrint;
        BufferedImage rendered_image = (BufferedImage) printManager.printPageToImage(printPath, 0, 1.0f);
        ImageIO.write(rendered_image, "png", outputStream);
        outputStream.close();
    }

    /**
     * PDF 出力する
     *
     * FIXME なぜ一時ファイルに出力しているのか不明。
     *
     * @param model 主データソース
     * @param pdfFileName PDF ファイル名
     * @param jasperFile テンプレートファイル
     * @param desFolder 出力先
     * @param parameters パラメータ
     * @return ディレクトリとファイル名
     * @throws IOException エラー
     * @throws JRException エラー
     */
    private OutputFile exportPdfFile(Collection<?> model, String pdfFileName, File jasperFile, String desFolder, Map<String, Object> parameters) throws IOException, JRException {
        pdfFileName = encodeFileName(pdfFileName);
        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(model);
        JasperReport jasperReport = (JasperReport) JRLoader.loadObject(jasperFile);

        // Print to JRPrint
        final String randomValue = GenerateUtil.generateUniqueId();

        // prevent problems when multiple user used at the same time
        String jrprintFileName = pdfFileName + Constants.UNDERSCORE + randomValue + Enums.FileType.JRPRINT;

        // Create jrprint path
        String basePath = sv006FileService.sv00617GetTempPath();
        String printPath = ReportConf.getJasperJrprintPath(basePath);
        FileUtils.forceMkdir(new File(printPath));
        String jasperReportJrprintPath = printPath + jrprintFileName;

        JasperFillManager.fillReportToFile(jasperReport, jasperReportJrprintPath,
                parameters, dataSource);

        // get location to store export file
        String exportPath = desFolder + randomValue + Constants.SLASH;

        // check path
        File fileCheck = new File(exportPath);
        if (!fileCheck.exists()) { // if directory not create then create it
            FileUtils.forceMkdir(fileCheck);
        }

        // create full export file path
        String pdfFilePath = exportPath + pdfFileName + Enums.FileType.PDF;

        // export to pdf file
        JasperExportManager.exportReportToPdfFile(jasperReportJrprintPath, pdfFilePath);

        String fileName = pdfFileName + Enums.FileType.PDF;
        return new OutputFile() {
            @Override
            public String getFolderName() {
                return randomValue;
            }
            @Override
            public String getFileName() {
                return fileName;
            }
        };
    }

    /**
     * PDF 出力する  (テンポラリファイルを使用しない版)
     *
     * @param model 主データソース
     * @param pdfFileName PDF ファイル名
     * @param jasperFile テンプレートファイル
     * @param desFolder 出力先
     * @param parameters パラメータ
     * @param jasperPrintPostprocess JasperPrint に対する処理 (null: 何もしない)
     * @return ディレクトリとファイル名
     * @throws IOException エラー
     * @throws JRException エラー
     */
    private OutputFile exportPdfFile(
            Collection<?> model,
            String pdfFileName,
            File jasperFile,
            String desFolder,
            Map<String, Object> parameters,
            Consumer<? super JasperPrint> jasperPrintPostprocess)
            throws IOException, JRException {
        pdfFileName = encodeFileName(pdfFileName);
        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(model);
        JasperReport jasperReport = (JasperReport) JRLoader.loadObject(jasperFile);

        // Print to JRPrint
        final String randomValue = GenerateUtil.generateUniqueId();

        // JasperPrint 生成
        JasperPrint jrprint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);

        // 後処理
        if (jasperPrintPostprocess != null) {
            jasperPrintPostprocess.accept(jrprint);
        }

        // get location to store export file
        String exportPath = desFolder + randomValue + Constants.SLASH;

        // check path
        File fileCheck = new File(exportPath);
        if (!fileCheck.exists()) { // if directory not create then create it
            FileUtils.forceMkdir(fileCheck);
        }

        // create full export file path
        String pdfFilePath = exportPath + pdfFileName + Enums.FileType.PDF;

        // export to pdf file
        JasperExportManager.exportReportToPdfFile(jrprint, pdfFilePath);

        String fileName = pdfFileName + Enums.FileType.PDF;
        return new OutputFile() {
            @Override
            public String getFolderName() {
                return randomValue;
            }
            @Override
            public String getFileName() {
                return fileName;
            }
        };
    }

    private String exportPdf(Collection<?> model, String pdfFileName, File jasperFile, String desFolder, Map<String, Object> parameters) throws IOException, JRException {
        OutputFile outputFile = exportPdfFile(model, pdfFileName, jasperFile, desFolder, parameters);
        return outputFile.getFolderName() + Constants.SLASH + outputFile.getFileName();
    }

    @Override
    public OutputFile exportShippingDestinationKarte(String customerCode, int shippingDestinationId, String fileName)
        throws SfrException {

        // 得意先解決
        CustomerDto customer = customerService.sv00522GetCustomerByCode(customerCode);
        if (customer == null) {
            // エラー: 得意先が見つからない
            throw new SfrException(SfrExceptionCode.ERR_CUSTOMER_NOT_FOUND);
        }

        // 営業担当解決
        UserDto picSales = null;
        if (customer.getPicCode() != null) {
            picSales = userService.sv00104getUserByUserCode(customer.getPicCode());
        }

        // 業務担当解決
        UserDto picOperation = null;
        if (customer.getSalerName() != null) {
            picOperation = userService.sv00104getUserByUserCode(customer.getSalerName());
        }

        // 届け先詳細取得
        ShippingDestinationDto shippingDestination = customerService.sv00525GetShippingDestinationDetail(customer.getId(), shippingDestinationId);
        if (shippingDestination == null) {
            // エラー: 届け先が見つからない
            throw new SfrException(SfrExceptionCode.ERR_SHIPPING_DESTINATION_NOT_FOUND);
        }

        try {
            String tempPath = sv006FileService.sv00617GetTempPath();
            String jasperOutput = ReportConf.getJasperShippingDestinationKartePath(tempPath);

            // Jasper 用モデル生成
            ShippingDestinationKarteModel model = new ShippingDestinationKarteModel(customer, shippingDestination, picSales, picOperation);

            // 画像ファイル DataSet 生成
            List<ShippingDestinationKarteImageModel> imageModelList
                = shippingDestination.getImageList()
                    .stream()
                    .map(imageDto -> {
                        // 画像ファイルを取得
                        File file = fileService.sv00606GetFile(imageDto.getFile().getFileCode());
                        if (file != null) {
                            return new ShippingDestinationKarteImageModel(imageDto, file);
                        } else {
                            return null;
                        }
                    })
                    .filter(element -> element != null)
                    .collect(Collectors.toList());
            JRBeanCollectionDataSource imageDataSource = new JRBeanCollectionDataSource(imageModelList);

            // テンプレート
            File jasperReportTemplate = ReportConf.getJasperTemplateForShippingDestinationKarte();

            // パラメータ
            Map<String, Object> parameters = new HashMap<>();
            parameters.put("imageDataSource", imageDataSource);

            // 生成
            return exportPdfFile(Arrays.asList(model), fileName, jasperReportTemplate, jasperOutput, parameters,
                    JasperUtils::removeBlankPage);
            // 改ページが入る場合に空白だけのページができてしまう可能性があるので、 JasperUtils::removeBlankPage で削除します。
        } catch (Exception e) {
            logger.error("Pdf generation failed. file=" + fileName, e);
            return null;
        }
    }
}
