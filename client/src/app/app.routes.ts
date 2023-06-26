import {RouterModule, Routes} from "@angular/router";
import {AdminGuard} from "./guard/admin.guard";
import {UserGuard} from "./guard/user.guard";
import {DealResolver} from "./resolver/deal.resolver";
import {SF003Service} from "./service/SF003.service";
import {CC00000Page} from "./view/CC/CC00000/CC00000.page";
import {CC00100Page} from "./view/CC/CC00100/CC00100.page";
import {CC00100Resolver} from "./view/CC/CC00100/CC00100.resolver";
import {CC00201Page} from "./view/CC/CC00201/CC00201.page";
import {CC00202Page} from "./view/CC/CC00202/CC00202.page";
import {CC00300Page} from "./view/CC/CC00300/CC00300.page";
import {Error400Page} from "./view/ERROR/400/error-400.page";
import {Error401Page} from "./view/ERROR/401/error-401.page";
import {Error403Page} from "./view/ERROR/403/error-403.page";
import {Error404Page} from "./view/ERROR/404/error-404.page";
import {Error500Page} from "./view/ERROR/500/error-500.page";
import {HeaderProvider} from "./view/SF/SF00100/Header.provider";
import {SF00100Page} from "./view/SF/SF00100/SF00100.page";
import {SF00101Page} from "./view/SF/SF00101/SF00101.page";
import {SF00200Page} from "./view/SF/SF00200/SF00200.page";
import {SF00201Resolver} from "./view/SF/SF00201/SF00201.resolver";
import {SF00201Service} from "./view/SF/SF00201/SF00201.service";
import {SF00202Page} from "./view/SF/SF00202/SF00202.page";
import {SF00202Resolver} from "./view/SF/SF00202/SF00202.resolver";
import {SF00202Service} from "./view/SF/SF00202/SF00202.service";
import {SF00203Page} from "./view/SF/SF00203/SF00203.page";
import {SF00203Resolver} from "./view/SF/SF00203/SF00203.resolver";
import {SF00203Service} from "./view/SF/SF00203/SF00203.service";
import {SF00204Page} from "./view/SF/SF00204/SF00204.page";
import {SF00204Resolver} from "./view/SF/SF00204/SF00204.resolver";
import {SF00204Service} from "./view/SF/SF00204/SF00204.service";
import {SF00205Page} from "./view/SF/SF00205/SF00205.page";
import {SF00205Resolver} from "./view/SF/SF00205/SF00205.resolver";
import {SF00205Service} from "./view/SF/SF00205/SF00205.service";
import {SF00301Page} from "./view/SF/SF00301/SF00301.page";
import {SF00301Service} from "./view/SF/SF00301/SF00301.service";
import {SF0030101OpenResolver} from "./view/SF/SF00301/SF0030101Open.resolver";
import {SF0030102CreateResolver} from "./view/SF/SF00301/SF0030102Create.resolver";
import {SF003020101Page} from "./view/SF/SF00302/component/SF0030201/SF003020101/SF003020101.page";
import {SF003020102Page} from "./view/SF/SF00302/component/SF0030201/SF003020102/SF003020102.page";
import {SF003020201Page} from "./view/SF/SF00302/component/SF0030202/SF003020201/SF003020201.page";
import {SF00302Resolver} from "./view/SF/SF00302/SF00302.resolver";
import {SF00302Service} from "./view/SF/SF00302/SF00302.service";
import {SF00303Page} from "./view/SF/SF00303/SF00303.page";
import {SF00303Resolver} from "./view/SF/SF00303/SF00303.resolver";
import {SF00303Service} from "./view/SF/SF00303/SF00303.service";
import {SF00304Page} from "./view/SF/SF00304/SF00304.page";
import {QuotationPrintTemplateResolver} from "./view/SF/SF00304/SF00304.resolver";
import {SF00304Service} from "./view/SF/SF00304/SF00304.service";
import {SF00305Page} from "./view/SF/SF00305/SF00305.page";
import {SF00305Resolver} from "./view/SF/SF00305/SF00305.resolver";
import {SF00305Service} from "./view/SF/SF00305/SF00305.service";
import {SF00306Page} from "./view/SF/SF00306/SF00306.page";
import {SF00306Resolver} from "./view/SF/SF00306/SF00306.resolver";
import {SF00306Service} from "./view/SF/SF00306/SF00306.service";
import {SF00307Resolver} from "./view/SF/SF00307/SF00307.resolver";
import {SF00307Service} from "./view/SF/SF00307/SF00307.service";
import {SF00308Page} from "./view/SF/SF00308/SF00308.page";
import {SF00308Resolver} from "./view/SF/SF00308/SF00308.resolver";
import {SF00308Service} from "./view/SF/SF00308/SF00308.service";
import {SF00309Page} from "./view/SF/SF00309/SF00309.page";
import {SF00309Resolve} from "./view/SF/SF00309/SF00309.resolve";
import {SF00309Service} from "./view/SF/SF00309/SF00309.service";
import {SF00310Page} from "./view/SF/SF00310/SF00310.page";
import {SF00310Resolve} from "./view/SF/SF00310/SF00310.resolve";
import {SF00310Service} from "./view/SF/SF00310/SF00310.service";
import {SF00407Page} from "./view/SF/SF00407/SF00407.page";
import {SF00503Page} from "./view/SF/SF00503/SF00503.page";
import {SF00503Service} from "./view/SF/SF00503/SF00503.service";
import {SF0050301Resolver} from "./view/SF/SF00503/SF0050301.resolver";
import {SF0050302Resolver} from "./view/SF/SF00503/SF0050302.resolver";
import {SF0050303Resolver} from "./view/SF/SF00503/SF0050303.resolver";
import {SF0050304Resolver} from "./view/SF/SF00503/SF0050304.resolver";
import {SF00504Page} from "./view/SF/SF00504/SF00504.page";
import {SF00505Page} from "./view/SF/SF00505/SF00505.page";
import {SF00600Page} from "./view/SF/SF00600/SF00600.page";
import {SF00800Page} from "./view/SF/SF00800/SF00800.page";
import {SF0010101Resolve} from "./view/SF/SF00101/SF0010101.resolve";
import {SF00101Service} from "./view/SF/SF00101/SF00101.service";
import {FileViewerService} from "./component/file-viewer/file-viewer.service";
import {SF003020103Page} from "./view/SF/SF00302/component/SF0030201/SF003020103/SF003020103.page";
import {SF003020202Page} from "./view/SF/SF00302/component/SF0030202/SF003020202/SF003020202.page";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: SF00100Page,
        canActivate: [UserGuard],
        children: [
            {
                path: '',
                component: SF00101Page,
                resolve: {initDepartment: SF0010101Resolve}
            },
            {
                path: 'deal',
                component: SF00200Page,
                children: [
                    {
                        path: '',
                        redirectTo: 'select-from-template',
                        pathMatch: 'full'
                    },
                    {
                        path: 'select-from-template',
                        resolve: {initData: SF00202Resolver},
                        component: SF00202Page
                        //TODO: disabled tab 1
                        // resolve: {initData: SF00201Resolver},
                        // component: SF00201Page
                    },
                    {
                        path: 'select-from-deal',
                        resolve: {initData: SF00202Resolver},
                        component: SF00202Page
                    },
                    {
                        path: 'select-from-mybox',
                        resolve: {initData: SF00203Resolver},
                        component: SF00203Page
                    }
                ]
            },
            {
                path: 'deal/create',
                component: SF00301Page,
                resolve: {sf0030102Data: SF0030102CreateResolver}
            },
            {
                path: 'deal/:dealCode',
                children: [
                    {
                        // TOP > 案件概況
                        path: '',
                        resolve: {sf0030101Data: SF0030101OpenResolver},
                        component: SF00301Page,
                    },
                    {
                        path: 'product/:productCode',
                        resolve: {deal: DealResolver, sf00302Data: SF00302Resolver},
                        children: [
                            {
                                // TOP > 案件概況 > 製品情報(紙器・貼合)
                                path: '',
                                component: SF003020101Page
                            },
                            {
                                // TOP > 案件概況 > 製品情報(美粧)
                                path: 'decorative',
                                component: SF003020102Page
                            },
                            {
                                // TOP > 案件概況 > 製品情報(段ボール)
                                path: 'carton',
                                component: SF003020201Page
                            },
                            {
                                // TOP > 案件概況 > 製品情報(A式以外段ボール)
                                path: 'carton-not-a',
                                component: SF003020202Page
                            },
                            {
                                path: 'calc-imposition',
                                component: SF00800Page
                            },
                            {
                                // TOP > 案件概況 > 製品情報(片段)
                                path: 'one-stage',
                                component: SF003020103Page
                            }
                        ]
                    },
                    {
                        // TOP > 案件概況 > 見積情報 (編集)
                        path: 'quotation/:quotationCode',
                        component: SF00303Page,
                        resolve: {sf00303Data: SF00303Resolver},
                    }
                    ,
                    {
                        // TOP > 案件概況 > 見積情報 (作成)
                        path: 'quotation',
                        component: SF00303Page,
                        resolve: {sf00303Data: SF00303Resolver},
                    },
                    {
                        path: 'exportQuotation/:quotationCode/:option',
                        component: SF00304Page,
                        resolve: {quotationTemplates: QuotationPrintTemplateResolver},
                    },
                    {
                        path: 'mailQuotation/:quotationCode',
                        component: SF00305Page,
                        resolve: {initData: SF00305Resolver},
                    },
                    {
                        path: 'dealCheckSheet',
                        component: SF00308Page,
                        resolve: {initData: SF00308Resolver},
                    },
                    {
                        path: 'request-design',
                        component: SF00306Page,
                        resolve: {initData: SF00306Resolver}
                    },
                    {
                        path: 'order',
                        loadChildren: './view/SF/SFN0307/SFN0307.module#SFN0307Module'
                    },
                    {
                        path: 'repeat-order',
                        loadChildren: './view/SF/SFN0307/SFN0307.module#SFN0307Module'
                    },
                    {
                        path: 'request/:requestType',
                        component: SF00309Page,
                        resolve: {initData: SF00309Resolve}
                    },
                    {
                        path: 'request-create-design',
                        component: SF00310Page,
                        resolve: {initData: SF00310Resolve}
                    },
                    {
                        path: 'search-product',
                        component: SF00204Page,
                        resolve: {initData: SF00204Resolver}
                    }
                ]
            },
            {
                path: 'partners',
                loadChildren: './view/SF/SFN0401/SFN0401.module#SFN0401Module'
            },
            {
                // TOP > 取引先検索 > 取引先照会
                path: 'customer/:customerCode',
                loadChildren: './view/SF/SFN0402/SFN0402.module#SFN0402Module'
            },
            {
                path: 'supplier/:supplierCode',
                loadChildren: './view/SF/SFN0402/SFN0402.module#SFN0402Module'
            },
            {
                path: 'view-shipping-status',
                component: SF00407Page
            },
            {
                path: 'view-sales-performance',
                loadChildren: './view/SF/SF00501/SF00501.module#SF00501Module'
            },
            {
                path: 'increase-decrease-customers',
                loadChildren: './view/SF/SF00502/SF00502.module#SF00502Module'
            },
            {
                path: 'stock-statistics',
                loadChildren: './view/SF/SFN0504/SFN0504.module#SFN0504Module'
            },
            {
                path: 'shipping-statistics',
                loadChildren: './view/SF/SFN0505/SFN0505.module#SFN0505Module'
            },
            {
                path: 'payment-statistics',
                loadChildren: './view/SF/SFN0506/SFN0506.module#SFN0506Module'
            },
            {
                // TOP > 営業目標登録
                path: 'set-sales-goal',
                component: SF00503Page,
                resolve: {
                    departmentData: SF0050302Resolver, dataTab1: SF0050301Resolver,
                    dataTab2: SF0050303Resolver, timeData: SF0050304Resolver
                },
            },
            {
                path: 'view-stock-status',
                component: SF00504Page
            },
            {
                path: 'add-prospect-deal',
                component: SF00505Page
            },
            {
                path: 'mybox',

                component: SF00600Page
            },
            {
                path: 'calc-imposition',
                component: SF00800Page
            },
            {
                path: 'change-password',
                component: CC00300Page
            },
            {
                path: 'search-deal',
                component: SF00205Page,
                resolve: {initDepartment: SF00205Resolver}
            }
        ]
    },
    {
        path: 'login',
        resolve: {authorization: CC00100Resolver},
        component: CC00100Page
    },
    {
        path: "error",
        children: [
            {path: "", redirectTo: "404", pathMatch: "full"},
            {path: "404", component: Error404Page},
            {path: "400", component: Error400Page},
            {path: "401", component: Error401Page},
            {path: "403", component: Error403Page},
            {path: "500", component: Error500Page}
        ]
    },
    {
        path: 'recover-password',
        component: CC00201Page
    },
    {
        path: 'reset-password/:tokenKey',
        component: CC00202Page
    },
    {
        path: "blank",
        component: CC00000Page
    }
];

export const providers: any[] = [
    UserGuard, AdminGuard,
    // resolver
    DealResolver, SF00201Resolver, SF00202Resolver, SF00302Resolver, SF00303Resolver, QuotationPrintTemplateResolver,
    SF0030101OpenResolver, SF0030102CreateResolver, SF00308Resolver,
    SF0050302Resolver, SF0050301Resolver, SF0050303Resolver, SF0050304Resolver, SF00305Resolver, SF00306Resolver,
    SF00307Resolver, SF00204Resolver, SF00203Resolver, SF00309Resolve, SF00310Resolve, SF0010101Resolve, SF00205Resolver,
    // service
    SF00201Service, SF00202Service, SF00203Service, SF00305Service, SF00308Service, SF00306Service,
    SF003Service, SF00302Service, SF00301Service, SF00303Service, SF00304Service, SF00307Service, SF00503Service,
    SF00204Service, SF00309Service, SF00310Service, SF00101Service, SF00205Service,
    //
    HeaderProvider, FileViewerService
];

export const routing = RouterModule.forRoot(routes);
