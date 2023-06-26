export class HightlightedPropertyTracker {

    initialized: boolean = false;

    initializeDone() {
        this.initialized = true;
    }

    isHighlightedProperty(property) {
        return this[property];
    }

    touch(property) {
        this[property] = this.initialized && false;
    }

    //0030204
    size: boolean = false;
    blankPaperSize: boolean = false;

    //0030206
    paper: boolean = false;
    shapeId: boolean = false;
    paperNameId: boolean = false;
    paperSize: boolean = false;
    cutPaperSize: boolean = false;
    impositionNumber: boolean = false;
    takenNumber: boolean = false;
    paperApprovalFlag: boolean = false;

    //0030207
    laminationFlute: boolean = false;
    laminationFrontBasicWeight: boolean = false;
    laminationMediumBasicWeight: boolean = false;
    laminationBackBasicWeight: boolean = false;
    laminationNumber: boolean = false;
    laminationWidth: boolean = false;
    laminationCuttingFlow: boolean = false;

    //0030208
    printMethod: boolean = false;
    colorIdF: boolean = false;
    specialColorF: boolean = false;
    specialColorB: boolean = false;
    colorBText: boolean = false;
    colorIdB: boolean = false;
    colorMemo: boolean = false;

    //0030209
    surfaceTreatmentIdF: boolean = false;
    surfaceTreatmentIdB: boolean = false;
    embossingID: boolean = false;

    //0030210
    stampingId: boolean = false;
    stampingSize1: boolean = false;
    stampingSize2: boolean = false;
    stampingSize3: boolean = false;
    stampingSize4: boolean = false;

    //0030211
    windowSize: boolean = false;

    //0030212
    dieCuttingThroughNumber: boolean = false;
    pasteId: boolean = false;
    pasteSpecialFormFlag: boolean = false;

    //0030213
    inspectionId: boolean = false;
    packingId: boolean = false;
    shippingCostId: boolean = false;

    //0030214
    expense1: boolean = false;
    unitType1: boolean = false;
    expense2: boolean = false;
    unitType2: boolean = false;
    expense3: boolean = false;
    unitType3: boolean = false;

    shippingType: boolean = false;
    laminationABasicWeight: boolean = false;
    laminationBBasicWeight: boolean = false;
    tapeCutting: boolean = false;
    linerCutting: boolean = false;
    handProcessing: boolean = false;
    waterRepellent: boolean = false;
    handPosition: boolean = false;
    bindingMethod:boolean = false;
    flap:boolean = false;
    otherNote1:boolean = false;
    otherNote2:boolean = false;
    otherNote3:boolean = false;
    otherMethod:boolean = false;
    stringColor: boolean = false;
    dieCuttingFlag:boolean = false;
    stampingNumber:boolean = false;
    requiredAdditionalWork:boolean = false;
}
