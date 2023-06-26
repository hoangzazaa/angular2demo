export class ShippingDestinationModalHelper {

    static getDestinationExt(code: string): string {
        if (code == undefined) {
            return "-";
        } else if (code.length == 7) {
            return "000";
        } else if (code.length == 10) {
            return code.substr(7);
        } else {
            return code;
        }
    }

    static getDestinationName(ext: string, name: string) {
        let nameStr = "";
        if (ext != undefined) {
            nameStr += ext + ": ";
        }
        if (name != undefined) {
            nameStr += name;
        }
        return nameStr;
    }
}