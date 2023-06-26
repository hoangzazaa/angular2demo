import {Constants} from "../../../helper/constants";
import {SF00203_Deal} from "./model/SF00203_Deal.model";

export class SF00203Data {
    CONSTANTS = {
        PAGE_SIZE: Constants.PAGE_SIZE
    };
    deals: SF00203_Deal[] = [];
    totalRecords: number = Constants.ZERO;

}
