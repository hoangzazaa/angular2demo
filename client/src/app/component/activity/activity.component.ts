import {Component, Input} from "@angular/core";
import {Activity} from "./model/activity.model";

declare let App: any;

@Component({
   selector: "deal-activity",
   templateUrl: "activity.component.html"
})
export class ActivityComponent {
    @Input() activity: Activity = new Activity();
}