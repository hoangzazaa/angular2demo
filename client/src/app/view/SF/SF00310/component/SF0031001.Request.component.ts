import {Component, Input} from "@angular/core";
import {SF00310Service} from "../SF00310.service";
import DataUtil from "../../../../util/data-util";
import {RANK} from "../SF00310.MstData";

type SelectBoxOption = { id: number, name: string }

@Component({
    selector   : '[sf0031001]',
    templateUrl: 'SF0031001.Request.component.html',
    styleUrls: ["SF0031001.Request.component.css"]
})

export class SF0031001RequestProduct {

    constructor(public pageService: SF00310Service) {
    }

    changeData() {
        this.pageService.pageData.changeEditData();
    }

    get requestModel() {
        return this.pageService.pageData.requestModel;
    }

    // get mstRank(): SelectBoxOption[] {
    //     return DataUtil.toSelectBoxDataSource(RANK);
    // }

    mstRank = DataUtil.toSelectBoxDataSource(RANK);

    get defaultDesiredDeliveryDate(): Date {
        return null;
    }

    get defaultSubmissionDeadline(): Date {
        return null;
    }

    get rank(): number {
        return this.requestModel.rank;
    }

    set rank(value: number) {
        this.requestModel.rank = value;
        this.changeData();
    }

    get target(): string {
        return this.requestModel.target;
    }

    set target(value: string) {
        this.requestModel.target = value;
        this.changeData();
    }

    get rse(): string {
        return this.requestModel.rse;
    }

    set rse(value: string) {
        this.requestModel.rse = value;
        this.changeData();
    }

    get department(): string {
        return this.requestModel.department;
    }

    set department(value: string) {
        this.requestModel.department = value;
        this.changeData();
    }

    get designConcept(): string {
        return this.requestModel.designConcept;
    }

    set designConcept(value: string) {
        this.requestModel.designConcept = value;
        this.changeData();
    }

    get methodStereoscopicDummy(): string {
        return this.requestModel.methodStereoscopicDummy;
    }


    set methodStereoscopicDummy(value: string) {
        this.requestModel.methodStereoscopicDummy = value;
        this.changeData();
    }

    get flatOutput(): string {
        return this.requestModel.flatOutput;
    }

    set flatOutput(value: string) {
        this.requestModel.flatOutput = value;
        this.changeData();
    }

    get desiredDeliveryDate(): Date {
        return this.requestModel.desiredDeliveryDate;
    }

    setDesiredDelivery(value: Date) {
        this.requestModel.desiredDeliveryDate = value;
        this.changeData();
    }

    get submissionDeadline(): Date {
        return this.requestModel.submissionDeadline;
    }

    setSubmissionDeadline(value: Date) {
        this.requestModel.submissionDeadline = value;
        this.changeData();
    }

    get memo(): string {
        return this.requestModel.memo;
    }

    set memo(val: string) {
        this.requestModel.memo = val;
        this.changeData();
    }

}
