package vn.vnext.sefuri.sf.json.response;

import vn.vnext.sefuri.sf.dto.FileDto;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

import java.io.File;

/**
 * Created by TungNT on 1/16/2017.
 */
public class SV006Res extends AbstractJson {
    private String fileName;
    private File file;
    private FileDto fileDto;
    private File sv00604File;

    public File getFile() {
        return file;
    }

    public void setFile(File file) {
        this.file = file;
    }

    public FileDto getFileDto() {
        return fileDto;
    }

    public void setFileDto(FileDto fileDto) {
        this.fileDto = fileDto;
    }

    public File getSv00604File() {
        return sv00604File;
    }

    public void setSv00604File(File sv00604File) {
        this.sv00604File = sv00604File;
    }

    public String getFileName() {

        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }
}
