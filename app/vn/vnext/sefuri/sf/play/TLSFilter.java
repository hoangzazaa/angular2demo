package vn.vnext.sefuri.sf.play;

import akka.stream.Materializer;
import play.api.Play;
import play.mvc.Filter;
import play.mvc.Http;
import play.mvc.Result;
import play.mvc.Results;

import javax.inject.Inject;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;
import java.util.function.Function;

/**
 * Created by haipt on 3/10/2017.
 */
public class TLSFilter extends Filter {

    @Inject
    public TLSFilter(Materializer mat) {
        super(mat);
    }

    @Override
    public CompletionStage<Result> apply(Function<Http.RequestHeader, CompletionStage<Result>> next, Http.RequestHeader rh) {
        if (Play.current().isProd()) {
            if (rh.secure() == false) {
                return CompletableFuture.completedFuture(Results.movedPermanently("https://".concat(rh.host().concat(rh.uri()))));
            }
        }
        return next.apply(rh).toCompletableFuture();
    }
}