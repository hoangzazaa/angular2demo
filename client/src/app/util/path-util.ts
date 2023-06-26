import {Router} from "@angular/router";
/**
 * Created by hoangtd on 9/12/2017.
 */
export class PathUtil {

    static redirectToPageProduct(router: Router, dealCode: string, productCode: string, productType: number, shapeId: number,cartonShippingType: number) {
        if (productType == 0 && shapeId == 98) {
            router.navigate(["/home/deal", dealCode, 'product', productCode, 'decorative']);
        } else if (productType == 0 && shapeId == 100) {
            router.navigate(["/home/deal", dealCode, 'product', productCode, 'one-stage']);
        } else if (productType == 1 && cartonShippingType==1) {
            router.navigate(["/home/deal", dealCode, 'product', productCode, 'carton-not-a']);
        } else if (productType == 1) {
            router.navigate(["/home/deal", dealCode, 'product', productCode, 'carton']);
        } else {
            router.navigate(["/home/deal", dealCode, 'product', productCode]);
        }
    }
}