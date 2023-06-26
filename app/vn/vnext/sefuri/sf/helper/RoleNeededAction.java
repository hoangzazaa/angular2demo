package vn.vnext.sefuri.sf.helper;

import play.mvc.Action;
import play.mvc.Http;
import play.mvc.Result;
import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.service.SV001AuthService;

import javax.inject.Inject;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;

import static play.mvc.Controller.response;

/**
 * Created by haipt on 9/19/2016.
 */
public class RoleNeededAction extends Action<RoleNeeded> implements Constants {

    @Inject
    private SV001AuthService sv001AuthService;


    public CompletionStage<Result> call(Http.Context ctx) {
        Http.Cookie cookie = ctx.request().cookie(COOKIE_TOKEN);
        if (cookie == null) {
            return CompletableFuture.supplyAsync(() -> unauthorized());
        }
        boolean isAuth = sv001AuthService.sv00102AuthenticateUser(cookie.value());
        if (isAuth) {
            String userRole = String.valueOf(sv001AuthService.getCurrentUser().getRole());
            Set<String> roleNeeded = new HashSet<>(Arrays.asList(configuration.value()));
            if (!roleNeeded.isEmpty() && roleNeeded.contains(userRole)) {
                return CompletableFuture.supplyAsync(() -> forbidden());
            }
            CompletionStage<Result> call = delegate.call(ctx);
            return call;
        } else {
            response().discardCookie(COOKIE_TOKEN);
            return CompletableFuture.supplyAsync(() -> unauthorized());
        }
    }
}