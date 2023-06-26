package vn.vnext.sefuri.sf.json.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import vn.vnext.sefuri.sf.json.common.AbstractJson;

/**
 * PDF 出力機能等ファイル名を返す応答 (JSON)
 *
 * <p>対応する TypeScript は client/src/app/response/FileNameResJson.ts
 */
public class FileNameRes extends AbstractJson {

    /** ファイル名 */
    @JsonProperty("fileName")
    private String fileName;

    /** ファイル取得パス */
    @JsonProperty("filePath")
    private String filePath;

    /**
     * @return ファイル名
     */
    public String getFileName() {
        return fileName;
    }

    /**
     * @param fileName ファイル名
     */
    public void setFileName(final String fileName) {
        this.fileName = fileName;
    }

    /**
     * @return ファイル取得パス
     */
    public String getFilePath() {
        return filePath;
    }

    /**
     * @param filePath ファイル取得パス
     */
    public void setFilePath(final String filePath) {
        this.filePath = filePath;
    }
}
