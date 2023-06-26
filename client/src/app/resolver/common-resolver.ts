import {Router} from "@angular/router";
import {Constants} from "../helper/constants";
import Message, {MSG} from "../helper/message";
import {ScreenUrl} from "../helper/screen-url";
import AlertType = SweetAlert.AlertType;

/**
 * Common resolver use to handles action when page load.
 * @author manhnv
 */
export abstract class CommonResolver {
    constructor(public router: Router) {
        //Get the current vertical position of the scroll bar for the first.
        $(window).scrollTop();

        //Close all model and popup
        $(".modal").modal('hide');

        //Close all swal alert
        swal.close();
    }

    /**
     * Method use to show message when redirect link on item not found.
     * @param code the value to be lookup
     */
    protected doCheck(code: string): void {
        let self = this;

        swal({
                title: Message.get(MSG.COM.WRN001),
                text: Message.get(MSG.COM.WRN002, code),
                type: "warning",
                html: true,
                confirmButtonText: Constants.BACK
            },
            function () {
                return self.router.navigate([self.url()]).catch(() => {
                    return self.router.navigate(['/error/404']);
                });
            });
    }

    /**
     * Method to return default page when data not found. Default navigate to SF001 - Dashboard;
     * @return {string}
     */
    protected url(): string {
        return ScreenUrl.SF001;
    }

}