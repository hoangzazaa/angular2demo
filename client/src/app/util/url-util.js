/*
 * URL に関するユーティリティ
 */
"use strict";
/**
 * Blob を data url に変換する
 *
 * @param blob Blob
 * @param callback data url 通知コールバック
 * @see https://stackoverflow.com/questions/23150333/html5-javascript-dataurl-to-blob-blob-to-dataurl
 */
function blobToDataURL(blob, callback) {
    var reader = new FileReader();
    reader.onload = function (e) { callback(e.target.result); };
    reader.readAsDataURL(blob);
}
exports.blobToDataURL = blobToDataURL;
//# sourceMappingURL=url-util.js.map