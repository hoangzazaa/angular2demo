/**
 * Defined the constants key use in the application.
 * @author manhnv
 */
export class Constants {
    /*for breadcrumb*/
    public static readonly TOP: string = 'TOP';
    public static readonly SLASH: string = '/';
    public static readonly SLASH_JP: string = '／';
    public static readonly HYPHEN: string = '-';
    public static readonly UNDERSCORE = "_";
    public static readonly PERCENTAGE: string = '%';
    public static readonly DEAL_OVERVIEW_BREADCRUMB: string = '案件概況';

    /*for number data type*/
    public static readonly ZERO: number = 0;
    public static readonly ONE: number = 1;
    public static readonly MAX_LENGTH: number = 5;
    public static readonly FIRST_PAGE: number = 1;
    public static readonly PAGE_SIZE: number = 10;
    public static readonly MIN_PAGE_SIZE: number = 5;

    /*for string data type*/
    public static readonly BACK: string = '戻る';
    public static readonly BACK_TO_LOGIN: string = 'ログインへ戻る';
    public static readonly TRY_AGAIN: string = 'もう一度試してください';
    public static readonly BLANK: string = '';
    public static readonly SPACE: string = ' ';
    public static readonly COMMA: string = ',';
    public static readonly PERIOD: string = '.';
    public static readonly COLON_WITH_SPACE: string = ' : ';

    public static readonly GROUP: string = 'g';
    public static readonly DECIMAL_PADDING: string = '000000';
    public static readonly THOUSANDS_SEPARATOR: string = ',';
    public static readonly DECIMAL_SEPARATOR: string = '.';

    public static readonly GRAM: string = 'g';
    public static readonly X_SEPARATOR: string = 'x';
    public static readonly DOLLAR: string = '$';
    public static readonly HOME_CURRENCY: string = '円';
    public static readonly IMPOSITION_SIGN: string = '丁';
    public static readonly FIXED_DEAL: string = 'S';
    public static readonly TMP: string = 'TMP';
    public static readonly PREFIX_CODE: string = '00000';
    public static readonly N_A: string = 'N/A';
    public static readonly DEFAULT_DATE_FORMAT: string = 'YYYY/MM/DD';
    public static readonly THREE_DOT: string = '...';

    /**/
    public static readonly ITEM_QUOTATION: string = 'QUOTATION';
    public static readonly ITEM_PRODUCT: string = 'PRODUCT';
    public static readonly DEFAULT: number = 1;
    public static readonly COPY: number = 1;
    public static readonly NEW: number = 0;
    public static readonly TEMPLATE: number = 1;
    public static readonly DEAL: number = 0;
    public static readonly FINAL_STATUS_DEAL: number = 8;
    public static readonly INDEX_DEFAULT: number = 0;
    public static readonly DEAL_DEFAULT: number = 1;
    public static readonly PERCENT: number = 0.08;

    /*Type item data*/
    public static readonly REQUEST_ODER: number = 4;
    public static readonly DEAL_NEW: number = 0;
    public static readonly DEAL_REUSE: number = 1;
    public static readonly DEAL_PRODUCT: number = 1;
    public static readonly DEAL_FILE: number = 2;
    public static readonly QUOTATION: number = 3;
    public static readonly PRODUCT_FILE: number = 4;

    /*Month */
    public static readonly MONTH_4: number = 4;
    public static readonly MONTH_5: number = 5;
    public static readonly MONTH_6: number = 6;
    public static readonly MONTH_7: number = 7;
    public static readonly MONTH_8: number = 8;
    public static readonly MONTH_9: number = 9;
    public static readonly MONTH_10: number = 10;
    public static readonly MONTH_11: number = 11;
    public static readonly MONTH_12: number = 12;
    public static readonly MONTH_1: number = 1;
    public static readonly MONTH_2: number = 2;
    public static readonly MONTH_3: number = 3;

    /*Product type*/
    /*段ボール*/
    public static readonly TYPE_1: number = 0;
    /*段ボール*/
    public static readonly TYPE_2: number = 1;
    /*段ボール*/
    public static readonly TYPE_3: number = 2;
    /*total*/
    public static readonly TOTAL: number = 3;
    /*interest rate*/
    public static readonly INTEREST_RATE: number = 4;
    /** 既存顧客 */
    public static readonly CUSTOMER_OLD: number = 0;
    /** 新規顧客 */
    public static readonly CUSTOMER_NEW: number = 1;
    /** 既存顧客(その他) */
    public static readonly CUSTOMER_OTHER: number = 2;
    public static readonly TAB_2: number = 2;
    public static readonly THOUSAND: number = 1000;
    public static readonly ROWS: number[] = [0, 1, 2];//rows
    public static readonly COLUMNS: number[] = [4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3];// columns

    /* User role */
    public static readonly USER_ROLE_STAFF: string = "1";
    public static readonly USER_ROLE_HEAD: string = "2";

    /*key string*/
    public static readonly SECRET_PHRASE = "SEFURI_Salesfront";
    public static readonly KEY_STR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

    /*maximum dimensions for image thumbnail to scale aspect ratio*/
    public static readonly MAX_FILESIZE_5MB: number = 5 * 1024 * 1024;
    public static readonly MAX_FILESIZE_10MB: number = 10 * 1024 * 1024;
    public static readonly THUMBNAIL_WIDTH: number = 25000;
    public static readonly THUMBNAIL_HEIGHT: number = 25000;

}
