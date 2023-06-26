package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dao.impl.MyboxItemDaoImpl;
import vn.vnext.sefuri.sf.dto.MyboxItemDto;

import java.util.List;

/**
 * @author hoangtd
 *         24/10/2016
 */
@ImplementedBy(MyboxItemDaoImpl.class)
public interface MyboxItemDao extends GenericDao<MyboxItemDto> {

    /**
     * Get mybox item by dealId and userId
     *
     * @param dealId
     * @param userId
     * @return
     */
    MyboxItemDto getMyboxItemByDealIdAndUserId(Integer dealId, Integer userId);

    List<MyboxItemDto> getMyboxs(Integer userId, Integer type);

    Long countMybox(Integer userId);


    int deleteDealFromAllBox(Integer dealId);
}
