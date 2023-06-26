package vn.vnext.sefuri.sf.common;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.zip.GZIPOutputStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.inject.Inject;

import play.mvc.Controller;
import play.mvc.Result;
import vn.vnext.sefuri.sf.helper.RoleNeeded;
import vn.vnext.sefuri.sf.helper.SfrException;
import vn.vnext.sefuri.sf.helper.SfrExceptionCode;
import vn.vnext.sefuri.sf.json.common.AbstractJson;
import vn.vnext.sefuri.sf.json.common.DataJson;
import vn.vnext.sefuri.sf.json.common.ErrorJson;
import vn.vnext.sefuri.sf.json.common.ResponseJson;
import vn.vnext.sefuri.sf.service.SV001AuthService;
import vn.vnext.sefuri.sf.service.SV901DBLoggingService;
import vn.vnext.sefuri.sf.util.JsonUtil;

/**
 * Common controller include common function to deal with request/response
 *
 * @author haipt
 */
@RoleNeeded
public abstract class CommonCtrl extends Controller {
    private final Integer MAX_BYTES_ALLOWED = 20000;

    /**
     * ロガー
     */
    protected Logger logger = LoggerFactory.getLogger(this.getClass());

    @Inject
    protected SV001AuthService sv001AuthService;


    @Inject
    protected SV901DBLoggingService dbLoggingService;

    /**
     * Parse request into java object.
     *
     * @param clazz generic class
     * @return object data
     * @throws SfrException if data cannot mapping into object
     */
    protected <T extends AbstractJson> T requestJson(final Class<T> clazz) {
        String body = request().body().asBytes().decodeString("UTF-8");
        T data = JsonUtil.fromJson(body, clazz);
        // check if parse successful
        if (data == null) {
            // parse fail, throw exception
            throw new SfrException(SfrExceptionCode.ERR_INVALID_REQUEST);
        }
        // parse success, return data
        return data;
    }

    /**
     * Response normal with blank data
     *
     * @return response
     */
    protected Result responseOk() {
        return ok(Constants.STR_JSON_BLANK);
    }

    /**
     * Response normal with data.
     *
     * @param data data include into response
     * @return response
     */
    protected <T extends AbstractJson> Result responseJson(final T data, final String messageCode) {
        ResponseJson responseJson = new ResponseJson();
        DataJson res = new DataJson(data, messageCode);
        responseJson.setRes(res);

        return ok(JsonUtil.toJsonString(responseJson));
    }

    /** Creates a response with a gzipped string. Does NOT change the content-type. */
    public <T extends AbstractJson> Result responseUsingGzip(final T data, final String messageCode) {
        ResponseJson responseJson = new ResponseJson();
        DataJson res = new DataJson(data, messageCode);
        responseJson.setRes(res);

        try {
            final ByteArrayOutputStream gzip = gzip(JsonUtil.toJsonString(responseJson));
            response().setHeader("Content-Encoding", "gzip");
            response().setHeader("Content-Length", gzip.size() + "");
            return ok(gzip.toByteArray());
        }catch (IOException e) {
            return responseError(MessageCode.COM.ERR001);
        }
    }

    private ByteArrayOutputStream gzip(final String input)
            throws IOException {
        final InputStream inputStream = new ByteArrayInputStream(input.getBytes());
        final ByteArrayOutputStream stringOutputStream = new ByteArrayOutputStream((int) (input.length() * 0.75));
        final OutputStream gzipOutputStream = new GZIPOutputStream(stringOutputStream);

        final byte[] buf = new byte[MAX_BYTES_ALLOWED];
        int len;
        while ((len = inputStream.read(buf)) > 0) {
            gzipOutputStream.write(buf, 0, len);
        }

        inputStream.close();
        gzipOutputStream.close();

        return stringOutputStream;
    }

    /**
     * Response error with error code.
     *
     * @param errorCode error code to response
     * @return response
     */
    protected Result responseError(final String errorCode) {
        ResponseJson responseJson = new ResponseJson();
        ErrorJson error = new ErrorJson(errorCode);
        responseJson.setError(error);

        return ok(JsonUtil.toJsonString(responseJson));
    }

    /**
     * Get current user id.
     *
     * @return user id
     */
    protected Integer getUserId() {
        if (sv001AuthService.getCurrentUser() != null)
            return sv001AuthService.getCurrentUser().getId();

        return null;
    }

}
