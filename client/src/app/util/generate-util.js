"use strict";
var constants_1 = require("../helper/constants");
/**
 * Class use to generate code for template code, deal code, etc...
 * @author manhnv
 */
var GenerateUtil = (function () {
    function GenerateUtil() {
    }
    /**
     * Generate the template code from id.
     * @param targetId the key provides to generate
     * @returns {any}
     */
    GenerateUtil.generateTemplateCode = function (targetId) {
        if (isNaN(targetId))
            return constants_1.Constants.ZERO.toString();
        var templateCode = constants_1.Constants.PREFIX_CODE + targetId; //e.g.//TMP00001
        return constants_1.Constants.TMP + templateCode.substr(templateCode.length - constants_1.Constants.MAX_LENGTH);
    };
    /**0
     * Generate the deal code from id.
     * @param targetId the key provides to generate
     * @returns {any}
     */
    GenerateUtil.generateDealCode = function (targetId) {
        if (isNaN(targetId))
            return constants_1.Constants.ZERO.toString();
        var year = new Date().getFullYear().toString().substr(2, 2);
        var dealCode = constants_1.Constants.PREFIX_CODE + targetId; //e.g.//16S00001
        return year + constants_1.Constants.FIXED_DEAL + dealCode.substr(dealCode.length - constants_1.Constants.MAX_LENGTH);
    };
    /**
     * Base64 encode.
     * @param input
     * @returns {string}
     */
    GenerateUtil.base64Encode = function (input) {
        if (input === void 0) { input = constants_1.Constants.BLANK; }
        var output = constants_1.Constants.BLANK;
        var chr1, chr2, chr3 = constants_1.Constants.BLANK;
        var enc1, enc2, enc3, enc4 = constants_1.Constants.BLANK;
        var i = 0;
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
            chr1 = chr2 = chr3 = constants_1.Constants.BLANK;
            enc1 = enc2 = enc3 = enc4 = constants_1.Constants.BLANK;
        } while (i < input.length);
        return output;
    };
    /**
     * Base64 decode.
     * @param input
     * @returns {string}
     */
    GenerateUtil.base64Decode = function (input) {
        if (input === void 0) { input = constants_1.Constants.BLANK; }
        var output = constants_1.Constants.BLANK;
        var chr1, chr2, chr3 = constants_1.Constants.BLANK;
        var enc1, enc2, enc3, enc4 = constants_1.Constants.BLANK;
        var i = 0;
        // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
        var pattern = /[^A-Za-z0-9\+\/\=]/g;
        input = input.replace(pattern, constants_1.Constants.BLANK);
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
            chr1 = chr2 = chr3 = constants_1.Constants.BLANK;
            enc1 = enc2 = enc3 = enc4 = constants_1.Constants.BLANK;
        } while (i < input.length);
        return output;
    };
    GenerateUtil.keyStr = constants_1.Constants.KEY_STR;
    return GenerateUtil;
}());
exports.GenerateUtil = GenerateUtil;
//# sourceMappingURL=generate-util.js.map