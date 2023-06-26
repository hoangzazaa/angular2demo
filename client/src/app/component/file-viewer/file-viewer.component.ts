import {Component, Input, OnInit} from "@angular/core";
import {FileViewerService} from "./file-viewer.service";

@Component({
    selector: "file-viewer",
    templateUrl: "file-viewer.component.html",
    styleUrls: ["file-viewer.component.css"]
})

export class FileViewerComponent implements OnInit{
    @Input() srcFile: string;

    noResource = false;

    constructor (private service: FileViewerService) {
    }

    ngOnInit(): void {
        this.checkResource();
    }

    checkResource() {
        let self = this;
        self.service.checkResource(self.srcFile).then(result => {
            self.noResource = !result;
        });
    }

    imgErr() {
        this.noResource = true;
    }
}
