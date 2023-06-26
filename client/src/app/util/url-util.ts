/*
 * URL に関するユーティリティ
 */


 /**
  * Blob を data url に変換する
  *
  * @param blob Blob
  * @param callback data url 通知コールバック
  * @see https://stackoverflow.com/questions/23150333/html5-javascript-dataurl-to-blob-blob-to-dataurl
  */
 export function blobToDataURL(blob: Blob, callback: (string) => any) {
    var reader = new FileReader();
    reader.onload = function(e) { callback((e.target as any).result); }
    reader.readAsDataURL(blob);
}
