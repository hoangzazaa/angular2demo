
/**
 * PDF 出力機能等ファイル名を返す応答 (JSON)
 *
 * <p>対応する Java クラスは vn.vnext.sefuri.sf.json.response.FileNameRes
 */
export interface FileNameResJson {
    /** ファイル名 */
    fileName: string;
    /** ファイル取得パス */
    filePath: string;
}
