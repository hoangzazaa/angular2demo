package vn.vnext.sefuri.sf.service.impl;

import com.google.inject.Inject;
import vn.vnext.sefuri.sf.dao.MyboxItemDao;
import vn.vnext.sefuri.sf.dao.impl.GenericDaoImpl;
import vn.vnext.sefuri.sf.dto.MyboxItemDto;
import vn.vnext.sefuri.sf.service.SV007MyboxService;

/**
 * Created by manhnv on 1/5/2017.
 */
public class SV007MyboxServiceImpl extends GenericDaoImpl<MyboxItemDto> implements SV007MyboxService {
    @Inject
    private MyboxItemDao myboxItemDao;

    public SV007MyboxServiceImpl() {
        super(MyboxItemDto.class);
    }

    @Override
    public MyboxItemDto sv00701BookmarkDeal(Integer dealId, Integer userId) {
        MyboxItemDto myboxItemDto = new MyboxItemDto();

        myboxItemDto.setDealId(dealId);
        myboxItemDto.setUserId(userId);
        // set update user and create user
        myboxItemDto.setUpdatedUser(userId);
        myboxItemDto.setCreatedUser(userId);
        return myboxItemDao.create(myboxItemDto);
    }

    @Override
    public void sv00702UnbookmarkDeal(Integer myboxId) {
        myboxItemDao.delete(myboxId);
    }

    public MyboxItemDto sv00703GetMyboxItemByDealId(Integer dealId, Integer userId) {
        MyboxItemDto myboxItemDto = myboxItemDao.getMyboxItemByDealIdAndUserId(dealId, userId);

        return myboxItemDto;
    }

    @Override
    public Long sv00705GetCountMyBox(Integer userId) {
        return myboxItemDao.countMybox(userId);
    }
}
