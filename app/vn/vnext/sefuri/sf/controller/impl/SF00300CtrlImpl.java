package vn.vnext.sefuri.sf.controller.impl;

import com.google.inject.Inject;
import play.mvc.Result;
import vn.vnext.sefuri.sf.common.CommonCtrl;
import vn.vnext.sefuri.sf.common.MessageCode;
import vn.vnext.sefuri.sf.controller.SF00300Ctrl;
import vn.vnext.sefuri.sf.dto.DealDto;
import vn.vnext.sefuri.sf.dto.MyboxItemDto;
import vn.vnext.sefuri.sf.json.core.DealJson;
import vn.vnext.sefuri.sf.json.request.SF0030002Req;
import vn.vnext.sefuri.sf.json.request.SF0030003Req;
import vn.vnext.sefuri.sf.json.response.SF0030002Res;
import vn.vnext.sefuri.sf.json.response.SF0030006Res;
import vn.vnext.sefuri.sf.service.SV003DealService;
import vn.vnext.sefuri.sf.service.SV007MyboxService;

public class SF00300CtrlImpl extends CommonCtrl implements SF00300Ctrl {

    @Inject
    private SV003DealService sv003DealService;

    @Inject
    private SV007MyboxService sv007MyboxService;

    @Override
    public Result sf0030001GetDealByDealCode(String dealCode) {

        DealDto dealDto = sv003DealService.sv00306GetDealByDealCode(dealCode);

        if (dealDto == null) {
            return responseError(MessageCode.SF00300.ERR001);
        }

        DealJson dealJson = new DealJson();
        dealJson.setData(dealDto);

        SF0030006Res res = new SF0030006Res();
        res.setDeal(dealJson);
        return responseJson(res, MessageCode.SF00300.INF001);
    }

    @Override
    public Result sf0030002BookmarkDeal() {
        SF0030002Req req = requestJson(SF0030002Req.class);

        DealDto deal = sv003DealService.sv00301GetDealById(req.getDealId());
        if (deal != null) {
            MyboxItemDto myboxItem = sv007MyboxService.sv00703GetMyboxItemByDealId(deal.getId(), super.getUserId());
            if (myboxItem == null) {
                myboxItem = sv007MyboxService.sv00701BookmarkDeal(deal.getId(), super.getUserId());
            }
            return responseJson(new SF0030002Res(myboxItem.getId()), MessageCode.SF00300.INF001);
        }
        return responseError(MessageCode.SF00300.ERR001);
    }

    @Override
    public Result sf0030003UnBookmarkDeal() {
        SF0030003Req req = requestJson(SF0030003Req.class);

        DealDto deal = sv003DealService.sv00301GetDealById(req.getDealId());
        if (deal != null) {
            MyboxItemDto myboxItem;
            while((myboxItem = sv007MyboxService.sv00703GetMyboxItemByDealId(deal.getId(), super.getUserId())) != null) {
                sv007MyboxService.sv00702UnbookmarkDeal(myboxItem.getId());
            }
            return responseJson(null, MessageCode.SF00300.INF001);
        }
        return responseError(MessageCode.SF00300.ERR001);
    }
}
