"use strict";
var UnicodeUtil = (function () {
    function UnicodeUtil() {
    }
    UnicodeUtil.convertKanaF2H = function (str) {
        return this.replaceStringByArrayOfIndex(str, this.WKANA, this.HKANA);
    };
    UnicodeUtil.replaceStringByArrayOfIndex = function (str, src, dest) {
        var len = src.length;
        for (var i = 0; i < len; i++) {
            str = this.replaceAll(str, src[i], dest[i]);
        }
        return str;
    };
    UnicodeUtil.replaceAll = function (target, from, to) {
        if (target.indexOf(from) < 0) {
            return target;
        }
        return target.split(from).join(to);
    };
    UnicodeUtil.toHalfWidth = function (text) {
        return text.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
            return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
        });
    };
    UnicodeUtil.toFullWidth = function (text) {
        return text.replace(/[A-Za-z0-9]/g, function (s) {
            return String.fromCharCode(s.charCodeAt(0) + 0xFEE0);
        });
    };
    UnicodeUtil.countBytesOnSJIS = function (str) {
        var res = 0, l = str.length;
        for (var i = 0; i < l; i++) {
            var c = str.charCodeAt(i);
            res += UnicodeUtil.getBytesOnSJISByCharcode(c);
        }
        return res;
    };
    UnicodeUtil.getBytesOnSJISByCharcode = function (code) {
        // Shift_JIS: 0x0 ～ 0x80, 0xa0  , 0xa1   ～ 0xdf  , 0xfd   ～ 0xff
        // Unicode  : 0x0 ～ 0x80, 0xf8f0, 0xff61 ～ 0xff9f, 0xf8f1 ～ 0xf8f3
        if ((code >= 0x0 && code < 0x81) || code == 0xf8f0 || (code >= 0xff61 && code < 0xffa0) || (code >= 0xf8f1 && code < 0xf8f4)) {
            return 1;
        }
        else {
            return 2;
        }
    };
    UnicodeUtil.truncBySjisByte = function (str, limit_byte) {
        var byte = 0;
        var l = str.length;
        var res = "";
        for (var i = 0; i < l; i++) {
            var c = str.charCodeAt(i);
            var add = UnicodeUtil.getBytesOnSJISByCharcode(c);
            if (byte + add > limit_byte) {
                break;
            }
            res += str.substr(i, 1);
            byte += add;
        }
        return res;
    };
    UnicodeUtil.HKANA = new Array("ｶﾞ", "ｷﾞ", "ｸﾞ", "ｹﾞ", "ｺﾞ", "ｻﾞ", "ｼﾞ", "ｽﾞ", "ｾﾞ", "ｿﾞ", "ﾀﾞ", "ﾁﾞ", "ﾂﾞ", "ﾃﾞ", "ﾄﾞ", "ﾊﾞ", "ﾋﾞ", "ﾌﾞ", "ﾍﾞ", "ﾎﾞ", "ｳﾞ", //
    "ﾊﾟ", "ﾋﾟ", "ﾌﾟ", "ﾍﾟ", "ﾎﾟ", //
    "ｧ", "ｨ", "ｩ", "ｪ", "ｫ", "ｬ", "ｭ", "ｮ", "ｯ", "ｰ", "", //
    "ｱ", "ｲ", "ｳ", "ｴ", "ｵ", "ｶ", "ｷ", "ｸ", "ｹ", "ｺ", //
    "ｻ", "ｼ", "ｽ", "ｾ", "ｿ", "ﾀ", "ﾁ", "ﾂ", "ﾃ", "ﾄ", "ﾅ", "ﾆ", "ﾇ", "ﾈ", "ﾉ", "ﾊ", "ﾋ", "ﾌ", "ﾍ", "ﾎ", "ﾏ", "ﾐ", "ﾑ", "ﾒ", "ﾓ", "ﾔ", "ﾕ", "ﾖ", "ﾗ", "ﾘ", "ﾙ", "ﾚ", "ﾛ", "ﾜ", "", "ｦ", "", "ﾝ" //
    );
    UnicodeUtil.WKANA = new Array(//
    "ガ", "ギ", "グ", "ゲ", "ゴ", "ザ", "ジ", "ズ", "ゼ", "ゾ", "ダ", "ヂ", "ヅ", "デ", "ド", "バ", "ビ", "ブ", "ベ", "ボ", "ヴ", //
    "パ", "ピ", "プ", "ペ", "ポ", //
    "ァ", "ィ", "ゥ", "ェ", "ォ", "ャ", "ュ", "ョ", "ッ", "ー", "ヮ", //
    "ア", "イ", "ウ", "エ", "オ", "カ", "キ", "ク", "ケ", "コ", //
    "サ", "シ", "ス", "セ", "ソ", "タ", "チ", "ツ", "テ", "ト", "ナ", "ニ", "ヌ", "ネ", "ノ", "ハ", "ヒ", "フ", "ヘ", "ホ", "マ", "ミ", "ム", "メ", "モ", "ヤ", "ユ", "ヨ", "ラ", "リ", "ル", "レ", "ロ", "ワ", "ヰ", "ヲ", "ヱ", "ン" //
    );
    return UnicodeUtil;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UnicodeUtil;
//# sourceMappingURL=unicode-util.js.map