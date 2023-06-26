package vn.vnext.sefuri.sf.controller.impl;

import com.google.common.collect.Lists;
import com.google.inject.Inject;
import play.mvc.Result;
import vn.vnext.sefuri.sf.common.*;
import vn.vnext.sefuri.sf.controller.SF00205Ctrl;
import vn.vnext.sefuri.sf.dto.*;
import vn.vnext.sefuri.sf.json.SF00205.model.SF00205_DealJson;
import vn.vnext.sefuri.sf.json.SF00205.model.SF00205_ProductJson;
import vn.vnext.sefuri.sf.json.SF00205.request.SF0020501Req;
import vn.vnext.sefuri.sf.json.SF00205.request.SF0020502Req;
import vn.vnext.sefuri.sf.json.SF00205.request.SF00205Filter;
import vn.vnext.sefuri.sf.json.SF00205.response.SF0020501Res;
import vn.vnext.sefuri.sf.json.SF00205.response.SF0020502Res;
import vn.vnext.sefuri.sf.json.SF00205.response.SF0020502ResultData;
import vn.vnext.sefuri.sf.json.common.ActivityJson;
import vn.vnext.sefuri.sf.json.core.DepartmentJson;
import vn.vnext.sefuri.sf.json.core.MstLaminationJson;
import vn.vnext.sefuri.sf.json.core.MstPaperJson;
import vn.vnext.sefuri.sf.json.core.UserJson;
import vn.vnext.sefuri.sf.service.*;
import vn.vnext.sefuri.sf.util.CollectionUtil;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by manhnv on 6/14/2017.
 */
public class SF00205CtrlImpl extends CommonCtrl implements SF00205Ctrl {
    @Inject
    private SV003DealService dealService;

    @Inject
    private SV015DepartmentService departmentService;

    @Inject
    private SV013MstDataService mstDataService;

    @Inject
    private SV002UserService userService;

    @Inject
    private SV005CustomerService customerService;

    @Inject
    private SV008ProductService productService;

    @Inject
    private SV006FileService fileService;

    @Inject
    private SV007MyboxService myboxService;

    @Override
    public Result sf0020501Init() {
        UserDto currentUser = userService.sv00204GetUserById(getUserId());
        final Integer picDepartmentId = currentUser.getDepartmentId();
        Integer selectedPicId = currentUser.getId();
        Integer selectedDepartmentId = null;

        //http://fridaynight.vnext.vn/issues/3240
        // remove department have dept_type = 2
        List<DepartmentDto> departmentDtos = departmentService.sv01523GetDepartmentByType(
                Enums.DepartType.SALE.getType());
        if (CollectionUtil.isNotEmpty(departmentDtos)) {
            // check user in sale's department
            selectedDepartmentId = departmentDtos.stream().filter(departmentDto -> departmentDto.getId().compareTo
                    (picDepartmentId) == 0).map(departmentDto -> departmentDto.getId()).findFirst().orElse(null);
        }

        if (selectedDepartmentId == null) {
            // not in sale's department then set default selectedDepartmentId, selectedPicId is 0
            selectedDepartmentId = 0;
            selectedPicId = 0;
        }

        List<DepartmentJson> departmentJsons = getDepartmentJsonList(departmentDtos);

        SF0020501Res res = new SF0020501Res();
        res.setDepartments(departmentJsons);


        SF00205Filter filter = new SF00205Filter();

        filter.setSelectedDepartmentId(selectedDepartmentId);
        filter.setSelectedPicId(selectedPicId);

        long rowCount = dealService.sv0020502CountDeal(filter);
        List<DealDto> dealDtos = dealService.sv0020501GetDeals(filter, Constants.ZERO, Constants.PAGE_SIZE);
        List<SF00205_DealJson> dealJsons = getDealJsons(dealDtos);

        SF0020502ResultData searchResult = new SF0020502ResultData();
        searchResult.setTotalRecords(rowCount);
        searchResult.setDeals(dealJsons);

        res.setSearchResult(searchResult);


        return responseJson(res, MessageCode.COM.INF001);
    }

    @Override
    public Result sf0020502GetDeals() {
        SF0020501Req req = requestJson(SF0020501Req.class);
        SF00205Filter filter = req.getFilter();

        long rowCount = dealService.sv0020502CountDeal(filter);
        List<DealDto> dealDtos = dealService.sv0020501GetDeals(filter, req.getIndexFrom(), req.getIndexTo());
        List<SF00205_DealJson> dealJsons = getDealJsons(dealDtos);

        SF0020502ResultData res = new SF0020502ResultData();
        res.setTotalRecords(rowCount);
        res.setDeals(dealJsons);

        return responseJson(res, MessageCode.COM.INF001);
    }

    @Override
    public Result sf0020503BookmarkDeal() {
        SF0020502Req req = requestJson(SF0020502Req.class);
        final Integer dealId = req.getDealId();

        DealDto dealDto = dealService.sv00301GetDealById(dealId);
        if (dealDto != null) {
            MyboxItemDto myboxItemDto = myboxService.sv00703GetMyboxItemByDealId(dealDto.getId(), getUserId());
            SF0020502Res res = new SF0020502Res();
            if (myboxItemDto == null) {
                myboxItemDto = myboxService.sv00701BookmarkDeal(dealId, getUserId());
                res.setMyboxId(myboxItemDto.getId());
            } else {
                res.setMyboxId(myboxItemDto.getId());
            }

            return responseJson(res, MessageCode.COM.INF001);
        }

        return responseError(MessageCode.COM.ERR001);
    }

    private List<DepartmentJson> getDepartmentJsonList(List<DepartmentDto> departmentDtos) {
        if (CollectionUtil.isEmpty(departmentDtos)) return Collections.emptyList();

        List<DepartmentJson> departmentJsons = Lists.newArrayList();
        for (DepartmentDto departmentDto : departmentDtos) {
            DepartmentJson departmentJson = new DepartmentJson();
            departmentJson.setData(departmentDto);

            List<UserDto> userDtos = userService.sv00205GetUsersByDepartmentId(departmentDto.getId());
            if (CollectionUtil.isNotEmpty(userDtos)) {
                List<UserJson> userJsons = Lists.newArrayList();
                for (UserDto userDto : userDtos) {
                    UserJson userJson = new UserJson();
                    userJson.setData(userDto);
                    userJsons.add(userJson);
                }

                departmentJson.setUsers(userJsons);
            }

            departmentJsons.add(departmentJson);
        }

        return departmentJsons;
    }

    private List<SF00205_DealJson> getDealJsons(List<DealDto> dealDtos) {
        if (CollectionUtil.isEmpty(dealDtos)) return Collections.emptyList();

        boolean isHitSearchOn = false;
        boolean isCompletedDesign = false;
        boolean isSupporter = false;
        Integer loginUserDepartmentId = null;

        UserDto loginUser = sv001AuthService.getCurrentUser();
        DepartmentDto loginUserDepartment = departmentService.sv01509GetDepartmentById(loginUser.getDepartmentId());
        if (loginUserDepartment != null) {
            loginUserDepartmentId = loginUserDepartment.getId();
            if (Enums.DepartType.SUPPORT.getType().equals(loginUserDepartment.getType())) {
                isSupporter = true;
            }
        }

        List<SF00205_DealJson> dealJsons = Lists.newArrayList();
        //1. parse data deal dto to deal json
        for (DealDto dealDto : dealDtos) {
            final Integer dealId = dealDto.getId();

            // check deal is hit search on or off
            isHitSearchOn = (dealDto.getDealLockFlag() != null && dealDto.getDealLockFlag() == Enums.Status
                    .DELETE_FLAG_ON.getStatus());

            // check deal is completed design or not
            isCompletedDesign = (Enums.DealStatus.DESIGN_COMPLETE.getStatus() == dealDto.getDealStatus());

            //1.1 get deal info
            SF00205_DealJson dealJson = new SF00205_DealJson();

            boolean isSameDepartment = false;
            UserDto owner = userService.sv00204GetUserById(dealDto.getSalesId());
            if (owner != null && owner.getDepartmentId() != null) {
                DepartmentDto currentDepartment = departmentService.sv01509GetDepartmentById(owner.getDepartmentId());
                if (currentDepartment != null && currentDepartment.getId().equals(loginUserDepartmentId)) {
                    isSameDepartment = true;
                }
            }

            boolean canViewToEdit = false; // identify deal can display or not
            boolean canEdit = false; // identify deal can view detail to edit or not

            if (isSameDepartment || isSupporter) { // cung phong ban hoac la phong support
                canViewToEdit = true;
                canEdit = true;
            } else {
                if (isHitSearchOn) { // hit search is on
                    if (isCompletedDesign) {
                        continue;
                    }
                } else { // hit search is off
                    canViewToEdit = true;
                    canEdit = false;
                }
            }

            if (!canViewToEdit)
                continue;

            // add to current list
            dealJson.setModel(dealDto);
//            dealJson.setEdit(canEdit);
            // trello 1014 案件検索仕掛り中のアクセス権限を一時的に外す
            dealJson.setEdit(true);

            //1.2 get product
            ProductDto product = productService.sv00831GetDefaultProduct(dealId);
            if (product != null) {
                dealJson.setSelectedProductId(product.getId());
            }

            //1.3 set CustomerName to Deal
            Integer customerId = dealDto.getCustomerId();
            if (customerId != null) {
                CustomerDto customer = customerService.sv00501GetCustomerByCustomerId(customerId);
                dealJson.setCustomerName(customer != null ? customer.getName() : null);
            } else {
                dealJson.setCustomerName(dealDto.getCustomerName());
            }

            //1.4 set SaleName to Deal
            if (dealDto.getSalesId() != null) {
                UserDto saler = userService.sv00204GetUserById(dealDto.getSalesId());
                dealJson.setSaleName(saler != null ? saler.getUsername() : null);
            }

            // add deal's products information if exist
            List<ProductDto> productDtos = productService.sv00832GetProductsOrderByUpdatedDate(
                    dealId, false, Enums.Status.HIGHLIGHT_FLAG_OFF.getStatus());

            if (CollectionUtil.isNotEmpty(productDtos)) {
                //1.5 get list product
                List<SF00205_ProductJson> productJsons = Lists.newArrayList();
                for (ProductDto productDto : productDtos) {
                    // set ProductJson
                    SF00205_ProductJson productJson = new SF00205_ProductJson();
                    productJson.setModel(productDto);

                    // get mst paper
                    Integer paperId = product.getPaperId();
                    if (paperId != null) {
                        MstPaperJson mstPaperJson = new MstPaperJson();
                        MstPaperDto mstPaperDto = mstDataService.sv01337GetMstPaperByIdAndSheetSizeId(product.getPaperId(), product.getSheetSizeId());
                        if (mstPaperDto != null) {
                            mstPaperJson.setData(mstPaperDto);
                        }

                        productJson.setPaper(mstPaperJson);
                    }

                    ProductFileDto productFileDto = productService.sv00829GetPrimaryProductFile(productDto.getId());
                    if (productFileDto != null) {
                        FileDto fileDto = fileService.sv00609GetFileInfo(productFileDto.getFileId());
                        productJson.setSrcImg(fileService.sv00618GetThumbnail(fileDto));
                    }

                    productJsons.add(productJson);
                }

                //1.6 set ProductJsons
                dealJson.setProducts(productJsons);
            }

            dealJson.setLaminations(getMstLaminationJsons());

            //1.7 check inMyBox
            MyboxItemDto myboxItemDto = myboxService.sv00703GetMyboxItemByDealId(dealId, getUserId());
            if (myboxItemDto != null) {
                dealJson.setInMybox(true);
            } else {
                dealJson.setInMybox(false);
            }

            // add deal to response
            dealJsons.add(dealJson);

            // fill activities to current deal
            dealJson.setActivity(createActivity(dealId));
        }

        return dealJsons;
    }

    private List<MstLaminationJson> getMstLaminationJsons() {
        List<MstLaminationDto> laminationDtos = mstDataService.sv01332GetMasterLamination();
        if (CollectionUtil.isEmpty(laminationDtos)) return Collections.emptyList();

        return laminationDtos.stream().map(lamination -> {
            MstLaminationJson mstJson = new MstLaminationJson();
            mstJson.setData(lamination);

            return mstJson;
        }).collect(Collectors.toList());
    }

    private ActivityJson createActivity(final Integer dealId) {
        CommentDto commentDto = dealService.sv003035GetLatestCommentByDealId(dealId);
        if (commentDto != null) {
            UserDto user = userService.sv00204GetUserById(commentDto.getUserId());
            DepartmentDto department = departmentService.sv01509GetDepartmentById(user.getDepartmentId());
            return CommonService.createActivity(commentDto, user, department);
        }

        return null;
    }
}
