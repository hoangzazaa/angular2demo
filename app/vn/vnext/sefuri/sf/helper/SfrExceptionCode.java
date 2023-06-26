package vn.vnext.sefuri.sf.helper;

public enum SfrExceptionCode {
    ERR_INVALID_REQUEST,
    ERR_USER_NOT_EXIST,

    ERR_CC002_EMAIL_SEND_FAILED,
    ERR_CC00201_INVALID_EMAIL,
    ERR_CC00202_INVALID_TOKEN,

    ERR_SV003_INVALID_DEAL,

    ERR_SV006_CREATE_TEMP_FILE,
    ERR_SV006_CREATE_USRS_DIR,
    ERR_SV006_FILE_NOT_EXISTS,
    ERR_SV006_SAVE_FILE,
    ERR_SV006_SAVE_TEMP_FILE,
    ERR_SV006_MOVE_FILE,
    ERR_SV006_GET_THUMBNAIL,
    ERR_SV006_GENERATE_PDF_THUMBNAIL, // #3491
    ERR_SV014_SEND_EMAIL,

    ERR_SV005_NOT_SALE_DEPARTMENT,
    ERR_SV005_CUSTOMER_GOAL_DATA_EXIST,

    ERR_SF00503_GZIP_DATA_ERROR,
    ERR_SV017_LOAD_EMAIL_CONFIG_ERROR,
    ERR_SV017_SENDER_EMPTY,
    ERR_SV017_RECIPIENTS_EMPTY,
    ERR_SV017_MISSING_QUOTATION_IMAGE,
    ERR_SV017_MISSING_ATTACH_FILES,

    /** 得意先が見つからない */
    ERR_CUSTOMER_NOT_FOUND,
    /** 届け先が見つからない */
    ERR_SHIPPING_DESTINATION_NOT_FOUND;
}
