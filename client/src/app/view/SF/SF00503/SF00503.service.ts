import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import "rxjs/add/operator/toPromise";
import {CommonService} from "../../../service/common.service";
import {CustomerGoal} from "../../../model/core/CustomerGoal.model";
import {SF0050305Res} from "../../../response/SF0050305.res";
import {SF0050305Req} from "../../../request/SF0050305.req";
import {SF0050301Res} from "../../../response/SF0050301.res";
import {SF0050302Res} from "../../../response/SF0050302.res";
import {SF0050303Res} from "../../../response/SF0050303.res";
import {SF0050303Req} from "../../../request/SF0050303.req";
import {SF0050302Req} from "../../../request/SF0050302.req";
import {SF0050301Req} from "../../../request/SF0050301.req";
import {SF0050304Res} from "../../../response/SF0050304.res";
import {SaleData} from "../../../model/SaleData.model";
import {Department} from "../../../model/core/Department.model";
import {DepartmentGoal} from "../../../model/core/DepartmentGoal.model";
import {CustomCustomerGoal} from "../../../model/CustomCustomerGoal.model";

/**
 * SF00303 quotation call service api
 * Created by hoangtd on 26/10/2016.
 */

@Injectable()
export class SF00503Service extends CommonService {

    constructor(http: Http, router: Router) {
        super(http, router);
    }

    /** get department call api: SF0050300/GET */
    getDepartment(): Promise<SF0050301Res> {
        return this.getApi("/SF0050300").then(res => {
            let data = res.data;

            let sf0050301Res = new SF0050301Res();

            data["departments"].forEach(item => {
                let department = new Department();
                department.setDepartment(item);

                sf0050301Res.departments.push(department);
            });

            return sf0050301Res;
        }).catch(err => {
            throw err;
        });
    }

    /** init tab 1 call api: SF0050301/POST : Promise<SF0050302Res> */
    getInitTab1(departmentId: number): Promise<SF0050302Res> {
        let sf0050301 = new SF0050301Req();
        sf0050301.departmentId = departmentId;

        return this.postApi("/SF0050301", sf0050301).then(res => {
            let data = res.data;
            let sf0050302Res = new SF0050302Res();

            data["departmentGoal"].forEach(item => {
                let departmentGoal = new DepartmentGoal();
                departmentGoal.setDepartmentGoal(item);

                sf0050302Res.departmentGoals.push(departmentGoal);
            });

            data["saleData"].forEach(item => {
                let saleData = new SaleData();
                saleData.setSaleData(item);

                sf0050302Res.saleData.push(saleData);
            });

            return sf0050302Res;
        }).catch(err => {
            throw  err;
        });

    }

    /** save call api: SF0050302/POST */
    saveDepartmentGoal(departmentGoal: DepartmentGoal): Promise<SF0050303Res> {
        let sf0050302Req = new SF0050302Req();
        sf0050302Req.departmentGoal = departmentGoal;
        return this.postApi("/SF0050302", sf0050302Req).then(res => {
            let sf0050303Res = new SF0050303Res();

            sf0050303Res.departmentGoal.setDepartmentGoal(res.data["departmentGoal"]);

            return sf0050303Res;
        }).catch(err => {
            throw  err;
        });
    }

    /** save customer goal call api: SF0050303/POST */
    saveCustomerGoal(customerGoal: CustomerGoal): Promise<SF0050304Res> {
        let sf0050303Req = new SF0050303Req();
        sf0050303Req.customerGoal = customerGoal;
        return this.postApi("/SF0050303", sf0050303Req).then(res => {
            let sf0050304Res = new SF0050304Res();

            sf0050304Res.customerGoal.setCustomerGoal(res.data["customerGoal"]);

            return sf0050304Res;
        }).catch(err => {
            throw  err;
        });
    }

    /** delete customer goal id call api: SF0050304/POST */
    deleteCustomerGoal(goalId: number): Promise<any> {
        return this.postApi("/SF0050304", {
            "goalId": goalId
        }).then(res => {
            return res.data;
        }).catch(err => {
            throw  err;
        });
    }

    /** init tab 2 call api: SF0050305/POST */
    getInitTab2(departmentId: number, year: number): Promise<SF0050305Res> {
        let sf0050305Req = new SF0050305Req();

        sf0050305Req.departmentId = departmentId;
        sf0050305Req.year = year;

        return this.postApi("/SF0050305", sf0050305Req).then(res => {
            let data: SF0050305ResJson = res.data as SF0050305ResJson;
            let sf0050305Res = new SF0050305Res();

            data["customerGoals"].forEach(item => {
                let customerGoal = new CustomCustomerGoal();
                customerGoal.setCustomCustomerGoal(item);

                // !customerGoal.customerId <= 新規得意先(新規得意先の場合は具体的な数値がない)
                // customerGoal.customerDataItems <= 具体的な数値がある場合
                if (!customerGoal.customerId || customerGoal.customerDataItems) {
                    sf0050305Res.customerGoals.push(customerGoal);
                }
            });

            return sf0050305Res;
        }).catch(err => {
            throw  err;
        });
    }

    /** get department call api: SF0050300/GET */
    getTime(): Promise<number[]> {
        return this.postApi("/SF0050306", "Get date").then(res => {
            let data = res.data;
            let years = [];

            data["financeYear"].forEach(item => {
                years.push(item);
            });

            return years;
        }).catch(err => {
            throw err;
        });
    }

}



/**
 * /SF0050305 の応答電文
 * 
 * <pre>
 * Java controller: vn.vnext.sefuri.sf.controller.impl.SF00503CtrlImpl.sf0050305Init02()
 * Java Response model: vn.vnext.sefuri.sf.json.response.SF0050305Res
 * </pre>
 */
interface SF0050305ResJson {
    customerGoals: CustomCustomerGoalJson[];
}

/**
 * 
 * <pre>
 * Java: vn.vnext.sefuri.sf.json.core.CustomCustomerGoalJson
 * </pre>
 */
interface CustomCustomerGoalJson extends CustomerGoalJson {
    customerDataItems: CustomerDataItemJson[];

    goalType: number | null;

}

/**
 * 
 * <pre>
 * Java: vn.vnext.sefuri.sf.json.core.CustomerGoalJson
 * </pre>
 */
interface CustomerGoalJson extends BaseJson {
    year: number | null;
    activityPolicy: string | null;
    customerId: number | null;
    picId: number | null;
    departmentId: number | null;
    customer: any | null; // CustomerJson | null;
    goalItems: any[]; // CustomerGoalItemJson[];
    user: any | null; // UserJson | null;
    department: any | null; // DepartmentJson | null;
}


/**
 * 
 * <pre>
 * Java: vn.vnext.sefuri.sf.json.core.BaseJson
 * </pre>
 */
interface BaseJson {
    id: number | null;
    createdUser: number | null;
    updatedUser: number | null;
    createdDate: string | null;
    updatedDate: string | null;
}

/** 
 * 
 * <pre>
 * Java: vn.vnext.sefuri.sf.json.core.CustomerDataItemJson
 * </pre>
 */
interface CustomerDataItemJson {
    month: number | null;
    productType: number | null;
    totalMoney: number | null;
    numberOfOrder: number | null;
}
