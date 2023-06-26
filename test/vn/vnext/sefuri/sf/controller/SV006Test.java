package vn.vnext.sefuri.sf.controller;

import org.junit.Test;
import play.mvc.Http;
import play.mvc.Result;
import vn.vnext.sefuri.sf.common.MessageCode;
import vn.vnext.sefuri.sf.json.response.CM0010101Res;
import vn.vnext.sefuri.sf.json.response.CM0010102Res;
import vn.vnext.sefuri.sf.json.response.SV006Res;
import vn.vnext.sefuri.sf.testCommon.CommonCtrlTest;
import vn.vnext.sefuri.sf.testCommon.ResponseDataHelper;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static junit.framework.TestCase.assertEquals;

import play.api.libs.Files.TemporaryFile;
import play.api.mvc.AnyContentAsMultipartFormData;
import play.mvc.Http.MultipartFormData.*;
import play.test.FakeRequest;

import static play.test.Helpers.*;

import akka.stream.Materializer;
import akka.util.ByteString;
import akka.stream.javadsl.FileIO;
import akka.stream.javadsl.Source;
import vn.vnext.sefuri.sf.util.MessagesUtil;

/**
 * Created by TungNT on 1/16/2017.
 */
public class SV006Test extends CommonCtrlTest {
    private static final String PATH = MessagesUtil.getPropertyValue("directory.properties", "JSON_FOR_AUTOMATION_TEST");

    /**
     * Upload File As TempFile OK
     */
    @Test
    public void CM0010101_01() {
        String fileName = PATH + "SF0030102_01.json";

        Materializer mat = app.injector().instanceOf(Materializer.class);
        DataPart dp = new DataPart("hello", "world");
        Source<ByteString, ?> src = FileIO.fromFile(new File(fileName));
        FilePart<Source<ByteString, ?>> fp = new FilePart<>("file", "SF0030102_01.json", "text/plain", src);

        Http.RequestBuilder reqBuilder = fakeRequest("POST", "/CM0010101")
                .bodyMultipart(Arrays.asList(dp, fp), mat);
        Result result = routeWithOnError(reqBuilder);

        ResponseDataHelper<CM0010101Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(CM0010101Res.class, result);

        // check result
        assertEquals(MessageCode.CM00101.INF001, resResponseDataHelper.getMessageCode());
        assertEquals(resResponseDataHelper.getErrorCode(), null);
    }

    /**
     * Upload File As TempFile Error
     */
    @Test
    public void CM0010101_02() {
        String fileName = PATH + "SF0030102_01.json";

        Materializer mat = app.injector().instanceOf(Materializer.class);
        DataPart dp = new DataPart("hello", "world");
        Source<ByteString, ?> src = FileIO.fromFile(new File(fileName));
        FilePart<Source<ByteString, ?>> fp = new FilePart<>("file1", "SF0030102_01.json", "text/plain", src);

        Http.RequestBuilder reqBuilder = fakeRequest("POST", "/CM0010101")
                .bodyMultipart(Arrays.asList(dp, fp), mat);
        Result result = routeWithOnError(reqBuilder);

        ResponseDataHelper<CM0010101Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(CM0010101Res.class, result);

        // check result
        // 2.0 Check responseData
        assertEquals(null, resResponseDataHelper.getMessageCode());
        assertEquals(resResponseDataHelper.getErrorCode(), MessageCode.CM00101.ERR001);
    }

    /**
     * Get Temp File OK
     */
    @Test
    public void CM0010102() {
        String fileName = "e4621951887a9b03c194f8cc3c41da6abd98c5f0";
        // 1.0 login user
        loginUser("hoangtd@vnext", "123456");
        Result result = sendGetRequest("/CM0010102/" + fileName, true);
        ResponseDataHelper<CM0010102Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(CM0010102Res.class, result);
        //
        assertEquals(MessageCode.CM00101.INF001, resResponseDataHelper.getMessageCode());
        assertEquals(resResponseDataHelper.getErrorCode(), null);
    }

    /**
     * sv00604
     */
    @Test
    public void CM0010103() {
        Integer fileId = 7;
        // 1.0 login user
        loginUser("hoangtd@vnext", "123456");
        Result result = sendGetRequest("/CM0010103/" + fileId, true);
        ResponseDataHelper<CM0010102Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(CM0010102Res.class, result);
        //
        assertEquals(MessageCode.CM00101.INF001, resResponseDataHelper.getMessageCode());
        assertEquals(resResponseDataHelper.getErrorCode(), null);
    }


}

