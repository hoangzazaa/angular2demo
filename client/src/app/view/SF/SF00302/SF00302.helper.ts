import {SF00302Data} from "./SF00302.data";
/**
 * Created by VuPT on 5/9/2017.
 */
export interface SF00302Helper{
    sf00302Data: SF00302Data;
    getSF00302Data(): SF00302Data;
    validateForm();
    checkChangeDataProduct();
    checkChangeDataProductOutput();
    checkChangeDataOffer();
}