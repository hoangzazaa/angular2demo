package vn.vnext.sefuri.sf.controller.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.CollectionUtils;
import org.joda.time.DateTime;

import com.google.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import play.mvc.Result;
import vn.vnext.sefuri.sf.common.CommonCtrl;
import vn.vnext.sefuri.sf.common.MessageCode;
import vn.vnext.sefuri.sf.controller.SF00503Ctrl;
import vn.vnext.sefuri.sf.dto.CustomerDataDto;
import vn.vnext.sefuri.sf.dto.CustomerDto;
import vn.vnext.sefuri.sf.dto.CustomerGoalDto;
import vn.vnext.sefuri.sf.dto.CustomerGoalItemDto;
import vn.vnext.sefuri.sf.dto.DepartmentDto;
import vn.vnext.sefuri.sf.dto.DepartmentGoalDto;
import vn.vnext.sefuri.sf.dto.DepartmentGoalItemDto;
import vn.vnext.sefuri.sf.dto.SalerDataDto;
import vn.vnext.sefuri.sf.dto.UserDto;
import vn.vnext.sefuri.sf.json.core.CustomCustomerGoalJson;
import vn.vnext.sefuri.sf.json.core.CustomerDataItemJson;
import vn.vnext.sefuri.sf.json.core.CustomerGoalItemJson;
import vn.vnext.sefuri.sf.json.core.CustomerGoalJson;
import vn.vnext.sefuri.sf.json.core.CustomerJson;
import vn.vnext.sefuri.sf.json.core.DepartmentGoalItemJson;
import vn.vnext.sefuri.sf.json.core.DepartmentGoalJson;
import vn.vnext.sefuri.sf.json.core.DepartmentJson;
import vn.vnext.sefuri.sf.json.core.SaleDataItemJson;
import vn.vnext.sefuri.sf.json.core.SaleDataJson;
import vn.vnext.sefuri.sf.json.core.UserJson;
import vn.vnext.sefuri.sf.json.request.SF0050301Req;
import vn.vnext.sefuri.sf.json.request.SF0050302Req;
import vn.vnext.sefuri.sf.json.request.SF0050303Req;
import vn.vnext.sefuri.sf.json.request.SF0050304Req;
import vn.vnext.sefuri.sf.json.request.SF0050305Req;
import vn.vnext.sefuri.sf.json.request.SF0050307Req;
import vn.vnext.sefuri.sf.json.response.SF0050300Res;
import vn.vnext.sefuri.sf.json.response.SF0050301Res;
import vn.vnext.sefuri.sf.json.response.SF0050302Res;
import vn.vnext.sefuri.sf.json.response.SF0050303Res;
import vn.vnext.sefuri.sf.json.response.SF0050305Res;
import vn.vnext.sefuri.sf.json.response.SF0050306Res;
import vn.vnext.sefuri.sf.service.SV002UserService;
import vn.vnext.sefuri.sf.service.SV005CustomerService;
import vn.vnext.sefuri.sf.service.SV015DepartmentService;
import vn.vnext.sefuri.sf.service.SV016RevenueService;
import vn.vnext.sefuri.sf.util.CollectionUtil;
import vn.vnext.sefuri.sf.util.DateUtil;

/**
 * Created by NgocNM on 2/9/2017.
 */
public class SF00503CtrlImpl extends CommonCtrl implements SF00503Ctrl {

    private static final Logger logger = LoggerFactory.getLogger(SF00503CtrlImpl.class);

    private static int CUSTOMER_TYPE_NEW = 1;
    private static int CUSTOMER_TYPE_OTHER = 2;
    private static int CUSTOMER_TYPE_OLD = 3;
    private static Integer SYSTEM_START_YEAR = 2016;



    @Inject
    private SV015DepartmentService sv015DepartmentService;
    @Inject
    private SV002UserService sv002UserService;
    @Inject
    private SV005CustomerService sv005CustomerService;
    @Inject
    private SV016RevenueService sv016RevenueService;

    @Override
    public Result sf0050300GetDepartment() {
        List<DepartmentJson> departmentJsons;
        List<DepartmentDto> departmentDtos = sv015DepartmentService.sv01510FindAllSaleDept();
        SF0050300Res sf0050300Res = new SF0050300Res();

        departmentJsons = getDepartmentJsonList(departmentDtos);
        if (departmentJsons.size() == 0) {
            departmentDtos = sv015DepartmentService.sv01501FindAllDepartment();
            departmentJsons = getDepartmentJsonList(departmentDtos);
        }
        sf0050300Res.setDepartments(departmentJsons);
        return responseJson(sf0050300Res, MessageCode.SF00503.INF001);
    }

    private List<DepartmentJson> getDepartmentJsonList(List<DepartmentDto> departmentDtos) {
        List<DepartmentJson> departmentJsons = new ArrayList<>();
        if (CollectionUtil.isNotEmpty(departmentDtos)) {
            for (DepartmentDto departmentDto : departmentDtos) {
                DepartmentJson departmentJson = new DepartmentJson();
                departmentJson.setData(departmentDto);
                List<UserDto> userDtos = sv002UserService.sv00205GetUsersByDepartmentId(departmentDto.getId());
                List<UserJson> userJsons = new ArrayList<>();
                if (CollectionUtil.isNotEmpty(userDtos)) {
                    for (UserDto userDto : userDtos) {
                        UserJson userJson = new UserJson();
                        userJson.setData(userDto);
                        userJsons.add(userJson);
                    }
                }
                departmentJson.setUsers(userJsons);
                departmentJsons.add(departmentJson);
            }
        }
        return departmentJsons;
    }

    @Override
    public Result sf0050301Init01() {
        Integer departmentId = requestJson(SF0050301Req.class).getDepartmentId();
        SF0050301Res res = new SF0050301Res();
        // Get FinanceYear
        Integer currentYear = getFinanceYear();
        Integer previousYear = currentYear - 1;
        Integer lastyear = previousYear - 1;

        List<Integer> years = new ArrayList<>();
        for(int year = currentYear; year >= SYSTEM_START_YEAR; year--){
            years.add(year);
        }

        // 1.0 Set DepartmentGoal
        List<DepartmentGoalDto> departmentGoalDtos = sv015DepartmentService
                .sv01502GetDepartmentGoal(departmentId, years);
        List<DepartmentGoalJson> departmentGoalJsons = new ArrayList<>();
        if (CollectionUtil.isNotEmpty(departmentGoalDtos)) {
            for (DepartmentGoalDto departmentGoalDto : departmentGoalDtos) {
                DepartmentGoalJson departmentGoalJson = new DepartmentGoalJson();
                departmentGoalJson.setData(departmentGoalDto);

                // 1.1 Set DepartmentGoalItems
                List<DepartmentGoalItemDto> departmentGoalItemDtos = sv015DepartmentService
                        .sv01503GetDepartmentGoalItemsByDepartmentGoalId(departmentGoalDto.getId());
                List<DepartmentGoalItemJson> departmentGoalItemJsons = new ArrayList<>();
                if (CollectionUtils.isNotEmpty(departmentGoalItemDtos)) {
                    for (DepartmentGoalItemDto goalItem : departmentGoalItemDtos) {
                        DepartmentGoalItemJson departmentGoalItemJson = new DepartmentGoalItemJson();
                        departmentGoalItemJson.setData(goalItem);
                        departmentGoalItemJsons.add(departmentGoalItemJson);
                    }
                }
                departmentGoalJson.setGoalItems(departmentGoalItemJsons);
                departmentGoalJsons.add(departmentGoalJson);
            }
        }

        res.setDepartmentGoal(departmentGoalJsons);

        // 3月度の売上実績を当年度にするか、前年度にするかの判定
        DateTime now = DateTime.now();
        boolean useLastMarchData =  currentYear < now.getYear();

        // 2.0 Set SaleData
        // 2.1  Selected year in screen. We assume that selected year in screen is 2017
        List<SalerDataDto> salerDataDtos = this.getSalerDataDto(departmentId, lastyear, false);         // 前々年度
        salerDataDtos.addAll(this.getSalerDataDto(departmentId, previousYear, useLastMarchData));       // 前年度
        salerDataDtos.addAll(this.getSalerDataDto(departmentId, currentYear, true));                    // 今年度

        // 2.2 Set SalerDataItems
        // 2.2.1 Create a map <Year-month-productType, totalMoney>   年, 月, 商品種別ごとに売上を集計
        HashMap<String, BigDecimal> map = new HashMap<>();      // "年;月;商品種別" => 売上合計
        for (SalerDataDto salerDataDto : salerDataDtos) {
            String key = salerDataDto.getYear().toString();
            key += ";" + salerDataDto.getMonth().toString();
            key += ";" + salerDataDto.getProductType();

            // key = "2016041" <-> Year - month - productType
            if (map.containsKey(key)) {
                BigDecimal totalMoney = map.get(key);
                totalMoney = totalMoney.add(salerDataDto.getTotalMoney());
                map.put(key, totalMoney);
            } else {
                map.put(key, salerDataDto.getTotalMoney());
            }
        }

        // 年で仕訳する
        HashMap<Integer, List<SaleDataItemJson>> saleDataMap = new HashMap<>();  // 年 => 応答電文
        for (Map.Entry<String, BigDecimal> entry : map.entrySet()) {
            // key = "2016041" <-> Year - month - productType
            // EX: 20160401 - 1234 <-> Year - month - productType -> totalMoney
            //      20160402 - 2222
            String key = entry.getKey();
            String arr[] = key.split(";");
            Integer year = Integer.valueOf(arr[0]);
            Integer month = Integer.valueOf(arr[1]);
            Integer productType = Integer.valueOf(arr[2]);
            BigDecimal totalMoney = map.get(key);

            if (saleDataMap.containsKey(year)) {
                List<SaleDataItemJson> saleDataItemJsons = saleDataMap.get(year);
                SaleDataItemJson saleDataItemJson = new SaleDataItemJson();
                saleDataItemJson.setMonth(month);
                saleDataItemJson.setProductType(productType);
                saleDataItemJson.setTotalMoney(totalMoney);
                saleDataItemJsons.add(saleDataItemJson);
            } else {
                List<SaleDataItemJson> saleDataItemJsons = new ArrayList<>();
                SaleDataItemJson saleDataItemJson = new SaleDataItemJson();
                saleDataItemJson.setMonth(month);
                saleDataItemJson.setProductType(productType);
                saleDataItemJson.setTotalMoney(totalMoney);
                saleDataItemJsons.add(saleDataItemJson);
                saleDataMap.put(year, saleDataItemJsons);
            }
        }

        // 2.2.2 Convert to List Json
        List<SaleDataJson> saleDataJsons = new ArrayList<>();
        for (Map.Entry<Integer, List<SaleDataItemJson>> entry : saleDataMap.entrySet()) {
            Integer year = entry.getKey();
            SaleDataJson saleDataJson = new SaleDataJson();
            saleDataJson.setYear(year);
            saleDataJson.setSaleDataItems(saleDataMap.get(year));
            saleDataJsons.add(saleDataJson);
        }
        res.setSaleData(saleDataJsons);

        return responseJson(res, MessageCode.SF00503.INF001);
    }

    /**
     * 部門の売上データを取得する
     *
     * @param departmentId 部門 ID
     * @param targetYear 集計対象年度
     * @param useLastMarchData 3月度としてどの年度の実績を使用するか
     *   <ul>
     *     <li>true:  targetYear-1年3月度のデータを使用する  (前年度のデータを使用する)
     *     <li>false: targetYear年3月度のデータを使用する  (通常通り)
     *   </ul>
     * @return 売上データ
     * @see vn.vnext.sefuri.sf.service.impl.SV016RevenueServiceImpl.sv001602GetCustomerData(Integer, Integer) 同じようなコード
     */
    private List<SalerDataDto> getSalerDataDto(Integer departmentId, Integer targetYear, boolean useLastMarchData) {

        String format = "yyyy-MM-dd HH:mm:SS";

        // targetYear 年 4 月 〜 targetYear+1 年 2 月までの売上実績
        DateTime firstDate = DateUtil.getFirstDayOfMonth(new DateTime(targetYear, 4, 1, 0, 0, 0));
        DateTime lastFebruaryDate = DateUtil.getLastDayOfMonth(new DateTime(targetYear + 1, 2, 1, 0, 0, 0));
        List<SalerDataDto> salerDataDtos = sv016RevenueService.sv001601GetSalerData(
                DateUtil.formatDate(firstDate, format),
                DateUtil.formatDate(lastFebruaryDate, format),
                departmentId,
                targetYear
        );

        // 3 月分
        int targetMarchYear = useLastMarchData ? targetYear : targetYear + 1;
        DateTime startMarchDate = DateUtil.getFirstDayOfMonth(new DateTime(targetMarchYear, 3, 1, 0, 0, 0));
        DateTime endMarchDate = DateUtil.getLastDayOfMonth(new DateTime(targetMarchYear, 3, 1, 0, 0, 0));
        List<SalerDataDto> salerMarchDataDtos = sv016RevenueService.sv001601GetSalerData(
                DateUtil.formatDate(startMarchDate, format),
                DateUtil.formatDate(endMarchDate, format),
                departmentId,
                targetYear
        );

        // マージする
        List<SalerDataDto> result = new ArrayList<>(salerDataDtos.size() + salerMarchDataDtos.size());
        result.addAll(salerDataDtos);
        result.addAll(salerMarchDataDtos);

        return result;
    }

    @Override
    public Result sf0050302Save01() {
        SF0050302Req sf0050302Req = requestJson(SF0050302Req.class);

        // 1.0 Get departmentGoal data
        DepartmentGoalJson departmentGoalJson = sf0050302Req.getDepartmentGoal();
        DepartmentGoalDto departmentGoalDto = departmentGoalJson.getData();
        List<DepartmentGoalItemJson> departmentGoalItemJsons = departmentGoalJson.getGoalItems();

        Integer userId = getUserId();
        // 2.0 Save or Update
        if (departmentGoalDto.getId() != null) {
            // 2.1 Update
            departmentGoalDto.setCreatedUser(userId);
            departmentGoalDto.setUpdatedUser(userId);
            departmentGoalDto.setUpdatedDate(DateUtil.getSysDate());
            departmentGoalDto.setCreatedDate(DateUtil.getSysDate());
            sv015DepartmentService.sv01506UpdateDepartmentGoal(departmentGoalDto);

            List<DepartmentGoalItemJson> departmentGoalItemJsonList = new ArrayList<>();
            for (DepartmentGoalItemJson depJson : departmentGoalItemJsons) {
                DepartmentGoalItemDto departmentGoalItemDto = sv015DepartmentService
                        .sv01508FindDepartmentGoalItemById(depJson.getId());
                departmentGoalItemDto.setDepartmentGoalId(departmentGoalDto.getId());
                // productType
                departmentGoalItemDto.setType(depJson.getType());
                departmentGoalItemDto.setMonth(depJson.getMonth());
                departmentGoalItemDto.setCustomerType(depJson.getCustomerType());
                departmentGoalItemDto.setGoal(depJson.getGoal());

                departmentGoalItemDto.setUpdatedUser(userId);
                departmentGoalItemDto.setUpdatedDate(DateUtil.getSysDate());

                sv015DepartmentService.sv01507UpdateDepartmentGoalItem(departmentGoalItemDto);
                DepartmentGoalItemJson departmentGoalItemJson = new DepartmentGoalItemJson();
                departmentGoalItemJson.setData(departmentGoalItemDto);
                departmentGoalItemJsonList.add(departmentGoalItemJson);
            }
            departmentGoalJson.setGoalItems(departmentGoalItemJsonList);
        } else {
            // 2.2 Save
            departmentGoalDto.setCreatedUser(userId);
            departmentGoalDto.setUpdatedUser(userId);

            departmentGoalDto.setCreatedDate(DateUtil.getSysDate());
            departmentGoalDto.setUpdatedDate(DateUtil.getSysDate());
            sv015DepartmentService.sv01504SaveDepartmentGoal(departmentGoalDto);

            List<DepartmentGoalItemJson> departmentGoalItemJsonList = new ArrayList<>();
            for (DepartmentGoalItemJson depJson : departmentGoalItemJsons) {
                DepartmentGoalItemDto departmentGoalItemDto = new DepartmentGoalItemDto();
                departmentGoalItemDto.setDepartmentGoalId(departmentGoalDto.getId());
                // productType
                departmentGoalItemDto.setType(depJson.getType());
                departmentGoalItemDto.setMonth(depJson.getMonth());
                departmentGoalItemDto.setCustomerType(depJson.getCustomerType());
                departmentGoalItemDto.setGoal(depJson.getGoal());

                departmentGoalItemDto.setCreatedUser(userId);
                departmentGoalItemDto.setUpdatedUser(userId);
                departmentGoalItemDto.setUpdatedDate(DateUtil.getSysDate());
                departmentGoalItemDto.setCreatedDate(DateUtil.getSysDate());
                sv015DepartmentService.sv01505SaveDepartmentGoalItem(departmentGoalItemDto);

                DepartmentGoalItemJson departmentGoalItemJson = new DepartmentGoalItemJson();
                departmentGoalItemJson.setData(departmentGoalItemDto);
                departmentGoalItemJsonList.add(departmentGoalItemJson);
            }
            departmentGoalJson.setGoalItems(departmentGoalItemJsonList);
        }

        // 3.0 Res
        departmentGoalJson.setData(departmentGoalDto);

        SF0050302Res sf0050302Res = new SF0050302Res();
        sf0050302Res.setDepartmentGoal(departmentGoalJson);

        return responseJson(sf0050302Res, MessageCode.SF00503.INF001);
    }

    @Override
    public Result sf0050303Save02() {
        SF0050303Req sf0050303Req = requestJson(SF0050303Req.class);
        CustomerGoalJson customerGoalJson = sf0050303Req.getCustomerGoalJson();
        CustomerGoalDto customerGoalDto = customerGoalJson.getData();
        setCustomerGoalItems(customerGoalJson, customerGoalDto);
        CustomerGoalJson customerGoalJsonTmp = new CustomerGoalJson();

        CustomerGoalDto customerGoalDtoTmp;
        List<CustomerGoalItemJson> customerGoalItemJsons = new ArrayList<>();
        UserJson userJson = new UserJson();

        CustomerGoalDto customerGoalcheckExist = null;
        if (customerGoalDto.getId() != null) {
            customerGoalcheckExist = sv005CustomerService.sv00511GetCustomerGoalById(customerGoalDto.getId());
        }
        // customerGoalOld
        if (customerGoalcheckExist != null) {
            //Update if Customer goal existed
            customerGoalcheckExist.setYear(customerGoalDto.getYear());
            customerGoalcheckExist.setCustomerId(customerGoalDto.getCustomerId());
            customerGoalcheckExist.setPicId(customerGoalDto.getPicId());
            customerGoalcheckExist.setActivityPolicy(customerGoalDto.getActivityPolicy());
            customerGoalcheckExist.setUpdatedDate(DateUtil.getSysDate());
            customerGoalcheckExist.setUpdatedUser(getUserId());

            customerGoalDtoTmp = sv005CustomerService.sv00505UpdateCustomerGoal(customerGoalcheckExist);
            UserDto userDto = sv002UserService.sv00204GetUserById(customerGoalDtoTmp.getPicId());
            userJson.setData(userDto);

            for (CustomerGoalItemDto item : customerGoalDto.getGoalItems()) {
                CustomerGoalItemDto customerGoalItemDto = sv005CustomerService.sv00506GetCustomerGoalItem(item.getId());
                customerGoalItemDto.setType(item.getType());
                customerGoalItemDto.setGoal(item.getGoal());
                customerGoalItemDto.setMonth(item.getMonth());
                customerGoalItemDto.setCustomerGoalId(customerGoalDtoTmp.getId());
                customerGoalItemDto.setCustomerType(item.getCustomerType());
                customerGoalItemDto.setUpdatedDate(DateUtil.getSysDate());
                customerGoalItemDto.setUpdatedUser(getUserId());
                sv005CustomerService.sv00507UpdateCustomerGoalItem(customerGoalItemDto);

                CustomerGoalItemJson customerGoalItemJson = new CustomerGoalItemJson();
                customerGoalItemJson.setData(customerGoalItemDto);
                customerGoalItemJsons.add(customerGoalItemJson);
            }
            customerGoalJsonTmp.setData(customerGoalDto);
            customerGoalJsonTmp.setUser(userJson);
            customerGoalJsonTmp.setGoalItems(customerGoalItemJsons);

        } else {
            customerGoalJsonTmp = createNewCustomerGoal(customerGoalDto);
        }

        SF0050303Res sf0050303Res = new SF0050303Res();
        sf0050303Res.setCustomerGoalJson(customerGoalJsonTmp);
        return responseJson(sf0050303Res, MessageCode.SF00503.INF001);
    }

    private CustomerGoalJson createNewCustomerGoal(CustomerGoalDto customerGoalDto) {
        //Save new if Customer goal not existed
        customerGoalDto.setUpdatedUser(getUserId());
        customerGoalDto.setCreatedUser(getUserId());
        customerGoalDto.setCreatedDate(DateUtil.getSysDate());
        customerGoalDto.setUpdatedDate(DateUtil.getSysDate());

        sv005CustomerService.sv00502SaveCustomerGoal(customerGoalDto);
        UserDto userDto = sv002UserService.sv00204GetUserById(customerGoalDto.getPicId());
        UserJson userJson = new UserJson();
        userJson.setData(userDto);

        List<CustomerGoalItemJson> customerGoalItemJsons = new ArrayList<>();
        for (CustomerGoalItemDto item : customerGoalDto.getGoalItems()) {
            CustomerGoalItemDto customerGoalItemDto = new CustomerGoalItemDto();
            customerGoalItemDto.setType(item.getType());
            customerGoalItemDto.setGoal(item.getGoal());
            customerGoalItemDto.setMonth(item.getMonth());
            customerGoalItemDto.setCustomerGoalId(customerGoalDto.getId());
            customerGoalItemDto.setCustomerType(item.getCustomerType());
            customerGoalItemDto.setCreatedUser(this.getUserId());
            customerGoalItemDto.setUpdatedUser(this.getUserId());
            customerGoalItemDto.setCreatedDate(DateUtil.getSysDate());
            customerGoalItemDto.setUpdatedDate(DateUtil.getSysDate());
            sv005CustomerService.sv00508SaveCustomerGoalItem(customerGoalItemDto);

            CustomerGoalItemJson customerGoalItemJson = new CustomerGoalItemJson();
            customerGoalItemJson.setData(customerGoalItemDto);
            customerGoalItemJsons.add(customerGoalItemJson);
        }

        CustomerGoalJson customerGoalJsonTmp = new CustomerGoalJson();
        customerGoalJsonTmp.setData(customerGoalDto);
        customerGoalJsonTmp.setUser(userJson);
        customerGoalJsonTmp.setGoalItems(customerGoalItemJsons);
        return customerGoalJsonTmp;
    }

    @Override
    public Result sf0050304Delete02() {
        SF0050304Req sf0050304Req = requestJson(SF0050304Req.class);
        if (sf0050304Req.getGoalId() != null) {
            sv005CustomerService.sv00503DeleteCustomerGoal(sf0050304Req.getGoalId());
        }

        return responseJson(null, MessageCode.SF00503.INF001);
    }

    @Override
    public Result sf0050305Init02() {
        SF0050305Req req = requestJson(SF0050305Req.class);
        Integer depId = req.getDepartmentId();
        Integer selectedYear = req.getYear();
        // if selectedYear is null then select current year
        if (selectedYear == null) {
            selectedYear = getFinanceYear();
        }

        // 1.0 前年度(selectedYear-1) のある部門の売上実績を照会
        List<CustomerDataDto> customerDataDtos = this.sv016RevenueService
                .sv001602GetCustomerData(depId, selectedYear - 1);

        // 画面表示対象である customer ID のリストを作成する
        List<Integer> customerIds = new ArrayList<>();  // 得意先ID のリスト
        sv005CustomerService.sv00515getCustomersByDepartment(depId)
                .stream().forEach(dto -> customerIds.add(dto.getId()));

        // 1.1 得意先ID → 売上実績のリスト を生成
        HashMap<Integer, List<CustomerDataDto>> revenueMap = new HashMap<>();   // 得意先ID → 売上実績のリスト
        for (CustomerDataDto customerDataDto : customerDataDtos) {
            Integer mapKey = customerDataDto.getCustomerId();
            if (mapKey == null) {
                continue;
            }
            List<CustomerDataDto> dataList = revenueMap.get(mapKey);
            if (dataList == null) {
                // create new list
                dataList = new ArrayList<>();
                revenueMap.put(mapKey, dataList);

                if (!customerIds.contains(mapKey)) {
                    customerIds.add(mapKey);
                }
            }
            dataList.add(customerDataDto);
        }

        // 上記売上実績リストで売り上げがなかった得意先のデータを初期値で生成
        for(Integer customerId : customerIds){

            // 売り上げ実績がある場合は飛ばす
            if(revenueMap.containsKey(customerId)) continue;

            // データ生成
            revenueMap.put(customerId, this.getNewCustomerDataDtoList(selectedYear - 1, customerId));
        }

        // 2.0 ある部門、ある年度の売上目標を取得
        List<CustomerGoalDto> customerGoalDtos = sv005CustomerService.sv00509GetCustomerGoalInYear(depId, selectedYear);

        // 2.1 得意先 ID → 売上目標のリスト を生成
        HashMap<Integer, CustomerGoalDto> existCustomerMap = new HashMap<>();   // 得意先ID → 売上目標
        List<CustomerGoalDto> summaryCustomerList = new ArrayList<>();          // 得意先ID=null な売上目標

        for (CustomerGoalDto customerGoalDto : customerGoalDtos) {
            // 1.0 Get list by picId-customerId
            Integer mapKey = customerGoalDto.getCustomerId();
            if (mapKey == null) {
                // add future goal
                summaryCustomerList.add(customerGoalDto);
            } else {
                existCustomerMap.put(mapKey, customerGoalDto);
            }
        }

        // 担当営業と得意先のリストを取得
        List<Object[]> objects = new ArrayList<>();     // 担当営業, 得意先のリスト
        if(customerIds.size() > 0) {
            // 得意先 ID の担当営業のリストを取得
            objects = sv002UserService.sv00207GetSalesUsingCustomerIds(customerIds);
        }
        HashMap<Integer, UserDto> userMap = new HashMap<>(); // 担当営業ID → 担当営業
        HashMap<String, UserDto> userCodeMap = new HashMap<>(); // 営業担当者C → 担当営業
        HashMap<Integer, CustomerDto> customerMap = new HashMap<>(); // 得意先ID → 得意先
        for (Object[] obj : objects) {
            UserDto userDto = (UserDto) obj[0];
            CustomerDto customerDto = (CustomerDto) obj[1];
            customerMap.put(customerDto.getId(), customerDto);

            userMap.put(userDto.getId(), userDto);
            userCodeMap.put(userDto.getUserCode(), userDto);
        }

        // 3.0 応答電文生成
        List<CustomCustomerGoalJson> customCustomerGoalJsons = new ArrayList<>();
        // 3.1 Put exists customer data
        for (Map.Entry<Integer, List<CustomerDataDto>> entry : revenueMap.entrySet()) {
            Integer customerId = entry.getKey();
            List<CustomerDataDto> revenueList = entry.getValue();
            CustomerGoalDto goalData = existCustomerMap.get(customerId);

            // 3.1.1 Create customer goal json
            CustomCustomerGoalJson customCustomerGoalJson = new CustomCustomerGoalJson();
            customCustomerGoalJsons.add(customCustomerGoalJson);

            // 3.1.2 Set future pic
            if (goalData != null) {
                customCustomerGoalJson.setPicId(goalData.getPicId());
                customCustomerGoalJson.setData(goalData);

                // set user data
                UserDto userDto = userMap.get(goalData.getPicId());
                if (userDto == null) {
                    userDto = sv002UserService.sv00204GetUserById(goalData.getPicId());
                }
                UserJson userJson = new UserJson();
                customCustomerGoalJson.setUser(userJson);
                userJson.setData(userDto);
            }

            // 3.1.3 Set customer data
            CustomerJson customerJson = new CustomerJson();
            customCustomerGoalJson.setCustomer(customerJson);

            CustomerDto customerDto = customerMap.get(customerId);
            if (customerDto == null) {
                customerDto = sv005CustomerService.sv00501GetCustomerByCustomerId(customerId);
            }

            customerJson.setData(customerDto);

            // 3.1.4 Set year, department, customerId
            customCustomerGoalJson.setYear(selectedYear);
            customCustomerGoalJson.setDepartmentId(depId);
            customCustomerGoalJson.setCustomerId(customerId);

            // 3.1.5 get Current pic
            UserDto picUser = userCodeMap.get(customerDto.getPicCode());
            if (picUser == null) {
                picUser = sv002UserService.sv00104getUserByUserCode(customerDto.getPicCode());
            }

            if (picUser == null) {
                picUser = new UserDto();
            } else if (goalData == null) {
                customCustomerGoalJson.setPicId(picUser.getId());
                UserJson userJson = new UserJson();
                userJson.setData(picUser);
                customCustomerGoalJson.setUser(userJson);
            }
            customerJson.setCustomerContact(picUser.getUsername());
            customerJson.setCreatedUser(picUser.getId());

            // 3.1.6 set customerGoalItem
            if (goalData != null) {
                // 3.1.6.1 Get item data
                List<CustomerGoalItemDto> customerGoalItemDtos = sv005CustomerService.sv00510GetCustomerGoalItems(goalData.getId());
                // create list json
                List<CustomerGoalItemJson> goalDatas = new ArrayList<>();
                customCustomerGoalJson.setGoalItems(goalDatas);
                for (CustomerGoalItemDto goalItemDto : customerGoalItemDtos) {
                    CustomerGoalItemJson goalJson = new CustomerGoalItemJson();
                    goalDatas.add(goalJson);

                    goalJson.setData(goalItemDto);
                }
            }

            // 3.1.7 set customerDataItems
            List<CustomerDataItemJson> revenueDatas = new ArrayList<>();
            customCustomerGoalJson.setCustomerDataItems(revenueDatas);
            for (CustomerDataDto customerDataDto : revenueList) {
                // create revenue data
                CustomerDataItemJson revenueData = new CustomerDataItemJson();
                revenueDatas.add(revenueData);

                // set revenue data
                revenueData.setProductType(customerDataDto.getProductType());
                revenueData.setMonth(customerDataDto.getMonth());
                revenueData.setNumberOfOrder(customerDataDto.getNumberOfOrder());
                revenueData.setTotalMoney(customerDataDto.getTotalMoney());
            }
        }

        // 3.3 Put new customer data
        for (CustomerGoalDto newCustomerDto : summaryCustomerList) {
            // 3.2.1 Create customer goal json
            CustomCustomerGoalJson customCustomerGoalJson = new CustomCustomerGoalJson();
            customCustomerGoalJsons.add(customCustomerGoalJson);
            customCustomerGoalJson.setData(newCustomerDto);

            // 3.2.2 Set year, department
            customCustomerGoalJson.setYear(selectedYear);
            customCustomerGoalJson.setDepartmentId(depId);

            // 3.2.3 Set future pic
            customCustomerGoalJson.setPicId(newCustomerDto.getPicId());

            // 3.2.4 Set user data
            UserDto userDto = userMap.get(newCustomerDto.getPicId());
            if (userDto == null) {
                userDto = sv002UserService.sv00204GetUserById(newCustomerDto.getPicId());
            }
            UserJson userJson = new UserJson();
            customCustomerGoalJson.setUser(userJson);
            userJson.setData(userDto);

            // 3.2.6 set customerGoalItem
            // 3.2.6.1 Get item data
            List<CustomerGoalItemDto> customerGoalItemDtos = sv005CustomerService.sv00510GetCustomerGoalItems(newCustomerDto.getId());
            // create list json
            List<CustomerGoalItemJson> goalDatas = new ArrayList<>();
            customCustomerGoalJson.setGoalItems(goalDatas);

            for (CustomerGoalItemDto goalItemDto : customerGoalItemDtos) {
                CustomerGoalItemJson goalJson = new CustomerGoalItemJson();
                goalDatas.add(goalJson);

                goalJson.setData(goalItemDto);
            }
            customCustomerGoalJson.setGoalType(goalDatas.get(0).getCustomerType());
        }

        // 4.0 Set Res
        SF0050305Res sf0050305Res = new SF0050305Res();
        sf0050305Res.setCustomerGoals(customCustomerGoalJsons);

        return responseUsingGzip(sf0050305Res, MessageCode.SF00503.INF001);
    }

    private List<CustomerDataDto> getNewCustomerDataDtoList(Integer year, Integer customerId){
        List<CustomerDataDto> list = new ArrayList<>();
        for(int month = 1; month <= 12; month++){
            for(int type = 0; type <= 2; type++){
                CustomerDataDto data = new CustomerDataDto();
                data.setCustomerId(customerId);
                data.setYear(year);
                data.setProductType(type);
                data.setMonth(month);
                data.setNumberOfOrder(0);
                data.setTotalMoney(BigDecimal.ZERO);
                list.add(data);
            }
        }
        return list;
    }

    private Integer getFinanceYear() {
//        DateTime dateTime = new DateTime();
//        Integer month = dateTime.getMonthOfYear();
//        Integer currentYear;
//        if (month < 4) {
//            currentYear = dateTime.getYear() - 1;
//        } else {
//            currentYear = dateTime.getYear();
//        }

        Integer currentYear = new DateTime().getYear();
        logger.warn("current year : {}", currentYear);
        return currentYear;
    }

    @Override
    public Result sf0050306GetFinanceYear() {
        SF0050306Res sf0050306Res = new SF0050306Res();

        Integer currentYear = getFinanceYear();

        // 2017/04/12: remove next year from available list
        List<Integer> years = new ArrayList<>();
        for(int year = currentYear; year >= SYSTEM_START_YEAR; year--){
            years.add(year);
        }
        sf0050306Res.setFinanceYear(years);

        return responseJson(sf0050306Res, MessageCode.SF00503.INF001);
    }

    @Override
    public Result sf0050307CreateCustomerGoalAutomatically() {
        SF0050307Req sf0050307Req = requestJson(SF0050307Req.class);
        sv005CustomerService.sv00514SetCustomerGoalAutomatically(sf0050307Req.getCurrentYear(),
                sf0050307Req.getDepartmentId(), getUserId());

        return responseJson(null, MessageCode.SF00503.INF001);
    }

    /**
     * Set customer goal item into customerGoalDto
     *
     * @param customerGoalJson
     * @param customerGoalDto
     */
    private void setCustomerGoalItems(CustomerGoalJson customerGoalJson, CustomerGoalDto customerGoalDto) {
        List<CustomerGoalItemDto> customerGoalItemDtos = new ArrayList<>();
        for (CustomerGoalItemJson customerGoalItemJson : customerGoalJson.getGoalItems()) {
            CustomerGoalItemDto customerGoalItemDto = new CustomerGoalItemDto();
            customerGoalItemDto.setId(customerGoalItemJson.getId());
            customerGoalItemDto.setType(customerGoalItemJson.getType());
            customerGoalItemDto.setGoal(customerGoalItemJson.getGoal());
            customerGoalItemDto.setMonth(customerGoalItemJson.getMonth());
            customerGoalItemDto.setCustomerGoalId(customerGoalItemJson.getCustomerGoalId());
            customerGoalItemDto.setCreatedUser(this.getUserId());
            customerGoalItemDto.setUpdatedUser(this.getUserId());
            customerGoalItemDto.setCustomerType(customerGoalItemJson.getCustomerType());
            customerGoalItemDtos.add(customerGoalItemDto);
        }
        customerGoalDto.setGoalItems(customerGoalItemDtos);
        customerGoalDto.setCreatedUser(this.getUserId());
        customerGoalDto.setUpdatedUser(this.getUserId());
    }
}
