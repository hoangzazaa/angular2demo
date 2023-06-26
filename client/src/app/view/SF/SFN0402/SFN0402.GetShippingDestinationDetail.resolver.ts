import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {CommonResolver} from "../../../resolver/common-resolver";
import { ShippingDestination } from "../../../model/core/ShippingDestination.model";
import { SFN0402Service } from "./SFN0402.service";

declare let App: any;

/**
 * 届け先の解決
 *
 * 使用する API は GET /SFN040214/:customerCode/:shippingDestinationId
 */
@Injectable()
export class SFN0402GetShippingDestinationDetailResolver extends CommonResolver implements Resolve<ShippingDestination> {
    /**
     * コンストラクタ
     *
     * @param router ルーター
     * @param service 得意先・取引先関連機能に関するサービス
     */
    constructor(router: Router, private service: SFN0402Service) {
        super(router);
    }

    /**
     * 得意先一覧を解決
     *
     * @param route 現在のルート
     * @param state 状態
     * @returns 届け先を返すプロミス
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ShippingDestination> {
        let customerCode = route.params['customerCode'];
        let shippingDestinationId = route.params['shippingDestinationId'];
        return this.service.sfn040214GetShippingDestinationDetail(customerCode, shippingDestinationId);
    }
}
