"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var Product_model_1 = require("../../../model/core/Product.model");
var SF0030201_req_1 = require("../../../request/SF0030201.req");
var SF0030202_req_1 = require("../../../request/SF0030202.req");
var SF0030203_req_1 = require("../../../request/SF0030203.req");
var SF0030205_req_1 = require("../../../request/SF0030205.req");
var SF0030206_req_1 = require("../../../request/SF0030206.req");
var SF0030207_req_1 = require("../../../request/SF0030207.req");
var SF0030208_req_1 = require("../../../request/SF0030208.req");
var SF0030209_req_1 = require("../../../request/SF0030209.req");
var SF0030210_req_1 = require("../../../request/SF0030210.req");
var SF0030211_req_1 = require("../../../request/SF0030211.req");
var SF0030206_res_1 = require("../../../response/SF0030206.res");
var SF0030207_res_1 = require("../../../response/SF0030207.res");
var common_service_1 = require("../../../service/common.service");
var SF00302Service = (function (_super) {
    __extends(SF00302Service, _super);
    function SF00302Service(http, router) {
        _super.call(this, http, router);
    }
    /**
     * service to get dealProduct and concern items
     * @param dealCode dealProduct's dealCode
     * @param productCode dealProduct's productCode
     * @return {Promise<SF0030201Res>}
     */
    SF00302Service.prototype.sv0030201GetDealProduct = function (dealCode, productCode) {
        var req = new SF0030201_req_1.SF0030201Req(dealCode, productCode);
        return this.getApi("/SF0030201/" + dealCode + "/" + productCode)
            .then(function (res) { return res.data; });
    };
    /**
     * service to create dealProduct
     * @param dealCode
     * @param product
     * @returns {Promise<SF0030202Res>}
     */
    SF00302Service.prototype.sv0030202CreateDealProduct = function (dealCode, product) {
        //TODO: Slice hiện đang có 2 chỗ cùng slice, để 1 chỗ thôi
        if (product.productName.length > 40) {
            product.productName = product.productName.slice(0, 40);
        }
        if (product.memo1 != undefined && product.memo1.length > 60) {
            product.memo1 = product.memo1.slice(0, 60);
        }
        if (product.memo2 != undefined && product.memo2.length > 60) {
            product.memo2 = product.memo2.slice(0, 60);
        }
        if (product.memo3 != undefined && product.memo3.length > 60) {
            product.memo3 = product.memo3.slice(0, 60);
        }
        if (product.packingNote != undefined && product.packingNote.length > 60) {
            product.packingNote = product.packingNote.slice(0, 60);
        }
        var req = new SF0030202_req_1.SF0030202Req(dealCode, product);
        return this.postApi("/SF0030202", req)
            .then(function (res) { return res.data; });
    };
    /**
     * serivce to update given product
     * @param product
     * @returns {Promise<SF0030203Res>}
     */
    SF00302Service.prototype.sv0030203UpdateProduct = function (product, dealCode, paperNews) {
        var req = new SF0030203_req_1.SF0030203Req(product, paperNews);
        return this.postApi("/SF0030203", req)
            .then(function (res) { return res.data; });
    };
    /**
     * service to save as new deal product
     * @param dealProduct
     * @returns {Promise<SF0030204Res>}
     */
    SF00302Service.prototype.sv0030204DuplicateProductForDeal = function (dealProduct, type, paperNews, paperIdTmp) {
        if (dealProduct.product.productName.length > 40) {
            dealProduct.product.productName = dealProduct.product.productName.slice(0, 40);
        }
        if (dealProduct.product.memo1 != undefined && dealProduct.product.memo1.length > 60) {
            dealProduct.product.memo1 = dealProduct.product.memo1.slice(0, 60);
        }
        if (dealProduct.product.memo2 != undefined && dealProduct.product.memo2.length > 60) {
            dealProduct.product.memo2 = dealProduct.product.memo2.slice(0, 60);
        }
        if (dealProduct.product.memo3 != undefined && dealProduct.product.memo3.length > 60) {
            dealProduct.product.memo3 = dealProduct.product.memo3.slice(0, 60);
        }
        if (dealProduct.product.packingNote != undefined && dealProduct.product.packingNote.length > 60) {
            dealProduct.product.packingNote = dealProduct.product.packingNote.slice(0, 60);
        }
        var req = {
            "dealProduct": dealProduct,
            "paperNews": paperNews,
            "paperId": paperIdTmp
        };
        return this.postApi("/SF0030204/" + type, req)
            .then(function (res) { return res.data; });
    };
    /**
     * service to delete deal product
     * @param id: dealProduct's id
     * @returns {Promise<SF0030205Res>}
     */
    SF00302Service.prototype.sv0030205DeleteDealProduct = function (id) {
        var req = new SF0030205_req_1.SF0030205Req(id);
        return this.postApi("/SF0030205", req)
            .then(function (res) {
            return undefined;
        }).catch(function (err) {
            throw err;
        });
    };
    /**
     * service to create product file
     * @param productFile
     * @param fileCode
     * @returns {Promise<SF0030206Res>}
     */
    SF00302Service.prototype.sv0030206CreateProductFile = function (productFile, fileCode) {
        var req = new SF0030206_req_1.SF0030206Req(productFile, fileCode);
        return this.postApi("/SF0030206", req)
            .then(function (res) {
            var sf0030206Res = new SF0030206_res_1.SF0030206Res();
            // set data product file
            sf0030206Res.productFile.setProductFile(res.data.productFile);
            return sf0030206Res;
        });
    };
    /**
     * service to update product file
     * @param productFile
     * @returns {Promise<SF0030207Res>}
     */
    SF00302Service.prototype.sv0030207UpdateProductFile = function (productFile, fileCode) {
        var req = new SF0030207_req_1.SF0030207Req(productFile, fileCode);
        return this.postApi("/SF0030207", req)
            .then(function (res) {
            var sf0030207Res = new SF0030207_res_1.SF0030207Res();
            sf0030207Res.productFile.setProductFile(res.data.productFile);
            return sf0030207Res;
        });
    };
    /**
     * service to delete product file
     * @param id
     * @returns {Promise<SF0030208Res>}
     */
    SF00302Service.prototype.sv0030208DeleteProductFile = function (id) {
        var req = new SF0030208_req_1.SF0030208Req(id);
        return this.postApi("/SF0030208", req)
            .then(function (res) { return res; }).catch(function (err) {
            throw err;
        });
    };
    /**
     * service to update product outputs
     * @param productOutput
     * @returns {Promise<SF0030209Res>}
     */
    SF00302Service.prototype.sv0030209UpdateProductOutput = function (productOutput) {
        var req = new SF0030209_req_1.SF0030209Req(productOutput);
        return this.postApi("/SF0030209", req)
            .then(function (res) { return res.data; })
            .catch(function (err) {
            throw err;
        });
    };
    /**
     * service to update product common fee
     * @param productCommonFee
     * @returns {Promise<SF0030210Res>}
     * @constructor
     */
    SF00302Service.prototype.sv0030210UpdateProductCommonFee = function (productCommonFee) {
        var req = new SF0030210_req_1.SF0030210Req(productCommonFee);
        return this.postApi("/SF0030210", req)
            .then(function (res) { return res.data; });
    };
    /**
     * service to update dealProduct's offer
     * @param offer
     * @returns {Promise<SF0030211Res>}
     */
    SF00302Service.prototype.sv0030211UpdateOffer = function (offer, dealCode, productCode) {
        var req = new SF0030211_req_1.SF0030211Req(offer, dealCode, productCode);
        return this.postApi("/SF0030211", req)
            .then(function (res) { return res.data; });
    };
    SF00302Service.prototype.sv003012UpdateProductInput = function (product, paperNews) {
        if (product.productName.length > 40) {
            product.productName = product.productName.slice(0, 40);
        }
        if (product.memo1 != undefined && product.memo1.length > 60) {
            product.memo1 = product.memo1.slice(0, 60);
        }
        if (product.memo2 != undefined && product.memo2.length > 60) {
            product.memo2 = product.memo2.slice(0, 60);
        }
        if (product.memo3 != undefined && product.memo3.length > 60) {
            product.memo3 = product.memo3.slice(0, 60);
        }
        if (product.packingNote != undefined && product.packingNote.length > 60) {
            product.packingNote = product.packingNote.slice(0, 60);
        }
        return this.postApi("/SF0030212", {
            "product": product,
            "paperNews": paperNews
        }).then(function (res) { return res.data; });
    };
    SF00302Service.prototype.sv003013UpdateProductImposition = function (product, paperNews) {
        var data = new Product_model_1.Product();
        data.id = product.id;
        data.shapeId = product.shapeId;
        data.sizeD = product.sizeD;
        data.sizeH = product.sizeH;
        data.sizeW = product.sizeW;
        data.blankPaperSizeH = product.blankPaperSizeH;
        data.blankPaperSizeW = product.blankPaperSizeW;
        data.paperNameId = product.paperNameId;
        data.paperWeight = product.paperWeight;
        data.paperId = product.paperId;
        data.paperHeadApprovalFlag = product.paperHeadApprovalFlag;
        data.paperSizeH = product.paperSizeH;
        data.paperSizeW = product.paperSizeW;
        data.factoryId = product.factoryId;
        return this.postApi("/SF0030213", {
            "product": data,
            "paperNews": paperNews
        }).then(function (res) { return res.data; });
    };
    SF00302Service.prototype.downloadFile = function (productFile) {
        var req = {
            fileId: productFile.fileId,
            originalName: productFile.originalName,
            productId: productFile.productId
        };
        return this.postApi("/SF0030214", req)
            .then(function (res) {
            return { fileName: res.data.fileName, filePath: res.data.filePath };
        })
            .catch(function (err) {
            throw err;
        });
    };
    SF00302Service = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router])
    ], SF00302Service);
    return SF00302Service;
}(common_service_1.CommonService));
exports.SF00302Service = SF00302Service;
//# sourceMappingURL=SF00302.service.js.map