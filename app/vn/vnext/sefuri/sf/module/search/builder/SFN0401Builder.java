package vn.vnext.sefuri.sf.module.search.builder;

import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.google.common.base.Strings;
import org.apache.commons.lang3.StringUtils;
import play.libs.Json;
import vn.vnext.sefuri.sf.json.SFN0401.request.SFN040101Req;
import vn.vnext.sefuri.sf.json.SFN0401.request.SFN040102Req;

/**
 * Created by Teddy on 7/27/2017.
 */
public class SFN0401Builder extends CommonBuilder {

    public static String build(SFN040101Req req) {

        // create root
        ObjectNode search = CommonBuilder.buildRoot();
        // Bool query
        ObjectNode bool = Json.newObject();
        search.set("query", Json.newObject().set("bool", bool));
        ObjectNode keywordsNode = CommonBuilder.buildKeywords(req.getKeywords());
        if (keywordsNode != null) {
            bool.set("must", keywordsNode);
        }

        // filter
        ArrayNode mustBoolFilter = Json.newArray();

        // 得意先ID
        if (StringUtils.isNotBlank(req.getCode())) {
            ObjectNode matchPhrase = Json.newObject();
            String code = req.getCode();
            if(code.length() < 7) {
                code = Strings.padStart(code, 7, '0');
            }
            matchPhrase.put("code", code);
            mustBoolFilter.add(Json.newObject().set("matchPhrase", matchPhrase));
        }
        // 得意先名
        if (StringUtils.isNotBlank(req.getName())) {
            ObjectNode matchPhrase = Json.newObject().put("name", req.getName());
            mustBoolFilter.add(Json.newObject().set("matchPhrase", matchPhrase));
        }
        // 得意先担当者名
        if (StringUtils.isNotBlank(req.getContactName())) {
            ObjectNode matchPhrase = Json.newObject().put("contactName", req.getContactName());
            mustBoolFilter.add(Json.newObject().set("matchPhrase", matchPhrase));
        }
        // 担当営業名
        if (StringUtils.isNotBlank(req.getSalesName())) {
            ObjectNode matchPhrase = Json.newObject().put("salesName", req.getSalesName());
            mustBoolFilter.add(Json.newObject().set("matchPhrase", matchPhrase));
        }

        if (mustBoolFilter.size() > 0) {
            bool.set("filter", Json.newObject().set("bool", Json.newObject().set("must", mustBoolFilter)));
        }

        return search.toString();
    }

    public static String build(SFN040102Req req) {

        // create root
        ObjectNode search = CommonBuilder.buildRoot();
        // Bool query
        ObjectNode bool = Json.newObject();
        search.set("query", Json.newObject().set("bool", bool));
        ObjectNode keywordsNode = CommonBuilder.buildKeywords(req.getKeywords());
        if (keywordsNode != null) {
            bool.set("must", keywordsNode);
        }

        // filter
        ArrayNode mustBoolFilter = Json.newArray();

        // 得意先ID
        if (StringUtils.isNotBlank(req.getCode())) {
            ObjectNode matchPhrase = Json.newObject().put("code", req.getCode());
            mustBoolFilter.add(Json.newObject().set("matchPhrase", matchPhrase));
        }
        // 得意先名
        if (StringUtils.isNotBlank(req.getName())) {
            ObjectNode matchPhrase = Json.newObject().put("name", req.getName());
            mustBoolFilter.add(Json.newObject().set("matchPhrase", matchPhrase));
        }
        // 得意先担当者名
        if (StringUtils.isNotBlank(req.getContactName())) {
            ObjectNode matchPhrase = Json.newObject().put("contactName", req.getContactName());
            mustBoolFilter.add(Json.newObject().set("matchPhrase", matchPhrase));
        }
        // 担当営業名 (no implement)

        if (mustBoolFilter.size() > 0) {
            bool.set("filter", Json.newObject().set("bool", Json.newObject().set("must", mustBoolFilter)));
        }

        return search.toString();
    }
}
