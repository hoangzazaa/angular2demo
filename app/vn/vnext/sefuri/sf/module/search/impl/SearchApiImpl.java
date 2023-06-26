package vn.vnext.sefuri.sf.module.search.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import play.libs.Json;
import play.libs.ws.WSClient;
import play.libs.ws.WSResponse;
import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.json.SF00202.request.SF0020204Req;
import vn.vnext.sefuri.sf.json.SF00204.request.SF0020402Req;
import vn.vnext.sefuri.sf.json.SFN0401.request.SFN040101Req;
import vn.vnext.sefuri.sf.json.SFN0401.request.SFN040102Req;
import vn.vnext.sefuri.sf.module.jms.JmsApi;
import vn.vnext.sefuri.sf.module.search.SearchApi;
import vn.vnext.sefuri.sf.module.search.SearchResult;
import vn.vnext.sefuri.sf.module.search.builder.SFN0401Builder;
import vn.vnext.sefuri.sf.module.search.model.BaseModel;
import vn.vnext.sefuri.sf.util.DateUtil;
import vn.vnext.sefuri.sf.util.JsonUtil;
import vn.vnext.sefuri.sf.util.SettingUtil;

import javax.inject.Inject;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.CompletionStage;
import java.util.concurrent.ExecutionException;

/**
 * Created by Teddy on 3/31/2017.
 */
public class SearchApiImpl implements SearchApi {

    private static final Logger logger = LoggerFactory.getLogger(SearchApiImpl.class);


    private static final String DEAL_TYPE = "deal";

    private static final String PRODUCT_TYPE = "product";

    /* inject fields */
    private WSClient ws;
    private JmsApi jmsApi;

    @Inject
    public SearchApiImpl(WSClient ws, JmsApi jmsApi) {
        this.ws = ws;
        this.jmsApi = jmsApi;

//        this.jmsApi.sendReindexAllDealRequest("generateDataDeal");
//        this.jmsApi.sendReindexAllDealRequest("generateDataProduct");
    }

    private String getIndexName() {
        String indexName = SettingUtil.getString(SETTING, SETTING_INDEX, "tmpindex");
        return indexName;
    }

    private String getIndexName(String type) {
        String prefix = SettingUtil.getString(SETTING, SETTING_INDEX, "tmpindex");
        String indexName = prefix + "-" + type;
        return indexName;
    }

    protected String getEsUrl() {
        String indexName = SettingUtil.getString(SETTING, SETTING_SERVER, "http://localhost:9200");
        return indexName;
    }

    protected String generateUrl(String... args) {
        List<String> parts = new ArrayList<>();
        parts.add(getEsUrl());
        parts.addAll(Arrays.asList(args));
        return String.join(Constants.SLASH, parts);
    }

    protected CompletionStage<WSResponse> addIndex(String indexName, String typeName, BaseModel data) {
        String url = generateUrl(indexName, typeName, String.valueOf(data.getId()));
        return ws.url(url).put(JsonUtil.toJsonString(data));
    }

    @Override
    public SearchResult searchDeal(SF0020204Req req) {
        ObjectNode search = Json.newObject();
        // Bool query
        ObjectNode bool = Json.newObject();
        search.set("query", Json.newObject().set("bool", bool));
        if (CollectionUtils.isNotEmpty(req.getKeywords())) {
            ObjectNode must = Json.newObject();
            bool.set("must", must);
            //Match
            ObjectNode match = Json.newObject();
            must.set("match", match);
            //Search all
            ObjectNode _all = Json.newObject();
            match.set("_all", _all);
            //_All Query
            _all.put("query", String.join(" ", req.getKeywords()));
            _all.put("operator", "AND");
        }

        // filter
        ArrayNode mustBoolFilter = Json.newArray();

        // 対象期間
        if (req.getPeriodFrom() != null || req.getPeriodTo() != null) {
            ObjectNode period = Json.newObject();
            if (req.getPeriodFrom() != null) {
                period.put("gte", DateUtil.formatDate(req.getPeriodFrom()));
            }
            if (req.getPeriodTo() != null) {
                period.put("lte", DateUtil.formatDate(req.getPeriodTo()));
            }
            if (req.getPeriodType() == 1) {
                JsonNode range = Json.newObject().set("deliveryDate", period);
                mustBoolFilter.add(Json.newObject().set("range", range));
            } else {
                JsonNode range = Json.newObject().set("createdDate", period);
                mustBoolFilter.add(Json.newObject().set("range", range));
            }
        }

        // 得意先ID
        if (StringUtils.isNotBlank(req.getCustomerCode())) {
            ObjectNode matchPhrase = Json.newObject().put("customer.code", req.getCustomerCode());
            mustBoolFilter.add(Json.newObject().set("matchPhrase", matchPhrase));
        }
        // 得意先名
        if (StringUtils.isNotBlank(req.getCustomerName())) {
            ObjectNode matchPhrase = Json.newObject().put("customer.name", req.getCustomerName());
            mustBoolFilter.add(Json.newObject().set("matchPhrase", matchPhrase));
        }
        // 得意先担当者名
        if (StringUtils.isNotBlank(req.getContactName())) {
            ObjectNode matchPhrase = Json.newObject().put("customer.contactName", req.getContactName());
            mustBoolFilter.add(Json.newObject().set("matchPhrase", matchPhrase));
        }
        // 案件ID
        if (StringUtils.isNotBlank(req.getDealCode())) {
            ObjectNode matchPhrase = Json.newObject().put("code", req.getDealCode());
            mustBoolFilter.add(Json.newObject().set("matchPhrase", matchPhrase));
        }
        // 案件名
        if (StringUtils.isNotBlank(req.getDealName())) {
            ObjectNode matchPhrase = Json.newObject().put("name", req.getDealName());
            mustBoolFilter.add(Json.newObject().set("matchPhrase", matchPhrase));
        }
        // 担当営業名
        if (StringUtils.isNotBlank(req.getSalesName())) {
            ObjectNode matchPhrase = Json.newObject().put("salesName", req.getSalesName());
            mustBoolFilter.add(Json.newObject().set("matchPhrase", matchPhrase));
        }
        // 案件区分
        if (req.getDealType() >= 0 && req.getDealType() != 99) {
            ObjectNode matchPhrase = Json.newObject().put("dealType", req.getDealType());
            mustBoolFilter.add(Json.newObject().set("matchPhrase", matchPhrase));
        }
        // 製品ID
        if (StringUtils.isNotBlank(req.getProductCode())) {
            ObjectNode matchPhrase = Json.newObject().put("product.code", req.getProductCode());
            mustBoolFilter.add(Json.newObject().set("matchPhrase", matchPhrase));
        }
        // 製品名
        if (StringUtils.isNotBlank(req.getProductName())) {
            ObjectNode matchPhrase = Json.newObject().put("product.name", req.getProductName());
            mustBoolFilter.add(Json.newObject().set("matchPhrase", matchPhrase));
        }
        if (StringUtils.isNotBlank(req.getApplication())) {
            ObjectNode matchPhrase = Json.newObject().put("product.application", req.getApplication());
            mustBoolFilter.add(Json.newObject().set("matchPhrase", matchPhrase));
        }
        // 製品寸法 - 幅
        BigDecimal sizeApproximation = new BigDecimal(5);
        if (req.getSizeW() != null) {
            ObjectNode sizeW = Json.newObject();

            sizeW.put("gte", req.getSizeW().subtract(sizeApproximation));
            sizeW.put("lte", req.getSizeW().add(sizeApproximation));
            JsonNode range = Json.newObject().set("product.sizeW", sizeW);
            mustBoolFilter.add(Json.newObject().set("range", range));
        }
        // 製品寸法 - 奥行き
        if (req.getSizeD() != null) {
            ObjectNode sizeD = Json.newObject();

            sizeD.put("gte", req.getSizeD().subtract(sizeApproximation));
            sizeD.put("lte", req.getSizeD().add(sizeApproximation));

            JsonNode range = Json.newObject().set("product.sizeD", sizeD);
            mustBoolFilter.add(Json.newObject().set("range", range));
        }
        // 製品寸法 - 高さ
        if (req.getSizeH() != null) {
            ObjectNode sizeH = Json.newObject();
            sizeH.put("gte", req.getSizeH().subtract(sizeApproximation));
            sizeH.put("lte", req.getSizeH().add(sizeApproximation));
            JsonNode range = Json.newObject().set("product.sizeH", sizeH);
            mustBoolFilter.add(Json.newObject().set("range", range));
        }
        // 原紙
        if (StringUtils.isNotBlank(req.getPaperName())) {

            ObjectNode matchPhrase = Json.newObject().put("product.paperName", req.getPaperName());
            mustBoolFilter.add(Json.newObject().set("matchPhrase", matchPhrase));
        }
        //紙器タイプ
        if (req.getShapeId() != null && req.getShapeId() > 0) {
            ObjectNode matchPhrase = Json.newObject().put("product.shapeId", req.getShapeId());
            mustBoolFilter.add(Json.newObject().set("matchPhrase", matchPhrase));
        }
        // 印刷方法
        if (req.getPrintMethod() > 0) {
            ObjectNode matchPhrase = Json.newObject().put("product.printMethod", req.getPrintMethod());
            mustBoolFilter.add(Json.newObject().set("matchPhrase", matchPhrase));
        }
        // 受注金額
        if (req.getOrderValueFrom() != null || req.getOrderValueTo() != null) {
            ObjectNode orderValue = Json.newObject();
            if (req.getOrderValueFrom() != null) {
                orderValue.put("gte", req.getOrderValueFrom());
            }
            if (req.getOrderValueTo() != null) {
                orderValue.put("lte", req.getOrderValueTo());
            }
            JsonNode range = Json.newObject().set("orderItem.value", orderValue);
            mustBoolFilter.add(Json.newObject().set("range", range));
        }
        // ロット数
        if (req.getLotFrom() != null || req.getLotTo() != null) {
            ObjectNode lot = Json.newObject();

            if (req.getOrderValueFrom() != null) {
                lot.put("gte", req.getLotFrom());
            }
            if (req.getOrderValueTo() != null) {
                lot.put("lte", req.getLotTo());
            }
            JsonNode range = Json.newObject().set("orderItem.lot", lot);
            mustBoolFilter.add(Json.newObject().set("range", range));
        }
        // 納品ステータス
        if (req.getDealStatus() > 0) {
            ObjectNode matchPhrase = Json.newObject().put("dealStatus", req.getDealStatus());
            mustBoolFilter.add(Json.newObject().set("matchPhrase", matchPhrase));
        }

        if (mustBoolFilter.size() > 0) {
            bool.set("filter", Json.newObject().set("bool", Json.newObject().set("must", mustBoolFilter)));
        }

        // sorting result by 'updatedDate' as descending
        ObjectNode sortedBy = Json.newObject().put("updatedDate", "desc");
        search.set("sort", sortedBy);

        return doSearch(DEAL_TYPE, search.toString(), req.getPageIndex(), req.getPageSize());
    }

    @Override
    public SearchResult searchProduct(SF0020402Req req) {
        ObjectNode search = Json.newObject();
        //Bool query
        ObjectNode bool = Json.newObject();
        search.set("query", Json.newObject().set("bool", bool));
        if (CollectionUtils.isNotEmpty(req.getKeywords())) {
            ObjectNode must = Json.newObject();
            bool.set("must", must);
            //Match
            ObjectNode match = Json.newObject();
            must.set("match", match);
            //Search all
            ObjectNode _all = Json.newObject();
            match.set("_all", _all);
            //_All Query
            _all.put("query", String.join(" ", req.getKeywords()));
            _all.put("operator", "AND");
        }
        ArrayNode mustBoolFilter = Json.newArray();

        // 対象期間
        if (req.getPeriodFrom() != null || req.getPeriodTo() != null) {
            ObjectNode period = Json.newObject();
            if (req.getPeriodFrom() != null) {
                period.put("gte", DateUtil.formatDate(req.getPeriodFrom()));
            }
            if (req.getPeriodTo() != null) {
                period.put("lte", DateUtil.formatDate(req.getPeriodTo()));
            }
            if (req.getPeriodType() == 1) {
                JsonNode range = Json.newObject().set("deal.deliveryDate", period);
                mustBoolFilter.add(Json.newObject().set("range", range));
            } else {
                JsonNode range = Json.newObject().set("deal.createdDate", period);
                mustBoolFilter.add(Json.newObject().set("range", range));
            }
        }
        // 得意先ID
        if (StringUtils.isNotBlank(req.getCustomerCode())) {
            ObjectNode matchPhrase = Json.newObject().put("deal.customer.code", req.getCustomerCode());
            mustBoolFilter.add(Json.newObject().set("matchPhrase", matchPhrase));
        }
        // 得意先名
        if (StringUtils.isNotBlank(req.getCustomerName())) {
            ObjectNode matchPhrase = Json.newObject().put("deal.customer.name", req.getCustomerName());
            mustBoolFilter.add(Json.newObject().set("matchPhrase", matchPhrase));
        }
        // 得意先担当者名
        if (StringUtils.isNotBlank(req.getContactName())) {
            ObjectNode matchPhrase = Json.newObject().put("deal.customer.contactName", req.getContactName());
            mustBoolFilter.add(Json.newObject().set("matchPhrase", matchPhrase));
        }
        // 案件ID
        if (StringUtils.isNotBlank(req.getDealCode())) {
            ObjectNode matchPhrase = Json.newObject().put("deal.code", req.getDealCode());
            mustBoolFilter.add(Json.newObject().set("matchPhrase", matchPhrase));
        }
        // 案件名\
        if (StringUtils.isNotBlank(req.getDealName())) {
            ObjectNode matchPhrase = Json.newObject().put("deal.name", req.getDealName());
            mustBoolFilter.add(Json.newObject().set("matchPhrase", matchPhrase));
        }
        // 担当営業名
        if (StringUtils.isNotBlank(req.getSalesName())) {
            ObjectNode matchPhrase = Json.newObject().put("deal.salesName", req.getSalesName());
            mustBoolFilter.add(Json.newObject().set("matchPhrase", matchPhrase));
        }
        // 案件区分
        if (req.getDealType() == 0 || req.getDealType() == 1) {
            ObjectNode matchPhrase = Json.newObject().put("deal.dealType", req.getDealType());
            mustBoolFilter.add(Json.newObject().set("matchPhrase", matchPhrase));
        }
        // 製品ID
        if (StringUtils.isNotBlank(req.getProductCode())) {
            ObjectNode matchPhrase = Json.newObject().put("code", req.getProductCode());
            mustBoolFilter.add(Json.newObject().set("matchPhrase", matchPhrase));
        }
        // 製品名
        if (StringUtils.isNotBlank(req.getProductName())) {
            ObjectNode matchPhrase = Json.newObject().put("name", req.getProductName());
            mustBoolFilter.add(Json.newObject().set("matchPhrase", matchPhrase));
        }
        if (StringUtils.isNotBlank(req.getApplication())) {
            ObjectNode matchPhrase = Json.newObject().put("application", req.getApplication());
            mustBoolFilter.add(Json.newObject().set("matchPhrase", matchPhrase));
        }
        if (StringUtils.isNotBlank(req.getCustomerProductCode())) {
            ObjectNode matchPhrase = Json.newObject().put("customerProductCode", req.getCustomerProductCode());
            mustBoolFilter.add(Json.newObject().set("matchPhrase", matchPhrase));
        }
        // 製品寸法 - 幅
        BigDecimal sizeApproximation = new BigDecimal(5);
        if (req.getSizeW() != null) {
            ObjectNode sizeW = Json.newObject();

            sizeW.put("gte", req.getSizeW().subtract(sizeApproximation));
            sizeW.put("lte", req.getSizeW().add(sizeApproximation));
            JsonNode range = Json.newObject().set("sizeW", sizeW);
            mustBoolFilter.add(Json.newObject().set("range", range));
        }
        // 製品寸法 - 奥行き
        if (req.getSizeD() != null) {
            ObjectNode sizeD = Json.newObject();

            sizeD.put("gte", req.getSizeD().subtract(sizeApproximation));
            sizeD.put("lte", req.getSizeD().add(sizeApproximation));

            JsonNode range = Json.newObject().set("sizeD", sizeD);
            mustBoolFilter.add(Json.newObject().set("range", range));
        }
        // 製品寸法 - 高さ
        if (req.getSizeH() != null) {
            ObjectNode sizeH = Json.newObject();
            sizeH.put("gte", req.getSizeH().subtract(sizeApproximation));
            sizeH.put("lte", req.getSizeH().add(sizeApproximation));
            JsonNode range = Json.newObject().set("sizeH", sizeH);
            mustBoolFilter.add(Json.newObject().set("range", range));
        }
        // 原紙
        if (StringUtils.isNotBlank(req.getPaperName())) {

            ObjectNode matchPhrase = Json.newObject().put("paperName", req.getPaperName());
            mustBoolFilter.add(Json.newObject().set("matchPhrase", matchPhrase));
        }
        //紙器タイプ
        if (req.getShapeId() != null && req.getShapeId() > 0) {
            ObjectNode matchPhrase = Json.newObject().put("shapeId", req.getShapeId());
            mustBoolFilter.add(Json.newObject().set("matchPhrase", matchPhrase));
        }
        // 印刷方法
        if (req.getPrintMethod() > 0) {
            ObjectNode matchPhrase = Json.newObject().put("printMethod", req.getPrintMethod());
            mustBoolFilter.add(Json.newObject().set("matchPhrase", matchPhrase));
        }
        // 受注金額
        if (req.getOrderValueFrom() != null || req.getOrderValueTo() != null) {
            ObjectNode orderValue = Json.newObject();
            if (req.getOrderValueFrom() != null) {
                orderValue.put("gte", req.getOrderValueFrom().toPlainString());
            }
            if (req.getOrderValueTo() != null) {
                orderValue.put("lte", req.getOrderValueTo().toPlainString());
            }
            JsonNode range = Json.newObject().set("deal.orderItem.value", orderValue);
            mustBoolFilter.add(Json.newObject().set("range", range));
        }
        // ロット数
        if (req.getLotFrom() != null || req.getLotTo() != null) {
            ObjectNode lot = Json.newObject();

            if (req.getOrderValueFrom() != null) {
                lot.put("gte", req.getLotFrom());
            }
            if (req.getOrderValueTo() != null) {
                lot.put("lte", req.getLotTo());
            }
            JsonNode range = Json.newObject().set("deal.orderItem.lot", lot);
            mustBoolFilter.add(Json.newObject().set("range", range));
        }
        // 納品ステータス
        if (req.getDealStatus() > 0) {
            ObjectNode matchPhrase = Json.newObject().put("deal.dealStatus", req.getDealStatus());
            mustBoolFilter.add(Json.newObject().set("matchPhrase", matchPhrase));
        }

        if (mustBoolFilter.size() > 0) {
            bool.set("filter", Json.newObject().set("bool", Json.newObject().set("must", mustBoolFilter)));
        }

        // sorting result by 'updatedDate' as descending
        ObjectNode sortedBy = Json.newObject().put("updatedDate", "desc");
        search.set("sort", sortedBy);

        return doSearch(PRODUCT_TYPE, search.toString(), req.getPageIndex(), req.getPageSize());
    }

    private SearchResult doSearch(String type, String query, int page, int pageSize) {
        if (query.equals("{\"query\":{\"bool\":{}}}")) {
            return null;
        }
        List<Integer> resultList = new ArrayList<>();

        String url = generateUrl(getIndexName(), type, "_search");
        if (page > 1) {
            url = url + "?size=" + pageSize;
            if (pageSize > 0) {
                url = url + "&from=" + (page - 1) * pageSize;
            }
        }
        WSResponse wsResponse = null;
        try {
            wsResponse = ws.url(url).post(query).toCompletableFuture().get();
        } catch (InterruptedException | ExecutionException e) {
            logger.error("search error", e);
            return new SearchResult();
        }
        JsonNode response = wsResponse.asJson();
        JsonNode hits = response.get("hits");

        int count = 0;
        if (hits != null) {
            count = hits.get("total").asInt(0);
            hits = hits.get("hits");
            if (hits.isArray()) {
                for (final JsonNode hit : hits) {
                    int id = hit.get("_id").asInt();
                    resultList.add(id);
                }
            }
        }
        return new SearchResult(count, resultList);
    }

    @Override
    public SearchResult sfn040101(SFN040101Req req) {
        String query = SFN0401Builder.build(req);

        String indexName = getIndexName("customer");
        return doSearch(indexName, "customer", query, req.getPage(), PAGE_SIZE);
    }

    @Override
    public SearchResult sfn040102(SFN040102Req req) {
        String query = SFN0401Builder.build(req);

        String indexName = getIndexName("supplier");
        return doSearch(indexName, "supplier", query, req.getPage(), PAGE_SIZE);
    }

    private SearchResult doSearch(String index, String type, String query, int page, int pageSize) {
        List<Integer> resultList = new ArrayList<>();

        String url = generateUrl(index, type, "_search");
        if (page > 1) {
            url = url + "?size=" + pageSize;
            if (pageSize > 0) {
                url = url + "&from=" + (page - 1) * pageSize;
            }
        }
        WSResponse wsResponse = null;
        try {
            wsResponse = ws.url(url).post(query).toCompletableFuture().get();
        } catch (InterruptedException | ExecutionException e) {
            logger.error("search error", e);
            return new SearchResult();
        }
        JsonNode response = wsResponse.asJson();
        JsonNode hits = response.get("hits");

        int count = 0;
        if (hits != null) {
            count = hits.get("total").asInt(0);
            hits = hits.get("hits");
            if (hits.isArray()) {
                for (final JsonNode hit : hits) {
                    int id = hit.get("_id").asInt();
                    resultList.add(id);
                }
            }
        }
        return new SearchResult(count, resultList);
    }
}
