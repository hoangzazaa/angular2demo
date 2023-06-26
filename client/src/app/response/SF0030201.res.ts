import {DealProduct} from "../model/core/DealProduct.model";
import {MstColor} from "../model/core/MstColor.model";
import {MstDieCutting} from "../model/core/MstDieCutting.model";
import {MstPacking} from "../model/core/MstPacking.model";
import {MstPaper} from "../model/core/MstPaper.model";
import {MstPaste} from "../model/core/MstPaste.model";
import {MstShippingCompany} from "../model/core/MstShippingCompany.model";
import {MstShippingCost} from "../model/core/MstShippingCost.model";
import {MstStamping} from "../model/core/MstStamping.model";
import {MstSurfaceTreatment} from "../model/core/MstSurfaceTreatment.model";
import {MstWindow} from "../model/core/MstWindow.model";
import {MstDecorative} from "../model/core/MstDecorative.model";

export class SF0030201Res {
    dealProduct: DealProduct = new DealProduct();
    // master data
    mstColor: MstColor = new MstColor();
    mstDieCutting: MstDieCutting = new MstDieCutting();
    mstPacking: MstPacking = new MstPacking();
    mstPaper: MstPaper = new MstPaper();
    mstPaperHead: MstPaper = new MstPaper();
    mstPaste: MstPaste = new MstPaste();
    mstShippingCompany: MstShippingCompany = new MstShippingCompany();
    mstShippingCost: MstShippingCost = new MstShippingCost();
    mstStamping: MstStamping = new MstStamping();
    mstSurfaceTreatment: MstSurfaceTreatment = new MstSurfaceTreatment();
    mstWindow: MstWindow = new MstWindow();
    mstDecorative: MstDecorative = new MstDecorative();

    messageCode: string;
}
