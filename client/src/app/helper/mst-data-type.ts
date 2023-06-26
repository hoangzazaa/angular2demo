/**
 * Pre-defined data as key-value pair support for master data.
 */
export const DEAL_STATUS = {
    1: "仕掛中", // New Edition
    2: "設計依頼中", // Design Requested
    3: "設計完了", // Design Comfirmed
    4: "受注確定", // Order Comfirmed
    5: "出荷待ち", // Shipment Comfirmed
    6: "一部出荷待ち", // partial shipment
    7: "出荷済", // Shipped
}

export const DEAL_STATUS_VALUES = {
    NEW_EDITION: 1,
    DESIGN_REQUESTED: 2, // Design Requested
    DESIGN_CONFIRMED: 3, // Design Comfirmed
    ORDER_CONFIRMED: 4, // Order Comfirmed
    SHIPMENT_CONFIRMED: 5, // Shipment Comfirmed
    WAITING_FOR_PARTIAL_SHIPMENT: 6,
    SHIPPED: 7, // Shipped
}

// shapeId
export const PRODUCT_TYPE = {
    0: "紙器・貼合",
    1: "段ボール",
    2: "美粧シート"
}

// product type
export const PRODUCT_TYPE_1 = {
    0: "段ボール",
    1: "紙器",
    2: "商事"
}

//http://fridaynight.vnext.vn/issues/2944
export const DEAL_TYPE = {
    0: "新版",
    1: "在版",
    2: "改版",
    3: "修正",
}

//http://fridaynight.vnext.vn/issues/2944
export const NEW_DEAL_TYPE = [
    {"id": 0, "name": "新版"},
    {"id": 2, "name": "改版"},
    {"id": 3, "name": "修正"},
    {"id": 1, "name": "在版"}
]

export const DEAL_TYPE_VALUES = {
    EXISTING_VERSION: 0,
    REPEATED: 1
}

export const TEMPLATE_DEAL = {
    FALSE: 0,
    TRUE: 1
}

export const OTHER_UNIT = {
    1 : "通工賃",
    2 : "基本料"
}

export const REQUEST_TYPE = {
    1: "佐賀工場",
    2: "小野工場",
    3: "多久工場",
    4: "他社工場（商事）"
}

export const PAPER = {
    0: "なし",
    1: "ＭＣＦコート",
    2: "ＮＳコート",
    3: "サンコート",
    4: "サンダイヤ",
    5: "SQカード",
    6: "ＪＥＴスター",
    7: "ＪＥＴエースＷ",
    8: "NEWウルトラＨ",
    9: "ウルトラＨ",
    10: "ユニフェイス",
    11: "アイベスト",
    12: "TitanBoard",
    13: "ＳＣコート",
    14: "ＳＩコート",
    15: "キングシルバー",
    16: "キングゴールド",
    17: "エコバリーＫ",
    18: "エコバリーV",
    19: "ＴＳ耐水紙",
    20: "NEWﾋﾟｼﾞｮﾝ",
    21: "新耐油紙",
    22: "CRC",
    99: "その他の原紙・ライナを選ぶ",
}

export const LAMINATION_FLUTE = {
    2: "EF",
    3: "BF",
    4: "GF"
}

export const PRINT_METHOD = {
    0: "指定なし", // unspecified
    1: "オフセット印刷", // Offset printing
    2: "デジタル印刷", // Digital printing
}

export const PRINT_METHOD_VALUE = {
    UNSPECIFIED: 0,
    OFFSET_PRINTING: 1,
    DIGITAL_PRINTING: 2,
    FLEXOGRAPHIC_PRINTING: 3
}

export const SURFACE_TREATMENT = {
    0: "なし",
    8: "UVOP",
    6: "UVクリアニス（インライン）",
    15: "UVクリアニス（オフライン）",
    7: "UVマットニス（インライン）",
    16: "UVマットニス（オフライン）",
    9: "水性ニス",
    1: "水性プレス",
    2: "ビニール引き（インライン）",
    3: "ビニール引き（オフライン）",
    10: "ビニール引き（マット・インライン）",
    11: "ビニール引き（マット・オフライン）",
    4: "PP貼り",
    12: "PPベタ窓",
    13: "PP20",
    14: "プレスコート（またはクリスタルP）",
}

export const STAMPING = {
    0: "",
    1: "箔押し",
    2: "浮出し・箔押し",
    3: "浮出し（箔なし）"
}

export const SHAPE = {
    0: "なし",
    1: "胴貼り（底ワンタッチ：蓋１面）",
    2: "胴貼り（底ワンタッチ：蓋３面）",
    3: "胴貼り（底ワンタッチ：蓋１面・蓋３面）",
    4: "胴貼り（底差し込み：蓋１面）",
    5: "胴貼り（底差し込み：蓋３面）",
    6: "胴貼り（キャラメル：蓋１面）",
    7: "胴貼り（キャラメル：蓋３面）",
    8: "胴貼り（キャラメル：蓋１・３面）",
    9: "組み立て（TN式）",
    10: "蓋身（貼りナシ・縁ナシ・フラップ２本）",
    11: "蓋身（貼りナシ・縁ナシ・フラップ三角）",
    12: "蓋身（貼りナシ・縁アリ・フラップ三角）",
    13: "蓋身（貼りアリ・縁ナシ・サイド貼り）",
    14: "蓋付き４コーナー貼り（内・内）",
    15: "蓋付き４コーナー貼り（内・外）",
    16: "蓋ナシ４コーナー貼り（内・内）",
    99: "その他"
}

export const DIE_CUTTING_WEIGHT = {
    1: "通常",
    2: "厚物（550g）以上",
    3: "薄物（200ｇ）以下",
    4: "薄物（150g）以下"
}

export const PASTE = {
    0: "なし",
    1: "機械貼り（胴貼り）",
    2: "機械貼り（両サイド貼り）",
    3: "機械貼り（ワンタッチ貼り）",
    4: "機械貼り（四コーナー貼り）",
    5: "機械貼り（六コーナー貼り）",
    6: "手貼り"
}

export const INSPECTION = {
    1: "なし",
    2: "1枚検品",
    3: "バラ検品",
    4: "抜き取り検品"
}

export const PACKING = {
    1: "なし",
    2: "段ボール",
    3: "シュリンク",
    4: "クラフト",
    5: "結束",
    6: "複合"
}

/*Define user role for system*/
export const USER_ROLE = {
    1: "社長",
    2: "役員",
    3: "本部長",
    4: "工場長",
    5: "部長",
    6: "課長",
    7: "室長",
    8: "係長",
    9: "職員",
    A: "支店長",
    B: "マネージャー"
}

export const DISTANCE = {
    0: "30km",
    1: "40km",
    2: "50km",
    3: "60km",
    4: "70km",
    5: "80km",
    6: "90km",
    7: "100km",
    8: "120km",
    9: "140km",
    10: "160km",
    11: "180km",
    12: "200km",
    13: "220km",
    14: "240km",
    15: "260km",
    16: "280km",
    17: "300km",
    18: "320km",
    19: "340km",
    20: "360km",
    21: "380km",
    22: "400km",
    23: "450km",
    24: "500km",
    25: "550km",
    26: "600km",
    27: "650km",
    28: "700km",
    29: "750km",
    30: "800km",
    31: "850km",
    32: "900km",
    33: "950km",
    34: "1000km",
    35: "1050km",
    36: "1100km",
    37: "1150km",
    38: "1200km",
    39: "1250km",
    40: "1300km",
    41: "1350km",
    42: "1400km",
    43: "1450km",
    44: "1500km",
    45: "1550km",
    46: "1600km",
    47: "1650km",
    48: "1700km",
    49: "1750km",
    50: "1800km",
    51: "1850km",
    52: "1900km",
    53: "1950km",
    54: "2000km"
}

export const SELECT_1008_1 = {
    1: "◯/◯",
    2: "◯/✕",
    3: "✕/◯",
    4: "✕/✕",
    5: "＃/◯",
    6: "◯/＃",
    7: "＃/✕",
    8: "✕/＃",
    9: "＃/＃"
}

export const SELECT_1008_2 = {
    0: "",
    1: "％",
    2: "枚",
    3: "箱",
    4: "梱包",
    5: "結束",
    6: "全数",
}

export const SELECT_1008_3 = {
    1: "以上",
    2: "以内",
    3: "未満",
    4: "全数",
}

export const SELECT_1010 = {
    1: "食料品製造業",
    2: "清涼飲料製造業及び茶",
    3: "酒類製造業",
    4: "油脂加工製品・石鹸",
    5: "医薬品製造業",
    6: "化粧品・歯磨・その他",
    7: "小売業",
    8: "その他の業種",
}

export const SELECT_1011_1 = {
    111: "段ｼｰﾄ（容器包装以外)",
    112: "段ｹｰｽ (容器包装)",
    221: "紙器 紙器製品",
    223: "紙器 美粧シート",
    224: "紙器 美粧ケース",
    225: "紙器 貼合シート",
    226: "紙器 貼合ケース",
    331: "商事 段ボール",
    332: "商事 紙器",
    333: "商事 美粧ケース",
    334: "商事 貼合ケース",
    341: "商事 ガラスビン",
    342: "商事 ＰＥＴボトル",
    343: "商事 その他紙製容器",
    344: "商事 その他プラ容器",
    351: "商事 容器包装以外",
    999: "容器以外及び対象外",
}

export const SELECT_1011_2 = {
    1: "一般廃棄物",
    2: "事業系廃棄物",
    3: "海外廃棄物",
    9: "容器以外及び対象外",
}

export const SELECT_2001 = {
    0: "なし",
    1: "胴貼り（底ワンタッチ：蓋１面）",
    2: "胴貼り（底ワンタッチ：蓋３面）",
    3: "胴貼り（底ワンタッチ：蓋１面・蓋３面）",
    4: "胴貼り（底差し込み：蓋１面）",
    5: "胴貼り（底差し込み：蓋３面）",
    6: "胴貼り（キャラメル：蓋１面）",
    7: "胴貼り（キャラメル：蓋３面）",
    8: "胴貼り（キャラメル：蓋１・３面）",
    9: "組み立て（TN式）",
    10: "蓋身（貼りナシ・縁ナシ・フラップ２本）",
    11: "蓋身（貼りナシ・縁ナシ・フラップ三角）",
    12: "蓋身（貼りナシ・縁アリ・フラップ三角）",
    13: "蓋身（貼りアリ・縁ナシ・サイド貼り）",
    14: "蓋付き４コーナー貼り（内・内）",
    15: "蓋付き４コーナー貼り（内・外）",
    16: "蓋ナシ４コーナー貼り（内・内）",
    99: "その他"
}

export const SELECT_3002 = {
    0: "な",
    8: "UVOP",
    6: "UVクリアニス",
    7: "UVマットニス",
    9: "水性ニス",
    1: "水性プレス",
    2: "ビニール引き（インライン）",
    3: "ビニール引き（オフライン）",
    10: "ビニール引き（マット・インライン）",
    11: "ビニール引き（マット・オフライン）",
    4: "PP貼り",
    12: "PPベタ窓",
    13: "PP20",
    14: "プレスコート（またはクリスタルP）",
}

export const SELECT_4001 = {
    0: "なし",
    1: "シュリンク梱包",
    2: "クラフト梱包",
    3: "クラフト胴巻",
    4: "結束",
    5: "段ボール梱包",
}

export const FACTORY = {
    1: "佐賀工場",
    2: "小野工場",
    3: "多久工場",
    4: "他社工場（商事）"
}

/** 地区コード */
export const DISTRICT_NAME = {
    "10 ": "市内",
    "11 ": "大和方面",
    "12 ": "牛津方面",
    "20 ": "神埼方面",
    "21 ": "鳥栖方面",
    "22 ": "甘木方面",
    "23 ": "久留米方面",
    "30 ": "川副方面",
    "31 ": "大川方面",
    "32 ": "筑後方面",
    "35 ": "山鹿方面",
    "36 ": "玉名方面",
    "37 ": "熊本方面",
    "40 ": "江北方面",
    "41 ": "武雄方面",
    "42 ": "有田方面",
    "43 ": "波佐見方面",
    "45 ": "伊万里方面",
    "46 ": "佐世保方面",
    "47 ": "松浦方面",
    "50 ": "鹿島方面",
    "55 ": "諫早方面",
    "56 ": "長崎方面",
    "57 ": "島原方面",
    "60 ": "小城方面",
    "61 ": "唐津方面",
    "62 ": "多久方面",
    "75 ": "福岡西方面",
    "76 ": "福岡南方面",
    "77 ": "福岡中央方面",
    "85 ": "和白方面",
    "86 ": "福岡東方面",
    "87 ": "飯塚方面",
    "105": "北九州方面",
    "106": "山口方面",
    "115": "中津方面",
    "116": "別府方面",
    "117": "大分方面",
    "125": "延岡方面",
    "135": "鹿児島方面",
    "145": "宮崎方面",
    "900": "路線便",
    "909": "直送・他"
}
/** 地区コードのリスト */
export const DISTRICT_CODE_LIST = [
    "10", "11", "12", "20", "21", "22", "23", "30", "31", "32", "35", "36", "37", "40", "41", "42", "43", "45", "46",
    "47", "50", "55", "56", "57", "60", "61", "62", "75", "76", "77", "85", "86", "87", "105", "106", "115", "116", "117", "125", "135", "145", "900", "909"
];

/** 納入可能車両サイズ */
export const VEHICLE_SIZE = {
    1: "2t以下",
    2: "4t以下"
}
/** 納入可能車両サイズ区分値のリスト */
export const VEHICLE_SIZE_CODE_LIST = [1, 2];


/**
 * 専用伝票(電脳的には系列C)の区分値
 */
export interface ExtraMethod {
    /** 出荷案内書 */
    '00': string;
    /** 専用伝票 */
    '01': string;
    /** 両方添付 */
    '02': string;
    /** 添付無し */
    '03': string;
}
/**
 * 専用伝票(電脳的には系列C)の区分値型
 */
export type KeyofExtraMethod = /*keyof ExtraMethod*/ '00' | '01' | '02' | '03';

/** 専用伝票有無 */
export const EXTRA_METHOD_NAME: ExtraMethod = {
    "00": "出荷案内書",
    "01": "専用伝票",
    "02": "両方添付",
    "03": "添付なし"
}
/** 専用伝票有無区分値のリスト  */
export const EXTRA_METHOD_CODE_LIST: KeyofExtraMethod[] = ["00", "01", "02", "03"];

/**
 * 専用伝票有無
 * @deprecated Use EXTRA_METHOD_NAME
 */
export const FORM_NAME = EXTRA_METHOD_NAME;

/*出荷便*/
export const SHIPPING_NAME = {
    1: "ヤマト運輸",
    2: "久留米（ｾﾌﾞﾝﾃﾝ）",
    3: "久留米運送（株）",
    4: "九州産交運輸",
    5: "佐川急便",
    6: "昭和西濃運輸",
    7: "西武（急便）",
    8: "西武運輸（株）",
    9: "博運社",
    10: "福山通運",
    11: "久留米（着払）",
    12: "日通（航空便）",
    13: "ヤマト（ﾀｲﾑｻｰﾋﾞｽ）",
    14: "フットワーク",
    15: "ﾈｯﾄﾜｰｸｴｸｽﾌﾟﾚｽ",
    16: "日通（ｽｰﾊﾟｰﾍﾟﾘｶﾝ）",
    17: "日通（アロー便）",
    18: "ヤマト（航空便）",
    19: "毎通運輸",
    20: "西濃運輸",
    21: "福山（航空便）",
    22: "ｻｶﾞｼｷﾌｫｰﾑ",
    23: "チャーター便",
    24: "姫路合同貨物"
}

export const SHIPPING_COMPANY = {
    0: "指定無し",
    1: "自社便",
    2: "福山通運",
    3: "久留米運送（株）",
    4: "久留米運送（着払）",
    5: "西武運輸（株）",
    6: "西濃運輸",
    7: "佐川急便",
    8: "日通（航空便）"
}

/** 数量制限 */
export interface LimitQuantity {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
    9: string;
}

/** 数量制限 */
export const LIMIT_QUANTITY: LimitQuantity = {
    1: "◯/◯",
    2: "◯/×",
    3: "×/◯",
    4: "×/×",
    5: "＃/◯",
    6: "◯/＃",
    7: "＃/×",
    8: "×/＃",
    9: "＃/＃",
}

/** 数量制限区分値リスト */
export const LIMIT_QUANTITY_CODE_LIST: number[] /*(keyof LimitQuantity)[]*/ = [
    1, 2, 3, 4, 5, 6, 7, 8, 9
];


/** 時間指定 */
export const SPECIFY_TIME = {
    1: "直送",
    2: "何時何分に",
    3: "何時何分迄",
    4: "午前中",
    5: "何時何分以降",
    6: "午後から",
    7: "当日中",
    8: "引き取り",
    9: "営業便",
    10: "指定無し",
    11: "在庫補充",
    12: "セット　部品",
    13: "お客様ｻﾝﾌﾟﾙ",
    14: "内部ｻﾝﾌﾟﾙ"
}
/** 時間指定区分値のリスト */
export const SPECIFY_TIME_CODE_LIST = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

/** 時間指定期間 */
export const SPECIFY_TIME_PERIOD = {
    1: "に",
    2: "まで",
    3: "以降"
}
/** 時間指定期間区分値のリスト */
export const SPECIFY_TIME_PERIOD_CODE_LIST = [1, 2, 3];


/**  */


export const PACKAGING_CLASSIFICATION = {
    2: "一次包装以外",
    1: "一次包装"
}

export const PACKAGING_CLASSIFICATION_VALUE = {
    PRIMARY_PACKAGING: 1,
    NON_PRIMARY_PACKAGING: 2
}

export const PACKAGING_INCLUSION = {
    0: "指定なし",
    1: "洋菓子",
    2: "和菓子",
    3: "その他"
}

export const PACKAGING_INCLUSION_VALUE = {
    NOT_SPECIFIC: 0,
    PASTRY: 1,
    JAPANESE_PASTRY: 2,
    OTHER: 3
}

export const END_USER = {
    0: "指定なし",
    1: "地場単独ユーザ",
    2: "大手のOEM商品"
};

export const END_USER_VALUE = {
    NOT_SPECIFIC: 0,
    LOCAL: 1,
    OEM: 2
}

export const MATERIAL = {
    0: "指定なし",
    1: "ハンソル指定",
    2: "国内紙指定",
    3: "どちらでも可",
    4: "その他"
}

export const PRESERVATION_METHOD = {
    0: "指定なし",
    1: "常温",
    2: "冷蔵",
    3: "冷凍"
}

export const DISTRIBUTION_RANGE = {
    0: "指定なし",
    1: "自社店舗",
    2: "地域流通",
    3: "全国流通および販売"
}

export const SALES_ESTIMATE = {
    0: "指定なし",
    1: "～3,000",
    2: "～10,000",
    3: "～10万",
    4: "10万以上"
}

export const CONTACT_STATE = {
    0: "指定なし",
    1: "直接のせる、いれる",
    2: "間接的に触れる"
}

export const FILLING_METHOD = {
    0: "指定なし",
    1: "手作業",
    2: "機械充填"
}

export const DESIRED = {
    0: "希望",
    1: "指定"
}

export const PERIODS_TAB1 = {
    1: "当月",
    2: "前月",
    3: "通期（今年度）",
}

export const PERIODS_TAB2 = {
    1: "当月",
    2: "前月",
    3: "前年同月",
}


export const PRODUCT_UNIT = {
    3: "枚",
    1: "個",
    2: "部",
    4: "式",
    5: "セット",
}

export const PRODUCT_UNIT_VALUE = {
    SHEET: 3,
    PIECE: 1,
    PART: 2,
    FORMULA: 4,
    SET: 5,
}

export const QUANTITY_RESTRICTION = SELECT_1008_1;