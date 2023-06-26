import {Component, OnInit} from "@angular/core";
import {HeaderProvider} from "../SF00100/Header.provider";
import {Router, ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {DealProduct} from "../../../model/core/DealProduct.model";
import {CommonPage} from "../COMMON/common.page";

declare let App: any;
declare let SF008Api: any;
const SF008_PAGE_TITLE: string = "面付シミュレーション";

@Component({
    templateUrl: "SF00800.page.html"
})
export class SF00800Page extends CommonPage implements OnInit {

    constructor(router: Router, route: ActivatedRoute, headerProvider: HeaderProvider, private location: Location) {
        super(router, route, headerProvider);
    }

    productId: number = 0;
    productCode: string;
    dealCode: string;
    dealProduct: DealProduct = new DealProduct();

    isView = true;

    protected pageTile(): string {
        return SF008_PAGE_TITLE;
    }

    ngOnInit(): void {
        // check param productCode
        // if productCode undefined -> productCode  = 0

        let data = this.route.parent.snapshot.data['sf00302Data'];
        if (data) {
            this.dealProduct = data.dealProduct;
            this.productCode = this.dealProduct.product.productCode;
            this.dealCode = this.route.params["value"].dealCode;
            this.productId = this.dealProduct.product.id;

            this.isView = false;
        }
        SF008Api.init(this.productId);
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();

        // destroy SF008
        SF008Api.destroy();
    }

    get checkProduct() {
        return this.isView;
    }

    goBack() {
        if (this.productCode) {
            this.router.navigateByUrl('/blank').then(() => {
                this.router.navigate(['/home/deal/', this.dealCode ? this.dealCode : 0, "product", this.productCode], {replaceUrl: true});
            })
        } else {
            this.location.back();
        }
    }

    setDataProduct() {
        if (this.productCode) {
            this.router.navigateByUrl('/blank').then(() => {
                this.router.navigate(['/home/deal/', this.dealCode ? this.dealCode : 0, "product", this.productCode], {replaceUrl: true});
            });
        }
    }


}
