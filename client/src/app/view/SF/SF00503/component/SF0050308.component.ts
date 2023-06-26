/**
 * Created by VuPT on 2/16/2017.
 */
import {Component, Input, Output, EventEmitter} from "@angular/core";
import {SF00503Data} from "../SF00503.data";
import {User} from "../../../../model/core/User.model";

declare var $: JQueryStatic;
/**
 * TOP &gt; 営業目標登録 ... 得意先別目標タブ ... 担当者検索モーダル
 */
@Component({
    selector: "sf0050308",
    templateUrl: "SF0050308.component.html"
})
export class SF0050308Component {


    @Input() picId: number;
    @Input() modalId: string;
    @Input() departmentId: number;

    @Output() changePicId: EventEmitter<any> = new EventEmitter();

    constructor(public sf00503Data: SF00503Data) {

    }

    get departments() {
        return this.sf00503Data.departments;
    }

    changeUserDepartment(id: number) {
        this.sf00503Data.userDepartments = this.sf00503Data.departments[id].users;

        this.sf00503Data.departments.forEach(data => {
            data["active"] = false;
            data.users.forEach(user => {
                user["active"] = false;
            })
        });

        this.sf00503Data.departments[id]["active"] = true;
        // set default selected option
        if (this.sf00503Data.userDepartments) {
            this.sf00503Data.userDepartments[0]["active"] = true;
            // userPic default
            this.sf00503Data.userPicModal = this.sf00503Data.userDepartments[0];
        }
    }

    onKeywordsChange(tags: string[]) {
        if (tags.length > 0) {
            for (let i = 0; i < this.sf00503Data.departments.length; i++) {
                for (let j = 0; j < this.sf00503Data.departments[i].users.length; j++) {
                    let check = false;
                    for (let k = 0; k < tags.length; k++) {
                        if (this.sf00503Data.departments[i].users[j].username.indexOf(tags[k]) >= 0) {
                            check = true;
                        }
                    }
                    if (check) {
                        this.sf00503Data.userDepartments = this.sf00503Data.departments[i].users;
                        this.sf00503Data.departments.forEach(data => {
                            data["active"] = false;
                        });
                        this.sf00503Data.departments[i]["active"] = true;
                        this.sf00503Data.userDepartments.forEach(data => {
                            data["active"] = false;
                        });
                        this.sf00503Data.departments[i].users[j]["active"] = true;
                        this.sf00503Data.userPicModal = this.sf00503Data.departments[i].users[j];
                        this.sf00503Data.checkChangeUser = true;
                        return;
                    }
                }

            }
        }
    }

    changeUser(index: number) {
        this.sf00503Data.userDepartments.forEach(data => {
            data["active"] = false;
        });

        this.sf00503Data.userDepartments[index]["active"] = true;

        this.sf00503Data.userPicModal = this.sf00503Data.userDepartments[index];
        this.sf00503Data.checkChangeUser = true;
    }

    closeModal() {

        $("#searchModal" + this.modalId).modal("hide");
    }

    get checkSelected(): boolean {
        this.sf00503Data.departments.forEach(data => {
            data.users.forEach(user => {
                if (user["active"] == true) {
                    return true;
                }
            })
        });

        return false;
    }


    submitUserPic() {
        // check user pic
        if (!this.sf00503Data.checkChangeUser && this.sf00503Data.userDepartments) {
            this.sf00503Data.userPicModal = this.sf00503Data.userDepartments[0];
        }

        this.changePicId.emit(this.sf00503Data.userPicModal);
        this.closeModal();
        this.sf00503Data.checkChangeUser = false;
        this.sf00503Data.userPicModal = new User();
        $("#searchModal" + this.modalId).modal("hide");
    }
}
