import {SDMDestination} from "../../../../component/shipping-destination-modal/model/SDMDestination.model";
import { ShippingDestinationJson } from '../../../../model/core/ShippingDestination.model';
import { ShippingDestinationModalHelper } from '../../../../component/shipping-destination-modal/ShippingDestinationModal.helper';
import { SpecifyTimeModalHelper } from '../../../../component/specify-time-modal/SpecifyTimeModal.helper';

export class ShippingDestinationModel implements SDMDestination {

    // Id
    id: number;
    // dennoPartnerCode
    code: string;
    ext: string;
    // customerId
    customerId: number;
    // 納入先名
    deliveryName: string;
    // 納入先名（略称）
    abbreviation: string;
    // フリガナ
    furigana: string;
    // 略称カナ
    abbrFurigana: string;
    // 郵便番号
    postalCode: string;
    // 地区コード
    districtCode: string;
    // 住所１
    address1: string;
    // 住所２
    address2: string;
    // TEL
    tel: string;
    // FAX
    fax: string;
    // 担当部署
    deptName: string;
    // 得意先担当者
    salerName: string;
    // 納入可能車両サイズ
    availableVehicleSize: number;
    // 時間指定有無
    specifyTimeStr: string;
    specifyTime: number;
    specifyTimeHour: number;
    specifyTimeMinute: number;
    specifyTimePeriod: number;
    // 付帯作業
    extraWork: string;
    // 専用伝票有無
    extraMethod: string;
    // 備考
    memo: string;
    // option  name
    name: string;

    get sdm_id(): number {
        return this.id;
    }

    set sdm_id(value: number) {
        this.id = value;
    }

    get sdm_ext(): string {
        return this.ext;
    }

    set sdm_ext(value: string) {
        this.ext = value;
    }

    get sdm_deliveryName(): string {
        return this.deliveryName;
    }

    set sdm_deliveryName(value: string) {
        this.deliveryName = value;
    }

    get sdm_abbreviation(): string {
        return this.abbreviation;
    }

    set sdm_abbreviation(value: string) {
        this.abbreviation = value;
    }

    get sdm_furigana(): string {
        return this.furigana;
    }

    set sdm_furigana(value: string) {
        this.furigana = value;
    }

    get sdm_abbrFurigana(): string {
        return this.abbrFurigana;
    }

    set sdm_abbrFurigana(value: string) {
        this.abbrFurigana = value;
    }

    get sdm_postalCode(): string {
        return this.postalCode;
    }

    set sdm_postalCode(value: string) {
        this.postalCode = value;
    }

    get sdm_districtCode(): string {
        return this.districtCode;
    }

    set sdm_districtCode(value: string) {
        this.districtCode = value;
    }

    get sdm_address1(): string {
        return this.address1;
    }

    set sdm_address1(value: string) {
        this.address1 = value;
    }

    get sdm_address2(): string {
        return this.address2;
    }

    set sdm_address2(value: string) {
        this.address2 = value;
    }

    get sdm_tel(): string {
        return this.tel;
    }

    set sdm_tel(value: string) {
        this.tel = value;
    }

    get sdm_fax(): string {
        return this.fax;
    }

    set sdm_fax(value: string) {
        this.fax = value;
    }

    get sdm_specifyTime(): string {
        return this.specifyTimeStr;
    }

    set sdm_specifyTime(value: string) {
        this.specifyTimeStr = value;
    }

    get sdm_deptName(): string {
        return this.deptName;
    }

    set sdm_deptName(value: string) {
        this.deptName = value;
    }

    get sdm_salerName(): string {
        return this.salerName;
    }

    set sdm_salerName(value: string) {
        this.salerName = value;
    }

    get sdm_availableVehicleSize(): number {
        return this.availableVehicleSize;
    }

    set sdm_availableVehicleSize(value: number) {
        this.availableVehicleSize = value;
    }

    get sdm_extraWork(): string {
        return this.extraWork;
    }

    set sdm_extraWork(value: string) {
        this.extraWork = value;
    }

    get sdm_extraMethod(): string {
        return this.extraMethod;
    }

    set sdm_extraMethod(value: string) {
        this.extraMethod = value;
    }

    get sdm_memo(): string {
        return this.memo;
    }

    set sdm_memo(value: string) {
        this.memo = value;
    }

    get stm_pattern(): number {
        return this.specifyTime;
    }

    set stm_pattern(value: number) {
        this.specifyTime = value;
    }

    get stm_hour(): number {
        return this.specifyTimeHour;
    }

    set stm_hour(value: number) {
        this.specifyTimeHour = value;
    }

    get stm_minute(): number {
        return this.specifyTimeMinute;
    }

    set stm_minute(value: number) {
        this.specifyTimeMinute = value;
    }

    get stm_period(): number {
        return this.specifyTimePeriod;
    }

    set stm_period(value: number) {
        this.specifyTimePeriod = value;
    }

    get sdm_name(): string {
        return this.name;
    }

    set sdm_name(value: string) {
        this.name = value;
    }
}
