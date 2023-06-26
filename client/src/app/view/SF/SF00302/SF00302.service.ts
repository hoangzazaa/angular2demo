import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import {DealProduct} from "../../../model/core/DealProduct.model";
import {Offer} from "../../../model/core/Offer.model";
import {Product} from "../../../model/core/Product.model";
import {ProductCommonFee} from "../../../model/core/ProductCommonFee.model";
import {ProductFile} from "../../../model/core/ProductFile.model";
import {ProductOutput} from "../../../model/core/ProductOutput.model";
import {SF0030201Req} from "../../../request/SF0030201.req";
import {SF0030202Req} from "../../../request/SF0030202.req";
import {SF0030203Req} from "../../../request/SF0030203.req";
import {SF0030205Req} from "../../../request/SF0030205.req";
import {SF0030206Req} from "../../../request/SF0030206.req";
import {SF0030207Req} from "../../../request/SF0030207.req";
import {SF0030208Req} from "../../../request/SF0030208.req";
import {SF0030209Req} from "../../../request/SF0030209.req";
import {SF0030210Req} from "../../../request/SF0030210.req";
import {SF0030211Req} from "../../../request/SF0030211.req";
import {SF0030201Res} from "../../../response/SF0030201.res";
import {SF0030202Res} from "../../../response/SF0030202.res";
import {SF0030203Res} from "../../../response/SF0030203.res";
import {SF0030204Res} from "../../../response/SF0030204.res";
import {SF0030205Res} from "../../../response/SF0030205.res";
import {SF0030206Res} from "../../../response/SF0030206.res";
import {SF0030207Res} from "../../../response/SF0030207.res";
import {SF0030208Res} from "../../../response/SF0030208.res";
import {SF0030209Res} from "../../../response/SF0030209.res";
import {SF0030210Res} from "../../../response/SF0030210.res";
import {SF0030211Res} from "../../../response/SF0030211.res";
import {CommonService} from "../../../service/common.service";
import {PaperModel} from "./model/paper.model";

declare let $: JQueryStatic;
@Injectable()
export class SF00302Service extends CommonService {
    constructor(http: Http, router: Router) {
        super(http, router);
    }

    /**
     * service to get dealProduct and concern items
     * @param dealCode dealProduct's dealCode
     * @param productCode dealProduct's productCode
     * @return {Promise<SF0030201Res>}
     */
    public sv0030201GetDealProduct(dealCode: string, productCode: string): Promise<SF0030201Res> {
        let req = new SF0030201Req(dealCode, productCode);
        return this.getApi("/SF0030201/" + dealCode + "/" + productCode)
            .then(res => res.data);
    }

    /**
     * service to create dealProduct
     * @param dealCode
     * @param product
     * @returns {Promise<SF0030202Res>}
     */
    public sv0030202CreateDealProduct(dealCode: string, product: Product): Promise<SF0030202Res> {
        //TODO: Slice hiện đang có 2 chỗ cùng slice, để 1 chỗ thôi
        if (product.productName.length> 40) {
            product.productName = product.productName.slice(0, 40);
        }
        if (product.memo1 != undefined && product.memo1.length> 60) {
            product.memo1 = product.memo1.slice(0, 60);
        }
        if (product.memo2 != undefined && product.memo2.length> 60) {
            product.memo2 = product.memo2.slice(0, 60);
        }
        if (product.memo3 != undefined && product.memo3.length> 60) {
            product.memo3 = product.memo3.slice(0, 60);
        }
        if (product.packingNote != undefined && product.packingNote.length> 60) {
            product.packingNote= product.packingNote.slice(0, 60);
        }

        let req = new SF0030202Req(dealCode, product);
        return this.postApi("/SF0030202", req)
            .then(res => res.data);
    }

    /**
     * serivce to update given product
     * @param product
     * @returns {Promise<SF0030203Res>}
     */
    public sv0030203UpdateProduct(product: Product, dealCode: string, paperNews?: PaperModel[]): Promise<SF0030203Res> {
        let req = new SF0030203Req(product, paperNews);

        return this.postApi("/SF0030203", req)
            .then(res => res.data);
    }

    /**
     * service to save as new deal product
     * @param dealProduct
     * @returns {Promise<SF0030204Res>}
     */
    public sv0030204DuplicateProductForDeal(dealProduct: DealProduct, type: number,paperNews?: PaperModel[], paperIdTmp?: number): Promise<SF0030204Res> {
        if (dealProduct.product.productName.length> 40) {
            dealProduct.product.productName = dealProduct.product.productName.slice(0, 40);
        }
        if (dealProduct.product.memo1 != undefined && dealProduct.product.memo1.length> 60) {
            dealProduct.product.memo1 = dealProduct.product.memo1.slice(0, 60);
        }
        if (dealProduct.product.memo2 != undefined && dealProduct.product.memo2.length> 60) {
            dealProduct.product.memo2 = dealProduct.product.memo2.slice(0, 60);
        }
        if (dealProduct.product.memo3 != undefined && dealProduct.product.memo3.length> 60) {
            dealProduct.product.memo3 = dealProduct.product.memo3.slice(0, 60);
        }
        if (dealProduct.product.packingNote != undefined && dealProduct.product.packingNote.length> 60) {
            dealProduct.product.packingNote= dealProduct.product.packingNote.slice(0, 60);
        }
        let req = {
            "dealProduct": dealProduct,
            "paperNews":paperNews,
            "paperId": paperIdTmp
        };

        return this.postApi("/SF0030204/" + type, req)
            .then(res => res.data);
    }

    /**
     * service to delete deal product
     * @param id: dealProduct's id
     * @returns {Promise<SF0030205Res>}
     */
    public sv0030205DeleteDealProduct(id: number): Promise<SF0030205Res> {
        let req = new SF0030205Req(id);
        return this.postApi("/SF0030205", req)
            .then(res => {
                return undefined;
            }).catch(err => {
                throw err;
            });
    }

    /**
     * service to create product file
     * @param productFile
     * @param fileCode
     * @returns {Promise<SF0030206Res>}
     */
    public sv0030206CreateProductFile(productFile: ProductFile, fileCode: string): Promise<SF0030206Res> {
        let req = new SF0030206Req(productFile, fileCode);
        return this.postApi("/SF0030206", req)
            .then(res => {
                let sf0030206Res = new SF0030206Res();
                // set data product file
                sf0030206Res.productFile.setProductFile(res.data.productFile);

                return sf0030206Res;
            });
    }

    /**
     * service to update product file
     * @param productFile
     * @returns {Promise<SF0030207Res>}
     */
    public sv0030207UpdateProductFile(productFile: ProductFile, fileCode: string): Promise<SF0030207Res> {
        let req = new SF0030207Req(productFile, fileCode);
        return this.postApi("/SF0030207", req)
            .then(res => {
                let sf0030207Res = new SF0030207Res();
                sf0030207Res.productFile.setProductFile(res.data.productFile);

                return sf0030207Res;
            });
    }

    /**
     * service to delete product file
     * @param id
     * @returns {Promise<SF0030208Res>}
     */
    public sv0030208DeleteProductFile(id: number): Promise<SF0030208Res> {
        let req = new SF0030208Req(id);
        return this.postApi("/SF0030208", req)
            .then(res => res).catch(err => {
                throw  err;
            });
    }

    /**
     * service to update product outputs
     * @param productOutput
     * @returns {Promise<SF0030209Res>}
     */
    public sv0030209UpdateProductOutput(productOutput: ProductOutput): Promise<SF0030209Res> {
        let req = new SF0030209Req(productOutput);
        return this.postApi("/SF0030209", req)
            .then(res => res.data)
            .catch(err => {
                throw err;
            });
    }

    /**
     * service to update product common fee
     * @param productCommonFee
     * @returns {Promise<SF0030210Res>}
     * @constructor
     */
    public sv0030210UpdateProductCommonFee(productCommonFee: ProductCommonFee): Promise<SF0030210Res> {
        let req = new SF0030210Req(productCommonFee);
        return this.postApi("/SF0030210", req)
            .then(res => res.data);
    }

    /**
     * service to update dealProduct's offer
     * @param offer
     * @returns {Promise<SF0030211Res>}
     */
    public sv0030211UpdateOffer(offer: Offer, dealCode: string, productCode: string): Promise<SF0030211Res> {
        let req = new SF0030211Req(offer, dealCode, productCode);
        return this.postApi("/SF0030211", req)
            .then(res => res.data);
    }

    public sv003012UpdateProductInput(product: Product,paperNews?: PaperModel[]): Promise<any> {
        if (product.productName.length> 40) {
            product.productName = product.productName.slice(0, 40);
        }
        if (product.memo1 != undefined && product.memo1.length> 60) {
            product.memo1 = product.memo1.slice(0, 60);
        }
        if (product.memo2 != undefined && product.memo2.length> 60) {
            product.memo2 = product.memo2.slice(0, 60);
        }
        if (product.memo3 != undefined && product.memo3.length> 60) {
            product.memo3 = product.memo3.slice(0, 60);
        }
        if (product.packingNote != undefined && product.packingNote.length> 60) {
            product.packingNote = product.packingNote.slice(0, 60);
        }
        return this.postApi("/SF0030212", {
            "product": product,
            "paperNews": paperNews
        }).then(res => res.data);
    }

    public sv003013UpdateProductImposition(product: Product,paperNews?: PaperModel[]): Promise<any> {
        let data                   = new Product();
        data.id                    = product.id;
        data.shapeId               = product.shapeId;
        data.sizeD                 = product.sizeD;
        data.sizeH                 = product.sizeH;
        data.sizeW                 = product.sizeW;
        data.blankPaperSizeH       = product.blankPaperSizeH;
        data.blankPaperSizeW       = product.blankPaperSizeW;
        data.paperNameId           = product.paperNameId;
        data.paperWeight           = product.paperWeight;
        data.paperId               = product.paperId;
        data.paperHeadApprovalFlag = product.paperHeadApprovalFlag;
        data.paperSizeH            = product.paperSizeH;
        data.paperSizeW            = product.paperSizeW;
        data.factoryId             = product.factoryId;

        return this.postApi("/SF0030213", {
            "product": data,
            "paperNews": paperNews
        }).then(res => res.data);
    }

    downloadFile(productFile: ProductFile) {
        let req = {
            fileId: productFile.fileId,
            originalName: productFile.originalName,
            productId: productFile.productId
        };
        return this.postApi("/SF0030214", req)
                   .then(res => {
                       return {fileName: res.data.fileName, filePath: res.data.filePath};
                   })
                   .catch(err => {
                       throw err;
                   });
    }
}
