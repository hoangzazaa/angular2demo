package vn.vnext.sefuri.sf.common;

import org.joda.time.DateTime;
import org.joda.time.DateTimeZone;

/**
 * Created by manhnv on 1/3/2017.
 */
public interface Constants {
    // cookie token key
    String COOKIE_TOKEN = "token";
    String LOGOUT = "logout";
    String SECRET_KEY = "sefuri";
    String SECRET_PHRASE = "SEFURI_Salesfront";
    /* session key for save login user data */
    String SESSION_USER = "current_user";
    String KEY_SECRET_FOOD = "sefuri_recover";
    String INVALID_TOKEN = "INVALID TOKEN";
    String WRONG_PASSWORD = "WRONG PASSWORD";
    String TOKEN_NOT_FOUND = "TOKEN NOT FOUND";
    String INVALID_SESSION = "INVALID SESSION";
    String INVALID_PARAMS = "INVALID INPUT";
    String STR_JSON_BLANK = "{}";
    String ERROR_CODE = "ERROR";
    String UTF_8 = "UTF-8";
    String ISO_8859_1 = "ISO-8859-1";

    String BLANK = "";
    String SPACE = " ";
    String COMMA = ",";
    String DOT = ".";
    String SEMICOLON = ";";
    String COLON = ":";
    String PERIOD = ".";
    String HYPHEN = "-";
    String UNDERSCORE = "_";
    String UNDERSCORE_FULLSIZE = "＿";
    String ASTERISK = "*";
    String SLASH = "/";
    String SLASH_JP = "／";
    String PERCENT = "%";
    String PLUS = "+";
    String MINUS = "-";
    String EQUAL = "=";

    String EXCLAMATION = "!";
    String LEFT_PARENTHESIS = "(";
    String RIGHT_PARENTHESIS = ")";
    String LEFT_BRACKET = "[";
    String RIGHT_BRACKET = "]";
    String LEFT_BRACE = "{";
    String RIGHT_BRACE = "}";
    String GRAM = "g";
    String DOLLAR = "$";
    String HOME_CURRENCY = "円";
    String IMPOSITION_SIGN = "丁";

    String QUOTATION_CODE = "M";
    String FIXED_DEAL = "S";
    String FIXED_TMP = "TMP";
    String FIXED_PRODUCT = "P";
    String PREFIX_CODE = "00000";
    String NEW_LINE = "\n";

    int PWD_MIN_LENGTH = 6;
    int PWD_MAX_LENGTH = 30;

    int PAGE_SIZE = 10;
    int MIN_PAGE_SIZE = 5;

    int EXPIRED_TIME_IN_SECOND = 24 * 60 * 60;
    int DEFAULT_OFFSET = 20;

    String THREE_DOT = "...";
    String X_SEPARATOR = "x";
    /*Pad with zeros and a width of 5 chars.*/
    String DEFAULT_FORMAT_PAD_3_ZERO = "%1$03d";
    /*Pad with zeros and a width of 5 chars.*/
    String DEFAULT_FORMAT_PAD_5_ZERO = "%1$05d";
    /*Pad with zeros and a width of 6 chars.*/
    String DEFAULT_FORMAT_PAD_6_ZERO = "%1$06d";
    String DEFAULT_FORMAT_NUMBER = "#,##0.0";
    String DEFAULT_DATE_FORMAT = "yyyy/MM/dd";
    String DEFAULT_DATETIME_FORMAT = "yyyy/MM/dd HH:mm:ss";

    String SETTING_DIR = "conf";
    String RESOURCE_FILE_EXT = ".properties";

    /* time constants */
    DateTime START_OF_TIME = new DateTime(0000, 1, 1, 0, 0, 0, DateTimeZone.UTC);
    DateTime END_OF_TIME = new DateTime(9999, 12, 31, 0, 0, 0, DateTimeZone.UTC);

    /*Delete deal info enable*/
    int DELETE_ENABLE = 1;
    /*Delete deal info disable*/
    int DELETE_DISABLE = 0;
    /*Deal type template*/
    int TEMPLATE = 1;
    /*Deal type deal*/
    int DEAL = 0;
    /*deal type copy*/
    int DEAL_COPY = 1;
    /*deal type new*/
    int ZERO = 0;
    /*quotation create new*/
    int QUOTATION_NEW = 0;
    /*quotation copy*/
    int QUOTATION_COPY = 1;

    int REQUEST_FILE = 1;
    /*page size*/
    int PAGE_SIZE_COMMENT = 10;
    int HIGHT_LIGHT_ZERO = 0;

    /* financial year start month */
    int MONTH_FINANCIAL_YEAR_START = 4;

    String ITEM_PRODUCT = "PRODUCT";
    String ITEM_QUOTATION = "QUOTATION";
    String ITEM_COMMENT_FILE = "COMMENT_FILE";
    Integer REQUEST_DESIGN = 0;
    Integer REQUEST_PRODUCTION = 1;

    Integer TYPE_PRODUCT = 3;

    /*file extension*/
    String[] ALLOW_FILE_EXTENSIONS = new String[]{Enums.FileType.PNG.getExtension(),
            Enums.FileType.JPG.getExtension(),
            Enums.FileType.JPEG.getExtension(),
            Enums.FileType.PDF.getExtension()};
    Integer SALE = 1;
    Integer SUPPORT = 2;

    String HTML_LINE_SEPARATOR = "<br />";
    String PLAIN_TEXT_LINE_SEPARATOR = System.getProperty("line.separator");

    /** 原紙: 一般原紙素材コード(sfr_sf_mst_paper.paper_material_code) の開始コード (含む) */
    final int GENERAL_PAPER_MATERIAL_CODE_START = 1000;
    /** 原紙: 一般原紙素材コード(sfr_sf_mst_paper.paper_material_code) の終了コード (含む) */
    final int GENERAL_PAPER_MATERIAL_CODE_END = 199999;
    /** 原紙: 特殊原紙素材コード(sfr_sf_mst_paper.paper_material_code) の開始コード (含む) */
    final int SPECIAL_PAPER_MATERIAL_CODE_START = 200000;
    /** 原紙: 特殊原紙素材コード(sfr_sf_mst_paper.paper_material_code) の終了コード (含む) */
    final int SPECIAL_PAPER_MATERIAL_CODE_END = 9999999;
}
