package vn.vnext.sefuri.sf.testCommon;

import com.google.common.collect.ImmutableMap;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import play.Application;
import play.Logger;
import play.db.Database;
import play.db.Databases;
import play.db.evolutions.Evolution;
import play.db.evolutions.Evolutions;
import play.inject.guice.GuiceApplicationBuilder;
import play.mvc.Http;
import play.mvc.Result;
import play.test.WithApplication;
import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.helper.SfrErrorHandler;
import vn.vnext.sefuri.sf.helper.SfrException;
import vn.vnext.sefuri.sf.testdata.BaseData;
import vn.vnext.sefuri.sf.util.MessagesUtil;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.util.concurrent.*;
import java.util.function.BiFunction;

import static junit.framework.TestCase.assertEquals;
import static play.mvc.Http.Status.OK;
import static play.test.Helpers.fakeRequest;
import static play.test.Helpers.route;

/**
 * Created by haipt on 10/17/2016.
 */
public class CommonCtrlTest extends WithApplication {

    protected static Database database;
    protected Http.Cookie tokenCookie;
    private static final String PATH = MessagesUtil.getPropertyValue("directory.properties", "JSON_FOR_AUTOMATION_TEST");

    @BeforeClass
    public static void setupDatabase() {
        database = Databases.createFrom(
                "com.mysql.jdbc.Driver",
                "jdbc:mysql://localhost:3306/sfr_sf_test01?characterEncoding=UTF-8",
                ImmutableMap.of(
                        "username", "root",
                        "password", ""
                ));
    }

    @AfterClass
    public static void closeDatabase() {
        database.shutdown();
    }

    @Override
    protected Application provideApplication() {
        return new GuiceApplicationBuilder()
                .configure("play.http.router", "router.Routes")
                .build();
    }

    @After
    public void cleanupDatabase() {
        Evolutions.cleanupEvolutions(database);
    }

    public void checkForSelect(String selectSql, String... expectedResult) {
        if(expectedResult == null) {
            assertEquals(false, true);
        }
        database.withConnection(connection -> {
            ResultSet rs = connection.createStatement().executeQuery(selectSql);
            rs.next();
            int i = 1;
            for(String result : expectedResult) {
                assertEquals(rs.getString(i), result);
                i++;
            }
        });
    }

    public void checkForDelete(String deleteSql) {
        database.withConnection(connection -> {
            ResultSet rs = connection.createStatement().executeQuery(deleteSql);
            assertEquals(false, rs.next());
        });
    }

    protected void prepareData(BaseData... datas) {
        Evolution[] evolutions = new Evolution[datas.length];
        for (int i = 0; i < datas.length; i++) {
            evolutions[i] = datas[i].getEvolutionReader(i);
        }
        Evolutions.applyEvolutions(database, Evolutions.forDefault(evolutions));
    }

    protected Http.Cookie loginUser(String username, String password) {
        // prepare data
        String req = "{\"email\":\"" + username + "\",\"password\":\"" + password + "\"}";
        // send login request
        Result result = sendPostRequest("/CC00101", req, false);
        // confirm response
        assertEquals(OK, result.status());
        // extract cookie
        tokenCookie = result.cookie(Constants.COOKIE_TOKEN);
        return tokenCookie;
    }

    public Result sendGetRequest(String path, boolean isAuth) {
        Http.RequestBuilder reqBuilder = fakeRequest("GET", path);
        if (isAuth) {
            reqBuilder.cookie(tokenCookie);
        }
        return routeWithOnError(reqBuilder);
    }

    public Result sendPostRequest(String path, String body, boolean isAuth) {
        Http.RequestBuilder reqBuilder = fakeRequest("POST", path).bodyText(body);
        if (isAuth) {
            reqBuilder.cookie(tokenCookie);
        }
        return routeWithOnError(reqBuilder);
    }

    public Result routeWithOnError(Http.RequestBuilder requestBuilder) {
        CompletableFuture<Result> future = CompletableFuture.supplyAsync(() -> route(requestBuilder));

        BiFunction<Result, Throwable, CompletionStage<Result>> f = (r, t) -> {
            if (t != null) {
                if (t.getCause() instanceof SfrException) {
                    return new SfrErrorHandler(app.configuration(), null, null, null).onServerError(null, t.getCause());
                } else {
                    Logger.error("test", t.getCause());
                    throw new RuntimeException();
                }
            } else {
                return CompletableFuture.supplyAsync(() -> r);
            }
        };

        try {
            return future.handleAsync(f).thenCompose(x -> x).get(2000000, TimeUnit.MILLISECONDS);
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        } catch (TimeoutException e) {
            e.printStackTrace();
        }
        return null;
    }

    public String loadJsonData(String fileName) {
        fileName = PATH + fileName;
        BufferedReader br = null;
        FileReader fr = null;

        StringBuilder data = new StringBuilder();

        try {
            fr = new FileReader(fileName);
            br = new BufferedReader(fr);
            String sCurrentLine;
            br = new BufferedReader(new FileReader(fileName));
            while ((sCurrentLine = br.readLine()) != null) {
                data.append(sCurrentLine);
            }
            return data.toString();
        } catch (IOException e) {
            e.printStackTrace();

        } finally {
            try {
                if (br != null)
                    br.close();
                if (fr != null)
                    fr.close();
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }
        return null;
    }
}
