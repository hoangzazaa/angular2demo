/**
 * Created by VuPT on 2/16/2017.
 */
import {AfterViewInit, Component, EventEmitter, Output} from "@angular/core";
import {UserModel} from "../../COMMON/model/UserModel";
import {SF00306Data} from "../SF00306.data";
import {SF00306Helper} from "../SF00306.helper";
import {SF00306Service} from "../SF00306.service";

const MAIL_GROUPS: string = "designg@sagasiki.co.jp";
declare var $: JQueryStatic | any;
@Component({
    selector   : "sf0030602",
    templateUrl: "SF0030602.SearchPic.component.html"
})

export class SF0030602SearchPic implements AfterViewInit{
    @Output() emitSelectedPic: EventEmitter<any> = new EventEmitter<any>();
    //list key search
    keySearchs: string[];

    ngAfterViewInit(): void {
        // 2424
        $('.modal').on('hidden.bs.modal', function (e) {
            if ($('.modal').hasClass('in')) {
                $('body').addClass('modal-open');
            }
        });
    }

    constructor(public sf00306Service: SF00306Service) {
        this.keySearchs = [];
    }

    get pageData(): SF00306Data {
        return this.sf00306Service.pageData;
    }

    get departments() {
        return this.pageData.departments;
    }

    onKeywordsChange(tags: string[]) {
        this.keySearchs                    = tags;
        // create list search
        this.pageData.listDepartmentScreen = [];
        this.pageData.listPicScreen        = [];
        this.pageData.listPicSearch        = [];
        //1. reset active
        this.resetActiveDepartment();
        if (tags.length > 0) {
            for (let i = 0; i < this.pageData.departments.length; i++) {
                for (let j = 0; j < this.pageData.departments[i].users.length; j++) {
                    let check = false;
                    // check username in list key
                    for (let k = 0; k < tags.length; k++) {
                        if (this.pageData.departments[i].users[j].username.indexOf(tags[k]) >= 0) {
                            check = true;
                        }
                    }
                    // add user and department selected
                    if (check) {
                        let department = this.pageData.departments[i];
                        let userPic    = this.pageData.departments[i].users[j];
                        //1. reset active selected
                        this.resetActiveDepartment();
                        //2. get department and add to list searchDepartment(check department da ton tai)
                        let checkIn = this.pageData.listDepartmentScreen.findIndex(item => {
                            return item.id == department.id;
                        });
                        // if department not in list departmentScreen then add dept
                        if (checkIn < 0)
                            this.pageData.listDepartmentScreen.push(department);
                        //3. add userPic to list listUser
                        this.pageData.listPicScreen.push(userPic);
                        this.pageData.listPicSearch.push(userPic);
                    }
                }
            }
        } else {
            //2. active by userPic selected
            this.pageData.listDepartmentScreen = SF00306Helper.cloneDepartmentModel(this.pageData.departments);
            let departmentSlt                  = this.pageData.listDepartmentScreen[0];
            departmentSlt['active']            = true;
            //3. list userPic
            this.pageData.listPicScreen        = departmentSlt.users;
        }

        // check if 1 record
        if (this.pageData.listDepartmentScreen.length == 1) {
            this.pageData.listDepartmentScreen[0]['active'] = true;
            if (this.pageData.listPicSearch.length == 1) {
                this.pageData.listPicSearch[0]['active'] = true;
            }
        }
    }

    changeDepartment(index: number) {
        // check keysearch == null
        let department = this.pageData.listDepartmentScreen[index];
        //1. reset active department
        this.resetActiveDepartment();
        department["active"]        = true;
        this.pageData.listPicScreen = [];
        // check all
        if (this.keySearchs == undefined || this.keySearchs.length == 0) {
            //2. get list userPic by department
            this.pageData.listPicScreen = this.pageData.listDepartmentScreen[index].users;
        } else {
            let userPicSearch = SF00306Helper.cloneUserModel(this.pageData.listPicSearch);
            this.pageData.listPicScreen = userPicSearch.filter(item => {
                return item.departmentId == department.id;
            });
        }
        //scoll userPic
        $('#table-body-userPic').scrollTop(0);
    }

    changeUser(index: number) {
        let userPic = this.pageData.listPicScreen[index];
        // check active
        if (userPic["active"] == true) {
            //1. active = false
            userPic["active"] = false;
            //2. reset active department
            let department    = this.pageData.listDepartmentScreen.find(item => item.id == userPic.departmentId);
            if (!!this.keySearchs && this.keySearchs.length > 0)
                department['active'] = false;
        } else {
            //1. active = true
            userPic["active"]    = true;
            //2. set department by userPic selected
            let department       = this.pageData.listDepartmentScreen.find(item => item.id == userPic.departmentId);
            department['active'] = true;
        }
    }

    closeModalUserPic() {
        // remove all input tags
        this.removeAllInputTag();
        $("#searchModal").modal("hide");
        $("#sendRequestModal").modal('show');
        this.disabledInputTag();
    }

    submitUserPic() {
        // add list sale
        this.addListSale();
        // add groups
        this.addAddressToGroups();
        // get list user active
        this.closeModalUserPic();
        // emit action add email address user pic
        this.emitSelectedPic.emit();
        // disabled input tags
        this.disabledInputTag();
        // remove all input tags
        this.removeAllInputTag();
    }

    disabledInputTag() {
        $('.tagsinput input').attr("readonly", "true");
    }

    removeAllInputTag() {
        this.keySearchs = [];
    }

    // reset active list department
    resetActiveDepartment() {
        this.pageData.listDepartmentScreen.forEach(data => {
            data["active"] = false;
            data.users.forEach(user => {
                user["active"] = false;
            })
        });
    }

    // add address to mail groups
    addAddressToGroups(){
        this.pageData.listDepartmentScreen.forEach(item => {
            // check department groups using
            let saleGroups = new UserModel();
            saleGroups.username = item.department;
            saleGroups.email = MAIL_GROUPS;
            saleGroups.id = item.id + 1000000;
            let index = this.findIndexSale(saleGroups.id, this.pageData.userPicModals);
            if (index < 0 && item['active'] && item.mailGroupFlag == 1) {
                // check department choose
                let indexUserChoose = this.pageData.listPicScreen.findIndex(item => item["active"] == true);
                if (indexUserChoose < 0) {
                    this.pageData.userPicModals.push(saleGroups);
                }

            }
        })
    }

    // add list sale
    addListSale(){
        this.pageData.userPicModals = [];
        // get list user active
        this.pageData.listPicScreen.forEach(item => {
            let index = this.findIndexSale(item.id, this.pageData.userPicModals);

            if (item['active'] && index < 0) {
                this.pageData.userPicModals.push(item);
            }
        })
    }

    findIndexSale(key: number, list:UserModel []): number {
        if (!!!list) {
            return -1;
        }

        let index = list.findIndex(item => {
            return item.id == key;
        });

        return index;
    }
}
