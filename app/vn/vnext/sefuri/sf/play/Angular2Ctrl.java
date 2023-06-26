package vn.vnext.sefuri.sf.play;


import play.mvc.Controller;
import play.mvc.Result;

/**
 * Created by haipt on 8/4/2017.
 */
public class Angular2Ctrl extends Controller {

    public Result matchAll(String path) {
        return ok(Angular2Ctrl.class.getResourceAsStream("/public/dist/index.html")).as("text/html");
    }

}