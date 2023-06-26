import {Constants} from "../helper/constants";

/**
 * Class use to generate code for template code, deal code, etc...
 * @author manhnv
 */
export class GenerateUtil {
    private static readonly keyStr: string = Constants.KEY_STR;

    /**
     * Generate the template code from id.
     * @param targetId the key provides to generate
     * @returns {any}
     */
    static generateTemplateCode(targetId: number): string {
        if (isNaN(targetId))
            return Constants.ZERO.toString();

        let templateCode = Constants.PREFIX_CODE + targetId; //e.g.//TMP00001
        return Constants.TMP + templateCode.substr(templateCode.length - Constants.MAX_LENGTH);
    }

    /**0
     * Generate the deal code from id.
     * @param targetId the key provides to generate
     * @returns {any}
     */
    static generateDealCode(targetId: number): string {
        if (isNaN(targetId))
            return Constants.ZERO.toString();

        let year = new Date().getFullYear().toString().substr(2, 2);
        let dealCode = Constants.PREFIX_CODE + targetId; //e.g.//16S00001
        return year + Constants.FIXED_DEAL + dealCode.substr(dealCode.length - Constants.MAX_LENGTH);
    }

    /**
     * Base64 encode.
     * @param input
     * @returns {string}
     */
    static base64Encode(input: string = Constants.BLANK): string {
        let output: string = Constants.BLANK;
        let chr1, chr2, chr3: any = Constants.BLANK;
        let enc1, enc2, enc3, enc4: any = Constants.BLANK;
        let i = 0;

        do {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            }
            if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
                this.keyStr.charAt(enc1) +
                this.keyStr.charAt(enc2) +
                this.keyStr.charAt(enc3) +
                this.keyStr.charAt(enc4);
            chr1 = chr2 = chr3 = Constants.BLANK;
            enc1 = enc2 = enc3 = enc4 = Constants.BLANK;
        } while (i < input.length);

        return output;
    }

    /**
     * Base64 decode.
     * @param input
     * @returns {string}
     */
    static base64Decode(input: string = Constants.BLANK): string {
        let output: string = Constants.BLANK;
        let chr1, chr2, chr3: any = Constants.BLANK;
        let enc1, enc2, enc3, enc4: any = Constants.BLANK;
        let i = 0;

        // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
        let pattern = /[^A-Za-z0-9\+\/\=]/g;
        input = input.replace(pattern, Constants.BLANK);

        do {
            enc1 = this.keyStr.indexOf(input.charAt(i++));
            enc2 = this.keyStr.indexOf(input.charAt(i++));
            enc3 = this.keyStr.indexOf(input.charAt(i++));
            enc4 = this.keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output += String.fromCharCode(chr1);

            if (enc3 != 64) {
                output += String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output += String.fromCharCode(chr3);
            }

            chr1 = chr2 = chr3 = Constants.BLANK;
            enc1 = enc2 = enc3 = enc4 = Constants.BLANK;

        } while (i < input.length);

        return output;
    }

}