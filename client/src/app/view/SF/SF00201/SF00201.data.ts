import {SF00201_Template} from "./model/SF00201_Template.model";
import {Constants} from "../../../helper/constants";

export class SF00201Data {
    totalRecords: number = Constants.ZERO;
    pageSize: number = Constants.PAGE_SIZE;
    templates: SF00201_Template[] = [];
}
