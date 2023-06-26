import {Constants} from "../../../../helper/constants";
import {SF00205Filter} from "./SF00205_Filter.model";
/**
 * Created by manhnv on 6/20/2017.
 */

export class SF00205Request {
    indexFrom: number = Constants.ZERO;
    indexTo: number = Constants.PAGE_SIZE;

    filter: SF00205Filter = new SF00205Filter();
}