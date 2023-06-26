package vn.vnext.sefuri.sf.service;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dto.MyboxItemDto;
import vn.vnext.sefuri.sf.service.impl.SV007MyboxServiceImpl;

import java.util.List;

/**
 * Created by manhnv on 1/5/2017.
 */
@ImplementedBy(SV007MyboxServiceImpl.class)
public interface SV007MyboxService {
    /**
     * Add deal to my box
     *
     * @param dealId
     * @param userId
     * @return MyboxItemDto
     */
    MyboxItemDto sv00701BookmarkDeal(Integer dealId, Integer userId);

    /**
     * Remove deal form my box by myBoxId
     *
     * @param myboxId
     */
    void sv00702UnbookmarkDeal(Integer myboxId);

    /**
     * Get mybox by deal id and user id
     *
     * @param dealId
     * @param userId
     * @return
     */
    MyboxItemDto sv00703GetMyboxItemByDealId(Integer dealId, Integer userId);

    Long sv00705GetCountMyBox(Integer userId);
}
