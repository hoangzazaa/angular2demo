/**
 * Created by VuPT on 5/12/2017.
 */
export const PRODUCT_TYPE = {
    0: "紙器",
    1: "段ボール",
    2: "美粧シート"
}

export const FACTORY_ID = {
    1: "佐賀工場",
    2: "小野工場",
    3: "多久工場",
    4: "他社工場（商事）"
}
export const PAPER_COAT_BALL = [
    {"id": 12, "name": "TitanBoard"},
    {"id": 1, "name": "MCFコート"},
    {"id": 2, "name": "NSコート"},
    {"id": 13, "name": "SCコート"},
    {"id": 3, "name": "サンコート"},
    {"id": 22, "name": "CRC"}
]

export const PAPER_CARD = [
    {"id": 5, "name": "SQカード"},
    {"id": 7, "name": "JETエースW"},
    {"id": 20, "name": "NEWピジョン"},
]

export const PAPER_LAMINATION_FLUTE = {
    1: "なし",
    2: "EF",
    3: "BF",
    4: "GF"
}

export const PAPER_LAMINATION_FLUTE_2745 = [
    {"id": 3, "name": "BF"},
    {"id": 2, "name": "EF"}
]


export const ONE_STAGE_FLUTE = [
    {"id": 3, "name": "BF"},
    {"id": 2, "name": "EF"},
    {"id": 4, "name": "GF"}
]

export const PAPER_LAMINATION_FIRST_OPTION = {
    1: "SCP"
}

export const PAPER_LAMINATION_SECOND_OPTION = {
    3: "C",
    16: "K",
    6: "CWF",
    9: "BWF",
}


export const PRINT_METHOD = {
    0: "なし",
    1: "オフセット印刷",
    2: "デジタル印刷",
}

export const DIGITAL_COLOR = {
    1: "指定なし",
    9: "モノクロ",
    10: "カラー4C",
    11: "7C",
}
//
// export const COLOR_2685 = {
//     1:"ＢＫ",
//     2:"Ｃ",
//     3:"Ｍ",
//     4:"Ｙ",
//     5:"０４赤",
//     6:"２６０墨",
//
//
// }

export const COLOR_2685 = [
    "　　", "ＢＫ", "Ｃ", "Ｍ", "Ｙ", "０４赤", "２６０墨"
]

export const OFFSET_COLOR = {
    1: "0 色",
    2: "1 色",
    3: "2 色",
    4: "3 色",
    5: "4 色",
    6: "5 色",
    7: "6 色",
    8: "7 色",
}

export const SURFACE_TREATMENT = [
    {"id": 0, "name": "なし"},
    {"id": 8, "name": "UVOPニス"},
    {"id": 17, "name": "UVOPマット"},
    {"id": 6, "name": "UVクリアニス（インライン）"},
    // {"id": 15, "name": "UVクリアニス（オフライン）"}, //2902
    {"id": 7, "name": "UVマットニス（インライン）"},
    // {"id": 16, "name": "UVマットニス（オフライン）"}, //2902
    {"id": 9, "name": "水性ニス"},
    {"id": 1, "name": "水性プレス"},
    {"id": 2, "name": "ビニール引き（インライン）"},
    {"id": 3, "name": "ビニール引き（オフライン）"},
    {"id": 10, "name": "ビニール引き（マット・インライン）"},
    {"id": 11, "name": "ビニール引き（マット・オフライン）"},
    {"id": 4, "name": "PP貼り"},
    {"id": 12, "name": "PPベタ窓"},
    {"id": 13, "name": "PP20μ"},
    {"id": 18, "name": "PP20μベタ窓"},
    {"id": 14, "name": "プレスコート（またはクリスタルP）"},
    {"id": 19, "name": "スポットニス"},
    // {"id": 20, "name": "疑似エンボス（OPクリア／UVマット・ハード）"},
    {"id": 21, "name": "疑似エンボスソフト"},
    {"id": 22, "name": "疑似エンボスハード"}
]

export const SURFACE_TREATMENT_DETAIL = [
    {"id": 0, "name": "なし"},
    {"id": 8, "name": "UVOPニス"},
    {"id": 17, "name": "UVOPマット"},
    {"id": 6, "name": "UVクリアニス（インライン）"},
    // {"id": 15, "name": "UVクリアニス（オフライン）"}, //2902
    {"id": 7, "name": "UVマットニス（インライン）"},
    // {"id": 16, "name": "UVマットニス（オフライン）"}, //2902
    {"id": 9, "name": "水性ニス"},
    {"id": 1, "name": "水性プレス"},
    {"id": 2, "name": "ビニール引き（インライン）"},
    {"id": 3, "name": "ビニール引き（オフライン）"},
    {"id": 10, "name": "ビニール引き（マット・インライン）"},
    {"id": 11, "name": "ビニール引き（マット・オフライン）"},
    {"id": 4, "name": "PP貼り"},
    {"id": 12, "name": "PPベタ窓"},
    {"id": 13, "name": "PP20μ"},
    {"id": 18, "name": "PP20μベタ窓"},
    {"id": 14, "name": "プレスコート（またはクリスタルP）"},
    {"id": 19, "name": "スポットニス・樹脂版必要"},
    // {"id": 20, "name": "疑似エンボス（OPクリア／UVマット・ハード）"},
    {"id": 21, "name": "疑似エンボスソフト"},
    {"id": 22, "name": "疑似エンボスハード"}
]

export const EMBOSSING = [
    {"id": "0", "name": "なし"},
    {"id": "EB005", "name": "キャンパス布目"},
    {"id": "EB004", "name": "つむぎ"},
    {"id": "EB006", "name": "ヘアーカール"},
    {"id": "EB007", "name": "ヘアーライン"},
    {"id": "EB002", "name": "絹目"},
    {"id": "EB003", "name": "絹目格子"},
    {"id": "EB008", "name": "皮紋"},
    {"id": "EB009", "name": "布目"},
    {"id": "EB001", "name": "梨地"},
]

export const STAMPING_ID = {
    0: "なし",
    1: "箔押し",
    2: "浮出し・箔押し",
    3: "浮出し（箔なし）",
}

export const PASTE_ID = {
    0: "なし",
    1: "機械貼り（胴貼り）",
    2: "機械貼り（両サイド貼り）",
    3: "機械貼り（ワンタッチ貼り）",
    4: "機械貼り（２点貼り）",
    5: "機械貼り（四コーナー貼り）",
    6: "機械貼り（六コーナー貼り）",
    7: "手貼り"
}

export const PASTE_ID_NOT_A = {
    0: "なし",
    1: "機械貼り（胴貼り）",
    2: "機械貼り（両サイド貼り）",
    3: "機械貼り（ワンタッチ貼り）"
}
export const INSPECTION_ID = {
    1: "なし",
    2: "全数検品",
    3: "パラ検品",
    4: "抜き取り検品",
}

export const PACKING_ID = {
    0: "なし",
    1: "結束",
    2: "社用通函（ダンボール梱包）",
    3: "専用通函（ダンボール梱包）",
    4: "シュリンク梱包",
    5: "クラフト梱包",
    6: "複合梱包（シュリンク＋ダンボール詰め）",
    7: "複合梱包（クラフト＋ダンボール詰め）",
    8: "複合梱包（シュリンク＋ダンボール胴巻）",
    9: "複合梱包（クラフト＋ダンボール胴巻）",
    10: "複合梱包（その他）",
}

export const SHIPPING_COST_ID = {
    0: "",
    30: "30kmまで",
    40: "40kmまで",
    50: "50kmまで",
    60: "60kmまで",
    70: "70kmまで",
    80: "80kmまで",
    90: "90kmまで",
    100: "100kmまで",
    120: "120kmまで",
    140: "140kmまで",
    160: "160kmまで",
    180: "180kmまで",
    200: "200kmまで",
    220: "220kmまで",
    240: "240kmまで",
    260: "260kmまで",
    280: "280kmまで",
    300: "300kmまで",
    320: "320kmまで",
    340: "340kmまで",
    360: "360kmまで",
    380: "380kmまで",
    400: "400kmまで",
    450: "450kmまで",
    500: "500kmまで",
    550: "550kmまで",
    600: "600kmまで",
    650: "650kmまで",
    700: "700kmまで",
    750: "750kmまで",
    800: "800kmまで",
    850: "850kmまで",
    900: "900kmまで",
    950: "950kmまで",
    1000: "1000kmまで",
    1050: "1050kmまで",
    1100: "1100kmまで",
    1150: "1150kmまで",
    1200: "1200kmまで",
    1250: "1250kmまで",
    1300: "1300kmまで",
    1350: "1350kmまで",
    1400: "1400kmまで",
    1450: "1450kmまで",
    1500: "1500kmまで",
    1550: "1550kmまで",
    1600: "1600kmまで",
    1650: "1650kmまで",
    1700: "1700kmまで",
    1750: "1750kmまで",
    1800: "1800kmまで",
    1850: "1850kmまで",
    1900: "1900kmまで",
    1950: "1950kmまで",
    2000: "2000kmまで"
}

export const CARTON_FLUTE = [
    {"id": 1, "name": "AF"},
    {"id": 2, "name": "BF"},
    {"id": 4, "name": "CF"},
    {"id": 3, "name": "WF"},
]

export const CARTON_NOT_A_FLUTE = {
    0: "なし",
    1: "AF",
    2: "BF",
    3: "WF",
    4: "CF"
}

export const CARTON_LAMINATION_FIRST_OPTION = [
    {"id": 16, "name": "K"},
    {"id": 5, "name": "K(NRK)"},
    {"id": 6, "name": "CWF"},
    {"id": 9, "name": "BWF"},
    {"id": 3, "name": "C"} //TODO: check theo master giấy
]
export const CARTON_LAMINATION_SECOND_OPTION = [
    {"id": 1, "name": "SCP"},
    {"id": 14, "name": "SAM-S"},
]
export const CARTON_BINDING_METHOD = {
    0: "",
    1: "二の字",
    2: "キの字",
    3: "十の字",
    4: "ーの字"
}

export const CARTON_COLOR = {
    0: "",
    1: "0 色",
    2: "1 色",
    3: "2 色",
    4: "3 色"
}

export const CARTON_COLOR_2407 = {
    0: "",
    1: "0c",
    2: "1c",
    3: "2c",
    4: "3c",
    5: "4c"
}

export const CARTON_WATER_REPELLENT = {
    0: "なし",
    1: "片面（表）",
    2: "片面（裏）",
    3: "両面"
}

export const STRING_COLOR = {
    0: "",
    1: "白",
    2: "赤",
    3: "青",
    4: "黄"
}

export const CARTON_PACKING = {
    0: "",
    1: "ｸﾗﾌﾄ梱包（ワークピア天山）",
    2: "ｸﾗﾌﾄ梱包（コダマ）",
    3: "ｸﾗﾌﾄ梱包（佐賀）",
    4: "クラフト胴巻き",
    5: "シュリンク梱包",
    6: "段ﾎﾞｰﾙ梱包（社用）",
    7: "段ﾎﾞｰﾙ梱包（専用）",
    8: "パレット板締め",
    9: "結束"
}

export const HAND_TYPE = {
    1: "切り落し",
    2: "切り残し",
}
export const HAND_SIZE = {
    1: [
        {"id": "5", "name": "80x30"},
        {"id": "1", "name": "80x25"},
        {"id": "6", "name": "60x25"},
        {"id": "4", "name": "50x20"},
        {"id": "7", "name": "40x20"},
    ],
    2: [
        {"id": "1", "name": "80x25"},
        {"id": "2", "name": "60x30"},
        {"id": "3", "name": "60x20"},
        {"id": "4", "name": "50x20"},
    ]
}

export const OTHER_METHOD = {
    0: "なし",
    1: "地刷り",
    2: "コダマシキ外注",
    3: "コダマシキ打抜き",
    4: "変形フラップ",
    5: "二分切り仕切",
    6: "仕切組立",
    7: "ジョイントカット上",
    8: "ジョイントカット下",
    9: "ジョイントカット上下",
    10: "佐賀工場通函",
    11: "多久工場通函"
}

export const CARTON_COLOR_MEMO = [
    "　　", "０４赤", "１１草", "６９草", "１３浅葱", "１４群青", "ﾔﾏﾔ群青", "１７紺藍", "２４茶", "２６０墨"
]

export const DIE_CUTTING_FLAG = [
    {"id": "0", "name": "なし"},
    {"id": "1", "name": "あり"},
]