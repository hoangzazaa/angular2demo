import {Component, EventEmitter, Input, Output} from "@angular/core";
import {SF00301_Comment} from "../model/SF00301_Comment.model";
import {SF00301_Deal} from "../model/SF00301_Deal.model";
import {SF00301_Product} from "../model/SF00301_Product.model";
import {SF00301_CommentFile} from '../model/SF00301_CommentFile.model';
import {SF00301Data} from "../SF00301.data";
import {SF00301Service} from "../SF00301.service";

@Component({
    selector   : "sf0030107-comment",
    templateUrl: "SF0030107.Comment.component.html",
    styleUrls: ["SF0030107.Comment.component.css"]
})
export class SF0030107Component {
    @Input() history: SF00301_Comment[];
    @Input() canShowMore: boolean;
    @Input() totalRows: number;

    @Output() requestMail: EventEmitter<number> = new EventEmitter<number>();

    readyToComment: boolean          = false;
    private staging: SF00301_Comment = new SF00301_Comment();

    constantTitle: string = "【活動履歴】";

    constructor(private sf00301Service: SF00301Service) {
    }

    get deal(): SF00301_Deal {
        return this.sf00301Service.pageData.deal;
    }

    addComment(): void {
        this.staging.title = this.constantTitle;
        this.sf00301Service.addComment(this.staging).then(() => {
            this.staging        = new SF00301_Comment();
            this.readyToComment = false;
        });
    }

    showMore(): void {
        this.sf00301Service.showMoreComment().then(null);
    }

    set stagingValue(value: string) {
        if (value) {
            this.readyToComment = true;
            this.staging.value  = value;
        } else {
            this.readyToComment = false;
        }
    }

    get stagingValue(): string {
        return this.staging.value;
    }

    get noProductHighlight(): boolean {
        // check if no product highlight
        //http://fridaynight.vnext.vn/issues/2288 : 1.Open SF00309
        if (this.sf00301Service.pageData.concernsItems != null) {
            let concernsItems = this.sf00301Service.pageData.concernsItems;
            let index = concernsItems.findIndex(item => {
                let product = <SF00301_Product>item;
                return product.highlightFlag == 1 && SF00301Data.CATEGORY.PRODUCT == item.category;
            });

            if (index < 0) return true;
        }

        return false;
    }

    get isDisabled(): boolean {
        return (this.totalRows <= 10 || this.totalRows == (this.history || []).length);
    }

    sendRequestMail(requestType: number): void {
        this.requestMail.emit(requestType);
    }

    fileDownload(evt:any, file: SF00301_CommentFile ):void {
        evt.preventDefault();
        this.sf00301Service.downloadCommentFile(file.fileId, file.originalName, file.commentId)
            .then(result => {
                let link = document.createElement('a');
                link.setAttribute('download', result.fileName);
                link.href = result.filePath;
                link.click();
            }).catch(err => { console.log(err) });
    }

}
