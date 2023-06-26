"use strict";
var HightlightedPropertyTracker = (function () {
    function HightlightedPropertyTracker() {
        this.initialized = false;
        //0030204
        this.size = false;
        this.blankPaperSize = false;
        //0030206
        this.paper = false;
        this.shapeId = false;
        this.paperNameId = false;
        this.paperSize = false;
        this.cutPaperSize = false;
        this.impositionNumber = false;
        this.takenNumber = false;
        this.paperApprovalFlag = false;
        //0030207
        this.laminationFlute = false;
        this.laminationFrontBasicWeight = false;
        this.laminationMediumBasicWeight = false;
        this.laminationBackBasicWeight = false;
        this.laminationNumber = false;
        this.laminationWidth = false;
        this.laminationCuttingFlow = false;
        //0030208
        this.printMethod = false;
        this.colorIdF = false;
        this.specialColorF = false;
        this.specialColorB = false;
        this.colorBText = false;
        this.colorIdB = false;
        this.colorMemo = false;
        //0030209
        this.surfaceTreatmentIdF = false;
        this.surfaceTreatmentIdB = false;
        this.embossingID = false;
        //0030210
        this.stampingId = false;
        this.stampingSize1 = false;
        this.stampingSize2 = false;
        this.stampingSize3 = false;
        this.stampingSize4 = false;
        //0030211
        this.windowSize = false;
        //0030212
        this.dieCuttingThroughNumber = false;
        this.pasteId = false;
        this.pasteSpecialFormFlag = false;
        //0030213
        this.inspectionId = false;
        this.packingId = false;
        this.shippingCostId = false;
        //0030214
        this.expense1 = false;
        this.unitType1 = false;
        this.expense2 = false;
        this.unitType2 = false;
        this.expense3 = false;
        this.unitType3 = false;
        this.shippingType = false;
        this.laminationABasicWeight = false;
        this.laminationBBasicWeight = false;
        this.tapeCutting = false;
        this.linerCutting = false;
        this.handProcessing = false;
        this.waterRepellent = false;
        this.handPosition = false;
        this.bindingMethod = false;
        this.flap = false;
        this.otherNote1 = false;
        this.otherNote2 = false;
        this.otherNote3 = false;
        this.otherMethod = false;
        this.stringColor = false;
        this.dieCuttingFlag = false;
        this.stampingNumber = false;
        this.requiredAdditionalWork = false;
    }
    HightlightedPropertyTracker.prototype.initializeDone = function () {
        this.initialized = true;
    };
    HightlightedPropertyTracker.prototype.isHighlightedProperty = function (property) {
        return this[property];
    };
    HightlightedPropertyTracker.prototype.touch = function (property) {
        this[property] = this.initialized && false;
    };
    return HightlightedPropertyTracker;
}());
exports.HightlightedPropertyTracker = HightlightedPropertyTracker;
//# sourceMappingURL=ProductPropertyChangedTracker.js.map