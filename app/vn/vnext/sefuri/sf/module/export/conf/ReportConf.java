package vn.vnext.sefuri.sf.module.export.conf;

import java.io.File;
import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.util.SettingUtil;

/**
 * Created by DungTQ on 5/19/2017.
 */
public final class ReportConf {
    private static Logger logger = LoggerFactory.getLogger(ReportConf.class);
    public static final String CONFIG_FILE = "directory";

    /** directory.conf のキー: 見積書(option=4 サガシキ標準：横（角印なし）) の jasper ファイル位置 */
    public static final String JASPER_QUOTATION_TEMPLATE_2 = "jasper.template.quotation.basic_template2";
    /** directory.conf のキー: 見積書(option=8 アクトン標準：横（角印なし）) の jasper ファイル位置 */
    public static final String JASPER_QUOTATION_TEMPLATE_4 = "jasper.template.quotation.basic_template4";
    /** directory.conf のキー: 見積書(option=3 サガシキ標準：横（角印あり）) の jasper ファイル位置 */
    public static final String JASPER_QUOTATION_TEMPLATE_6 = "jasper.template.quotation.basic_template6";
    /** directory.conf のキー: 見積書(option=7 アクトン標準：横（角印あり）) の jasper ファイル位置 */
    public static final String JASPER_QUOTATION_TEMPLATE_8 = "jasper.template.quotation.basic_template8";

    public static final String JASPER_PRODUCT_TEMPLATE = "jasper.template.product.basic_template";
    public static final String JASPER_PRODUCT_CARTON_TEMPLATE = "jasper.template.product.basic_template_carton";

    public static final String JASPER_R003_TEMPLATE = "jasper.template.r003.r003_template";
    public static final String JASPER_R004_TEMPLATE = "jasper.template.r004.r004_template";
    public static final String JASPER_R005_TEMPLATE = "jasper.template.r005.r005_template";

    public static final String JASPER_R009_TEMPLATE = "jasper.template.r009.r009_template";
    public static final String JASPER_R009_REPORT = "jasper.inventory_report";
    public static final String JASPER_R010_TEMPLATE = "jasper.template.r010.r010_template";
    public static final String JASPER_R010_REPORT = "jasper.product_lit_report";

    public static final String JASPER_JRPRINT = "jasper.jrprint";
    public static final String JASPER_QUOTATION_REPORT = "jasper.quotation_report";
    public static final String JASPER_PRODUCT_REPORT = "jasper.product_report";
    /** 届け先カルテテンプレートの設定名 */
    public static final String JASPER_SHIPPING_DESTINATION_KARTE_TEMPRATE = "jasper.template.shipping_destination_karte.shipping_destination_karte_template";
    /** 届け先カルテ保存ディレクトリの設定名 */
    public static final String JASPER_SHIPPING_DESTINATION_KARTE = "jasper.shipping_destination_karte";
    public static final String JASPER_FOLDER = "jasper.jasper_folder";

    public static final String JASPER_CONFIG_FOLDER = "jasper.config_folder";
    public static final String JASPER_IMAGE_1 = "jasper.jasper_image.quotation.image1";

    public static final String JASPER_IMAGE_2 = "jasper.jasper_image.quotation.image2";

    public static final String JASPER_IMAGE_R009 = "jasper.jasper_image.r009inventory.logo_sagasiki";

    private static final String getJasperTemplatePath() {
        return System.getProperty("user.dir") + Constants.SLASH
                + SettingUtil.getString(CONFIG_FILE, JASPER_CONFIG_FOLDER) + Constants.SLASH
                + SettingUtil.getString(CONFIG_FILE, JASPER_FOLDER) + Constants.SLASH;
    }

    public static final String getJasperQuotationReportPath(String tempPath) {
        return tempPath
                + SettingUtil.getString(CONFIG_FILE, JASPER_FOLDER) + Constants.SLASH
                + SettingUtil.getString(CONFIG_FILE, JASPER_QUOTATION_REPORT) + Constants.SLASH;
    }

    public static final String getJasperJrprintPath(String tempPath) {
        return tempPath
                + SettingUtil.getString(CONFIG_FILE, JASPER_FOLDER) + Constants.SLASH
                + SettingUtil.getString(CONFIG_FILE, JASPER_JRPRINT) + Constants.SLASH;
    }

    public static final String getJasperProductReportPath(String tempPath) {
        return tempPath
                + SettingUtil.getString(CONFIG_FILE, JASPER_FOLDER) + Constants.SLASH
                + SettingUtil.getString(CONFIG_FILE, JASPER_PRODUCT_REPORT) + Constants.SLASH;
    }

    public static final String getJasperR009ProductInventoryChartPath(String tempPath) {
        return tempPath
                + SettingUtil.getString(CONFIG_FILE, JASPER_FOLDER) + Constants.SLASH
                + SettingUtil.getString(CONFIG_FILE, JASPER_R009_REPORT) + Constants.SLASH;
    }

    public static final String getJasperR010ProductListPath(String tempPath) {
        return tempPath
                + SettingUtil.getString(CONFIG_FILE, JASPER_FOLDER) + Constants.SLASH
                + SettingUtil.getString(CONFIG_FILE, JASPER_R010_REPORT) + Constants.SLASH;
    }


    public static final String getJasperProductCartonReportPath(String tempPath) {
        return tempPath
                + SettingUtil.getString(CONFIG_FILE, JASPER_FOLDER) + Constants.SLASH
                + SettingUtil.getString(CONFIG_FILE, JASPER_PRODUCT_REPORT) + Constants.SLASH;
    }

    /**
     * 届け先カルテ PDF 出力ディレクトリ名を取得する
     * @param tempPath テンポラリディレクトリ名
     * @return 出力ディレクトリ名
     */
    public static final String getJasperShippingDestinationKartePath(String tempPath) {
        return tempPath
                + SettingUtil.getString(CONFIG_FILE, JASPER_FOLDER) + Constants.SLASH
                + SettingUtil.getString(CONFIG_FILE, JASPER_SHIPPING_DESTINATION_KARTE) + Constants.SLASH;
    }

    /**
     * 見積書書式番号より jasper report のテンプレートファイルを解決する
     *
     * @param index 見積書書式番号
     *   <pre>
     *     index    書式                      jasper テンプレートファイル
     *     ---------------------------------------------------------------
     *     3        サガシキ標準：横（角印あり）  conf/jasper/EstimateJasper_6.jasper
     *     4        サガシキ標準：横（角印なし）  conf/jasper/EstimateJasper_2.jasper
     *     7        アクトン標準：横（角印あり）  conf/jasper/EstimateJasper_8.jasper
     *     8        アクトン標準：横（角印なし）  conf/jasper/EstimateJasper_4.jasper
     *   </pre>
     * @return asper report のテンプレートファイル
     * @throws IOException ファイルが見つからないとき
     */
    public static final File getJasperTemplateForQuotation(Integer index) throws IOException {
        if (index == 3) {
            // 3 サガシキ標準：横（角印あり） conf/jasper/EstimateJasper_6.jasper
            return getTemplateAsFile(JASPER_QUOTATION_TEMPLATE_6);
        } else if (index == 4) {
            // 4 サガシキ標準：横（角印なし） conf/jasper/EstimateJasper_2.jasper
            return getTemplateAsFile(JASPER_QUOTATION_TEMPLATE_2);
        } else if (index == 8) {
            // 8 アクトン標準：横（角印なし） conf/jasper/EstimateJasper_4.jasper
            return getTemplateAsFile(JASPER_QUOTATION_TEMPLATE_4);
        } else if (index == 7) {
            // 7 アクトン標準：横（角印あり） conf/jasper/EstimateJasper_8.jasper
            return getTemplateAsFile(JASPER_QUOTATION_TEMPLATE_8);
        } else {
            throw new IllegalArgumentException("Unexpected quotation jasper template index. index=" + index);
        }
    }

    public static final File getSealPath(Integer index) throws IOException {
        if (index == 1 || index == 3) {
            return getTemplateAsFile(JASPER_IMAGE_1);
        } else {
            return getTemplateAsFile(JASPER_IMAGE_2);
        }
    }

    public static final File getLogoSagasikiPath() throws IOException {
        return getTemplateAsFile(JASPER_IMAGE_R009);
    }

    public static final File getJasperTemplateRp003() throws IOException {
        return getTemplateAsFile(JASPER_R003_TEMPLATE);
    }

    public static final File getJasperTemplateRp004() throws IOException {
        return getTemplateAsFile(JASPER_R004_TEMPLATE);
    }

    public static final File getJasperTemplateRp009() throws IOException {
        return getTemplateAsFile(JASPER_R009_TEMPLATE);
    }

    public static final File getJasperTemplateRp010() throws IOException {
        return getTemplateAsFile(JASPER_R010_TEMPLATE);
    }

    public static final File getJasperTemplateRp005() throws IOException {
        return getTemplateAsFile(JASPER_R005_TEMPLATE);
    }

    public static final File getJasperTemplateForProduct(Integer productType) throws IOException {
        if (productType == 0) {
            return getTemplateAsFile(JASPER_PRODUCT_TEMPLATE);
        } else if (productType == 1) {
            return getTemplateAsFile(JASPER_PRODUCT_CARTON_TEMPLATE);
        } else {
            throw new IllegalArgumentException("Unexpected productType. productType=" + productType);
        }
    }

    /**
     * 届け先カルテの Jasper テンプレートを取得する
     *
     * @return Jasper テンプレートファイル
     * @throws IOException テンプレートファイルが存在しないとき
     */
    public static File getJasperTemplateForShippingDestinationKarte() throws IOException {
        return getTemplateAsFile(JASPER_SHIPPING_DESTINATION_KARTE_TEMPRATE);
    }


    /**
     * テンプレートファイルを取得する。存在確認も行う。
     *
     * @param settingsKey テンプレートファイル名の設定キー
     * @return テンプレートファイル
     * @throws IOException ファイルが見つからないとき
     */
    private static final File getTemplateAsFile(String settingsKey) throws IOException {
        String path = getJasperTemplatePath() + SettingUtil.getString(CONFIG_FILE, settingsKey);

        // If this file is not exist -> Exception
        File file = new File(path);
        if (!file.exists()) {
            logger.error("File not found ex: " + path);
            throw new IOException("File not found! Path: " + path);
        }

        return file;
    }
}
