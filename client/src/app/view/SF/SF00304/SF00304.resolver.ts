import {Injectable} from "@angular/core";
import {Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {QuotationPrintTemplate} from "../../../model/core/QuotationPrintTemplate.model";
import {SF00304Service} from "./SF00304.service";
/**
 * Created by VuPT on 11/14/2016.
 */
@Injectable()
export class QuotationPrintTemplateResolver implements Resolve<QuotationPrintTemplate> {
    constructor(private sf00304Service: SF00304Service, private router: Router) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.sf00304Service.getAllQuotationTemplates().then(data => {
            return data;
        });
    }
}