"use strict";
var router_1 = require("@angular/router");
var admin_guard_1 = require("./guard/admin.guard");
var user_guard_1 = require("./guard/user.guard");
var deal_resolver_1 = require("./resolver/deal.resolver");
var SF003_service_1 = require("./service/SF003.service");
var CC00000_page_1 = require("./view/CC/CC00000/CC00000.page");
var CC00100_page_1 = require("./view/CC/CC00100/CC00100.page");
var CC00100_resolver_1 = require("./view/CC/CC00100/CC00100.resolver");
var CC00201_page_1 = require("./view/CC/CC00201/CC00201.page");
var CC00202_page_1 = require("./view/CC/CC00202/CC00202.page");
var CC00300_page_1 = require("./view/CC/CC00300/CC00300.page");
var error_400_page_1 = require("./view/ERROR/400/error-400.page");
var error_401_page_1 = require("./view/ERROR/401/error-401.page");
var error_403_page_1 = require("./view/ERROR/403/error-403.page");
var error_404_page_1 = require("./view/ERROR/404/error-404.page");
var error_500_page_1 = require("./view/ERROR/500/error-500.page");
var Header_provider_1 = require("./view/SF/SF00100/Header.provider");
var SF00100_page_1 = require("./view/SF/SF00100/SF00100.page");
var SF00101_page_1 = require("./view/SF/SF00101/SF00101.page");
var SF00200_page_1 = require("./view/SF/SF00200/SF00200.page");
var SF00201_resolver_1 = require("./view/SF/SF00201/SF00201.resolver");
var SF00201_service_1 = require("./view/SF/SF00201/SF00201.service");
var SF00202_page_1 = require("./view/SF/SF00202/SF00202.page");
var SF00202_resolver_1 = require("./view/SF/SF00202/SF00202.resolver");
var SF00202_service_1 = require("./view/SF/SF00202/SF00202.service");
var SF00203_page_1 = require("./view/SF/SF00203/SF00203.page");
var SF00203_resolver_1 = require("./view/SF/SF00203/SF00203.resolver");
var SF00203_service_1 = require("./view/SF/SF00203/SF00203.service");
var SF00204_page_1 = require("./view/SF/SF00204/SF00204.page");
var SF00204_resolver_1 = require("./view/SF/SF00204/SF00204.resolver");
var SF00204_service_1 = require("./view/SF/SF00204/SF00204.service");
var SF00205_page_1 = require("./view/SF/SF00205/SF00205.page");
var SF00205_resolver_1 = require("./view/SF/SF00205/SF00205.resolver");
var SF00205_service_1 = require("./view/SF/SF00205/SF00205.service");
var SF00301_page_1 = require("./view/SF/SF00301/SF00301.page");
var SF00301_service_1 = require("./view/SF/SF00301/SF00301.service");
var SF0030101Open_resolver_1 = require("./view/SF/SF00301/SF0030101Open.resolver");
var SF0030102Create_resolver_1 = require("./view/SF/SF00301/SF0030102Create.resolver");
var SF003020101_page_1 = require("./view/SF/SF00302/component/SF0030201/SF003020101/SF003020101.page");
var SF003020102_page_1 = require("./view/SF/SF00302/component/SF0030201/SF003020102/SF003020102.page");
var SF003020201_page_1 = require("./view/SF/SF00302/component/SF0030202/SF003020201/SF003020201.page");
var SF00302_resolver_1 = require("./view/SF/SF00302/SF00302.resolver");
var SF00302_service_1 = require("./view/SF/SF00302/SF00302.service");
var SF00303_page_1 = require("./view/SF/SF00303/SF00303.page");
var SF00303_resolver_1 = require("./view/SF/SF00303/SF00303.resolver");
var SF00303_service_1 = require("./view/SF/SF00303/SF00303.service");
var SF00304_page_1 = require("./view/SF/SF00304/SF00304.page");
var SF00304_resolver_1 = require("./view/SF/SF00304/SF00304.resolver");
var SF00304_service_1 = require("./view/SF/SF00304/SF00304.service");
var SF00305_page_1 = require("./view/SF/SF00305/SF00305.page");
var SF00305_resolver_1 = require("./view/SF/SF00305/SF00305.resolver");
var SF00305_service_1 = require("./view/SF/SF00305/SF00305.service");
var SF00306_page_1 = require("./view/SF/SF00306/SF00306.page");
var SF00306_resolver_1 = require("./view/SF/SF00306/SF00306.resolver");
var SF00306_service_1 = require("./view/SF/SF00306/SF00306.service");
var SF00307_resolver_1 = require("./view/SF/SF00307/SF00307.resolver");
var SF00307_service_1 = require("./view/SF/SF00307/SF00307.service");
var SF00308_page_1 = require("./view/SF/SF00308/SF00308.page");
var SF00308_resolver_1 = require("./view/SF/SF00308/SF00308.resolver");
var SF00308_service_1 = require("./view/SF/SF00308/SF00308.service");
var SF00309_page_1 = require("./view/SF/SF00309/SF00309.page");
var SF00309_resolve_1 = require("./view/SF/SF00309/SF00309.resolve");
var SF00309_service_1 = require("./view/SF/SF00309/SF00309.service");
var SF00310_page_1 = require("./view/SF/SF00310/SF00310.page");
var SF00310_resolve_1 = require("./view/SF/SF00310/SF00310.resolve");
var SF00310_service_1 = require("./view/SF/SF00310/SF00310.service");
var SF00407_page_1 = require("./view/SF/SF00407/SF00407.page");
var SF00503_page_1 = require("./view/SF/SF00503/SF00503.page");
var SF00503_service_1 = require("./view/SF/SF00503/SF00503.service");
var SF0050301_resolver_1 = require("./view/SF/SF00503/SF0050301.resolver");
var SF0050302_resolver_1 = require("./view/SF/SF00503/SF0050302.resolver");
var SF0050303_resolver_1 = require("./view/SF/SF00503/SF0050303.resolver");
var SF0050304_resolver_1 = require("./view/SF/SF00503/SF0050304.resolver");
var SF00504_page_1 = require("./view/SF/SF00504/SF00504.page");
var SF00505_page_1 = require("./view/SF/SF00505/SF00505.page");
var SF00600_page_1 = require("./view/SF/SF00600/SF00600.page");
var SF00800_page_1 = require("./view/SF/SF00800/SF00800.page");
var SF0010101_resolve_1 = require("./view/SF/SF00101/SF0010101.resolve");
var SF00101_service_1 = require("./view/SF/SF00101/SF00101.service");
var file_viewer_service_1 = require("./component/file-viewer/file-viewer.service");
var SF003020103_page_1 = require("./view/SF/SF00302/component/SF0030201/SF003020103/SF003020103.page");
var SF003020202_page_1 = require("./view/SF/SF00302/component/SF0030202/SF003020202/SF003020202.page");
var routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: SF00100_page_1.SF00100Page,
        canActivate: [user_guard_1.UserGuard],
        children: [
            {
                path: '',
                component: SF00101_page_1.SF00101Page,
                resolve: { initDepartment: SF0010101_resolve_1.SF0010101Resolve }
            },
            {
                path: 'deal',
                component: SF00200_page_1.SF00200Page,
                children: [
                    {
                        path: '',
                        redirectTo: 'select-from-template',
                        pathMatch: 'full'
                    },
                    {
                        path: 'select-from-template',
                        resolve: { initData: SF00202_resolver_1.SF00202Resolver },
                        component: SF00202_page_1.SF00202Page
                    },
                    {
                        path: 'select-from-deal',
                        resolve: { initData: SF00202_resolver_1.SF00202Resolver },
                        component: SF00202_page_1.SF00202Page
                    },
                    {
                        path: 'select-from-mybox',
                        resolve: { initData: SF00203_resolver_1.SF00203Resolver },
                        component: SF00203_page_1.SF00203Page
                    }
                ]
            },
            {
                path: 'deal/create',
                component: SF00301_page_1.SF00301Page,
                resolve: { sf0030102Data: SF0030102Create_resolver_1.SF0030102CreateResolver }
            },
            {
                path: 'deal/:dealCode',
                children: [
                    {
                        // TOP > 案件概況
                        path: '',
                        resolve: { sf0030101Data: SF0030101Open_resolver_1.SF0030101OpenResolver },
                        component: SF00301_page_1.SF00301Page,
                    },
                    {
                        path: 'product/:productCode',
                        resolve: { deal: deal_resolver_1.DealResolver, sf00302Data: SF00302_resolver_1.SF00302Resolver },
                        children: [
                            {
                                // TOP > 案件概況 > 製品情報(紙器・貼合)
                                path: '',
                                component: SF003020101_page_1.SF003020101Page
                            },
                            {
                                // TOP > 案件概況 > 製品情報(美粧)
                                path: 'decorative',
                                component: SF003020102_page_1.SF003020102Page
                            },
                            {
                                // TOP > 案件概況 > 製品情報(段ボール)
                                path: 'carton',
                                component: SF003020201_page_1.SF003020201Page
                            },
                            {
                                // TOP > 案件概況 > 製品情報(A式以外段ボール)
                                path: 'carton-not-a',
                                component: SF003020202_page_1.SF003020202Page
                            },
                            {
                                path: 'calc-imposition',
                                component: SF00800_page_1.SF00800Page
                            },
                            {
                                // TOP > 案件概況 > 製品情報(片段)
                                path: 'one-stage',
                                component: SF003020103_page_1.SF003020103Page
                            }
                        ]
                    },
                    {
                        // TOP > 案件概況 > 見積情報 (編集)
                        path: 'quotation/:quotationCode',
                        component: SF00303_page_1.SF00303Page,
                        resolve: { sf00303Data: SF00303_resolver_1.SF00303Resolver },
                    },
                    {
                        // TOP > 案件概況 > 見積情報 (作成)
                        path: 'quotation',
                        component: SF00303_page_1.SF00303Page,
                        resolve: { sf00303Data: SF00303_resolver_1.SF00303Resolver },
                    },
                    {
                        path: 'exportQuotation/:quotationCode/:option',
                        component: SF00304_page_1.SF00304Page,
                        resolve: { quotationTemplates: SF00304_resolver_1.QuotationPrintTemplateResolver },
                    },
                    {
                        path: 'mailQuotation/:quotationCode',
                        component: SF00305_page_1.SF00305Page,
                        resolve: { initData: SF00305_resolver_1.SF00305Resolver },
                    },
                    {
                        path: 'dealCheckSheet',
                        component: SF00308_page_1.SF00308Page,
                        resolve: { initData: SF00308_resolver_1.SF00308Resolver },
                    },
                    {
                        path: 'request-design',
                        component: SF00306_page_1.SF00306Page,
                        resolve: { initData: SF00306_resolver_1.SF00306Resolver }
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
                        component: SF00309_page_1.SF00309Page,
                        resolve: { initData: SF00309_resolve_1.SF00309Resolve }
                    },
                    {
                        path: 'request-create-design',
                        component: SF00310_page_1.SF00310Page,
                        resolve: { initData: SF00310_resolve_1.SF00310Resolve }
                    },
                    {
                        path: 'search-product',
                        component: SF00204_page_1.SF00204Page,
                        resolve: { initData: SF00204_resolver_1.SF00204Resolver }
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
                component: SF00407_page_1.SF00407Page
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
                component: SF00503_page_1.SF00503Page,
                resolve: {
                    departmentData: SF0050302_resolver_1.SF0050302Resolver, dataTab1: SF0050301_resolver_1.SF0050301Resolver,
                    dataTab2: SF0050303_resolver_1.SF0050303Resolver, timeData: SF0050304_resolver_1.SF0050304Resolver
                },
            },
            {
                path: 'view-stock-status',
                component: SF00504_page_1.SF00504Page
            },
            {
                path: 'add-prospect-deal',
                component: SF00505_page_1.SF00505Page
            },
            {
                path: 'mybox',
                component: SF00600_page_1.SF00600Page
            },
            {
                path: 'calc-imposition',
                component: SF00800_page_1.SF00800Page
            },
            {
                path: 'change-password',
                component: CC00300_page_1.CC00300Page
            },
            {
                path: 'search-deal',
                component: SF00205_page_1.SF00205Page,
                resolve: { initDepartment: SF00205_resolver_1.SF00205Resolver }
            }
        ]
    },
    {
        path: 'login',
        resolve: { authorization: CC00100_resolver_1.CC00100Resolver },
        component: CC00100_page_1.CC00100Page
    },
    {
        path: "error",
        children: [
            { path: "", redirectTo: "404", pathMatch: "full" },
            { path: "404", component: error_404_page_1.Error404Page },
            { path: "400", component: error_400_page_1.Error400Page },
            { path: "401", component: error_401_page_1.Error401Page },
            { path: "403", component: error_403_page_1.Error403Page },
            { path: "500", component: error_500_page_1.Error500Page }
        ]
    },
    {
        path: 'recover-password',
        component: CC00201_page_1.CC00201Page
    },
    {
        path: 'reset-password/:tokenKey',
        component: CC00202_page_1.CC00202Page
    },
    {
        path: "blank",
        component: CC00000_page_1.CC00000Page
    }
];
exports.providers = [
    user_guard_1.UserGuard, admin_guard_1.AdminGuard,
    // resolver
    deal_resolver_1.DealResolver, SF00201_resolver_1.SF00201Resolver, SF00202_resolver_1.SF00202Resolver, SF00302_resolver_1.SF00302Resolver, SF00303_resolver_1.SF00303Resolver, SF00304_resolver_1.QuotationPrintTemplateResolver,
    SF0030101Open_resolver_1.SF0030101OpenResolver, SF0030102Create_resolver_1.SF0030102CreateResolver, SF00308_resolver_1.SF00308Resolver,
    SF0050302_resolver_1.SF0050302Resolver, SF0050301_resolver_1.SF0050301Resolver, SF0050303_resolver_1.SF0050303Resolver, SF0050304_resolver_1.SF0050304Resolver, SF00305_resolver_1.SF00305Resolver, SF00306_resolver_1.SF00306Resolver,
    SF00307_resolver_1.SF00307Resolver, SF00204_resolver_1.SF00204Resolver, SF00203_resolver_1.SF00203Resolver, SF00309_resolve_1.SF00309Resolve, SF00310_resolve_1.SF00310Resolve, SF0010101_resolve_1.SF0010101Resolve, SF00205_resolver_1.SF00205Resolver,
    // service
    SF00201_service_1.SF00201Service, SF00202_service_1.SF00202Service, SF00203_service_1.SF00203Service, SF00305_service_1.SF00305Service, SF00308_service_1.SF00308Service, SF00306_service_1.SF00306Service,
    SF003_service_1.SF003Service, SF00302_service_1.SF00302Service, SF00301_service_1.SF00301Service, SF00303_service_1.SF00303Service, SF00304_service_1.SF00304Service, SF00307_service_1.SF00307Service, SF00503_service_1.SF00503Service,
    SF00204_service_1.SF00204Service, SF00309_service_1.SF00309Service, SF00310_service_1.SF00310Service, SF00101_service_1.SF00101Service, SF00205_service_1.SF00205Service,
    //
    Header_provider_1.HeaderProvider, file_viewer_service_1.FileViewerService
];
exports.routing = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app.routes.js.map