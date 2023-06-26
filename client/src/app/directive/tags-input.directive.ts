import {AfterViewInit, Directive, ElementRef, EventEmitter, Input, Output} from "@angular/core";
/**
 * Created by VuPT on 11/18/2016.
 */
declare var $: JQueryStatic;
@Directive({
    selector: "[js-tags-input]"
})
export class TagsInputDirective implements AfterViewInit {
    @Input() preAddTag?: Function;
    @Output() tagsChange: EventEmitter<string[]> = new EventEmitter<string[]>();

    @Input() set tags(value: string[]) {
        this._tags = value;
        if (this.inited) {
            this.setTags();
        }
    }

    private inited: boolean;
    private _tags: string[];

    constructor(private el: ElementRef) {
        this._tags = [];
        this.inited = false;
    }

    ngAfterViewInit(): void {
        var self = this;
        let option: JqueryTagsInputOption = {
            height: '36px',
            width: '100%',
            minInputWidth: "210px",
            defaultText: '',
            removeWithBackspace: true,
            delimiter: [', '],
            onAddTag: function (tag) {
                self.addTag(tag);
            },
            onRemoveTag: function (tag) {
                self.removeTag(tag);
            }
        };
        if (this.preAddTag != undefined) {
            option.onPreAddTag = function (tag) {
                return this.preAddTag(tag);
            }
        }
        $(this.el.nativeElement).tagsInput(option);
        this.setTags();
        this.inited = true;
    }

    addTag(tag: string) {
        // http://fridaynight.vnext.vn/issues/2979
        this._tags.push(tag);
        this.tagsChange.emit(this._tags);
    }

    removeTag(tag: string) {
        // http://fridaynight.vnext.vn/issues/3139
        if (tag != "") {
            this._tags = $.grep(this._tags, value => value != tag);
            this.tagsChange.emit(this._tags);
        }
    }

    private setTags() {
        // http://fridaynight.vnext.vn/issues/2979
        $(this.el.nativeElement).importTags(this._tags.join(", "));
    }
}