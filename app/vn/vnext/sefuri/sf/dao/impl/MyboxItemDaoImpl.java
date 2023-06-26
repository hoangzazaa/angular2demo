package vn.vnext.sefuri.sf.dao.impl;

import com.google.inject.Inject;
import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.dao.MyboxItemDao;
import vn.vnext.sefuri.sf.dto.MyboxItemDto;
import vn.vnext.sefuri.sf.util.CollectionUtil;

import java.util.List;

/**
 * @author hoangtd
 *         24/10/2016
 */
public class MyboxItemDaoImpl extends GenericDaoImpl<MyboxItemDto> implements MyboxItemDao, Constants {
    @Inject
    private MyboxItemDao myboxItemDao;

    public MyboxItemDaoImpl() {
        super(MyboxItemDto.class);
    }

    @Override
    public MyboxItemDto getMyboxItemByDealIdAndUserId(Integer dealId, Integer userId) {
        List<MyboxItemDto> myboxItemDtos = JPA.em()
                .createQuery("SELECT mybox FROM MyboxItemDto mybox WHERE mybox.dealId=:dealId and mybox" +
                        ".userId=:userId", MyboxItemDto.class)
                .setParameter("dealId", dealId)
                .setParameter("userId", userId)
                .setMaxResults(1)
                .getResultList();
        if (CollectionUtil.isNotEmpty(myboxItemDtos)) {
            return myboxItemDtos.get(0);
        }
        return null;
    }

    @Override
    public List<MyboxItemDto> getMyboxs(Integer userId, Integer type) {
        return JPA.em().createQuery("select mybox from MyboxItemDto mybox " +
                        "INNER JOIN DealDto deal on deal.id=mybox.dealId " +
                        "where mybox.userId = :userId  " +
                        "AND deal.templateFlag=:type AND deal.deleteFlag=:deleteFlag",
                MyboxItemDto.class)
                .setParameter("userId", userId)
                .setParameter("type", type)
                .setParameter("deleteFlag", Constants.DELETE_DISABLE)
                .getResultList();
    }

    @Override
    public Long countMybox(Integer userId) {
      List<Long> count=  JPA.em().createQuery("SELECT count(mybox) FROM MyboxItemDto mybox" +
                      " INNER JOIN DealDto deal ON deal.id=mybox.dealId" +
                      " WHERE mybox.userId = :userId AND deal.deleteFlag=:deleteFlag",
                Long.class)
                .setParameter("userId", userId)
                .setParameter("deleteFlag", Constants.DELETE_DISABLE)
                .getResultList();
        if (CollectionUtil.isNotEmpty(count)) {
            return count.get(0);
        }
        return Long.valueOf(0);
    }

    @Override
    public int deleteDealFromAllBox(Integer dealId) {
        String query = "DELETE FROM MyboxItemDto mi WHERE mi.dealId = :dealId";
        return JPA.em()
                .createQuery(query)
                .setParameter("dealId", dealId)
                .executeUpdate();
    }

}


