package vn.vnext.sefuri.sf.helper;

/**
 * Created by Teddy on 17/09/2016.
 */
public class SfrException extends RuntimeException {

    private SfrExceptionCode errCode;

    public SfrException(SfrExceptionCode errCode) {
        this.errCode = errCode;
    }

    public SfrExceptionCode getErrCode() {
        return errCode;
    }

    public String getMessageId() {
        return errCode.name();
    }

    public void setMessageId(SfrExceptionCode messageId) {
        this.errCode = errCode;
    }


}
