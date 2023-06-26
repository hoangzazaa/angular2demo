import {STMTime} from "../../specify-time-modal/model/STMTime.model";
export interface SDMDestination extends STMTime {
    // Id
    sdm_id: number;
    // ext
    sdm_ext: string;
    // option name
    sdm_name: string;
    // 納入先名
    sdm_deliveryName: string;
    // 納入先名（略称）
    sdm_abbreviation: string;
    // フリガナ
    sdm_furigana: string;
    // 略称カナ
    sdm_abbrFurigana: string;
    // 郵便番号
    sdm_postalCode: string;
    // 地区コード
    sdm_districtCode: string;
    // 住所１
    sdm_address1: string;
    // 住所２
    sdm_address2: string;
    // TEL
    sdm_tel: string;
    // FAX
    sdm_fax: string;
    // 時間指定
    sdm_specifyTime: string;
    // 担当部署
    sdm_deptName: string;
    // 得意先担当者
    sdm_salerName: string;
    // 納入可能車両サイズ
    sdm_availableVehicleSize: number;
    // 付帯作業
    sdm_extraWork: string;
    // 専用伝票有無
    sdm_extraMethod: string;
    // 備考
    sdm_memo: string;
}
