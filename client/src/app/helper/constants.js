"use strict";
/**
 * Defined the constants key use in the application.
 * @author manhnv
 */
var Constants = (function () {
    function Constants() {
    }
    /*for breadcrumb*/
    Constants.TOP = 'TOP';
    Constants.SLASH = '/';
    Constants.SLASH_JP = '／';
    Constants.HYPHEN = '-';
    Constants.UNDERSCORE = "_";
    Constants.PERCENTAGE = '%';
    Constants.DEAL_OVERVIEW_BREADCRUMB = '案件概況';
    /*for number data type*/
    Constants.ZERO = 0;
    Constants.ONE = 1;
    Constants.MAX_LENGTH = 5;
    Constants.FIRST_PAGE = 1;
    Constants.PAGE_SIZE = 10;
    Constants.MIN_PAGE_SIZE = 5;
    /*for string data type*/
    Constants.BACK = '戻る';
    Constants.BACK_TO_LOGIN = 'ログインへ戻る';
    Constants.TRY_AGAIN = 'もう一度試してください';
    Constants.BLANK = '';
    Constants.SPACE = ' ';
    Constants.COMMA = ',';
    Constants.PERIOD = '.';
    Constants.COLON_WITH_SPACE = ' : ';
    Constants.GROUP = 'g';
    Constants.DECIMAL_PADDING = '000000';
    Constants.THOUSANDS_SEPARATOR = ',';
    Constants.DECIMAL_SEPARATOR = '.';
    Constants.GRAM = 'g';
    Constants.X_SEPARATOR = 'x';
    Constants.DOLLAR = '$';
    Constants.HOME_CURRENCY = '円';
    Constants.IMPOSITION_SIGN = '丁';
    Constants.FIXED_DEAL = 'S';
    Constants.TMP = 'TMP';
    Constants.PREFIX_CODE = '00000';
    Constants.N_A = 'N/A';
    Constants.DEFAULT_DATE_FORMAT = 'YYYY/MM/DD';
    Constants.THREE_DOT = '...';
    /**/
    Constants.ITEM_QUOTATION = 'QUOTATION';
    Constants.ITEM_PRODUCT = 'PRODUCT';
    Constants.DEFAULT = 1;
    Constants.COPY = 1;
    Constants.NEW = 0;
    Constants.TEMPLATE = 1;
    Constants.DEAL = 0;
    Constants.FINAL_STATUS_DEAL = 8;
    Constants.INDEX_DEFAULT = 0;
    Constants.DEAL_DEFAULT = 1;
    Constants.PERCENT = 0.08;
    /*Type item data*/
    Constants.REQUEST_ODER = 4;
    Constants.DEAL_NEW = 0;
    Constants.DEAL_REUSE = 1;
    Constants.DEAL_PRODUCT = 1;
    Constants.DEAL_FILE = 2;
    Constants.QUOTATION = 3;
    Constants.PRODUCT_FILE = 4;
    /*Month */
    Constants.MONTH_4 = 4;
    Constants.MONTH_5 = 5;
    Constants.MONTH_6 = 6;
    Constants.MONTH_7 = 7;
    Constants.MONTH_8 = 8;
    Constants.MONTH_9 = 9;
    Constants.MONTH_10 = 10;
    Constants.MONTH_11 = 11;
    Constants.MONTH_12 = 12;
    Constants.MONTH_1 = 1;
    Constants.MONTH_2 = 2;
    Constants.MONTH_3 = 3;
    /*Product type*/
    /*段ボール*/
    Constants.TYPE_1 = 0;
    /*段ボール*/
    Constants.TYPE_2 = 1;
    /*段ボール*/
    Constants.TYPE_3 = 2;
    /*total*/
    Constants.TOTAL = 3;
    /*interest rate*/
    Constants.INTEREST_RATE = 4;
    /** 既存顧客 */
    Constants.CUSTOMER_OLD = 0;
    /** 新規顧客 */
    Constants.CUSTOMER_NEW = 1;
    /** 既存顧客(その他) */
    Constants.CUSTOMER_OTHER = 2;
    Constants.TAB_2 = 2;
    Constants.THOUSAND = 1000;
    Constants.ROWS = [0, 1, 2]; //rows
    Constants.COLUMNS = [4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3]; // columns
    /* User role */
    Constants.USER_ROLE_STAFF = "1";
    Constants.USER_ROLE_HEAD = "2";
    /*key string*/
    Constants.SECRET_PHRASE = "SEFURI_Salesfront";
    Constants.KEY_STR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    /*maximum dimensions for image thumbnail to scale aspect ratio*/
    Constants.MAX_FILESIZE_5MB = 5 * 1024 * 1024;
    Constants.MAX_FILESIZE_10MB = 10 * 1024 * 1024;
    Constants.THUMBNAIL_WIDTH = 25000;
    Constants.THUMBNAIL_HEIGHT = 25000;
    return Constants;
}());
exports.Constants = Constants;
//# sourceMappingURL=constants.js.map