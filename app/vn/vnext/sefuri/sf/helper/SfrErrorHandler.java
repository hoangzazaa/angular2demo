package vn.vnext.sefuri.sf.helper;

import play.Configuration;
import play.Environment;
import play.api.OptionalSourceMapper;
import play.api.routing.Router;
import play.http.DefaultHttpErrorHandler;
import play.mvc.Http;
import play.mvc.Result;
import vn.vnext.sefuri.sf.json.common.ErrorJson;
import vn.vnext.sefuri.sf.json.common.ResponseJson;
import vn.vnext.sefuri.sf.util.JsonUtil;

import javax.inject.Inject;
import javax.inject.Provider;
import javax.inject.Singleton;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;

import static play.mvc.Results.badRequest;
import static play.mvc.Results.ok;

/**
 * Created by Teddy on 17/09/2016.
 */

@Singleton
public class SfrErrorHandler extends DefaultHttpErrorHandler {

    @Inject
    public SfrErrorHandler(Configuration configuration, Environment environment, OptionalSourceMapper sourceMapper,
                           Provider<Router> routes) {
        super(configuration, environment, sourceMapper, routes);
    }

    @Override
    public CompletionStage<Result> onServerError(Http.RequestHeader request, Throwable exception) {
        if (exception instanceof SfrException) {
            return CompletableFuture.completedFuture(onSfrException((SfrException) exception));
        } else {
            return super.onServerError(request, exception);
        }
    }

    private Result onSfrException(SfrException exception) {
        SfrExceptionCode errCode = exception.getErrCode();
        if (errCode == SfrExceptionCode.ERR_INVALID_REQUEST) {
            return badRequest();
        } else {
            return responseError(exception.getMessageId());
        }
    }

    /**
     * response error with error code
     *
     * @param errCode error code to response
     * @return response
     */
    protected Result responseError(final String errCode) {
        ResponseJson responseJson = new ResponseJson();
        ErrorJson error = new ErrorJson(errCode);
        responseJson.setError(error);

        return ok(JsonUtil.toJsonString(responseJson));
    }
}
